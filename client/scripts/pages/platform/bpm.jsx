import React, { Component } from 'react';
import { Carousel, Tag, Card, Container, Row, Divider, Button, Icon } from 'epm-ui-react';
import page from 'epm-ui-boot/page';
import Layout from '../../layouts/default';
import '../../../styles/index.css';
import '../../../styles/platform.css';

class BPM extends Component {

  constructor( props ) {
    super( props );

    let timeText = [
      {
        time:'2017-04',
        text:'提供便捷丰富的客户端及服务端对流程引擎服务调用的工具包'
      },
      {
        time:'2017-06',
        text:'提高在线模型设计工具的功能'
      },
      {
        time:'2017-09',
        text:'提供更强丰富的流程执行分配人员的配置功能'
      },
      {
        time:'2017-12',
        text:'流程底层架构改造优化，提高引擎的执行性能'
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
      tabs: [ "电信", "大数据", "信息管理" ],
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
    document.title = 'BPM 流程引擎';
    this._timeBox.scrollLeft = this.state.ulWidth;
  }

  render() {
    const itemStyle = {
      height : '550px',
      backgroundSize: 'cover'
    };

    return (
      <Layout currentIndex={ 1 } aIndex={ 5 } >
        <div>
          <div className="intro" style = { { background: `url(${ page.basename }/images/ban_02.png) no-repeat center`, ...itemStyle } }>
              <Container type="fluid" className="pinfluid">
                <Row style={ { minHeight: '200px' } }>
                  <Row.Col size={ { sm: 24, md: 24, lg: 16 } }>
                    <Row>
                      <Row.Col size={ { sm: 24, md: 24, lg: 18 } }>
                        <span style={ { fontSize: '28px', fontWeight: 700, color: '#fff' } }>BPM 流程引擎</span>
                      </Row.Col>
                    </Row>
                    <Row>
                      <Row.Col size={ 24 }>
                        <p style={ { color: '#fff' } }>工作流管理系统的灵魂核心，负责模型的解析，实例的创建、活动的执行和控制过程模型与现实实际过程连接，通过工作流执行服务、应用软件和操作人员交互来完成。</p>
                      </Row.Col>
                    </Row>
                  </Row.Col>
                </Row>
                <Divider />
                <Row gutter={ 12 }>
                  <Row.Col size={ { sm: 6, md: 4, lg: 3 } }>
                    <Button type="primary" block size={ 'large' } style={ { borderRadius: '27px' } }
                      onClick={ () => {
                        window.open( `http://devplatform.bonc.pro/bpm/`, '_self' );
                      }}
                    >
                      立即试用
                    </Button>
                  </Row.Col>
                  <Row.Col size={ { sm: 6, md: 4, lg: 3 } }>
                    <Button type="default" block size={ 'large' } style={ { borderRadius: '27px' } }
                      onClick={ () => {window.open( `${ page.basename }/docs/bpm-docs/用户操作使用手册.html`, '_blank' ) }}
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
                              <span style={ { fontSize: '18px', fontWeight: 700 } }>面向业务</span>
                            </Row.Col>
                          </Row>
                          <Divider />
                          <Row>
                            <Row.Col size={ 24 }>
                              <span style={ { fontSize: '14px', fontWeight: 400 } }>工作流是面向业务过程的技术</span>
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
                              <span style={ { fontSize: '18px', fontWeight: 700 } }>自动化</span>
                            </Row.Col>
                          </Row>
                          <Divider />
                          <Row>
                            <Row.Col size={ 24 }>
                              <span style={ { fontSize: '14px', fontWeight: 400 } }>工作流反映了业务过程的自动化</span>
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
                              <span style={ { fontSize: '18px', fontWeight: 700 } }>资源互联</span>
                            </Row.Col>
                          </Row>
                          <Divider />
                          <Row>
                            <Row.Col size={ 24 }>
                              <span style={ { fontSize: '14px', fontWeight: 400 } }>工作流根据业务规则将系统中的各种资源相互关联，并协调完成整个业务过程</span>
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
                              <span style={ { fontSize: '18px', fontWeight: 700 } }>逻辑清晰</span>
                            </Row.Col>
                          </Row>
                          <Divider />
                          <Row>
                            <Row.Col size={ 24 }>
                              <span style={ { fontSize: '14px', fontWeight: 400 } }>实现应用逻辑和过程逻辑分离，可以在不修改具体功能实现方式的情况下重组模型</span>
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
              <p className="intro_title_p">工作流可以把各业务部门的孤立应用系统整合起来，提高客户服务水平和企业竞争能力</p>
            </div>

            <Container type="fluid" className="lsfluid">
              <Row gutter={ 60 }>
                <Row.Col size={ { sm: 24, md: 8, lg: 8 } }>
                  <Card className="intro_card pls_card">
                    <Card.Header>
                      <img src={ `${ page.basename }/images/icon1.png` } />
                    </Card.Header>
                    <Card.Body>
                      <p style={ { fontSize: '18px', fontWeight: 'bolder', textAlign: 'center', color: '#333', margin: "10px 0" } }>任务签收领用</p>
                      <p style={ { fontSize: '14px', textAlign: 'center', color: '#666' } }>对任务事项进行签收表明该流程步骤进行生效阶段，说明当前人员已将事项从待办状态切换为了在办状态</p>
                    </Card.Body>
                  </Card>
                </Row.Col>

                <Row.Col size={ { sm: 24, md: 8, lg: 8 } }>
                  <Card className="intro_card pls_card">
                    <Card.Header>
                      <img src={ `${ page.basename }/images/icon2.png` } />
                    </Card.Header>
                    <Card.Body>
                      <p style={ { fontSize: '18px', fontWeight: 'bolder', textAlign: 'center', color: '#333', margin: "10px 0" } }>任务直送</p>
                      <p style={ { fontSize: '14px', textAlign: 'center', color: '#666' } }>直流为流程操作中最为简单的一种操作，直流为当前任务环节往下仅有一个任务，不存在分支的流转，在直流过程中可确定的是流程下一任务节点，不可确定的是执行此任务的人员</p>
                    </Card.Body>
                  </Card>
                </Row.Col>

                <Row.Col size={ { sm: 24, md: 8, lg: 8 } }>
                  <Card className="intro_card pls_card">
                    <Card.Header>
                      <img src={ `${ page.basename }/images/icon1.png` } />
                    </Card.Header>
                    <Card.Body>
                      <p style={ { fontSize: '18px', fontWeight: 'bolder', textAlign: 'center', color: '#333', margin: "10px 0" } }>任务分送</p>
                      <p style={ { fontSize: '14px', textAlign: 'center', color: '#666' } }>分流在流程操作中也很常见，分流为当前任务环节往下具有一个以上的任务环节可供选择，即存在分支的流转</p>
                    </Card.Body>
                  </Card>
                </Row.Col>
              </Row>
              <Row gutter={ 60 }>
                <Row.Col size={ { sm: 24, md: 8, lg: 8 } }>
                  <Card className="intro_card pls_card">
                    <Card.Header>
                      <img src={ `${ page.basename }/images/icon2.png` } />
                    </Card.Header>
                    <Card.Body>
                      <p style={ { fontSize: '18px', fontWeight: 'bolder', textAlign: 'center', color: '#333', margin: "10px 0" } }>并行流转</p>
                      <p style={ { fontSize: '14px', textAlign: 'center', color: '#666' } }>当前任务节点往下具有一个以上的任务节点，即存在分支的流转，但并不需要用户选择往哪个节点的一种流转操作，在并流的情况下系统将自动往所有的分支节点流转</p>
                    </Card.Body>
                  </Card>
                </Row.Col>  

                <Row.Col size={ { sm: 24, md: 8, lg: 8 } }>
                  <Card className="intro_card pls_card">
                    <Card.Header>
                      <img src={ `${ page.basename }/images/icon1.png` } />
                    </Card.Header>
                    <Card.Body>
                      <p style={ { fontSize: '18px', fontWeight: 'bolder', textAlign: 'center', color: '#333', margin: "10px 0" } }>条件流转</p>
                      <p style={ { fontSize: '14px', textAlign: 'center', color: '#666' } }>条件流转为根据流程设计时所编写的脚本由系统计算出结果并决定流程的下一任务节点。举例来说，当前申请事项金额大于10万的时候至经理审批，而大于50万的时候则需递交至副总经理审批</p>
                    </Card.Body>
                  </Card>
                </Row.Col>

                <Row.Col size={ { sm: 24, md: 8, lg: 8 } }>
                  <Card className="intro_card pls_card">
                    <Card.Header>
                      <img src={ `${ page.basename }/images/icon2.png` } />
                    </Card.Header>
                    <Card.Body>
                      <p style={ { fontSize: '18px', fontWeight: 'bolder', textAlign: 'center', color: '#333', margin: "10px 0" } }>任务收回</p>
                      <p style={ { fontSize: '14px', textAlign: 'center', color: '#666' } }>当审批人员发现申请事项发送给了一个不合适的办理人员时，如该办理人员尚未签收该事项，则审批人员可将此申请事项取回，避免不必要的麻烦</p>
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
              <p className="intro_title_p">根据业务规则将系统中的各种资源相互关联，并协调完成整个业务过程</p>
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
                  <p>在流程建模工具中，可以利用工具中的图元进行流程图的绘制，并对各类图元的属性值进行设定，来达到改变流程行为的目的。最终保存为符合 bpm n2.0 标准的 xml 格式的流程定义文件。此文件发布后可以被 bpm 的流程引擎去解析，创建可以运行的流程实例，驱动流程任务的执行。</p>
                  <Divider line/>
                  <h2>河南联通大数据精准营销平台</h2>
                  <p>通过流程建模工具内的事件、活动、连接对象、分支节点、子流程、注释等几种图元，针对电信行业的特有需求，建立符合电信需求的特有事件分为开始节点、结束节点、定时开始节点；在每个事件上部署相应的任务节点，从而串联起整个流程。</p>
                </div>
                <div style={ { display: `${ this.state.currentIndex === 1 ? 'block' : 'none' }` } }>
                  <h2>方案描述</h2>
                  <p>利用 BPM 流程引擎，实现数据全生命周期端到端透明化管控，实现“数据模型标准化、数据关系脉络化、数据加工可视化、数据质量度量化、数据服务自动化”，全业务流程模型的建立。</p>
                  <Divider line/>
                  <h2>数据治理平台</h2>
                  <p>采集流程、稽核流程、加工流程、服务流程、问题处理流程，各个流程节点制定相关负责人，责任到人；
                    <br />
                    针对采集、加工、稽核、服务各个流程，进行全方位实时的监控，设告警定阀值，实现异常情况快速定位;
                    <br />
                    协助数据治理平台完成事前防范、事中管控、事后治理的平台定位。
                  </p>
                </div>
                <div style={ { display: `${ this.state.currentIndex === 2 ? 'block' : 'none' }` } }>
                  <h2>方案描述</h2>
                  <p>以不同维度对人员进行划分，形成矩阵组织结构图，并在行政管控组织基础上 + 自定义的组织而形成项目管控组织；根据工作只能设计流程走向、分支、开始结束点等内容。</p>
                  <Divider line/>
                  <h2>运营管理平台</h2>
                  <p>通过对里程碑的管理，可以更精细地把控项目工作进度，保证总目标的实现。
                    <br />
                    里程碑生命周期管理有三个关键节点，分别是创建、完成、M包发放，分别对应三个审批流程。
                    <br />
                    里程碑审结后，项目负责人可以申请M包奖金。需在运营管理系统发起M包申请流程。
                  </p>
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

export default BPM;
