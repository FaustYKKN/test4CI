/**
 * 这是一个中间件，如果用户已经登录则需要给用户设置cookies：
 *    1。httpOnly
 *    2。domain设置为根域名
 *    3。cookie的名称默认为token，值为jwt
 *        jwt有两个必须的属性：id， username
 *
 *
 */
module.exports = async ( ctx, next ) => {
  if( ctx.user.isLogin ){
    ctx.cookies.set()
  }
  await next()
};
