import React, { Component } from 'react';
import { Container } from 'epm-ui-react';
import page from 'epm-ui-boot/page';
import parseQuerystring from '../utils/parse-querystring';
import { isToken } from '../../../utils/judgeLogin';
import fetchWithToken from "../../../utils/fetchWithToken";

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
    await this.getAccessToken( code, uid, () => {
      this.inInner( uid );
    } );
  }

  async inInner( id ) {
    let apiHost = `${page.basename}/api`
    const res = await fetchWithToken( `${ apiHost }/gitlab/inInner/${ id }` );
    if( res.status === 200 || res.status === 409 ) {
      this.setState( { status: '🎉 认证成功！🎉本页面即将关闭。' } );
      window.setTimeout( () => {
        (self.parent).opener.location.reload();
        window.top.close();
      }, 2000 )
    }else if ( res.status === 500 ) {
      const info = await res.json();
      if( info.url ) {
        await this.setState( { showCodeLink: true, status: info.message } );
      }else {
        await this.setState( { status: info.message } );
      }
    }
  }

  async getAccessToken ( code, uid, callback ) {
    let apiHost = `${page.basename}/api`
    const config = {
      code,
      uid,
      redirectUri: `${ window.location.origin }${ page.basename }/inner-source/authorizesec`
    };
    const res = await fetch( `${ apiHost }/gitlab`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify( config ) } );
    if( res.status === 200  ) {
      callback( res )
    } else if ( res.status === 500 ) {
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
            >点击跳转至 BONC GitLab</a> :
            null
        }
      </Container>
    );
  }

}
