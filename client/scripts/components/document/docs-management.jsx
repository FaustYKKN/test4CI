import React, { Component } from 'react';
import {
  Container,
  Row,
  Divider,
  Form,
  Input,
  Select,
  Cascade,
  RadioGroup,
  Radio,
  Modal,
  Dialog,
  ButtonGroup,
  Button,
  PagiTable,
  Textarea,
  Alert,
  fetch,
  popup
} from 'epm-ui-react';
import { tdsServerUrl } from '../../../configs/url';
import page from 'epm-ui-boot/page';
import DocsDetail from './docs-detail';
import fetchWithSsoToken from '../../../utils/fetchWithSsoToken';
import fetchWithTdssToken from '../../../utils/fetchWithTdssToken';
import { transformJwt, isToken, isTdssToken } from '../../../utils/judgeLogin';
import Login from '../login';

export default class DocsManagement extends Component {
  constructor ( props ) {
    super( props );

    this.state = {
      isLogin          : false,
      userInfo         : {},
      isAuthorized     : false,
      docsList         : [],
      pageSize         : 5,
      pageIndex        : 1,
      isViewModalShow  : false,
      isConfigModalShow: false,
      isCreateModalShow: false,
      projects         : [],
      repositoryLoading: true,
      branchLoading    : true,
      projectsList     : [
        {
          name: '正在加载中。。。',
          data: {
            value: '正在加载中。。。'
          }
        }
      ],
      branchList       : [
        {
          value: '',
          text : '请先选择仓库'
        }
      ],
      isUpdating       : false
    };

    this.updateTdssToken = this.updateTdssToken.bind( this );
    this.getListData = this.getListData.bind( this );
    this.handlePageChange = this.handlePageChange.bind( this );
    this.authorization = this.authorization.bind( this );
    this.handleCreateClick = this.handleCreateClick.bind( this );
    this.handleViewClick = this.handleViewClick.bind( this );
    this.handleUpdateClick = this.handleUpdateClick.bind( this );
    this.handleDeleteClick = this.handleDeleteClick.bind( this );
    this.generateConfigForm = this.generateConfigForm.bind( this );
    this.handleCreateDocument = this.handleCreateDocument.bind( this );
    this.handleUpdateDocument = this.handleUpdateDocument.bind( this );
    this.handleDeleteDocument = this.handleDeleteDocument.bind( this );
    this.handleRepositoryChange = this.handleRepositoryChange.bind( this );
    this.handleDocumentChanged = this.handleDocumentChanged.bind( this );
    this.initManagement = this.initManagement.bind( this );
    this.getUserInfo = this.getUserInfo.bind( this );
    this.queryIsGitlabAuthorized = this.queryIsGitlabAuthorized.bind( this );
    this.handleLogin = this.handleLogin.bind( this );
    this.getGitlabProjects = this.getGitlabProjects.bind( this );
    this.getProjectBranches = this.getProjectBranches.bind( this );
  }

  componentDidMount () {
    // window.isToken = isToken;
    this.updateTdssToken();
  }

  async initManagement () {
    const { userInfo } = this.state;

    this.getListData( userInfo.id );
    this.getGitlabProjects( userInfo.id );
  }

  async updateTdssToken () {
    const res = await fetchWithSsoToken( tdsServerUrl.user.getToken( page.context.tdssUrl ), {
      method: 'POST'
    } );

    if ( res.status === 200 ) {
      const info = await res.json();
      const payload = isTdssToken( info.data );

      if ( payload ) {
        window.localStorage.setItem( 'tdssJwt', info.data );
        const userInfo = await this.getUserInfo( payload.id );
        const isAuthorized = await this.queryIsGitlabAuthorized( payload.id );

        await this.setState( {
          userInfo: userInfo || {},
          isAuthorized
        } );
        this.initManagement();
      }
    }
  }

  async handleLogin () {
    const { tdssJwt } = localStorage;

    await this.setState( {
      isLogin : true,
      userInfo: isToken( tdssJwt )
    } );
  }

  async getListData ( userId ) {
    if ( userId ) {
      const { pageSize, pageIndex } = this.state;
      const dataRequirePath = tdsServerUrl.document.getDocumentListWithUID( userId, page.context.tdssUrl ) + `?pageSize=${ pageSize }&pageIndex=${ pageIndex }`;
      let res = await ( await fetchWithTdssToken( dataRequirePath ) ).json();
      const { total, data } = res;

      if ( data && Array.isArray( data ) ) {
        this.setState( {
          docsList : data,
          pageTotal: total
        } );
      }
    }
  }

  async getUserInfo ( uid ) {
    const res = await fetchWithTdssToken( tdsServerUrl.user.getUser( uid, page.context.tdssUrl ) );

    if ( res.status === 200 ) {
      return await res.json();
    } else {
      const errInfo = await res.json();

      popup(
        <Alert
          message={ ` 
      获取用户信息失败!
      ${ res.status }
      ${ errInfo.message || '' }
      ` }
          type="danger"
          dismissible
          delay={ 6 }
        /> );
    }
  }

  async queryIsGitlabAuthorized ( uid ) {
    const res = await fetchWithTdssToken( tdsServerUrl.gitlab.isGitlabAuthorized( uid, page.context.tdssUrl ) );

    if ( res.status === 200 ) {
      const info = await res.json();

      return info.isAuthorized;
    } else {
      const errInfo = await res.json();

      popup(
        <Alert
          message={ ` 
      获取认证信息失败!
      ${ res.status }
      ${ errInfo.message || '' }
      ` }
          type="danger"
          dismissible
          delay={ 6 }
        /> );

      return false;
    }
  }

  async getGitlabProjects ( userId ) {
    const res = await fetchWithTdssToken( tdsServerUrl.gitlab.getGitlabProjects( userId, page.context.tdssUrl ) );

    if ( res.status === 200 ) {
      const projects = await res.json();
      this.constructor.sortByName( projects );
      let projectsListObj = {};

      projects.forEach( ( project ) => {
        const namespace = project.namespace.name;

        if ( typeof projectsListObj[ namespace ] !== 'object' || !Array.isArray( projectsListObj[ namespace ].children ) ) {
          projectsListObj[ namespace ] = {
            id      : project.namespace.id,
            children: []
          };
        }

        projectsListObj[ namespace ].children.push( {
          name: project.name,
          data: {
            value: project.id
          }
        } );
      } );

      let projectsList = [];

      for ( let namespace in projectsListObj ) {

        if ( projectsListObj.hasOwnProperty( namespace ) ) {
          projectsList.push( {
            name    : namespace,
            data    : {
              value: projectsListObj[ namespace ].id
            },
            children: projectsListObj[ namespace ].children
          } );
        }
      }
      this.constructor.sortByName( projectsList );

      await this.setState( {
        projects,
        projectsList,
        repositoryLoading: false
      } );
    } else {
      const errInfo = await res.json();

      popup(
        <Alert
          message={ `
      ${ res.status }
      ${ errInfo.message || '' }
      ` }
          type="danger"
          dismissible
          delay={ 6 }
        /> );
    }
  }

  static sortByName ( targetArray ) {
    targetArray.sort( ( left, right ) => {
      if ( left.name > right.name ) {
        return 1;
      } else if ( left.name === right.name ) {
        return 0;
      } else {
        return -1;
      }
    } );
  }

  async getProjectBranches ( uid, projectId ) {
    await this.setState( { branchLoading: true } );
    const res = await fetchWithTdssToken( tdsServerUrl.gitlab.getProjectBranches( uid, projectId, page.context.tdssUrl ) );

    if ( res.status === 200 ) {
      const branches = await res.json();
      const branchList = branches.map( ( branch ) => {
        return {
          value: branch.name,
          text : branch.name
        };
      } );

      await this.setState( {
        branchList,
        branchLoading: false
      } );
    } else {
      const errInfo = await res.json();

      popup(
        <Alert
          message={ `
      ${ res.status }
      ${ errInfo.message || '' }
      ` }
          type="danger"
          dismissible
          delay={ 6 }
        /> );
    }
  }

  async handlePageChange ( pageInfo ) {
    const { userInfo } = this.state;
    const { pageIndex, pageSize } = pageInfo;
    await this.setState( {
      pageIndex,
      pageSize
    } );
    await this.getListData( userInfo.id );
  }

  async authorization () {
    const authorizationUrl = `https://code.bonc.com.cn/oauth/authorize?client_id=${ page.context.clientId }&response_type=code&redirect_uri=${ window.location.origin }${ page.basename }/tdss-authorize`;
    const authorizationWindow = window.open( authorizationUrl, '_blank', 'scrollbars=yes,resizable=1,modal=false,alwaysRaised=yes' );

    // 监控授权页面状态，若关闭则触发 GitLab 认证 检查.
    await new Promise( ( resolve, reject ) => {
      const authorizationTimer = window.setInterval( () => {
        if ( authorizationWindow.closed ) {
          window.clearInterval( authorizationTimer );
          resolve();
        }
      } );
    } );

    // 获取用户信息并更新 state
    return await this.queryIsGitlabAuthorized( this.state.userInfo.id );
  }

  async handleCreateClick () {
    let { userInfo, isAuthorized } = this.state;

    if ( typeof userInfo === 'object' ) {
      if ( isAuthorized ) {
        this.isCreate = true;
        // this.getGitlabProjects( userInfo.id );
        this.setState( { isConfigModalShow: true } );
      } else {
        const newIsAuthorized = await this.authorization();
        if ( newIsAuthorized ) {
          await this.setState( {
            isAuthorized: true,
            isConfigModalShow: true
          } );
          popup(
            <Alert
              message="Code 认证成功！"
              type="success"
              dismissible
              delay={ 3 }
            /> );
          this.isCreate = true;
          this.getGitlabProjects( userInfo.id );
        }
      }
    }
  }

  handleViewClick ( data ) {
    this.setState( {
      isViewModalShow: true,
      targetDocData  : data
    } );
  }

  async handleUpdateClick ( document ) {
    let { userInfo, isAuthorized } = this.state;

    if ( typeof userInfo === 'object' ) {
      if ( isAuthorized ) {
        this.isCreate = false;
        this.updatingDocId = document.id;
        // this.getGitlabProjects( userInfo.id );
        this.getProjectBranches( userInfo.id, document.repositoryId );
        await this.setState( { isConfigModalShow: true } );

        document.repositoryInfo = [ parseInt( document.namespaceId ), parseInt( document.repositoryId ) ];
        this.setValue( document );
      } else {
        const newIsAuthorized = await this.authorization();

        if ( newIsAuthorized ) {
          await this.setState( {
            isAuthorized: true,
            isConfigModalShow: true
          } );
          popup(
            <Alert
              message="Code 认证成功！"
              type="success"
              dismissible
              delay={ 3 }
            /> );
          this.isCreate = false;
          this.updatingDocId = document.id;
          this.getGitlabProjects( userInfo.id );
          this.getProjectBranches( userInfo.id, document.repositoryId );
        }
      }
    }

  }

  async handleDeleteClick ( documentId ) {
    const res = await this.handleDeleteDocument( documentId );
    const { userInfo } = this.state;
    if ( res.status === 200 ) {
      popup(
        <Alert
          message="删除成功！"
          type="success"
          dismissible
          delay={ 3 }
        /> );
      await this.getListData( userInfo.id );
      this.handleDocumentChanged();
    } else {
      const errInfo = await res.json();

      popup(
        <Alert
          message={ `
      删除失败!
      ${ res.status }
      ${ errInfo.message || '' }
      ` }
          type="danger"
          dismissible
          delay={ 6 }
        /> );
    }
  }

  async handleRepositoryChange ( value ) {
    if ( value && Array.isArray( value ) ) {
      const { userInfo, projects } = this.state;
      const projectId = parseInt( value[ 1 ] );
      let newAccessPath = '';

      projects.forEach( ( project ) => {
        if ( project.id === projectId ) {
          newAccessPath = `/${ project.path || 'docs-name' }`;
        }
      } );
      this.pathSetter( newAccessPath );
      await this.getProjectBranches( userInfo.id, projectId );
    }
  }

  generateConfigForm () {
    const { projectsList, branchList, repositoryLoading, branchLoading, isUpdating } = this.state;

    return (
      <div
        className="docsEditWrapper"
      >
        <Form
          getter={ ( getter ) => {
            this.getValue = getter.getValue;
          } }
          setter={ ( setter ) => {
            this.setValue = setter.setValue;
          } }
          trigger={ ( trigger ) => {
            this.resetValue = trigger.resetValue;
          } }
        >
          <Form.Layout
            type="horizontal"
          >
            <Form.Item
              name="name"
              required
            >
              <Form.Label>文档名称：</Form.Label>
              <Input
                placeholder="请输入"
              />
            </Form.Item>
            <Form.Item
              name="desc"
              required
            >
              <Form.Label>文档描述：</Form.Label>
              <Textarea
                placeholder="请输入"
              />
            </Form.Item>
            <Form.Item
              name="repositoryInfo"
              required
            >
              <Form.Label>文档仓库：</Form.Label>
              <Cascade
                dataSource={ projectsList }
                dataValueMapper="value"
                placeholder={ repositoryLoading ?
                  '正在加载...' :
                  '请选择' }
                disabled={ repositoryLoading }
                onChange={ this.handleRepositoryChange }
              />
            </Form.Item>
            <Form.Item
              name="branch"
              required
            >
              <Form.Label>仓库分支：</Form.Label>
              <Select
                dataSource={ branchList }
                placeholder={ branchLoading ?
                  '正在加载...' :
                  '请选择' }
                disabled={ branchLoading }
              />
            </Form.Item>
            <Form.Item
              name="accessPath"
              required
            >
              <Form.Label>访问路径：</Form.Label>
              <Input
                placeholder="/docs-name"
                setter={ ( setter ) => {
                  this.pathSetter = setter.setValue;
                } }
              />
            </Form.Item>
            <Form.Item
              name="indexPage"
              required
            >
              <Form.Label>首页文件：</Form.Label>
              <Input
                placeholder="请输入"
                value="index.html"
              />
            </Form.Item>
            <Form.Item
              name="menuConfigFile"
            >
              <Form.Label>菜单配置文件：</Form.Label>
              <Input
                placeholder="请输入"
                value="./menu-config.yaml"
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                disabled={ isUpdating }
                onClick={ () => {
                  this.isCreate ?
                    this.handleCreateDocument() :
                    this.handleUpdateDocument();
                } }
              >{
                isUpdating ?
                  '保存并构建文档中...' :
                  '保存'
              }</Button>
              <Button
                onClick={ () => {
                  this.resetValue();
                } }
              >重置</Button>
            </Form.Item>
          </Form.Layout>
        </Form>
      </div>
    );
  }

  async handleCreateDocument () {
    const { userInfo } = this.state;
    if ( userInfo.id ) {
      await this.setState( { isUpdating: true } );
      const data = this.getValue();
      data.namespaceId = data.repositoryInfo[ 0 ];
      data.repositoryId = data.repositoryInfo[ 1 ];
      const { projects } = this.state;

      projects.map( ( project ) => {

        if ( project.id === parseInt( data.repositoryInfo[ 1 ] ) ) {
          data.repository = project[ 'http_url_to_repo' ];
        }
      } );
      data.createUserId = userInfo.id;

      let res = await fetchWithTdssToken( tdsServerUrl.document.addDocument( page.context.tdssUrl ), {
        method : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body   : JSON.stringify( data )
      } );

      if ( res.status === 200 ) {
        popup(
          <Alert
            message="添加成功！"
            type="success"
            dismissible
            delay={ 3 }
          /> );
        await this.setState( { isUpdating: false, isConfigModalShow: false } );
        await this.getListData( userInfo.id );
        this.handleDocumentChanged();
      } else if ( res.status === 409 ) {
        await this.setState( { isUpdating: false } );
        const errInfo = await res.json();
        popup(
          <Alert
            message={ errInfo.message }
            type="danger"
            dismissible
            delay={ 6 }
          /> );
      } else {
        const errInfo = await res.json();

        popup(
          <Alert
            message={ `
      添加失败!
      ${ res.status }
      ${ errInfo.message || '' }
      ` }
            type="danger"
            dismissible
            delay={ 6 }
          /> );
      }
    }
  }

  async handleUpdateDocument () {
    const { userInfo } = this.state;

    if ( userInfo.id ) {
      await this.setState( { isUpdating: true } );
      const data = this.getValue();
      data.namespaceId = data.repositoryInfo[ 0 ];
      data.repositoryId = data.repositoryInfo[ 1 ];
      const { projects } = this.state;

      projects.map( ( project ) => {
        if ( project.id === parseInt( data.repositoryInfo[ 1 ] ) ) {
          data.repository = project[ 'http_url_to_repo' ];
        }
      } );
      data.createUserId = userInfo.id;

      let res = await fetchWithTdssToken( tdsServerUrl.document.updateDocument( this.updatingDocId, page.context.tdssUrl ), {
        method : 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body   : JSON.stringify( data )
      } );

      if ( res.status === 200 ) {
        await this.setState( { isConfigModalShow: false, isUpdating: false } );
        await this.getListData( userInfo.id );
        popup(
          <Alert
            message="修改成功！"
            type="success"
            dismissible
            delay={ 3 }
          /> );
        this.handleDocumentChanged();
      } else if ( res.status === 409 ) {
        const errInfo = await res.json();
        this.setState( { isUpdating: false } );
        popup(
          <Alert
            message={ errInfo.message }
            type="danger"
            dismissible
            delay={ 6 }
          /> );
      } else {
        const errInfo = await res.json();
        this.setState( { isUpdating: false } );
        popup(
          <Alert
            message={ `创建失败，请检查网络或跟系统管理员联系
${ res.status }
${ errInfo.message || '' }
        ` }
            type="danger"
            dismissible
            delay={ 3 }
          /> );
      }
    }
  }

  async handleDeleteDocument ( documentId ) {
    return await fetchWithTdssToken( tdsServerUrl.document.deleteDocument( documentId, page.context.tdssUrl ), { method: 'DELETE' } );
  }

  handleDocumentChanged () {
    if ( typeof this.props.onChange === 'function' ) {
      this.props.onChange();
    }
  }

  render () {
    const columns = [
      {
        dataIndex: 'name',
        title    : '文档名称'
      },
      {
        dataIndex: 'accessPath',
        title    : '访问路径'
      },
      {
        title       : '操作',
        width       : '177px',
        headRenderer: headConfig => (
          <div
            style={ {
              textAlign   : 'center',
              paddingRight: '8px'
            } }
          >
            { headConfig.title }
          </div>
        ),
        renderer    : ( data, rowIndex, rowData ) => {
          return (
            <ButtonGroup
              key={ `button-${ rowData.name }-${ rowData.updatedAt }` }
            >
              <Button
                type="info"
                onClick={ () => {
                  this.handleViewClick( rowData );
                } }
              >
                查看
              </Button>
              <Button
                type="warning"
                onClick={ () => {
                  this.handleUpdateClick( rowData );
                } }
              >
                修改
              </Button>
              <Dialog
                title="警告"
                message={ `您确定删除 《${ rowData.name }》 吗？` }
                showPointer
                type='confirm'
                icon="danger"
                position="left"
                onApproveClick={ ( after ) => {
                  this.handleDeleteClick( rowData.id );
                  after( true );
                } }
              >
                <Button
                  type="danger"
                >
                  删除
                </Button>
              </Dialog>
            </ButtonGroup>
          );
        }
      }
    ];
    const { docsList, pageSize, pageIndex, pageTotal, targetDocData, isViewModalShow, isConfigModalShow } = this.state;

    return (
      <div
        className="docsManagementWrapper"
      >
        <Button
          type="primary"
          size="large"
          title="新增文档"
          onClick={ this.handleCreateClick }
          block
        >新增文档 +</Button>
        <Divider />
        <PagiTable
          multiLine
          columns={ columns }
          dataSource={ docsList }
          pageSize={ pageSize }
          pageIndex={ pageIndex }
          pageTotal={ pageTotal }
          onChange={ this.handlePageChange }
          showDataSizePicker
          dataSizePickerList={ [ 5, 10, 20, 40 ] }
          pagiAlign="center"
        />
        {
          isViewModalShow ?
            <Modal
              onClose={ () => {
                this.setState( { isViewModalShow: false } );
              } }
              size="large"
            >
              <Modal.Header>
                详情
              </Modal.Header>
              <Modal.Body>
                <DocsDetail
                  dataSource={ targetDocData }
                />
              </Modal.Body>
              <Modal.Footer>
                <Button
                  onClick={ () => {
                    this.setState( { isViewModalShow: false } );
                  } }
                >关闭</Button>
              </Modal.Footer>
            </Modal> :
            null
        }
        {
          isConfigModalShow ?
            <Modal
              onClose={ () => {
                this.setState( { isConfigModalShow: false } );
              } }
              size="large"
            >
              <Modal.Header>
                { this.isCreate ?
                  '新增文档' :
                  '修改文档配置' }
              </Modal.Header>
              <Modal.Body>
                { this.generateConfigForm() }
              </Modal.Body>
              <Modal.Footer>
                <Button
                  onClick={ () => {
                    this.setState( { isConfigModalShow: false } );
                  } }
                >关闭</Button>
              </Modal.Footer>
            </Modal> :
            null
        }
      </div>
    );
  }
}
