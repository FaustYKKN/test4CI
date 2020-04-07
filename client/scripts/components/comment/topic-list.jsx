import React, { Component } from 'react';
import { Card, List } from 'epm-ui-react';
import page from 'epm-ui-boot/page';

class TopicList extends Component {

  constructor( props ) {
    super( props );
    this.state = {
      topicListData: []
    };
  }

  componentDidMount() {
    if ( this.props.nodebbCid ) {
      this.getTopicListData( this.props.nodebbCid );
    }
  }

  componentWillReceiveProps( nextProps ) {
    if ( nextProps.nodebbCid && this.props.nodebbCid !== nextProps.nodebbCid ) {
      this.getTopicListData( nextProps.nodebbCid );
    }
  }

  getTopicListData( nodebbCid ) {
    // 使用 fetch 请求数据
    fetch( `${ page.context.nodebbHost }/api/category/${ nodebbCid }?_=${ new Date().getTime() }`, {
      method: 'get',
      mode: 'cors'
    } )
    .then( res => res.json() )
    .then( data => {
      console.log(data);
      const topics = data.topics;
      topics.sort( ( a, b ) => b.post_count - a.post_count );
      const hotTopics = topics.slice( 0, 4 );
      this.setState({
        topicListData: hotTopics
      });
    } )
  }

  renderList() {
    const { topicListData } = this.state;
    const { contentWidth = 400 } = this.props;

    return (
      topicListData.map( ( item, key ) => {

        return (
          <div className="topicList-item" key={ key }>
            <div className="topicList-item-content">
              <a href={ `${ page.context.nodebbHost }/topic/${ item.slug }` } title={ item.title }>{ item.title }</a>
            </div>
            <div className="topicList-item-post">
              <a href={ `${ page.context.nodebbHost }/topic/${ item.slug }` } title={ item.posts }>{ item.postcount } 回答</a>
            </div>
          </div>
        )
      } )
    );
  }

  render() {
    const { title, style, className } = this.props;

    return (
      <Card style={ { textAlign: 'left', ...style } } className={ className }>
        <Card.Header>
          { title }
        </Card.Header>
        <Card.Body>
          {
            this.renderList()
          }
        </Card.Body>
      </Card>
    );
  }
}

export default TopicList;