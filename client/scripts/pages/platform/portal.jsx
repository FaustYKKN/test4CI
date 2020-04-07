import React, { Component } from 'react';
import { Carousel, Tag, Card, Container, Row, Divider, Button, Icon } from 'epm-ui-react';
import page from 'epm-ui-boot/page';
import Layout from '../../layouts/default';
import '../../../styles/index.css';
import '../../../styles/platform.css';

class Portal extends Component {

  constructor( props ) {
    super( props );

    let timeText = [
      {
        time:'2017-06',
        text:'账户安全性升级'
      },
      {
        time:'2017-07',
        text:'租户服务改造，新增租户传递'
      },
      {
        time:'2017-08',
        text:'组件功能'
      },
      {
        time:'2017-09',
        text:'菜单直接编辑功能'
      },
      {
        time:'2017-11',
        text:'增加在线文档编辑，租户注册功能'
      },
      {
        time:'2018-01',
        text:'个人密保问题校验功能'
      },
      {
        time:'2018-02',
        text:'支持 redis 多实例部署'
      },
      {
        time:'2018-05',
        text:'页内设计器功能'
      },
      {
        time:'2018-06',
        text:'增加门户安全策略'
      },
      {
        time:'2018-07',
        text:'增加租户切换功能'
      },
      {
        time:'2018-07',
        text:'支持国际化'
      },
      {
        time:'2018-09',
        text:'第三方系统账号同步功能'
      },
      {
        time:'2018-11',
        text:'AOP 操作日志功能'
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
    document.title = '安全门户';
    this._timeBox.scrollLeft = this.state.ulWidth;
  }

  render() {
    const itemStyle = {
      height : '550px',
      backgroundSize: 'cover'
    };

    return (
      <Layout currentIndex={ 1 } aIndex={ 9 } >
        <div>
          <div className="intro" style = { { background: `url(${ page.basename }/images/ban_02.png) no-repeat center`, ...itemStyle } }>
            <Container type="fluid" className="pinfluid">
              <Row style={ { minHeight: '200px' } }>
                <Row.Col size={ { sm: 24, md: 24, lg: 16 } }>
                  <Row>
                    <Row.Col size={ { sm: 24, md: 24, lg: 18 } }>
                      <span style={ { fontSize: '28px', fontWeight: 700, color: '#fff' } }>安全门户</span>
                    </Row.Col>
                  </Row>
                  <Row>
                    <Row.Col size={ 24 }>
                      <p style={ { color: '#fff' } }>安全与门户平台是面向企业的安全管理与应用集成软件平台．其中安全子系统它实现了统一用户认证，授权管理与鉴权服务;门户子系统实现了基于菜单导航的简单应用集成，基于页面组件聚合的高级的应用集成．整个系统实现了高度可配置，可扩展，支持个性化定制功能及样式．为企业快速整合现有应用系统提高了高效方便的工具．也为新项目研发提供了一个基础平台。</p>
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
                    onClick={ () => {window.open( `${ page.basename }/docs/security-portal-docs`, '_blank' ) }}
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
                              <span style={ { fontSize: '18px', fontWeight: 700 } }>多种认证方式</span>
                            </Row.Col>
                          </Row>
                          <Divider />
                          <Row>
                            <Row.Col size={ 24 }>
                              <span style={ { fontSize: '14px', fontWeight: 400 } }>支持 OAuth2／OpenID／x509 证书；短信验证码支持；</span>
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
                              <span style={ { fontSize: '18px', fontWeight: 700 } }>安全管理集中化</span>
                            </Row.Col>
                          </Row>
                          <Divider />
                          <Row>
                            <Row.Col size={ 24 }>
                              <span style={ { fontSize: '14px', fontWeight: 400 } }>集中的安全资源定义与注册；提供统一授权界面与统一鉴权接口；<br/>安全资源可扩展，支持树形分层；授权管理支持依赖资源的权限传递；</span>
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
                              <span style={ { fontSize: '18px', fontWeight: 700 } }>可扩展能力</span>
                            </Row.Col>
                          </Row>
                          <Divider />
                          <Row>
                            <Row.Col size={ 24 }>
                              <span style={ { fontSize: '14px', fontWeight: 400 } }>所有功能提供基于 RESTful 的接口；提供门户 UI 规范与组件开发规范；门户主题样式可自定义；支持集群化部署；</span>
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
                              <span style={ { fontSize: '18px', fontWeight: 700 } }>应用集成</span>
                            </Row.Col>
                          </Row>
                          <Divider />
                          <Row>
                            <Row.Col size={ 24 }>
                              <span style={ { fontSize: '14px', fontWeight: 400 } }>各应用在门户系统中，将访问的地址注册到门户的菜单；门户提供了一种可自由拼装，可编辑能力较强的页面创建；</span>
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
              <p className="intro_title_p">门户提供了一种可自由拼装，可编辑能力较强的页面创建</p>
            </div>

            <Container type="fluid" style={ { padding: '40px', border: '1px solid #000', backgroundColor: '#fff' } }>
              <Row style={ { borderBottom: '1px solid #000', minHeight: '105px', paddingBottom: '40px' } }>
                <Row.Col size={ 3 }>
                  <img src={ `${ page.basename }/images/icon2.png` } />
                </Row.Col>
                <Row.Col size={ 21 }>
                  <Row>
                    <Row.Col size={ 24 }>
                      <span style={ { fontSize: '18px', fontWeight: 700 } }>门户个性化</span>
                    </Row.Col>
                  </Row>
                  <Divider />
                  <Row>
                    <Row.Col size={ 24 }>
                      <span style={ { fontSize: '14px', fontWeight: 400 } }>门户前端由模板页面和功能组件拼凑而成。模板是作为门户框架页面，只包含框架空壳，和后面欲嵌入组件的位置标志，起到划分门户页面区域和定位组件位置的作用；组件是嵌入门户页面中的各部分功能模块，包括门户标题 LOGO、菜单、工作区，TOP 区各功能块等，即可以自由增删和更换组件，从而发布一个个性的门户系统。门户支持同一套门户系统下不同终端，不同用户的页面个性化。</span>
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
                      <span style={ { fontSize: '18px', fontWeight: 700 } }>快速修改门户界面</span>
                    </Row.Col>
                  </Row>
                  <Divider />
                  <Row>
                    <Row.Col size={ 24 }>
                      <span style={ { fontSize: '14px', fontWeight: 400 } }>编辑模式，是方便管理员设置门户功能的一种便捷模式。此模式下遵循所见即所得的原则，可在原界面上，直接点击，快捷编辑，有修改门户标题，修改门户 LOGO，菜单增删改，编辑页面增删改功能，基本涵盖了门户简单初始化的所有功能和其他便捷操作。</span>
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
                      <span style={ { fontSize: '18px', fontWeight: 700 } }>门户设计器设计聚合页面</span>
                    </Row.Col>
                  </Row>
                  <Divider />
                  <Row>
                    <Row.Col size={ 24 }>
                      <span style={ { fontSize: '14px', fontWeight: 400 } }>门户设计器是一个页面编辑器，以所见即所得的形式，可对布局器的布局区域和组件位置、大小进行实时调整。同时可以方便的选择页面主题，选择组件主题，对每个组件的属性进行设置，实现快速的页面聚合。</span>
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
                      <span style={ { fontSize: '18px', fontWeight: 700 } }>二次开发能力</span>
                    </Row.Col>
                  </Row>
                  <Divider />
                  <Row>
                    <Row.Col size={ 24 }>
                      <span style={ { fontSize: '14px', fontWeight: 400 } }>对于想在门户框架基础上，大幅度修改 UI 和功能，进行二次开发的项目组，门户框架本身由模板和多个组件拼装而成，所以只需在门户基础上，下载模板，对模板进行样式和 html 调整并上传，即可使用新模板。组件开发没有技术限制，将访问地址注册到组件中，即可完成组件创建；将组件的属性所需的参数，组件相互响应所需的事件方法，注册到门户属性和门户事件中。最后把组件、属性、事件之间的关系进行配置，便可按需求显示新的门户界面，并支持组件的对应功能。</span>
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
              <p className="intro_title_p">为企业快速整合现有应用系统提高了高效方便的工具．也为新项目研发提供了一个基础平台</p>
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
                  <p>安全门户解决了电信行业安全管理，租户管理两大问题。其中安全管理包括了认证，授权与鉴权（ 或访问控制 ），加密与脱敏; 租户管理包括了租户管理，租户认证，以及租户数据的隔离与共享机制。各微服务通过集成基础服务来达到或获得统一的认证，授权与鉴权（ 或访问控制 ），确定租户以及自动的数据隔离等能力。</p>
                  <Divider line/>
                  <h2>河南联通大数据精准营销平台</h2>
                  <p>通过用户管理、角色管理、组织机构管理等功能，为该平台提供门户的安全防护能力；提供自定义菜单，门户导航，支持个性化页面定制等能力；通过多租户手段形成数据隔离，单点登录验证安全信息等功能。</p>
                </div>
                <div style={ { display: `${ this.state.currentIndex === 1 ? 'block' : 'none' }` } }>
                  <h2>方案描述</h2>
                  <p>提供单点登录及租户的数据隔离；租户管理有效的将多平台，多产品，多用户角色集成进一整套大环境内，使得不同用户可以通过一个入口访问不同的项目，资源等内容；同时封锁用户权限，用户仅可在自己所有权限的位置进行浏览，更改，删除等操作。</p>
                  <Divider line/>
                  <h2>Clouddip 平台</h2>
                  <p>为该平台提供租户管理及数据隔离，添加该租户的一些用户。然后你可以给这些用户进行具体的功能与业务数据的授权。租户数据隔离是缺省实现的，不需要配置，登录后，系统就会根据你的租户 id，对所有的 sql 访问的表进行租户的过滤，这是默认的。</p>
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

export default Portal;
