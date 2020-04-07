const Op = require('sequelize').Op;
const {
    'innerSourceProject': InnerSourceProject,
    'innerSourceCategory': InnerSourceCategory,
    'user': User,
    'article': Article,
    'uploadFile': UploadFile,
    'postLink': PostLink,
    'comment': Comment,
    'star': Star,
    'setting': Setting
} = require('../models');
const uuidv1 = require('uuid/v1');
const {
  createNodeBBPost,
  updateNodeBBCategory,
} = require('../third-party-services/nodebb/nodebb-controllers');

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

// 用户的开源项目新建存储
exports.create = async ctx =>{
  const params = ctx.request.body;
  let res = {};
  let a = await InnerSourceProject.findAll( {
    where:{ gitlabProjectID: params.projectid }
  } )
  if( a.length === 0 ){
  await InnerSourceProject.create({
      id: uuidv1(),
      title: params.title,
      description: params.description,
      gitlabRepository: params.url,
      userID: params.userID,
      gitlabStarCount: params.star,
      commentShowIndex: 'false',
      gitlabProjectID: params.projectid
    })
    .then( async ( innerSourceProject ) => {
      const { id:uid, title, description, gitlabRepository, userID, gitlabStarCount, gitlabProjectID } = innerSourceProject.get({ plain: true });
      
      const commentID = uuidv1();
      await Comment.create( {
        id: commentID
      } );
      await innerSourceProject.update( { commentID } )

      // 先取消自动创建功能，修改为在 admin 页面手动创建
      // const topCid = await Setting.findOne( { where: { property: 'nodebb_innersource_cid' } } );
      // createNodeBBPost( {
      //   parentCid: ( topCid || {} ).value,
      //   commentID,
      //   name: title
      // } );

      res = {
        code: 200,
        msg: 'success',
        data: {
          uid,
          title,
          description,
          gitlabRepository,
          userID,
          gitlabStarCount,
          gitlabProjectID
        }
      };
    })
    .catch( ( err ) => {
      ctx.status = 500;
      res = {
        code: 500,
        msg: err.toString(),
        data: {}
      };
    } );
  }else{
    console.log( '项目已存在' )
    ctx.status = 500;
    res = { code: 500, msg: '项目已存在' }
  }
  ctx.body = JSON.stringify( res );
}

exports.find = async ( ctx, next ) => {
  let { id } = ctx.query;
  let resData = {};
  if( id ){
    resData = await InnerSourceProject.findOne( {
      where: { id },
      include: [{
        model: User,
      }, ]
    } );
    resData = resData.get();
    const c = await Star.count({
      where: {
        status: true,
        projectID: resData.id,
        projectType: 'innerSource',
      }
    });

    resData.stars = c + Number( resData.gitlabStarCount );
  }
  ctx.body = JSON.stringify( {
    msg: '',
    data: resData
  } );
  next();
}

// search 用户下的开源项目
exports.search = async ( ctx, next ) => {

  const { uid } = ctx.query;
  let res = { };

  await InnerSourceProject.findAll({
      where:{
        userID: uid,
      },
    })
    .then((result) => {
      res = {
        code: 200,
        msg: 'success',
        data: {
          data: result,
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
}

// 获取所有开源项目
exports.findAll = async ( ctx, next ) => {

  const { pageSize = 10, pageIndex = 1, userID } = ctx.query;
  let res = {};

  await InnerSourceProject.findAndCountAll({
      include: [
        {
          model: UploadFile,
          as: 'coverImg'
        },{
          model: User,
          where: userID ? { id: userID } : {}
        }, 
        {
          model: InnerSourceCategory,
          required: false,
        },
        {
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
        }
      ],
      offset: Number(pageSize) * (Number(pageIndex)-1),
      limit: Number(pageSize),
      distinct: true
    })
    .then( async (result) => {
      let resData = result.rows;
      // resData = resData.get();

      const promiseArr = [];
      
      resData.forEach( ( element ) => {
        promiseArr.push( Star.count({
          where: {
            status: true,
            projectID: element.id,
            projectType: 'innerSource',
          }
        }) );
      });

      await Promise.all( promiseArr )
      .then( async ( arr ) => {

        arr.forEach( ( v, i ) => resData[i].dataValues.stars = v + Number( resData[i].gitlabStarCount ) );
        
        res = {
          code: 200,
          msg: 'success',
          data: {
            pageIndex,
            pageSize,
            pageTotal: result.count,
            data: resData
          }
        }
        ctx.body = JSON.stringify( res );
        ctx.set( 'Content-Type', 'application/json' );
      } )

      
    })
    .catch( ( err ) => {
      ctx.status = 500;
      res = {
        code: 500,
        msg: err.toString(),
        data: {}
      };
      ctx.body = JSON.stringify( res );
    } )
    next();
}

exports.update = async ctx => {
  const params = ctx.request.body;
  let res = {};
  let data = {};

  try {
  
    await InnerSourceProject.findOne({
        where: {
          id: params.id
        }
      })
      .then( async result => {
        const r = result.get({ plain: true });
        const ud = {
          commentShowIndex: params.commentShowIndex
        };

        // if ( params.postCategory ) {
        //   // 查询分类的 ID
        //   let postCategoryID = await findPostCategoryID( params.postCategory );;
        //   if ( postCategoryID !== r.postCategoryID ) ud.postCategoryID = postCategoryID;
        // }
        if ( params.coverImg ) ud.coverImgID = params.coverImg;
        if ( params.article ) {
          ud.articleID = await createArticle( params.article, params.userID );
        }
        if ( params.title !== r.title ) ud.title = params.title;
        if ( params.description !== r.description ) ud.description = params.description;

        await result.update( ud )
        .then( async result => {
          data = result.get({ plain: true });

          let { nodebbCategoryID } = await findCommentInfo( { id: data.commentID } );
          if ( nodebbCategoryID !== undefined && nodebbCategoryID !== null && (params.title || params.description) ) {
            updateNodeBBCategory( { cid: nodebbCategoryID, name: data.title, description: data.description } )
          }
        } )
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
};

exports.delete = async ( ctx, next ) => {
  const params  = ctx.request.body;
  let resData = {};
  resData = await InnerSourceProject.destroy( {
    where: { id: params.proId },
  } ).then(( res ) => {
    resData = {
      code: 200,
      msg: 'delete success',
    }
  }).catch( ( err ) => {
    console.log( 'err', err )
    ctx.status = 500;
    resData = {
      code: 500,
      msg: err.toString(),
      data: {}
    };
  } );
  ctx.body = JSON.stringify( resData );
};

exports.updatedesc = async ( ctx, next ) => {
  let { id, description } = ctx.query;
  let resData = {};
  resData = await InnerSourceProject.update( {
    description: description,
  },{
    where: {
      id: id
    }
  } )
  console.log( resData )
  ctx.body = JSON.stringify( {
    msg: '',
    data: resData
  } );
  next();
}