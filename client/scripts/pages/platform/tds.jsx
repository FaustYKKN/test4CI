import React, { Component } from 'react';
import { Carousel, Tag, Card, Container, Row, Divider, Button, Icon } from 'epm-ui-react';
import page from 'epm-ui-boot/page';
import Layout from '../../layouts/default';
import '../../../styles/index.css';
import '../../../styles/platform.css';
import ImageTextSection from '../../components/image-text-section';
import defaultPic from '../../../images/tds/default.png';
import pagePic from '../../../images/tds/page.png';
import configPic from '../../../images/tds/config.png';
import '../../../styles/tds.css';

class TDS extends Component {

  constructor( props ) {
    super( props );

    let timeText = [
      {
        time:'v0.1.0',
        text:'第一次打版更新'
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
      timeText,
      ulWidth: ulWidth + 60
    };
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
    document.title = 'TDS 文档工具';
    this._timeBox.scrollLeft = this.state.ulWidth;
  }

  render() {
    const itemStyle = {
      height : '550px',
      backgroundSize: 'cover'
    };

    return (
      <Layout currentIndex={ 1 } aIndex={ 2 } >
        <div>
          <div className="intro" style = { { background: `url(${ page.basename }/images/ban_02.png) no-repeat center`, ...itemStyle } }>
            <Container type="fluid" className="pinfluid">
              <Row style={ { minHeight: '200px' } }>
                <Row.Col size={ { sm: 24, md: 24, lg: 16 } }>
                  <Row>
                    <Row.Col size={ { sm: 24, md: 24, lg: 18 } }>
                      <span style={ { fontSize: '28px', fontWeight: 700, color: '#fff' } }>Technical Documentation System 文档工具</span>
                    </Row.Col>
                  </Row>
                  <Row>
                    <Row.Col size={ 24 }>
                      <p style={ { color: '#fff' } }>Technical Documentation System 是一款文档生成工具。</p>
                      <p style={ { color: '#fff' } }>您只需要关注内容本身，TDS 将自动为您生成一个精美的文档网站。</p>
                    </Row.Col>
                  </Row>
                </Row.Col>
              </Row>
              <Divider />
              <Row gutter={ 12 }>
                <Row.Col size={ { sm: 6, md: 4, lg: 3 } }>
                  <Button
                    type="default"
                    block
                    size={ 'large' }
                    style={ { borderRadius: '27px' } }
                    onClick={ () => {
                      window.open( window.location.origin + page.basename + '/docs/tds-docs/', '_self' ) }
                    }>
                    上手文档
                  </Button>
                </Row.Col>
              </Row>
            </Container>
          </div>
          <div className="intro" style={ { paddingBottom: 0, backgroundColor: 'rgba(250, 250, 250, 1)' } }>
            <Container type="fluid" className="influid" style={ { position: 'relative' ,backgroundColor: '#fff', marginTop: '-185px',
              borderRadius: '32px', boxShadow: '5px 5px 5px rgba(0,0,0,0.349019)', padding: '40px', minHeight: '306px' } }>
              <div style={{position:'relative'}}>
                <div className="midYLine" />
                <div className="midXLine" />
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
                              <span style={ { fontSize: '18px', fontWeight: 700 } }>轻松生成文档网站</span>
                            </Row.Col>
                          </Row>
                          <Divider />
                          <Row>
                            <Row.Col size={ 24 }>
                              <span style={ { fontSize: '14px', fontWeight: 400 } }>还在辛苦的用 Word 写软件文档？还在悄悄羡慕别人的在线文档网站？TDS 可以使文档写作更简单，文档网站一秒生成！您只需准备好 Markdown 文档，其他的统统交给 TDS。</span>
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
                              <span style={ { fontSize: '18px', fontWeight: 700 } }>多种插件，提升阅读体验</span>
                            </Row.Col>
                          </Row>
                          <Divider />
                          <Row>
                            <Row.Col size={ 24 }>
                              <span style={ { fontSize: '14px', fontWeight: 400 } }>可配置菜单、页内目录、水印、回到顶部、主题切换和更多实用和炫酷的插件，TDS 应有尽有，为您的软件用户提供最好的在线文档阅读体验。</span>
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
                              <span style={ { fontSize: '18px', fontWeight: 700 } }>随心定制个性化页面</span>
                            </Row.Col>
                          </Row>
                          <Divider />
                          <Row>
                            <Row.Col size={ 24 }>
                              <span style={ { fontSize: '14px', fontWeight: 400 } }>担心 TDS 提供的样式配不上您的高质量的文档？或只是想拥有一个与众不同的文档网站？自由的 TDS 独特的架构设计、灵活的模块配置，可以满足您最苛刻的定制化需求。</span>
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
                              <span style={ { fontSize: '18px', fontWeight: 700 } }>运维友好，轻松部署</span>
                            </Row.Col>
                          </Row>
                          <Divider />
                          <Row>
                            <Row.Col size={ 24 }>
                              <span style={ { fontSize: '14px', fontWeight: 400 } }>TDS 可生成 HTML 页面，您可以让运维同学部署到 Tomcat / Nginx 上，也可以用 TDS 自带的指令开启网站服务，甚至可以直接本地双击看效果！</span>
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
              <span className="intro_title_t">工具展示</span>
              <div className="pIntro_title_divider"/>
            </div>
          </div>
          <div className="tdsContent" style={{ backgroundColor: 'rgb(250, 250, 250)' }}>
            <ImageTextSection image={ defaultPic }>
              <div className="tdsContentWrapper">
                <h2>为您快速搭建文档网站</h2>
                <p>作为软件行业工作者，不管是我们用传统的 Word 书写文档交付给用户，或是独自搭建一个文档网站，总是会有这样那样的难题。</p>
                <p>使用 TDS, 您将只需要提供 Markdown 格式的文档，敲一下指令，我们将根据默认配置，为您自动生成一个简洁大方的文档网站。</p>
              </div>
            </ImageTextSection>
            <ImageTextSection image={ pagePic } reverse>
              <div className="tdsContentWrapper left">
                <h2>丰富的插件支持</h2>
                <p>TDS 内置可配置菜单、页面目录、主题切换等多种页面插件模块，优化文档阅读体验。</p>
                <p>简洁的页面风格不等于功能上的简陋，强大丰富的插件，是 TDS 为文档网站提供的强大装备库。可配置菜单令文档结构更加清晰，锚点 + 页面目录可让读者更快定位到目标信息，水印确保着文档内容的安全。</p>
              </div>
            </ImageTextSection>
            <ImageTextSection image={ configPic }>
              <div className="tdsContentWrapper">
                <h2>随心配置，定制专属的软件文档</h2>
                <p>TDS 的默认配置使上手变得更加轻松。同时多种插件 + 灵活配置的模式，可以满足您的各类定制化需求。</p>
                <p>若您是一位技术大牛，您甚至可以根据 TDS 详细的模块/插件接口文档，编写属于自己的专属插件。</p>
              </div>
            </ImageTextSection>
          </div>
          <div className="intro" style={ { backgroundColor: 'rgba(51, 51, 51, 1)' } }>
            <div className="intro_title">
              <span className="intro_title_t" style={ { color: '#fff' } }>更新日志</span>
              <div className="pIntro_title_divider"></div>
            </div>
            <Container type="fluid" className="lsfluid">
              <div className="time-line">
                <div className="left-btn"> <Button style={ { backgroundColor: 'rgba(102, 102, 102, 1)', color: 'rgba(204, 204, 204, 1)' } } onClick={ this.leftBtnClick }><Icon icon={ 'arrow-left' } /></Button></div>
                <div className="right-btn"> <Button style={ { backgroundColor: 'rgba(102, 102, 102, 1)', color: 'rgba(204, 204, 204, 1)' } } onClick={ this.rightBtnClick }><Icon icon={ 'arrow-right' } /></Button></div>
                <div className="time-box dark" ref={div => (this._timeBox = div)}>
                  <ul style={ { width: this.state.ulWidth, minWidth: '100%' } }>
                    {
                      this.state.timeText.map( ( json, index ) => {
                        return (
                          <li key={ index }>
                            <span className="timeText">{json.time}</span>
                            <pre>{json.text}</pre>
                          </li>
                        );
                      } )
                    }
                  </ul>
                </div>
              </div>
            </Container>
          </div>
        </div>
      </Layout>
    );
  }
}

export default TDS;
