import React, { Component } from 'react';
import { Carousel, Tag, Card, Container, Row, Divider, Button, Icon } from 'epm-ui-react';
import page from 'epm-ui-boot/page';
import Layout from '../../layouts/default';
import '../../../styles/index.css';
import '../../../styles/platform.css';

class Ares extends Component {

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
      tabs: [ "旅游指引", "智慧城市", "智慧餐饮" ],
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
    document.title = 'Ares 移动端打包平台';
    this._timeBox.scrollLeft = this.state.ulWidth;
  }

  render() {
    const itemStyle = {
      height : '550px',
      backgroundSize: 'cover'
    };

    return (
      <Layout currentIndex={ 1 } aIndex={ 4 } >
        <div>
          <div className="intro" style = { { background: `url(${ page.basename }/images/ban_02.png) no-repeat center`, ...itemStyle } }>
              <Container type="fluid" className="pinfluid">
                <Row style={ { minHeight: '200px' } }>
                  <Row.Col size={ { sm: 24, md: 24, lg: 16 } }>
                    <Row>
                      <Row.Col size={ { sm: 24, md: 24, lg: 18 } }>
                        <span style={ { fontSize: '28px', fontWeight: 700, color: '#fff' } }>Ares 移动端打包平台</span>
                      </Row.Col>
                    </Row>
                    <Row>
                      <Row.Col size={ 24 }>
                        <p style={ { color: '#fff' } }>本平台致力于为 web 前端人员提供打包 iOS 与 Android 应用的能力，打包出的应用可通过扫描二维码直接安装到 Android 和 iOS 手机。并提供可定制的移动端原生服务调用，例如图片上传、地理定位、扫描二维码等功能。本 APP 封装平台为本平台自主研发，发现 BUG 能及时修复，并将持续不断迭代开发更多新功能。</p>
                      </Row.Col>
                    </Row>
                  </Row.Col>
                </Row>
                <Divider />
                <Row gutter={ 12 }>
                  <Row.Col size={ { sm: 6, md: 4, lg: 3 } }>
                    <Button type="primary" block size={ 'large' } style={ { borderRadius: '27px' } }
                      onClick={ () => {
                        window.open( `https://autopack.bonc.com.cn/Ares/`, '_self' );
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
                      <Row.Col size={ 12 } style={ { paddingBottom: '20px'} }>
                        <Row.Col size={ { sm: 24, md: 6, lg: 6 } }>
                          <img src={ `${ page.basename }/images/1.png` } className="pImg"/>
                        </Row.Col>
                        <Row.Col size={ { sm: 24, md: 18, lg: 18 } }>
                          <Row>
                            <Row.Col size={ 24 }>
                              <span style={ { fontSize: '18px', fontWeight: 700 } }>无需编程，一键生成</span>
                            </Row.Col>
                          </Row>
                          <Divider />
                          <Row>
                            <Row.Col size={ 24 }>
                              <span style={ { fontSize: '14px', fontWeight: 400 } }>无需编程，操作简便，点击即可生成应用</span>
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
                              <span style={ { fontSize: '18px', fontWeight: 700 } }>完美适配 HTML5</span>
                            </Row.Col>
                          </Row>
                          <Divider />
                          <Row>
                            <Row.Col size={ 24 }>
                              <span style={ { fontSize: '14px', fontWeight: 400 } }>对 HTML5 进行深度适配，完美兼容</span>
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
                              <span style={ { fontSize: '18px', fontWeight: 700 } }>多种功能插件，随需配置</span>
                            </Row.Col>
                          </Row>
                          <Divider />
                          <Row>
                            <Row.Col size={ 24 }>
                              <span style={ { fontSize: '14px', fontWeight: 400 } }>多款功能插件，轻松配置</span>
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
                              <span style={ { fontSize: '18px', fontWeight: 700 } }>Android、iOS 双系统</span>
                            </Row.Col>
                          </Row>
                          <Divider />
                          <Row>
                            <Row.Col size={ 24 }>
                              <span style={ { fontSize: '14px', fontWeight: 400 } }>可同时生成两种应用，适配多系统</span>
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
              <p className="intro_title_p">本平台致力于为 web 前端人员提供打包 iOS 与 Android 应用的能力，打包出的应用可通过扫描二维码直接安装到 Android 和 iOS 手机</p>
            </div>

            <Container type="fluid" style={ { padding: '40px', border: '1px solid #000', backgroundColor: '#fff' } }>
              <Row style={ { borderBottom: '1px solid #000', minHeight: '105px', paddingBottom: '40px' } }>
                  <Row.Col size={ 3 }>
                    <img src={ `${ page.basename }/images/icon2.png` } />
                  </Row.Col>
                  <Row.Col size={ 21 }>
                    <Row>
                      <Row.Col size={ 24 }>
                        <span style={ { fontSize: '18px', fontWeight: 700 } }>自主打包</span>
                      </Row.Col>
                    </Row>
                    <Divider />
                    <Row>
                      <Row.Col size={ 24 }>
                        <span style={ { fontSize: '14px', fontWeight: 400 } }>创建、配置、打包一气呵成，花3分钟时间立马拥有自己的 APP</span>
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
                        <span style={ { fontSize: '18px', fontWeight: 700 } }>丰富的插件</span>
                      </Row.Col>
                    </Row>
                    <Divider />
                    <Row>
                      <Row.Col size={ 24 }>
                        <span style={ { fontSize: '14px', fontWeight: 400 } }>微信授权、微信分享、定位、本地推送、清除缓存、系统相机相册、数据存储、扫描二维码、录制音频视频、调用百度地图、调用高德地图、版本更新、获取应用信息</span>
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
              <p className="intro_title_p">基于 H5 的在线自动打包服务，服务于有移动端开发需求却没有移动端开发人员的项目组</p>
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
                  <p>本平台提供基于 H5 的在线自动打包服务，服务于有移动端开发需求却没有移动端开发人员的项目组。平台可将 H5 开发的页面或远程链接打包成 APK 和 ipa，打包出的应用可通过扫描二维码直接安装到 Android 和 iOS 手机。并提供可定制的移动端原生服务调用，例如图片上传、地理定位、扫描二维码等功能</p>
                  <Divider line/>
                  <h2>智慧天柱山</h2>
                  <p>智慧天柱山 App 为一个天柱山旅游指引 App，使用本平台打包，该应用使用了相机插件、相册插件、定位插件（ 定时定位并上传服务器 ）、清理缓存插件。</p>
                </div>
                <div style={ { display: `${ this.state.currentIndex === 1 ? 'block' : 'none' }` } }>
                  <h2>方案描述</h2>
                  <p>本平台提供基于 H5 的在线自动打包服务，服务于有移动端开发需求却没有移动端开发人员的项目组。平台可将 H5 开发的页面或远程链接打包成 APK 和 ipa，打包出的应用可通过扫描二维码直接安装到 Android 和 iOS 手机。并提供可定制的移动端原生服务调用，例如图片上传、地理定位、扫描二维码等功能</p>
                  <Divider line/>
                  <h2>城市照明</h2>
                  <p>城市智慧照明 App 使用本平台打包，该应用使用了相机插件、相册插件、定位插件、语音识别插件、本地通知插件、跳转百度地图和高德地图、扫描二维码插件。</p>
                </div>
                <div style={ { display: `${ this.state.currentIndex === 2 ? 'block' : 'none' }` } }> 
                  <h2>方案描述</h2>
                  <p>本平台提供基于 H5 的在线自动打包服务，服务于有移动端开发需求却没有移动端开发人员的项目组。平台可将 H5 开发的页面或远程链接打包成 APK 和 ipa，打包出的应用可通过扫描二维码直接安装到 Android 和 iOS 手机。并提供可定制的移动端原生服务调用，例如图片上传、地理定位、扫描二维码等功能</p>
                  <Divider line/>
                  <h2>湘九味</h2>
                  <p>湖南湘九味 App 使用本平台打包，并成功上架 App Store。该应用使用了相机插件、相册插件、本地通知插件、退出 App 插件（ 仅限 Android ）、调用微信授权登录、获取应用版本号插件、版本更新。</p>
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
                      this.state.timeText.map( ( json,index ) => {
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

export default Ares;
