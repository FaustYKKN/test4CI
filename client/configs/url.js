import page from 'epm-ui-boot/page';

/**
 * 集成 TDS Server 时需要的接口的配置
 * @type {string}
 */
export const tdsServerUrl = {
  user    : {
    getUser : ( uid, tdssUrl ) => `${ tdssUrl }/api/user/${ uid }`,
    getToken: ( tdssUrl ) => `${ tdssUrl }/api/token`
  },
  document: {
    getDocumentList       : ( tdssUrl ) => `${ tdssUrl }/api/document/list`,
    getDocumentListWithUID: ( uid, tdssUrl ) => `${ tdssUrl }/api/document/${ uid }/list`,
    deleteDocument        : ( id, tdssUrl ) => `${ tdssUrl }/api/document/${ id }/single`,
    addDocument           : ( tdssUrl ) => `${ tdssUrl }/api/document/single`,
    updateDocument        : ( id, tdssUrl ) => `${ tdssUrl }/api/document/${ id }/single`,
    buildDocument         : ( id, tdssUrl ) => `${ tdssUrl }/api/document/${ id }/build`
  },
  gitlab  : {
    fillUserPrivateToken: ( uid, tdssUrl ) => `${ tdssUrl }/api/user/${ uid }/gitlab/authorization`,
    getGitlabProjects   : ( uid, tdssUrl ) => `${ tdssUrl }/api/user/${ uid }/gitlab/projects`,
    getProjectBranches  : ( uid, projectId, tdssUrl ) => `${ tdssUrl }/api/user/${ uid }/gitlab/projects/${ projectId }/repository/branches`,
    isGitlabAuthorized  : ( uid, tdssUrl ) => `${ tdssUrl }/api/user/${ uid }/gitlab/isAuthorized`
  }
};

/*
 * sso单点登陆时所需要的接口
 * */
const ssoPrefix = 'cas/jwt';
export const ssoUrl = () => ( {
  login  : `${ page.context.ssoHost }/${ ssoPrefix }/login.do`,
  isLogin: `${ page.context.ssoHost }/${ ssoPrefix }/islogin.do`,
  token  : `${ page.context.ssoHost }/${ ssoPrefix }/token.do`,
  logout : `${ page.context.ssoHost }/${ ssoPrefix }/logout.do`
} );

/**
 * 开发者社区的接口配置
 * @type {string}
 */
const localAPIsPrefix = '/api';
export const localAPIs = () => ( {
  captcha       : `${ page.basename }${ localAPIsPrefix }/captcha`,
  login         : `${ page.basename }${ localAPIsPrefix }/login`,
  token         : `${ page.basename }${ localAPIsPrefix }/token`,
  user          : `${ page.basename }${ localAPIsPrefix }/user`,
  innerSource   : `${ page.basename }${ localAPIsPrefix }/inner-source`,
  allInnerSource: `${ page.basename }${ localAPIsPrefix }/innerSource/getAll`,
  production    : `${ page.basename }${ localAPIsPrefix }/production`,
  resource      : `${ page.basename }${ localAPIsPrefix }/resource`
} );

export default localAPIs;
