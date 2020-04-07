import React, { Component, Children } from 'react';
import { Page, Layout, Menu, Avatar, popup } from 'epm-ui-react';
import '../../styles/admin.css';
import page from 'epm-ui-boot/page';

import Overview from '../components/admin/overview';
import TopMenu from '../components/admin/top-menu';
import InnerSourceList from '../components/admin/inner-source-list';
import ProductList from '../components/admin/product-list';
import ResourceList from '../components/admin/resource-list';
import Setting from '../components/admin/setting';
import User from '../components/admin/uesr';

import Login from '../components/login';
import { ssoUrl } from "../../configs/url";
import judgeLogin, { isToken } from '../../utils/judgeLogin';

class AdminPage extends Component {

  constructor( props ){
    super( props );
    this.state = {
      currentMenuIndex: 0,
      isLogin: false,
      jwtPayload: {},
      userPermission: 0
    };

    this.setLoginState = this.setLoginState.bind( this );
  }

  componentDidMount() {
    const style = document.createElement('link');

    style.rel = "stylesheet";
    style.href = `${ page.basename }/css/epm-ui.dark.min.css`;
    document.getElementsByTagName('head')[0].appendChild(style);
    this.setState( { theme: 'drak' } );

    judgeLogin().then( res => {
      if( res && res.state ){
        this.setState( {
          isLogin: true,
          jwtPayload: res.jwtPayload
        } )
      }
    } );
  }
  
  setLoginState() {
    this.setState( {
      isLogin: true,
      jwtPayload: isToken( localStorage.selfJwt ) || isToken( localStorage.ssoJwt )
    } );
  }

  logout() {
    localStorage.removeItem( 'ssoJwt' );
    localStorage.removeItem( 'selfJwt' );
    localStorage.removeItem( 'tdssJwt' );
    this.setState( {
      isLogin: false,
    } );
    fetch( `${ ssoUrl().logout }`, {
      method: 'POST',
      credentials: 'include',
    } ) .then( res => {
          // do something
        } )
  }

  getContentPage() {
    const { currentMenuIndex } = this.state;
    let component = null;

    switch( currentMenuIndex ) {
      case 0: component = <Overview />; break;
      case 1: component = <TopMenu />; break;
      case 2: component = <User />; break;
      case 3: component = <ProductList />; break;
      case 4: component = <ResourceList />; break;
      case 5: component = <InnerSourceList />; break;
      case 6: component = <Setting />; break;
      default: component = <Overview />; break;
    }

    return component;
  }

  menuClick( keyWord, nodeData ) {
    this.setState( { currentMenuIndex: keyWord[0].position } )
  }

  render() {
    const { currentMenuIndex, isLogin, jwtPayload } = this.state;
    const menu = [
        { title:'系统总览' },
        { title:'首页导航' },
        { title:'用户列表' },
        { title:'产品列表' },
        { title:'资源列表' },
        { title:'开源列表' },
        { title:'系统设置' }
    ];
    menu[ currentMenuIndex ].selected = true;

    return (
      <Layout style={{ background: 'rgb(34, 34, 34)' }} fullScreen>
        <Layout.Header height={60}>
          <div className='admin-header admin-flex'>
            <a className='logo' href="/"></a>
            <div className='admin-header-userinfo admin-flex-1'>
              {
                this.state.isLogin ?
                <React.Fragment>
                  <Avatar className='admin-header-avatar'>{ (jwtPayload.username || jwtPayload.userName || '').substring(0,1) }</Avatar>
                  <span className='admin-header-user'>{ jwtPayload.username }</span>
                  <a className='admin-header-logout' onClick={ this.logout.bind( this ) }>注销</a>
                </React.Fragment>
                : 
                <a 
                  className='admin-header-logout'
                  onClick={
                    () => popup( <Login setLoginState={ this.setLoginState } dark/> )
                  }>登录</a>
              }
            </div>
          </div>
        </Layout.Header>
        <Layout.Content style={{ top: '60px' }}>
          {
            isLogin && jwtPayload.permission === 1 ?
            <Layout fullScreen>
              <Layout.Sider overflow="hidden" width={ [200,0] } style={{ top: '60px' }}>
                <div className='admin-sider'>
                  <div className='admin-menu-title'>后台管理系统</div>
                  <div>
                    <Menu dataSource={ menu } bordered onSelect={ this.menuClick.bind( this ) }></Menu>
                  </div>
                </div>
              </Layout.Sider>
              <Layout.Content style={{ padding: '20px', overflow: 'auto' }}>
                  {
                    this.getContentPage()
                  }
              </Layout.Content>
            </Layout>
            : <span>权限不足, 非管理员用户</span>
          }
        </Layout.Content>
      </Layout>
    );
  }
}

export default AdminPage;
