const Router = require( 'koa-router' );
const koaBody = require( 'koa-body' );
const testController = require( './controllers/test-ctl' );
const {
  innerSource,
  user,
  uploadFile,
  post,
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
  postCategory,
  postLink,
  userGitlab,
  innerSourceCategory,
  productionCategory,
  innerSourceRecoding,
  innerSourceProjectAuthorization,
  setting
} = require( './controllers' );
const nodebbControllers = require( './third-party-services/nodebb/nodebb-controllers' );
const upload = require('./util/multer-util');
const authorizeRouterArr = require( './config/config' ).routerControl;

const getRouter = () => {
  const router = new Router({
    prefix: '/api'
  });

  // auto response requests that need login but not login;
  router.use( authorizeRouterArr, routerControl );

  // test
  router.get( '/test/getData', testController.getData );
  router.post( '/test/addData', testController.addData );

  // token transform ( other system to self system )
  router.post( '/token', token );
  // captcha
  router.get( '/captcha', captcha );
  router.get( '/test', ctx => {
    ctx.body = ctx.cookies.get('captcha')
  } );

  // login-out
  router.post( '/login', koaBody(), login );
  router.get(  '/logout', logout );

  // about user
  router.get( '/user', user.find );
  router.get( '/user/inn', user.search );
  router.post( '/user', koaBody(), user.create );
  router.post( '/user/getAll', koaBody(), user.findAll );

  // about inner-source
  router.get( '/innerSource', innerSource.find );
  router.post( '/inner-source', koaBody(), innerSource.create );
  router.get( '/innerSource/getAll', innerSource.findAll );    //数据库中查找所有用户已开源的项目
  router.get( '/innerSource/search', innerSource.search );
  router.put( '/innerSource', koaBody(), innerSource.update );
  router.post( '/innerSource/delete', koaBody(), innerSource.delete );      //删除已开源项目
  router.post( '/innerSource/update', innerSource.updatedesc );

  // about inner-source-category
  router.post( '/innerCate', koaBody(), innerSourceCategory.create );
  router.delete( '/innerCate', koaBody(), innerSourceCategory.delete );

  // about file
  router.post( '/file/upload', uploadFile.upload );
  router.put( '/file/upload/:id', uploadFile.upload );
  router.post( '/file/uploadZip', uploadFile.uploadZip );
  router.put( '/file/uploadZip/:id', uploadFile.uploadZip );
  router.get( '/file/upload/:id/getFileContent', uploadFile.getFileContent );
  router.delete( '/file/upload/:id', uploadFile.destroyFile );

  // about post
  router.get( '/post/getOne/:id', post.find );
  router.get( '/post/getAll', post.findAll );
  router.post( '/post', koaBody(), post.create );
  router.put( '/post', koaBody(), post.updatePost );
  router.delete( '/post/:id', koaBody(), post.destroyPost );

  // about postLink
  router.get( '/postLink/:postID', postLink.find );
  router.post( '/postLink', koaBody(), postLink.create );
  router.put( '/postLink', koaBody(), postLink.updatePostLink );
  router.delete( '/postLink/:id', postLink.destroyPostLink );

  // about postCategory
  router.get( '/postCategory', postCategory.findAll );
  router.post( '/postCategory', koaBody(), postCategory.create );
  router.put( '/postCategory', koaBody(), postCategory.update );
  router.delete( '/postCategory/:id', koaBody(), postCategory.destroyPostCategory );

  // about productionCategory
  router.get( '/productionCategory', productionCategory.findID );

  // about resource
  router.get( '/resource', resource.search );
  router.post( '/resource', koaBody(), resource.create );

  // about like
  router.post( '/like', koaBody(), like.create );
  router.get( '/like/:uid', koaBody(), like.findOfUID );

  // about star
  router.get( '/star/find', star.find );
  router.get( '/star/countAll', star.countAll );
  router.post( '/star', koaBody(), star.create );
  router.put( '/star', koaBody(), star.update );

  // about admin
  router.get( '/admin/all', admin.searchAdminAll );
  router.get( '/admin/topMenu', admin.getTopMenu );
  router.post( '/admin/topMenu', koaBody(), admin.createTopMenu );
  router.put( '/admin/topMenu', koaBody(), admin.updateTopMenu );
  router.delete( '/admin/topMenu/:id', koaBody(), admin.destroyTopMenu );
  router.post( '/admin/createNodebbCategory', koaBody(), admin.createNodebbCategory );

  // about nodebb
  router.post( '/nodebb/users', koaBody(), nodebb.createUser );
  router.post( '/nodebb/reply', koaBody(), nodebbControllers.reply );
  router.post( '/nodebb/initNodebbCategory', nodebb.initNodebbCategory );

  // about gitlab
  router.post( '/gitlab', koaBody(), gitlab.fillUserPrivateToken );
  router.get( '/gitlab/isAuthor',  gitlab.isAuthor );             //判断用户是否开源（查询数据库中是否有对应的用户信息）
  router.get( '/gitlab/inInner/:uid', gitlab.inInner );
  router.get( '/gitlab/innerUser', koaBody(), gitlab.innerUser );
  router.get( '/gitlab/findInnerProjects', gitlab.findInnerProjects );
  router.get( '/gitlab/findImages', gitlab.findImages );
  router.get( '/gitlab/findInfo', gitlab.infoFind );
  // router.post( '/gitlab/shareProject', koaBody(), gitlab.shareProject );  // （ 共享项目到组 ） 接口已被 gitlab npm 包替代从前端调用，无需后端接口调用；
  // router.delete( '/gitlab/unshareProject', koaBody(), gitlab.unshareProject );   //接口443错误
  // router.get( '/gitlab/findFiles', gitlab.findFiles )；   // ( 读取文件（ README.md ）中的内容 ) 接口已被 gitlab npm 包替代从前端调用，无需后端接口调用；
  // router.get( '/gitlab/project', gitlab.getGitlabProjects );    // （ 获取用户所有 Project 项目的接口 ） 接口已被 gitlab npm 包替代从前端调用，无需后端接口调用
  // router.get( '/gitlab/projectBranches', gitlab.projectBranches );    // （ 获取项目的分支数 ） 接口已被 gitlab npm 包替代从前端调用，无需后端接口调用

  // about userGitlab
  router.get( '/userGitlab', userGitlab.find );

  // about innerSourceAuthorization
  // router.post( '/innerAuthorization', koaBody(), innerSourceProjectAuthorization.create ); //停用 （原记录项目是否开源）

  // about innerSourceRecoding
  router.post( '/innerRecoding', koaBody(), innerSourceRecoding.create ); //停用 （原记录项目是否开源）

  // about innerSourceApply
  router.get( '/innerSourceApply', innerApply.find );

  // about setting
  router.get( '/setting', setting.findAll );
  router.post( '/setting', koaBody(), setting.update );

  return router;
};

module.exports = getRouter();
