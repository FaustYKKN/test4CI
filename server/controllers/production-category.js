const Op = require('sequelize').Op;
const {
  'postCategory': PostCategory,
} = require('../models');
const uuidv1 = require('uuid/v1');

// 获取指定种类的产品ID
exports.findID = async ( ctx, next ) => {
  let { title } = ctx.query;
  if( title ){
    resData = await PostCategory.findOne( {
      where: {
        title: title,
      },
    } )
  }
  ctx.body = JSON.stringify( {
    msg: '',
    data: resData,
  } );
  next();
}