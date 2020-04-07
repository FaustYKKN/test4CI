import React, { Component } from 'react';
import { Menu, Divider, Button, Table, Form, Input } from 'epm-ui-react';
import page from 'epm-ui-boot/page'

class Setting extends Component {

  constructor( props ) {
    super( props );

    this.state = {
      settings: {}
    }
  }

  componentDidMount() {
    this.getSettings();
  }

  initNodebbCategory() {
    fetch( `${ page.basename }/api/nodebb/initNodebbCategory`, {
      method: 'post'
    } )
    .then( res => res.json() )
    .then( data => {
      alert( '初始化创建成功' );
    } )
  }

  getSettings() {
    fetch( `${ page.basename }/api/setting`, {
      method: 'get'
    } )
    .then( res => res.json() )
    .then( data => {
      this.setState( { settings: data.data } );
    } )
  }

  handleSubmit( data ) {
    console.log( data );
  }

  render() {
    const {} = this.props;
    const { settings } = this.state;

    return (
      <div className='bonc-admin-settings'>
        <h2 style={{ borderBottom: '1px solid rgb(136, 136, 141)', mariginBottom: '5px', paddingBottom: '10px' }}> 系统设置 </h2>
        {/* <Button onClick={ this.initNodebbCategory }>初始化创建 NodeBB 顶级分类</Button> */}
        <Form
          method="post"
          action={ `${ page.basename }/api/setting` }
          async={ true }
          // onSubmit={ this.handleSubmit }
        >
          <Form.Layout type="horizontal">
            <Form.Item name="nodebb_global_cid">
              <Form.Label>NodeBB 一级分类版块ID</Form.Label>
              <Input value={ settings['nodebb_global_cid'] } />
            </Form.Item>
            <Form.Item name="nodebb_innersource_cid">
              <Form.Label>NodeBB 开源分类版块ID</Form.Label>
              <Input value={ settings['nodebb_innersource_cid'] } />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">提交</Button>
            </Form.Item>
          </Form.Layout>
        </Form>
      </div>
    );
  }
}

export default Setting;