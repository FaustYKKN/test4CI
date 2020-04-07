const Op = require('sequelize').Op;
const {
    'innerSourceApply': InnerSourceApply,
} = require('../models');
const uuidv1 = require('uuid/v1');

// 用户的开源项目新建存储

exports.find = async ( ctx, next ) => {
  let { id } = ctx.query;
  let resData = {};
  if( id ){
    resData = await InnerSourceApply.findOne( {
      where: { 
        userID: id,
       },
    } )
  }
  ctx.body = JSON.stringify( {
    msg: '',
    data: resData
  } );
  next();
}

