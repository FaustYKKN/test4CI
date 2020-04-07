const crypto = require('crypto');

// 对string进行md5加盐加密
function encrypt ( str ) {
  const md5 = crypto.createHash( 'md5' );
  return md5.update( str + 'Developer.9-^√∫' ).digest( 'hex' );
}

// 对输入的string和credit进行校验，返回true / false
function verify ( str, credit ) {
  str = str.toLowerCase();
  const secret = encrypt( str );
  return secret === credit;
}


exports.encrypt = encrypt;
exports.verify = verify;