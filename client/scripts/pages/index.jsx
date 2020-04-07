import React, { Component } from 'react';
import { Carousel, Tag, Card, Container, Row, Divider, Button } from 'epm-ui-react';
import page from 'epm-ui-boot/page';
import Layout from '../layouts/default';
import IndexTopicCard from '../components/comment/index-topic-card';

import ImageTextSection from '../components/image-text-section';
import usPic from '../../images/inner-source/bump-collaboration-colleagues-1068523.jpg';

import '../../styles/index.css';
import '../../styles/docs.css';

class Home extends Component {

  constructor( props ) {
    super( props );

    this.state = {
      tabs: [ "工业", "金融", "政府" ],
      currentIndex: 0,
      plaClass: ''
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

    const { plaClass } = this.state;

    return (
      <Layout>
        <div>
          <div className="cl_box">
            <Carousel
              interval = { 4000 }
              loop
              height={ 602 }
            >
              <Carousel.Panel>
                <div style = { { background: `url(${ page.basename }/images/banner6.jpg) no-repeat center`, ...itemStyle } } >
                  <div style={{paddingLeft: '20%', paddingTop: '219.4px'}}>
                    <div style={{ textAlign: 'left', cursor: 'pointer' }} onClick={() => {window.open('http://tech.bonc.local/community/topic/24/%E4%BC%81%E4%B8%9A%E7%BA%A7%E5%BC%80%E5%8F%91%E5%B9%B3%E5%8F%B0-%E9%A1%B9%E7%9B%AE%E5%8F%8A%E8%B4%9F%E8%B4%A3%E4%BA%BA%E8%81%94%E7%B3%BB%E6%96%B9%E5%BC%8F', '_blank')}}><p className="ptitle">企业级开发平台 — 项目及负责人<span style={{ cursor: 'pointer', color: 'rgb(255, 183, 93)' }} >联系方式</span></p></div>
                    <ul>
                      <li>
                        <p className="subtitle">让距离，阻隔的只是疫情</p>
                      </li>
                    </ul>
                  </div>
                </div>
              </Carousel.Panel>
              <Carousel.Panel>
                <div style = { { background: `url(${ page.basename }/images/banner5.png) no-repeat center`, ...itemStyle } } >
                  <div style={{paddingLeft: '20%', paddingTop: '219.4px'}}>
                    <div style={{textAlign: 'left' }}><span className="ptitle">Ares 移动端打包平台</span></div>
                    <ul>
                      <li>
                        <p className="subtitle">基于 H5 的在线自动打包服务，致力于为 web 前端人员提供打包 iOS 与 Android 应用的能力</p>
                      </li>
                      <li>
                        <p className="subtitle">无需等待，<a style={ { color: '#ffb75d' } } target="_blank" href="http://172.16.11.17:6082/portal/pageView?pageId=index">即刻试用</a>！</p>
                      </li>
                    </ul>
                  </div>
                </div>
              </Carousel.Panel>
              <Carousel.Panel>
                <div style = { { background: `url(${ page.basename }/images/banner6.jpg) no-repeat center`, ...itemStyle } } >
                  <div style={{paddingLeft: '20%', paddingTop: '219.4px'}}>
                    <div style={{textAlign: 'left' }}><span className="ptitle">东方国信开发者社区 — 正在试运行</span></div>
                    <ul>
                      <li>
                        <p className="subtitle">技术资源共享，健全技术文档，扩充沟通渠道</p>
                      </li>
                      <li>
                        <p className="subtitle">降低开发成本，推动技术水平和软件质量的双项提升</p>
                      </li>
                    </ul>
                  </div>
                </div>
              </Carousel.Panel>
              <Carousel.Panel>
                <div style = { { background: `url(${ page.basename }/images/banner7.jpg) no-repeat center`, ...itemStyle } } >
                  <div style={{paddingLeft: '20%', paddingTop: '219.4px'}}>
                    <div style={{textAlign: 'left' }}><span className="ptitle">欢迎加入 —— 基础软件技术支持群</span></div>
                    <ul>
                      <li>
                        <p className="subtitle">整合 安全门户、建模工具、规则引擎、流程引擎、api 管理 五大工具的技术支持</p>
                      </li>
                      <li>
                        <p className="subtitle">直接搜索 <a style={{ textDecoration: 'none', color: '#0494f8' }} href="https://jq.qq.com/?_wv=1027&k=5dmxCDa" target="_blank">610402041</a> 加入我们</p>
                      </li>
                    </ul>
                  </div>
                </div>
              </Carousel.Panel>
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
                    <div style={{textAlign: 'left' }}><span className="ptitle">iOS 应用企业版发布证书及签名文件申请上线</span></div>
                    <ul>
                      <li>
                        <p className="subtitle">申请流程上线，清晰简明</p>
                      </li>
                      <li>
                        <p className="subtitle">可快速获得相关人员的帮助与支持</p>
                      </li>
                    </ul>
                  </div>
                </div>
              </Carousel.Panel>
              <Carousel.Panel>
                <div style = { { background: `url(${ page.basename }/images/banner5.png) no-repeat center`, ...itemStyle } } >
                  <div style={{paddingLeft: '20%', paddingTop: '219.4px'}}>
                    <div style={{textAlign: 'left' }}><span className="ptitle">HT 许可证在线申请流程上线</span></div>
                    <ul>
                      <li>
                        <p className="subtitle">基于 HTML5 标准技术的 Web 前端 2D 和 3D 图形界面的一站式式解决方案</p>
                      </li>
                      <li>
                        <p className="subtitle">现已支持在线申请许可证</p>
                      </li>
                    </ul>
                  </div>
                </div>
              </Carousel.Panel>
            </Carousel>
          </div>

          <div className="lightspot" id={ 'Features' }>
            <div className="intro_title">
              <span className="intro_title_t">开发者社区简介</span>
              <div className="pIntro_title_divider"></div>
              <p className="intro_title_p">五大功能 / 理念，推动司内技术水平和软件质量的双项提升</p>
            </div>

            <Container type="fluid" className="lsfluid">
              <Row gutter={ 60 }>
                <Row.Col size={ { sm: 24, md: 8, lg: 8 } }>
                  <Card className="intro_card ls_card">
                    <Card.Header>
                      <img src={ `${ page.basename }/images/icon1.png` } />
                    </Card.Header>
                    <Card.Body>
                      <p style={ { fontSize: '18px', fontWeight: 'bolder', textAlign: 'center', color: '#333', margin: "10px 0" } }>产品门户</p>
                      <p style={ { fontSize: '14px', textAlign: 'center', color: '#666' } }>提供公司技术类产品的信息、前沿技术、热门新闻等的资讯信息及推荐，为各项目间提供信息交流的平台。</p>
                    </Card.Body>
                  </Card>
                </Row.Col>

                <Row.Col size={ { sm: 24, md: 8, lg: 8 } }>
                  <Card className="intro_card ls_card">
                    <Card.Header>
                      <img src={ `${ page.basename }/images/icon2.png` } />
                    </Card.Header>
                    <Card.Body>
                      <p style={ { fontSize: '18px', fontWeight: 'bolder', textAlign: 'center', color: '#333', margin: "10px 0" } }>内部开源代码库</p>
                      <p style={ { fontSize: '14px', textAlign: 'center', color: '#666' } }>提供具有基础性、通用性特征的代码及框架统一且标准的实现，实现软件产品质量、功能性和适用性的提高。</p>
                    </Card.Body>
                  </Card>
                </Row.Col>

                <Row.Col size={ { sm: 24, md: 8, lg: 8 } }>
                  <Card className="intro_card ls_card">
                    <Card.Header>
                      <img src={ `${ page.basename }/images/icon1.png` } />
                    </Card.Header>
                    <Card.Body>
                      <p style={ { fontSize: '18px', fontWeight: 'bolder', textAlign: 'center', color: '#333', margin: "10px 0" } }>技术文档库</p>
                      <p style={ { fontSize: '14px', textAlign: 'center', color: '#666' } }>提供公司内技术产品生命周期内所需的一切文档资源，形成公司内部公共的、书面的、可持久化、存档的和完整的技术沉淀积累。</p>
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
                      <p style={ { fontSize: '18px', fontWeight: 'bolder', textAlign: 'center', color: '#333', margin: "10px 0" } }>建立标准和规范</p>
                      <p style={ { fontSize: '14px', textAlign: 'center', color: '#666' } }>提供最基本的、一致的代码和文档标准和模板，提高项目质量，降低移植、维护项目的复杂度。</p>
                    </Card.Body>
                  </Card>
                </Row.Col>

                <Row.Col size={ { sm: 24, md: 8, lg: 8 } }>
                  <Card className="intro_card ls_card">
                    <Card.Header>
                      <img src={ `${ page.basename }/images/icon1.png` } />
                    </Card.Header>
                    <Card.Body>
                      <p style={ { fontSize: '18px', fontWeight: 'bolder', textAlign: 'center', color: '#333', margin: "10px 0" } }>社区论坛</p>
                      <p style={ { fontSize: '14px', textAlign: 'center', color: '#666' } }>提供产品交流、技术知识分享、博客、问答、视频、活动等功能，能很好的作为技术产品服务的延伸和补充，为各项目间提供沟通交流的平台。</p>
                    </Card.Body>
                  </Card>
                </Row.Col>
              </Row>
            </Container>
          </div>

          <div className="platform" id={ 'Advantage' }>
            <div className="intro_title">
              <span className="intro_title_t" style={ { color: '#fff' } }>内部开源</span>
              <div className="pIntro_title_divider"></div>
            </div>

            <Container type="fluid" className="plafluid">
              <Row gutter={ 16 }>
                <Row.Col size={ { sm: 12, md: 12, lg: 6 } }>
                  <div style={ { position: 'relative' } } className="pla_card_box">
                    <div className="pla_card_bg"></div>
                    <Card className="pla_card">
                      <Card.Header className="pla_header">
                        <img className="pla_img" src={ `${ page.basename }/images/tigaoxiaolv.png` } />
                      </Card.Header>
                      <Card.Body>
                        <p style={ { fontSize: '24px', fontWeight: 'bolder', textAlign: 'center', color: '#fff' } }>内部开源代码库</p>
                        <p style={ { fontSize: '14px', textAlign: 'center', color: '#fff' } }>已收录门户、安全、流程引擎、前端开发框架通用组件库等产品的源码。</p>
                      </Card.Body>
                      <Card.Footer style={{ borderTop: 'none', textAlign: 'center' }}>
                        <Button type="primary" size="huge" onClick={ () => { window.location.href = page.basename + '/inner-source' } }>点击查看</Button>
                      </Card.Footer>
                    </Card>
                  </div>
                </Row.Col>
                <Row.Col size={ { sm: 12, md: 12, lg: 6 } }>
                  <div style={ { position: 'relative' } } className="pla_card_box">
                    <div className="pla_card_bg"></div>
                    <Card className="pla_card">
                      <Card.Header className="pla_header">
                        <img className="pla_img" src={ `${ page.basename }/images/moshikaifa.png` } />
                      </Card.Header>
                      <Card.Body>
                        <p style={ { fontSize: '24px', fontWeight: 'bolder', textAlign: 'center', color: '#fff' } }>技术文档库</p>
                        <p style={ { fontSize: '14px', textAlign: 'center', color: '#fff' } }>您可以在这里找到产品对应的使用文档和技术文档。</p>
                      </Card.Body>
                      <Card.Footer style={{ borderTop: 'none', textAlign: 'center' }}>
                        <Button type="primary" size="huge" onClick={ () => { window.location.href = page.basename + '/docs' } }>点击查看</Button>
                      </Card.Footer>
                    </Card>
                  </div>
                </Row.Col>
                <Row.Col size={ { sm: 12, md: 12, lg: 6 } }>
                  <div style={ { position: 'relative' } } className="pla_card_box">
                    <div className="pla_card_bg"></div>
                    <Card className={ `pla_card` }>
                      <Card.Header className="pla_header">
                        <img className="pla_img" src={ `${ page.basename }/images/hangyechendian.png` } />
                      </Card.Header>
                      <Card.Body style={{ borderBottom: 'none' }}>
                        <p style={ { fontSize: '24px', fontWeight: 'bolder', textAlign: 'center', color: '#fff' } }>标准和规范</p>
                        <p style={ { fontSize: '14px', textAlign: 'center', color: '#fff' } }>查看内部开源相关标准和规范，让统一的标准成为项目间的通用语言。</p>
                      </Card.Body>
                      <Card.Footer style={{ borderTop: 'none', textAlign: 'center' }}>
                        <Button type="primary" size="huge" onClick={ () => { window.location.href = page.basename + '/docs/inner-source-docs/角色定义.html' } }>点击查看</Button>
                      </Card.Footer>
                    </Card>
                  </div>
                </Row.Col>
                <Row.Col size={ { sm: 12, md: 12, lg: 6 } }>
                  <div style={ { position: 'relative' } } className="pla_card_box">
                    <div className="pla_card_bg"></div>
                    <Card className="pla_card">
                      <Card.Header className="pla_header">
                        <img className="pla_img" src={ `${ page.basename }/images/jujiaoyewu.png` } />
                      </Card.Header>
                      <Card.Body>
                        <p style={ { fontSize: '24px', fontWeight: 'bolder', textAlign: 'center', color: '#fff' } }>资源下载和申请</p>
                        <p style={ { fontSize: '14px', textAlign: 'center', color: '#fff' } }>提供公司专有和常用工具包在线下载，可查阅多种开发所需认证的申请流程。</p>
                      </Card.Body>
                      <Card.Footer style={{ borderTop: 'none', textAlign: 'center' }}>
                        <Button type="primary" size="huge" onClick={ () => { window.location.href = page.basename + '/download' } }>点击查看</Button>
                      </Card.Footer>
                    </Card>
                  </div>
                </Row.Col>
              </Row>
            </Container>
          </div>
          <div className="intro_title">
            <span className="intro_title_t">社区展望</span>
            <div className="pIntro_title_divider"></div>
            <p className="intro_title_p"></p>
          </div>
          <br />
          <div className="tdsContent">
            <ImageTextSection image={ usPic } reverse>
              <div className="tdsContentWrapper left">
                <h2>与 BONC 开发者协力共进</h2>
                <p>
                  未来，我们将会提供更多诸如博客、论坛等功能，随着开发者社区的为完善，将逐步成为公司内部的技术根据地，不断进行技术积累和沉淀，成为组织间信息沟通的枢纽和桥梁。
                </p>
                <p>
                  开发者社区将进一步扩充提供的素材、设计、图标等资源的共享，也欢迎大家加入到开发者社区中来，参与到信息共享、技术共享中来，实现更高效、更有质量的软件产品输出。
                </p>
              </div>
            </ImageTextSection>
          </div>
          <div className="intro_title">
            <span className="intro_title_t">社区热门话题</span>
            <div className="pIntro_title_divider"></div>
            <p className="intro_title_p"></p>
          </div>
          <div className='intro'>
            <Container type="fluid">
              <IndexTopicCard />
            </Container>
          </div>
        </div>
      </Layout>
    );
  }
}

export default Home;
