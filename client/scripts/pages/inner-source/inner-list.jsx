import React from 'react';

import page from 'epm-ui-boot/page';
import { Card } from 'epm-ui-react';


export default function ( { text='查看详细开源信息', data=[], type='inner-source' } ) {
  return data.map(( item, index ) => <Item key={ item.id+ '-' + index } data={ item } text={ text } type={ type }/>)
};

function Item( { data = {}, text='', type='' } = {} ) {
  return (
    <Card
      style = { {
        wordBreak: 'break-all',
        width: '25%',
        display: 'flex',
        flexDirection: 'column',
        float: 'none',
        padding: '1em 2em',
        margin: '1.5em'
      } }
      onClick={ () => {
        window.open( `${page.basename}/inner-source/details?id=${data.id}`, '_self' );
      } } >
        <Card.Header>
          <h5 style={{ fontWeight: 'bolder', fontSize: '1.3em' }}>{ data.title }</h5>
        </Card.Header>
        <Card.Body style={{flexGrow: 1, }}>
          <p>{ data.description }</p>
        </Card.Body>
        <Card.Footer style={{flexGrow: 0, textAlign: 'center'}}>
          <a href={ `${page.basename}/inner-source/details?id=${data.id}` }>{ text }</a>
        </Card.Footer>
    </Card>
  )
}
