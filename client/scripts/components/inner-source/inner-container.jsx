import React, { Component } from 'react';
import { Container, Icon, Row, Button, Alert, popup, Dropdown } from 'epm-ui-react';
import page from 'epm-ui-boot/page'
import '../../../styles/index.css';
import '../../../styles/docs.css';
import '../../../styles/inner-source.css';
import { isToken } from '../../../utils/judgeLogin';
import marked from 'marked';
import '../../../styles/overwrite.css';
import '../../../styles/github.css'
import {gitLabApi} from "../../../utils/gitLabApi";
/*
* props: type: 'inner-source' | 'production' | 'resource'
* */

export default class Article extends Component {
  constructor( props ) {
    super(props);
    this.state = {
      data: null,
      loading: true,
      con: null,
      a: null,
      selfAll: {},
      README: null,
    };
  } 

  componentDidMount() {
    this.initData( this.props );
  }
  
  componentWillReceiveProps ( nextProps ) {
    this.initData( nextProps );
  }
  
  initData ( props ) {
    const { data } = props;
    if ( !data ) return false;
    let selfJwt = window.localStorage.getItem("selfJwt");
    let SelfAll = isToken( selfJwt );
    this.setState( { selfAll: SelfAll, data: data } );
    if( data.gitlabProjectID ){
      this.getREADME( data.gitlabProjectID, ( res ) => {
        let readme = ( decodeURIComponent( escape( window.atob( res.content ) ) ) );
          this.setState( {
            README : readme,
          }, () => {
            const { README } = this.state;
            marked.setOptions( { renderer: this.getRenderer() } );
            let content = marked( README );
            this.setState( {
              con: content,
              loading: false,
            }, () => {
              this.hightlight();
            } );
          } );
      } );
    }
  }

  hightlight(){
    let codeList = document.querySelectorAll( 'pre code' );
    let hljsWorker = new Worker( `${page.basename}/js/hljs-worker.js` );   
    
    codeList.forEach( ( codeElement, index ) => {
      codeElement.className += ' hljs';
      hljsWorker.onmessage = ( event ) => {            
        let { codeValue, elementIndex } = event.data;
        codeList[ elementIndex ].innerHTML = codeValue;
      };
    
      hljsWorker.postMessage(
        { codeValue: codeElement.textContent, elementIndex: index } 
      );
    } );
  }

  // 获取 master 分支的 README.md 的内容
  getREADME ( projectId, callback ) {
    const { Gitlab } = gitbeaker.default;
    let api = gitLabApi( Gitlab );

    api.RepositoryFiles
        .show( `${ projectId }`, `README.md`, 'master', {
          access_token: `${ page.context.private_token }`,
          file_path: `README.md`,
          ref: 'master',
        } )
        .then( ( res )=>{
          callback( res )
        })
        .catch( ( err ) => {
          callback( err )
        } );
  }

  findImages ( projectid, file_path, ref ){
    let apiHost = `${page.basename}/api`;
    let url = apiHost + `/gitlab/findImages?projectid=${ projectid }&file_path=${ file_path }&ref=${ ref }` ;
    return url;
  }

  getRenderer(){
    let { data } = this.state;
    const renderer = new marked.Renderer();
    renderer.image = ( href, title, text ) => {
      let realHref = '';

      if( href.slice( 0, 2 ) === '//' || href.slice( 0, 7 ) === 'http://' || href.slice( 0, 8 ) === 'https://' ){
        realHref = href;
      }else{
        realHref = this.findImages( `${data.gitlabProjectID}`, `${ href }`, 'master' );
      }

      return `<img src="${ realHref }" alt="${ text }" title="${ title || '' }" />`;
    }
    renderer.table = ( header, body ) => {
      return `<table class="epm-table epm-table_bordered-row epm-table_striped epm-table_multiLine"><thead>${ header }</thead><tbody>${ body }</tbody></table>`
    };
    renderer.tablerow = ( content ) => {
      return `<tr>${ content }</tr>`;
    };
    renderer.tablecell = ( content, flags ) => {
      return flags.header ? `<th class="epm-table_text">${ content }</th>` : `<td class="epm-table_text">${ content }</td>`;
    };
    return renderer;
  }



  render() {
    const { con, loading } = this.state;
    let c = false ;
      return (
        <div className="lightspot" >
          <div className="intro_title">
            <span className="intro_title_t">README</span>
            <br/>
          </div>
          <Container type="fluid" style={ { padding: '80px', backgroundColor: '#fff' } }>
          { loading? <div></div>: <div className = 'intro_context' dangerouslySetInnerHTML={ { __html: con } } ></div> }
          </Container>
        </div>
      )
  }
} 