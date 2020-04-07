# 接口定义

大家可以参考 [NodeBB 接口定义](https://raw.githubusercontent.com/NodeBB/nodebb-plugin-write-api/master/routes/v2/readme.md) 中的格式，来书写我们的接口定义。


#### 示例
* `/api`
  * `/likes`
    * `POST /`
      * 添加 like 信息
      * **Requires**: 
        
         * `username` 用户名
      * **Accepts**: 
        * `password` 密码
        * `email` 邮箱
      * **Response**
        * uid
        * ```
          {
           ...           
          }
          ```
      * 额外的一些解释信息。



### 返回 json 的格式

```
{
​   code: Number,
 ​  msg: String,
 ​  data: Object | String | Number | Null | Boolean
}
```

#### 关于code状态码的定义：

- 200: 成功
- 400 客户端请求的语法错误，服务器无法理解 (包括参数不全、参数错误)
- 401: 用户没有权限（令牌、用户名、密码错误)
- 403: 有权限但权限不足
- 500: 服务未知错误
- 。。。

#### 关于 msg 的提示信息：
Code 为 200 的时候可写可不写 ，否则需要写明错误信息。



#### 关于JWT中间件验证：

JWT中间件会对所有的请求进行身份认证。认证后的信息（成功信息和失败信息）都将挂在在ctx对象上，通过`ctx.user`可以访问到。

认证成功后，`ctx.user = { isLogin: true, info: Object }`，info中就是用户信息

认证失败后，`ctx.user = { isLogin: false, errInfo: { name: String, msg: String } }`，中间件认证失败后http状态码需要返回401.




## APIs

`prefix: '/api'`

* `/captcha`
  * `Get /` 
    * 获取验证码图片svg格式
    * Require
      * 无
    * Response
      * `result` : svg标签， 直接插入页面就可以显示了
      * `msg` : 提示信息


* `/user`
    - `Get /`
        * 查询用户信息, 用户登录之后访问此接口则自动通过token拿到用户信息，指定id和getAll参数只能由管理员权限完成
        * **Require**
            * user token
        * **Accepts**
            * `id` 用户ID
            * `all`= true | false
            * `page` 页码
            * `limit` 每页数据量
            * ···待定
        * **Response**
            * `data` :`{ id, worknumber, username, avatar, email, description, private_token }`
    
    - `post /`
        * 新增用户
        * **Require**
            * `username` 用户名
            * `password` 密码
            * `email` 邮箱
            * `captcha` 验证码
        * **Accepts**
            * `avatar` 头像url
            * `description` 签名
            * 。。。待定
* **Response**
            * `data`: `{ id, worknumber, username, avatar, email, description, private_token }`
        
    - `put /` 
        * 修改用户信息
        * **Require**
            * `id` 用户ID
        * **Accepts**
            * ···待定
        * **Response**
            * `data`: `{ id, worknumber, username, avatar, email, description, private_token }`

    - `delete /`
    
    - `post /getAll`
        * 获取符合条件的所有用户
        * **Require**
            * `pageSize` 分页每页展示数据量
            * `pageIndex` 分页当前页
        * **Accepts**
            * `avatar` 头像url
            * `description` 签名
            * `email` 邮箱
        * **Response**
            * `data`: `{ pageSize, pageIndex, pageTotal, data: [ user ] }`



* `/inner-source`
    - `get /`
        * 查询开源列表，无参数时默认返回第一页
        * **Require**
            
            * ...
        * **Accepts**
            * `userId` 用户ID
            * `id` 开源项目ID
            * `title` 开源项目名称
            * `page` 页码，默认为0
            * `limit` 每页数量，默认为9
            * ···待定
        * **Response**
            * `data`: `[ { id, title, description, createTime, likes，userId, coverImg,  } ]`
        - `Get /`
        
    - `post /`
        * 新增开源项目
        * **Require**
            * `title` 开源项目标题
            * `description` 开源项目描述
        * **Accepts**
            * `principal` 项目负责人
            * `phone` 开源人员电话
            * `email` 开源人员邮箱
        * **Response**
            * `data`: `{ id, title, description, principal, phone, email }` 



* `/resource`
    - `get /`
        * 查询资源，无参数时默认返回第一页
        * **Require**
            * ...
        * **Accepts**
            * `userId` 用户ID
            * `id` 资源ID
            * `title` 资源名称
            * `page` 页码，默认为0
            * `limit` 每页数量，默认为9
            * ···待定
        * **Response**
            * `data`: `[ { id, title, description, createTime，userId, coverImg,  } ]`
    - `post /`
        * 添加资源
        * **Require**
            * title 资源名称
            * files 可下载文件列表 Array<UID>
        * **Accepts**
            * `description` 资源描述
            * `cover_img` 资源背景图
            * `article` 资源详情页文档ID
            * `resource_type` 资源分类类别
        * **Response**
            * `data`: `[ { id, title, description, cover_img, article, files, likes, comment_id, resource_type } ]`
    
* `/production`
    - `get /`
        * 查询产品，无参数时默认返回第一页
        * **Require**
            * ...
        * **Accepts**
            * `userId` 用户ID
            * `id` 产品ID
            * `title` 产品名称
            * `page` 页码，默认为0
            * `limit` 每页数量，默认为9
            * ···待定
        * **Response**
            * `data`: `[ { id, title, description, createTime，userId, coverImg,  } ]`

* `/file`
    - `post /`
        * 上传文件
        * **Require**
            * `userId` 用户ID
            * `file` 上传的文件
        * **Accepts**
            * ···待定
        * **Response**
            * `data`: `[ { id, name, mime, file_path, size, user_id, download_count, last_down_id } ]`

* `/like`
    - `post /`
        * 创建一个新的 Like 记录
        * **Require**
            * `uid` 用户ID
            * `projectType` 喜欢的项目类型
            * `projectID` 喜欢的项目 id
        * **Accepts**
        * **Response**
            * `data`: `[ { id, user_id, unlike, project_type, project_id, user_id } ]`

* `/admin`
    - `get /all`
        * 获取系统所有信息
        * **Require**
        * **Accepts**
        * **Response**
            * `data`: `{ userTotal, userNewAdd, postTotal, postNewAdd, resourceTotal, resourceNewAdd, innerSourceTotal, innerSourceNewAdd }`

    - `get /topMenu`
        * 获取菜单
        * **Require**
        * **Accepts**
        * **Response**
            * `data`: `[{ id, name, url }]`
        
    - `post /topMenu`
        * 创建一个新的菜单
        * **Require**
        * **Accepts**
            * `name`
            * `url`
        * **Response**
            * `data`: `{ id, name, url }`

    - `put /topMenu`
        * 修改菜单
        * **Require**
            * `id`
            * `name`
            * `url`
        * **Accepts**
        * **Response**
            * `data`: `{ id, name, url }`

    - `delete /topMenu/:id`
        * 删除菜单
        * **Require**
        * **Accepts**
        * **Response**
            * `data`: `{}`





* `/login`

  * `POST /` 

    * 登录

    * **Require**

      * `username` 用户名
      * `password` 密码
      * `captcha` 验证码

    * **Response**

      * `msg`： 提示信息

      * `data`： token信息

        

