import React from 'react';
import CardList from '../components/post/card-list';
import Layout from '../layouts/default';
import { Container, fetch  } from 'epm-ui-react';
import page from 'epm-ui-boot/page';
let apiHost;

export default class ProductionIndex extends React.Component {
  constructor( props ) {
    super(props);
    this.state = {
      data: []
    }
  }
  componentDidMount() {
    apiHost = `${page.basename}/api`;
      this.findCate( 'production', ( res ) => {
        this.setState( {
          data: res.data
        } )
      } );
  }
  findCate ( cate, callback ) {
    let url = apiHost + `/post/getAll?postCategory=${cate}` ;
    fetch( url, {
      method: 'GET',
    } )
    .then( function( res ) {
      return res.json();
    } )
    .then( function( res ) {
      callback( res )
    } );
  }
  render() {
    const { data } = this.state;
    return (
      <Layout currentIndex={1}>
        <div className="intro" style = { {
          background: `url(${ page.basename }/images/docsBanner.jpg) no-repeat center`,
          height : '550px',
          backgroundSize: 'cover'
        } }>
          <Container type="fluid" className="pinfluid" style={{ marginLeft: '5%' }}>
            <div style={{ paddingTop: '80px', textAlign: 'left' }}><span className="ptitle2">产品列表</span></div>
            <p className="subtitle2">关于公司各产品的概述信息</p>
          </Container>
        </div>
        <div className="docsListWrapper">
          <div style={{
            // margin: '10px auto 0', width: '85em', maxWidth: '90vw', minWidth: '85vw', minHeight:'100vh',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'flex-start'
          }}>
            <CardList data={ data.data } type='production'/>
          </div>
        </div>
      </Layout>
    )
  }
}
