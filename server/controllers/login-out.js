const { user: User } = require( '../models' );
const jwt = require( 'jsonwebtoken' );
const { privateKey, cookiesConfig } = require( '../config/config' );
const { verify } = require( '../util/md5' );
const { Sequelize } = require( '../models' );
const Op = Sequelize.Op;

exports.login = async ctx => {
  ctx.status = 400;
  console.log( ctx.request.body );
  if ( !ctx.request.body ) {
    ctx.body = {
      msg: '参数错误'
    };
    return;
  }
  const { username, password, captcha } = ctx.request.body;

  if ( !( username && password && captcha ) ) {
    ctx.body = {
      msg: '参数错误'
    };
    return;
  }

  if ( !verify( captcha, ctx.cookies.get( 'credit' ) ) ) {
    ctx.body = {
      msg: '验证码错误'
    };
    return;
  }

  console.log( '参数正常：', ctx.user );

  const user = await User.findOne( {
    where: {
      [ Op.or ]: [
        { username },
        { ssoId: username }
      ]
    }
  } )
    .then( res => res ?
      res.get( { plain: true } ) :
      res );

  console.log( 'user:', user );

  if ( user ) {
    if ( user.type === 'self' ) {
      // const match = await bcrypt.compare( password, user.password );
      const match = password === user.password;
      if ( match ) {
        const token = jwt.sign( {
          id         : user.id,
          username   : user.username,
          type       : user.type,
          description: user.description,
          worknumber : user.worknumber,
          avatar     : user.avatar,
          email      : user.email,
          permission : user.permission
        }, privateKey, {
          algorithm: 'RS256',
          expiresIn: 60 * 60, //有效时常，单位：秒
          issuer   : 'bonc_developer'
        } );
        ctx.cookies.set( 'nodebbJwt', token, cookiesConfig );
        ctx.status = 200;
        ctx.body = {
          msg : 'success',
          data: token
        };
      } else {
        ctx.status = 401;
        ctx.body = {
          msg: '用户名或密码错误'
        };
      }
    } else {
	    ctx.status = 200;
      ctx.body = {
      	code: 302,
        msg   : 'please login other system:',
        target: user.type
      };
    }

  } else {
    ctx.status = 200;
    ctx.body = {
	    code: 302,
      msg   : 'please login other system:',
      target: 'unKnown'
    };
  }
};

exports.logout = async ctx => {
  '-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA5/ZvHKmZInZiNBFXwthf\nsTCsXrJp58uCOiw01jh8BLYoZUvZJOeFxE277tnkorVaCgm3ETuB6xkdmwhyx5Dt\ngbLPOvrTCiLdjiuVaX1VpbCVbbWcfHgGq4znq7uEemHuWv+EmWHklFR3vA3FuKvN\nMxdk8Mf0IO+9I/Pkyz5MeCadboXGnkISlxnfZ/P5iNu8VvlaEBQzsotZt14pUnpr\nu2h/gGOlLD8dcTPlPPB2WIclf1SOQZD4FWYpnhFCIQ3ELEcugjEzdcR+2kakWaGq\n4xCZg1Dm+WPXWs5Grqflc1QXKXzt8SB32zmA/n+mDKTsCHLGjJzcfUE/bFsjdetT\nQwIDAQAB\n-----END PUBLIC KEY-----';
};
