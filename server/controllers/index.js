const user = require( './user' );
const innerSource = require( './inner-source' );
const uploadFile = require( './upload-file' );
const resource = require( './resource' );
const post = require( './post' );
const postCategory = require( './post-category' );
const like = require('./like');
const star = require( './star' );
const routerControl = require( './router-control' );
const admin = require( './admin' );
const nodebb = require('./nodebb');
const gitlab = require( '../third-party-services/gitlab/init-gitlab-user' );
const userGitlab = require( './gitlab' );
const captcha = require(  './captcha' );
const { login, logout } = require( './login-out' );
const token = require( './token' );
const innerSourceCategory = require( './inner-source-category' );
const productionCategory = require( './production-category' );
const postLink = require( './post-link' );
const innerSourceProjectAuthorization = require( './inner-source-authorization' );
const innerApply = require( './inner-source-apply' );
const setting = require( './setting' );
const innerSourceRecoding = require( './inner-source-recoding' )

module.exports = {
    user,
    innerSource,
    uploadFile,
    resource,
    like,
    star,
    routerControl,
    admin,
    nodebb,
    gitlab,
    innerApply,
    captcha,
    login,
    logout,
    token,
    post,
    postCategory,
    postLink,
    userGitlab,
    innerSourceCategory,
    productionCategory,
    innerSourceProjectAuthorization,
    setting,
    innerSourceRecoding
};