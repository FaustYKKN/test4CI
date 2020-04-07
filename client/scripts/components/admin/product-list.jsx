import React, { Component } from 'react';
import { Modal, Button, Table, Form, Input, Upload, Textarea, popup, Notification, Img, Select, Divider, Dialog } from 'epm-ui-react';
import page from 'epm-ui-boot/page';
import fetchWithToken from '../../../utils/fetchWithToken'
import { filePathFormat } from '../../../utils/imgFilePathFormat';

class ProductList extends Component {

  constructor( props ) {
    super( props );
    this.state = {
      postCategoryList: [],
      data: [],
      linkButton: [],
      modalType: '',
      modalData: {},
      categoryModalVisible: false
    };

    this.tempUploadFileID = '';
    this.tempUploadJSXID = '';
    this.editLinkDataTemp = {};
    this.editCategoryDataTemp = {};

    this.formValidate = this.formValidate.bind( this );
    this.popupNotification = this.popupNotification.bind( this );
    this.getProduction = this.getProduction.bind( this );
    this.addLinkButton = this.addLinkButton.bind( this );
    this.createNodebbCategory = this.createNodebbCategory.bind( this );
    this.closeModal = this.closeModal.bind( this );
  }

  componentDidMount() {
    this.getProduction();
    this.getPostCategory();
  }

  getPostCategory() {
    fetchWithToken( `${ page.basename }/api/postCategory`, {
      method: 'get'
    } )
    .then( res => res.json() )
    .then( data => {
      this.setState( { postCategoryList: data.data } );
    } )
  }

  formValidate( type, id ) {
    if ( this.getValidate().validate === false ) {
      alert( '表单填写错误' );
      return;
    }

    const formData = this.getValue();
    // 获取上传文件信息并且替换掉表单中的信息
    formData.coverImg = this.tempUploadFileID;
    formData.article = this.tempUploadJSXID;

    // 发起请求
    if ( type === 'create' ) {
      this.createProduct( formData );
    } else if ( type === 'update' ) {
      formData.id = id;
      this.updateProduct( formData );
    }
  }

  // 新建产品
  createProduct( data ) {

    fetchWithToken( `${ page.basename }/api/post`, {
      method: 'post',
      headers: {
        "Content-Type": "Application/json"
      },
      body: JSON.stringify( data )
    } )
    .then( res => res.json() )
    .then( data => {
      this.popupNotification( '产品添加成功', '成功添加产品：' + data.data.title, 'success' );
      this.closeModal()
      this.getProduction();
    } )
    .catch( err => {
      this.popupNotification( '产品添加失败', '失败原因：' + err.toString(), 'warning' );
    } )
  }

  // 更新产品
  updateProduct( data ) {
    fetchWithToken( `${ page.basename }/api/post`, {
      method: 'put',
      headers: {
        "Content-Type": "Application/json"
      },
      body: JSON.stringify( data )
    } )
    .then( res => res.json() )
    .then( data => {
      if ( data.msg === 'success' ) {
        this.popupNotification( '产品更新成功', '成功更新产品：' + data.data.title, 'success' );
        this.closeModal()
        this.getProduction();
      }
    } )
    .catch( err => {
      this.popupNotification( '产品更新失败', '失败原因：' + err.toString(), 'warning' );
    } )
  }

  deleteProduct( id ) {
    fetchWithToken( `${ page.basename }/api/post/${ id }`, {
      method: 'delete'
    } )
    .then( res => res.json() )
    .then( data => {
      if ( data.msg === 'success' ) alert('删除成功');
      this.getProduction();
    } )
  }

  getProduction( pageIndex = 1, pageSize = 30 ) {
    const params = `?pageIndex=${ pageIndex }&pageSize=${ pageSize }`;
    fetchWithToken( `${ page.basename }/api/post/getAll${ params }`, {
      method: 'get'
    } )
    .then( res => res.json() )
    .then( data => {
      this.setState( { data: data.data.data } );
    } )
  }

  popupNotification( msg, desc, type ) {
    this.notification = <Notification
                message={ msg }
                description={ desc }
                type={ type }
                key={ Math.random().toString() }
             />;
    popup( this.notification );
  }

  addLinkButton( postID ) {
    const linkButton = this.state.linkButton.concat([]);
    linkButton.push( { type: 'url' } );

    fetchWithToken( `${ page.basename }/api/postLink`, {
      method: 'post',
      headers: {
        "Content-Type": "Application/json"
      },
      body: JSON.stringify( {
        postID: postID,
        linkName: '',
        link: '',
        linkType: 'URL'
      } )
    } )
    .then( res => res.json() )
    .then( data => {
      this.getPostLink( this.state.modalData.id );
    } )

  }
  
  deletePostLink( postLinkID ) {
    const linkButton = this.state.linkButton.concat([]);
    linkButton.push( { type: 'url' } );

    fetchWithToken( `${ page.basename }/api/postLink/${ postLinkID }`, {
      method: 'delete'
    } )
    .then( res => res.json() )
    .then( data => {
      this.getPostLink( this.state.modalData.id );
    } )
  }

  getPostLink( postID ) {

    fetchWithToken( `${ page.basename }/api/postLink/${ postID }`, {
      method: 'get'
    } )
    .then( res => res.json() )
    .then( data => {
      this.setState( { linkButton: data.data } );
    } )
  }

  editPostLink( id ) {
    fetchWithToken( `${ page.basename }/api/postLink`, {
      method: 'put',
      headers: {
        "Content-Type": "Application/json"
      },
      body: JSON.stringify( {
        id: id,
        linkName: this.editLinkDataTemp.linkName,
        link: this.editLinkDataTemp.link
      } )
    } )
    .then( res => res.json() )
    .then( data => {
      this.editModalLink( null );
      this.getPostLink( this.state.modalData.id );
    } )
  }

  editModalLink( id ) {
    this.setState( { currentEditLink: id } );
  }

  setModalType( type, data ) {
    this.tempUploadJSXID = data.article && data.article.contentFile ? data.article.contentFile.id : '';
    this.tempUploadFileID = data.coverImg ? data.coverImg.id : '';
    this.getPostLink( data.id );
    this.setState( { modalVisible: true, modalType: type, modalData: data } );
  }

  closeModal( cancel ) {
    if ( cancel ) {
      const { modalData } = this.state;
      if ( this.tempUploadFileID && modalData.coverImgID === '' ) {
        this.deleteFile( this.tempUploadFileID );
      }
      if ( this.tempUploadJSXID && ( modalData.article === null || ( modalData.article && modalData.article.contentFileID === null ) ) ) {
        this.deleteFile( this.tempUploadJSXID );
      }
    }

    this.tempUploadJSXID = '';
    this.tempUploadFileID = '';
    this.setState({ modalVisible: false });
  }

  editPostCategoryData( id ) {
    this.setState( { currentEditCate: id } );
  }

  categoryFormValidate() {
    if ( this.getCategoryValidate().validate === false ) {
      alert( '表单填写错误' );
      return;
    }

    const formData = this.getCategoryValue();

    // 发起请求
    this.createPostCategory( formData );
  }

  createPostCategory( formData ) {
    fetchWithToken( `${ page.basename }/api/postCategory`, {
      method: 'post',
      headers: {
        "Content-Type": "Application/json"
      },
      body: JSON.stringify( formData )
    } )
    .then( res => res.json() )
    .then( data => {
      this.getPostCategory();
      this.setState( { categoryModalVisible: false } );
    } )
  }

  editPostCategory( id ) {
    fetchWithToken( `${ page.basename }/api/postCategory`, {
      method: 'put',
      headers: {
        "Content-Type": "Application/json"
      },
      body: JSON.stringify( {
        id: id,
        ...this.editCategoryDataTemp
      } )
    } )
    .then( res => res.json() )
    .then( data => {
      this.editPostCategoryData( null );
      this.getPostCategory();
    } )
  }

  deletePostCategory( id ) {
    fetchWithToken( `${ page.basename }/api/postCategory/${ id }`, {
      method: 'delete'
    } )
    .then( res => res.json() )
    .then( data => {
      this.getPostCategory();
    } )
  }
  
  createNodebbCategory() {
    const { modalData } = this.state;

    const formData = {
      name: modalData.title,
      description: modalData.description,
      commentID: modalData.commentID,
      parentCid: modalData.postCategory ? modalData.postCategory.nodebbCid : '',
      type: 'post'
    };
    fetchWithToken( `${ page.basename }/api/admin/createNodebbCategory`, {
      method: 'POST',
      headers: {
        "Content-Type": "Application/json"
      },
      body: JSON.stringify( formData )
    } )
    .then( res => res.json() )
    .then( data => {
      alert( '创建成功!' );
      this.setState( { modalVisible: false }, this.getProduction );
    } )
  }

  deleteFile( fileID, type ) {
    fetchWithToken( `${ page.basename }/api/file/upload/${ fileID }`, {
      method: 'DELETE'
    } )
    .then( res => res.json() )
    .then( data => {
      console.log( data.msg );
      if ( type === 'img' ) {
        this.tempUploadFileID = '';
      } else if ( type === 'jsx' ) {
        this.tempUploadJSXID = '';
      }
      this.forceUpdate();
    } )

    return true;
  }

  showDialog( cb ) {
    popup(<Dialog
            title="确认删除"
            message="是否确认删除？"
            type="confirm"
            onApproveClick={ (after) => {
              cb();
              after( true );
            } }
          />);
  }

  render() {
    const {} = this.props;
    const { linkButton, modalType, modalData, postCategoryList } = this.state;
    // type: create, edit, view
    const readOnly = modalType === 'view' ? true : false;

    const columns = [
      {
        "title": "产品名称",
        "dataIndex": "title"
      },
      {
        "title": "产品描述",
        "dataIndex": "description"
      },
      {
        "title": "产品类型",
        "dataIndex": "postCategory",
        "renderer": value => {
          let v = '';

          // switch( value.title ) {
          //   case 'production': v = '产品'; break;
          //   case 'document': v = '文档'; break;
          //   case 'private': v = '私服配置'; break;
          //   default: v = '产品';
          // }
          
          return value ? value.text : null;
        }
      },
      {
        "title": "操作",
        renderer: ( value, index, rowData ) => {
          return (
            <div>
              <a onClick={ this.setModalType.bind( this, 'view', rowData ) } style={{marginRight: '20px'}}>查看详情</a>
              <a onClick={ this.setModalType.bind( this, 'update', rowData ) } style={{marginRight: '20px'}}>编辑</a>
              <a onClick={ () => this.showDialog( this.deleteProduct.bind( this, rowData.id ) ) }>删除</a>
            </div>
          );
        }
      }
    ];

    const modalLinkColumns = [
      {
        title: '链接名称',
        dataIndex: 'linkName',
        renderer: ( value, index, rowData ) => {
          return (
            this.state.currentEditLink === rowData.id ?
            <Input value={ value } onChange={ v => this.editLinkDataTemp.linkName = v }/>
            :
            value
          );
        }
      },
      {
        title: '链接内容',
        dataIndex: 'link',
        renderer: ( value, index, rowData ) => {
          return (
            this.state.currentEditLink === rowData.id ?
            <Input value={ value } onChange={ v => this.editLinkDataTemp.link = v }/>
            :
            value
          );
        }
      },
      {
        "title": "操作",
        renderer: ( value, index, rowData ) => {
          return (
            rowData.id === this.state.currentEditLink ?
            <div>
              <a style={{marginRight: '20px'}} onClick={ this.editPostLink.bind( this, rowData.id ) }>保存</a>
              <a onClick={ this.editModalLink.bind( this, null ) }>取消</a>
            </div>
            :
            <div>
              <a onClick={ this.editModalLink.bind( this, rowData.id ) } style={{marginRight: '20px'}}>编辑</a>
              <a onClick={ () => this.showDialog( this.deletePostLink.bind( this, rowData.id ) ) }>删除</a>
            </div>
          );
        }
      }
    ];
    const modalLinkViewColumns = [
      {
        title: '链接名称',
        dataIndex: 'linkName'
      },
      {
        title: '链接内容',
        dataIndex: 'link'
      }
    ];
    
    const postCategoryColumns = [
      {
        title: '分类名称',
        dataIndex: 'title',
        renderer: ( value, index, rowData ) => {
          return (
            this.state.currentEditCate === rowData.id ?
            <Input value={ value } onChange={ v => this.editCategoryDataTemp.title = v }/>
            :
            value
          );
        }
      },
      {
        title: '分类显示名称',
        dataIndex: 'text',
        renderer: ( value, index, rowData ) => {
          return (
            this.state.currentEditCate === rowData.id ?
            <Input value={ value } onChange={ v => this.editCategoryDataTemp.text = v }/>
            :
            value
          );
        }
      },
      {
        title: '分类描述',
        dataIndex: 'description',
        renderer: ( value, index, rowData ) => {
          return (
            this.state.currentEditCate === rowData.id ?
            <Input value={ value } onChange={ v => this.editCategoryDataTemp.description = v }/>
            :
            value
          );
        }
      },
      {
        "title": "操作",
        renderer: ( value, index, rowData ) => {
          return (
            rowData.id === this.state.currentEditCate ?
            <div>
              <a style={{marginRight: '20px'}} onClick={ this.editPostCategory.bind( this, rowData.id ) }>保存</a>
              <a onClick={ this.editPostCategoryData.bind( this, null ) }>取消</a>
            </div>
            :
            <div>
              <a onClick={ this.editPostCategoryData.bind( this, rowData.id ) } style={{marginRight: '20px'}}>编辑</a>
              <a onClick={ () => this.showDialog ( this.deletePostCategory.bind( this, rowData.id ) ) }>删除</a>
            </div>
          );
        }
      }
    ];

    const postCategoryOptions = postCategoryList.map( item => {
      let text = '';
      // switch( item.title ) {
      //   case 'production': text = '产品'; break;
      //   case 'document': text = '文档'; break;
      //   case 'private': text = '私服配置'; break;
      //   default: text = '产品';
      // }
      return {
        text: item.text,
        value: item.title
      }
    } )

    let modalTitle = '';

    switch( modalType ) {
      case 'create': modalTitle = '新建产品'; break;
      case 'update': modalTitle = '编辑产品'; break;
      case 'view': modalTitle = '查看详情'; break;
    }

    return (
      <div>
        <h2 style={{ borderBottom: '1px solid rgb(136, 136, 141)', mariginBottom: '5px', paddingBottom: '10px' }}> 分类列表 </h2>
        
        <Button onClick={ () => this.setState( { categoryModalVisible: true } ) }>新增分类</Button>
        <div style={{ height: '5px' }}></div>
        <Table dataSource={ this.state.postCategoryList } columns={ postCategoryColumns } />

        <h2 style={{ borderBottom: '1px solid rgb(136, 136, 141)', mariginBottom: '5px', paddingBottom: '10px' }}> 产品列表 </h2>
        <Button onClick={ this.setModalType.bind( this, 'create' ) }>新增产品</Button>
        <div style={{ height: '5px' }}></div>
        <Table dataSource={ this.state.data } columns={ columns } />

        <Modal
          visible={ this.state.categoryModalVisible }
          onClose={ () => this.setState( { categoryModalVisible: false } ) }
        >
          <Modal.Header>
            <span>新建分类</span>
          </Modal.Header>
          <Modal.Body >
            <div className="post-modal">
              <Form
                key="modal-form-1"
                clueType="tooltip"
                getter={ ( getter ) => {
                  this.getCategoryValue = getter.getValue;
                  this.getCategoryValidate = getter.getValidate;
                } }
              >
                <Form.Layout type="horizontal">
                  <Form.Item required readOnly={ readOnly }>
                    <Form.Label>分类字段</Form.Label>
                    <Input 
                      name="title" placeholder="如：production" 
                    />
                  </Form.Item>
                  <Form.Item required readOnly={ readOnly }>
                    <Form.Label>展示名称</Form.Label>
                    <Input 
                      name="text" placeholder="如：产品" 
                    />
                  </Form.Item>
                  <Form.Item readOnly={ readOnly }>
                    <Form.Label>描述</Form.Label>
                    <Textarea 
                      name="description" placeholder="请输入分类描述" 
                    />
                  </Form.Item>
                </Form.Layout>
              </Form>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={ () => {
              this.setState( { categoryModalVisible: false } );
            } }>关闭</Button>
            <Button onClick={ this.categoryFormValidate.bind( this ) }>保存</Button>
          </Modal.Footer>
        </Modal>

        <Modal
          size='large'
          visible={ this.state.modalVisible }
          onClose={ () => this.closeModal( true ) }
        >
          <Modal.Header>
            <span>{ modalTitle }</span>
          </Modal.Header>
          <Modal.Body >
            <div className="post-modal">
              <Form
                key="modal-form-2"
                clueType="tooltip"
                getter={ ( getter ) => {
                  this.getValue = getter.getValue;
                  this.getValidate = getter.getValidate;
                } }
              >
                <Form.Layout type="horizontal">
                  <Form.Item required readOnly={ readOnly }>
                    <Form.Label>名称</Form.Label>
                    <Input 
                      name="title" placeholder="请输入产品名称" 
                      value={ modalType !== 'create' ? modalData.title : '' }
                    />
                  </Form.Item>
                  <Form.Item required readOnly={ readOnly }>
                    <Form.Label>描述</Form.Label>
                    <Textarea 
                      name="description" placeholder="请输入产品描述" 
                      value={ modalType !== 'create' ? modalData.description : '' }
                    />
                  </Form.Item>
                  <Form.Item required readOnly={ readOnly }>
                    <Form.Label>类别</Form.Label>
                    <Select 
                      name="postCategory" placeholder="请选择产品类别" 
                      dataSource={ postCategoryOptions }
                      value={ modalData.postCategory ? modalData.postCategory.title : '' }
                    />
                  </Form.Item>
                  <Form.Item required readOnly={ readOnly }>
                    <Form.Label>评论首页展示</Form.Label>
                    <Select name="commentShowIndex" value={ modalData.commentShowIndex || 'false' }>
                      <Select.Option value="true" >是</Select.Option>
                      <Select.Option value="false" >否</Select.Option>
                    </Select>
                  </Form.Item>
                  <Form.Item disabled={ readOnly }>
                    <Form.Label>产品背景</Form.Label>
                    { modalType !== "view"
                      ?
                      <Upload 
                        name="file"
                        accept="image/gif, image/jpeg, image/jpg, image/png"
                        fileList={ this.tempUploadFileID ? [ { name: modalData.coverImg.name } ] : ''  }
                        onAfterChange={ file => {
                          const formData = new FormData();
                          formData.append('file', file);
                          fetchWithToken( `${ page.basename }/api/file/upload${ this.tempUploadFileID ? `/${this.tempUploadFileID}` : '' }`, {
                            method: this.tempUploadFileID ? "PUT" : "POST",
                            body: formData,
                          } )
                          .then( res => res.json() )
                          .then( data => {
                            this.tempUploadFileID = data.data.id
                          } )

                          return true;
                         } }
                        onRemove={ ( file ) => this.deleteFile( this.tempUploadFileID, 'img' ) }
                      />
                      : <div style={{ height: '36px' }}></div>
                    }
                    {
                      modalType !== 'create' 
                      && 
                      <Img type="fit" 
                        style={{ height: '100px' }} 
                        src={ modalData.coverImg ? filePathFormat( modalData.coverImg.filePath ) : null } 
                      />
                    }
                  </Form.Item>
                  <Form.Item readOnly={ readOnly }>
                    <Form.Label>产品详情</Form.Label>
                    { modalType !== "view"
                      ?
                      <Upload 
                        name="file" placeholder="上传产品详情页" 
                        fileList={ this.tempUploadJSXID ? [ { name: modalData.article.contentFile.name } ] : ''  }
                        onAfterChange={ file => {
                          if ( file.name.split( '.' ).pop() === 'zip' ) {
                            const formData = new FormData()
                            formData.append('file', file)
                            fetchWithToken( `${ page.basename }/api/file/uploadZip${ this.tempUploadJSXID ? `/${this.tempUploadJSXID}` : '' }`, {
                              method: this.tempUploadJSXID ? "PUT" : "POST",
                              body: formData
                            } )
                            .then( res => res.json() )
                            .then( data => {
                              this.tempUploadJSXID = data.data.id
                            } )

                            return true;
                          } else {
                            alert( '仅可上传 .zip 文件!' )
                            return false;
                          }
                         } }
                         onRemove={ ( file ) => this.deleteFile( this.tempUploadJSXID, 'jsx' ) }
                      />
                      : <div style={{ height: '36px' }}></div>
                    }
                    {
                      modalType !== 'create' 
                      && 
                      <Img type="fit" 
                        style={{ height: '100px' }} 
                        title="暂无产品详情预览功能" 
                      />
                    }
                  </Form.Item>
                  { 
                    modalType === "update"
                    ?
                    <Form.Item readOnly={ readOnly }>
                      <Form.Label>社区分类及话题</Form.Label>
                      <Button 
                        disabled={ 
                          modalType === "view" ||
                          readOnly ||
                          modalData.comment ? 
                          modalData.comment.nodebbCategoryID || modalData.comment.nodebbTopicID
                          : readOnly
                        } 
                        onClick={ this.createNodebbCategory }
                      >创建社区分类及话题</Button>
                    </Form.Item>
                    : null
                  }
                </Form.Layout>
              </Form>
                {
                  modalType !== 'create' &&
                  <div>
                    <div 
                      style={{ paddingRight: '1rem', display: 'inline-block', fontWeight: 'bold', width: '6em', textAlign: 'right' }}
                    >超链接</div>
                    {
                      modalType === 'update' 
                      && <Button onClick={ this.addLinkButton.bind( this, modalData.id ) }>添加超链接</Button>
                    }
                  </div>
                }
                {
                  modalType !== 'create' && linkButton.length > 0 && 
                  <div style={{ paddingLeft: '5.3rem' }}>
                    <Table 
                      dataSource={ linkButton } 
                      columns={ modalType === 'view' ? modalLinkViewColumns : modalLinkColumns } 
                    ></Table>
                  </div>
                }
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={ () => this.closeModal( true ) }>{ modalType === 'view' ? '关闭' : '取消' }</Button>
            {
              modalType !== 'view' 
              && <Button onClick={ this.formValidate.bind( this, modalType, modalData.id ) }>保存</Button>
            }
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default ProductList;
