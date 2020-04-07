import React, { Component } from 'react';
import { Alert, Form, Textarea, Select, Container, Button, Input, Dialog, popup, Progress, Cascade } from 'epm-ui-react';
import page from 'epm-ui-boot/page';
import Layout from '../../layouts/default';
import '../../../styles/index.css';
import fetchWithToken from '../../../utils/fetchWithToken';
import Login from '../../components/login'
let apiHost;
import '../../../styles/docs.css';
import { isToken } from '../../../utils/judgeLogin';
import { gitLabApi, importSource } from "../../../utils/gitLabApi";

class Docs extends Component {

  constructor( props ) {
    super( props );
    this.state = {
      contex : null,
      ready: false,
      currentIndex: 2,
      position: "",  //项目名称
      projectid: null,  //项目id
      urls: null,
      name: null,
      star:null,
      projects: [],  //项目分类
      description: null,  //项目描述
      alreadyhave: null,  //判断项目是否已经加入到innerSource开源组
      color: 'white',
      disabled: false,
    };
    this.setLoginState = this.setLoginState.bind( this );
    this.Description = this.Description.bind( this );
    this.handlePosition = this.handlePosition.bind( this );
    this.handleProjects = this.handleProjects.bind( this );
    this.handleApproveClick = this.handleApproveClick.bind( this );
    this.showDialog = this.showDialog.bind( this );
    this.lock = true;
  }

  setLoginState() {
    this.setState( {
      isLogin: true,
      jwtPayload: isToken( localStorage.selfJwt ) || isToken( localStorage.ssoJwt ),
    } );
  }

  componentDidMount() {
    importSource();
    setTimeout( ()=>{
      this.initData();
    }, 0 )
  }

  // 判断用户是否已经获得开源权限 （ 库重是否拥有用户信息 ）
  initData () {
    let selfJwt = window.localStorage.getItem("selfJwt");
    let SelfAll = isToken( selfJwt );

    //判断用户是否登陆
    if ( !SelfAll ) {
      popup( <Login setLoginState={ this.setLoginState } /> )
    }

    apiHost = `${page.basename}/api`;

    //先判断用户是否已经有过认证
    this.isAuthor( SelfAll.id, ( res ) => {
      if( !res ){
        window.location.href =  `${ window.location.origin }${ page.basename }/inner-source/innerAuthor`;
      }else{
        this.findUserId( SelfAll, ( res ) => {

          // 调用 gitlab api 获取用户所有的项目信息
          this.getProject( res,( res ) => {           //更新后的 npm 包调用
            let a = new Set();
            let contex = [];
            res.map( item => a.add( item.id ) );

            //查找所有用户已开源的项目（从数据库中查找）   用于和所有项目比较，去除掉已开源的项目的显示
            this.findInner( ( data ) => {
              let b = new Set();
              data = data.data.data;
              data.map( item => b.add( parseInt( item.gitlabProjectID ) ) );
              let arr = Array.from(
                  new Set( [ ...res.filter( x => !b.has( x.id ) ), ...data.filter( x => !a.has( x.gitlabProjectID ) ) ] )
              );
              for( let i=0; i<arr.length; i++ ){
                let pro_acc = null;
                let gro_acc = null;

                if( arr[i].permissions ){
                  if( arr[i].permissions.project_access ){
                    if( arr[i].permissions.project_access.access_level >= 40 ){
                      pro_acc = arr[i];
                    }
                  }
                  if( arr[i].permissions.group_access ){
                    if( arr[i].permissions.group_access.access_level >= 40 ){
                      gro_acc = arr[i];
                    }
                  }
                  if( pro_acc || gro_acc ){
                    if( !contex.length ){
                      contex.push( { name: `${ arr[i].namespace.name }`, data: { value: `${ arr[i].namespace.id }` }, children: [ { name: `${ arr[i].name }`, data: { value: `${ arr[i].id }`, urls: `${ arr[i].web_url }`, star: `${ arr[i].star_count }`, name: `${ arr[i].name }` } } ] } );
                    }else{
                      let a = true;
                      for( let j=0; j<contex.length; j++ ){
                        if( contex[j].data.value == arr[i].namespace.id ){
                          a = false;
                          contex[j].children.push( { name: `${ arr[i].name }`, data: { value: `${ arr[i].id }`, urls: `${ arr[i].web_url }`, star: `${ arr[i].star_count }`, name: `${ arr[i].name }` } } );
                        }
                      }
                      if( a ){
                        contex.push( { name: `${ arr[i].namespace.name }`, data: { value: `${ arr[i].namespace.id }` }, children: [ { name: `${ arr[i].name }`, data: { value: `${ arr[i].id }`, urls: `${ arr[i].web_url }`, star: `${ arr[i].star_count }`, name: `${ arr[i].name }` } } ] } );
                      }
                    }
                  }
                }
              }
              this.setState( { color: 'rgba(0,0,0,0)', ready: true, contex: contex } )
            } )
          } );


        } );
      }
    } );
  }

  findUserId ( SelfAll, callback ) {
    let url = apiHost + `/gitlab/findInfo?id=${ SelfAll.id }`;
    fetch( url, {
      method: 'GET',
    } )
        .then( ( res ) => {
          return res.json();
        } )
        .then( ( res ) => {
          let information = JSON.parse( res.json );
          let token = information.access_token ? information.access_token : information.private_token;
          callback( token );
        } );
  }

  getProject ( token, callback ) {
    const { Gitlab } = gitbeaker.default;
    let api = gitLabApi( Gitlab );
    api.Projects
        .all( {
          access_token: `${ token }`,
          min_access_level: `${ page.context.power_level }`,
        } )
        .then( ( res )=>{
          callback( res )
        })
        .catch( ( err ) => {
          callback( err )
        } );
  }

  isAuthor( id, callback ){
    let apiHost = `${page.basename}/api`;
    let url = apiHost + `/gitlab/isAuthor?id=${ id }` ;
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

  findInner ( callback ) {
    let apiHost = `${page.basename}/api`;
    let url = apiHost + `/innerSource/getAll?pageSize=1000` ;
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

  getGroups ( id, callback ){
    apiHost = `${page.basename}/api`;
    var url = `${ apiHost }/gitlab/project?owner=${ id }&serveName=gitlab`;
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

  Description ( item ) {
    this.setState( { description: item } );
  }

  showDialog() {
    const { position, projects, description } = this.state;
    let selfJwt = window.localStorage.getItem("selfJwt");
    let SelfAll = isToken( selfJwt );
    if ( !SelfAll ) {
      popup( <Login setLoginState={ this.setLoginState } /> )
    } else {
      if( position == '' ){
        popup( <Alert message="请选择未开源项目" type="danger" dismissible delay={ 3 } /> ) ;
      }
      else if( projects == ''){
        popup( <Alert message="您还未选择项目分类" type="danger" dismissible delay={ 3 } /> ) ;
      }
      else if( !description ){
        popup( <Alert message="您还未填写项目说明" type="danger" dismissible delay={ 3 } /> ) ;
      }else{
      popup(<Dialog
              title="项目开源到 InnerSource"
              message={ `确定开源项目: ${ position }，开源后，您的项目将会共享到 InnerSource 组内。` }
              type="confirm"
              onApproveClick={ this.handleApproveClick }
            />);}
    }
  }

  handleApproveClick( after ) {
    this.setState( { disabled: true } );
    const { name, description, projectid, projects, urls, position, star } = this.state;
    if ( !this.lock ) return false;
    this.lock = false;
    let selfJwt = window.localStorage.getItem("selfJwt");
    let SelfAll = isToken( selfJwt );
    this.findUserId( SelfAll, ( res ) => {
      this.sharePro( res, projectid, ( res ) => {
      console.log( '成功从 GitLab 中加入项目到开源组', res )
      this.createInner( position, description, SelfAll.id, urls, star, name, projectid, ( res ) => {
        if( res.code === 500 ){
          popup( <Alert message="项目加入组内失败，您已开源该项目" type="danger" dismissible delay={ 3 } /> ) ;
          setTimeout(() => {
            location.reload();
          }, 1000);
        }else if ( res.code === 200 ){
        const projectID = res.data.uid;
        // this.createAuthor( true, SelfAll.id, projectID );  // 停 用
        this.createCate( projects, projectID,( res ) => {
          if( res.code === 200 ){
            window.open( window.location.origin + page.basename + '/inner-source/innerConfirm', '_self' );
          } else if (  res.code === 500) {
            popup( <Alert message="添加分类失败" type="danger" dismissible delay={ 3 } /> ) ;
            setTimeout(() => {
              location.reload();
            }, 1000);
          }
        } );
        }
      });
      } );
    } );
    after( true );
  }

  sharePro( userToken, projectId, callback ){
    const { Gitlab } = gitbeaker.default;
    let api = gitLabApi( Gitlab );
    api.Projects
        .share( `${ projectId }`,`${ page.context.groupsid }`, `${ page.context.power_level }`, {
          access_token: `${ userToken }`,
        } )
        .then( ( res )=>{
          callback( res )
        })
        .catch( ( err ) => {
          if( JSON.stringify( err ).indexOf( '群组已与该群组分享' ) != -1 ){
            console.log( '项目已在 innerSource 组内' );
            callback( '群组已与该群组分享' );
          } else {
            console.log( '从 GitLab 中把项目加入开源组出错~~', err )
          }
        } );
  }

  // 停用

  // createAuthor ( author, userID, projectID ) {
  //   apiHost = `${page.basename}/api`;
  //   let url = apiHost + '/innerAuthorization' ;
  //   let data = {
  //     author: author,
  //     userID: userID,
  //     projectID: projectID,
  //   }
  //   fetch(url,{
  //     method: 'POST',
  //     headers: {
  //         'content-type': 'application/json'
  //       },
  //     body: JSON.stringify( data )
  //   }).then( ( res ) => {
  //     return res.json() } )
  //   .then( ( res ) => {
  //     this.lock = true;
  //   });
  // }

  // 将该组 （ 开源选中的组 ） 加入到数据库中
  createInner ( title, description, userID, urls, star, name, projectid, callback ) {
    apiHost = `${page.basename}/api`;
    let url = apiHost + '/inner-source' ;
    let data = {
        title: name,
        description: description,
        userID: userID,
        url: urls,
        star: star,
        projectid: projectid,
    };
    fetch(url,{
        method: 'POST',
        headers: {
            'content-type': 'application/json'
          },
        body: JSON.stringify( data )
    }).then( ( res ) => {
        return res.json() } )
    .then( ( res ) => {
      callback( res )
    });
  }

  // 分类添加
  async createCate ( item, projectid, callback ) {
    apiHost = `${page.basename}/api`;
    let url = apiHost + '/innerCate' ;
    let data = {
      projectid: projectid,
      category: item,
    }
    await fetch(url,{
      method: 'POST',
      headers: {
          'content-type': 'application/json'
        },
      body: JSON.stringify( data )
    })
    .then( ( res ) => {
      return res.json()
    } )
    .then( ( res ) => {
      callback( res )
    });
  }

  handlePosition( value, data ) {
    this.setState( {
      projectid: value[1],
      position: data.sourceData[1].name,
      name: data.sourceData[1].data.name,
      star: data.sourceData[1].data.star,
      urls: data.sourceData[1].data.urls
    } );
  }

  handleProjects( value ) {
    this.setState( { projects: value } );
  }


  getCardList() {
    const { color, ready, contex, disabled } = this.state;
    let cateOptions = [ 'Java', 'JavaScript', 'C', 'C++', 'Python', 'Android', 'IOS', 'C#', 'Node.js', 'PHP', 'HTML', 'CSS', 'Go', 'Flash', 'PL/SQL', 'Perl', 'Ceph', 'Ruby', 'kotlin', 'Delphi', 'VB', 'Swift', 'Matlab', 'Pascal', 'R', 'Oracle', 'mysql', 'PG', 'Hive', 'Linux', 'Openstack', 'Kubernetes', '其他'  ];
    if( !ready ) {
      return (
        <Container
      type="fluid">
          <div style={ { minHeight: '15vh' } } ></div>
          <div style={ { display: 'flex', justifyContent: 'center', alignItems: 'center', 'flexWrap':'wrap'  } }>
            <Progress.Circle style={ { width:'3rem', height:'3rem' } } strokeColor='grey' type='loading'   bgColor='rgba(0,0,0,0)' />
            <h2 style={ { fontweight:900, color:'#000' } }>正在加载您的项目...</h2>
          </div>
          <div style={ { minHeight: '15vh' } }>
          </div>
        </Container>
      );
    }
    else{
      return (
        <Container
          type="fluid">
          <div style={ { minHeight: '30vh' } }>
          <div style={ { minHeight: '5vh' } }></div>
          <h1>开源申请</h1>
          <hr/>
          开源项目选择：
          <Progress.Circle size='tiny' strokeColor={ color } type='loading' bgColor='rgba(0,0,0,0)'/>
            <Cascade dataSource={ contex } dataValueMapper="value" placeholder="请选择开源项目" onChange={ this.handlePosition } />
          <br/>
          项目分类：
            <Select required placeholder="选择项目分类" searchable={ true } multiple={ true } onChange={ this.handleProjects   }>
              {
                cateOptions.map( ( x ) => {
                  return <Select.Option key={ `${ x }` } value={ `${ x }` } >{ x }</Select.Option>
                } )
              }
            </Select>
          <br/>
          项目说明：
          <Textarea placeholder="请填写项目说明" minRows={ 3 } maxRows={ 8 } onChange={ this.Description }  />
          <br/>
          </div><div style={ { minHeight: '3vh' } }></div>
          <Button
            disabled = { disabled }
            type="primary"
            onClick={ this.showDialog }>下一步</Button>
          <Button
            disabled = { disabled }
            type="primary"
            onClick={ () => {
                      window.open( window.location.origin + page.basename + '/inner-source', '_self' );
                    }}>取消</Button>
          <div style={ { minHeight: '5vh' } }>
          </div>
          <div style={ { minHeight: '5vh' } }></div>
        </Container>
      );
    }
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
            <div style={{ paddingTop: '80px', textAlign: 'center' }}><span className="subtitle3">
            您可以在公司内部 GitLab 库 ( https://code.bonc.com.cn ) 中新建一个项目或选择自己掌管的项目进行开源</span></div>
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
