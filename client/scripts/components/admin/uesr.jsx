import React, { Component } from 'react';
import { Menu, Divider, Button, Table, Input, Modal, Form, Pagination, Select } from 'epm-ui-react';
import page from 'epm-ui-boot/page';
import fetchWithToken from '../../../utils/fetchWithToken'

class Users extends Component {

  constructor( props ) {
    super( props );
    this.state = {
      userData: [],
      modalVisible: false,
      modalData: {},
      pageIndex: 1,
      pageSize: 20,
      pageTotal: 0,

      searchField: 'username'
    }

    this.getUser = this.getUser.bind( this );
    this.paginationChange = this.paginationChange.bind( this );
  }

  componentDidMount() {
    this.getUser();
  }

  getUser() {
    const { pageIndex, pageSize, searchField, searchValue } = this.state;
    const isQuery = searchValue !== undefined && searchValue !== null && searchValue !== '';

    fetchWithToken( `${ page.basename }/api/user/getAll`, {
      method: 'post',
      headers: {
        "Content-Type": "Application/json"
      },
      body: JSON.stringify( {
        pageIndex,
        pageSize,
        query: isQuery ? {
          [ searchField ]: searchValue
        } : {}
      } )
    } )
    .then( res => res.json() )
    .then( data => {
      this.setState( { 
        userData: data.data.data,
        pageSize: data.data.pageSize,
        pageTotal: data.data.pageTotal
      } );
    } )
  }

  paginationChange( pageIndex, pageSize ) {
    this.setState( { pageIndex, pageSize }, this.getUser )
  }

  // updateMenu() {
  //   fetchWithToken( `${ page.basename }/api/admin/topMenu`, {
  //     method: 'put',
  //     headers: {
  //       "Content-Type": "Application/json"
  //     },
  //     body: JSON.stringify( this.editTemp )
  //   } )
  //   .then( res => res.json() )
  //   .then( data => {
  //     if ( data.msg === 'success' ) {
  //       alert('更新成功');
  //       this.setState( { editID: null } );
  //       this.getMenu();
  //     }
  //   } )
  // }

  viewDetails( modalData ) {
    this.setState( { modalVisible: true, modalData } );
  }

  render() {
    const {} = this.props;
    const { modalData, pageIndex, pageSize, pageTotal } = this.state;
    const readOnly = true;
    const columns = [
      {
        "title": "用户名",
        "dataIndex": "username"
      },
      {
        "title": "工号",
        "dataIndex": "ssoId"
      },
      {
        "title": "邮箱",
        "dataIndex": "email"
      },
      {
        "title": "部门",
        "dataIndex": "",
        "renderer": ( v, i, d ) => {
          if ( !d.thirdPartyServicesInfos || d.thirdPartyServicesInfos.length === 0 ) return null;
          const ssoInfo = d.thirdPartyServicesInfos[0];
          const orgJson = JSON.parse( JSON.parse( ssoInfo.json ).orgs_json )[0];
          
          return orgJson.orgName;
        }
      },
      {
        "title": "创建时间",
        "dataIndex": "createdAt",
        "renderer": ( v ) => new Date( v ).toLocaleString()
      },
      {
        "title": "操作",
        renderer: ( value, index, rowData ) => {
          return (
            <div>
              <a style={{marginRight: '20px'}} onClick={ this.viewDetails.bind( this, rowData ) }>查看详情</a>
            </div>
          );
        }
      }
    ];

    return (
      <div>
        <h2 style={{ borderBottom: '1px solid rgb(136, 136, 141)', mariginBottom: '5px', paddingBottom: '10px' }}> 用户列表 </h2>
        <Button disabled>新增用户</Button>
        <div style={{ height: '10px' }}></div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ marginRight: '10px' }}>用户搜索：</span>
          <Select 
            defaultValue='username' 
            value={ this.state.searchField }
            onChange={ ( value ) => {
              this.setState( { searchField: value } );
            } }
          >
            <Select.Option value='username'>用户名</Select.Option>
            <Select.Option value='ssoId'>工号</Select.Option>
            <Select.Option value='email'>邮箱</Select.Option>
          </Select>
          <Input style={{ marginRight: '10px' }} onChange={ value => this.setState( { searchValue: value } ) }/>
          <Button onClick={ () => this.setState( { pageIndex: 1 }, this.getUser ) }>搜索</Button>
        </div>
        <div style={{ height: '10px' }}></div>
        <div style={{ minHeight: '300px' }}>
          <Table dataSource={ this.state.userData } columns={ columns } />
        </div>
        <div style={{ height: '10px' }}></div>
        <Pagination 
          index={ pageIndex } 
          total={ pageTotal } 
          size={ pageSize } 
          align='center'
          showDataSizePicker 
          onChange={ this.paginationChange }
        />


        
        <Modal
          visible={ this.state.modalVisible }
          onClose={ () => this.setState( { modalVisible: false } ) }
        >
          <Modal.Header>
            <span>用户详情</span>
          </Modal.Header>
          <Modal.Body >
            <div className="post-modal">
              <Form
                key="modal-form-2"
              >
                <Form.Layout type="horizontal">
                  <Form.Item required readOnly={ readOnly }>
                    <Form.Label>id</Form.Label>
                    <Input 
                      name="id"
                      value={ modalData.id }
                    />
                  </Form.Item>
                  <Form.Item required readOnly={ readOnly }>
                    <Form.Label>用户名</Form.Label>
                    <Input 
                      name="username"
                      value={ modalData.username }
                    />
                  </Form.Item>
                  <Form.Item required readOnly={ readOnly }>
                    <Form.Label>工号</Form.Label>
                    <Input 
                      name="ssoId"
                      value={ modalData.ssoId }
                    />
                  </Form.Item>
                  <Form.Item required readOnly={ readOnly }>
                    <Form.Label>部门</Form.Label>
                    <Input 
                      name="ssoId"
                      value={ ( (v) => {
                        if ( !v.thirdPartyServicesInfos || v.thirdPartyServicesInfos.length === 0 ) return '';
                        const ssoInfo = v.thirdPartyServicesInfos[0];
                        const orgJson = JSON.parse( JSON.parse( ssoInfo.json ).orgs_json )[0];
                        
                        return orgJson.orgName;
                      } )( modalData || {} ) }
                    />
                  </Form.Item>
                  <Form.Item required readOnly={ readOnly }>
                    <Form.Label>邮箱</Form.Label>
                    <Input 
                      name="email"
                      value={ modalData.email }
                    />
                  </Form.Item>
                  <Form.Item required readOnly={ readOnly }>
                    <Form.Label>来源</Form.Label>
                    <Input 
                      name="type"
                      value={ modalData.type }
                    />
                  </Form.Item>
                  <Form.Item required readOnly={ readOnly }>
                    <Form.Label>权限</Form.Label>
                    <Input 
                      name="permission"
                      value={ modalData.permission }
                    />
                  </Form.Item>
                  <Form.Item required readOnly={ readOnly }>
                    <Form.Label>创建时间</Form.Label>
                    <Input 
                      name="createdAt"
                      value={ new Date( modalData.createdAt ).toLocaleString() }
                    />
                  </Form.Item>
                </Form.Layout>
              </Form>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={ () => {
              this.setState( { modalVisible: false } );
            } }>关闭</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default Users;