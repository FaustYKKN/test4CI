const Op = require('sequelize').Op;
const {
  'postCategory': PostCategory,
  'setting': Setting,
} = require('../models');
const uuidv1 = require('uuid/v1');
const { 
  createNodeBBCategory,
  deleteNodeBBCategory,
  updateNodeBBCategory
} = require('../third-party-services/nodebb/nodebb-controllers');

// 新建 post 分类
exports.create = async ctx =>{
  const params = ctx.request.body;
  let res = {};
  await PostCategory.create({
      id: uuidv1(),
      title: params.title,
      text: params.text,
      description: params.description
    })
    .then( async ( result ) => {
      const { id, title, text, description } = result.get({ plain: true });

      const topCid = await Setting.findOne( { where: { property: 'nodebb_global_cid' } } );
      const { cid } = await createNodeBBCategory( { name: text, parentCid: ( topCid || {} ).value } );
      result.update({ nodebbCid: cid });

      res = {
        code: 200,
        msg: 'success',
        data: {
          id,
          title,
          text,
          description,
          nodebbCid: cid
        }
      };
    })
    .catch( ( err = {} ) => {
      ctx.status = 500;
      res = {
        code: 500,
        msg: err.toString(),
        data: {}
      };
    } );
  ctx.body = res;
}

// 
exports.findAll = async ( ctx ) => {
  let res = {};
  let data = {};

  try {
    data = await PostCategory.findAll()
    
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

// 更新 post 分类
exports.update = async ctx =>{
  const params = ctx.request.body;
  let res = {};
  await PostCategory.findOne({
      where: {
        id: params.id
      }
    })
    .then( ( result ) => {
      result.update({ 
        title: params.title,
        text: params.text,
        description: params.description
      })
      .then( r => {
        const data = r.get({ plain: true });

        updateNodeBBCategory( { cid: data.nodebbCid, name: data.text, description: data.description } );
      } )

      res = {
        code: 200,
        msg: '更新成功'
      };
    })
    .catch( ( err = {} ) => {
      ctx.status = 500;
      res = {
        code: 500,
        msg: err.toString(),
        data: {}
      };
    } );
  ctx.body = res;
}

// 删除
exports.destroyPostCategory = async ctx => {
  const { id } = ctx.params;
  let res = {};
  let data = {};
  
  try {
    await PostCategory.findOne({
        where: {
          id
        }
      })
      .then(result => {
        deleteNodeBBCategory( { cid: result.get({ plain:true }).nodebbCid } );
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
