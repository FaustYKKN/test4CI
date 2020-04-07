import React from 'react';
import CardList from '../components/item-list'
import Layout from '../layouts/default'
import page from 'epm-ui-boot/page'
const apiHost = `${page.basename}/api`;

export default class Download extends React.Component {
    constructor( props ) {
        super(props);
        this.state = {
            data: []
        }
    }

    componentDidMount() {
        fetch( `${apiHost}/resource` )
            .then( res => res.json() )
            .then( res => {
                if( res.code === 200 ){
                    this.setState( {
                        data: res.data,
                    } )
                }
            } )

    }

    render() {
        const { data } = this.state;
        const inlineStyle = {
            display: 'inline-block',
            width: '100%'
        }
        return (
            <Layout currentIndex={4}>
                <div style={{ boxSizing: 'content-box',textAlign: 'center', padding: '10em 0', background: '#ccc' }}>
                    <h2 style={inlineStyle}>资源下载</h2>
                    <p style={inlineStyle}>提供丰富的开发工具本地下载使用</p>
                </div>
                <div style={{  margin: '10px auto 0', width: '85em', maxWidth: '90vw', minWidth: '85vw', minHeight: '100vh' }}>
                    <CardList data={ data } text='立即下载' type='resource'/>
                </div>

            </Layout>
        )
    }
}
