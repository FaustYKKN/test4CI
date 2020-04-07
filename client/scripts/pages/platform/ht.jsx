import React, { Component } from 'react';
import { Carousel, Tag, Card, Container, Row, Divider, Button, Icon, fetch } from 'epm-ui-react';
import page from 'epm-ui-boot/page';
import Layout from '../../layouts/default';
import '../../../styles/index.css';
import '../../../styles/platform.css';

class HT extends Component {

  constructor( props ) {
    super( props );

    let timeText = [
      {
        time:'2018-05-25',
        text:'打包平台正式使用'
      },
      {
        time:'2018-08-01',
        text:'平台加入单独移动端打包'
      },
      {
        time:'2018-11-04',
        text:'加入语音识别插件，扫描二维码插件'
      },
      {
        time:'2018-11-11',
        text:'加入版本更新插件，文件上传插件'
      },
      {
        time:'2018-12-02',
        text:'加入微信授权与微信分享插件，本地推送功能'
      },
      {
        time:'2019-01-10',
        text:'加入打开百度地图和高德地图'
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
      tabs: [ "电信", "电力", "工控", "能源" ],
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
    document.title = 'HT for Web';
    this._timeBox.scrollLeft = this.state.ulWidth;
  }

  render() {
    const itemStyle = {
      height : '550px',
      backgroundSize: 'cover'
    };

    return (
      <Layout currentIndex={ 1 } aIndex={ 3 } >
        <div>
          <div className="intro" style = { { background: `url(${ page.basename }/images/ban_02.png) no-repeat center`, ...itemStyle } }>
              <Container type="fluid" className="pinfluid">
                <Row style={ { minHeight: '200px' } }>
                  <Row.Col size={ { sm: 24, md: 24, lg: 16 } }>
                    <Row> 
                      <Row.Col size={ { sm: 24, md: 24, lg: 18 } }>
                        <span style={ { fontSize: '28px', fontWeight: 700, color: '#fff' } }>HT for Web</span>
                      </Row.Col>
                    </Row>
                    <Row>
                      <Row.Col size={ 24 }>
                        <p style={ { color: '#fff' } }>HT for Web ( 简称 HT ) 是由厦门图扑软件科技有限公司独立自主研发的，一款基于 HTML5 标准技术的 Web 前端 2D 和 3D 图形界面的一站式式解决方案；产品使用 HT 可轻松实现现代化的、高性能跨桌面和移动终端的图形数据可视化并具备从平面到空间，到 VR 虚拟现实的交互体验。<br/>多年来 HT 产品已在电信、电力、交通、水利、安防和新能源等工业自动化图形监控 ( SCADA / HMI ) 领域，服务了国内外数百家行业客户形成了从 SDK 图形插件库，到所见即所得 2D 和 3D 编辑器，到业矢量图标和三维模型资源库，被实践证明的一整套高效开发流程理念和开发生态体系。</p>
                      </Row.Col>
                    </Row>
                  </Row.Col>
                </Row>
                <Divider />
                <Row gutter={ 12 }>
                  <Row.Col size={ { sm: 6, md: 4, lg: 3 } }>
                    <Button type="primary" block size={ 'large' } style={ { borderRadius: '27px' } }
                      onClick={ () => {
                        window.open( `http://172.16.32.135:81/ht29/`, '_self' );
                      }}
                    >
                      立即试用
                    </Button>
                  </Row.Col>
                  <Row.Col size={ { sm: 6, md: 4, lg: 3 } }>
                    <Button type="default" block size={ 'large' } style={ { borderRadius: '27px' } }
                      onClick={ () => {
                        window.open( `${ page.basename }/application/ht`, '_self' );
                      }}
                    >
                      申请许可
                    </Button>
                  </Row.Col>
                </Row>
              </Container>
          </div>

          <div className="intro" style={ { paddingBottom: 0, backgroundColor: 'rgba(250, 250, 250, 1)' } }>
            <Container type="fluid" className="influid cube" >
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
                              <span style={ { fontSize: '18px', fontWeight: 700 } }>性能卓越</span>
                            </Row.Col>
                          </Row>
                          <Divider />
                          <Row>
                            <Row.Col size={ 24 }>
                              <span style={ { fontSize: '14px', fontWeight: 400 } }>所有组件皆可承受万甚至十万以上的图元量，上万行的表格数，上万的网路拓扑图元等 承载力往往让 HT 的新用户瞠目结，老用户却习以为常</span>
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
                              <span style={ { fontSize: '18px', fontWeight: 700 } }>组件丰富</span>
                            </Row.Col>
                          </Row>
                          <Divider />
                          <Row>
                            <Row.Col size={ 24 }>
                              <span style={ { fontSize: '14px', fontWeight: 400 } }>HT 提供了通用组件、图表组件、拓扑组件到三维组件，一站式全系列组件库，组件间可无缝融合嵌套；所有组件内置都已支桌面和格动触屏交互功能，且自动适配</span>
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
                            <Row.Col size={ 24 } >
                              <span style={ { fontSize: '18px', fontWeight: 700 } }>专注灵活</span>
                            </Row.Col>
                          </Row>
                          <Divider />
                          <Row>
                            <Row.Col size={ 24 }>
                              <span style={ { fontSize: '14px', fontWeight: 400 } }>HT 不约束用户后台框架，不限制通讯方式和数据格式，加上基于纯 HTML5 的跨平台特性，HT 能灵活适应各行业架构需求</span>
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
                              <span style={ { fontSize: '18px', fontWeight: 700 } }>流水作业</span>
                            </Row.Col>
                          </Row>
                          <Divider />
                          <Row>
                            <Row.Col size={ 24 }>
                              <span style={ { fontSize: '14px', fontWeight: 400 } }>HT 提供完备流水线作业工具链从组件扩展设计、矢量设计、2D 图纸设计、3D 场最设计，及程序员代码开发融合一体各工具创建的资源可甫接共事复用</span>
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

          <div className="intro" style={ { backgroundColor: 'rgba(250, 250, 250, 1)' } }>
            <div className="intro_title">
              <span className="intro_title_t">产品构成</span>
              <div className="pIntro_title_divider"></div>
              <p className="intro_title_p">从底层到工具，满足您想要的所有</p>
            </div>

            <Container type="fluid" className="influid">
              <Row className="pflex">
                <Row.Col size={ { sm: 24, md: 5, lg: 5 } }>
                  <Card className="intro_card" style={ { backgroundColor: 'rgba(250, 250, 250, 1)' } }>
                    <Card.Header>
                      <img className="pIntro_img" src={ `${ page.basename }/images/xingoujia.png` } />
                    </Card.Header>
                    <Card.Body>
                      
                      <p style={ { fontSize: '16px', fontWeight: 'bolder', textAlign: 'center', color: '#333' } }>底层核心</p>
                      <p>数据模型：统一所有组件的数据容器，可增删和遍历数据单元，具备事件派发机</p>
                      <p>矢量引擎：可渲染 JSON 格式的矢量引擎，支持数据绑定，可呈现于所有视图组件</p>
                      <p>三维引擎：基于 Webgl 技术的三维渲染引撃，可编程建模，支持 OBJ 格式导入</p>
                    </Card.Body>
                  </Card>
                </Row.Col>
                <Row.Col size={ { sm: 0, md: 1, lg: 1 } }>
                  <div className="pIntro_dian">
                    <img src={ `${ page.basename }/images/dian.png` }/>
                  </div>
                </Row.Col>
                <Row.Col size={ { sm: 24, md: 5, lg: 5 } }>
                  <Card className="intro_card" style={ { backgroundColor: 'rgba(250, 250, 250, 1)' } }>
                    <Card.Header>
                      <img className="pIntro_img" src={ `${ page.basename }/images/xinaifa.png` } />
                    </Card.Header>
                    <Card.Body>
                      <p style={ { fontSize: '16px', fontWeight: 'bolder', textAlign: 'center', color: '#333' } }>视图组件</p>
                      <p>通用组件：包含表格、树图、菜单、对话框等丰富控件，及多种布局管理容器</p>
                      <p>拓扑组件：支持缩放、拖拽、组合、分层、自动布局等功能的二维图形展示</p>
                      <p>三维组件：支持六面体、球体、管道、墙面等模型，各种灯光渲染，漫游等交互</p>
                    </Card.Body>
                  </Card>
                </Row.Col>
                <Row.Col size={ { sm: 0, md: 1, lg: 1 } }>
                  <div className="pIntro_dian">
                    <img src={ `${ page.basename }/images/dian.png` }/>
                  </div>
                </Row.Col>
                <Row.Col size={ { sm: 24, md: 5, lg: 5 } }>
                  <Card className="intro_card" style={ { backgroundColor: 'rgba(250, 250, 250, 1)' } }>
                    <Card.Header>
                      <img className="pIntro_img" src={ `${ page.basename }/images/DevOps.png` } />
                    </Card.Header>
                    <Card.Body>
                      <p style={ { fontSize: '16px', fontWeight: 'bolder', textAlign: 'center', color: '#333' } }>编辑工具</p>
                      <p>UI 编辑器：可视化拖拽控件和布局控制，构建表单、对话框等企业应用界面</p>
                      <p>2D 编辑器：可视化编辑创建矢量图标，拖拉搜节点和连线形成二维拓扑图</p>
                      <p>3D 编辑器：编辑三维模型单元，支持 OBJ 导入，可视化构建完整三维场景</p>
                    </Card.Body>
                  </Card>
                </Row.Col>
                <Row.Col size={ { sm: 0, md: 1, lg: 1 } }>
                  <div className="pIntro_dian">
                    <img src={ `${ page.basename }/images/dian.png` }/>
                  </div>
                </Row.Col>
                <Row.Col size={ { sm: 24, md: 5, lg: 5 } }>
                  <Card className="intro_card" style={ { backgroundColor: 'rgba(250, 250, 250, 1)' } }>
                    <Card.Header>
                      <img className="pIntro_img" src={ `${ page.basename }/images/DevOps.png` } />
                    </Card.Header>
                    <Card.Body>
                      <p style={ { fontSize: '16px', fontWeight: 'bolder', textAlign: 'center', color: '#333' } }>帮助文档</p>
                      <p>数十份核心及插件库文档，使用说明和数百个使用示例融合一体</p>
                    </Card.Body>
                  </Card>
                </Row.Col>
              </Row>
            </Container>
          </div>

          <div className="intro" style={ { backgroundColor: 'rgba(51, 51, 51, 1)' } }>
            <div className="intro_title">
              <span className="intro_title_t" style={ { color: '#fff' } }>实战场景</span>
              <div className="pIntro_title_divider"></div>
              <p className="intro_title_p">构建先进 2D 和 3D 可视化所需要的一切</p>
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
                  <p>HT 针对电信行业进行了专业的模型对象封装和展示效果设计: 拓扑组件提供了节点、连线、子网、组、机架、设备面板等，从宏观到微观的电信模型对象封装；
                    <br />
                    提供告警数据驱动、告警传播机制告警染色/冒泡/闪烁/流动等丰富展示效果；提供多种自动布局算法，解决了手工布局大数据量网络拓扑图难题；
                    <br />
                    结合表格、树图和属性页等通用组件，及强大的 3D 渲染引擎，可为电信 OSS / BSS / NMS 等运营支持系统 数据中心 3D 房可视化系统、T 监测运维动态大屏展材资源、一站式电信行业数据可视化解決方案 示系统，提供从数据模型到视图组件、从编辑工具到素。</p>
                  <Divider line/>
                  <h2>光伏大数据分析</h2>
                  <p>光伏大数据分析系统，覆盖运行管理、设备管理和大数据分析等类应用，实现调度监控、组件故障分析以及发电指标相关性分析等主要功能，从而解决了电站系统故障、组件老化以及发电效率不高等问题。</p>
                </div>
                <div style={ { display: `${ this.state.currentIndex === 1 ? 'block' : 'none' }` } }>
                  <h2>方案描述</h2>
                  <p>HT 独特的矢量引擎功能满足电力行业设备种类繁多、设备图元和线路网络需无极缩放绑定量测数据实时刷新等需求；
                    <br />
                    三维呈现技术使得电力场站和变压器等设备 3D 可视化监控成为可能；
                    <br />
                    基于 HTML5 的技术适应了智能电网调度、配电网运行监控与配电网运维管控，通过移动终端实现 Web SCADA 掌上运维的时代需求；
                    <br />
                    传统电力行业 CS 桌面监控系统移植到新一代 Web 和移动终端进化中，HT 是实施成本最低，开发和运行效率最高的前端图形技术解决方案。
                    </p>
                  <Divider line/>
                  <h2>智慧用电安全管理云平台</h2>
                  <p>智慧用电安全管理云平台，为客户提供新管理模式。通过无线物联网技术构建全新电气火灾监控网络，实现远程监控、快速定位、移动派单、巡检维修等功能，保证用电安全。</p>
                 </div>
                <div style={ { display: `${ this.state.currentIndex === 2 ? 'block' : 'none' }` } }> 
                  <h2>方案描述</h2>
                  <p>HT 通过多年在图形界面技术沉淀，及众多行业可视化监控需求积累，推出了针对工业物联网图形组态平台的 Web SCADA 前端解决方案；
                    <br />
                    帮助了上百家传统工业组态软件厂家，及新型工业物联网公司实现了 Web 化 2D 和 3D 工业监控可视化平台；
                    <br />
                    革命性的可在云端直接进行矢量图标编辑、三维组态建模、场景构建及数据绑定配置；
                    <br />
                    并可一键式无缝发布到桌面平台和移动终端，实现纯 HTML5 的一体化开发流。
                  </p>
                  <Divider line/>
                  <h2>高安屯循环水系统优化</h2>
                  <p>采集2017年9月-2018年3月的循环水系统的工艺数据，对凝汽器入口蒸汽流量、压气机入口环境温度、凝汽器真空进行聚类分析，实现对循环水系统工况的划分。根据工况划分结果，建立工况辨识模型，实现对当前工况的识别。在每一种工况下，推荐历史上循环水系统总能耗最低时对应的风机和循环水泵的运行方式，并将优化结果实时推荐给操作人员，从而指导循环水系统优化，降低发电成本。</p>
                </div><div style={ { display: `${ this.state.currentIndex === 3 ? 'block' : 'none' }` } }>
                  <h2>方案描述</h2>
                  <p>随着能源发展将迈入数字能源新时代，化石能源可再生能源、数字能源将共同构成完整的现代能源系统，提升设备“能量可利用率”与“时间可利用率”成为企业自身乃至整个新能源产业带来运营管理方式升级与转型的关键，其中必不可少的就是前端大数据可视化的重要环节。</p>
                  <Divider line/>
                  <h2>智慧照明</h2>
                  <p>通过应用先进、高效、可靠的电力线载波通信技术和无线 GPRS / CDMA 通信技术等，实现对路灯的远程集中控制与管理，具有根据车流量自动调节亮度、远程照明控制、故障主动报警、灯具线缆防盗、远程抄表等功能，能够大幅节省电力资源，提升公共照明管理水平，节省维护成本。</p>
                 </div>
              </div>
            </div>
          </div>

          <div className="intro" style={ { backgroundColor: 'rgba(250, 250, 250, 1)' } }>
            <div className="intro_title">
              <span className="intro_title_t">更新日志</span>
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

export default HT;
