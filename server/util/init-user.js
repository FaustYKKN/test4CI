const { user: User, thirdPartyServicesInfo: ThirdPartyServicesInfo } = require( '../models' );
const initNodebbUser = require('../third-party-services/nodebb/init-nodebb-user');
const uuidv1 = require('uuid/v1');

/*
* 初始化用户
* 如果用户使用的是selfJwt则说明用户在user表中肯定存在
* 如果用户使用的是ssoJwt则查看user表中是否有ssoId为token中loginId的record，没有则在用户表创建一条record，同时在thirdPartyServicesInfo表中创建
* 如果用户在thirdPartyServicesInfo表中不存在owner为当前用户id且type为nodebb的recode则新建
* */
module.exports = async ctx => {
  // console.log('init check');
  let createdUser = true;

  // 如果是本系统的则直接查询用户信息然后返回
  if( ctx.user.info.iss === 'bonc_developer' ){
    let userInfo = await User.findOne( {
      where: { id: ctx.user.info.id }
    } );
    if( !userInfo ){
      ctx.user = {
        isLogin: false,
        errInfo: {
          name: 'Unknown error',
          msg: 'please reLogin'
        }
      }
    }else{
      ctx.user.info = userInfo.get( { plain: true } );
    }


  }else{
    // 不是本系统的的需要验证是否需要新建用户
    const { userName: username, email, moblie, loginId: ssoId } = ctx.user.info;

    const currentUser = await User.findOne( {
      where: { ssoId }
    } );
    let currentUserEmail = '';
    if( currentUser ) currentUserEmail = currentUser.get( 'email' );

    if( ( email && typeof email === 'string' ) || currentUserEmail ) {
      await User.findOrCreate( {
        where: { ssoId, },
        defaults: { email, moblie, username, id: uuidv1(), type: 'sso' },
      } )
        .then( ( [ user, created ] ) => {
          // 将ctx.user.info中的数据修改为数据库中的数据，如果是首次进入的用户，还需要在ThirdPartyServicesInfo表中新建
          const ssoInfo = ctx.user.info;
          ctx.user.info = user.get( { plain: true } );
          // console.log(user, ctx.user.info);
          if( created ) {
            return ThirdPartyServicesInfo.create( {
              id: uuidv1(),
              owner: ctx.user.info.id,
              serveName: 'sso',
              json: JSON.stringify( ssoInfo )
            } )
              .then( () => {
                // initNodebb( user.get( { plain: true } ) );
              } )
          }
        } )
        .catch( err => {
          console.log( err );
        } )
    }else {
      ctx.status = 403;
      ctx.body = JSON.stringify( { message: 'Email is Null' } );

      createdUser = false;
    }
  }

  // 查看id是否有对应的nodebb用户，没有则创建
  // console.log('111',ctx.user);
  if( ctx.user.isLogin ){
    const { id, username, email, ssoId } = ctx.user.info;
    const nodebbUser = await ThirdPartyServicesInfo.findOne( {
      where: { 
        owner: id,
        serveName: 'nodebb'
      }
    } );
    if( !nodebbUser ){
      await initNodebbUser( {
        id,
        username,
        email,
        ssoId,
        jwt: ctx.user.jwt
      } )
    }
  }

  return createdUser;
};
