import React, { Component } from 'react';
import { Menu, Divider, Button, Table } from 'epm-ui-react';

class ResourceList extends Component {

  constructor( props ) {
    super( props );
  }


  render() {
    const {} = this.props;
    const data = [
      {
        "name": "首页",
        "age": '/',
        "address": "产品列表"
      },
      {
        "name": "产品列表",
        "age": '/product',
        "address": "开源列表"
      },
      {
        "name": "开源列表",
        "age": '/inner-source',
        "address": "资源下载"
      },
      {
        "name": "资源下载",
        "age": '/resource',
        "address": "资源下载"
      },
      {
        "name": "技术文档",
        "age": '/tdss',
        "address": "资源下载"
      }
    ];

    const columns = [
      {
        "title": "菜单名称",
        "dataIndex": "name"
      },
      {
        "title": "跳转路径",
        "dataIndex": "age"
      },
      {
        "title": "操作",
        renderer: ( value, index, rowData ) => {
          return (
            <div>
              <a style={{marginRight: '20px'}}>编辑</a>
              <a>删除</a>
            </div>
          );
        }
      }
    ];

    return (
      <div>
        <h2 style={{ borderBottom: '1px solid rgb(136, 136, 141)', mariginBottom: '5px', paddingBottom: '10px' }}> 资源列表（待开发） </h2>
        <Button>新增资源</Button>
        <div style={{ height: '5px' }}></div>
        <Table dataSource={ data } columns={ columns } />
      </div>
    );
  }
}

export default ResourceList;
