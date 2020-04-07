const { routerWhiteList } = require( '../config/config' );

module.exports = async ( ctx, next ) => {
  // 首先放行白名单
  console.log( ctx.method, routerWhiteList[ ctx.path ], ctx.path );
  let router = ctx.path.split( '/' ).slice(2);
  router = '/' + router.join('/');

  if( routerWhiteList[ router ] === ctx.method ){
    await next();
    return;
  }

  console.log(ctx.user)

  if( !ctx.user.isLogin ){
    ctx.status = 401;
    ctx.body = {
      msg: ctx.user.errInfo.msg
    }
  }else{
    await next()
  }
};