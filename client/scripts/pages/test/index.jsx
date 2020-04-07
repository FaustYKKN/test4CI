import React, { Component } from 'react';
import { Container, Input, Button, Table, fetch } from 'epm-ui-react'
import page from 'epm-ui-boot/page'

export default class Test extends Component {
  constructor ( props ) {
    super( props );

    this.state = {
      tableData: []
    };

    this.addData = this.addData.bind( this );
    this.getData = this.getData.bind( this );
  }

  componentDidMount () {
    this.getData();
  }

  addData () {
    const data = this.getInputValue();

    fetch( page.basename + '/test/addData', {
      method: 'POST',
      body  : data.toString()
    } )
      .then( res => res.json() )
      .then( res => {
        if ( res.code === 200 && res.success ) {
          this.getData();
        } else {
        }
      } );
  }

  getData () {
    fetch( page.basename + '/test/getData' )
      .then( res => res.json() )
      .then( res => {
        this.setState( { tableData: res } );
      } );
  }

  render () {
    
    const columns = [
      {
        title: '记录信息',
        dataIndex: 'name'
      },
      {
        title: '创建时间',
        dataIndex: 'createdAt'
      },
      {
        title: '修改时间',
        dataIndex: 'updatedAt'
      },
      {
        title: '操作',
        width: '100px',
        renderer: ( value, rowIndex, rowData ) => {
          return (
            <Button type="danger">Delete</Button>
          );
        }
      }
    ];

    const { tableData } = this.state;

    return (
      <Container
        type="fluid">
        <h1>文档管理系统
          v0.1.0</h1>
        <hr/>
        <Input
          placeholder="添加词条数据到数据库中，点击下方按钮常看添加过的数据。"
          getter={ ( getter ) => {
            this.getInputValue = getter.getValue;
          } }
        />
        <br/>
        <Button
          type="primary"
          onClick={ this.addData }>添加数据</Button>
        <hr/>
        <h3>返回的数据：</h3>
        <Table
          columns={ columns }
          dataSource={ tableData }
        />
      </Container>
    );
  }
}
