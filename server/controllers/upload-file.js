const {
  uploadFile
} = require('../models');
const uuidv1 = require('uuid/v1');
const upload = require('../util/multer-util');
const decode = require('../util/decode-token');
const path = require('path');
const fs = require( 'fs' );
const unzipper = require('unzipper')
const mime = require( 'mime' );

// 递归删除文件及文件夹
function deleteFolderRecursive(path) {
  if( fs.existsSync(path) ) {
    fs.readdirSync(path).forEach(function(file) {
      var curPath = path + "/" + file;
      if(fs.statSync(curPath).isDirectory()) { // recurse
        deleteFolderRecursive(curPath);
      } else { // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
};

exports.find = async ctx => {
  // do something
  const params = JSON.parse(ctx.request.body);
  let res = {};

  await uploadFile.find({
    where: {
      id: params.id
    }
  } )
  .then((result) => {
    res = {
      code: 200,
      msg: 'success',
      data: result.get({
        plain: true
      })
    }
  })
  .catch( err => {
    ctx.status = 500;
    res = {
      code: 500,
      msg: err.toString(),
      data: {}
    };
  } )
  ctx.body = JSON.stringify(res);

};

exports.upload = async ctx => {
  const userInfo = ctx.user.info;
  const id = ctx.params.id;
  await upload.single('file')( ctx, async ctx => {
    const file = ctx.request.file;
    if (file) {
      let res = {};
      
      if ( id ) {
        await uploadFile.findOne({
          where: {
            id
          }
        })
        .then( async (result) => {
          fs.unlinkSync( result.get({ plain: true }).filePath );

          await result.update({
            name: file.originalname,
            mime: mime.getType( file.originalname ),
            filePath: file.path.split( path.sep ).join( '/' ),
            size: file.size,
            userID: userInfo.id, // 此处用户 id 必须已在用户表中存在
            downloadCount: 0
          })
          .then( ( result ) => {
            res = {
              code: 200,
              msg: 'success',
              data: result.get({
                plain: true
              })
            }
          } )
          .catch( err => {
            ctx.status = 500;
            res = {
              code: 500,
              msg: err.toString()
            };
          } )
        })
        .catch( err => {
          ctx.status = 500;
          res = {
            code: 500,
            msg: err.toString()
          };
        } )
      } else {
        await uploadFile.create({
          id: uuidv1(),
          name: file.originalname,
          mime: mime.getType( file.originalname ),
          filePath: file.path.split( path.sep ).join( '/' ),
          size: file.size,
          userID: userInfo.id, // 此处用户 id 必须已在用户表中存在
          downloadCount: 0
        })
        .then((result) => {
          res = {
            code: 200,
            msg: 'success',
            data: result.get({
              plain: true
            })
          }
        })
        .catch( err => {
          ctx.status = 500;
          res = {
            code: 500,
            msg: err.toString()
          };
        } )
      }
      
      ctx.body = JSON.stringify(res);
    }
  });

};

exports.uploadZip = async ctx => {
  const _ctx = ctx
  const userInfo = ctx.user.info;
  const id = ctx.params.id;
  await upload.single('file')( ctx, async ctx => {
    const file = ctx.request.file;
    if (file) {
      const filePath = file.path.split( path.sep ).join( '/' );
      
      //判断压缩文件是否存在
      if(!fs.existsSync(filePath)) return;
      //创建解压缩对象
      const zipName = file.path.split( path.sep ).pop();
      const target_path = './public/uploads/jsx/' + zipName.split( '.' ).shift() + '/';
      // let unzip_extract = unzip.Extract({ path: target_path });
      // //监听解压缩、传输数据过程中的错误回调
      // unzip_extract.on('error',(err)=>{
      //   console.log('file unzip error');
      // });
      // //监听解压缩、传输数据结束
      // unzip_extract.on('finish', async ()=>{
      //   console.log('finish');
      //   fs.unlink( filePath, ( err ) => {
      //     if ( err ) {
      //       console.log(err);
      //     } else {
      //       console.log('删除成功');
      //     }
      //   } );
        
      // });
      // //创建可读文件流，传输数据
      // await fs.createReadStream(filePath).pipe(unzip_extract);

      await fs.createReadStream(filePath).pipe(unzipper.Extract({ path: target_path }));
      fs.unlink( filePath, ( err ) => {
        if ( err ) {
          console.log(err);
        } else {
          console.log('删除成功');
        }
      } );
      
      let res = {};
      
      if ( id ) {
        await uploadFile.findOne({
          where: {
            id
          }
        })
        .then( async (result) => {
          deleteFolderRecursive( result.get({ plain: true }).filePath );

          await result.update({
            name: file.originalname,
            mime: mime.getType( file.originalname ),
            filePath: target_path,
            size: file.size,
            userID: userInfo.id, // 此处用户 id 必须已在用户表中存在
            downloadCount: 0
          })
          .then( ( result ) => {
            res = {
              code: 200,
              msg: 'success',
              data: result.get({
                plain: true
              })
            }
          } )
          .catch( err => {
            ctx.status = 500;
            res = {
              code: 500,
              msg: err.toString()
            };
          } )
        })
        .catch( err => {
          ctx.status = 500;
          res = {
            code: 500,
            msg: err.toString()
          };
        } )
      } else {
        await uploadFile.create({
          id: uuidv1(),
          name: file.originalname,
          mime: mime.getType( file.originalname ),
          filePath: target_path,
          size: file.size,
          userID: userInfo.id, // 此处用户 id 必须已在用户表中存在
          downloadCount: 0
        })
        .then((result) => {
          res = {
            code: 200,
            msg: 'success',
            data: result.get({
              plain: true
            })
          }
        })
        .catch( err => {
          ctx.status = 500;
          res = {
            code: 500,
            msg: err.toString()
          };
        } )
      }
      _ctx.body = JSON.stringify(res);
    }
  });

};

// 删除
exports.destroyFile = async ctx => {
  const { id } = ctx.params;
  let res = {};

  
  try {
    await uploadFile.findOne({
        where: {
          id
        }
      })
      .then(result => {
        const r = result.get({ plain: true });
        let filePath = r.filePath;
        if ( r.mime === 'application/zip' ) {
          filePath = filePath.split('/');
          filePath.pop();
          filePath = filePath.join('/');
          console.log( filePath );
          deleteFolderRecursive( filePath );
        } else {
          fs.unlinkSync( filePath );
        }

        result.destroy();
        // 此处需补充从计算机文件目录删除文件的操作
      } )

    res = {
      msg: '文件删除成功'
    }
  } catch ( err ) {
    ctx.status = 500;
    res = {
      code: 500,
      msg: err.toString(),
      data: {}
    };
  }

  ctx.body = JSON.stringify( res );
};

exports.getFileContent = async ctx => {
  const { id } = ctx.params;
  let res = {};

  try {
    const contentFile = await uploadFile.findOne({
      where: {
        id
      }
    });
    let filePath = contentFile.get( 'filePath' );
    if( filePath && typeof filePath === 'string' ) {
      filePath = path.resolve( filePath );
      if( fs.existsSync( filePath ) ) {
        res = {
          msg: '查询成功',
          data: ( fs.readFileSync( filePath ) || '' ).toString()
        }
      }else {
        throw new Error( '文件不存在！' );
      }
    }else {
      throw new Error( '文件路径出错！' );
    }
  } catch ( err ) {
    ctx.status = 500;
    res = {
      code: 500,
      msg: err.toString(),
      data: {}
    };
  }

  ctx.body = JSON.stringify( res );
  ctx.set('Content-Type', 'application/json');
};
