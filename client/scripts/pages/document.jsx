import React, { Component } from 'react';
import { Carousel, Tag, Img, Card, Container, Row, List, Pagination, Divider, Skeleton } from 'epm-ui-react';
import page from 'epm-ui-boot/page';
import Layout from '../layouts/default';
import '../../styles/index.css';

import '../../styles/docs.css';
import { tdsServerUrl } from '../../configs/url';

export default class Docs extends Component {

  constructor ( props ) {
    super( props );
    this.state = {
      loading: true
    };
  }

  componentDidMount () {
    if ( typeof window !== 'undefined' ) window.document.title = '文档详情';
  }

  render () {
    const { currentIndex, docsList, pageIndex, pageTotal, pageSize, loading } = this.state;

    return (
      <Layout
        currentIndex={ currentIndex }
      >
        <div
          className="intro"
          style={ {
            background    : `url(${ page.basename }/images/docsBanner.jpg) no-repeat center`,
            height        : '550px',
            backgroundSize: 'cover'
          } }
        >
          <Container
            type="fluid"
            className="pinfluid"
            style={ { marginLeft: '5%' } }
          >
            <div
              style={ {
                paddingTop: '80px',
                textAlign : 'left'
              } }
            >
              <span
                className="ptitle2"
              >技术文档</span>
            </div>
            <p
              className="subtitle2"
            >详细规范的软件文档，助力开发工作</p>
          </Container>
        </div>
        <div
          className='docsListWrapper'
        >
          {
            loading ?
              <div>
                <Row>
                  <Row.Col
                    size={ 8 }
                  >
                    <Skeleton
                      active
                    >
                      <Skeleton.Image />
                      <Skeleton.Line
                        style={ { width: '50%' } }
                      />
                      <Skeleton.Line
                        style={ { width: '70%' } }
                      />
                      <Skeleton.Line />
                    </Skeleton>
                  </Row.Col>
                  <Row.Col
                    size={ 8 }
                  >
                    <Skeleton
                      active
                    >
                      <Skeleton.Image />
                      <Skeleton.Line
                        style={ { width: '50%' } }
                      />
                      <Skeleton.Line
                        style={ { width: '70%' } }
                      />
                      <Skeleton.Line />
                    </Skeleton>
                  </Row.Col>
                  <Row.Col
                    size={ 8 }
                  >
                    <Skeleton
                      active
                    >
                      <Skeleton.Image />
                      <Skeleton.Line
                        style={ { width: '50%' } }
                      />
                      <Skeleton.Line
                        style={ { width: '70%' } }
                      />
                      <Skeleton.Line />
                    </Skeleton>
                  </Row.Col>
                </Row>
                <br />
              </div> :
              this.getCardList( docsList )
          }
          <Pagination
            align='center'
            style={ { marginTop: '16px' } }
            index={ pageIndex }
            total={ pageTotal }
            size={ pageSize }
            onChange={ this.handleListChange }
            showDataSizePicker
            dataSizePickerList={ [ 6, 9, 18, 36 ] }
          />
        </div>
      </Layout>
    );
  }
}
