import React, { Component } from 'react';
import { Carousel, Tag, Img, Card, Container, Row, Divider } from 'epm-ui-react';
import page from 'epm-ui-boot/page';
import Layout from '../../layouts/default';
import '../../../styles/index.css';

import icon1 from '../../../images/logos/alipay.png';
import iOSPic from '../../../images/logos/ios.png';
import HTPic from '../../../images/logos/ht.png';

import '../../../styles/docs.css';
import Portal from './portal';

class DocumentList extends Component {

  constructor( props ) {
    super( props );
    this.state = {
      currentIndex: 1
    };
  }

  componentWillMount() {
    if( typeof window !== 'undefined' )
     window.document.title = '产品列表';
  }

  getCardList( docsList ) {
    if( typeof docsList !== 'undefined' && Array.isArray( docsList ) ){

      return (
        <div className="cardsWrapper">
          { docsList.map( ( item, index ) => {
            return (
              <Card className="docsCard" key={ `card-${ index }` }>
                <Card.Header>
                  <div className="pic" style={ { paddingTop: '80px', textAlign: 'left' } }>{ item.pic }</div>
                </Card.Header>
                <Card.Body style={{flexGrow: 1}}>
                  <div className="title">{ item.title }</div>
                  <div className="desc">{ item.desc }</div>
                </Card.Body>
                <Card.Footer style={{flexGrow: 0, textAlign: 'center'}}>
                  <a href={ item.link.indexOf( '/' ) ? item.link : `${ page.basename }${ item.link }` } className="link" style={{ textDecoration: 'none' }} target={ item.link.indexOf( '/' ) ? '_blank' : '_self' }>查看详细产品信息</a>
                </Card.Footer>
              </Card>
            );
          } ) }
        </div>
      );

    }else {
      return <div>暂无数据</div>;
    }
  }

  render() {
    const { currentIndex } = this.state;
    const docsList = [
      {
        // pic: EDPDoc,
        pic: '东方国信企业应用开发平台',
        title: '企业级开发平台',
        desc: '此文档为公司研发中心及各事业部申请 iOS 应用企业版发布证书的操作流程，有需要申请开发证书和发布 iOS 应用的项目组可根据本文档联系相关人员获得帮助与支持。',
        link: '/platform/enterprise-development-platform'
      }
    ];

    return (
      <Layout currentIndex={ currentIndex }>
        <div className="intro" style = { {
          background: `url(${ page.basename }/images/docsBanner.jpg) no-repeat center`,
          height : '550px',
          backgroundSize: 'cover'
        } }>
          <Container type="fluid" className="pinfluid" style={{ marginLeft: '5%' }}>
            <div style={{ paddingTop: '80px', textAlign: 'left' }}><span className="ptitle2">产品列表</span></div>
            <p className="subtitle2">关于公司各产品の概述信息</p>
          </Container>
        </div>
        <div className='docsListWrapper'>
          { this.getCardList( docsList ) }
        </div>
      </Layout>
    );
  }
}

export default DocumentList;
