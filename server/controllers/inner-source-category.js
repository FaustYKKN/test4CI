const Op = require('sequelize').Op;
const {
  'innerSourceCategory': InnerSourceCategory,
  'innerSourceProject': InnerSourceProject,
  'innerSourceTypeThrough': InnerSourceTypeThrough,
} = require('../models');
const uuidv1 = require('uuid/v1');

// 用户的开源项目类别新建存储

exports.create = async ctx =>{
  const params = ctx.request.body;
  let res = {};
  const category = params.category;
  for( let i = 0; i<category.length; i++ ){
    let Category = await InnerSourceCategory.findOrCreate(
      {
        where: {
          title: category[i]
        },
        defaults: {
          id: uuidv1(),
          title: category[i]
        }
      }
    )
    let Project = await InnerSourceProject.findOne(
      {
        where: {
          id: params.projectid
        }
      }
    )
    // let Project = params.proj;
    const cate = Category[0];
    const proj = Project;
  
    await InnerSourceTypeThrough.findOrCreate( {
      where:{
        categoryID: cate.dataValues.id,
        projectID: proj.dataValues.id,
      },
      defaults:{
        id: uuidv1(),
        categoryID: cate.dataValues.id,
        projectID: proj.dataValues.id,
      }
    } )
    .then( () => {
      res = {
        code: 200,
        msg: 'success',
      }
    })
    .catch( ( err ) => {
      ctx.status = 500;
      res = {
        code: 500,
        msg: err.toString(),
        data: {}
      };
    } )
    ctx.body = JSON.stringify( res );
  }

}

exports.delete = async ctx =>{
  const { projectid } = ctx.query;
  let res = {};
  await InnerSourceTypeThrough.destroy(
    {
      where: {
        projectID: projectid
      }
    }
  )
  .then( () => {
    res = {
      code: 200,
      msg: 'delete success',
    }
  })
  .catch( ( err ) => {
    ctx.status = 500;
    res = {
      code: 500,
      msg: err.toString(),
      data: {}
    };
  } )
  ctx.body = JSON.stringify( res );

}