import React, { Component } from 'react';
import { Container, Button } from 'epm-ui-react';
import page from 'epm-ui-boot/page';
import Layout from '../../layouts/default';
import '../../../styles/index.css';
import '../../../styles/docs.css';
let windowsOpen = {};
let loop;

class Docs extends Component {
  
  constructor( props ) {
    super( props );
    this.state = {
      currentIndex: 2,
    };
  }

  showDialog(){
    windowsOpen = window.open( `${page.context.codeSecretHost}/oauth/authorize?client_id=${page.context.clientId}&response_type=code&redirect_uri=${ window.location.origin }${page.basename}/inner-source/authorizesec`, "", " height:300, width:500, left:300, showModalDialog " );
    loop = setInterval( function() {
      if( windowsOpen.closed ){
        clearInterval( loop );
        window.open( `${ window.location.origin }${ page.basename }/inner-source/inner-project`, "_self" );
      }
    } );
  }

  getCardList() {
      return (
        <Container
          type="fluid">
          <div style={{ minHeight: '15vh' }}>
          <div style={{ minHeight: '5vh' }}>
          </div>
          <h1 center>授权认证 GitLab ( https://code.bonc.com.cn )</h1>
          <h4>授权介绍：通过此次授权，我们可以将应用 ( 开发者社区 ) 与您的 GitLab ( https://code.bonc.com.cn ) 关联，您可以在应用 ( 开发者社区 ) 中对您的项目进行操作，选择您的项目开源到我们的 InnerSource 开源组内，为大家提供优良的代码参考。</h4>
          <h4>有权限进行开源的项目介绍：您自己在 GitLab ( https://code.bonc.com.cn ) 中创建的项目或自己掌管的项目</h4>
          <div style={{ minHeight: '3vh' }}></div>
          <Button
            type="primary"
            onClick={ this.showDialog }>下一步</Button>
          </div>
          <div style={{ minHeight: '5vh' }}>
          </div>
        </Container>
      );
    }

  render() {
    const { currentIndex } = this.state;
    return (
      <Layout currentIndex={ currentIndex }>
        <div className="intro" style = { {
          background: `url(${ page.basename }/images/docsBanner.jpg) no-repeat center`,
          height : '550px',
          backgroundSize: 'cover'
         } }>
          <Container type="fluid" className="pinfluid" style={{ marginLeft: '5%' }}>
            <div style={{ paddingTop: '0px', textAlign: 'center' }}><span className="ptitle2">Inner Source</span></div>
            <div style={{ paddingTop: '20px', textAlign: 'center' }}><span className="ptitle2">实践中促进司内开源发展</span></div>
            <p className="subtitle2" style={{ textAlign: 'left' }}>通过 BONC 内部开源，我们可以通过复用降低开发成本，打通开发团队的沟通渠道，实现组织单位之间的成本和风险分担，还可以实现协作开发并促进高质量代码的创建。通过内部开源项目的实践开发，不断推动司内的开源文化发展，从而实现更高效，更有质量的软件产品输出。</p>
          </Container>
        </div>
        <div className='docsListWrapper'>
          { this.getCardList() }
        </div>
      </Layout>
    );
  }
}

export default Docs;
