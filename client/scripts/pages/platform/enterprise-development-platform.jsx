import React, { Component } from 'react';
import { Carousel, Tag, Card, Container, Row, Divider } from 'epm-ui-react';
import page from 'epm-ui-boot/page';
import Layout from '../../layouts/default';
import '../../../styles/index.css';

class EnterpriseDevelopmentPlatform extends Component {

  constructor( props ) {
    super( props );

    this.state = {
      tabs: [ "工业", "金融", "政府" ],
      currentIndex: 0
    };
  }

  handleTab( currentIndex ) {
    this.setState( { currentIndex } );
  }

  scrollToAnchor(anchorName) {
    if (anchorName) {
        // 找到锚点
        let anchorElement = document.getElementById(anchorName);
        // 如果对应id的锚点存在，就跳转到锚点
        if(anchorElement) { anchorElement.scrollIntoView({behavior: "smooth"}); }
    }
  }

  componentDidMount(){
    document.title = 'BONC Developer';
  }

  render() {

    const itemStyle = {
      height : '100%',
      textAlign: 'center',
      backgroundSize: 'cover'
    };

    return (
      <Layout currentIndex={ 1 } aIndex={ 1 }>
        <div>
          <div className="cl_box">
            <Carousel
              interval = { 2000 }
              loop
              height={ 695 }
            >
              <Carousel.Panel>
                <div style = { { background: `url(${ page.basename }/images/ban_02.png) no-repeat center`, ...itemStyle } } >
                  <div style={{paddingLeft: '20%', paddingTop: '219.4px'}}>
                    <div style={{textAlign: 'left' }}><span className="ptitle">东方国信企业应用开发平台</span></div>
                    <ul>
                      <li>
                        <p className="subtitle">打造新一代软件生产线</p>
                      </li>
                      <li>
                        <p className="subtitle">快速提升IT运营质量与效率</p>
                      </li>
                    </ul>
                  </div>
                </div>
              </Carousel.Panel>
              <Carousel.Panel>
                <div style = { { background: `url(${ page.basename }/images/banner2.png) no-repeat center`, ...itemStyle } } >
                  <div style={{paddingLeft: '20%', paddingTop: '219.4px'}}>
                    <div style={{textAlign: 'left' }}><span className="ptitle">东方国信企业应用开发平台</span></div>
                    <ul>
                      <li>
                        <p className="subtitle">项目管理贯穿整个开发过程，严格控制开发各个环节</p>
                      </li>
                      <li>
                        <p className="subtitle">开发流程规范化，减少因管理混乱带来的各种问题</p>
                      </li>
                    </ul>
                  </div>
                </div>
              </Carousel.Panel>
              <Carousel.Panel>
                <div style = { { background: `url(${ page.basename }/images/banner5.png) no-repeat center`, ...itemStyle } } >
                  <div style={{paddingLeft: '20%', paddingTop: '219.4px'}}>
                    <div style={{textAlign: 'left' }}><span className="ptitle">东方国信企业应用开发平台</span></div>
                    <ul>
                      <li>
                        <p className="subtitle">从实施项目中提取通用组件，积累沉淀，形成丰富的行业组件库</p>
                      </li>
                      <li>
                        <p className="subtitle">以数据为中心，业务为驱动，打造满足多场景的企业级开发平台</p>
                      </li>
                    </ul>
                  </div>
                </div>
              </Carousel.Panel>
            </Carousel>

            <div className="cl_mc">
              <ul>
                <li onClick={this.scrollToAnchor.bind( this, "Introduction" )}>
                  <h4>产品简介</h4>
                  <p>真正的 DevOps 平台</p>
                </li>
                <li onClick={this.scrollToAnchor.bind( this, "Advantage" )}>
                  <h4>产品优势</h4>
                  <p>基于全新互联网技术架构</p>
                </li>
                <li onClick={this.scrollToAnchor.bind( this, "Features" )}>
                  <h4>功能亮点</h4>
                  <p>可视化模块组装式开发</p>
                </li>
                <li onClick={this.scrollToAnchor.bind( this, "Scenes" )}>
                  <h4>热门场景</h4>
                  <p>深耕工业的通用化服务</p>
                </li>
              </ul>
            </div>
          </div>

          <div className="intro" id={ 'Introduction' }>
            <div className="intro_title">
              <span className="intro_title_t">平台简介</span>
              <div className="pIntro_title_divider"></div>
              <p className="intro_title_p">企业级开发平台，核心任务是充分实现软件复用，实现软件开发过程的标准化和自动化</p>
            </div>

            <Container type="fluid" className="influid">
              <Row>
                <Row.Col size={ { sm: 24, md: 6, lg: 6 } }>
                  <Card className="intro_card">
                    <Card.Header>
                      <img className="intro_img" src={ `${ page.basename }/images/xingoujia.png` } />
                    </Card.Header>
                    <Card.Body>
                      <p style={ { fontSize: '16px', fontWeight: 'bolder', textAlign: 'center', color: '#333' } }>新架构</p>
                      <p style={ { fontSize: '14px', textAlign: 'center', color: '#999' } }>基于全新互联网技术架构，从容器到微服务，到可视化开发，再到 API 网关和统一门户形成开发+应用一体的架构</p>
                    </Card.Body>
                  </Card>
                </Row.Col>

                <Row.Col size={ { sm: 0, md: 3, lg: 3 } }>
                  <div className="intro_dian">
                    <img src={ `${ page.basename }/images/dian.png` }/>
                  </div>
                </Row.Col>

                <Row.Col size={ { sm: 24, md: 6, lg: 6 } }>
                  <Card className="intro_card">
                    <Card.Header>
                      <img className="intro_img" src={ `${ page.basename }/images/xinaifa.png` } />
                    </Card.Header>
                    <Card.Body>
                      <p style={ { fontSize: '16px', fontWeight: 'bolder', textAlign: 'center', color: '#333' } }>新开发</p>
                      <p style={ { fontSize: '14px', textAlign: 'center', color: '#999' } }>“可视化拖拽”、“模块组装”改变软件开发生产流程。无论是普通移动应用还是企业级常规应用，均可在线上“通过可视化拖拽形式、模块组装”式开发</p>
                    </Card.Body>
                  </Card>
                </Row.Col>
                <Row.Col size={ { sm: 0, md: 3, lg: 3 } }>
                  <div className="intro_dian">
                    <img src={ `${ page.basename }/images/dian.png` }/>
                  </div>
                </Row.Col>
                <Row.Col size={ { sm: 24, md: 6, lg: 6 } }>
                  <Card className="intro_card">
                    <Card.Header>
                      <img className="intro_img" src={ `${ page.basename }/images/DevOps.png` } />
                    </Card.Header>
                    <Card.Body>
                      <p style={ { fontSize: '16px', fontWeight: 'bolder', textAlign: 'center', color: '#333' } }>真正的 DevOps</p>
                      <p style={ { fontSize: '14px', textAlign: 'center', color: '#999' } }>以应用的在线开发和制作作为核心能力，整合了在线可视化开发、插件开发等等工具，方便团队协作，并基于容器技术整合提供自动化部署及运维（ DevOps ）能力</p>
                    </Card.Body>
                  </Card>
                </Row.Col>
              </Row>
            </Container>
          </div>

          <div className="platform" id={ 'Advantage' }>
            <div className="intro_title">
              <span className="intro_title_t" style={ { color: '#fff' } }>平台优势</span>
              <div className="pIntro_title_divider"></div>
            </div>

            <Container type="fluid" className="plafluid">
              <Row gutter={ 16 }>
                <Row.Col size={ { sm: 12, md: 12, lg: 6 } }>
                  <div style={ { position: 'relative' } } className="pla_card_box">
                    <div className="pla_card_bg"></div>
                    <Card className="pla_card">
                      <Card.Header>
                        <img className="pla_img" src={ `${ page.basename }/images/tigaoxiaolv.png` } />
                      </Card.Header>
                      <Card.Body>
                        <p style={ { fontSize: '24px', fontWeight: 'bolder', textAlign: 'center', color: '#fff' } }>提高效率、节约成本</p>
                        <p style={ { fontSize: '14px', textAlign: 'center', color: '#fff' } }>降低开发耦合度，实现前后端分离，前端负责页面应用设计，后端只需要开发数据接口，前端开发化繁为简，可视化形式降低专业难度，后端专注数据处理，提高效率的同时，也降低了成本</p>
                      </Card.Body>
                    </Card>
                  </div>
                </Row.Col>
                <Row.Col size={ { sm: 12, md: 12, lg: 6 } }>
                  <div style={ { position: 'relative' } } className="pla_card_box">
                    <div className="pla_card_bg"></div>
                    <Card className="pla_card">
                      <Card.Header>
                        <img className="pla_img" src={ `${ page.basename }/images/moshikaifa.png` } />
                      </Card.Header>
                      <Card.Body>
                        <p style={ { fontSize: '24px', fontWeight: 'bolder', textAlign: 'center', color: '#fff' } }>模式开发、规范流程</p>
                        <p style={ { fontSize: '14px', textAlign: 'center', color: '#fff' } }>项目管理贯穿整个开发过程，严格控制开发各个环节，开发流程规范化，减少因管理混乱带来的各种问题</p>
                      </Card.Body>
                    </Card>
                  </div>
                </Row.Col>
                <Row.Col size={ { sm: 12, md: 12, lg: 6 } }>
                  <div style={ { position: 'relative' } } className="pla_card_box">
                    <div className="pla_card_bg"></div>
                    <Card className="pla_card">
                      <Card.Header>
                        <img className="pla_img" src={ `${ page.basename }/images/hangyechendian.png` } />
                      </Card.Header>
                      <Card.Body>
                        <p style={ { fontSize: '24px', fontWeight: 'bolder', textAlign: 'center', color: '#fff' } }>行业沉淀、知识积累</p>
                        <p style={ { fontSize: '14px', textAlign: 'center', color: '#fff' } }>构建组件库，从实施项目中提取通用组件，积累沉淀，形成丰富的行业组件库</p>
                      </Card.Body>
                    </Card>
                  </div>
                </Row.Col>
                <Row.Col size={ { sm: 12, md: 12, lg: 6 } }>
                  <div style={ { position: 'relative' } } className="pla_card_box">
                    <div className="pla_card_bg"></div>
                    <Card className="pla_card">
                      <Card.Header>
                        <img className="pla_img" src={ `${ page.basename }/images/jujiaoyewu.png` } />
                      </Card.Header>
                      <Card.Body>
                        <p style={ { fontSize: '24px', fontWeight: 'bolder', textAlign: 'center', color: '#fff' } }>聚焦业务、专注数据</p>
                        <p style={ { fontSize: '14px', textAlign: 'center', color: '#fff' } }>以数据为中心，业务为驱动，打造满足多场景的企业级开发平台</p>
                      </Card.Body>
                    </Card>
                  </div>
                </Row.Col>
              </Row>
            </Container>
          </div>

          <div className="lightspot" id={ 'Features' }>
            <div className="intro_title">
              <span className="intro_title_t">功能亮点</span>
              <div className="pIntro_title_divider"></div>
              <p className="intro_title_p">以业务模型驱动完全可视化拖拽设计开发</p>
            </div>

            <Container type="fluid" className="lsfluid">
              <Row gutter={ 60 }>
                <Row.Col size={ { sm: 24, md: 8, lg: 8 } }>
                  <Card className="intro_card ls_card">
                    <Card.Header>
                      <img src={ `${ page.basename }/images/icon1.png` } />
                    </Card.Header>
                    <Card.Body>
                      <p style={ { fontSize: '18px', fontWeight: 'bolder', textAlign: 'center', color: '#333', margin: "10px 0" } }>在线应用设计</p>
                      <p style={ { fontSize: '14px', textAlign: 'center', color: '#666' } }>提供了在线应用设计开发的能力，使得用户能直接在云端通过拖拽组件、配置属性方式实现页面应用可视化开发</p>
                    </Card.Body>
                  </Card>
                </Row.Col>

                <Row.Col size={ { sm: 24, md: 8, lg: 8 } }>
                  <Card className="intro_card ls_card">
                    <Card.Header>
                      <img src={ `${ page.basename }/images/icon2.png` } />
                    </Card.Header>
                    <Card.Body>
                      <p style={ { fontSize: '18px', fontWeight: 'bolder', textAlign: 'center', color: '#333', margin: "10px 0" } }>定制标准组件</p>
                      <p style={ { fontSize: '14px', textAlign: 'center', color: '#666' } }>定制组件标准规范，降低组件库扩展难度，支持按照一定的规则主动发现、识别本地/远程组件，默认内置多种常用标准组件</p>
                    </Card.Body>
                  </Card>
                </Row.Col>

                <Row.Col size={ { sm: 24, md: 8, lg: 8 } }>
                  <Card className="intro_card ls_card">
                    <Card.Header>
                      <img src={ `${ page.basename }/images/icon1.png` } />
                    </Card.Header>
                    <Card.Body>
                      <p style={ { fontSize: '18px', fontWeight: 'bolder', textAlign: 'center', color: '#333', margin: "10px 0" } }>可视化组件开发</p>
                      <p style={ { fontSize: '14px', textAlign: 'center', color: '#666' } }>可视化组件开发，轻松构建现代化、高性能、跨桌面和移动端的企业应用的 2D 和 3D 界面</p>
                    </Card.Body>
                  </Card>
                </Row.Col>
              </Row>
              <Row gutter={ 60 }>
                <Row.Col size={ { sm: 24, md: 8, lg: 8 } }>
                  <Card className="intro_card ls_card">
                    <Card.Header>
                      <img src={ `${ page.basename }/images/icon2.png` } />
                    </Card.Header>
                    <Card.Body>
                      <p style={ { fontSize: '18px', fontWeight: 'bolder', textAlign: 'center', color: '#333', margin: "10px 0" } }>Ares-Plugin 插件开发框架</p>
                      <p style={ { fontSize: '14px', textAlign: 'center', color: '#666' } }>支持创建微服务工程和 CADE 图标工程。通过线下开发，完成线上可视化开发不能实现的功能</p>
                    </Card.Body>
                  </Card>
                </Row.Col>  

                <Row.Col size={ { sm: 24, md: 8, lg: 8 } }>
                  <Card className="intro_card ls_card">
                    <Card.Header>
                      <img src={ `${ page.basename }/images/icon1.png` } />
                    </Card.Header>
                    <Card.Body>
                      <p style={ { fontSize: '18px', fontWeight: 'bolder', textAlign: 'center', color: '#333', margin: "10px 0" } }>工作流引擎</p>
                      <p style={ { fontSize: '14px', textAlign: 'center', color: '#666' } }>实现应用逻辑和过程逻辑分离，可以在不修改具体功能实现方式的情况下重组模型</p>
                    </Card.Body>
                  </Card>
                </Row.Col>

                <Row.Col size={ { sm: 24, md: 8, lg: 8 } }>
                  <Card className="intro_card ls_card">
                    <Card.Header>
                      <img src={ `${ page.basename }/images/icon2.png` } />
                    </Card.Header>
                    <Card.Body>
                      <p style={ { fontSize: '18px', fontWeight: 'bolder', textAlign: 'center', color: '#333', margin: "10px 0" } }>API 管理服务</p>
                      <p style={ { fontSize: '14px', textAlign: 'center', color: '#666' } }>持续交付全生命周期解决方案，助您快速上手，建立交付规范</p>
                    </Card.Body>
                  </Card>
                </Row.Col>
              </Row>
            </Container>
          </div>

          <div className="scene" id={ 'Scenes' }>
            <div className="intro_title">
              <span className="intro_title_t" style={ { color: '#fff' } }>热门场景</span>
              <div className="pIntro_title_divider"></div>
              <p className="intro_title_p">借助开发平台的工具和组件，通过配置的方式，实现业务知识的快速软件化</p>
            </div>

            <div className="scene_tab">
              <div className="scene_tab_list">
                {
                  this.state.tabs.map( ( tab, index ) => {
                    return (
                      <div 
                        className={ this.state.currentIndex === index ? 'active' : '' } 
                        onClick={ this.handleTab.bind( this, index ) }
                        key={ index }
                      >
                        <p>{ tab }</p>
                      </div>
                    );
                  } )
                }
              </div>
              <div className="scene_tab_content">
                <div style={ { display: `${ this.state.currentIndex === 0 ? 'block' : 'none' }` } }>
                  <h2>方案描述</h2>
                  <p>重点为工业互联网、智慧城市等领域，打造一条完整的云化软件生产线，提升软件复用程度从20%到70%，实现流程自动化程度100%集软件开发需求、设计、建模、接口、组件、引擎、集成、测试、发布、运维于一体开发人员专注于工具和组件的研发，业务专家专注于业务能力的落地，通过“技术+业务”的无缝结合实现客户价值。</p>
                  <Divider line/>
                  <h2>工业互联网平台 Cloudiip</h2>
                  <p>协助构建工业互联网 cloudiip 平台，对接 10+ 第三方系统。提供 1000+ 微服务，1000+ 微应用。以及开发平台对接数据分析等相关工具、提供案例。</p>
                  <Divider />
                  <h2>厦门智创智慧照明 APP</h2>
                  <p>第三方系统通过移植考查 Cloudiip 能力。3 人在 1 天之内完成对接智慧照明的现场数据服务及工业组件开发。最终由工业专家在客户现场演示5分钟之内交付一个 APP。</p>
                </div>
                <div style={ { display: `${ this.state.currentIndex === 1 ? 'block' : 'none' }` } }>
                  <h2>方案描述</h2>
                  <p>项目建设过程中，金融事业部移动项目组借助 Ares 移动开发平台，复用脚手架工程中丰富的功能组件，使项目组建行客户的认可由原定的 15-16 个开发人员优化为 10 个，并在两个月时间内迅速完成了该平台移动端的全部页面及业务开发，节省了约 30% 人力成本和开发时间，并获得了客户的认可。</p>
                  <Divider line/>
                  <h2>普惠之门</h2>
                  <p>“普惠之门”项目隶属于中国建设银行集团旗下建信金融科技有限责任公司，采用“平台+服务”的模式，引入建行集团自建服务及优质第三方金融服务，构筑中小微企业一站式服务平台。</p>
                </div>
                <div style={ { display: `${ this.state.currentIndex === 2 ? 'block' : 'none' }` } }> 
                  <h2>方案描述</h2>
                  <p>十三届全国人大一次会议审议通过了国务院机构改革方案，明确“将国家质量监督检验检疫总局的出入境检验检疫管理职责和队伍划入海关总署”。改革的重要原则是坚持优化、协同、高效。最终实现统一申报、统一作业、统一风控、统一指令、统一执法。</p>
                  <Divider line/>
                  <h2>风险作业平台</h2>
                  <p>项目由海关总署信息中心牵头，联合东方国信，针对关检融合业务目标，共同研发建设新一代风险作业平台（ 新风控 ），并要求9月30日完成第一阶段上线工作。项目中重点使用了交互式探索和规则引擎两款工具。</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </Layout>
    );
  }
}

export default EnterpriseDevelopmentPlatform;
