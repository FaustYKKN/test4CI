import { isToken } from './judgeLogin';
import { fetch } from 'epm-ui-react';
import { ssoUrl } from '../configs/url';
import React from 'react';
import { Notification, popup } from 'epm-ui-react';
/*
 * 是一个对原生fetch的封装：在原生fetch的基础上，如果存在有效的selfJwt或者ssoJwt则会帮你在fetch的headers中加上 token
 * 参数：参考fetch
 * */
export default async function fetchWithSsoToken ( url, config = {} ) {
  let jwt = isToken( localStorage.ssoJwt, { type: 'jwt' } );

  if ( !config.headers ) {
    config.headers = {};
  }
  if ( !jwt ) {
    const isLogin = await queryIsLogin();

    if( isLogin ) {
      // Update jwt
      jwt = isToken( localStorage.ssoJwt, { type: 'jwt' } );
      if( jwt ) {
        config.headers.Authorization = jwt;

        return await fetch( url, config );
      }else {
        popup( <Notification
          type="warning"
          duration={ 0 }
          position="bottom-right"
          message={ `❗ 获取文档信息失败啦，单点登录验证失败。` }
          key={ Math.random().toString() }
          description="单点登录也许已经超时啦，不妨尝试重新登录一下 😊，若还不行请移步到社区，联系网站维护人员。。"
        /> );
      }
    }else {
      popup( <Notification
        type="warning"
        duration={ 0 }
        position="bottom-right"
        message={ `❗ 获取文档信息失败啦，请重新登录。` }
        key={ Math.random().toString() }
        description="单点登录也许已经超时啦，不妨尝试重新登录一下 😊，若还不行请移步到社区，联系网站维护人员。。"
      /> );
    }
  }else {
    config.headers.Authorization = jwt;

    return await fetch( url, config );
  }
}

async function queryIsLogin () {
  const res = await fetch( ssoUrl().isLogin, {
    method: 'POST',
    credentials: 'include'
  } );
  const info = await res.json();

  if ( info.returnStatus === 500 && info.returnInfo === '已登录' ) {
    await updateSsoToken();

    return true;
  }else {
    return false;
  }
}

async function updateSsoToken () {
  const res = await fetch( `${ ssoUrl().token }`, {
    method     : 'POST',
    credentials: 'include'
  } );

  if( res.status === 200 ) {
    const info = await res.json();
    if( info.returnStatus === 200 ) {
      const token = info.returnInfo;
      const base64url = token.split('.')[1];

      if ( !base64url ) {
        localStorage.removeItem('ssoJwt');
        console.error( '单点 token 无效！请检查单点认证返回值。' );
      }else {
        localStorage.ssoJwt = token;
      }
    }
  }

}
