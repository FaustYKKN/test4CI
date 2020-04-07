import React, { Component } from 'react';
import { Card, Button, Container, Row, Divider } from 'epm-ui-react'
import page from 'epm-ui-boot/page';
import JSXShowcase from './jsx-showcase';

/*
* props: type: 'inner-source' | 'production' | 'resource'
* */

export default class Article extends Component {
  constructor ( props ) {
    super( props );

    this.state = {
      ContentString: '',
      contentFileResourcePath: ''
    };

    this.getContentString = this.getContentString.bind( this );
  }

  componentDidMount () {
    this.getContentString( this.props.article );
  }

  componentWillReceiveProps ( nextProps, nextContext ) {
    this.getContentString( nextProps.article );
  }

  async getContentString( article = {} ) {
    const { contentFile, contentFileID } = article;

    // if( fileId ){
    //   let res = await fetch( page.basename + `/api/file/upload/${ fileId }/getFileContent` );

    //   if( res.status === 200 ) {
    //     res = await res.json();
    //     this.setState( { ContentString: res.data } );
    //   }else {
    //     res = await res.json();
    //   }
    // }
    if( contentFileID ){
      let filePath = contentFile.filePath.split('/');
      filePath.shift();
      filePath.shift();
      filePath = filePath.join('/');
      let res = await fetch( page.basename + '/' + filePath + 'index.jsx' );

      if( res.status === 200 ) {
        res = await res.text();
        this.setState( { ContentString: res, contentFileResourcePath: filePath } );
      } else {
        // res = await res.json();
      }
    }
  }

  render() {
    const { ContentString, contentFileResourcePath } = this.state;

    return (
      <JSXShowcase ContentString={ ContentString } contentFileResourcePath={ contentFileResourcePath }/>
    );
  }
}
