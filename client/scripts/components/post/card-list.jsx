import React, { PureComponent } from 'react';

import page from 'epm-ui-boot/page';
import { Card } from 'epm-ui-react';

export default class CardList extends PureComponent {

  render() {
    const { text, data = [], type = "" } = this.props;

    return (
      data.map((item, index) => {
        return (
          <div
            key={ index }
            className="docsCard"
            style={{
              textDecoration: 'none',
            }}
            href= { type === 'inner-source' ? `${page.basename}/${ type }/detail/${item.id}` : `${page.basename}/${ type }/${item.id}` }
          >
            <Card
              style={ {
                wordBreak: 'break-all',
                display: 'flex',
                flexDirection: 'column',
                float: 'none',
                padding: '1em 2em',
                margin: '1.5em',
                flexGrow: 1
              } }
              key={ index }
              onClick={ () => {
                  if ( type === 'inner-source' ) {
                      window.open( `${page.basename}/${ type }/detail/${item.id}`, '_self' );
                  } else {
                      window.open( `${page.basename}/${ type }/${item.id}`, '_self' );
                  }
              }}
            >
              <Card.Header
                style={ {
                  paddingLeft: '1rem',
                  paddingRight: '1rem'
                } }>
                <h5 style={{ fontWeight: 900, fontSize: '1.3em' }}>{item.title}</h5>
              </Card.Header>
              <Card.Body
                style={ {
                  flexGrow: 1,
                  paddingLeft: '1rem',
                  paddingRight: '1rem'
                } }
              >
                <p>{item.description}</p>
              </Card.Body>
              <Card.Footer
                style={ {
                  flexGrow: 0,
                  paddingBottom: 0,
                  textAlign: 'center'
                } }
              >
                <a>查看详情</a>
              </Card.Footer>
            </Card>
          </div>
        );
      })
    );
  }
}
