const {
  user: User,
  thirdPartyServicesInfo: ThirdPartyServicesInfo,
  innerSourceProject: InnerSourceProject,
  permissionGroup: PermissionGroup,
  innerSourceProjectAuthorization: InnerSourceProjectAuthorization,
  innerSourceApply: InnerSourceApply
} = require( '../../models' );
const uuidv1 = require('uuid/v1');
const request = require( '../../util/request' );
const gitlabConfig = require( '../../../epm-ui-boot.config' );
const mime = require( 'mime' );
const { Gitlab } = require('@gitbeaker/node');

// 获取并存储用户的private——token信息
exports.fillUserPrivateToken = async ( ctx, next ) => {
  let res = {};
  try {
    const { body } = ctx.request;
    const uid = body.uid;
    const requestAccessPathOptions = {
      hostname: `${ gitlabConfig.context.codeHost }`,
      path: `/oauth/token?client_id=${ gitlabConfig.context.clientId }&client_secret=${ gitlabConfig.context.clientSecret }&code=${ body.code }&grant_type=authorization_code&redirect_uri=${ body.redirectUri }`,
      method: 'POST'
    };
    const { access_token: accessToken } = JSON.parse( ( await request( requestAccessPathOptions ) ).body );

    const requestPrivateTokenOptions = {
      hostname: `${ gitlabConfig.context.codeHost }`,
      path: `/api/v4/user?access_token=${ accessToken }`,
      method: 'GET'
    };
    const privateAll = JSON.parse( ( await request( requestPrivateTokenOptions ) ).body );
    // 由于 gitlab 更新 获取到的字段缺少 private_token 将 access_token 手动加入到获得的信息中，用于验证
    privateAll['access_token'] = accessToken;

    const currentUser = await User.findByPk( uid );

    const isSamePerson = privateAll.email === currentUser.get( 'email' );
    if( isSamePerson ) {
      await ThirdPartyServicesInfo.findOrCreate( {
        where: {
          owner: uid,
          serveName: 'gitlab'
        },
        defaults: {
          owner: uid,
          serveName: 'gitlab',
          id: uuidv1(),
          json: JSON.stringify( privateAll )
        }
      }).then( ( [ result, created ] ) => {
        console.log( result.get( { plain: true } ) );
        if ( created ) {
          console.log( '创建认证' );
        } else {
          console.log( ' 用户已开认证 ' )
          ThirdPartyServicesInfo.update( {
            json: JSON.stringify( privateAll )
          },{
            where: {
              owner: uid,
              serveName: 'gitlab'
            }
          } );
        }
      } )
      res = { message: 'BONC InnerSource 开源认证成功！' };
      
    } else {
      ctx.status = 500;
      res = { url: 'https://code.bonc.com.cn', message: '请您使用本人的账户登录 BONC GitLab！如仍不能授权成功，请从社区中联系我们' };
    }

  }catch ( err ) {
    console.error( err );
    ctx.status = 500;
    res = { message: 'BONC InnerSource 开源认证出现错误！', err: err.stack };
  }

  ctx.set('Content-Type', 'application/json');
  ctx.body= JSON.stringify( res );
  next();
};

// 用户加入组
exports.inInner = async ( ctx, next ) => {
  let res = {};
  try {
    const { uid } = ctx.params;
    let resData = { get: () => {} };

    resData = await ThirdPartyServicesInfo.findOne( {
      where: {
        owner: uid,
        serveName: 'gitlab',
      },
    } );
    const data = JSON.parse( resData.dataValues.json )
    const id = data.id;
    const options = {
      hostname: `${ gitlabConfig.context.codeHost }`,
      path: `/api/v4/groups/${ gitlabConfig.context.groupsid }/members?access_token=${ gitlabConfig.context.private_token }&id=${ gitlabConfig.context.groupsid }&user_id=${ id }&access_level=${ gitlabConfig.context.access_level }`,
      method: 'POST',
    };
    res = JSON.parse( ( await request( options ) ).body );
    await InnerSourceApply.findOrCreate( {
      where: {
        userID: uid
      },
      defaults: {
        id: uuidv1(),
        userID: uid
      }
    }).then( ( InnerSourceApply ) => {
      const { id, userID } = InnerSourceApply[0].get({ plain: true });
      res = {
        code: 200,
        msg: '您已加入开源组！',
        data: {
          id,
          userID
        }
      };
    });
  }catch ( err ) {
    ctx.status = 500;
    res = { message: '用户加入InnerSource组失败', err: err.stack };
  }
  ctx.set('Content-Type', 'application/json');
  ctx.body= JSON.stringify( res );
  next();
};

// 查看 InnerSource 组内用户
exports.innerUser = async ( ctx, next ) => {
  const options = {
    hostname: `${ gitlabConfig.context.codeHost }`,
    path: `/api/v4/groups/${ gitlabConfig.context.groupsid }/members?access_token=${ gitlabConfig.context.private_token }`,
    method: 'GET',
  };
  let res = JSON.parse( ( await request( options ) ).body );
  ctx.set( 'Content-Type', 'application/json' );
  ctx.body = JSON.stringify( res );
  next();
};

//确认用户是否认证
exports.isAuthor = async ( ctx, next ) => {
  let { id } = ctx.query;
  let res = await ThirdPartyServicesInfo.findOne( {
    where: { 
      owner: id,
      serveName: 'gitlab',
    },
  } )
  ctx.body = JSON.stringify( res );
  next();
}

exports.infoFind = async ( ctx, next ) => {
  let params = ctx.query;
  console.log( params.id, 'params' )
  let res = await ThirdPartyServicesInfo.findOne( {
    where: {
      owner: params.id,
      serveName: 'gitlab',
    },
  } );
  ctx.body = JSON.stringify( res );
  next();
};


exports.findImages = async ( ctx, next ) => {
  let { projectid, file_path, ref } = ctx.query;
  file_path = encodeURI( file_path );
  const options = {
    hostname: `${ gitlabConfig.context.codeHost }`,
    path: `/api/v4/projects/${ projectid }/repository/files/${ file_path }?access_token=${ gitlabConfig.context.private_token }&file_path=${ file_path }&ref=${ ref }`,
    method: 'GET',
  };
  let res = JSON.parse((await request(options)).body);

  if( res.encoding == 'base64' ){
    let mediaTypes = mime.getType( res.file_name );
    const pic = new Buffer( res.content, 'base64' );
    ctx.body = pic;
    ctx.set( 'Content-Type', `${ mediaTypes }` );
    next();
  }else{
    ctx.set( 'Content-Type', 'application/json' );
    ctx.body = JSON.stringify( res );
    next();
  }
};

// 列出 InnerSource 组内所有项目（用于判断用户是否在gitlab中将项目移除出组）   （ 改用 @gitbeaker 包 ）
exports.findInnerProjects = async ( ctx, next ) => {
  let res = {};
  const api = new Gitlab({
    jobToken: `${ gitlabConfig.context.private_token }`,
    host: `${ gitlabConfig.context.codeSecretHost }`,
  });
  await api.GroupProjects
      .all( 4008, {
        access_token: `${ gitlabConfig.context.private_token }`,
      } )
      .then( ( res1 )=>{
        res = res1;
      })
      .catch( ( err ) => {
        res = '查询项目出错';
        console.log( '取消开源出错~~', err )
      } );
  ctx.set( 'Content-Type', 'application/json' );
  ctx.body = JSON.stringify( res );
  next();
}