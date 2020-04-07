const { thirdPartyServicesInfo } = require( '../../models' );
const { context } = require('../../../epm-ui-boot.config');
const { nodebbDefaultPassword } = require( '../../config/config' );
const request = require('request');
const uuidv1 = require('uuid/v1');

const url = context.nodebbAPIsHost + '/users';

/*
* 使用masterKey的时候需要额外在body中传输 _uid=目标用户id
* */
function createUserToken( uid, userInfo ) {
  // 创建一个 NodeBB 用户的 token
  return new Promise( (resolve, reject) => {
    request( {
      url: `${ url }/${ uid }/tokens`,
      method: 'POST',
      headers: {
        "Authorization": context.nodebbMasterToken,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        _uid: uid,
      })
    }, async function( error, response, body ) {
      if (!error && response.statusCode === 200) {
        const data = JSON.parse(body);
        const token = data.payload.token;

        thirdPartyServicesInfo.findOrCreate( {
          where: {
            owner: userInfo.id,
            serveName: 'nodebb'
          },
          defaults: {
            id: uuidv1(),
            json: JSON.stringify({ uid, token })
          }
        } )
          .then( ( [result, created] ) => {
            resolve( result.get({ plain:true }) )
          } )
        
        // 获取到所属部门，然后更新 NodeBB 用户信息
        const info = await thirdPartyServicesInfo.findOne( {
          where: {
            owner: userInfo.id,
            serveName: 'sso'
          }
        } );
        const json = JSON.parse(info.json);
        let orgName = '';
        if ( json.orgs_json ) {
          orgName = ( JSON.parse( json.orgs_json )[0] || {} ).orgName;
        }
        request( {
          url: `${ url }/${ uid }`,
          method: 'PUT',
          headers: {
            "Authorization": context.nodebbMasterToken,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            _uid: uid,
            signature: orgName
          })
        } )
      } else {
        console.error( 'nodebb create user token request failed!', error );
        reject( error );
      }
    } );
  } )
}

/*
* userInfo必须的属性：username, id
*
* */
module.exports = userInfo => {
  console.log('init check nodebb');
  const { username, email, ssoId, jwt } = userInfo;
  
  return new Promise( (resolve, reject) => {
    request( {
      url: `${ context.nodebbHost }/api/plugins/bonc-cas/user`,
      method: 'GET',
      headers: {
        "Authorization": 'Bearer ' + jwt
      }
    }, function( error, response, body ) {
      console.log( error, 'createAPI->body:', body );
      if (!error && response.statusCode === 200) {
        const data = JSON.parse(body);
        const { uid } = data.payload;

        console.log( `nodebb create user (${ username }) success!` );
        resolve( [uid, userInfo] );
      } else {
        reject( body );
      }
    } );
  } )
    .then( ( [uid, userInfo] ) => {
      return createUserToken( uid, userInfo )
    } )
    .catch( error => {
      // dome something
      console.error( 'nodebb create user request failed!' );
      console.log( error )
    } )
};