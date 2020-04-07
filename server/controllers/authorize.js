const jwt = require( 'jsonwebtoken' );
const initUser = require('../util/init-user');
const { selfPublicKey } = require( '../config/config' );

const ssoPublicKey = "-----BEGIN PUBLIC KEY-----\n" +
  "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAuGbXWiK3dQTyCbX5xdE4\n" +
  "yCuYp0AF2d15Qq1JSXT/lx8CEcXb9RbDddl8jGDv+spi5qPa8qEHiK7FwV2KpRE9\n" +
  "83wGPnYsAm9BxLFb4YrLYcDFOIGULuk2FtrPS512Qea1bXASuvYXEpQNpGbnTGVs\n" +
  "WXI9C+yjHztqyL2h8P6mlThPY9E9ue2fCqdgixfTFIF9Dm4SLHbphUS2iw7w1JgT\n" +
  "69s7of9+I9l5lsJ9cozf1rxrXX4V1u/SotUuNB3Fp8oB4C1fLBEhSlMcUJirz1E8\n" +
  "AziMCxS+VrRPDM+zfvpIJg3JljAh3PJHDiLu902v9w+Iplu1WyoB2aPfitxEhRN0\n" +
  "YwIDAQAB\n" +
  "-----END PUBLIC KEY-----";


/*  中间件
* 1。 首先验证是否包含token
* 2。 对token进行解码，通过iss属性判断是哪家的token，然后才能用相应的公钥去校验
* 3。 校验之后ctx.user会有两种情况；成功：{ isLogin: true, info: token的payload对象 } 失败：{ isLogin: false, errInfo: 错误信息 }
* 4。 进行用户初始化（ 包括sso信息存储以及nodebb新建用户 ）
* */
module.exports = async ( ctx, next ) => {
  const token = ctx.headers.authorization;

  if( !token ) {
    ctx.user = {
      isLogin: false,
      errInfo: {
        name: 'NoToken',
        msg: 'no token'
      }
    };
    await next();
    return
  }
  const decode = jwt.decode( token );

  try {
    if( decode.iss === 'bonc_developer' ){
      jwt.verify( token, selfPublicKey );
    }else if( decode.iss === 'bonc' ){
      jwt.verify( token, ssoPublicKey );
    }else{
      const err = new Error('unknown issuer');
      err.name = 'token issuer error';
      throw err;
    }
    ctx.user = {
      isLogin: true,
      info: decode,
      jwt: token
    }
  } catch(err) {
    // err
    console.log(err)
    ctx.user = {
      isLogin: false,
      errInfo: {
        name: err.name,
        msg: err.message,
      }
    }
  }

  // console.log( 'ctx.user:', ctx.user )

  if( ctx.user.isLogin ){
    const createdUser = await initUser( ctx );

    if( !createdUser ) return;
  }

  await next()
};
