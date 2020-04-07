import React, { Component } from 'react';
import { Page, Dropdown, Form, Textarea, Select, Carousel, Tag, Img, Card, Container, Row, Divider,Button, Icon, fetch, Input, Dialog, popup } from 'epm-ui-react';
import page from 'epm-ui-boot/page';
import Layout from '../../layouts/default';
import '../../../styles/index.css';

import '../../../styles/docs.css';

export default class Docs extends Component {

  constructor( props ) {
    super( props );
    this.state = {
      currentIndex: 2,
      position: "top-left"
    };
    this.handlePosition = this.handlePosition.bind( this );
    this.handleApproveClick = this.handleApproveClick.bind( this );
  }

  handleApproveClick( after ) {
    after( true );

  }

  handlePosition( value ) {
    this.setState( { position: value } );
  }

  componentWillMount() {
    if( typeof window !== 'undefined' ) window.document.title = '开源广场';
  }

  getCardList() {
    return (
      <Container
        type="fluid">
        <div style={{ minHeight: '8vh',
         'display': 'flex',
          'flexWrap': 'wrap',
          'justifyContent': 'center',
        }} >
        </div>
        <h1>🎉项目成功开源到 Inner Source 组🎉</h1>
        <h3>您可以到开源广场中查看您的开源项目</h3>
        <div style={{ minHeight: '8vh' }}>
        </div>
        <div>
        <Button
          type="primary"
          onClick={ () => {
                    window.open( window.location.origin + page.basename + '/inner-source/inner-project', '_self' );
                  }}>继续开源项目</Button>
        <Button
          type="primary"
          onClick={ () => {
                    window.open( window.location.origin + page.basename + '/inner-source', '_self' );
                  }}>返回</Button>
                  </div>
        <div style={{ minHeight: '8vh' }}>
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
            <div style={{ paddingTop: '0px', textAlign: 'center' }}><span className="ptitle2">Inner source</span></div>
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
