import React from 'react';

import { Card } from 'epm-ui-react'

import page from 'epm-ui-boot/page'
let apiHost;

/*
* props: type: 'inner-source' | 'production' | 'resource'
* */

export default function ( { text='查看详情', data=[], type='inner-source' } ) {
  apiHost = `${page.basename}/api`
  return data.map(( item, index ) => <Item key={ item.id+ '-' + index } data={ item } text={ text } type={ type }/>)
};


function Item( { data = {}, text='', type='' } = {} ) {
  return (
    <Card style={{ maxWidth: '450px', minWidth: '350px', display: 'inline-block', padding: '1em 2em', margin: '1.5em'}}>
      <h5 style={{ fontWeight: '500', fontSize: '1.3em' }}>{ data.title }</h5>
      <p>{ data.description }</p>
      <hr/>
      <a href={ `${apiHost}/${type}?id=${data.id}` }>{ text }</a>
      {/* <a href={ `${page.basename}/${data.url}` }>{ text }</a> */}
    </Card>
  )
}