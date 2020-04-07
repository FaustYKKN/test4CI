import React, { Component } from 'react';
import { Container, List, Row, Divider, Img } from 'epm-ui-react';
import page from 'epm-ui-boot/page';
import '../../styles/footer.css';

class Footer extends Component {

  render() {

    return (
      <div>
        <div className="mh_footer">
          <Container type="fluid">
            <Row style={{display: 'flex',justifyContent: 'space-between'}}>
              <Row.Col size={ 5 } >
                <h4>关于我们</h4>
                <List size='mini'>
                  <List.Item content={ <a target = "_blank" href="http://www.bonc.com.cn/index.php/about/gsjs">公司介绍</a> } />
                  <List.Item content={ <a target = "_blank" href="http://www.bonc.com.cn/index.php/about/zzry">荣誉资质</a> } />
                  <List.Item content={ <a target = "_blank" href="http://www.bonc.com.cn/index.php/about/qywh">企业文化</a> } />
                  <List.Item content={ <a target = "_blank" href="http://www.bonc.com.cn/index.php/joinus/joinus">人才招聘</a> } />
                  <List.Item content={ <a target = "_blank" href="http://www.bonc.com.cn/index.php/about/lxwm">联系我们</a> } />
                </List>
              </Row.Col>

              <Row.Col size={ 5 } >
                <h4>产品与服务</h4>
                <List size='mini'>
                  <List.Item content={ <a target = "_blank" href="http://tech.bonc.local/community/topic/24/%E4%BC%81%E4%B8%9A%E7%BA%A7%E5%BC%80%E5%8F%91%E5%B9%B3%E5%8F%B0-%E9%A1%B9%E7%9B%AE%E5%8F%8A%E8%B4%9F%E8%B4%A3%E4%BA%BA%E8%81%94%E7%B3%BB%E6%96%B9%E5%BC%8F">项目 & 负责人联系方式</a> }/>
                  <List.Item content={ <a target = "_blank" href="http://172.16.32.135/cas/login?service=http%3A%2F%2F172.16.32.135%2Fportal%2FpageView%3Bjsessionid%3DDFB284EB657B2D0A4E139F8748B8A727%3FpageId%3Dindex">企业应用开发平台</a> } />
                  <List.Item content={ <a target = "_blank" href="http://172.16.11.21:6131/mmc-show/">Ares 移动开发平台</a> }/>
                  <List.Item content={ <a target = "_blank" href="http://172.16.11.51:9763/publisher">API Manager</a> }/>
                  <List.Item content={ <a target = "_blank" href="https://code.bonc.com.cn/inner-source">代码库</a> }/>
                </List>
              </Row.Col>

              <Row.Col size={ 5 }>
                <h4>快速链接</h4>
                <List size='mini'>
                  <List.Item content={ <a href={`${ page.basename }/`}>首页</a> }/>
                  <List.Item content={ <a href={ `${ page.basename }/docs-study/index` }>文档中心</a> }/>
                  <List.Item content={ <a href={`${ page.basename }/download`}>资源下载</a> }/>
                </List>
              </Row.Col>

              <Row.Col size={ 9 } className={'footerBorder'} style={{paddingLeft: '50px'}}>
                <h4>服务热线</h4>
                <List size='mini'>
                  <List.Item content={ <span style={{ fontSize: '20px',fontWeight: 700}}>+86-10-8486 6666</span> }/>
                </List>
                <List size='mini'>
                  <Row>
                    <Row.Col size={ { sm: 24, md: 24, lg: 10  } }>
                      <List.Item content={ <span>投资洽谈</span> }/>
                      <List.Item content={ <span>investor@bonc.com.cn</span> }/>
                    </Row.Col>
                    <Row.Col size={ { sm: 24, md: 24, lg: 10  } }>
                      <List.Item content={ <span>商务合作</span> }/>
                      <List.Item content={ <span>investor@bonc.com.cn</span> }/>
                    </Row.Col>
                  </Row>
                </List>
                <List size='mini'>
                  <List.Item content={ <span>关注我们</span> }/>
                  <List.Item content={ <Img src={ `${ page.basename }/images/wechat.jpg` }/> } style={{ width:'60px',height:'60px' }}/>
                </List>
              </Row.Col>
            </Row>
            <Row style={{display: 'flex',justifyContent: 'space-between'}}>
              <Row.Col size={ { sm: 24, md: 12, lg: 12 } } >
                <p style={{ color: '#ccc', textAlign: 'center', padding: '1rem 0', borderTop: '1px solid #ccc', marginTop: '3.5rem', marginBottom: '0.5rem' }}>Powered by <a target="_blank" href="http://fet.bonc.local">FET</a> | Copyright&nbsp;&nbsp;©&nbsp;2019&nbsp;&nbsp;<a href="https://www.bonc.com.cn/" target="_blank">BON Corporation</a>&nbsp;&nbsp;All Rights Reserved.</p>
              </Row.Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}

export default Footer;
