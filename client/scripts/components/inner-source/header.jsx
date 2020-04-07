import React from 'react';
import { Container, Icon, Row, Button, Alert, popup, Dropdown, Input } from 'epm-ui-react';
import page from 'epm-ui-boot/page'
import '../../../styles/index.css';
import '../../../styles/docs.css';
import '../../../styles/inner-source.css';
import { isToken } from '../../../utils/judgeLogin';
import { callbackify } from 'util';
import { gitLabApi, importSource } from "../../../utils/gitLabApi";

export default class Header extends React.Component{
  constructor( props ) {
    super(props);
    this.state = {
      selfAll: {},
      count: null,
      gitStars: 0,
      userStarStatus: null,
      branchesCount: 0,
    };

    this.countAll = this.countAll.bind( this );
    this.findStar = this.findStar.bind( this );
    this.star = this.star.bind( this );
  } 

  componentDidMount() {
    setTimeout( ()=>{
      this.initData( this.props );
    }, 0 )
  }

  componentWillReceiveProps ( nextProps ) {
    setTimeout( ()=>{
      this.initData( nextProps );
    }, 0 )
  }

  initData ( props ) {
    const { data } = props;
    if ( Object.keys( data ).length === 0 ) return false;
    let selfJwt = window.localStorage.getItem("selfJwt");
    let SelfAll = isToken( selfJwt );
    this.setState( { selfAll: SelfAll }, () => {
      this.countAll( props.data );
      // 获取该项目的分支数
      this.getBranches( data.gitlabProjectID, ( res ) => {
          this.setState( { branchesCount: res.length == 0 ? 1 : res.length } )
      } );
    });
  }

  getBranches ( projectId, callback ) {
    const { Gitlab } = gitbeaker.default;
    let api = gitLabApi( Gitlab );

    // 该接口查询某个项目的全部分支数
    api.Branches
      .all( `${ projectId }`, {
        access_token: `${ page.context.private_token }`,
      } )
      .then( ( res )=>{
        callback( res )
      })
      .catch( ( err ) => {
        callback( err )
      } );
  }

  openPage ( data ) {
    this.setState( { 
      selfAll: SelfAll,
      data: data,
    } );

    this.countAll( props.data );
  }

  openPage() {
    const { data } = this.props;
    if( data ){
      window.open( data.gitlabRepository );
    }else{
      popup( <Alert message="该项目未录入链接" type="danger" dismissible delay={ 3 } /> ) ;
    }
  }


  countAll( data ){
    const { projectType = 'innerSource' } = this.props;
    let apiHost = `${page.basename}/api`;
    var url = apiHost + `/star/countAll?projectID=${ data.id }&projectType=${ projectType }` ;
    fetch( url, {
      method: 'GET'
    } )
    .then( res => res.json() )
    .then( res => {
      this.setState( { gitStars: ( res.data + Number( data.gitlabStarCount ) ) || 0 }, () => {
        this.clickLocked = false;
      } )
    } );
    this.findStar();
  }

  findStar() {
    const { selfAll } = this.state;
    const { data = {} } = this.props;

    if ( !selfAll.id || !data.id ) return;

    let apiHost = `${page.basename}/api`;
    var url = apiHost + `/star/find` ;
    const params = `?userID=${ selfAll.id }&projectType=innerSource&projectID=${ data.id }`;
    fetch( url + params, {
        method: 'GET'
    } )
    .then( res => res.json() )
    .then( res => {
      this.setState( { userStarStatus: res.data.status } );
    } );
  }

  star(){
    const { userStarStatus, selfAll, userStarStatus:status } = this.state;
    const projectID = this.props.data.id;
    const userID = selfAll.id;
    if ( this.clickLocked ) return;
    if ( !userID ) {
      alert( '用户未登录！' );
      return;
    }
    if ( !projectID ) {
      this.popupNotification('点赞失败', '未获取到开源产品ID，请重新刷新页面!', 'warning');
    }
    this.clickLocked = true;
    
    let apiHost = `${page.basename}/api`;
    var url = apiHost + `/star` ;
    var data = {
      userID: userID,
      status: !status,
      projectType: 'innerSource',
      projectID: projectID,
    }
    fetch( url, {
        method: userStarStatus === undefined ? 'POST' : 'PUT',
        body: JSON.stringify( data )
    } )
    .then( res => res.json() )
    .then( res => {
      this.countAll( this.props.data );
    } );

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
  
  render() {
    const { selfAll, gitStars, userStarStatus, branchesCount } = this.state;
    const { data } = this.props;
    if( selfAll === null || !data.id || !branchesCount ) return (<div className="intro" style = { {
      background: `url(${ page.basename }/images/docsBanner.jpg) no-repeat center`,
      height : '550px',
      backgroundSize: 'cover'
    } }></div>);
    else{
      return (
        <div className="intro" style = { {
          background: `url(${ page.basename }/images/docsBanner.jpg) no-repeat center`,
          height : '550px',
          backgroundSize: 'cover'
        } }>
        <Container type="fluid" className="pinfluid" style={{ marginLeft: '5%' }}>
          <div style={{ paddingTop: '10px', textAlign: 'center' }} >
            <span className="ptitle2" >{ data.title }</span>
          </div>
          <div style={{ paddingTop: '40px', textAlign: 'center' }} >
            <span className="subtitle2" >{ data.description }</span>
          </div>
          
          <div className="urlpos">
                <div style={ { display: 'flex', justifyContent: 'center', width:1300 } }>
                  <div>
                    {/* <Icon emoji="⭐" style={{ fontSize: '20px' }}/> */}
                    <Button 
                      type="info"
                      shape="outline" 
                      onClick={ this.star }
                    >
                      <Icon 
                        icon='star' 
                        style={{ 
                          fontSize: '18px', 
                          marginRight: '5px', 
                          padding: '2px 2px 2px 0',
                          color: userStarStatus ? '#ddb700' : '#fff' 
                        }}
                      />
                      { gitStars }
                    </Button>
                  </div>
                  <div style={{ width: '30px' }}></div>
                  <div style={ { width: '40%' } }>
                    <Input type="search" value={ data.gitlabRepository } readonly >
                      <Input.Right>
                        <Dropdown>
                          <Dropdown.Trigger>
                            <Button type="primary" 
                              onClick= { this.openPage.bind( this ) }>
                              查看项目
                            </Button>
                          </Dropdown.Trigger>
                        </Dropdown>
                      </Input.Right>
                    </Input>
                  </div>
                </div>
                  <div style={{ paddingTop: '0px', textAlign: 'right' }} >
                    <span className='subtitle3'>开源时间：{ new Date( data.createdAt ).toLocaleString() }</span><br/>
                    <span className='subtitle3'>项目分支数：{ branchesCount }</span><br/>
                    <span className='subtitle3'>开源人员：{ data.user.username }</span>
                  </div>
          </div>
        </Container>
      </div>
      )
    }
}}
