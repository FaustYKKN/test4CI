import React, { Component } from 'react';
import { Container } from 'epm-ui-react';
import page from 'epm-ui-boot/page';
import parseQuerystring from '../../utils/parse-querystring';
import { tdsServerUrl } from '../../configs/url';
import fetchWithTdssToken from '../../utils/fetchWithTdssToken';
import decodeJwt from '../../utils/decodeJwt';

export default class TdssAuthorize extends Component {
  constructor ( props ) {
    super( props );

    this.state = {
      status: '正在认证中。。。',
      showCodeLink: false
    };

    this.authorization = this.authorization.bind( this );
    this.getAccessToken = this.getAccessToken.bind( this );
  }

  componentDidMount () {
    const { code } = parseQuerystring();
    const userInfo = decodeJwt( localStorage.tdssJwt.split( '.' )[ 1 ] );

    this.userId = userInfo.id;
    this.authorization( code );
  }

  async authorization ( code ) {
    return await this.getAccessToken( code );
  }

  async getAccessToken ( code ) {
    const config = {
      code,
      redirectUri: `${ window.location.origin }${ page.basename }/tdss-authorize`
    };
    const res = await fetchWithTdssToken( tdsServerUrl.gitlab.fillUserPrivateToken( this.userId, page.context.tdssUrl ), { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify( config ) } );

    if( res.status === 200 ) {
      await this.setState( { status: '🎉 认证成功！本页面即将关闭。' } );
      window.setTimeout( () => { window.close(); }, 2000 )
    }else if ( res.status === 500 ) {
      const info = await res.json();

      if( info.url ) {
        await this.setState( { showCodeLink: true, status: info.message } );
      }else {
        await this.setState( { status: info.message } );
      }
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
            >BONC GitLab</a> :
            null
        }
      </Container>
    );
  }

}
