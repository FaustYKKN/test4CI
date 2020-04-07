const { Foo } = require( '../models' );
const uuidv1 = require('uuid/v1');

module.exports = {
  async getData ( ctx, next ) {
    let res = {};

    try {
      res = await Foo.findAll();
    }catch( err ){
      console.error( err );
      res = { code: 500, success: false, message: '数据库添加错误。' };
    }

    ctx.body = JSON.stringify( res );

    await next();
  },

  async addData ( ctx, next ) {
    let res = {};

    try{
      await Foo.create({
        id: uuidv1(),
        name: ctx.request.body.toString()
      });
      res = { code: 200, success: true };
    }catch( err ){
      console.error( err );
      res = { code: 500, success: false, message: '数据库添加错误。' };
    }

    ctx.body = JSON.stringify( res );
    await next();
  }
};
