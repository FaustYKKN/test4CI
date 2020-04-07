import React, { Component } from 'react';
import Footer from './footer';
import Nav from './navgation';
import { Snackbar, popup, Modal } from 'epm-ui-react';

export default class Layout extends Component {
  constructor ( props ) {
    super( props );
  }

  componentDidMount() {
    // this.snackbar = <Snackbar message="由于公司 GitLab API 更新，开源功能暂时受到影响。" actionText="详情" duration={ 12 } onAction={ this.popupInfo } />;
    // popup( this.snackbar );
  }

  // popupInfo () {
  //   popup( <Modal size='medium'>
  //     <Modal.Header>
  //       <span>非常抱歉！</span>
  //     </Modal.Header>
  //     <Modal.Body>
  //       <p>由于公司 GitLab API 更新，您暂无法通过此页面添加开源项目和申请开源代码权限😟，正在抓紧抢修中。。。</p>
  //       <p>添加开源项目需开发者社区更新后开放。</p>
  //       <p>若您想申请开源代码权限，您可以向 <a href="mailto:zhangqingxuan@bonc.com.cn">liuwenquan@bonc.com.cn</a> 发送邮件申请，格式如下：</p>
  //       <p style={{ color: 'rgb(108, 117, 130)' }}><em>姓名 + 工号 + 部门 + 要操作的 GitLab 账号 ID（通常为姓名）。</em></p>
  //       <p>我们之后将尽快通过邮件向您反馈，请您留意。</p>
  //       <p style={{ fontWeight: 900 }}>祝您身体健康~</p>
  //     </Modal.Body>
  //   </Modal> );
  // }

  render () {

    return (
      <div>
        <Nav currentIndex={ this.props.currentIndex ? this.props.currentIndex : 0 } aIndex={ this.props.aIndex }/>

        { this.props.children }

        <Footer/>
      </div>
    );
  }
}
