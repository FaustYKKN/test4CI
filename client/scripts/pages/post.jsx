import React from 'react';
import Layout from '../layouts/default';
import page from 'epm-ui-boot/page';
import Article from '../components/post/article';
import PostHeader from '../components/post/header';
import TopicComment from '../components/comment/topic-comment';
import { fetch, Container } from 'epm-ui-react';
import { withRouter } from 'react-router';

import '../../styles/index.css';
import '../../styles/docs.css';

class Post extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: {}
    };

    this.getID = this.getID.bind( this );
  }

  componentDidMount() {
    const search = this.getID() || window.location.search.slice(4);

    const url = `${page.basename}/api/post/getOne/${search}`;
    fetch(url, {
      method: 'GET',
    })
    .then( res =>  res.json() )
    .then( data => {
      this.setState({
        data: data.data || {}
      })
    });
  }

  getID() {
    if( this.isObject( this.props.match ) && this.isObject( this.props.match.params ) && this.props.match.params.id ){
      return this.props.match.params.id
    }
  }

  getNavIndex() {
    let navIndex = 1;
    if( this.isObject( this.props.match ) ) {
      const { path = '' } = this.props.match;

      switch( true ) {
        case path.indexOf( '/production' ) === 0:
          navIndex = 1;
          break;
        case path.indexOf( '/application' ) === 0:
          navIndex = 5;
          break;
        case path.indexOf( '/repository' ) === 0:
          navIndex = 6;
          break;
        default:
          navIndex = 1;
      }
    }

    return navIndex;
  }

  isObject( obj ) {
    return !!( obj && typeof obj === 'object' );
  }

  render() {
    const { data } = this.state;

    return (
      <Layout currentIndex={ this.getNavIndex() } >
        {/* <PostHeader data={data} /> */}
        <Article article={ data.article || {} } />
        {
          data.comment && data.comment.nodebbTopicID ?
          <div className='intro'>
            <Container type="fluid">
              <TopicComment topicID={ data.comment.nodebbTopicID }  />
            </Container>
          </div>
          : null
        }
      </Layout>
    )
  }
}

export default withRouter( Post );
