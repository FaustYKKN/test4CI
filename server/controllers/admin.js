const Op = require('sequelize').Op;
const {
  post,
  user,
  resource,
  innerSourceProject,
  topMenu,
  comment,
  'setting': Setting
} = require('../models');
const uuidv1 = require('uuid/v1');
const { 
  createNodeBBPost,
  updateNodeBBCategory,
} = require('../third-party-services/nodebb/nodebb-controllers');

// 获取系统总览信息
exports.searchAdminAll = async ctx => {
    let res = {};
    let data = {};
  
    try {
      await user.count()
        .then(count => data.userTotal = count )
      
      await user.count({
        where: {
          createdAt: {
            [Op.gt]: new Date( new Date() - 30 * 24 * 60 * 60 * 1000 )
          }
        }
      })
      .then(count => data.userNewAdd = count )
  
      await post.count()
        .then(count => data.postTotal = count )
      
      await post.count({
        where: {
          createdAt: {
            [Op.gt]: new Date( new Date() - 30 * 24 * 60 * 60 * 1000 )
          }
        }
      })
      .then(count => data.postNewAdd = count )
      
      await resource.count()
        .then(count => data.resourceTotal = count )
      
      await resource.count({
        where: {
          createdAt: {
            [Op.gt]: new Date( new Date() - 30 * 24 * 60 * 60 * 1000 )
          }
        }
      })
      .then(count => data.resourceNewAdd = count )
      
      await innerSourceProject.count()
        .then(count => data.innerSourceTotal = count )
      
      await innerSourceProject.count({
        where: {
          createdAt: {
            [Op.gt]: new Date( new Date() - 30 * 24 * 60 * 60 * 1000 )
          }
        }
      })
      .then(count => data.innerSourceNewAdd = count )

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

// 获取顶部菜单
exports.getTopMenu = async ctx => {
  let res = {};
  let data = {};

  try {
    data = await topMenu.findAll()
    
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
// 创建顶部菜单
exports.createTopMenu = async ctx => {
  const { name, url } = ctx.request.body;
  let res = {};
  let data = {};
  
  try {
    await topMenu.create({
        id: uuidv1(),
        name,
        url
      })
      .then(result => data = result.get({ plain: true }) )
    
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
// 更新顶部菜单
exports.updateTopMenu = async ctx => {
  const { name, url, id } = ctx.request.body;
  let res = {};
  let data = {};

  try {
    await topMenu.findOne({
        where: {
          id
        }
      })
      .then( async menu => {
        await menu.update( { name, url } )
        .then( result => data = result.get({ plain: true }) )
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
// 删除顶部菜单
exports.destroyTopMenu = async ctx => {
  const { id } = ctx.params;
  let res = {};
  let data = {};
  
  try {
    await topMenu.findOne({
        where: {
          id
        }
      })
      .then(menu => {
        menu.destroy();
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

// 创建 nodebb 分类
exports.createNodebbCategory = async ctx => {
  const { name, description, parentCid, commentID, type } = ctx.request.body;
  let res = {};
  let data = {};

  try {
    await comment.findOne({
        where: {
          id: commentID
        }
      })
      .then( async result => {
        const data = result.get({ plain: true });

        if ( !data.nodebbCategoryID || !data.nodebbTopicID ) {
          let pcid = '';
          if ( parentCid ) {
            pcid = parentCid;
          } else if ( type === 'innerSource' ) {
            const innerSourceTopCid = await Setting.findOne( { where: { property: 'nodebb_innersource_cid' } } );
            const globalTopCid = await Setting.findOne( { where: { property: 'nodebb_global_cid' } } );

            pcid = ( innerSourceTopCid || {} ).value || ( globalTopCid || {} ).value;
          } else if ( type === 'post' ) {
            const globalTopCid = await Setting.findOne( { where: { property: 'nodebb_global_cid' } } );
            pcid = ( globalTopCid || {} ).value;
          }
  
          createNodeBBPost( {
            parentCid: pcid,
            commentID,
            name,
            description
          } );
        }
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