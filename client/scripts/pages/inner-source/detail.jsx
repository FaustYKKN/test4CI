import React from 'react';
import Layout from '../../layouts/default'
import page from 'epm-ui-boot/page'
import CardList from '../../components/inner-source/inner-container'
let apiHost;
import Header from '../../components/inner-source/header'
import { withRouter } from 'react-router';
import {gitLabApi, importSource} from "../../../utils/gitLabApi";

class Detail extends React.Component {

  constructor( props ) {
    super(props);
    this.state = {
      data: {},
      id: null,
    };

    this.getID = this.getID.bind( this );
  }

  componentDidMount() {
    importSource();
    setTimeout( ()=>{
      this.initData( this.props );
    }, 0 )
  }

  initData( ) {
    apiHost = `${ page.basename }/api`;
    const search = this.getID() || window.location.search.slice(4);
    this.setState( {
      id: search
    }, () => {
      const { id } = this.state;
      this.find( id, ( res ) => {
        this.setState( {
          data: res
        },() => {
          const { data } = this.state;
          this.isDelete( ( res ) => {
            let a = false;
            for( let i=0; i<res.length; i++ ){
              if( res[i].id == data.gitlabProjectID ){
                a = true;
              }
            }
            if( a == false ){
              this.reAddProject( data.gitlabProjectID );
            }
          } );
        } )
      } );
    } );
  }

  getID() {
    if( this.isObject( this.props.match ) && this.isObject( this.props.match.params ) && this.props.match.params.id ){
      return this.props.match.params.id
    }
  }

  isObject( obj ) {
    return !!( obj && typeof obj === 'object' );
  }

  // 重新把项目添加到组内
  reAddProject( projectId ){
    const { Gitlab } = gitbeaker.default;
    let api = gitLabApi( Gitlab );
    api.Projects
        .share( `${ projectId }`,`${ page.context.groupsid }`, `${ page.context.power_level }`, {
          access_token: `${ page.context.private_token }`,
        } )
        .then( ( )=>{
        })
        .catch( ( ) => {
        } );
  }

  isDelete( callback ){
    let url = apiHost + `/gitlab/findInnerProjects`;
    fetch( url, {
      method: 'GET',
    } )
    .then( ( res ) => {
      return res.json();
    } )
    .then( function( res ) {
      callback( res );
    } );
  }

  find( id, callback ){
    let url = apiHost + `/innerSource?id=${ id }`;
    fetch( url, {
      method: 'GET',
    } )
    .then( ( res ) => {
      return res.json();
    } )
    .then( function( res ) {
      callback( res.data )
    } );
    }

  render() {
    return (
      <Layout currentIndex={2} >
        <Header data={ this.state.data } />
          <div style={{  margin: '10px auto 0', width: '85em', maxWidth: '150vw', minWidth: '85vw' }}>
            <CardList data={ this.state.data } />
          </div>
      </Layout>
    )
  }
}

export default withRouter( Detail );
