import React, { Component } from 'react';
import { Modal, Button, Table, FilterTable, Form, Input, Upload, Textarea, popup, Notification, Img, Select, Divider } from 'epm-ui-react';
import { filePathFormat } from '../../../utils/imgFilePathFormat';
import fetchWithToken from '../../../utils/fetchWithToken'
import page from 'epm-ui-boot/page';

class InnerSourceList extends Component {

  constructor( props ) {
    super( props );
    this.state = {
      // data: [],
      linkButton: [],
      modalType: '',
      modalData: {},
      user: [],
    };
    
    this.tempUploadFileID = '';
    this.tempUploadJSXID = '';

    this.formValidate = this.formValidate.bind( this );
    this.popupNotification = this.popupNotification.bind( this );
    this.createNodebbCategory = this.createNodebbCategory.bind( this );
  }

  componentDidMount() {
    this.getProduction();
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

  // 更新产品
  updateProduct( data ) {
    fetchWithToken( `${ page.basename }/api/innerSource`, {
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
        this.setState( { modalVisible: false } );
        this.getProduction();
      }
    } )
    .catch( err => {
      this.popupNotification( '产品更新失败', '失败原因：' + err.toString(), 'warning' );
    } )
  }

  getProduction( pageIndex = 1, pageSize = 100 ) {
    const params = `?pageIndex=${ pageIndex }&pageSize=${ pageSize }`;
    fetchWithToken( `${ page.basename }/api/innerSource/getAll${ params }`, {
      method: 'get'
    } )
    .then( res => res.json() )
    .then( data => {
      this.setState( { 
        data: data.data.data,
        // user: data.data.data.user,
       } );
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

  getPostLink( postID ) {

    fetchWithToken( `${ page.basename }/api/postLink/${ postID }`, {
      method: 'get'
    } )
    .then( res => res.json() )
    .then( data => {
      this.setState( { linkButton: data.data } );
    } )
  }

  setModalType( type, data ) {
    this.getPostLink( data.id );
    this.setState( { modalVisible: true, modalType: type, modalData: data } );
  }

  getModal() {
    return this.modal;
  }

  createNodebbCategory() {
    const { modalData } = this.state;

    const formData = {
      name: modalData.title,
      description: modalData.description,
      commentID: modalData.commentID,
      type: 'innerSource'
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
      alert('创建成功');
      this.setState( { modalVisible: false }, this.getProduction );
    } )
  }

  render() {
    const {} = this.props;
    const { linkButton, modalType, modalData, postCategoryList } = this.state;
    const readOnly = modalType === 'view' ? true : false;
    const columns = [
      {
        "title": "项目名称",
        "dataIndex": "title"
      },{
        "title": "开源人员",
        "renderer": ( value, key, data ) => {
          if( data.user ){
            let datastr = JSON.stringify( data.user );
            return data.user.username;
          }
          else{
            return "无人员信息";
          }
        },
      },{
        "title": "创建时间",
        "dataIndex": "createdAt",
        "renderer": ( v ) => new Date( v ).toLocaleString()
      },{
        "title": "更新时间",
        "dataIndex": "updatedAt",
        "renderer": ( v ) => new Date( v ).toLocaleString()
      },
      {
        "title": "操作",
        renderer: ( value, index, rowData ) => {
          return (
            <div>
              <a onClick={ this.setModalType.bind( this, 'view', rowData ) } style={{marginRight: '20px'}}>查看详情</a>
              <a onClick={ this.setModalType.bind( this, 'update', rowData ) } style={{marginRight: '20px'}}>编辑</a>
            </div>
          );
        }
      }
    ];

    let modalTitle = '';

    switch( modalType ) {
      case 'create': modalTitle = '新建开源'; break;
      case 'update': modalTitle = '编辑开源项目'; break;
      case 'view': modalTitle = '查看详情'; break;
    }

    return (
      <div>
        <h2 style={{ borderBottom: '1px solid rgb(136, 136, 141)', mariginBottom: '5px', paddingBottom: '10px' }}> 开源列表 </h2>
        <Button disabled>新增开源项目</Button>
        <div style={{ height: '5px' }}></div>
        <Table dataSource={ this.state.data } columns={ columns } />

        <Modal
          size='large'
          visible={ this.state.modalVisible }
          onClose={ () => this.setState( { modalVisible: false } ) }
        >
          <Modal.Header>
            <span>{ modalTitle }</span>
          </Modal.Header>
          <Modal.Body >
            <div className="post-modal">
              <Form
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
                      value={ modalType !== 'create' ? modalData.title : null }
                    />
                  </Form.Item>
                  <Form.Item required readOnly={ readOnly }>
                    <Form.Label>描述</Form.Label>
                    <Textarea 
                      name="description" placeholder="请输入产品描述" 
                      value={ modalType !== 'create' ? modalData.description : null }
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
                        action={ `${ page.basename }/api/file/upload/asdf` } 
                        accept="image/gif, image/jpeg, image/jpg, image/png"
                        onAfterUpload={ data => {
                          this.tempUploadFileID = data.data.id
                        }  }
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
                        action={ `${ page.basename }/api/file/upload/asdbcd` } 
                        onAfterUpload={ data => this.tempUploadJSXID = data.data.id }
                        onAfterChange={ file => {
                          if ( file.name.split( '.' ).pop() === 'jsx' ) {
                            return true;
                          } else {
                            alert( '仅可上传 .jsx 文件!' )
                            return false;
                          }
                         } }
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
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={ () => {
              this.setState( { modalVisible: false } );
            } }>{ modalType === 'view' ? '关闭' : '取消' }</Button>
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

export default InnerSourceList;
