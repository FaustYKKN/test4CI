import React, { Component } from 'react';
import { popup, Container, Button, Alert, } from 'epm-ui-react';
import page from 'epm-ui-boot/page';
import Layout from '../../layouts/default';
import '../../../styles/index.css';
import Login from '../../components/login'
let apiHost = `${page.basename}/api`;

import '../../../styles/docs.css';
import fetchWithToken from '../../../utils/fetchWithToken';
import { isToken } from '../../../utils/judgeLogin';

class Docs extends Component {

  constructor( props ) {
    super( props );
    this.state = {
      currentIndex: 2,
      userid: '',
      username: '',
      useremail: '',
      bottonState: true
    };
    this.setLoginState = this.setLoginState.bind( this );
  }

  setLoginState() {
    this.setState( {
      isLogin: true,
      jwtPayload: isToken( localStorage.selfJwt ) || isToken( localStorage.ssoJwt ),
    } );
  }

  componentDidMount() {
    let selfJwt = window.localStorage.getItem("selfJwt");
    let SelfAll = isToken( selfJwt );

    if( SelfAll.id ){
      this.innerApply( SelfAll.id, ( res ) => {
        if( !res.data ){
          this.setState( {
            bottonState: false,
          } );
        }
      } );
    }

    // let ssoJwt = window.localStorage.getItem("ssoJwt");
    // let SsoAll = isToken( ssoJwt );

    const jwt = isToken( localStorage.ssoJwt ) || isToken( localStorage.selfJwt );
    if ( !jwt ) {
      popup( <Login setLoginState={ this.setLoginState } /> )
    }
    else{
      this.setState({
        userid: SelfAll.id
      }, ()=>{
        const{ userid } = this.state;
        this.getUser( userid, ( res ) => {
          this.setState( {
            username: res.data.username,
            useremail: res.data.email
          } )
        } );
      });
    }
  }

  innerApply( id, callback ){
    apiHost = `${page.basename}/api`;
    var url = `${ apiHost }/innerSourceApply?id=${ id }`;
    fetchWithToken( url, {
      method: 'GET',
    } )
    .then( function( res ) {
      return res.json();
    } )
    .then( function( res ) {
      callback( res )
    } )
  }

  getUser ( id, callback ) {
    const apiHost = `${page.basename}/api`;
    var url = `${ apiHost }/user?id=${ id }` ;
    fetchWithToken( url, {
      method: 'GET',
    } )
    .then( function( res ) {
      return res.json();
    } )
    .then( function( res ) {
      callback( res )
    } );
  }

  innerUser( callback ){
    apiHost = `${page.basename}/api`;
    var url = `${ apiHost }/gitlab/innerUser?`;
    fetchWithToken( url, {
      method: 'GET',
    } )
    .then( function( res ) {
      return res.json();
    } )
    .then( function( res ) {
      callback( res )
    } )
  }

  isAuthor( id, callback ){
    let apiHost = `${page.basename}/api`;
    var url = apiHost + `/gitlab/isAuthor?id=${ id }` ;
    fetch( url, {
        method: 'GET',
    } )
    .then( function( res ) {
      return res.json();
    } )
    .then( function( res ) {
      callback( res )
    } );
  }

  isInner ( id, callback ) {
    let apiHost = `${page.basename}/api`;
    var url = `${ apiHost }/userGitlab?owner=${ id }&serveName=gitlab`;
    fetchWithToken( url, {
      method: 'GET',
    } )
    .then( function( res ) {
      return res.json();
    } )
    .then( function( res ) {
      callback( res )
    } )
  }

  getCardList() {
    const { username, useremail, bottonState } = this.state;
    const apiHost = `${page.basename}/api`;
    var d = new Date();
    return (
      <Container
        type="fluid">
        <h1 center>开源权限申请</h1>
        <hr/>
        用户：{ username }
        <hr/>
        邮箱：{ useremail }
        <hr/>
        申请时间:{ Date() }
        <hr/>
        申请加入开源组：Inner Source
        <hr/>
        <Button
          type="primary" disabled = { bottonState }
          onClick={ () => {
            const jwt = isToken( localStorage.ssoJwt ) || isToken( localStorage.selfJwt );
            if ( !jwt ) {
              popup( <Login setLoginState={ this.setLoginState } /> )
            }
            else{
              let SelfAll = isToken( window.localStorage.getItem("selfJwt") );
              this.isInner( SelfAll.id, ( res ) => {
                // if( res.data ){
                //   popup( <Alert message="您已成功进入开源组" type="success" dismissible delay={ 3 } /> ) ;
                //   this.setState( {
                //     bottonState: true,
                //   } );
                // }
                // else{
                  window.open( `${page.context.codeSecretHost}/oauth/authorize?client_id=${page.context.clientId}&response_type=code&redirect_uri=${ window.location.origin }${page.basename}/inner-source/authorize`, "_blank", "scrollbars=yes, resizable=1,modal=false,alwaysRaised=yes, showModalDialog" );
                // }
              });
            }
          } }>确认</Button>
        <Button
          type="primary"
          onClick={ () => {
            window.open( window.location.origin + page.basename + '/inner-source', '_self' );
          }}>返回</Button>
        <hr/>
      </Container>
    );
  }

  render() {
    const { currentIndex } = this.state;

    return (
      <Layout currentIndex={ currentIndex }>
        <div className="intro" style = { {
          background: `url(${ page.basename }/images/docsBanner.jpg) no-repeat center`,
          height : '550px',
          backgroundSize: 'cover'
         } }>
          <Container type="fluid" className="pinfluid" style={{ marginLeft: '5%' }}>
            <div style={{ paddingTop: '0px', textAlign: 'center' }}><span className="ptitle2">Inner Source</span></div>
            <div style={{ paddingTop: '20px', textAlign: 'center' }}><span className="ptitle2">实践中促进司内开源发展</span></div>
            <p className="subtitle2" style={{ textAlign: 'left' }}>通过 BONC 内部开源，我们可以通过复用降低开发成本，打通开发团队的沟通渠道，实现组织单位之间的成本和风险分担，还可以实现协作开发并促进高质量代码的创建。通过内部开源项目的实践开发，不断推动司内的开源文化发展，从而实现更高效，更有质量的软件产品输出。</p>
          </Container>
        </div>
        <div className='docsListWrapper'>
          { this.getCardList() }
        </div>
      </Layout>
    );
  }
}

export default Docs;
