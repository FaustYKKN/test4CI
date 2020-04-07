const Op = require('sequelize').Op;
const {
  user: User,
  initNodebbCategory
} = require('../models');
const uuidv1 = require('uuid/v1');
const initNodebb = require( '../third-party-services/nodebb/init-nodebb-user' );
const { createNodeBBCategory } = require( '../third-party-services/nodebb/nodebb-controllers' );

exports.createUser = async ctx => {
  const params = ctx.request.body;
  let res = {};
  initNodebb( params );
};

exports.initNodebbCategory = async ctx => {
  const categoryList = [ {
    passName: 'production',
    nodebbName: '产品中心'
   }, {
    passName: 'innerSource',
    nodebbName: '开源中心'
   }];
   const resData = [];

  categoryList.forEach( async item => {
    await initNodebbCategory.findOrCreate( {
      where: {
        passCategoryName: item.passName
      },
      default: {
        nodebbName: item.nodebbName
      }
    } )
    .then( async ( [ node, created ] ) => {
      if ( created ) {
        const res = await createNodeBBCategory( { name: item.nodebbName } );
        const id = res.payload.id;

        node.update( { nodebbCategoryID: id } ).then( n => resData.push( n.get( { plain: true } ) ) );
      }
    } )
    
  } )

  ctx.body = {
    data: resData
  };
}