import React, { Component } from 'react';
import { Container, Row, Button, popup, Pagination, Modal } from 'epm-ui-react';
import page from 'epm-ui-boot/page';
import Layout from '../layouts/default';
import '../../styles/index.css';
import fetchWithToken from '../../utils/fetchWithToken';
import '../../styles/docs.css';
import Login from '../components/login'
import CardList from '../components/post/card-list';
let apiHost = `${page.basename}/api`;
import { isToken } from '../../utils/judgeLogin';

class Docs extends Component {

  constructor( props ) {
    super( props );
    this.state = {
      data: [],
      hasPermission: true,
      buttonState: false,
      statusButton: '申请源码权限',
      uid: '',
      pageIndex: 1,
      pageSize: 12,
      loading: true,
    };
    this.setLoginState = this.setLoginState.bind( this );
    this.onLogin = this.onLogin.bind( this );
    this.getListData = this.getListData.bind( this );
    this.handleListChange = this.handleListChange.bind( this );
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
    if( !SelfAll.id ){
      this.setState( {
        buttonState: false,
      } );
    }
    if( SelfAll.id ){
      this.innerApply( SelfAll.id, ( res ) => {
        if( !res.data ){
          this.setState( {
            hasPermission : false,
            buttonState: false,
          } );
        }else{
          this.setState( {
            hasPermission : true,
            buttonState: true,
            statusButton: '您已获取权限'
          } );
        }
      } );
    }
    apiHost = `${page.basename}/api`

    this.getListData( ( res ) => {
      this.setState( {
        data: res.data.data,
        total: res.data.pageTotal,
        loading: false,
      } );
    } );
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

  handleListChange ( pageIndex, pageSize ) {
    this.setState( {
      pageIndex,
      pageSize
    }, () => {
      this.getListData( ( res ) => {
        this.setState( {
          data: res.data.data,
          total: res.data.pageTotal,
          loading: false,
        } );
      } );
    } );
  }

  getListData ( callback ) {
    const { pageIndex, pageSize } = this.state;

    apiHost = `${page.basename}/api`
    var url = apiHost + `/innerSource/getAll?pageIndex=${ pageIndex }&pageSize=${ pageSize }` ;
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

  onLogin(){
    location.reload();
  }

  isInner ( id, callback ) {
    apiHost = `${page.basename}/api`;
    let url = `${ apiHost }/userGitlab?owner=${ id }&serveName=gitlab`;
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

  // popupInfo () {
  //   popup( <Modal size='medium'>
  //     <Modal.Header>
  //       <span>非常抱歉！</span>
  //     </Modal.Header>
  //     <Modal.Body>
  //       <p>由于公司 GitLab API 更新，您暂无法通过此页面添加开源项目和申请开源代码权限😟，正在抓紧抢修中。。。</p>
  //       <p>添加开源项目需开发者社区更新后开放。</p>
  //       <p>若您想申请开源代码权限，您可以向 <a href="mailto:zhangqingxuan@bonc.com.cn">liuwenquan@bonc.com.cn</a> 发送邮件申请，格式如下：</p>
  //       <p style={{ color: 'rgb(108, 117, 130)' }}><em>姓名 + 工号 + 部门 + 要操作的 GitLab 账号 ID（通常为姓名）。</em></p>
  //       <p>我们之后将尽快通过邮件向您反馈，请您留意。</p>
  //       <p style={{ fontWeight: 900 }}>祝您身体健康~</p>
  //     </Modal.Body>
  //   </Modal> );
  // }

  render() {
    const { data, buttonState, statusButton, pageIndex, total, pageSize, loading } = this.state;

    return (
      <Layout currentIndex={ 2 }>
        <div className="intro" style = { {
          background: `url(${ page.basename }/images/docsBanner.jpg) no-repeat center`,
          height : '550px',
          backgroundSize: 'cover'
         } }>
          <Container type="fluid" className="pinfluid" style={{ marginLeft: '5%' }}>
            <div style={{ paddingTop: '0px', textAlign: 'center' }}><span className="ptitle2">Inner Source</span></div>
            <div style={{ paddingTop: '20px', textAlign: 'center' }}><span className="ptitle2">实践中促进司内开源发展</span></div>
            <p className="subtitle2" style={{ textAlign: 'left' }}>通过 BONC 内部开源，我们可以通过复用降低开发成本，打通开发团队的沟通渠道，实现组织单位之间的成本和风险分担，还可以实现协作开发并促进高质量代码的创建。通过内部开源项目的实践开发，不断推动司内的开源文化发展，从而实现更高效，更有质量的软件产品输出。</p>

            <Row gutter={ 12 }>
              <Row.Col size={ { sm: 6, md: 4, lg: 3 } }>
                <Button type="primary" block size={ 'large' } style={ { borderRadius: '27px', marginLeft:420, marginTop:20 } } disabled = { buttonState }
                  onClick={ () => {
                    const { data, hasPermission } = this.state;
                    const jwt = isToken( localStorage.ssoJwt ) || isToken( localStorage.selfJwt );
                    if ( !jwt ) {
                      popup( <Login setLoginState={ this.setLoginState }
                      onAfterLogin={ () => {
                        window.open( `${ page.basename }/inner-source/application`, '_self' );
                      } }
                      /> )
                    }
                    if( data && !hasPermission ){
                      window.open( `${ page.basename }/inner-source/application`, '_self' );
                    }
                  }}
                >
                  { statusButton }
                </Button>
              </Row.Col>
              <Row.Col size={ { sm: 6, md: 4, lg: 3 } }>
                <Button type="default" block size={ 'large' } style={ { borderRadius: '27px', marginLeft:500, marginTop:20 } }
                  onClick={ () => {
                    const jwt = isToken( localStorage.ssoJwt ) || isToken( localStorage.selfJwt );
                    if ( !jwt ) {
                      popup( <Login setLoginState={ this.setLoginState }
                      onAfterLogin={ () => {
                        window.open( window.location.origin + page.basename + '/inner-source/inner-project', '_self' );
                      } }
                      /> );
                    }else{
                      window.open( window.location.origin + page.basename + '/inner-source/inner-project', '_self' );
                    }
                  }}
                >
                  我要开源项目
                </Button>
              </Row.Col>
            </Row>
          </Container>
        </div>
          <div className="docsListWrapper">
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'flex-start'
            }}>
              <CardList data={ data } type='inner-source'/>
            </div>
          </div>
        <Pagination
            align='center'
            style={ { marginTop: '16px' } }
            index={ pageIndex }
            total={ total }
            size={ pageSize }
            onChange={ this.handleListChange }
            showDataSizePicker
            dataSizePickerList={ [ 6, 12, 24, 36 ] }
          />
        <div style={ { minHeight: '5vh' } }>
        </div>
      </Layout>
    );
  }
}

export default Docs;
