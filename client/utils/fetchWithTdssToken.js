import { isToken } from './judgeLogin';

/*
 * 是一个对原生fetch的封装：在原生fetch的基础上，如果存在有效的selfJwt或者ssoJwt则会帮你在fetch的headers中加上 token
 * 参数：参考fetch
 * */
export default function fetchWithTdssToken ( url, config = {} ) {
  const jwt = isToken( localStorage.tdssJwt, { type: 'jwt' } );

  if ( !config.headers ) {
    config.headers = {};
  }
  jwt && ( config.headers.Authorization = jwt );

  return fetch( url, config );
}
