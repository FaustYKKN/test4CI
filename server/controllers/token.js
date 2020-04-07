const jwt = require( 'jsonwebtoken' );
const { privateKey, cookiesConfig } = require( '../config/config' );

module.exports = async ctx => {
  // 此接口用于将其他系统的token转换为本系统的token，此接口需要用户登录以后才能调用
  const { id, username, type, description, worknumber, avatar, email } = ctx.user.info;
  const token = jwt.sign( {
    id,
    username,
    type,
    description,
    worknumber,
    avatar,
    email,
  }, privateKey, {
    algorithm: 'RS256',
    expiresIn: 60 * 60, //有效时常，单位：秒
    issuer: 'bonc_developer',
  } );

  ctx.cookies.set( 'nodebbJwt', token, cookiesConfig );

  ctx.body = {
    msg: 'success',
    data: token
  }
};
