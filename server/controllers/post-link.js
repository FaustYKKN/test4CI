const Op = require('sequelize').Op;
const {
  postLink
} = require('../models');
const uuidv1 = require('uuid/v1');

// 获取全部postLink
exports.findAll = async ctx => {
  let res = {};
  let data = {};

  try {
    data = await postLink.findAll()
    
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
// 根据 postID 获取 postLink
exports.find = async ctx => {
  const { postID } = ctx.params;
  let res = {};
  let data = {};

  try {
    data = await postLink.findAll({
      where: {
        postID: postID
      }
    })
    
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
// 创建postLink
exports.create = async ctx => {
  const { linkName, link, linkType, postID } = ctx.request.body;
  let res = {};
  let data = {};
  
  try {
    await postLink.create({
        id: uuidv1(),
        linkName,
        link,
        linkType,
        postID
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
exports.updatePostLink = async ctx => {
  const { linkName, link, id } = ctx.request.body;
  let res = {};
  let data = {};

  try {
    await postLink.findOne({
        where: {
          id
        }
      })
      .then( async result => {
        await result.update( { linkName, link } )
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
// 删除postLink
exports.destroyPostLink = async ctx => {
  const { id } = ctx.params;
  let res = {};
  let data = {};
  
  try {
    await postLink.findOne({
        where: {
          id
        }
      })
      .then(result => {
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