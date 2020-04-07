import React, { Component } from 'react';
import { Row, Statistic, Icon, Divider } from 'epm-ui-react';
import page from 'epm-ui-boot/page';

class Overview extends Component {

  constructor( props ) {
    super( props );
    this.state = { 
      runtime: 5890320,
      overviewData: {
        "userTotal": 0,
        "userNewAdd": 0,
        "postTotal": 0,
        "postNewAdd": 0,
        "resourceTotal": 0,
        "resourceNewAdd": 0,
        "innerSourceTotal": 0,
        "innerSourceNewAdd": 0
      }
    };

    this.timer = null;

    this.getAdminData = this.getAdminData.bind( this );
  }

  componentDidMount() {
    this.timer = setInterval( () => this.setState( { runtime: this.state.runtime + 1 } ), 1000 );
    this.getAdminData();
  }

  componentWillUnmount() {
    clearInterval( this.timer );
    this.timer = null;
  }

  getAdminData() {
    fetch( `${ page.basename }/api/admin/all` )
    .then( res => res.json() )
    .then( data => this.setState( { overviewData: data.data } ) )
  }

  render() {
    const {} = this.props;
    const { runtime, overviewData } = this.state;

    const days = Math.floor( runtime / 60 / 60 / 24 );
    const hours = Math.floor( runtime / 60 / 60 % 24 );
    const minutes = Math.floor( runtime / 60 % 60 );
    const seconds = runtime % 60;
    
    return (
      <div style={{ width: '100%' }}>
        <Row columns={ 2 }>
          <Row.Col>
            <h2 style={{ borderBottom: '1px solid rgb(136, 136, 141)', mariginBottom: '5px', paddingBottom: '10px' }}> 用户信息 </h2>
            <Row columns={ 3 } style={{ padding: '10px 10px' }}>
              <Row.Col>
                <Statistic title='用户总数' value={ overviewData.userTotal } prefix={ <Icon icon='team' /> } />
              </Row.Col>
              <Row.Col>
                <Statistic title='本月新增' value={ overviewData.userNewAdd } prefix={ <Icon icon='user' /> } />
              </Row.Col>
              <Row.Col>
                <Statistic 
                  title='新增百分比' 
                  value={ ( overviewData.userNewAdd / overviewData.userTotal * 100 ) || 0 } 
                  decimal={ 2 } 
                  prefix={ <Icon icon='arrow-up' /> } 
                  suffix='%'
                  valueStyle={ { color: '#090' } }/>
              </Row.Col>
            </Row>
          </Row.Col>
          <Row.Col>
            <h2 style={{ borderBottom: '1px solid rgb(136, 136, 141)', mariginBottom: '5px', paddingBottom: '10px' }}> 系统信息 </h2>
            <Row columns={ 3 } style={{ padding: '10px 10px' }}>
              <Row.Col>
                <Statistic title='当前系统已运行' value={ `${ days } 天 ${ hours } 时 ${ minutes } 分 ${ seconds } 秒` } />
              </Row.Col>
              <Row.Col>
                <Statistic title='收到请求' value={ 13682 } suffix='次' />
              </Row.Col>
              <Row.Col>
                <Statistic title='失败请求' value={ 698} suffix='次' />
              </Row.Col>
            </Row>
          </Row.Col>
        </Row>
        
        <Divider />

        <Row columns={ 2 }>
          <Row.Col>
            <h2 style={{ borderBottom: '1px solid rgb(136, 136, 141)', mariginBottom: '5px', paddingBottom: '10px' }}> 产品信息 </h2>
            <Row columns={ 3 } style={{ padding: '10px 10px' }}>
              <Row.Col>
                <Statistic title='产品总数' value={ overviewData.postTotal } />
              </Row.Col>
              <Row.Col>
                <Statistic title='本月新增' value={ overviewData.postNewAdd } />
              </Row.Col>
              <Row.Col>
                <Statistic 
                  title='新增百分比' 
                  value={ ( overviewData.postNewAdd / overviewData.postTotal * 100 ) || 0 } 
                  decimal={ 2 }
                  prefix={ <Icon icon='arrow-up' /> } 
                  suffix='%' 
                  valueStyle={ { color: '#090' } }/>
              </Row.Col>
            </Row>
          </Row.Col>
          <Row.Col>
            <h2 style={{ borderBottom: '1px solid rgb(136, 136, 141)', mariginBottom: '5px', paddingBottom: '10px' }}> 资源下载 </h2>
            <Row columns={ 3 } style={{ padding: '10px 10px' }}>
              <Row.Col>
                <Statistic title='资源总数' value={ overviewData.resourceTotal } />
              </Row.Col>
              <Row.Col>
                <Statistic title='本月新增' value={ overviewData.resourceNewAdd } />
              </Row.Col>
              <Row.Col>
                <Statistic 
                  title='新增百分比' 
                  value={ ( overviewData.resourceNewAdd / overviewData.resourceTotal * 100 ) || 0 } 
                  decimal={ 2 } 
                  prefix={ <Icon icon='arrow-up' /> } 
                  suffix='%' 
                  valueStyle={ { color: '#090' } }/>
              </Row.Col>
            </Row>
          </Row.Col>
        </Row>
        
        <Divider />

        <Row columns={ 2 }>
          <Row.Col>
            <h2 style={{ borderBottom: '1px solid rgb(136, 136, 141)', mariginBottom: '5px', paddingBottom: '10px' }}> 开源信息 </h2>
            <Row columns={ 3 } style={{ padding: '10px 10px' }}>
              <Row.Col>
                <Statistic title='开源项目总数' value={ overviewData.innerSourceTotal } />
              </Row.Col>
              <Row.Col>
                <Statistic title='本月新增' value={ overviewData.innerSourceNewAdd } />
              </Row.Col>
              <Row.Col>
                <Statistic 
                  title='新增百分比' 
                  value={ ( overviewData.innerSourceNewAdd / overviewData.innerSourceTotal * 100 ) || 0 } 
                  decimal={ 2 } 
                  prefix={ <Icon icon='arrow-up' /> } 
                  suffix='%' 
                  valueStyle={ { color: '#090' } }/>
              </Row.Col>
            </Row>
          </Row.Col>
          <Row.Col>
            <h2 style={{ borderBottom: '1px solid rgb(136, 136, 141)', mariginBottom: '5px', paddingBottom: '10px' }}> 发帖总数 </h2>
            <Row columns={ 3 } style={{ padding: '10px 10px' }}>
              <Row.Col>
                <Statistic title='发帖总数' value={ 2443 } />
              </Row.Col>
              <Row.Col>
                <Statistic title='本月新增' value={ 497 } />
              </Row.Col>
              <Row.Col>
                <Statistic title='新增百分比' value={ 497/2443 * 100 } decimal={ 2 } prefix={ <Icon icon='arrow-up' /> } suffix='%' valueStyle={ { color: '#090' } }/>
              </Row.Col>
            </Row>
          </Row.Col>
        </Row>
      </div>
    );
  }
}

export default Overview;