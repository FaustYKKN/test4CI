import React, { PureComponent } from 'react';
import { Container, Row, Button, Icon, popup, Notification } from 'epm-ui-react';
import { filePathFormat } from '../../../utils/imgFilePathFormat';
import page from 'epm-ui-boot/page'
import '../../../styles/index.css';
import '../../../styles/docs.css';
import { isToken } from '../../../utils/judgeLogin';

/*
* props: type: 'inner-source' | 'production' | 'resource'
* */

export default class PostHeader extends PureComponent {
  constructor( props ) {
    super(props);
    this.state = {
      selfAll: {},
      count: null,
      gitStars: 0,
      userStarStatus: null
    };

    this.countAll = this.countAll.bind( this );
    this.findStar = this.findStar.bind( this );
    this.star = this.star.bind( this );
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
    let selfAll = isToken( selfJwt );
    if ( !selfAll ) return;
    this.setState( { selfAll }, () => this.countAll( props.data ) );
  }

  countAll( data ){
    const { projectType = 'post' } = this.props;
    let apiHost = `${page.basename}/api`;
    var url = apiHost + `/star/countAll?projectID=${ data.id }&projectType=${ projectType }` ;
    fetch( url, {
      method: 'GET'
    } )
    .then( res => res.json() )
    .then( res => {
      this.setState( { gitStars: res.data || 0 }, () => {
        this.clickLocked = false;
      } )
    } );
    this.findStar();
  }

  findStar() {
    const { selfAll } = this.state;
    const { data = {} } = this.props;

    if ( !selfAll.id || !data.id ) return;

    let apiHost = `${page.basename}/api`;
    var url = apiHost + `/star/find` ;
    const params = `?userID=${ selfAll.id }&projectType=post&projectID=${ data.id }`;
    fetch( url + params, {
        method: 'GET'
    } )
    .then( res => res.json() )
    .then( res => {
      this.setState( { userStarStatus: res.data.status } );
    } );
  }

  star(){
    const { userStarStatus, selfAll, userStarStatus:status } = this.state;
    const projectID = this.props.data.id;
    const userID = selfAll.id;
    if ( this.clickLocked ) return;
    if ( !userID ) {
      alert( '用户未登录！' );
      return;
    }
    if ( !projectID ) {
      this.popupNotification('点赞失败', '未获取到开源产品ID，请重新刷新页面!', 'warning');
    }
    this.clickLocked = true;
    
    let apiHost = `${page.basename}/api`;
    var url = apiHost + `/star` ;
    var data = {
      userID: userID,
      status: !status,
      projectType: 'post',
      projectID: projectID,
    }
    fetch( url, {
        method: userStarStatus === undefined ? 'POST' : 'PUT',
        body: JSON.stringify( data )
    } )
    .then( res => res.json() )
    .then( res => {
      this.countAll( this.props.data );
    } );

  }

  popupNotification( msg, desc, type ) {
    this.notification = <Notification
                message={ msg }
                description={ desc }
                type={ type }
                key={ Math.random().toString() }
             />;
    popup( this.notification );
  }

  render() {
    const { data = {} } = this.props;
    const { userStarStatus, gitStars } = this.state;
    const placeholdImg = "images/docsBanner.jpg";
    const bg = data.coverImg ? filePathFormat( data.coverImg.filePath ) : placeholdImg;

    return (
      <div 
        className="intro" 
        style={{
          backgroundImage: `url(${page.basename}/${ bg }) `,
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          height: '550px',
        }}
      >
        <Container type="fluid" className="pinfluid" style={{ marginLeft: '5%' }}>
          <div style={{ paddingTop: '50px', textAlign: 'center' }} >
            <span className="ptitle2" >{data.title}</span>
          </div>
          <div style={{ paddingTop: '50px', textAlign: 'center' }} >
            <span className="subtitle2" >{data.description}</span>
          </div>
          <div style={{ paddingTop: '100px', textAlign: 'center' }} >
            <Button 
              type="info"
              shape="outline" 
              style={{
                margin: '0 20px',
              }}
              onClick={ this.star }
            >
              <Icon 
                icon='star' 
                style={{ 
                  fontSize: '18px', 
                  marginRight: '5px', 
                  padding: '2px 2px 2px 0',
                  color: userStarStatus ? '#ddb700' : '#fff' 
                }}
              />
              { gitStars }
            </Button>
            {
              data.postLinks && data.postLinks.map( ( item, key ) => {
                return ( 
                  <Button
                    size='large'
                    type='primary'
                    key={ key }
                    style={{
                      margin: '0 20px',
                      padding: '5px 20px',
                      borderRadius: '10px'
                    }}
                  >
                    { item.linkName }
                  </Button>
                );
              } )
            }
          </div>
      
        </Container>
      </div>
    );
  }
}
