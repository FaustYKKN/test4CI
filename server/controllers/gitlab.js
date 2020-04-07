const { thirdPartyServicesInfo: ThirdPartyServicesInfo
 } = require( '../models' );


exports.find = async ( ctx, next ) => {
  let { owner, serveName } = ctx.query;
  resData = await ThirdPartyServicesInfo.findOne( {
    where: { 
      owner: owner,
      serveName: serveName
    },
  } )
  
  ctx.body = JSON.stringify( {
    msg: '',
    data: resData,
  } );
  next();
}