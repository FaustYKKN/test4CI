const fs = require( 'fs' );
const privateKey = fs.readFileSync( __dirname + '/rsa_private_key.pem' );
const selfPublicKey = fs.readFileSync( __dirname + '/rsa_public_key.pem' );
const rootDomain = 'localhost:3000';

const { host, nodebbHost, codeSecretHost, ssoHost } = require( '../../epm-ui-boot.config' ).context;

module.exports = {
  routerControl: [
    '/testLoginControl',
    '/user',
    '/token',
    '/nodebb'
  ],
  routerWhiteList: {
    '/user': 'POST',
    '/nodebb/initNodebbCategory': 'POST',
  },
  privateKey,
  selfPublicKey,
  passwordSaltRounds: 10,
  nodebbHost: `${nodebbHost}/`,
  nodebbWriteApiHost: `${nodebbHost}/api/v2`,
  nodebbDefaultPassword: 'bonc123456',
  clientId: 'fff864b504ad136145acfd123a978c3872e6ddc8ebfb501838995553a9b2d14f',
  clientSecret: '033585f388fcc43e834ad8bc68ef715485a0cec511bffdb4224b4d80e58fba43',
  cookiesConfig: {
    maxAge: 3*60*1000 ,      //cookie有效时长，单位：毫秒数
    expires: Date.now()/1000 + 3*60*1000 ,     //过期时间，unix时间戳
    secure: false,       //默认false，设置成true表示只有https可以访问
    httpOnly: true,     //true，客户端不可读取
    overwrite: true,    //一个布尔值，表示是否覆盖以前设置的同名的 cookie (默认是 false). 如果是 true, 在同一个请求中设置相同名称的所有 Cookie（不管路径或域）是否在设置此Cookie 时从 Set-Cookie 标头中过滤掉。
    domain: ''
  }
};



/*
* 生成公钥和私钥的命令：
* openssl genrsa -out rsa_private_key.pem
* openssl rsa -in rsa_private_key.pem -pubout -out rsa_public_key.pem
* */
