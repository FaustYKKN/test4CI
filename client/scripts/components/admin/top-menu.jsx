import React, { Component } from 'react';
import { Menu, Divider, Button, Table, Input } from 'epm-ui-react';
import page from 'epm-ui-boot/page';
import fetchWithToken from '../../../utils/fetchWithToken'

class TopMenu extends Component {

  constructor( props ) {
    super( props );
    this.state = {
      editID: null,
      menuData: []
    }

    this.editTemp = {};

    this.getMenu = this.getMenu.bind( this );
    this.createMenu = this.createMenu.bind( this );
    this.updateMenu = this.updateMenu.bind( this );
  }

  componentDidMount() {
    this.getMenu();
  }

  editMenu( rowData ) {
    this.setState( { editID: rowData.id } );
    this.editTemp = rowData;
  }

  getMenu() {
    fetchWithToken( `${ page.basename }/api/admin/topMenu`, {
      method: 'get'
    } )
    .then( res => res.json() )
    .then( data => {
      this.setState( { menuData: data.data } );
    } )
  }

  deleteMenu( id ) {
    fetchWithToken( `${ page.basename }/api/admin/topMenu/${ id }`, {
      method: 'delete'
    } )
    .then( res => res.json() )
    .then( data => {
      if ( data.msg === 'success' ) alert('删除成功');
      this.getMenu();
    } )
  }

  createMenu() {
    fetchWithToken( `${ page.basename }/api/admin/topMenu`, {
      method: 'post',
      headers: {
        "Content-Type": "Application/json"
      },
      body: JSON.stringify( { name: '', url: '' } )
    } )
    .then( res => res.json() )
    .then( data => {
      if ( data.msg === 'success' ) {
        alert('添加成功');
        this.getMenu();
      }
    } )
  }

  updateMenu() {
    fetchWithToken( `${ page.basename }/api/admin/topMenu`, {
      method: 'put',
      headers: {
        "Content-Type": "Application/json"
      },
      body: JSON.stringify( this.editTemp )
    } )
    .then( res => res.json() )
    .then( data => {
      if ( data.msg === 'success' ) {
        alert('更新成功');
        this.setState( { editID: null } );
        this.getMenu();
      }
    } )
  }

  render() {
    const {} = this.props;

    const columns = [
      {
        "title": "菜单名称",
        "dataIndex": "name",
        renderer: ( value, index, rowData ) => {
          return (
            this.state.editID === rowData.id ?
            <Input value={ value } onChange={ v => this.editTemp.name = v }/>
            :
            value
          );
        }
      },
      {
        "title": "跳转路径",
        "dataIndex": "url",
        renderer: ( value, index, rowData ) => {
          return (
            this.state.editID === rowData.id ?
            <Input value={ value } onChange={ v => this.editTemp.url = v }/>
            :
            value
          );
        }
      },
      {
        "title": "操作",
        renderer: ( value, index, rowData ) => {
          return (
            this.state.editID === rowData.id ?
            <div>
              <a style={{marginRight: '20px'}} onClick={ this.updateMenu }>保存</a>
              <a onClick={ this.editMenu.bind( this, null ) }>取消</a>
            </div>
            :
            <div>
              <a style={{marginRight: '20px'}} onClick={ this.editMenu.bind( this, rowData ) }>编辑</a>
              <a onClick={ this.deleteMenu.bind( this, rowData.id ) }>删除</a>
            </div>
          );
        }
      }
    ];

    return (
      <div>
        <h2 style={{ borderBottom: '1px solid rgb(136, 136, 141)', mariginBottom: '5px', paddingBottom: '10px' }}> 首页导航设置 </h2>
        <Button onClick={ this.createMenu }>新增菜单</Button>
        <div style={{ height: '5px' }}></div>
        <Table dataSource={ this.state.menuData } columns={ columns } />
      </div>
    );
  }
}

export default TopMenu;