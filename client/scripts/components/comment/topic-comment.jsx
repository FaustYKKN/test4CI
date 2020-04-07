import React, { Component } from 'react';
import { Page, Row, Form, Textarea, Button, Avatar, Alert, popup } from 'epm-ui-react';
import fetchWithToken from '../../../utils/fetchWithToken';
import page from 'epm-ui-boot/page';

import '../../../styles/topic-list.css';
import judgeLogin from '../../../utils/judgeLogin';

class TopicComment extends Component {

  constructor( props ) {
    super( props );
    this.state = {
      topicData: {},
      topicListData: [],
      slug:"",
      isLogin: false,
      jwtPayload: {}
    };

    this.getCommentList = this.getCommentList.bind( this );
    this.submitPost = this.submitPost.bind( this );
    this.getTopicListData = this.getTopicListData.bind( this )
  }

  componentDidMount() {
    this.getCommentList( this.props.topicID );
    
    judgeLogin().then( res => {
      if( res && res.state ){
        this.setState( {
          isLogin: true,
          jwtPayload: res.jwtPayload
        } )
      }
    } );
  }

  componentWillReceiveProps( nextProps ) {
    if ( this.props.topicID !== nextProps.topicID ) {
      this.getCommentList( nextProps.topicID );
    }
  }

  getCommentList( topicID ) {
    fetch(
      `${ page.context.nodebbHost }/api/topic/${ topicID }?_=${ new Date().getTime() }`,
      {
        method: 'get',
        mode: 'cors'
      }
    )
    .then( res => res.json() )
    .then( data => {
      this.setState( { topicData: data } );
      this.getTopicListData(data.cid)
    } )
  }

  // 发表回复
  submitPost() {
    const postContent = this.getTextareaContent();
    if ( !postContent ) {
      popup( <Alert message={ `回复失败 error: 回复内容不可为空` } type="danger" dismissible delay={ 3 } /> ) ;
      return;
    }
    if ( postContent.length < 10 ) {
      popup( <Alert message={ `回复失败 error: 回复内容不得少于10个字符` } type="danger" dismissible delay={ 3 } /> );
      return;
    }

    fetchWithToken( `${ page.basename }/api/nodebb/reply`, {
      method: 'post',
      headers: {
        "Content-Type": "Application/json"
      },
      body: JSON.stringify( {
        content: postContent,
        topicID: this.props.topicID
      } )
    } )
    .then( res => res.json() )
    .then( data => {
      if ( data.msg === '回复成功' ) {
        popup( <Alert message="回复成功" type="success" dismissible delay={ 3 } /> ) ;
        this.getCommentList( this.props.topicID );
        this.resetTextarea();
      } else {
        popup( <Alert message={ `回复失败 error: ${ data.data.message }` } type="danger" dismissible delay={ 3 } /> ) ;
      }
    } )
    .catch( error => {
      popup( <Alert message="回复失败" type="danger" dismissible delay={ 3 } /> ) ;
    } )
  }

  renderNewComment() {
    const { showNewCommentLength = 5 } = this.props;
    const commentList = this.state.topicData.posts || [];
    const diff = commentList.length - showNewCommentLength;
    const newList = commentList.slice( diff < 0 ? 0 : diff, commentList.length ).reverse();

    return this.renderCommentList( newList );
  }

  renderCommentList( commentList ) {
    return (
      commentList.map( ( item, key ) => {
        return(
          <Row key={ key } className="comment-table">
            <Row.Col size={ 24 }>
              <div className="comment-avatar-td" rowSpan='3' style={ { width: '60px' } }>
                <Avatar size={ 40 } >{ item.user[ 'icon:text' ] }</Avatar>
              </div>
              <div className="box">
                <span className='comment-username'> { item.user.username } </span>
                <span className='comment-time'>{ new Date( item.timestamp ).toLocaleString() } </span>
                <div className="arrow"></div>
                <div className='comment-content' dangerouslySetInnerHTML={{__html: item.content}}></div>
              </div>
            </Row.Col>
          </Row>
        );
      } )
    );
  }



  /* add */
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
        topicListData: hotTopics,
        slug:data.slug
      });
    } )
  }

  renderNewPostList(){
    const { topicListData } = this.state;
    const { contentWidth = 400 } = this.props;

    return (
      topicListData.map( ( item, key ) => {
        return (
          <Row className="topicList-item" key={ key }>
            <div className="topicList-item-content">
              <a href={ `${ page.context.nodebbHost }/category/${ this.state.slug }` } title={ item.title }>{ item.title }</a>
            </div>
            <div className="topicList-item-post">
              <a href={ `${ page.context.nodebbHost }/topic/${ item.slug }` } title={ item.posts }>{ item.postcount } 回答</a>
            </div>
          </Row>
        )
      } )
    );
  }

  /* end */

  render() {
    const {} = this.props;
    const { isLogin, jwtPayload } = this.state;

    return (
      <div className="comment-container">
        <div className="comment-content">
          {
            isLogin ?
            <React.Fragment>
                <div className="intro_title">
                  <span className="intro_title_t topic-list-title">发表评论</span>
                  <div className="pIntro_title_divider"/>
                </div>
                <div className="topic-card">
                  <Textarea
                    placeholder="我想说点什么..."
                    rows={ 4 }
                    name="textarea"
                    getter={ getter => this.getTextareaContent = getter.getValue }
                    trigger={ trigger => this.resetTextarea = trigger.resetValue }
                  />
                  <div style={{ height: '10px' }}></div>
                  <Button type="primary" onClick={ this.submitPost.bind( this ) }>发表</Button>
                </div>
            </React.Fragment>
            : null
          }
          {/*  <div className="intro_title">
            <span className="intro_title_t topic-list-title">热门评论</span>
            <div className="pIntro_title_divider"/>
          </div>
          <div className="topic-card">
            {
              this.renderHotComment()
            }
          </div> */}
          <div className="intro_title">
            <span className="intro_title_t topic-list-title">最新评论</span>
            <div className="pIntro_title_divider"/>
          </div>
          <div className="topic-card">
            {
              this.renderNewComment()
            }
          </div>
          <div className="intro_title">
            <span className="intro_title_t topic-list-title">最新帖子</span>
            <div className="pIntro_title_divider"/>
          </div>
          <div className="topic-card">
            {
              this.renderNewPostList()
            }
          </div> 
        </div>
      </div>
    );
  }
}

export default TopicComment;