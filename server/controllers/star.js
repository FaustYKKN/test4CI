const Op = require('sequelize').Op;
const {
  star:Star
} = require('../models');
const uuidv1 = require('uuid/v1');

exports.create = async ctx => {
  const params = JSON.parse(ctx.request.body);
  let res = {};

  if ( !params.userID || !params.projectType || !params.projectID ) {
    ctx.response.status = 500;
    res = {
      code: 500,
      msg: '参数错误',
      data: {}
    };
    ctx.body = JSON.stringify( res );
    return;
  }
  
  await Star.create({
      id: uuidv1(),
      userID: params.userID,
      status: params.status,
      projectType: params.projectType,
      projectID: params.projectID,
    },)
    .then((Star) => {
      const data = Star.get({ plain: true })
      res = {
        code: 200,
        msg: 'success',
        data: data
      }
    })
    .catch( ( err ) => {
      ctx.response.status = 500;
      res = {
        code: 500,
        msg: err.toString(),
        data: {}
      };
    } )
    ctx.body = JSON.stringify( res );
};

exports.find = async ctx => {
  const params = ctx.query;
  let res = {};

  if ( !params.userID || !params.projectType || !params.projectID ) {
    ctx.response.status = 500;
    res = {
      code: 500,
      msg: '参数错误',
      data: {}
    };
    ctx.body = JSON.stringify( res );
    return;
  }
  
  await Star.findOne({
      where: {
        userID: params.userID,
        projectType: params.projectType,
        projectID: params.projectID,
      }
    },)
    .then((Star) => {
      const data = Star.get({ plain: true })
      res = {
        code: 200,
        msg: 'success',
        data: data
      }
    })
    .catch( ( err ) => {
      ctx.response.status = 500;
      res = {
        code: 500,
        msg: err.toString(),
        data: {}
      };
    } )
    ctx.body = JSON.stringify( res );
};

exports.update = async ctx => {
  const params = JSON.parse(ctx.request.body);
  let res = {};

  if ( !params.userID || !params.projectType || !params.projectID || !( params.status === true || params.status === false ) ) {
    ctx.response.status = 500;
    res = {
      code: 500,
      msg: '参数错误',
      data: {}
    };
    ctx.body = JSON.stringify( res );
    return;
  }
  
  await Star.findOne({
      where: {
        userID: params.userID,
        projectType: params.projectType,
        projectID: params.projectID,
      }
    },)
    .then(async (star) => {
      let data = {}
      await star.update({ status: params.status })
        .then( result => data = result.get({ plain: true }) )

      res = {
        code: 200,
        msg: 'success',
        data: data
      }
    })
    .catch( ( err ) => {
      ctx.response.status = 500;
      res = {
        code: 500,
        msg: err.toString(),
        data: {}
      };
    } )
    ctx.body = JSON.stringify( res );
};

exports.countAll = async ctx => {
  const params = ctx.query;
  let res = {};
  
  const count = await Star.count({
      where: {
        status: true,
        projectID: params.projectID,
        projectType: params.projectType,
      }
    })
    
  res = {
    code: 200,
    msg: 'success',
    data: count
  }

  ctx.body = JSON.stringify( res );;
};
