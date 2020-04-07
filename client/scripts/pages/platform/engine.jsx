import React, { Component } from 'react';
import { Carousel, Tag, Card, Container, Row, Divider, Button, Icon } from 'epm-ui-react';
import page from 'epm-ui-boot/page';
import Layout from '../../layouts/default';
import '../../../styles/index.css';
import '../../../styles/platform.css';

class Engine extends Component {

  constructor( props ) {
    super( props );

    let timeText = [
      {
        time:'2018-02',
        text:'启动新版规则引擎设计工作'
      },
      {
        time:'2018-04',
        text:'规则计算引擎完成 UI 改版、模块化拆分'
      },
      {
        time:'2018-06',
        text:'规则计算引擎完成模块化功能重构'
      },
      {
        time:'2018-07',
        text:'启动物联网相关规则引擎设计、调研工作'
      },
      {
        time:'2018-10',
        text:'规则计算引擎3.0版本完成'
      },
      {
        time:'2018-11',
        text:'规则计算引擎产品推广'
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
      tabs: [ "电信", "金融", "政府" ],
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
    document.title = '规则引擎';
    this._timeBox.scrollLeft = this.state.ulWidth;
  }

  render() {
    const itemStyle = {
      height : '550px',
      backgroundSize: 'cover'
    };

    return (
      <Layout currentIndex={ 1 } aIndex={ 10 } >
        <div>
          <div className="intro" style = { { background: `url(${ page.basename }/images/ban_02.png) no-repeat center`, ...itemStyle } }>
            <Container type="fluid" className="pinfluid">
              <Row style={ { minHeight: '200px' } }>
                <Row.Col size={ { sm: 24, md: 24, lg: 16 } }>
                  <Row>
                    <Row.Col size={ { sm: 24, md: 24, lg: 18 } }>
                      <span style={ { fontSize: '28px', fontWeight: 700, color: '#fff' } }>规则引擎</span>
                    </Row.Col>
                  </Row>
                  <Row>
                    <Row.Col size={ 24 }>
                      <p style={ { color: '#fff' } }>东方国信规则计算引擎，研发一套基于 jvm 平台符合自己业务的在线实时分布式计算框架，可以接受数据输入，解释业务规则，并根据业务规则做出适当的业务决策。实现将企业通常的业务决策，从应用程序代码中分离出来，随后使用之前定义好的语义模块，单独编写业务决策。做到对业务决策的精准细分。</p>
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
                              <span style={ { fontSize: '18px', fontWeight: 700 } }>规则包管理</span>
                            </Row.Col>
                          </Row>
                          <Divider />
                          <Row>
                            <Row.Col size={ 24 }>
                              <span style={ { fontSize: '14px', fontWeight: 400 } }>统一管理表达式规则、决策树规则</span>
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
                              <span style={ { fontSize: '18px', fontWeight: 700 } }>分布式节点监控</span>
                            </Row.Col>
                          </Row>
                          <Divider />
                          <Row>
                            <Row.Col size={ 24 }>
                              <span style={ { fontSize: '14px', fontWeight: 400 } }>当采用集群模式部署时，规则引擎对计算节点进行在线监控、任务分发等操作</span>
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
                              <span style={ { fontSize: '18px', fontWeight: 700 } }>表达式解析</span>
                            </Row.Col>
                          </Row>
                          <Divider />
                          <Row>
                            <Row.Col size={ 24 }>
                              <span style={ { fontSize: '14px', fontWeight: 400 } }>支持基本表达式运算如四则运算，属于，包含等表达式操作符</span>
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
                              <span style={ { fontSize: '18px', fontWeight: 700 } }>函数规格</span>
                            </Row.Col>
                          </Row>
                          <Divider />
                          <Row>
                            <Row.Col size={ 24 }>
                              <span style={ { fontSize: '14px', fontWeight: 400 } }>规则引擎提供扩展函数对规则计算进行代码补充</span>
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
              <p className="intro_title_p">规则计算引擎归根结底是一个业务逻辑的解析器</p>
            </div>

            <Container type="fluid" className="lsfluid">
              <Row gutter={ 60 }>
                <Row.Col size={ { sm: 24, md: 8, lg: 8 } }>
                  <Card className="intro_card pls_card">
                    <Card.Header>
                      <img src={ `${ page.basename }/images/icon1.png` } />
                    </Card.Header>
                    <Card.Body>
                      <p style={ { fontSize: '18px', fontWeight: 'bolder', textAlign: 'center', color: '#333', margin: "10px 0" } }>计算节点动态添加</p>
                      <p style={ { fontSize: '14px', textAlign: 'center', color: '#666' } }>计算节点可动态添加、删除，无需重新启动集群</p>
                    </Card.Body>
                  </Card>
                </Row.Col>

                <Row.Col size={ { sm: 24, md: 8, lg: 8 } }>
                  <Card className="intro_card pls_card">
                    <Card.Header>
                      <img src={ `${ page.basename }/images/icon2.png` } />
                    </Card.Header>
                    <Card.Body>
                      <p style={ { fontSize: '18px', fontWeight: 'bolder', textAlign: 'center', color: '#333', margin: "10px 0" } }>基于 kafka 消息队列</p>
                      <p style={ { fontSize: '14px', textAlign: 'center', color: '#666' } }>基于kafka消息队列的抢占式消费特性，自动负载均衡<br/>基于kafka消息队列消费者特性，手动提交offset，保证数据不丢失</p>
                    </Card.Body>
                  </Card>
                </Row.Col>

                <Row.Col size={ { sm: 24, md: 8, lg: 8 } }>
                  <Card className="intro_card pls_card">
                    <Card.Header>
                      <img src={ `${ page.basename }/images/icon1.png` } />
                    </Card.Header>
                    <Card.Body>
                      <p style={ { fontSize: '18px', fontWeight: 'bolder', textAlign: 'center', color: '#333', margin: "10px 0" } }>在线热部署</p>
                      <p style={ { fontSize: '14px', textAlign: 'center', color: '#666' } }>改变的规则在线热部署，无需重启计算节点</p>
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
                      <p style={ { fontSize: '18px', fontWeight: 'bolder', textAlign: 'center', color: '#333', margin: "10px 0" } }>分布式数据</p>
                      <p style={ { fontSize: '14px', textAlign: 'center', color: '#666' } }>支持分布式数据在线实时计算<br/>分布式计算节点在线动态扩展</p>
                    </Card.Body>
                  </Card>
                </Row.Col>

                <Row.Col size={ { sm: 24, md: 8, lg: 8 } }>
                  <Card className="intro_card pls_card">
                    <Card.Header>
                      <img src={ `${ page.basename }/images/icon1.png` } />
                    </Card.Header>
                    <Card.Body>
                      <p style={ { fontSize: '18px', fontWeight: 'bolder', textAlign: 'center', color: '#333', margin: "10px 0" } }>生命周期管理</p>
                      <p style={ { fontSize: '14px', textAlign: 'center', color: '#666' } }>支持分布式计算框架、节点统一的命名，生命周期管理</p>
                    </Card.Body>
                  </Card>
                </Row.Col>

                <Row.Col size={ { sm: 24, md: 8, lg: 8 } }>
                  <Card className="intro_card pls_card">
                    <Card.Header>
                      <img src={ `${ page.basename }/images/icon2.png` } />
                    </Card.Header>
                    <Card.Body>
                      <p style={ { fontSize: '18px', fontWeight: 'bolder', textAlign: 'center', color: '#333', margin: "10px 0" } }>高效响应</p>
                      <p style={ { fontSize: '14px', textAlign: 'center', color: '#666' } }>高效响应历史数据<br/>高效的规则计算<br/>支持在线实时高并发计算
                      </p>
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
              <p className="intro_title_p">大数据应用场景中，用于解决业务规则频繁变化的工具引擎</p>
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
                  <p>基于中台、大数据、精准营销等业务系统能力，充分统筹线上/线下全部用户触点，打造后端业务系统能力与前端触点群的统一对接、统一策略、统一管控的统一入口平台，实现全触点一致的客户感知，即：“一个联通，一张面孔”的目标；
                    <br />
                    活动策划里边可以选择活动执行的触点及各个触点流转方式，及流转规则；实现执行触点互补、增强、替代效果。
                  </p>
                  <Divider line/>
                  <h2>河南联通大数据精准营销平台</h2>
                  <p>基于大数据平台实时引擎形成的用户位置、驻留时长、使用行为等多种事件，结合客户标签上下文数据，以客户动态上下文记录客户持续状态，在观察窗口期类聚合多种事件，完成业务规则判定；
                    <br />
                    基于大数据平台存储的周期性数据，在一段账期类观察新发展用户的行为，面向不同应用配置不同的规则，自动输出各应用所关注的焦点数据。
                  </p>
                </div>
                <div style={ { display: `${ this.state.currentIndex === 1 ? 'block' : 'none' }` } }>
                  <h2>方案描述</h2>
                  <p>随着移动支付、P2P等金融服务崛起，银行、保险公司、证券公司也纷纷搭上“互联网+”的顺风车，以寻求更大的市场空间。同时，在行业高速发展的背后也涌动着业务安全、用户体验、风险控制等问题。</p>
                  <Divider line/>
                  <h2>北京银行“普税贷”</h2>
                  <p>微信端输入信息，大数据前置判断交易类型（通过ESB的 namespace），获得输入的参数，调用规则引擎的相关规则进行处理，规则引擎返回业务逻辑处理过的数据，大数据前置再进行业务处理，先保存查询结果到大数据平台，再返回结果到小企业业务管理系统。
                    <br />
                    客户风险评分，就是根据客户信息使用特定的公式规则算法计算出用于标识客户风险级别的分值，在金融行业广泛的应用，如银行信用卡申请，个人或企业贷款审批。自动化的客户风险评分可以提高风险管理的及时性，确保评分决策的一致性。
                  </p>
                </div>
                <div style={ { display: `${ this.state.currentIndex === 2 ? 'block' : 'none' }` } }>
                  <h2>方案描述</h2>
                  <p>十三届全国人大一次会议审议通过了国务院机构改革方案，明确“将国家质量监督检验检疫总局的出入境检验检疫管理职责和队伍划入海关总署”。改革的重要原则是坚持优化、协同、高效。最终实现统一申报、统一作业、统一风控、统一指令、统一执法。</p>
                  <Divider line/>
                  <h2>风险作业平台</h2>
                  <p>基于东方国信多年来在云计算及大数据平台方面的技术积累，结合海关现有复杂的业务场景，深度定制研发出的风控规则引擎，具有支持上线规则多、计算速度快、支撑海量数据并发等特点。
                    <br />
                    风控规则引擎建设内容主要包括规则生命周期管理、规则命中分析、提供对外服务能力、规则计算上云及集成大数据平台等内容，同时在今年9月30日已经完成第一阶段工作内容建设的上线工作，得到了客户的认可。
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

export default Engine;
