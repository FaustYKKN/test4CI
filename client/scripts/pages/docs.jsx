import React, { Component } from 'react';
import { Carousel, Tag, Img, Card, Container, Row, List, Pagination, Divider, Skeleton } from 'epm-ui-react';
import page from 'epm-ui-boot/page';
import Layout from '../layouts/default';
import '../../styles/index.css';

import EPMUIPic from '../../images/logos/epm-ui.png';
import apiManagerPic from '../../images/logos/api-manager.png';
import tdsPic from '../../images/logos/tds.png';
import securityPortalPic from '../../images/logos/security-portal.png';
import bpmPic from '../../images/logos/bpm.png';
import platformPic from '../../images/logos/platform.png';
import innerSourcePic from '../../images/logos/inner-source.png';
import cadeDevPic from '../../images/logos/cade-manuals-dev.png';
import cadeUserPic from '../../images/logos/cade-manuals-user.png';

import '../../styles/docs.css';
import { tdsServerUrl } from '../../configs/url';

class Docs extends Component {

  constructor ( props ) {
    super( props );
    this.state = {
      currentIndex : 3,
      docsTotalList: [],
      docsList     : [],
      pageIndex    : 1,
      pageSize     : 6,
      loading      : true
    };

    this.getListData = this.getListData.bind( this );
    this.handleListChange = this.handleListChange.bind( this );
  }

  componentDidMount () {
    if ( typeof window !== 'undefined' ) window.document.title = '技术文档';

    this.getListData();
  }

  getCardList ( docsList ) {
    if ( typeof docsList !== 'undefined' && Array.isArray( docsList ) ) {

      return (
        <div
          className="cardsWrapper"
        >
          { docsList.map( ( item, index ) => {
            return (
              <a
                className="docsCard"
                key={ item.id }
                href={ `${ page.basename }/docs${ item.accessPath }/${ item.indexPage }` }
                target="_blank"
                style={ { textDecoration: 'none' } }
              >
                <Card
                  style={ {
                    wordBreak: 'break-all',
                    float: 'none',
                    padding: '1em 2em',
                    margin: '1.5em',
                    display      : 'flex',
                    flexDirection: 'column',
                    flexGrow     : 1
                  } }
                >
                  <Card.Header>
                    <h5 style={{ fontWeight: 900, fontSize: '1.3em' }}>{ item.name }</h5>
                  </Card.Header>
                  <Card.Body
                    style={ {
                      flexGrow: 1,
                      paddingLeft: '1rem',
                      paddingRight: '1rem'
                    } }
                  >
                    <div className="desc">{ item.desc }</div>
                  </Card.Body>
                  <Card.Footer
                    style={ {
                      flexGrow: 0,
                      paddingBottom: 0,
                      textAlign: 'center'
                    } }
                  >
                    <a>查看文档</a>
                  </Card.Footer>
                </Card>
              </a>
            );
          } ) }
        </div>
      );

    } else {
      return <div>暂无数据</div>;
    }
  }

  async getListData () {
    const { pageIndex, pageSize } = this.state;

    let res = await fetch( tdsServerUrl.document.getDocumentList( page.context.tdssUrl ) + `?pageSize=${ pageSize }&pageIndex=${ pageIndex }` );

    if( res.status === 200 ) {
      res = await res.json();
      const { total, data } = res;

      if ( data && Array.isArray( data ) ) {

        await this.setState( {
          docsList : data,
          pageTotal: total,
          loading: false
        } );
      }
    }else {
      this.setState( { loading: false } )
    }
  }

  async handleListChange ( pageIndex, pageSize ) {
    await this.setState( {
      pageIndex,
      pageSize
    } );
    await this.getListData();
  }

  render () {
    const { currentIndex, docsList, pageIndex, pageTotal, pageSize, loading } = this.state;
    // const docsListStatic = [
    //   {
    //     pic: innerSourcePic,
    //     title: 'Inner Source 内部开源规范',
    //     desc: 'BONC Inner Source 内部开源项目相关规范。包括角色定义、版本管理、代码分支管理、关键活动及文档规范等',
    //     link: '/inner-source-docs/角色定义.html'
    //   },
    //   {
    //     pic: apiManagerPic,
    //     title: 'API Manager',
    //     desc: 'API 管理提供 API 服务管控平台，实现个性化 API 的发布、订阅、控制等管理。API 管理分 API 注册和 API 商店两部分，在 API 注册界面，管理员可浏览和发布 API，将其开放给用户，并监控用户 API 的使用情况；在 API 商店界面，用户可以浏览已发布的 API 信息，订阅、调用需要的 API，以及监控自己订阅 API 的使用情况。',
    //     link: '/api-manager-docs/联通大数据能力开放平台API管理.html'
    //   },
    //   {
    //     pic: bpmPic,
    //     title: 'BPM 流程引擎',
    //     desc: '工作流管理系统的灵魂核心，负责模型的解析，实例的创建、活动的执行和控制过程模型与现实实际过程连接，通过工作流执行服务、应用软件和操作人员交互来完成。',
    //     link: '/bpm-docs/用户操作使用手册.html'
    //   },
    //   {
    //     pic: cadeDevPic,
    //     title: 'CADE 开发手册',
    //     desc: 'CADE 提供了一套全面的可视化设计开发环境，使得开发人员可以依据需求快速搭建、开发以“页面、模型、流程”为设计目标的可视化设计产品。',
    //     link: '/cade-manuals-dev/'
    //   },
    //   {
    //     pic: cadeUserPic,
    //     title: 'CADE 用户手册',
    //     desc: 'CADE 提供了一套全面的可视化设计开发环境，使得开发人员可以依据需求快速搭建、开发以“页面、模型、流程”为设计目标的可视化设计产品。本产品的目标用户是 Web 可视化设计工具开发人员。',
    //     link: '/cade-manuals-user/'
    //   },
    //   {
    //     pic: EPMUIPic,
    //     title: 'EPM UI',
    //     desc: '基于 React 的前端组件库 + 精美的 css 样式，给您带来丝滑般的开发体验。语义化、面向数据、可复用、风格一致、与样式无关、具有良好扩展性。',
    //     link: 'http://ui.bonc.local'
    //   },
    //   {
    //     pic: securityPortalPic,
    //     title: '安全门户',
    //     desc: '安全与门户平台是面向企业的安全管理与应用集成软件平台．其中安全子系统它实现了统一用户认证，授权管理与鉴权服务;门户子系统实现了基于菜单导航的简单应用集成，基于页面组件聚合的高级的应用集成．整个系统实现了高度可配置，可扩展，支持个性化定制功能及样式．为企业快速整合现有应用系统提高了高效方便的工具．也为新项目研发提供了一个基础平台。',
    //     link: '/security-portal-docs'
    //   },
    //   {
    //     pic: platformPic,
    //     title: '企业应用开发平台',
    //     desc: 'Enterprise Development Platform 企业应用开发平台',
    //     link: '/development-platform-docs/企业应用开发平台部署步骤.html'
    //   },
    //   {
    //     pic: tdsPic,
    //     title: 'Technical Documentation System',
    //     desc: 'TDS 是一款文档生成工具。使用 TDS，您只需关注文档内容本身，可配置菜单、页面目录、水印、主题切换、网站样式、部署难题，我们通通为您搞定。\n当然，您也可以通过一些简单的配置，来定制化自己的文档网站。',
    //     link: '/tds-docs'
    //   }
    // ];

    return (
      <Layout
        currentIndex={ currentIndex }
      >
        <div
          className="intro"
          style={ {
            background    : `url(${ page.basename }/images/docsBanner.jpg) no-repeat center`,
            height        : '550px',
            backgroundSize: 'cover'
          } }
        >
          <Container
            type="fluid"
            className="pinfluid"
            style={ { marginLeft: '5%' } }
          >
            <div
              style={ {
                paddingTop: '80px',
                textAlign : 'left'
              } }
            >
              <span
                className="ptitle2"
              >技术文档</span>
            </div>
            <p
              className="subtitle2"
            >详细规范的软件文档，助力开发工作</p>
          </Container>
        </div>
        <div
          className='docsListWrapper'
        >
          {
            loading ?
              <div>
                <Row>
                  <Row.Col
                    size={ 8 }
                  >
                    <Skeleton
                      active
                    >
                      <Skeleton.Image />
                      <Skeleton.Line
                        style={ { width: '50%' } }
                      />
                      <Skeleton.Line
                        style={ { width: '70%' } }
                      />
                      <Skeleton.Line />
                    </Skeleton>
                  </Row.Col>
                  <Row.Col
                    size={ 8 }
                  >
                    <Skeleton
                      active
                    >
                      <Skeleton.Image />
                      <Skeleton.Line
                        style={ { width: '50%' } }
                      />
                      <Skeleton.Line
                        style={ { width: '70%' } }
                      />
                      <Skeleton.Line />
                    </Skeleton>
                  </Row.Col>
                  <Row.Col
                    size={ 8 }
                  >
                    <Skeleton
                      active
                    >
                      <Skeleton.Image />
                      <Skeleton.Line
                        style={ { width: '50%' } }
                      />
                      <Skeleton.Line
                        style={ { width: '70%' } }
                      />
                      <Skeleton.Line />
                    </Skeleton>
                  </Row.Col>
                </Row>
                <br />
              </div> :
              this.getCardList( docsList )
          }
          <Pagination
            align='center'
            style={ { marginTop: '16px' } }
            index={ pageIndex }
            total={ pageTotal }
            size={ pageSize }
            onChange={ this.handleListChange }
            showDataSizePicker
            dataSizePickerList={ [ 6, 9, 18, 36 ] }
          />
        </div>
      </Layout>
    );
  }
}

export default Docs;
