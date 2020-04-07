import React, { Component } from 'react';
import {
  Carousel,
  Tag,
  Card,
  Container,
  Row,
  Divider,
  Button,
  Pagination,
  Dropdown,
  fetch
} from 'epm-ui-react';
import page from 'epm-ui-boot/page';
import Layout from '../layouts/default';
import '../../styles/index.css';
import '../../styles/platform.css';
import '../../styles/download.css';

// Import logos
import alipayLogo from '../../images/logos/alipay.png';
import amapLogo from '../../images/logos/amap.png';
import bmapLogo from '../../images/logos/bmap.png';
import cloudiipLogo from '../../images/logos/cloudiip.png';
import CSharpLogo from '../../images/logos/c-sharp.png';
import dojoLogo from '../../images/logos/dojo.png';
import echartsLogo from '../../images/logos/echarts.png';
import eclipseLogo from '../../images/logos/eclipse.png';
import ffmpegLogo from '../../images/logos/ffmpeg.png';
import golangLogo from '../../images/logos/golang.png';
import javaLogo from '../../images/logos/java.png';
import mobileLogo from '../../images/logos/mobile.png';
import mqttLogo from '../../images/logos/mqtt.png';
import nodejsLogo from '../../images/logos/nodejs.png';
import phpLogo from '../../images/logos/php.png';
import pythonLogo from '../../images/logos/python.png';
import RLanguageLogo from '../../images/logos/r.png';
import rubyLogo from '../../images/logos/ruby.png';
import wechatMiniProgramLogo from '../../images/logos/wechat-mini-program.png';
import wechatPayLogo from '../../images/logos/wechat-pay.png';
import htJumpLogo from '../../images/logos/ht-jump.png';

class Download extends Component {
  constructor ( props ) {
    super( props );

    const packagesJson = [
      {
        type: 'Cloudiip 开发工具包',
        packages: [
          {
            name: 'Cloudiip-安全＆门户 SDK',
            description: '安全＆门户产品负责实现统一的身份认证，统一授权与鉴权管理以及菜单导航功能和页面聚合功能，同时并支持多租户云化部署和运行，整体界面可以实现个性化定制与二次开发，并支持不同终端的展示。',
            documents: [
              {
                name: '环境:liunx/windows;文件大小:325M;',
                version: 'sso-client:2.2.0 secutiry-base:1.1.4'
              }
            ],
            link: '安全门户.zip',
            logo: cloudiipLogo
          },
          {
            name: 'Cloudiip-微服务 SDK',
            description: '微服务开发框架是面向企业级的开发平台，具有配置简单、页面风格统一、代码结构清晰、可独立运行等特性。同时产品提供 SDK 服务包，使客户开发更简单、便捷。',
            documents: [
              {
                name: '环境:liunx/windows;文件大小:20k;',
                version: '0.1.0'
              }
            ],
            link: 'microservice-0.1.0-20180115.024328-1.zip',
            logo: cloudiipLogo
          },
          {
            name: 'Cloudiip-EPM-UI SDK',
            description: '实现一套相对完善统一的组件化前端元素，具有较好的前后端分离结构，适应微服务需要，组件高度内聚，业务逻辑与样式及结构松耦合，使用上以数据绑定为主。',
            documents: [
              {
                name: '环境:liunx/windows/macOS;文件大小:325M',
                version: '0.6.3'
              }
            ],
            link: 'epm-ui-0.5.0-alpha.1.tgz',
            logo: cloudiipLogo
          },
          {
            name: 'Cloudiip-Hippo SDK',
            description: 'Hippo CMS 是一个以信息为中心的开源内容管理系统。Hippo CMS 目标是供中、大型企业来管理其发布在互连网，企业内部网，PDAs 和 print（又叫企业内容管理）等渠道上发 布的内容。',
            documents: [
              {
                name: '环境:liunx/windows;文件大小:27k;',
                version: '12.2.0'
              }
            ],
            link: 'hippo-project-archetype-12.2.0.tar.gz',
            logo: cloudiipLogo
          },
          {
            name: 'Cloudiip-自然语言处理 SDK',
            description: '对大规模互联网文章或用户文本进行分析，提取出文本特征，然后采用各种文本挖掘方法对特征进行分析挖掘，以结构化和用户易于理解形式输出，指导用户更快、更好的利用数据。',
            documents: [
              {
                name: '环境:liunx/windows;文件大小:610K;',
                version: '1.0'
              }
            ],
            link: '自然语言处理.jar',
            logo: cloudiipLogo
          }
        ]
      },
      {
        type: 'SDK 语言包',
        packages: [
          {
            name: 'HT 编辑器及许可证',
            notADownload: true,
            description: 'HT 是基于 HTML5 标准的企业应用图形界面一站式解决方案，其包含通用组件、拓扑组件和 3D 渲染引擎等丰富的图形界面开发类库，提供了完全基于 HTML5 的矢量编辑器、拓扑编辑器及 3D 场景编辑器等多套可视化设计工具，和完善的类库开发手册、工具使用手册、及针对 HTML5 技术如何进行大规模团队开发的客户深度培训手册。',
            documents: [
              {
                name: '下载及申请',
                link: 'application/f8eb3960-0153-11ea-b911-7f4401819eb9'
              }
            ],
            logo: htJumpLogo
          },
          {
            name: 'Java 语言开发环境',
            description: '满足微服务框架的 JAVA 平台开发，集成 JAVA 的 SDK 开发环境。',
            documents: [
              {
                name: 'JDK-8u211',
                children: [
                  {
                    title: 'Windows x64',
                    link: 'jdk-8u211-windows-x64.exe'
                  },
                  {
                    title: 'Windows x86',
                    link: 'jdk-8u211-windows-i586.exe'
                  },
                  {
                    title: 'Mac OS X x64',
                    link: 'jdk-8u211-macosx-x64.dmg'
                  },
                  {
                    title: 'Linux x64',
                    link: 'jdk-8u211-linux-x64.tar.gz'
                  },
                  {
                    title: 'Linux x86',
                    link: 'jdk-8u211-linux-i586.tar.gz'
                  }
                ]
              },
              {
                name: 'MAVEN',
                version: '3.5.0',
                link: 'maven.zip'
              },
              {
                name: 'GIT',
                version: '2.14.2',
                link: 'Git.zip'
              },
              {
                name: '环境配置说明',
                link: 'java开发环境集成指南.docx'
              }
            ],
            logo: javaLogo
          },
          {
            name: 'Go 语言开发环境',
            description: '满足微服务框架的 Go 平台开发，集成 Go 的 SDK 开发环境。',
            documents: [
              {
                name: 'Go 环境',
                version: '1.1',
                link: 'Go.zip'
              },
              {
                name: '环境配置说明',
                link: 'go开发环境集成指南.docx'
              }
            ],
            logo: golangLogo
          },
          {
            name: 'Python 语言开发环境',
            description: '满足微服务框架的 Python 平台开发，集成 Python 的 SDK 开发环境。',
            documents: [
              {
                name: 'Python 环境',
                version: '3.6.4',
                link: 'Python.zip'
              },
              {
                name: '环境配置说明',
                link: 'python开发环境集成指南.docx'
              }
            ],
            logo: pythonLogo
          },
          {
            name: 'Node.js 平台开发',
            description: '满足微服务框架的 Node.js 平台开发，集成 Node.js 的 SDK 开发环境。',
            documents: [
              {
                name: 'Node.js 环境',
                version: '6.11.4',
                link: 'nodejs.zip'
              },
              {
                name: '环境配置说明',
                link: 'node开发集成环境指南.docx'
              }
            ],
            logo: nodejsLogo
          },
          {
            name: 'C# 语言开发环境',
            description: '满足微服务框架的 C# 平台开发，集成 C# 的 SDK 开发环境。',
            documents: [
              {
                name: 'C# 环境',
                version: '2.1.4',
                link: 'CShap.zip'
              },
              {
                name: '环境配置说明',
                link: 'CShap开发环境集成指南.docx'
              }
            ],
            logo: CSharpLogo
          },
          {
            name: 'PHP 语言开发环境',
            description: '满足微服务框架的 PHP 平台开发，集成 PHP 的 SDK 开发环境。',
            documents: [
              {
                name: 'PHP 环境',
                version: '7.2.2',
                link: ''
              },
              {
                name: '环境配置说明',
                link: 'php开发环境集成指南.docx'
              }
            ],
            logo: phpLogo
          },
          {
            name: 'Ruby 语言开发环境',
            description: '满足微服务框架的 Ruby 平台开发，集成 Ruby 的 SDK 开发环境。',
            documents: [
              {
                name: 'Ruby 环境',
                link: 'ruby.zip'
              },
              {
                name: '环境配置说明',
                link: 'ruby开发集成环境指南.docx'
              }
            ],
            logo: rubyLogo
          },
          {
            name: '移动端开发环境',
            description: '满足微服务框架的移动端开发，移动端的 SDK 开发环境。',
            documents: [
              {
                name: 'Mobile 环境',
                version: '1.0',
                link: 'mobile.zip'
              },
              {
                name: '环境配置说明',
                link: ''
              }
            ],
            logo: mobileLogo
          }
        ]
      },
      {
        type: '移动端开发工具包',
        packages: [
          {
            name: '高德地图 SDK',
            description: '高德地图 SDK 是一套简单的地图应用开发调用接口，可支持地图显示与操作，兴趣点搜索，地理编码、离线地图等功能。',
            documents: [
              {
                name: '环境：IOS/Android;文件大小:270M;',
                version: '2.3.0'
              }
            ],
            link: '高德地图.zip',
            logo: amapLogo
          },
          {
            name: '百度地图-基础定位 SDK',
            description: '基础定位：开发包体积最小，但只包含基础定位能力（ GPS / WiFi / 基站 ）、基础位置描述能力。',
            documents: [
              {
                name: '环境:Android;文件大小:273k;',
                version: '7.5'
              }
            ],
            link: '百度地图-基础定位.zip',
            logo: bmapLogo
          },
          {
            name: '支付宝 APP 支付 SDK',
            description: 'IOS、Android 应用嵌入 APP 支付 SDK，用户支付时唤起支付宝完成支付。',
            documents: [
              {
                name: '环境:IOS/Android;文件大小:3.37M'
              }
            ],
            link: '支付宝-App支付客户端SDK.zip',
            logo: alipayLogo
          },
          {
            name: '微信支付 SDK',
            description: '由腾讯公司知名移动社交通讯软件微信及第三方支付平台财付通联合推出的移动支付创新产品，旨在为广大微信用户及商户提供更优质的支付服务。',
            documents: [
              {
                name: '环境:IOS/Android;文件大小:8.65M;',
                version: '0.9.7'
              }
            ],
            link: '微信支付SDK.zip',
            logo: wechatPayLogo
          },
          {
            name: '微信小程序 SDK',
            description: '微信小程序 SDK，使开发者可以完成小程序的 API 和页面的开发 调试、代码查看和编辑、小程序预览和发布等功能。',
            documents: [
              {
                name: '环境:windows/macOS;文件大小:209M;',
                version: '1.02.1804120'
              }
            ],
            link: '微信小程序SDK.zip',
            logo: wechatMiniProgramLogo
          }
        ]
      },
      {
        type: '可视化开发工具包',
        packages: [
          {
            name: 'echarts SDK',
            description: '一个使用 JavaScript 实现的开源可视化库，提供直观，交互丰富，可高度个性化定制的数据可视化图表。',
            documents: [
              {
                name: '环境：liunx/windows;文件大小:2.29M;',
                version: '2.3.0'
              }
            ],
            link: 'echarts.js',
            logo: echartsLogo
          },
          {
            name: 'Dojo SDK',
            description: '一个 JavaScript 工具包，可以节省您的开发时间和规模。提供构建 Web 应用程序所需的一切。语言实用程序，用户界面组件等等都集中在一个地方，旨在完美地协同工作。',
            documents: [
              {
                name: '环境：liunx/windows;文件大小:50.7M',
                version: '1.13'
              }
            ],
            link: 'dojo.zip',
            logo: dojoLogo
          }
        ]
      },
      {
        type: '视频流开发工具包',
        packages: [
          {
            name: 'ffmepg SDK',
            description: '一套可以用来记录、转换数字音频、视频，并能将其转化为流的开源计算机程序。',
            documents: [
              {
                name: '环境：liunx/windows;文件大小:62.73M;',
                version: '3.4.2'
              }
            ],
            link: 'ffmepg.zip',
            logo: ffmpegLogo
          }
        ]
      },
      {
        type: '建模开发工具包',
        packages: [
          {
            name: 'R 语言建模开发工具 SDK',
            description: '建模包提供了用于构建基于模型的应用程序的工具和运行时。您可以使用它来以图形方式设计域模型，在设计时通过创建和编辑动态实例来利用这些模型。',
            documents: [
              {
                name: '环境：windows;文件大小:534M;',
                version: 'eclipse 4.7.3'
              }
            ],
            link: 'eclipse建模.rar',
            logo: RLanguageLogo
          }
        ]
      },
      {
        type: '设备接入工具包',
        packages: [
          {
            name: 'MQTT SDK',
            description: 'MQTT 是机器对机器（ M2M ）/“物联网”连接协议。它被设计成一个非常轻量级的发布/订阅消息传输。对于需要小代码占用空间和/或网络带宽非常重要的远程位置连接非常有用。',
            documents: [
              {
                name: '环境：Linux/window;文件大小:373 KB;',
                version: '1.0'
              }
            ],
            link: 'bonc-mqtt-sdk.zip',
            logo: mqttLogo
          }
        ]
      },
      {
        type: 'Eclipse 工具包',
        packages: [
          {
            name: 'Ares Eclipse IDE',
            description: '适用于 Java EE、微服务应用开发人员的 Ares Eclipse IDE，如果您已经有了 Eclipse 开发环境，可以更新软件包获取 Ares 开发插件。',
            documents: [
              {
                name: 'ARES-IDE 开发环境集成指南',
                link: 'ARES-IDE开发环境集成指南.docx'
              },
              {
                name: 'Eclipse 开发环境',
                link: 'eclipse.zip'
              }
            ],
            logo: eclipseLogo
          }
        ]
      }
    ];

    let newPackagesJson = [];

    packagesJson.forEach( ( json ) => {
      let type = json.type;

      json.packages.forEach( ( pJson ) => {
        pJson.type = type;
        newPackagesJson.push( pJson );
      } );
    } );

    const showPackagesJson = this.getShowPackagesJson( newPackagesJson, 1, 9 );

    this.state = {
      packagesJson: newPackagesJson,
      index: 1,
      size: 9,
      showPackagesJson
    };

    this.getShowPackagesJson = this.getShowPackagesJson.bind( this );
    this.handleChange = this.handleChange.bind( this );
  }

  getShowPackagesJson ( packagesJson, index, size ) {
    let showPackagesJson = [];

    packagesJson.map( ( json, i ) => {
      if ( i < index * size && i >= ( index - 1 ) * size ) {
        showPackagesJson.push( json );
      }

    } );

    return showPackagesJson;
  }

  handleChange ( index, size ) {
    const showPackagesJson = this.getShowPackagesJson( this.state.packagesJson,
      index, size );

    this.setState( {
      index,
      size,
      showPackagesJson
    } );
  }

  componentDidMount () {
    document.title = '资源下载';
  }

  render () {
    const itemStyle = {
      height: '550px',
      backgroundSize: 'cover'
    };

    let cards = [];

    if ( this.state.showPackagesJson.length > 0 ) {
      this.state.showPackagesJson.forEach( ( json, index ) => {
        let links = [];

        if ( json.link ) {
          links.push( <a href={ `${ page.basename }/devopsdk/${ json.link }` }
                         download="" style={ { textDecoration: 'none' } }
                         key={ `a-${ index }` }>立即下载</a> );
        } else if ( json.notADownload ) {
          json.documents.forEach( ( singleDocument, i ) => {
            if ( singleDocument.link ) {
              if ( json.documents.length > 1 ) {
                links.push( <a
                  href={ `${ page.basename }/${ singleDocument.link }` }
                  target="_self" style={ { textDecoration: 'none' } }
                  key={ `a-${ index }-${ i }` }>{ singleDocument.name }&nbsp;&nbsp;&nbsp;</a> );
              } else {
                links.push( <a
                  href={ `${ page.basename }/${ singleDocument.link }` }
                  target="_self" style={ { textDecoration: 'none' } }
                  key={ `a-${ index }-${ i }` }>{ singleDocument.name }</a> );
              }
            } else if ( !json.notADownload && singleDocument.children && Array.isArray( singleDocument.children ) ) {

              links.push(
                <Dropdown key={ `dropdown-${ index }-${ i }` }>
                  <Dropdown.Trigger>
                    <a style={ { marginRight: '12px' } }
                       href="javascript:void(0)">{ singleDocument.name }</a>
                  </Dropdown.Trigger>
                  <Dropdown.Content>
                    {
                      singleDocument.children.map( ( item, linkIndex ) => {
                        return <a
                          key={ `a-${ linkIndex }-${ item.link }` }
                          className="dropdownDownload"
                          href={ `${ page.basename }/devopsdk/${ item.link }` }
                          download="" style={ {
                          display: 'block',
                          height: '35px',
                          lineHeight: '35px',
                          padding: '0 5px',
                          textDecoration: 'none'
                        } }
                        >
                          { item.title }
                        </a>;
                      } )
                    }
                  </Dropdown.Content>
                </Dropdown>
              );
            }
          } );
        }else if ( json.documents && json.documents.length > 0 ) {
          json.documents.forEach( ( singleDocument, i ) => {
            if ( singleDocument.link ) {
              if ( json.documents.length > 1 ) {
                links.push( <a
                  href={ `${ page.basename }/devopsdk/${ singleDocument.link }` }
                  download="" style={ { textDecoration: 'none' } }
                  key={ `a-${ index }-${ i }` }>{ singleDocument.name }&nbsp;&nbsp;&nbsp;</a> );
              } else {
                links.push( <a
                  href={ `${ page.basename }/devopsdk/${ singleDocument.link }` }
                  download="" style={ { textDecoration: 'none' } }
                  key={ `a-${ index }-${ i }` }>{ singleDocument.name }</a> );
              }
            } else if ( singleDocument.children && Array.isArray( singleDocument.children ) ) {

              links.push(
                <Dropdown key={ `dropdown-${ index }-${ i }` }>
                  <Dropdown.Trigger>
                    <a style={ { marginRight: '12px' } }
                       href="javascript:void(0)">{ singleDocument.name }</a>
                  </Dropdown.Trigger>
                  <Dropdown.Content>
                    {
                      singleDocument.children.map( ( item, linkIndex ) => {
                        return <a
                          key={ `a-${ linkIndex }-${ item.link }` }
                          className="dropdownDownload"
                          href={ `${ page.basename }/devopsdk/${ item.link }` }
                          download="" style={ {
                          display: 'block',
                          height: '35px',
                          lineHeight: '35px',
                          padding: '0 5px',
                          textDecoration: 'none'
                        } }
                        >
                          { item.title }
                        </a>;
                      } )
                    }
                  </Dropdown.Content>
                </Dropdown>
              );
            }
          } );
        }

        cards.push(
          <Card key={ index } className="docsCard">
            <Card.Header style={ { flexGrow: 1 } }>
              <div className="resourceLogoWrapper">
                <img src={ `${ page.basename }${ json.logo }` }
                     className="resourceLogo"/>
              </div>
              <p>{ json.name }</p>
              <p>{ json.description }</p>
            </Card.Header>
            <Card.Body style={ { flexGrow: 0, textAlign: 'center' } }>
              { links }
            </Card.Body>
          </Card>
        );
      } );
    }

    return (
      <Layout currentIndex={ 4 }>
        <div>
          <div className="intro"
               style={ { background: `url(${ page.basename }/images/banner5.png) no-repeat center`, ...itemStyle } }>
            <Container type="fluid" className="pinfluid"
                       style={ { marginLeft: '5%' } }>
              <div style={ { paddingTop: '80px', textAlign: 'left' } }><span
                className="ptitle2">资源下载</span></div>
              <p className="subtitle2">提供丰富的开发工具，本地下载使用。</p>
            </Container>
          </div>

          <div className="intro" style={ { background: '#fff' } }>
            <div style={ { display: 'flex', flexWrap: 'wrap' } }>
              { cards }
            </div>
            <Pagination
              index={ this.state.index }
              total={ this.state.packagesJson.length }
              size={ this.state.size }
              onChange={ this.handleChange }
              align='center'
              style={ { marginTop: '16px' } }
            />
          </div>

        </div>
      </Layout>
    );
  }
}

export default Download;
