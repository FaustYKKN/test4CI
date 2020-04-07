import { fetch } from "epm-ui-react";
import { ssoUrl, localAPIs } from "../configs/url";
import decodeJwt from "./decodeJwt";
import fetchWithToken from './fetchWithToken';
import page from 'epm-ui-boot/page';
import { popup, Notification } from 'epm-ui-react';
import React from 'react';

/*
* 判断用户是否已登录，
* 参数： 无
* 返回值： { state. jwtPayload } 如果登录则state为true，并可以拿到jwtPayload；为登录则state为false，且拿不到jwtPayload
* */
export function judgeLogin() {
  const {
    login, isLogin: isLoginUrl, token, logout
  } = ssoUrl();
  // 创建是否登录的标记
  return handleLogin()
    .then( ( res ) => {
      if( !isToken( localStorage.selfJwt ) ){
        transformJwt();
      }
      return res;
    } )
    .catch( err => {
      console.log( err );
      return err
    } );

  /*
  * 1. 判断localStorage是否存储了有效的token，Yes则标识用户已登录，No进行下一步
  * 2. 去CAS判断用户是否已经登录：Yes进行下一步，No进入catch
  * 3. 去CAS获取Token：Yes则登录成功，No进入catch
  * catch： 标识用户未登录
  * */
  function handleLogin () {
    const decode = isToken( localStorage.selfJwt ) || isToken( localStorage.ssoJwt );
    if ( decode ) {
      return Promise.resolve( { state: true, jwtPayload: decode  } );
    } else {
      return isLogin() // 判断是否在CAS登录
        .then(res => getToken()) // 去CAS拿token
        .then(token => {  // 本地存储token，改变用户状态
          localStorage.ssoJwt = token;
          const base64url = localStorage.ssoJwt.split('.')[1];
          if ( !base64url ) {
            localStorage.removeItem('ssoJwt');
            return false;
          }
          const jwtPayload = decodeJwt( base64url || '' );
          return { state, jwtPayload }
        })
        .catch(err => {
          // do something
          console.log( err )
        })
    }
  }

  function isLogin() {
    return new Promise( ( resolve, reject ) => {
      fetch( `${isLoginUrl}`, {
        method: 'POST',
        credentials: 'include',
      } ) .then( res => res.json() )
        .then( res => {
          if( res.returnStatus === 500 && res.returnInfo === "已登录" ) {
            resolve(true)
          }else {
            reject( res )
          }
        } )
    } )
  }

  function getToken() {
    return new Promise( ( resolve, reject ) => {
      fetch( `${token}`, {
        method: 'POST',
        credentials: 'include',
      } ) .then( res => res.json() )
        .then( res => {
          if( res.returnStatus === 200 ) {
            resolve( res.returnInfo )
          } else {
            reject( res )
          }
        } )
    } )
  }

}

/*
* pure function--本函数主要验证token是否过期
* 参数：{ token: 需要验证的token, config: {} }
* config的type参数说明的是返回值的类型，jwt：返回token字符串， 其他：返回payload对象
* */
export function isToken( token, config = {} ) {

  if( !token ){
    return false
  }else {
    return isValid( token )
  }

  function isValid( token ){
    if( token ) {
      const base64url = token.split('.')[1];
      if ( !base64url ) {
        localStorage.removeItem('ssoJwt');
        return false;
      }
      const payload = decodeJwt( base64url || '' );
      if( payload.exp*1000 >= Date.now() ){
        if( config.type === 'jwt' ){
          return token
        }else{
          return payload;
        }
      }
    }
    return false
  }
}

export function isTdssToken(token, config = {} ) {

  if( !token ){
    return false
  }else {
    return isValid( token )
  }

  function isValid( token ){
    if( token ) {
      const base64url = token.split('.')[1];
      if ( !base64url ) {
        localStorage.removeItem('tdssJwt');
        return false;
      }
      const payload = decodeJwt( base64url || '' );
      if( payload.exp*1000 >= Date.now() ){
        if( config.type === 'jwt' ){
          return token;
        }else{
          return payload;
        }
      }
    }else {
      return false;
    }
  }
}

/*
* 在拥有ssoJwt的基础上去拿到selfJwt；即用ssoJwt交换到selfJwt
* 参数： 无参数
* */
export async function transformJwt() {
  const res = await fetchWithToken( `${ localAPIs().token }`, {
    method: 'POST',
  } );

  let body = {};

  try { body = await res.json() }catch( err ) { throw err; }

  if( res.status === 200 ){
    if( body && body.data ) localStorage.selfJwt = body.data;
  }else if ( res.status === 403 ) {
    await localStorage.removeItem( 'ssoJwt' );
    await localStorage.removeItem( 'selfJwt' );

    popup( <Notification
      type="warning"
      message={ `登录异常` }
      duration={ 0 }
      key={ Math.random().toString() }
      description="很抱歉，因为您的帐号缺失邮箱信息，开发者社区的登录功能暂停使用！请发送包含 “姓名 + 工号 + 手机号” 的邮件到 yangdonglei@bonc.com.cn, 我们会以最快的速度为您处理并将结果告知您~"
    /> );
    await fetch( ssoUrl().logout, {
      method: 'POST',
      credentials: 'include',
    });
  } else{
    console.error( 'transformJwt: ', body.msg );
  }

  return res;
}

export default judgeLogin;
