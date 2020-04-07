import { ssoUrl } from '../configs/url'

/*
* 去sso登录
* 参数：Object { username: String, password:  String }
* */
const loginToSso = function( data ) {
  console.log( 'login to sso', ssoUrl() );
  const formData = encodeURI( `username=${data.username}&password=${data.password}` );
  return fetch( ssoUrl().login, {
    body: formData,
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
    },
    method: 'POST',
    credentials: 'include',
  } )
    .then( res => res.json() )
    .then( res => {
      if( res.returnStatus === 200 ){
        localStorage.ssoJwt = res.returnInfo;
      }
      return res
    } )
    .catch( err => {
      console.log( err );
      return err
    } )
};

export default loginToSso
