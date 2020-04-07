import React, { Component } from 'react';
import { Carousel, Tag, Card, Container, Row, Divider, Button } from 'epm-ui-react';
import page from 'epm-ui-boot/page';
import Layout from '../../layouts/default';
import '../../../styles/index.css';
import '../../../styles/platform.css';

class EPM extends Component {

  constructor( props ) {
    super( props );
    this.state = {
      tabs: [ "信息管理系统(MIS)", "电信存量营销", "智慧农业" ],
      currentIndex: 0
    };
  }

  handleTab( currentIndex ) {
    this.setState( { currentIndex } );
  }

  componentDidMount(){
    document.title = 'EPM 动态建模';
  }

  render() {
    const itemStyle = {
      height : '550px',
      backgroundSize: 'cover'
    };

    return (
      <Layout currentIndex={ 1 } aIndex={ 6 } >
        <div>
          <div className="intro" style = { { background: `url(${ page.basename }/images/ban_02.png) no-repeat center`, ...itemStyle } }>
              <Container type="fluid" className="pinfluid">
                <Row style={ { minHeight: '200px' } }>
                  <Row.Col size={ { sm: 24, md: 24, lg: 16 } }>
                    <Row>
                      <Row.Col size={ { sm: 24, md: 24, lg: 18 } }>
                        <span style={ { fontSize: '28px', fontWeight: 700, color: '#fff' } }>EPM 动态建模</span>
                      </Row.Col>
                    </Row>
                    <Row>
                      <Row.Col size={ 24 }>
                        <p style={ { color: '#fff' } }>东方国信动态建模工具 BONC-DM ( BONC Dynamic Modeling ) 是针对企业信息化建设的一款产品，主打“动态配置”的特点，针对不同业务场景或者系统抽象出符合本系统含义的实体概念，把业务模型采用通用型框架模式在线上实时、动态地创建出来。在业务需求发生变化时，只需要修改模型，而无需修改任何代码和表结构。动态建模致力于满足企业零基础，低门槛，高灵活性搭建自身所需应用的需求，实现动态设计表单，支撑多租户使用，真正解开了企业在运营和管控方面的束缚。</p>
                      </Row.Col>
                    </Row>
                  </Row.Col>
                </Row>
                <Divider />
                <Row gutter={ 12 }>
                  <Row.Col size={ { sm: 6, md: 4, lg: 3 } }>
                    <Button type="primary" block size={ 'large' } style={ { borderRadius: '27px' } }
                      onClick={ () => {
                        window.open( `http://devplatform.bonc.pro/epm/`, '_self' );
                      }}
                    >
                      立即试用
                    </Button>
                  </Row.Col>
                </Row>
              </Container>
          </div>

          <div className="intro" style={ { paddingBottom: 0, backgroundColor: 'rgba(250, 250, 250, 1)' } }>
            <Container type="fluid" className="influid" style={ { position: 'relative' ,backgroundColor: '#fff', marginTop: '-185px',
            borderRadius: '32px', boxShadow: '5px 5px 5px rgba(0,0,0,0.349019)', padding: '40px', minHeight: '306px' } }>
              <div style={{position:'relative'}}>
                <div className="midYLine" ></div>
                <div className="midXLine" ></div>
                <Row>
                  <Row.Col size={ 24 }>
                    <Row style={ { minHeight: '105px' } }>
                      <Row.Col size={ 12 } style={ { paddingBottom: '20px' } }>
                        <Row.Col size={ { sm: 24, md: 6, lg: 6 } }>
                          <img src={ `${ page.basename }/images/1.png` } className="pImg"/>
                        </Row.Col>
                        <Row.Col size={ { sm: 24, md: 18, lg: 18 } }>
                          <Row>
                            <Row.Col size={ 24 }>
                              <span style={ { fontSize: '18px', fontWeight: 700 } }>功能全面</span>
                            </Row.Col>
                          </Row>
                          <Divider />
                          <Row>
                            <Row.Col size={ 24 }>
                              <span style={ { fontSize: '14px', fontWeight: 400 } }>满足各种操作需求</span>
                            </Row.Col>
                          </Row>
                        </Row.Col>
                      </Row.Col>
                      <Row.Col size={ 12 } style={ { paddingBottom: '20px' } }>
                        <Row.Col size={ { sm: 24, md: 6, lg: 6 } }>
                          <img src={ `${ page.basename }/images/2.png` } className="pImg"/>
                        </Row.Col>
                        <Row.Col size={ { sm: 24, md: 18, lg: 18 } }>
                          <Row>
                            <Row.Col size={ 24 }>
                              <span style={ { fontSize: '18px', fontWeight: 700 } }>零门槛，快速上手</span>
                            </Row.Col>
                          </Row>
                          <Divider />
                          <Row>
                            <Row.Col size={ 24 }>
                              <span style={ { fontSize: '14px', fontWeight: 400 } }>表单的结构通过拖拉拽就可以轻松设计，免去配置页面时的繁琐代码</span>
                            </Row.Col>
                          </Row>
                        </Row.Col>
                      </Row.Col>
                    </Row>
                    <Row>
                      <Row.Col size={ 12 } style={ { paddingTop: '20px' } }>
                        <Row.Col size={ { sm: 24, md: 6, lg: 6 } }>
                          <img src={ `${ page.basename }/images/3.png` } className="pImg"/>
                        </Row.Col>
                        <Row.Col size={ { sm: 24, md: 18, lg: 18 } }>
                          <Row>
                            <Row.Col size={ 24 }>
                              <span style={ { fontSize: '18px', fontWeight: 700 } }>用户体验</span>
                            </Row.Col>
                          </Row>
                          <Divider />
                          <Row>
                            <Row.Col size={ 24 }>
                              <span style={ { fontSize: '14px', fontWeight: 400 } }>更贴合国内企业的使用习惯和应用需求，给您流畅的应用搭建新体验</span>
                            </Row.Col>
                          </Row>
                        </Row.Col>
                      </Row.Col>
                      <Row.Col size={ 12 } style={ { paddingTop: '20px' } }>
                        <Row.Col size={ { sm: 24, md: 6, lg: 6 } }>
                          <img src={ `${ page.basename }/images/4.png` } className="pImg"/>
                        </Row.Col>
                        <Row.Col size={ { sm: 24, md: 18, lg: 18 } }>
                          <Row>
                            <Row.Col size={ 24 }>
                              <span style={ { fontSize: '18px', fontWeight: 700 } }>技术强大</span>
                            </Row.Col>
                          </Row>
                          <Divider />
                          <Row>
                            <Row.Col size={ 24 }>
                              <span style={ { fontSize: '14px', fontWeight: 400 } }>突破性的操作界面与强大的表单再处理能力，完全满足网络环境下的建模要求</span>
                            </Row.Col>
                          </Row>
                        </Row.Col>
                      </Row.Col>
                    </Row>
                  </Row.Col>
                </Row>
              </div>
            </Container>
          </div>

          <div className="lightspot" style={ { backgroundColor: 'rgba(250, 250, 250, 1)' } }>
            <div className="intro_title">
              <span className="intro_title_t">功能亮点</span>
              <div className="pIntro_title_divider"></div>
              <p className="intro_title_p">本系统重点聚焦于模型构建及表单构建，智能的集成 bpm 及门户的基础上，采用传统的分层架构</p>
            </div>

            <Container type="fluid" className="lsfluid">
              <Row gutter={ 60 }>
                <Row.Col size={ 8 }>
                  <Card className="intro_card pls_card">
                    <Card.Header>
                      <img src={ `${ page.basename }/images/icon1.png` } />
                    </Card.Header>
                    <Card.Body>
                      <p style={ { fontSize: '18px', fontWeight: 'bolder', textAlign: 'center', color: '#333', margin: "10px 0" } }>数据模型构建</p>
                      <p style={ { fontSize: '14px', textAlign: 'center', color: '#666' } }>可处理简单数据模型的创建及模型关系（ 1：n & n:m ）</p>
                    </Card.Body>
                  </Card>
                </Row.Col>

                <Row.Col size={ 8 }>
                  <Card className="intro_card pls_card">
                    <Card.Header>
                      <img src={ `${ page.basename }/images/icon2.png` } />
                    </Card.Header>
                    <Card.Body>
                      <p style={ { fontSize: '18px', fontWeight: 'bolder', textAlign: 'center', color: '#333', margin: "10px 0" } }>表单页面动态创建</p>
                      <p style={ { fontSize: '14px', textAlign: 'center', color: '#666' } }>可动态创建简单表单页面，通过拖拽式页面设计，所见既所得</p>
                    </Card.Body>
                  </Card>
                </Row.Col>

                <Row.Col size={ 8 }>
                  <Card className="intro_card pls_card">
                    <Card.Header>
                      <img src={ `${ page.basename }/images/icon1.png` } />
                    </Card.Header>
                    <Card.Body>
                      <p style={ { fontSize: '18px', fontWeight: 'bolder', textAlign: 'center', color: '#333', margin: "10px 0" } }>数据展示可配置化</p>
                      <p style={ { fontSize: '14px', textAlign: 'center', color: '#666' } }>数据展示页面及数据操作功能可配置</p>
                    </Card.Body>
                  </Card>
                </Row.Col>
              </Row>
            </Container>
          </div>

          <div className="platform" style={{background:'#fff'}}>
            <div className="intro_title">
              <span className="intro_title_t">功能边界</span>
              <div className="pIntro_title_divider"></div>
              <p className="intro_title_p">产品定位于简单应用或者复杂应用的简单功能模块的快速构建，降低人力开发成本，提高生产力</p>
            </div>

            <Container type="fluid" className="plafluid">
              <Row gutter={ 16 }>
                <Row.Col size={ { sm: 12, md: 12, lg: 6 } }>
                  <div style={ { position: 'relative' } } className="pla_card_box">
                    <div className="ppla_card_bg"></div>
                    <Card className="pla_card">
                      <Card.Header>
                        <img className="pla_img" src={ `${ page.basename }/images/tigaoxiaolv.png` } />
                      </Card.Header>
                      <Card.Body>
                        <p style={ { fontSize: '24px', fontWeight: 'bolder', textAlign: 'center', color: '#fff' } }>实体功能</p>
                        <p style={ { fontSize: '14px', textAlign: 'center', color: '#fff' } }>暂有创建表单、创建视图、租户授权、租户复制、配置5种实体功能</p>
                      </Card.Body>
                    </Card>
                  </div>
                </Row.Col>
                <Row.Col size={ { sm: 12, md: 12, lg: 6 } }>
                  <div style={ { position: 'relative' } } className="pla_card_box">
                    <div className="ppla_card_bg"></div>
                    <Card className="pla_card">
                      <Card.Header>
                        <img className="pla_img" src={ `${ page.basename }/images/moshikaifa.png` } />
                      </Card.Header>
                      <Card.Body>
                        <p style={ { fontSize: '24px', fontWeight: 'bolder', textAlign: 'center', color: '#fff' } }>表单功能及控件</p>
                        <p style={ { fontSize: '14px', textAlign: 'center', color: '#fff' } }>暂有创建表单、设计表单、表单备份、导入导出、表单更新、表单复制6种表单功能；暂有基本控件、数据源、复杂控件这3大类共20多种表单控件</p>
                      </Card.Body>
                    </Card>
                  </div>
                </Row.Col>
                <Row.Col size={ { sm: 12, md: 12, lg: 6 } }>
                  <div style={ { position: 'relative' } } className="pla_card_box">
                    <div className="ppla_card_bg"></div>
                    <Card className="pla_card">
                      <Card.Header>
                        <img className="pla_img" src={ `${ page.basename }/images/hangyechendian.png` } />
                      </Card.Header>
                      <Card.Body>
                        <p style={ { fontSize: '24px', fontWeight: 'bolder', textAlign: 'center', color: '#fff' } }>实体配置</p>
                        <p style={ { fontSize: '14px', textAlign: 'center', color: '#fff' } }>暂有列表布局、紧凑型布局、搜索布局、自定义布局4种实体布局配置</p>
                      </Card.Body>
                    </Card>
                  </div>
                </Row.Col>
                <Row.Col size={ { sm: 12, md: 12, lg: 6 } }>
                  <div style={ { position: 'relative' } } className="pla_card_box">
                    <div className="ppla_card_bg"></div>
                    <Card className="pla_card">
                      <Card.Header>
                        <img className="pla_img" src={ `${ page.basename }/images/jujiaoyewu.png` } />
                      </Card.Header>
                      <Card.Body>
                        <p style={ { fontSize: '24px', fontWeight: 'bolder', textAlign: 'center', color: '#fff' } }>实体字段</p>
                        <p style={ { fontSize: '14px', textAlign: 'center', color: '#fff' } }>暂有基本字段、数据源、引用字段、规则字段这4大类共18种实体字段</p>
                      </Card.Body>
                    </Card>
                  </div>
                </Row.Col>
              </Row>
            </Container>
          </div>

          <div className="intro" style={ { backgroundColor: 'rgba(51, 51, 51, 1)' } }>
            <div className="intro_title">
              <span className="intro_title_t" style={ { color: '#fff' } }>实战场景</span>
              <div className="pIntro_title_divider"></div>
              <p className="intro_title_p">构建应用集成了流程引擎和门户框架，目的是为上述系统快速开发甚至免编程开发提供技术基础</p>
            </div>

            <div className="scene_tab" style={ { paddingTop: 0 } } >
              <div className="scene_tab_list" style={ { minWidth: '215px' } }>
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
                  <p>通常具有业务规则相对简单明确以业务信息的增删查改和流转为主体功能、业务流程主要发生在系统内部等特点。核心功能包括业务对象模型、流程模型、表单模型、权限模型等核心模型的定义以及对应实例的数据管理。</p>
                  <Divider line/>
                  <h2>运营管理系统</h2>
                  <p>东方国信运营管理平台通过本产品建立了项目、里程碑、客商、货物买卖、加班等十几个实体和二十几个码表，实现了项目立项，里程碑创建、审结、M 包，还有加班申请等业务场景，为东方运营管理系统节约 70% 左右成本，大大提升了开发的效率。</p>
                 </div>
                <div style={ { display: `${ this.state.currentIndex === 1 ? 'block' : 'none' }` } }>
                  <h2>方案描述</h2>
                  <p>通过简单的拖拉拽形成符合本次活动需求的活动页面，在活动页面里能够轻松键入或导入客户信息至数据库。并且可以给不同等级的业务员分配不同的权限，经过授权的不同层级的业务员能够对数据库里的数据进行权限范围内的处理，比如添加、删除、查看、导入导出等。对比之前针对每个场景固化搭建活动页面的方式，真正实现了动态化。</p>
                  <Divider line/>
                  <h2>营销云</h2>
                  <p>配置的核心实体为活动，其中涉及了产品、渠道、政策、公众号、接触等及十几个码表，涉及控件单行文本，单选按钮组，下拉树，码表下拉框，日期，自定义按钮，组面板，外部页面等控件。实现了电信设计活动的场景。</p>
                </div>
                <div style={ { display: `${ this.state.currentIndex === 2 ? 'block' : 'none' }` } }> 
                  <h2>方案描述</h2>
                  <p>BONC-DM 目前已使用于联通总部存量经营平台、联通十几省存量经营平台未来将有计划的应用于电信、金融、农业，教育等多个行业。</p>
                  <Divider line/>
                  <h2>云南农业填报系统</h2>
                  <p>云南农业填报系统从门户到流程在到动态建模整个项目都是基于 EPM_DM 完成的，节约将近 100% 成本。</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lightspot">
            <div className="intro_title">
              <span className="intro_title_t">文档与工具</span>
              <div className="pIntro_title_divider"></div>
            </div>

            <Container type="fluid" className="lsfluid">
              <Row gutter={ 60 }>
                <Row.Col size={ { sm: 12, md: 6, lg: 6 } }>
                  <Card className="intro_card ls_card">
                    <Card.Header>
                      <img src={ `${ page.basename }/images/chanpinwendang.png` } style={ { width: '60px', height: '60px' } }/>
                    </Card.Header>
                    <Card.Body>
                      <p style={ { fontSize: '18px', fontWeight: 'bolder', textAlign: 'center', color: '#333', margin: "10px 0" } }>产品文档</p>
                      <p style={ { fontSize: '14px', textAlign: 'center', color: '#666' } }>查看企业应用开发平台相关文档</p>
                    </Card.Body>
                  </Card>
                </Row.Col>

                <Row.Col size={ { sm: 12, md: 6, lg: 6 } }>
                  <Card className="intro_card ls_card">
                    <Card.Header>
                      <img src={ `${ page.basename }/images/kuaisurumen.png` } style={ { width: '60px', height: '60px' } }/>
                    </Card.Header>
                    <Card.Body>
                      <p style={ { fontSize: '18px', fontWeight: 'bolder', textAlign: 'center', color: '#333', margin: "10px 0" } }>快速入门</p>
                      <p style={ { fontSize: '14px', textAlign: 'center', color: '#666' } }>了解如何快速使用企业应用开发平台</p>
                    </Card.Body>
                  </Card>
                </Row.Col>

                <Row.Col size={ { sm: 12, md: 6, lg: 6 } }>
                  <Card className="intro_card ls_card">
                    <Card.Header>
                      <img src={ `${ page.basename }/images/changjianwenti.png` } style={ { width: '60px', height: '60px' } }/>
                    </Card.Header>
                    <Card.Body>
                      <p style={ { fontSize: '18px', fontWeight: 'bolder', textAlign: 'center', color: '#333', margin: "10px 0" } }>常见问题</p>
                      <p style={ { fontSize: '14px', textAlign: 'center', color: '#666' } }>更多问题交流于讨论</p>
                    </Card.Body>
                  </Card>
                </Row.Col>

                <Row.Col size={ { sm: 12, md: 6, lg: 6 } }>
                  <Card className="intro_card ls_card">
                    <Card.Header>
                      <img src={ `${ page.basename }/images/fuwutiaokuan.png` } style={ { width: '60px', height: '60px' } }/>
                    </Card.Header>
                    <Card.Body>
                      <p style={ { fontSize: '18px', fontWeight: 'bolder', textAlign: 'center', color: '#333', margin: "10px 0" } }>服务条款</p>
                      <p style={ { fontSize: '14px', textAlign: 'center', color: '#666' } }>了解更多服务条款</p>
                    </Card.Body>
                  </Card>
                </Row.Col>
              </Row>
            </Container>
          </div>

        </div>
      </Layout>
    );
  }
}

export default EPM;
