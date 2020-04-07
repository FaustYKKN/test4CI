const Op = require('sequelize').Op;
const {
  'post': Post,
  'postCategory': PostCategory,
  'article': Article,
  'uploadFile': UploadFile,
  'postLink': PostLink,
  'comment': Comment
} = require('../models');
const uuidv1 = require('uuid/v1');
const { createNodeBBPost, deleteNodeBBPost, updateNodeBBCategory } = require( '../third-party-services/nodebb/nodebb-controllers' );
const { destroyFile } = require('./upload-file');

async function findPostCategoryInfo( params ) {
  const { title, id } = params;
  let info = {};

  // 查询分类的 ID
  await PostCategory.findOne( {
    where: params
  } )
  .then( result => {
    if ( result ) {
      info = result.get({ plain: true });
    }
  } );

  return info;
}
async function findCommentInfo( params ) {
  const { title, id } = params;
  let info = {};

  // 查询分类的 ID
  await Comment.findOne( {
    where: params
  } )
  .then( result => {
    if ( result ) {
      info = result.get({ plain: true });
    }
  } );

  return info;
}

async function createArticle( articleID, userID ) {
  let id = '';
  await Article.create( {
    id: uuidv1(),
    contentType: 'JSX',
    contentFileID: articleID,
    userID: userID || '9250e360-d469-11e9-a0be-7bec5117c1f9'
  } )
  .then( ( result ) => {
    id = result.get( { plain: true } ).id;
  } )
  return id;
}
async function updateArticle( articleID, fileID ) {
  await Article.findOne( {
    where:{
      id: articleID
    }
  } )
  .then( ( result ) => {
    const oldFileID = result.get( { plain: true } ).contentFileID;

    destroyFile( { params: { id: oldFileID } } );

    result.update( { contentFileID: fileID } );
  } )
}
async function deleteArticle( articleID ) {
  await Article.findOne( {
    where: {
      id: articleID
    }
  } )
  .then( ( result ) => {
    const fileID = result.get( { plain: true } ).contentFileID;
    
    destroyFile( { params: { id: fileID } } );

    result.destroy();
  } )
}

// 用户的产品新建存储
exports.create = async ctx =>{
  const params = ctx.request.body;
  const { id } = ctx.user.info;
  let res = {};

  const postCategoryInfo = await findPostCategoryInfo( { title: params.postCategory } );

  const info = {
    id: uuidv1(),
    title: params.title,
    description: params.description,
    postCategoryID: postCategoryInfo.id,
    commentShowIndex: params.commentShowIndex,
    userID: id
  };

  if ( params.article ) {
    info.articleID = await createArticle( params.article, params.userID );
  }
  if ( params.coverImg ) {
    info.coverImgID = params.coverImg;
  }
  
  await Post.create( info )
    .then( async ( post ) => {
      const commentID = uuidv1();
      await Comment.create( {
        id: commentID
      } );
      await post.update( { commentID } );

      // 先暂停自动创建 nodebb 分类功能
      // createNodeBBPost( {
      //   parentCid: postCategoryInfo.nodebbCid,
      //   commentID,
      //   name: params.title
      // } )

      res = {
        code: 200,
        msg: 'success',
        data: post.get({ plain: true })
      };
    })
    .catch( ( err ) => {
      console.log(err);
      ctx.status = 500;
      res = {
        code: 500,
        msg: err.toString(),
        data: {}
      };
    } );
  ctx.body = res;
}

// 获取指定ID的数据
exports.find = async ( ctx ) => {
  let { id } = ctx.params;
  let resData = {};
  if( id ){
    resData = await Post.findOne( {
      where: { id },
      include: [{
        model: PostCategory
      }, {
        model: UploadFile,
        as: 'coverImg'
      }, {
        model: Article,
        as: 'article',
        include: [{
          model: UploadFile,
          as: 'contentFile'
        }]
      }, {
        model: PostLink
      }, {
        model: Comment
      }],
    } )
  }
  ctx.body = JSON.stringify( {
    msg: '',
    data: resData,
  } );
}

// 对 findAll 的取值数量做限制
exports.findAll = async ( ctx, next ) => {
  let { pageSize = 10, pageIndex = 1, postCategory } = ctx.query;;
  let res = {};
  let postWhere = {};

  pageSize = Number( pageSize );
  pageIndex = Number( pageIndex );

  if ( postCategory ) postWhere = { title: postCategory };

  await Post.findAndCountAll({
      include: [{
        model: PostCategory,
        where: postCategory && postWhere
      }, {
        model: UploadFile,
        as: 'coverImg'
      }, {
        model: Article,
        as: 'article',
        include: [{
          model: UploadFile,
          as: 'contentFile'
        }]
      }, {
        model: PostLink
      }, {
        model: Comment
      }],
      offset: pageSize * (pageIndex-1),
      limit: pageSize
    })
    .then((result) => {
      res = {
        code: 200,
        msg: 'success',
        data: {
          pageIndex,
          pageSize,
          pageTotal: result.count,
          data: result.rows
        }
      }
    })
    .catch( ( err ) => {
      ctx.status = 500;
      res = {
        code: 500,
        msg: err.toString(),
        data: {}
      };
    } )
    ctx.body = JSON.stringify( res );
    next();
};
// 更新 Post 信息
exports.updatePost = async ctx => {
  const params = ctx.request.body;
  const { id: userID } = ctx.user.info;
  let res = {};
  let data = {};

  try {
  
    await Post.findOne({
        where: {
          id: params.id
        },
        include: [{
          model: UploadFile,
          as: 'coverImg'
        }, {
          model: Article,
          as: 'article',
          include: [{
            model: UploadFile,
            as: 'contentFile'
          }]
        }],
      })
      .then( async result => {
        const r = result.get({ plain: true });
        const ud = {
          commentShowIndex: params.commentShowIndex,
          userID
        };

        if ( params.coverImg && r.coverImgID !== params.coverImg ) {
          ud.coverImgID = params.coverImg;
          destroyFile( { params: { id: r.coverImgID } } );
        }
        if ( params.article ) {
          if ( !r.articleID  ) {
            ud.articleID = await createArticle( params.article, params.userID );
          } else if ( r.article.contentFileID !== params.article ) {
            // 参数1：articleID   参数2：文件ID
            await updateArticle( r.articleID, params.article );
          }
        }
        if ( params.title !== r.title ) ud.title = params.title;
        if ( params.description !== r.description ) ud.description = params.description;

        if ( params.postCategory || params.title || params.description ) {
          // 查询分类的 ID
          let { id: postCategoryID, nodebbCid } = await findPostCategoryInfo( { title: params.postCategory } );
          // 从 comment 中拿到产品的 nodebb categoryID
          let { nodebbCategoryID } = await findCommentInfo( { id: r.commentID } );

          if ( postCategoryID !== r.postCategoryID ) {
            ud.postCategoryID = postCategoryID;
              
            if ( nodebbCategoryID !== undefined && nodebbCategoryID !== null ) {
              if ( postCategoryID !== r.postCategoryID ) {
                updateNodeBBCategory( { cid: nodebbCategoryID, parentCid: nodebbCid, ...ud, name: ud.title || r.title } )
              } else {
                updateNodeBBCategory( { cid: nodebbCategoryID, ...ud, name: ud.title || r.title } )
              }
            }
          }
        }

        await result.update( ud )
        .then( result => {
          
          data = result.get({ plain: true })
        })
      } )
    
    res = {
      msg: 'success',
      data: data
    }
  } catch ( err ) {
    ctx.status = 500;
    res = {
      code: 500,
      msg: err.toString(),
      data: {}
    };
  }

  ctx.body = JSON.stringify( res );
}
// 删除 Post 信息
exports.destroyPost = async ctx => {
  const { id } = ctx.params;
  let res = {};
  let data = {};
  
  try {
    await Post.findOne({
        where: {
          id
        }
      })
      .then(result => {
        result.getComment()
        .then( c => {
          deleteNodeBBPost( { cid: c.get({plain: true}).nodebbCategoryID } )
        } )
        result.destroy();
      } )

    res = {
      msg: 'success',
      data: data
    }
  } catch ( err ) {
    ctx.status = 500;
    res = {
      code: 500,
      msg: err.toString(),
      data: {}
    };
  }

  ctx.body = JSON.stringify( res );
}

