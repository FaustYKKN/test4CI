import React from 'react';
import CardList from '../components/post/card-list';
import Layout from '../layouts/default';
import { Container, fetch  } from 'epm-ui-react';
import page from 'epm-ui-boot/page';
let apiHost;

export default class Application extends React.Component {
  constructor( props ) {
    super(props);
    this.state = {
      data: []
    }
  }
  componentWillMount() {
    if( typeof window !== 'undefined' ) window.document.title = '资源申请';
  }
  componentDidMount() {
    document.title = "资源申请";
    apiHost = `${page.basename}/api`;
      this.findCate( 'application', ( res ) => {
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
      <Layout currentIndex={5}>
        <div className="intro" style = { {
          background: `url(${ page.basename }/images/docsBanner.jpg) no-repeat center`,
          height : '550px',
          backgroundSize: 'cover'
        } }>
          <Container type="fluid" className="pinfluid" style={{ marginLeft: '5%' }}>
            <div style={{ paddingTop: '80px', textAlign: 'left' }}><span className="ptitle2">资源申请</span></div>
            <p className="subtitle2">关于各类开发资源的详尽申请流程。</p>
          </Container>
        </div>
        <div className="docsListWrapper">
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'flex-start'
          }}>
            <CardList data={ data.data } type='application' />
          </div>
        </div>
      </Layout>
    )
  }
}
