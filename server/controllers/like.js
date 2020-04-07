const Op = require('sequelize').Op;
const {
  like
} = require('../models');
const uuidv1 = require('uuid/v1');

exports.create = async ctx => {
  const params = JSON.parse(ctx.request.body);
  let res = {};
  
  await like.create({
      id: uuidv1(),
      userID: params.uid,
      unlike: false,
      projectType: params.projectType,
      projectID: params.projectID
    })
    .then((like) => {
      const data = like.get({ plain: true })
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

exports.findOfUID = async ctx => {
  const params = ctx.params;
  let res = {};
  
  await like.findAll({
      where: {
        user_id: params.uid
      },
      raw: true
    })
    .then((likes) => {
      res = {
        code: 200,
        msg: 'success',
        data: likes
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
    ctx.body = JSON.stringify( res );;
};
