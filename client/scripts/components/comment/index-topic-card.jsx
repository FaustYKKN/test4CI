import React, { Component } from 'react';
import { Card, List } from 'epm-ui-react';
import TopicList from './topic-list';
import page from 'epm-ui-boot/page';

class IndexTopicList extends Component {

  constructor( props ) {
    super( props );
    this.state = {
      postList: [],
      innerSourceList: []
    };
  }

  componentDidMount() {
    this.getPostList();
    this.getInnerSourceList();
  }

  getPostList() {
    fetch( `${ page.basename }/api/post/getAll`, { 
      method: 'get'
    } )
    .then( res => res.json() )
    .then( data => {
      const postList = [];
      data.data.data.forEach( item => {
        if ( item.commentShowIndex === 'true' ) postList.push( item );
      } );

      this.setState( { postList } );
    } )
  }
  getInnerSourceList() {
    fetch( `${ page.basename }/api/innerSource/getAll`, { 
      method: 'get'
    } )
    .then( res => res.json() )
    .then( data => {
      const innerSourceList = [];
      data.data.data.forEach( item => {
        if ( item.commentShowIndex === 'true' ) innerSourceList.push( item );
      } );

      this.setState( { innerSourceList } );
    } )
  }

  renderList( topicList ) {
    return (
      topicList.map( ( item, index ) => {
        if ( item.comment ) {
          return <TopicList className='index-topic-comment-item' key={ index } title={ item.title } nodebbCid={ item.comment.nodebbCategoryID } />;
        }
      } )
    );
  }

  render() {
    const { title, style, className } = this.props;

    return (
      <div>
        {
          this.state.postList.length > 0 && 
          <div className="index-topic-comment-list" style={{  }}>
            { this.renderList( this.state.postList ) }
          </div>
        }
        {
          this.state.innerSourceList.length > 0 && 
          <div className="index-topic-comment-list">
            { this.renderList( this.state.innerSourceList ) }
          </div>
        }
      </div>
    );
  }
}

export default IndexTopicList;