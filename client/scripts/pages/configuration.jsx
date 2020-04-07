import React from 'react';
import CardList from '../components/post/card-list';
import Layout from '../layouts/default'
import { Container, Row, Button, fetch  } from 'epm-ui-react';
import page from 'epm-ui-boot/page'
let apiHost;

import '../../styles/index.css';
import '../../styles/docs.css';

export default class production extends React.Component {
  constructor( props ) {
    super(props);
    this.state = {
      data: []
    }
  }
  componentDidMount() {
    apiHost = `${page.basename}/api`
    this.findCate( 'private', ( res ) => {
      this.setState( {
        data: res.data
      } )
    } );
  }
  findCate ( cate, callback ) {
    var url = apiHost + `/post/getAll?postCategory=${cate}` ;
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
      <Layout currentIndex={7}>
        <div className="intro" style = { {
          background: `url(${ page.basename }/images/docsBanner.jpg) no-repeat center`,
          height : '550px',
          backgroundSize: 'cover'
        } }>
          <Container type="fluid" className="pinfluid" style={{ marginLeft: '5%' }}>
            <div style={{ paddingTop: '80px', textAlign: 'left' }}><span className="ptitle2">私服配置</span></div>
            <p className="subtitle2">BONC私服仓库的配置手册</p>
          </Container>
        </div>
        <div style={{  margin: '10px auto 0', width: '85em', maxWidth: '90vw', minWidth: '85vw', minHeight:'100vh' }}>
            <CardList data={ data.data } type='production' />
        </div>
      </Layout>
    )
  }
}
