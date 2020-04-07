const { thirdPartyServicesInfo, comment } = require( '../../models' );
const { nodebbWriteApiHost } = require('../../config/config');
const { nodebbMasterToken } = require('../../../epm-ui-boot.config').context;
const request = require('request');
const uuidv1 = require('uuid/v1');
const { decode } = require('../../util/decode-token');
const { verify } = require('jsonwebtoken');

const url = nodebbWriteApiHost;

exports.getUserNodebbInfo = async userID => {
  const result = await thirdPartyServicesInfo.findOne( {
    where: {
      "owner": userID,
      "serveName": "nodebb"
    }
  } );

  // { uid, token }
  const info = JSON.parse( result.json );

  return info;
}; 

// 新建 NodeBB 一级分类
exports.createNodeBBCategory = params => {
  const { parentCid, name, description } = params;

  return new Promise( ( resolve, reject ) => {
    // 调用 write-api 创建新分类
    request( {
      url: `${ url }/categories`,
      method: 'POST',
      headers: {
        "Authorization": nodebbMasterToken,
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: `_uid=1&name=${ name }&parentCid=${ parentCid }&description=${ description }`
    }, async function( error, response, body ) {
      if (!error && response.statusCode === 200) {
        const data = JSON.parse(body);
        const { cid } = data.payload;

        console.log( 'nodebb create new category success!' );
        resolve( { cid } );
      } else {
        console.error( 'nodebb create new category request failed!' );
        reject();
      }
    } );
  } )
}
// 更新 NodeBB 分类信息
exports.updateNodeBBCategory = params => {
  const { cid, parentCid, name, description } = params;
  const requestBody = [];

  for ( const key in params ) {
    if ( key && key !== 'cid' ) requestBody.push( `${ key }=${ params[ key ] }` );
  }

  return new Promise( ( resolve, reject ) => {
    // 调用 write-api 创建新分类
    request( {
      url: `${ url }/categories/${ cid }`,
      method: 'PUT',
      headers: {
        "Authorization": nodebbMasterToken,
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: `_uid=1&${ requestBody.join('&') }`
    }, async function( error, response, body ) {
      if (!error && response.statusCode === 200) {
        const data = JSON.parse(body);
        const { cid } = data.payload;

        console.log( 'nodebb update category success!' );
        resolve( { cid } );
      } else {
        console.error( 'nodebb update category request failed!' );
        reject();
      }
    } );
  } )
}
// 删除 NodeBB 一级分类
exports.deleteNodeBBCategory = params => {
  const { cid } = params;

  return new Promise( ( resolve, reject ) => {
    // 调用 write-api 创建新分类
    request( {
      url: `${ url }/categories/${ cid }`,
      method: 'DELETE',
      headers: {
        "Authorization": nodebbMasterToken,
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: `_uid=1`
    }, async function( error, response, body ) {
      if (!error && response.statusCode === 200) {
        console.log( 'nodebb delete category success!' );
        resolve( { cid } );
      } else {
        console.error( 'nodebb delete category request failed!' );
        reject();
      }
    } );
  } )
}

// 新增 NodeBB 产品分类
exports.createNodeBBPost = async params => {
  const { parentCid, name, description, commentID } = params;

  // 调用 write-api 创建新分类
  request( {
    url: `${ url }/categories`,
    method: 'POST',
    headers: {
      "Authorization": nodebbMasterToken,
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: `_uid=1&name=${ name }&parentCid=${ parentCid }&description=${ description }`
  }, function( error, response, body ) {
    if (!error && response.statusCode === 200) {
      const data = JSON.parse(body);
      const { cid } = data.payload;

      console.log( 'nodebb create new category success!' )

      createNodeBBTopic( {
        cid: cid,
        title: `${ name }官方回复贴`,
        content: `这是 ${ name } 官方回复贴`,
        commentID
      } );
    } else {
      console.error( 'nodebb create new category request failed!' )
    }
  } );
};

// 删除 NodeBB 产品分类
exports.deleteNodeBBPost = async params => {
  const { cid } = params;

  // 调用 write-api 创建新分类
  request( {
    url: `${ url }/categories/${ cid }`,
    method: 'DELETE',
    headers: {
      "Authorization": nodebbMasterToken,
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: `_uid=1`
  }, function( error, response, body ) {
    if (!error && response.statusCode === 200) {
      console.log( 'nodebb delete category success!' )
    } else {
      console.error( 'nodebb delete category request failed!' )
    }
  } );
};

// 新增话题
async function createNodeBBTopic( params ) {
  // { parentCid, name, userid }
  const { cid, title, content, commentID } = params;

  // 调用 write-api 创建新主题
  request( {
    url: `${ url }/topics`,
    method: 'POST',
    headers: {
      "Authorization": nodebbMasterToken,
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: "_uid=1&cid=" + cid + "&title=" + title + "&content=" + content
  }, async function( error, response, body ) {
    if (!error && response.statusCode === 200) {
      const data = JSON.parse(body);
      const { topicData } = data.payload;

      await comment.findOne({
        where: {
          id: commentID
        }
      })
      .then( async comment => {
        await comment.update( { 
          nodebbCategoryID: cid, 
          nodebbTopicID: topicData.tid
        } )
        .then( result => {
          console.log( 'nodebb create new topic success!' )
        } )
      } )
    } else {
      console.error( 'nodebb create new topic request failed!' )
    }
  } );

};

exports.createNodeBBTopic = createNodeBBTopic;

// 发表回复
exports.reply = async ctx => {
  const { topicID, content, toPid } = ctx.request.body;
  const nodebbInfo = await this.getUserNodebbInfo( ctx.user.info.id );
  const { uid, token: userNodebbToken } = nodebbInfo;

  // console.log( topicID, content, nodebbInfo )
  // console.log( url, userNodebbToken, toPid );

  function replyToNodebb() {
    return new Promise( ( resolve, reject ) => {
      request( {
        url: `${ url }/topics/${ topicID }`,
        method: 'POST',
        headers: {
          "Authorization": `Bearer ${ userNodebbToken }`,
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: `_uid=${ uid }&content=${ content }${ toPid ? '&toPid='+toPid : '' }`
      }, function( error, response, body ) {
        console.log( error, response.statusCode, JSON.parse(body) );
        if (!error && response.statusCode === 200) {
          const data = JSON.parse(body);
          console.log( 'nodebb reply success!' );
          resolve( { 
            status: 200, 
            body: JSON.stringify( {
              msg: '回复成功',
              data: data.payload
            } )
          } );
        } else {
          console.error( 'nodebb reply request failed!' );
          resolve( { 
            status: 500, 
            body: JSON.stringify( {
              msg: '回复失败',
              data: JSON.parse(body)
            } ) 
          } );
        }
      } );
    } );
  }
  
  const { status, body } = await replyToNodebb();

  ctx.status = status;
  ctx.body = body;
};