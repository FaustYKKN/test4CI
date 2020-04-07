import React, { Component } from 'react';
import { Table, Button, Input, config, Divider, Container, Row } from 'epm-ui-react';

/*import 'epm-ui-css';*/

class Demo extends Component {

  componentDidMount() {
    config( {
      fetch: {
        headers: new Headers( {
          "Accept": "application/json"
        } )
      }
    } );
  }

  render() {
    return (
        <Container>
          <Row>
            <Row.Col size={ 16 }>
              <Input placeholder="请输入相关关键词，如 “张三”、“清华大学”、“北京故宫” 等" />
            </Row.Col>
            <Row.Col size={ 8 }>
              <Button type="primary">搜索</Button>
            </Row.Col>
          </Row>
          <Divider clearing />
          <Table
              dataSource="/api/demo" selectable
          >
            <Table.Column title="姓名" dataIndex="nameSearch">
              {( value ) => <a>{value}</a>}
            </Table.Column>
            <Table.ColumnGroup title="个人简介">
              <Table.Column title="学校" dataIndex="schoolSearch" />
              <Table.ColumnGroup title="私人信息">
                <Table.Column title="工作" dataIndex="jobSearch" sortable />
                <Table.Column title="年龄" dataIndex="ageSearch" sortable />
              </Table.ColumnGroup>
            </Table.ColumnGroup>
            <Table.Column title="地址" dataIndex="addressSearch" />
          </Table>
          <br />
          您选择的是:
        </Container>
    );
  }

}

export default Demo;