import React, { Component } from 'react';
import { Page, Container, Row, Form, Textarea, Select, Radio, RadioGroup, Checkbox, CheckboxGroup, TreeSelect, DateTimePicker, Upload, Input, Button, Divider, Icon, context } from 'epm-ui-react';
import '../../styles/register.css';

class Register extends Component {

  constructor( props ) {
    super( props );

    this.state = {
      submitData: null,
      resData: null,
      captcha: '',
    };

    this.handleSubmit = this.handleSubmit.bind( this );
  }

  getCaptcha() {
    return fetch( `${page.basename}/api/captcha` )
      .then( res => res.json() )
      .then( res => {
        this.setState({
          captcha: res.result,
        })
      } )
  }

  handleSubmit( data ) {
    let str = JSON.stringify( data, null, 2 );
    this.setState( { submitData: str } );
    data.addInfo = '此条信息为 onSubmit 回调函数中加入，此数据为后台返回数据';
    return data;
  }

  render() {

    return (
      <Page>
        <div className={'rLayout'}>
          <div className="header"><h2 className={'headerTitle'}>用 户 注 册</h2></div>
          <Form
            method="post"
            async={ true }
            onSubmit={ this.handleSubmit }
          >
            <Form.Layout type="horizontal">
              <Form.Item name="input" required>
                <Form.Label>用户名</Form.Label>
                <Input />
              </Form.Item>
              <Form.Item name="input" required>
                <Form.Label>邮箱</Form.Label>
                <Input />
              </Form.Item>
              <Form.Item name="input" required unvaildateMsg={'密码不符合,8-18个字符，请使用数字、字母和特殊字符组合'}>
                <Form.Label>登录密码</Form.Label>
                <Input placeholder="8-18个字符，请使用数字、字母和特殊字符组合"/>
              </Form.Item>
              <Form.Item name="input" required>
                <Form.Label>确认密码</Form.Label>
                <Input />
              </Form.Item>
              <Form.Item required >
                <Form.Label>验证码</Form.Label>
                <div id='captcha'>
                  <Input name="captcha" type="text" placeholder="请输入验证码" />
                  <span dangerouslySetInnerHTML={{ __html: this.state.captcha }} onClick={ this.getCaptcha } />
                </div>
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">提交</Button>
              </Form.Item>
            </Form.Layout>
          </Form>
        </div>
      </Page>
    );
  }
}

export default Register;