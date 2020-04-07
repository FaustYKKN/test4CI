import React, { Component } from 'react';
import { Container } from 'epm-ui-react';
import page from 'epm-ui-boot/page';
import parseQuerystring from '../utils/parse-querystring';
import { isToken } from '../../../utils/judgeLogin';
import fetchWithToken from '../../../utils/fetchWithToken';


export default class Authorization extends Component {
  constructor ( props ) {
    super( props );
    this.state = {
      status: '正在认证中。。。',
      userid: '',
      showCodeLink: false
    };

    this.authorization = this.authorization.bind( this );
    this.getAccessToken = this.getAccessToken.bind( this );
  }

  componentDidMount () {
    let selfJwt = window.localStorage.getItem("selfJwt");
    let SelfAll = isToken( selfJwt );
    this.setState( {
      userid: SelfAll.id,
    }, () => {
      const { userid } = this.state;
      const { code } = parseQuerystring();
      this.authorization( code, userid );
    } );
  }

  async authorization ( code, uid ) {
    this.getAccessToken( code, uid ,()=>{
    });
  }

  async getAccessToken ( code, uid, callback ) {
    let apiHost = `${page.basename}/api`
    const config = {
      code,
      uid,
      redirectUri: `${ window.location.origin }${ page.basename }/inner-source/authorize`
    };
    const res = await fetchWithToken( `${ apiHost }/gitlab`, { 
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }, 
      body: JSON.stringify( config ) } );
    if( res.status === 200 ) {
      callback( res );
    }
  }

  render () {
    const { showCodeLink } = this.state;
    return (
      <Container type="fluid">
      <h1>{ this.state.status }</h1>
      {
          showCodeLink ?
            <a
              href="https://code.bonc.com.cn"
              target="_blank"
            >点击跳转至 BONC GitLab</a> :
            null
        }
      </Container>
    );
  }

}
