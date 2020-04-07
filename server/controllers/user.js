const {
  user: User,
  thirdPartyServicesInfo,
  Sequelize
} = require('../models');
const Op = Sequelize.Op;
const uuidv1 = require('uuid/v1');
const { verify } = require( '../util/md5' );

exports.find = async ctx => {
  // do something
  console.log( 'enter user router' );
  let { id, all } = ctx.query;
  // 当指定id的时候按照id查，当all=true的时候查所有的
  let resData;
  if( id ) {
    resData = await User.findOne( {
      where: { id, }
    } )
  } else if ( all ) {
    resData = await User.findAll()
  } else {
    resData = ctx.user.info;
  }

  ctx.body = {
    msg: '',
    data: resData
  };
  return;

};

exports.search = async ( ctx, next ) => {
  let { id } = ctx.query;
  let resData = { get: () => {} };
  if( id ){
    resData = await User.findOne( {
      where: { id },
    } )
  }
  ctx.body = JSON.stringify( {
    msg: '',
    data: resData.get()
  } );
  next();
}

// 获取所有用户
exports.findAll = async ctx => {
  const params = ctx.request.body;
  const { pageSize = 10, pageIndex = 1, query = {} } = params;
  let res = {};

  const where = {};
  for ( const key in query ) {
    where[ key ] = {
      [Op.like]: `%${ query[ key ] }%`
    }
  }
  
  await User.findAndCountAll({
      where: where,
      include:[{
        model: thirdPartyServicesInfo,
        where: {
          serveName: 'sso'
        },
        required: false
      }],
      offset: pageSize * (pageIndex-1),
      limit: pageSize
    })
    .then((result) => {
      res = {
        code: 200,
        msg: 'success',
        data: {
          pageIndex,
          pageSize,
          pageTotal: result.count,
          data: result.rows
        }
      }
    })
    .catch( ( err ) => {
      ctx.status = 500;
      res = {
        code: 500,
        msg: err.toString(),
        data: {}
      };
    } );
    ctx.body = JSON.stringify( res );
};

exports.create = async ctx => {
  const { username, password, captcha, email, avatar, description } = ctx.request.body;

  // 用户信息的完整性以及合法性验证
  if( !verify( captcha, ctx.cookies.get( 'credit' ) ) ){
    ctx.status = 400;
    ctx.body = {
      msg: '验证码错误'
    };
    return;
  }else if( !( username && password && captcha && email ) ){
    ctx.status = 400;
    ctx.body = {
      msg: '注册信息不完整'
    };
    return;
  }else{
    const hasUser = await User.findOne( {
      where: {
        [ Op.or ]: [
          { username },
          { ssoId: username }
        ]
      }
    } );
    if( hasUser ){
      ctx.status = 400;
      ctx.body = {
        msg: '用户名已存在'
      };
      return;
    }
    const hasEmail = await User.findOne( {
      where: { email }
    } );
    if( hasEmail ) {
      ctx.status = 400;
      ctx.body = {
        msg: '邮箱已注册'
      };
      return;
    }
  }

  console.log( 'create-user: user info is valid' );
  // 信息验证已通过, 向用户表添加数据
  await User.create({
    id: uuidv1(),
    type: 'self',
    username,
    password,
    email,
    avatar,
    description,
  })
  .then((user) => {
    const userData = user.get({ plain: true });
    // data.uid = data.id;
    // delete data.id;
    delete user.password;
    ctx.body = {
      msg: 'success',
      data: userData
    };
  })
  .catch( ( err ) => {
    console.log(err);
    ctx.status = 500;
    ctx.body = {
      msg: err.message,
      data: {}
    };
  } );
};
