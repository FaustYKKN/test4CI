import React, { Component } from 'react';
import { Container, Row, Divider, Form, Input, Select, RadioGroup, Radio, Button, Alert, popup } from 'epm-ui-react';
import page from 'epm-ui-boot/page';
import fetchWithTdssToken from '../../../utils/fetchWithTdssToken';
import { tdsServerUrl } from '../../../configs/url';

export default class DocsDetail extends Component {
  constructor ( props ) {
    super( props );

    this.state = {
      isBuilding: false
    };

    this.buildDocument = this.buildDocument.bind( this );
  }

  async buildDocument () {
    await this.setState( { isBuilding: true } );
    const { id } = this.props.dataSource;
    const res = await fetchWithTdssToken( tdsServerUrl.document.buildDocument( id, page.context.tdssUrl ) );

    if ( res.status === 200 ) {
      const buildInfo = await res.json();
      const { message, buildStatus } = buildInfo;

      popup(
        <Alert
          message={ message }
          type={ buildStatus ?
            'success' :
            'danger' }
          dismissible
          delay={ 6 }
        /> );
    } else {
      const errorInfo = await res.json();
      popup(
        <Alert
          message={ `
${ errorInfo.message }
${ errorInfo.err }
          ` }
          type={ 'danger' }
          dismissible
          delay={ 6 }
        /> );
    }

    await this.setState( { isBuilding: false } );
  }

  render () {
    const { isBuilding } = this.state;
    const { id, name, desc, createdAt, updatedAt } = this.props.dataSource;

    return (
      <Container
        type="fluid"
        style={ { minHeight: '50vh' } }
      >
        <h3>{ name }</h3>
        <Button
          type="primary"
          disabled={ isBuilding }
          onClick={ () => {
            this.buildDocument();
          } }
        >
          {
            isBuilding ?
              '正在同步文档...' :
              '同步文档'
          }
        </Button>
        <p>
          { desc }
        </p>
        <Divider />
        <div>创建时间：{ new Date( createdAt ).toLocaleString() }</div>
        <div>配置更新时间：{ new Date( updatedAt ).toLocaleString() }</div>
      </Container>
    );
  }

}
