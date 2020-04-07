import React from 'react';
import {
  Row,
  Card,
  Avatar,
  Button,
  Alert,
  popup,
  Form,
  Input,
  Modal,
  Textarea,
  context,
  Notification,
  Select,
  Dialog
} from 'epm-ui-react';
import page from 'epm-ui-boot/page';

import '../../styles/personal-info.css';
import Layout from '../layouts/default';
import fetchWithToken from '../../utils/fetchWithToken';

import { localAPIs } from '../../configs/url';
import { isToken } from '../../utils/judgeLogin';
import { callbackify } from 'util';
import DocsManagement from '../components/document/docs-management';
import { gitLabApi, importSource } from "../../utils/gitLabApi";

let apiHost;

export default class PersonalInfo extends React.Component {

  constructor ( props ) {
    super( props );

    this.personalData = {
      innerSource: [],
      production : [],
      tds        : [],
      resource   : []
    };

    this.state = {
      visible         : false,
      data            : null,
      datas           : null,
      change          : false,
      a               : [], //开源项目原有分类
      personalInfo    : {},
      currentPage     : 'innerSource',
      description     : null,  //项目描述
      personalDocsList: []
    };

    this.handleChange = this.handleChange.bind( this );
    this.description = this.description.bind( this );
    this.formTirgger = this.formTirgger.bind( this );
    this.formGetter = this.formGetter.bind( this );
    this.handleProjects = this.handleProjects.bind( this );
    this.handleValue = this.handleValue.bind( this );

  }

  componentDidMount () {
    const script = document.createElement("script");
    script.src = `${ page.basename }/js/@gitbeaker/dist/index.js`;
    script.type = "text/javascript";
    document.head.appendChild(script);

    fetchWithToken( `${ localAPIs().user }`, {
      method: 'GET'
    } )
      .then( res => {
        return res.json();
      } )
      .then( res => {
        this.setState( { personalInfo: res.data || {} }, this.getDataList );
      } );
  }

  description ( item ) {
    this.setState( { description: item } );
    this.setState( { change: true } );
  }

  confirefix () {
    const { description, datas, a, change } = this.state;
    if ( !change ) {
      popup(
        <Notification
          message={ `数据未变化` }
          description="请检查您的数据修改"
        /> );
    } else if ( !description ) {
      popup(
        <Notification
          message={ `请填写项目介绍` }
          description="项目介绍信息不能为空"
        /> );
    } else if ( a.length == 0 ) {
      popup(
        <Notification
          message={ `请选择分类` }
          description="项目分类选择不能为空"
        /> );
    } else {
      console.log( a );
      this.updata( datas.id, description, () => {
        console.log( datas.id );
        this.deleteAll( datas.id, () => {
          this.createCate( a, datas.id, () => {
            this.setState( {
              visible: false
            } );
            location.reload();
          } );
        } );
      } );
    }
  }

  deleteAll ( projectid, callback ) {
    let apiHost = `${ page.basename }/api`;
    var url = `${ apiHost }/innerCate?projectid=${ projectid }`;
    fetchWithToken( url, {
      method: 'DELETE'
    } )
      .then( function ( res ) {
        return res.json();
      } )
      .then( function ( res ) {
        callback();
      } );
  }

  updata ( id, description, callback ) {
    let apiHost = `${ page.basename }/api`;
    let url = `${ apiHost }/innerSource/update?id=${ id }&description=${ description }`;
    fetchWithToken( url, {
      method: 'POST'
    } )
      .then( function ( res ) {
        return res.json();
      } )
      .then( function ( res ) {
        callback();
      } );
  }

  async createCate ( item, projectid, callback ) {
    apiHost = `${ page.basename }/api`;
    var url = apiHost + '/innerCate';
    var data = {
      projectid: projectid,
      category : item
    };
    await fetch( url, {
      method : 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body   : JSON.stringify( data )
    } )
      .then( ( res ) => {
        return res.json();
      } )
      .then( ( res ) => {
        callback();
      } );
  }

  handleProjects ( value ) {
    this.setState( { a: value } );
    this.setState( { change: true } );
  }

  handleValue () {
    const data = this.getValue();
    let str = JSON.stringify( data, null, 2 );
    this.setState( {
      data: str
    } );
  }

  formTirgger ( trigger ) {
    this.reset = trigger.resetValue;
  }

  formGetter ( getter ) {
    this.getValue = getter.getValue;
  }

  showModal ( data, e ) {
    e.stopPropagation();
    if ( data ) {
      let a = [];
      if ( data.innerSourceCategories ) {
        for ( let i = 0; i < data.innerSourceCategories.length; i++ ) {
          a.push( data.innerSourceCategories[ i ].title );
        }
        this.setState( { description: data.description } );
        this.setState( { a: a } );
      }
    }
    this.setState( {
      visible: true,
      datas  : data
    } );
  }

  unShare( data, callback ){

    const { Gitlab } = gitbeaker.default;
    let api = gitLabApi( Gitlab );
    api.Projects
        .unshare( `${ data.gitlabProjectID }`,`${ page.context.groupsid }`, {
          access_token: `${ page.context.private_token }`,
        } )
        .then( ( res )=>{
          callback( res )
        })
        .catch( ( err ) => {
          console.log( '取消开源出错~~', err )
        } );
  }

  conFire( data, e ){
    e.stopPropagation();
    popup(<Dialog
        title="项目从 InnerSource 组内移除共享"
        message={ `确定移除共享项目: ${ data.title }？ 移除后项目将无法被他人在 InnerSource 组中看到` }
        type="confirm"
        onApproveClick={ this.unSharePro.bind( this, data ) }
    />);
  }

  unSharePro ( data ) {
    this.unShare( data, () => {
      this.addRecoding( data, () => {
        this.deletePro( data.id, () => {
          location.reload();
        } );
      } );
    } );
  }

  addRecoding ( data, callback ) {
    apiHost = `${page.basename}/api`;
    let url = apiHost + `/innerRecoding?data=${ data }`;
    let data2 = {
      data: data
    };
    fetch(url,{
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify( data2 )
    }).then( )
        .then( ( res ) => {
          if (res.status === 500) {
            console.log('添加纪录数据失败')
          } else {
            callback()
          }
        } )
  }

  deletePro( proId, callback ){
    apiHost = `${page.basename}/api`;
    let url = apiHost + `/innerSource/delete?proId=${ proId }`;
    let data = {
      proId: proId
    };
    fetch(url,{
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify( data )
    }).then(  )
      .then( ( res ) => {
        if (res.status === 500) {
          console.log('删除库中数据失败')
        } else {
          callback()
        }
      } )
  }

  handleClose () {
    this.setState( { visible: false } );
  }

  showMe () {

  }

  getDataList () {
    const { personalInfo } = this.state;

    fetch( `${ localAPIs().allInnerSource }?pageSize=100&userID=${ personalInfo.id }`, {
      method: 'get'
    } )
      .then( res => res.json() )
      .then( res => {
        if ( res.code === 200 ) {
          this.personalData.innerSource = res.data.data;
        }
        if ( this.state.currentPage === 'innerSource' ) this.forceUpdate();
      } );

    // fetch(`${localAPIs().production}`)
    //   .then(res => res.json())
    //   .then(res => {
    //     if (res.code === 200) {
    //       this.personalData.production = res.data;
    //     }
    //     if (this.state.currentPage === 'production') this.forceUpdate()
    //   });

    // fetch(`${localAPIs().resource}`)
    //   .then(res => res.json())
    //   .then(res => {
    //     if (res.code === 200) {
    //       this.personalData.resource = res.data;
    //     }
    //     if (this.state.currentPage === 'resource') this.forceUpdate()
    //   });
  }

  forItem ( data, type ) {
    if ( type === 'tds' ) {
      return (
        <Card
          style={ {
            margin  : '0.6em 0',
            overflow: 'auto',
            padding : '0.3em 1em'
          } }
        >
          <h5
            style={ {
              fontWeight: '500',
              fontSize  : '1.3em',
              margin    : '0.7rem 1rem 0.4rem'
            } }
          >{ data.title }</h5>
          <p
            style={ { margin: '0.4rem 1rem 0.7rem' } }
          >
            <span
              style={ { marginRight: '2em' } }
            >创建时间：{ new Date( data.createdAt ).toLocaleString() }</span>
            <span
              style={ { marginRight: '2em' } }
            >点赞：{ data.likes }</span>
          </p>
        </Card>
      );
    } else if ( type === 'innerSource' ) {
      return (
        <a  onClick={ function( evt ) {
          window.open( `${page.basename}/inner-source/detail/${data.id}`, '_self' );
        } }>
        <Card style={{ margin: '0.6em 0', overflow: 'auto', padding: '0.3em 1em' }} >
          <h5 style={{ fontWeight: '500', fontSize: '1.3em', margin: '0.7rem 1rem 0.4rem' }}>{data.title}</h5>
          <p style={{ margin: '0.7rem 1rem 0.7rem' }}>
            <span style={{ marginRight: '2em' }}>项目介绍：{ data.description }</span>
          </p>
          <p style={{ margin: '0.7rem 1rem 0.7rem' }}>
            <span style={{ marginRight: '2em' }}>项目地址：{data.gitlabRepository}</span>
          </p>
          <p style={{ margin: '0.4rem 1rem 0.7rem' }}>
            <span style={{ marginRight: '2em' }}>开源时间：{ new Date( data.createdAt ).toLocaleString() }</span>
            <span style={{ marginRight: '2em' }}>点赞：{data.stars}</span>
            <Button type="primary" size={ 'small' } style={ { borderRadius: '27px', marginLeft:60, } }
              onClick={ this.showModal.bind( this, data ) }>
              修改信息
            </Button>
            <Button type="primary" size={ 'small' } style={ { borderRadius: '27px', marginLeft:20, } }
                onClick={ this.conFire.bind( this, data ) }
            >
              取消开源
            </Button>
          </p>
        </Card>
        </a>
      );
    }
  }

  handleChange ( e ) {
    const target = e.target.name;

    target && this.setState( {
      currentPage: target
    } );
  }

  render () {
    const { id, username, avatar, email, description } = this.state.personalInfo;
    const { currentPage } = this.state;
    const { datas, a } = this.state;
    const data = this.personalData[ currentPage ];
    let cateOptions = [ 'Java', 'JavaScript', 'C', 'C++', 'Python', 'Android', 'IOS', 'C#', 'Node.js', 'PHP', 'HTML', 'CSS', 'Go', 'Flash', 'PL/SQL', 'Perl', 'Ceph', 'Ruby', 'kotlin', 'Delphi', 'VB', 'Swift', 'Matlab', 'Pascal', 'R', 'Oracle', 'mysql', 'PG', 'Hive', 'Linux', 'Openstack', 'Kubernetes', '其他'  ];

    return (
      <div
        style={ { backgroundColor: '#f0f0f0' } }
      >
        <Layout>
          <div
            className='container'
          >
            <Row>
              <Row.Col
                size={ 8 }
              >
                <Card
                  className='block'
                  style={ { padding: '0.7em 0.4em 1.3em' } }
                >
                  <div
                    className='avatar'
                  >
                    <Avatar
                      size={ 100 }
                      style={ { fontSize: '50px' } }
                    >{ ( username || '' ).substring( 0, 1 ) }</Avatar>
                  </div>
                  <div
                    className='info'
                  >
                    <p
                      style={ {
                        fontSize  : '1.6em',
                        fontWeight: 700
                      } }
                    >{ username }</p>
                    <p>{ description || '他轻轻走过，没留下一丝云彩。' }</p>
                    <p>{ email }</p>
                  </div>
                </Card>
                <Card
                  className='block nav-list'
                  style={ { marginTop: '1em' } }
                >
                  <ul
                    onClick={ this.handleChange }
                  >
                    <li>
                      <a
                        name='innerSource'
                        className={ currentPage === 'innerSource' ?
                          'current' :
                          '' }
                      >开源列表</a>
                    </li>
                    {/* <li>
                     <a name='production' className={ currentPage === 'production' ? 'current' : '' }>产品列表</a>
                     </li> */ }
                    <li>
                      <a
                        name='tds'
                        className={ currentPage === 'tds' ?
                          'current' :
                          '' }
                      >文档列表</a>
                    </li>
                    {/* <li>
                     <a href='/nodebb'>我的问答</a>
                     </li> */ }
                  </ul>
                </Card>
              </Row.Col>
              <Row.Col
                size={ 16 }
              >
                <Card
                  className={ 'block' }
                  style={ { backgroundColor: 'transparent' } }
                >
                  <header
                    className='data-header'
                  >
                    <ul>
                      <li
                        className='current-triangle'
                      >
                        <span>详情</span>
                      </li>
                    </ul>
                  </header>
                  <article>
                    <ul>
                      {
                        currentPage === 'tds' ?
                          null :
                          (
                            data.length > 0 ?
                              data.map( ( item, index ) => (
                                <div
                                  key={ index }
                                >
                                  {
                                    this.forItem( item, currentPage )
                                  }
                                </div>
                              ) )
                              :
                              <Card
                                style={ {
                                  margin  : '0.6em 0',
                                  overflow: 'auto',
                                  padding : '0.3em 1em'
                                } }
                              >
                                <h5>您的列表为空</h5>
                              </Card>
                          )
                      }
                      <div style={{ display: currentPage === 'tds' ? 'block' : 'none' }}>
                        <DocsManagement />
                      </div>
                    </ul>
                  </article>
                </Card>
              </Row.Col>
            </Row>
          </div>
        </Layout>

        {
          datas
            ?
            <Modal
              visible={ this.state.visible }
              onClose={ this.handleClose.bind( this ) }
            >
              <Modal.Header>
                <span>修改开源信息</span>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Item
                    name="input"
                    required
                  >
                    <Form.Label>开源项目</Form.Label>
                    <Input
                      placeholder={ datas.title }
                      disabled
                    />
                  </Form.Item>
                  <Form.Item
                    name="input"
                    required
                  >
                    <Form.Label>项目介绍</Form.Label>
                    <Textarea value={ datas.description } minRows={ 3 } maxRows={ 8 } onChange={ this.description }/>
                  </Form.Item>
                  <Form.Item
                    name="input"
                    required
                  >
                    <Form.Label>项目分类</Form.Label>
                    <Select
                      required
                      placeholder="选择项目分类"
                      searchable={ true }
                      multiple={ true }
                      value={ a }
                      onChange={ this.handleProjects }
                    >
                      {
                        cateOptions.map( ( x ) => {
                          return <Select.Option key={ `${ x }` } value={ `${ x }` } >{ x }</Select.Option>
                        } )
                      }
                    </Select>
                  </Form.Item>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  onClick={ this.handleClose.bind( this ) }
                >关闭</Button>
                <Button
                  type="primary"
                  onClick={ this.confirefix.bind( this ) }
                >确认修改</Button>
              </Modal.Footer>
            </Modal>
            :
            null
        }

      </div>
    );
  }

}
