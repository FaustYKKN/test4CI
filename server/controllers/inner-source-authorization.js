const Op = require('sequelize').Op;
const {
    'innerSourceProjectAuthorization': InnerSourceProjectAuthorization,
} = require('../models');
const uuidv1 = require('uuid/v1');
const { Gitlab }  = require('@gitbeaker/node');

// 用户的开源项目新建存储

//  停用

// exports.create = async ctx =>{
//   const params = ctx.request.body;
//   let res = {};
//   await InnerSourceProjectAuthorization.create({
//       id: uuidv1(),
//       unAuthorizaiton: params.author,
//       userID: params.userID,
//       projectID: params.projectID,
//     })
//     .then( ( innerSourceProjectAuthorization ) => {
//       const { id:uid, unAuthorizaiton, userID, projectID } = innerSourceProjectAuthorization.get({ plain: true });
//       res = {
//         code: 200,
//         msg: 'success',
//         data: {
//           uid,
//           unAuthorizaiton,
//           userID,
//           projectID
//         }
//       };
//     })
//     .catch( ( err ) => {
//       ctx.status = 500;
//       res = {
//         code: 500,
//         msg: err.toString(),
//         data: {}
//       };
//     } );
//   ctx.body = JSON.stringify( res );
// }

