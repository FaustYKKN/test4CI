const Op = require('sequelize').Op;
const {
  resource
} = require('../models');
const uuidv1 = require('uuid/v1');

exports.search = async ctx => {
  ctx.body = {
    code: 200,
    msg: '',
    data: [{
        id: '00001',
        title: 'captain0',
        description: 'oh my captain',
        createTime: '2019 16:49:22',
        userId: '00001',
        coverImg: '/images/inner-source/1.jpg'
      },]
  //     {
  //       id: '00001',
  //       title: 'captain0',
  //       description: 'oh my captain',
  //       createTime: '2019 16:49:22',
  //       userId: '00001',
  //       coverImg: '/images/inner-source/1.jpg'
  //     },
  //     {
  //       id: '00001',
  //       title: 'captain0',
  //       description: 'oh my captain',
  //       createTime: '2019 16:49:22',
  //       userId: '00001',
  //       coverImg: '/images/inner-source/1.jpg'
  //     },
  //     {
  //       id: '00001',
  //       title: 'captain0',
  //       description: 'oh my captain',
  //       createTime: '2019 16:49:22',
  //       userId: '00001',
  //       coverImg: '/images/inner-source/1.jpg'
  //     },
  //     {
  //       id: '00001',
  //       title: 'captain0',
  //       description: 'oh my captain',
  //       createTime: '2019 16:49:22',
  //       userId: '00001',
  //       coverImg: '/images/inner-source/1.jpg'
  //     },
  //     {
  //       id: '00001',
  //       title: 'captain0',
  //       description: 'oh my captain',
  //       createTime: '2019 16:49:22',
  //       userId: '00001',
  //       coverImg: '/images/inner-source/1.jpg'
  //     },
  //     {
  //       id: '00001',
  //       title: 'captain0',
  //       description: 'oh my captain',
  //       createTime: '2019 16:49:22',
  //       userId: '00001',
  //       coverImg: '/images/inner-source/1.jpg'
  //     },
  //   ]
  }
  return;
  // 以下代码可随时启用
  let res = {};
  await resource.findAll({
    raw: true
  })
  .then( ( resources ) => {
    res = {
      code: 200,
      msg: 'success',
      data: resources
    };
  } )
  .catch( ( err ) => {
    ctx.status = 500;
    res = {
      code: 500,
      msg: err.toString(),
      data: {}
    };
  } )
  ctx.body = JSON.stringify( res );
};

exports.create = async ctx => {
  const params = JSON.parse(ctx.request.body);
  let res = {};

  await resource.create( {
    id: uuidv1(),
    title: params.title,
    description: params.description,
    coverImg: params.coverImg,
    article: params.article,
    files: params.files,
    resourceType: params.resourceType
  } )
  .then( ( resource ) => {
    const data = resource.get({ plain: true });
    res = {
      code: 200,
      msg: 'success',
      data: data
    };
  } )
  .catch( ( err ) => {
    ctx.status = 500;
    res = {
      code: 500,
      msg: err.toString(),
      data: {}
    };
  } )
  ctx.body = JSON.stringify( res );
};
