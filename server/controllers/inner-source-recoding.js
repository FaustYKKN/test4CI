const {
    'innerSourceRecoding': InnerSourceRecoding,
} = require('../models');
const uuidv1 = require('uuid/v1');

// 用户的开源项目新建存储
exports.create = async ctx =>{
    const params = ctx.request.body;
    let res = {};
    await InnerSourceRecoding.create({
        id: uuidv1(),
        title: params.data.title,
        description: params.data.description,
        gitlabStarCount: params.data.gitlabStarCount,
        gitlabProjectID: params.data.gitlabProjectID,
        gitlabRepository: params.data.gitlabRepository,
        commentShowIndex: params.data.commentShowIndex,
        userID: params.data.userID,
        commentID: params.data.commentID,
        articleID: params.data.articleID,
        coverImgID: params.data.coverImgID,
        createdAt: params.data.createdAt,
        updatedAt: params.data.updatedAt,
    })
        .then( async (  ) => {
            res = {
                code: 200,
                msg: 'success',
                data: "成功加入记录"
            };
        })
        .catch( ( err ) => {
            ctx.status = 500;
            res = {
                code: 500,
                msg: err.toString(),
                data: "加入记录失败"
            };
        } );

    ctx.body = JSON.stringify( res );
}
