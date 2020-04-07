import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import * as EPMUIReact from 'epm-ui-react';
import { Skeleton, Container } from 'epm-ui-react';
import moment from 'moment';
import * as Babel from 'babel-standalone';
import page from 'epm-ui-boot/page';

export default class JSXShowcase extends Component {
  constructor ( props ) {
    super( props );

    this.jsxCompile = this.jsxCompile.bind( this );
    this.generateContent = this.generateContent.bind( this );
  }

  componentDidMount () {
    window.React = React;
    window.ReactDOM = ReactDOM;
    window.EPMUIReact = EPMUIReact;
    window.markdownHack = { moment };

    if( this.props.ContentString ) {
      this.generateContent( this.props.ContentString, this.props.contentFileResourcePath );
    }
  }

  componentWillReceiveProps ( nextProps, nextContext ) {
    if ( nextProps.ContentString !== this.props.ContentString 
      || nextProps.contentFileResourcePath !== this.props.contentFileResourcePath ) {
      this.generateContent( nextProps.ContentString, nextProps.contentFileResourcePath );
    }
  }

  jsxCompile( code ) {
    return Babel.transform( code, {
      presets: [
        "es2015", "react", "stage-1"
      ]
    } ).code;
  }

  generateContent( code, resourcePath ) {
    const mountNode = this.disPlayArea;
    const compiledCode = this.jsxCompile( code );

    try {
      if ( compiledCode ) {
        let contentClass = eval( `
            (function ( func ) {
              var exports = {};
              var require = function ( dep ) {
                if ( dep === 'react' ) {
                  return window.React;
                } else if ( dep === 'epm-ui-react' ) {
                  return window.EPMUIReact;
                } else if ( dep === 'moment' ) {
                  return markdownHack.moment;
                } else if ( dep === "react-dom" ) {
                  return window.ReactDOM;
                }
              };
              try{
                ${ compiledCode }
              }catch( err ){
                 throw err;
               }
              
              return exports.default;
            })();
          `.trim() );

        ReactDOM.unmountComponentAtNode( mountNode );
        ReactDOM.render( <ErrorBoundary>{ React.createElement( contentClass, { resourcePath: `${ page.basename }/${ resourcePath }`, contextPath: page.basename } ) }</ErrorBoundary>, mountNode );
      }else {
        ReactDOM.unmountComponentAtNode( mountNode );
        ReactDOM.render( React.createElement( 'p', {}, '暂无内容，正待补充 😅' ), mountNode );
      }
    } catch( err ) {
      ReactDOM.unmountComponentAtNode( mountNode );
      ReactDOM.render( React.createElement( 'pre', { style: { color: "red" } }, err.toString() ), mountNode );
    }
  }


  render () {

    return (
      <div className="jsxShowcaseWrapper">
        <div className="disPlayArea" ref={ ( node ) => {
          this.disPlayArea = node;
        } }>
          <div className='intro'>
            <Container type="fluid">
              <Skeleton>
                <Skeleton horizontal>
                  <Skeleton.Block />
                  <Skeleton.Line />
                </Skeleton>
                <Skeleton.Line />
                <Skeleton.Line />
                <Skeleton.Line style={ { width: '58%' } } />
                <br />
                <Skeleton.Line />
                <br />
                <Skeleton horizontal>
                  <Skeleton.Block />
                  <Skeleton.Line />
                </Skeleton>
                <Skeleton.Line />
                <Skeleton.Line />
                <Skeleton.Line style={ { width: '58%' } } />
              </Skeleton>
            </Container>
          </div>
        </div>
      </div>
    );
  }
}

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true, error});
  }

  render() {
    const { hasError, error } = this.state;

    if (hasError) {
      // You can render any custom fallback UI
      return <pre style={{ color: "red" }}>{ error.toString() }</pre>
    }
    return this.props.children;
  }
}
