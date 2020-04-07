import React, { Fragment } from 'react'
import '../../styles/login.css'
import { Modal, Form, Input, Button, Progress } from 'epm-ui-react'
import loginToSso from '../../utils/loginToSso';
import { localAPIs } from '../../configs/url'
import { transformJwt } from '../../utils/judgeLogin'
import page from 'epm-ui-boot/page';

export default class Login extends React.Component {

  constructor( props ) {
    super( props );

    this.err = '用户名或密码错误';
    this.state = {
      visible: true,
      captcha: '',
      sync: false,
      errMessage: '',
    };

    this.getCaptcha = this.getCaptcha.bind( this );
    this.submit = this.submit.bind(this);
  }

  componentDidMount() {
    // console.log( 'login component:', page );
    this.getCaptcha();
  }

  getCaptcha() {
    return fetch( `${ localAPIs().captcha }` )
      .then( res => res.json() )
      .then( res => {
        // console.log( res );
        this.setState({
          captcha: res.result,
        })
      } )
  }

  onLogin(){
    location.reload();
  }

  submit() {
    const { onAfterLogin, setLoginState = () => {} } = this.props;
    this.setState( { sync: true, errMessage: '' } );
    const data = this.getValue();
    // const formData = encodeURI( `username=${data.username}&password=${data.password}` );
    // 1.首先进行站内登录，根据站内登录的返回结果302判断是否进行sso登录；200代表登录成功则return；其他状态则提示错误信息。
    fetch( `${ localAPIs().login }`, {
      body: JSON.stringify(data),
      headers: {
        'content-type': 'application/json'
      },
      method: 'POST',
      redirect: 'follow'
    } )
      .then( res => {
        return res.json()
          .then( body => {
            return { res, body }
          } )
      } )
      .then( ( { res, body } = {} ) => {
        if( res.status === 200 ){ // 本系统登录成功
        	if ( body.code === void 0 ) {
		        if( body.data ) localStorage.selfJwt = body.data;
		        setLoginState(); // 触发navgation进行状态检测
		        this.setState( { visible: false } );
		        this.onLogin();
	        } else if ( body.code === 302 ) {
		        return loginToSso( data )
			        .then( async ( res ) => {
				        if( res.returnStatus === 200 || res.returnInfo === '已登录' ){  // sso登录成功
					        setLoginState(); // 触发navgation进行状态检测

					        const transJwtRes = await transformJwt(); // 将外部的jwt转成本站的jwt
					        if( transJwtRes.status === 200 ) {
						        await this.setState( { visible: false } );

						        if ( onAfterLogin && typeof onAfterLogin === 'function' ) {
							        onAfterLogin();
						        } else {
							        this.onLogin();
						        }
					        }else if( transJwtRes.status === 403 ) {
						        console.log( this.props );
						        await this.setState( { errMessage: '您的信息有问题，解决方法详见右上角~' } )
					        }else {
						        throw new Error( 'Error occurred on transformJwt.' )
					        }

				        }else{
					        this.setState( { errMessage: res.returnInfo } )
				        }
			        } )
	        }
        }else{ // 400 或者 401
          console.log( 'resbody: ',body );
          this.setState( { errMessage: body.msg } );
        }
      } )
      .catch( err => {
        console.error( err );
      } )
      .finally( () => {
        this.setState( { sync: false } );
        this.resetCaptcha();
        this.getCaptcha()
      } )
  }

  formGetter ( getter ) {
    this.getValue = getter.getValue;
  }

  captchaTrigger (  trigger ) {
    this.resetCaptcha = trigger.resetValue;
  }

  render() {
    const { dark } = this.props;
    const color = { color: '#000' };
    const { sync } = this.state;

    return (
      <Modal {...this.props} visible={ this.state.visible } style={{ zIndex: 100 }}>
        <Modal.Header>
          <span style={{ marginLeft: '1em' }}>用户登录</span>
        </Modal.Header>
        <Modal.Body className='content' style={{ padding: '3em 1em 1em' }}>

          <p style={{ display: !this.state.sync && this.state.errMessage ? 'block' : 'none' }} className='errInfo' >
            { this.state.errMessage }
          </p>

          <div style={{ fontSize: '12px', marginBottom: '5px', marginLeft: '83px', color: '#918c8c' }}>
            用户名密码与运营管理系统一致&nbsp;&nbsp;
            <a
              href={ `${ page.context.ssoHost }/security/pwdinfo!forgetPwd.action` }
              target="_blank"
            >忘记密码？</a>
          </div>

          <Form getter={ this.formGetter.bind( this ) } >
            <Form.Layout type="horizontal">

              <Form.Item required>
                <Form.Label style={ dark && color }>账号</Form.Label>
                <Input name="username" placeholder="请输入用户名" auto />
              </Form.Item>

              <Form.Item required>
                <Form.Label style={ dark && color }>密码</Form.Label>
                <Input name="password" type="password" placeholder="请输入密码" />
              </Form.Item>

              <Form.Item required >
                <Form.Label style={ dark && color }>验证码</Form.Label>
                <div id='captcha'>
                  <Input 
                    name="captcha" 
                    type="text" 
                    placeholder="请输入验证码" 
                    trigger={ this.captchaTrigger.bind( this ) }
                    onKeyPress={ e => {
                      const keyCode = e.keyCode || e.which || e.charCode; 
                      if ( keyCode === 13 ) this.submit();
                    } }
                  />
                  <span dangerouslySetInnerHTML={{ __html: this.state.captcha }} onClick={ this.getCaptcha } />
                </div>
              </Form.Item>

            </Form.Layout>
            <Form.Item style={{ textAlign: 'center' }}>
              <Button type="primary" onClick={ this.submit } disabled={ sync }>
                {
                  sync ?
                    <Fragment>
                      <Progress.Circle style={ { verticalAlign: "middle" } } size='tiny' strokeColor='green' type='loading' />
                      &nbsp;&nbsp;
                      登录中
                    </Fragment>
                    :
                    "登录"
                }
              </Button>
            </Form.Item>
          </Form>
        </Modal.Body>
      </Modal>
    )
  }
}
