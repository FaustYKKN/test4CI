let svg = require('svg-captcha');
const { encrypt } = require( '../util/md5' );
const { cookiesConfig } = require( '../config/config' );

const codeConfig = {
  size: 5,// 验证码长度
  ignoreChars: '0Oo1iIlj', // 验证码字符中排除 0Oo1iIlj
  noise: 2, // 干扰线条的数量
  height: 44,
  color: true,
};


module.exports = async ctx => {

  // 验证码使用md5加盐加密存放在cookie中，校验时可重新加密对比加密后的内容即可
  let captcha = svg.create(codeConfig);
  const credit = encrypt( captcha.text.toLowerCase() );
  ctx.cookies.set(
    'credit',
    credit,
    cookiesConfig
  );

  ctx.body = {
    result: captcha.data,
    msg: 'success'
  };
};