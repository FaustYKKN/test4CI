import React, { Component } from 'react';
import { Container, Row, Divider, List, Icon, fetch, popup } from 'epm-ui-react';
import * as ReactDOM from 'react-dom';
import { ssoUrl } from "../../configs/url";
import page from 'epm-ui-boot/page';
import '../../styles/navigation.css';
import getDomain from '../../../config/domain';
import Login from '../components/login';

import { navBarList } from '../../configs/config';
import judgeLogin, { isToken } from '../../utils/judgeLogin';

class Nav extends Component {

  constructor ( props ) {
    super( props );

    this.handleLogoutClick = this.handleLogoutClick.bind( this );
    // this.handleLogin = this.handleLogin.bind( this );
    this.setLoginState = this.setLoginState.bind( this );

    this.domain = getDomain();


    this.state = {
      currentIndex: props.currentIndex ? props.currentIndex : 0,
      aIndex: props.aIndex ? props.aIndex : 0,
      // show: false,
      isLogin: false,
      logoutShow: false,
      jwtPayload: {},
    };
  }

  handleLogoutClick () {
    this.setState( {
      logoutShow: !this.state.logoutShow
    } );
  }

  setLoginState() {
    this.setState( {
      isLogin: true,
      jwtPayload: isToken( localStorage.selfJwt ) || isToken( localStorage.ssoJwt ),
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
    } ) .then( data => {
      return data.json();
    } ).then( data => {
      // if( window.location.origin === `${ window.location.origin }${page.basename}/inner-source/inner-project` ){
      //   window.open( '${ window.location.origin }${page.basename}/inner-source', '_self' );
      // }else{
      window.open( `${ page.basename }/`, '_self' );
      // }
    } );
  }

  componentDidMount () {
    window.isToken=isToken;
    // this.handleLogin();
    judgeLogin().then( res => {
      if( res && res.state ){
        this.setState( {
          isLogin: true,
          jwtPayload: res.jwtPayload,
        } )
      }
    } );


    // document.addEventListener( 'click', ( e ) => {
    //   const node = ReactDOM.findDOMNode( this.ref );
    //
    //   if ( node && !node.contains( e.target ) ) {
    //     this.setState( {
    //       show: false
    //     } );
    //   }
    // } );
  }

  render () {
    let login = (
      <div className={ this.state.isLogin ? 'person-center' : 'login' }>
        {
          this.state.isLogin ? (
            <React.Fragment>
              <p>
                { this.state.jwtPayload.username || this.state.jwtPayload.userName }
              </p>
              <ul>
                <li onClick={ () => { window.open( page.basename + '/personal-info', '_self' ) } }><a href="javascript:void(0)">个人中心</a></li>
                <li onClick={ this.logout.bind( this ) }>注销</li>
              </ul>
            </React.Fragment>
          ) : (
            <button onClick={
              () => popup( <Login setLoginState={ this.setLoginState } /> )
            } >登录</button>
          )
        }
      </div>
    );


    return (
      <div className="mh_nav">
        <a className="logo" href={ `${ page.basename }/` }/>
        <ul className="mh_menu">
          {/* <li className={ this.state.currentIndex === 0 ? 'active' : '' }
              onClick={ () => {
                window.open( window.location.origin + page.basename + '/',
                  '_self' );
              }
              }
          >
            <a style={ { textDecoration: 'none' } }>首页</a>
          </li>
          <li className={ this.state.currentIndex === 1 ? 'active' : '' }
              onClick={ () => {
                window.open( window.location.origin + page.basename + '/productions',
                    '_self' );
              } }

          >
            <a href="javascript:void(0)" style={ { textDecoration: 'none', display: 'block' } }>产品列表</a>
          </li>
          <li className={ this.state.currentIndex === 2 ? 'active' : '' }
              onClick={ () => {
                window.open( window.location.origin + page.basename + '/inner-source',
                    '_self' );
              }
              }
          >
            <a style={ { textDecoration: 'none' } }>开源广场</a>
          </li>
          <li className={ this.state.currentIndex === 3 ? 'active' : '' }
              onClick={ () => {
                window.open( window.location.origin + page.basename + '/docs',
                  '_self' );
              }
              }
          >
            <a style={ { textDecoration: 'none' } }>文档中心</a>
          </li>
          <li className={ this.state.currentIndex === 4 ? 'active' : '' }
              onClick={ () => {
                window.open(
                  window.location.origin + page.basename + '/download',
                  '_self' );
              }
              }
          >
            <a style={ { textDecoration: 'none' } }>资源下载</a>
          </li>
          <li className={ this.state.currentIndex === 5 ? 'active' : '' }
              onClick={ () => {
                window.open( window.location.origin + page.basename + '/application/index',
                  '_self' );
              }
              }
          >
            <a style={ { textDecoration: 'none' } }>问答中心</a>
          </li> */}
          {
            navBarList.map( ( item, index ) => (
              <li
                key={ index }
                className={ this.state.currentIndex === index ? 'active' : '' }
                  // onClick={ () => {
                  //   window.open( window.location.origin + page.basename + item.path,
                  //     '_self' );
                  // }
                  // }
              >
                <a
                  href={ item.name === '社区 🔥' ? page.context.nodebbHost : page.basename + item.path }
                  style={ {
                    display: 'inline-block',
                    width: '100%',
                    height: '100%',
                    textDecoration: 'none'
                  } }
                  target="_self"
                >{ item.name }</a>
              </li>
            ) )
          }
        </ul>
        { login }
      </div>
    );
  }
}

export default Nav;
