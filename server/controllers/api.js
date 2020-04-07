const jwt = require('jsonwebtoken');

const seccret = 'jwttoken';

function decoded(ctx, next) {
  let result = {message: ''};

  try {
    // result.decoded = jwt.decode(ctx.query.access_token);
    jwt.verify( ctx.query.token, seccret, (err,decoded) => {
      if ( !err ) {
        result.message = 'valid';
        result.decoded = decoded;
      }
    } );
    // result.message = 'valid';
  } catch (error) {
    result.message = error.message;
  } finally {
    ctx.body = result;
  }
}

function getToken(ctx, next) {
  let result = {message: ''};
  console.log( ctx );
  const payload = {
    username: ctx.request.body.username,
    password: ctx.request.body.password
  };

  try {
    result.decoded = jwt.sign(payload, seccret, { expiresIn:"1h" });
    result.message = 'success';
  } catch (error) {
    result.message = error.message;
  } finally {
    console.log( result )
    ctx.body = JSON.stringify(result);
  }
}



module.exports = {
  decoded,
  getToken
};