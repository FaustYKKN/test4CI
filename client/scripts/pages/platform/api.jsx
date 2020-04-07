import React, { Component } from 'react';
import { Carousel, Tag, Card, Container, Row, Divider, Button, Icon } from 'epm-ui-react';
import page from 'epm-ui-boot/page';
import Layout from '../../layouts/default';
import '../../../styles/index.css';
import '../../../styles/platform.css';

class API extends Component {

  constructor( props ) {
    super( props );

    let timeText = [
      {
        time:'2017-06',
        text:'部队 56 所大数据治理平台项目'
      },
      {
        time:'2017-12',
        text:'工业互联网平台'
      },
      {
        time:'2018-03',
        text:'数据开放共享平台'
      },
      {
        time:'2018-04',
        text:'浙江电信大数据平台'
      },
      {
        time:'2018-05',
        text:'商机-高检能力开放平台'
      },
      {
        time:'2018-05',
        text:'华为-兰州新区智慧城市项目'
      },
      {
        time:'2018-05',
        text:'石家庄鹿泉广场指挥中心项目'
      },
      {
        time:'2018-05',
        text:'天津泰达智慧城市项目'
      },
      {
        time:'2018-06',
        text:'广东联通大数据平台'
      },
      {
        time:'2018-06',
        text:'新客服接触中心 POC'
      },
      {
        time:'2018-06',
        text:'联通网运项目 POC'
      },
      {
        time:'2018-07',
        text:'深圳数字政府大脑系统'
      },
      {
        time:'2018-07',
        text:'福建星云大数据建设项目'
      },
      {
        time:'2018-08',
        text:'深圳机场项目'
      },
      {
        time:'2018-08',
        text:'西城紫光项目'
      },
      {
        time:'2018-08',
        text:'深圳市光明新区 IOC 项目'
      },
      {
        time:'2018-08',
        text:'智慧城市-上海政务 IOC'
      },
      {
        time:'2018-08',
        text:'能力开放平台互联网化'
      }
    ];
    let ulWidth = 0;

    timeText.forEach((json)=>{
      if(json.text){
        let len=0;
        let re=/[a-zA-Z]/g;

        if(json.text.match(re)!==null){
          len=(json.text.match(re)).length;
        }

        ulWidth += 20 + len*7 + (json.text.length - len)*14 ;
      }
    });

    this.rightBtnClick = this.rightBtnClick.bind(this);
    this.leftBtnClick = this.leftBtnClick.bind(this);
    this.scrollLeft = this.scrollLeft.bind(this);

    this.flag = true;

    this.state = {
      tabs: [ "电信", "工业" ],
      currentIndex: 0,
      timeText,
      ulWidth: ulWidth + 60
    };
  }

  handleTab( currentIndex ) {
    this.setState( { currentIndex } );
  }

  rightBtnClick(){
    if( this.flag ){
      this.flag = false;

      this.scrollLeft(this._timeBox, 300, 600);

      setTimeout(()=> { this.flag = true; }, 600);
    }
  }

  leftBtnClick(){
    if( this.flag ){
      this.flag = false;

      this.scrollLeft(this._timeBox, -300, 600);

      setTimeout(()=> { this.flag = true; }, 600);
    }
  }

  scrollLeft(element, change, duration) {
    let start = element.scrollLeft,
      currentTime = 0,
      increment = 20;

    let animateScroll = () => {
      currentTime += increment;
      element.scrollLeft = easeInOutQuad(currentTime, start, change, duration);

      if(currentTime < duration) {
        setTimeout(animateScroll, increment);
      }
    };
    let easeInOutQuad = (currentTime, start, change, duration) => {
      currentTime /= duration/2;
      if (currentTime < 1) return change/2*currentTime*currentTime + start;
      currentTime--;
      return -change/2 * (currentTime*(currentTime-2) - 1) + start;
    };

    animateScroll();
  }

  componentDidMount(){
    document.title = 'API Manager';
    this._timeBox.scrollLeft = this.state.ulWidth;
  }

  render() {
    const itemStyle = {
      height : '550px',
      backgroundSize: 'cover'
    };

    return (
      <Layout currentIndex={ 1 } aIndex={ 8 } >
        <div>
          <div className="intro" style = { { background: `url(${ page.basename }/images/ban_02.png) no-repeat center`, ...itemStyle } }>
            <Container type="fluid" className="pinfluid">
              <Row style={ { minHeight: '200px' } }>
                <Row.Col size={ { sm: 24, md: 24, lg: 16 } }>
                  <Row>
                    <Row.Col size={ { sm: 24, md: 24, lg: 18 } }>
                      <span style={ { fontSize: '28px', fontWeight: 700, color: '#fff' } }>API Manager</span>
                    </Row.Col>
                  </Row>
                  <Row>
                    <Row.Col size={ 24 }>
                      <p style={ { color: '#fff' } }>API 管理提供 API 服务管控平台，实现个性化 API 的发布、订阅、控制等管理。API 管理分 API 注册和 API 商店两部分，在 API 注册界面，管理员可浏览和发布 API，将其开放给用户，并监控用户 API 的使用情况；在 API 商店界面，用户可以浏览已发布的 API 信息，订阅、调用需要的 API，以及监控自己订阅 API 的使用情况。</p>
                    </Row.Col>
                  </Row>
                </Row.Col>
              </Row>
              <Divider />
              <Row gutter={ 12 }>
                {/*<Row.Col size={ { sm: 6, md: 4, lg: 3 } }>*/}
                  {/*<Button type="primary" block size={ 'large' } style={ { borderRadius: '27px' } }*/}
                    {/*onClick={ () => {*/}
                      {/*window.open( `http://devplatform.bonc.pro/cas/jwt/login.do?service=${ window.location.origin+window.location.pathname }`, '_self' );*/}
                    {/*}}*/}
                  {/*>*/}
                    {/*立即试用*/}
                  {/*</Button>*/}
                {/*</Row.Col>*/}
                <Row.Col size={ { sm: 6, md: 4, lg: 3 } }>
                  <Button type="default" block size={ 'large' } style={ { borderRadius: '27px' } }
                    onClick={ () => { window.open( `${ page.basename }/docs/api-manager-docs/联通大数据能力开放平台API管理.html`, '_blank' ) } }
                  >
                  帮助文档
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
                              <span style={ { fontSize: '18px', fontWeight: 700 } }>API 管理实践</span>
                            </Row.Col>
                          </Row>
                          <Divider />
                          <Row>
                            <Row.Col size={ 24 }>
                              <span style={ { fontSize: '14px', fontWeight: 400 } }>能力开放平台结合数据共享需求和数据安全原则，规范了 API 服务开放的业务流程，包括开放、阻塞、废弃、销毁等全生命周期管理和 API 定义、发布、订阅等业务需求管理</span>
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
                              <span style={ { fontSize: '18px', fontWeight: 700 } }>API 设计</span>
                            </Row.Col>
                          </Row>
                          <Divider />
                          <Row>
                            <Row.Col size={ 24 }>
                              <span style={ { fontSize: '14px', fontWeight: 400 } }>为了提升 API 设计开发效率，能力开放平台自主研发了一套在线设计生成 API 的工具</span>
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
                              <span style={ { fontSize: '18px', fontWeight: 700 } }>API 应用</span>
                            </Row.Col>
                          </Row>
                          <Divider />
                          <Row>
                            <Row.Col size={ 24 }>
                              <span style={ { fontSize: '14px', fontWeight: 400 } }>API 管理人员可在 API 商店通过注册成为会员，完成对 API 整个生命周期的管理，管理员审核并向租户提供 API 调用权限</span>
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
                              <span style={ { fontSize: '18px', fontWeight: 700 } }>API 管理</span>
                            </Row.Col>
                          </Row>
                          <Divider />
                          <Row>
                            <Row.Col size={ 24 }>
                              <span style={ { fontSize: '14px', fontWeight: 400 } }>为了达到高性能、高可用、弹性扩展等目标，API 管理对 API gateway 网关层做了多节点水平分布部署，并且分离沙箱及正式环境</span>
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
              <p className="intro_title_p">云时代，API（ Application Program Interface ）成为服务交付、能力复制、数据输出的最佳载体</p>
            </div>

            <Container type="fluid" style={ { padding: '40px', border: '1px solid #000', backgroundColor: '#fff' } }>
              <Row style={ { borderBottom: '1px solid #000', minHeight: '105px', paddingBottom: '40px' } }>
                <Row.Col size={ 3 }>
                  <img src={ `${ page.basename }/images/icon2.png` } />
                </Row.Col>
                <Row.Col size={ 21 }>
                  <Row>
                    <Row.Col size={ 24 }>
                      <span style={ { fontSize: '18px', fontWeight: 700 } }>REST 接口开发</span>
                    </Row.Col>
                  </Row>
                  <Divider />
                  <Row>
                    <Row.Col size={ 24 }>
                      <span style={ { fontSize: '14px', fontWeight: 400 } }>开发人员可以使用可视化界面对 API 进行 url、参数、返回值等接口信息描述定义，即时生成 Swagger 在线文档；界面配置 Hbase、Redis、Oracle、Mysql 等数据源，设置 rowkey 规则、自定义 sql 等，在线生成 API 项目；针对生成的 API，开发人员既可以直接部署测试，也可以进行二次开发</span>
                    </Row.Col>
                  </Row>
                </Row.Col>
              </Row>
              <Row style={ { marginTop: '40px', borderBottom: '1px solid #000', minHeight: '105px', paddingBottom: '40px' } }>
                <Row.Col size={ 3 }>
                  <img src={ `${ page.basename }/images/icon2.png` } />
                </Row.Col>
                <Row.Col size={ 21 }>
                  <Row>
                    <Row.Col size={ 24 }>
                      <span style={ { fontSize: '18px', fontWeight: 700 } }>API 商店</span>
                    </Row.Col>
                  </Row>
                  <Divider />
                  <Row>
                    <Row.Col size={ 24 }>
                      <span style={ { fontSize: '14px', fontWeight: 400 } }>API 商店提供了所有 API 的浏览检索，并且根据分类、标签等进行 API 筛选。订阅者在商店中自助浏览、订阅、测试已经发布的 API 服务</span>
                    </Row.Col>
                  </Row>
                </Row.Col>
              </Row>
              <Row style={ { marginTop: '40px', borderBottom: '1px solid #000', minHeight: '105px', paddingBottom: '40px' } }>
                <Row.Col size={ 3 }>
                  <img src={ `${ page.basename }/images/icon2.png` } />
                </Row.Col>
                <Row.Col size={ 21 }>
                  <Row>
                    <Row.Col size={ 24 }>
                      <span style={ { fontSize: '18px', fontWeight: 700 } }>API 沙箱环境</span>
                    </Row.Col>
                  </Row>
                  <Divider />
                  <Row>
                    <Row.Col size={ 24 }>
                      <span style={ { fontSize: '14px', fontWeight: 400 } }>API 管理提供给 API 订阅用户沙箱测试环境，辅助用户调试。API 沙箱环境与生产环境相互隔离，但是具备相同的功能。用户也可以根据实际需求选择是否使用沙箱环境进行测试</span>
                    </Row.Col>
                  </Row>
                </Row.Col>
              </Row>
              <Row style={ { marginTop: '40px', borderBottom: '1px solid #000', minHeight: '105px', paddingBottom: '40px' } }>
                <Row.Col size={ 3 }>
                  <img src={ `${ page.basename }/images/icon2.png` } />
                </Row.Col>
                <Row.Col size={ 21 }>
                  <Row>
                    <Row.Col size={ 24 }>
                      <span style={ { fontSize: '18px', fontWeight: 700 } }>API 安全验证</span>
                    </Row.Col>
                  </Row>
                  <Divider />
                  <Row>
                    <Row.Col size={ 24 }>
                      <span style={ { fontSize: '14px', fontWeight: 400 } }>保障 API 被安全调用的重要技术手段。API 服务作为 API 的网关路由方提供了一套安全管理的机制。技术实现主要包括：通过 Oauth2 协议获取 TOKEN 进行身份验证、API 流量控制、限制 TOKEN 对特定 IP 域名生效、TOKEN 令牌时效限制、阻塞 API 订阅等</span>
                    </Row.Col>
                  </Row>
                </Row.Col>
              </Row>
              <Row style={ { marginTop: '40px', borderBottom: '1px solid #000', minHeight: '105px', paddingBottom: '40px' } }>
                <Row.Col size={ 3 }>
                  <img src={ `${ page.basename }/images/icon2.png` } />
                </Row.Col>
                <Row.Col size={ 21 }>
                  <Row>
                    <Row.Col size={ 24 }>
                      <span style={ { fontSize: '18px', fontWeight: 700 } }>API 网关</span>
                    </Row.Col>
                  </Row>
                  <Divider />
                  <Row>
                    <Row.Col size={ 24 }>
                      <span style={ { fontSize: '14px', fontWeight: 400 } }>限制应用的调用频次，通过并发量的监控，可以自动阻断网络攻击，保护服务提供端的系统安全</span>
                    </Row.Col>
                  </Row>
                </Row.Col>
              </Row>
              <Row style={ { marginTop: '40px' } }>
                <Row.Col size={ 3 }>
                  <img src={ `${ page.basename }/images/icon2.png` } />
                </Row.Col>
                <Row.Col size={ 21 }>
                  <Row>
                    <Row.Col size={ 24 }>
                      <span style={ { fontSize: '18px', fontWeight: 700 } }>API 监控</span>
                    </Row.Col>
                  </Row>
                  <Divider />
                  <Row>
                    <Row.Col size={ 24 }>
                      <span style={ { fontSize: '14px', fontWeight: 400 } }>为监控 API 服务的调用情况，建设了 API 管理的监控分析系统。API 服务每次的调用情况都会在 API 网关有日志记录，监控分析系统通过各维度统计，分析不同指标，得出统计结果，比如 API 服务调用质量、调用频次、响应时间、调用报文等图表报告</span>
                    </Row.Col>
                  </Row>
                </Row.Col>
              </Row>
            </Container>
          </div>

          <div className="intro" style={ { backgroundColor: 'rgba(51, 51, 51, 1)' } }>
            <div className="intro_title">
              <span className="intro_title_t" style={ { color: '#fff' } }>实战场景</span>
              <div className="pIntro_title_divider"></div>
              <p className="intro_title_p">API 服务管理可以帮助企业将数据、服务以 API 的形式对外开放</p>
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
                  <p>API 经济是利用互联网的 Web API 技术，将企业能力或竞争力作为 API 服务而进行商业交换的经济模式；API（ Application Program Interface ）已经成为服务交付，能力复制，数据输出的最佳载体，API 服务可以帮助企业将数据、服务以 API 的形式对外开放，解决 API 碎片化管理，提高 API 的可发现性和可利用性，保障 API 稳定、安全、有效的对外支撑。</p>
                  <Divider line/>
                  <h2>中国联通数据共享开放平台</h2>
                  <p>能力开放平台结合数据共享需求和数据安全原则，规范了 API 服务开放的业务流程，包括开放、阻塞、废弃、销毁等全生命周期管理和 API 定义、发布、订阅等业务需求管理。同时提供整套安全防护手段包括安全认证，流量控制、防恶意攻击，API 调用质量分析，计次计价等功能。</p>
                </div>
                <div style={ { display: `${ this.state.currentIndex === 1 ? 'block' : 'none' }` } }>
                  <h2>方案描述</h2>
                  <p>随着各系统和平台提供的API服务数量大量增加，平台和租户之间、租户和租户之间、内部和外部之间，域内和域外之间 API 调用关系越来越复杂，调用频率指性增加，为做好 API 服务安全高效开放，能力开放平台建设了一套高性能、高可用的 API 管理模块。</p>
                  <Divider line/>
                  <h2>Clouddip 平台</h2>
                  <p>微服务架构风格，就像是把小的服务开发成单一应用的形式，每个应用运行在单一的进程中，并使用如 HTTP 这样子的轻量级的 API。这些服务满足某需求，并使用自动化部署工具进行独立发布。这些服务可以使用不同的开发语言以及不同数据存储技术，并保持最低限制的集中式管理。</p>
                </div>
              </div>
            </div>
          </div>

          <div className="intro" style={ { backgroundColor: 'rgba(250, 250, 250, 1)' } }>
            <div className="intro_title">
              <span className="intro_title_t">服务部署</span>
              <div className="pIntro_title_divider"></div>
            </div>

            <Container type="fluid" className="lsfluid">
              <div className="time-line">
                <div className="left-btn"> <Button style={ { color: 'rgba(153, 153, 153, 1)' } } onClick={ this.leftBtnClick }><Icon icon={ 'arrow-left' } /></Button> </div>
                <div className="right-btn"> <Button style={ { color: 'rgba(153, 153, 153, 1)' } } onClick={ this.rightBtnClick }><Icon icon={ 'arrow-right' } /></Button></div>
                <div className="time-box light" ref={div => (this._timeBox = div)}>
                  <ul style={ { width: this.state.ulWidth } }>
                    {
                      this.state.timeText.map( ( json, index ) => {
                        return (
                          <li key={ index }>
                            <span className="timeText">{json.time}</span>
                            <p>{json.text}</p>
                          </li>
                        );
                      } )
                    }
                  </ul>
                </div>
              </div>
            </Container>
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

export default API;
