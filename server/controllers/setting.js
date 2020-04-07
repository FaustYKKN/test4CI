const {
  setting:Setting
} = require('../models');
const uuidv1 = require('uuid/v1');

exports.findAll = async ctx => {
  let res = {};
  const data = {};

  try {
    const result = await Setting.findAll();

    result.forEach(( item ) => {
      data[ item.property ] = item.value;
    })
  
    res = {
      code: 200,
      msg: 'success',
      data: data
    }
  } catch ( err ) {
    ctx.response.status = 500;
    res = {
      code: 500,
      msg: err.toString()
    };
  }
  
  ctx.body = JSON.stringify( res );
};

exports.update = async ctx => {
  const params = ctx.request.body;
  let res = {};
  
  try {
    for ( const key in params ) {
      await Setting.findOrCreate({
        where: {
          property: key,
        },
        defaults: {
          id: uuidv1(),
          value: params[ key ] === undefined ? '' : params[ key ]
        }
      })
      .then(async ([ result, created ]) => {

        if ( !created ) {
          await result.update({ value: params[ key ] })
        }
      })
      .catch(err => console.log( err.toString() ) )
    }

    res = {
      code: 200,
      msg: 'success'
    }
  } catch ( err ) {
    ctx.response.status = 500;
    res = {
      code: 500,
      msg: err.toString()
    };
  }
  ctx.body = JSON.stringify( res );
};

