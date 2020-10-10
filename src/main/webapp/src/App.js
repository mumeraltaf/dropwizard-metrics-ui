import React, { Component } from 'react';
import { Layout } from 'antd';
import Menu from 'antd/lib/menu';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Affix from 'antd/lib/affix';
import Card from 'antd/lib/card';

import OverviewWidget from './widgets/OverviewWidget.js'
import JvmWidget from './widgets/JvmWidget.js'
import RequestsWidget from './widgets/RequestsWidget.js'
import MetricsWidget from './widgets/MetricsWidget.js'
import LogWidget from './widgets/LogWidget.js'

import './App.scss';

const { Header, Footer, Sider, Content } = Layout;

import { Tabs } from 'antd';

const { TabPane } = Tabs;


function callback(key) {
  // console.log(key);
}

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: {
                gauges: {},
                counters: {},
                histograms: {},
                meters: {},
                timers: {}
            }
        };
    }

    componentDidMount() {
        this.timer();
        this.interval = setInterval(this.timer.bind(this), 1000);
    }

    componentWillUnmount() {
       clearInterval(this.interval);
    }

    timer() {
        fetch('/admin/metrics')
            .then(response => response.json())
            .then(responseJson => this.setState({
                ts: new Date(),
                data: responseJson
            }));
    }


  render() {
    return (
        <>
          <Layout>
          <Affix>
            <Header>
              <div className="title">METRICS</div>
              <span className="timestamp">{ this.state.ts && this.state.ts.toGMTString() }</span>
            </Header>
          </Affix>
          <Content style={{margin: '0 40px' }}>
            <Tabs defaultActiveKey="1" onChange={callback}>
              <TabPane tab="System" key="1">
            <Row gutter={16}>
              <Col span={24}>
                <OverviewWidget data={this.state.data}/>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <JvmWidget data={this.state.data}/>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <RequestsWidget data={this.state.data}/>
              </Col>
            </Row>
                <Row gutter={16}>
                  <Col span={24}>
                    <LogWidget data={this.state.data}/>
                  </Col>
                </Row>
              </TabPane>
              <TabPane tab="Metrics" key="2">
                <Row gutter={16}>
                  <Col span={24}>
                    <MetricsWidget data={this.state.data}/>
                  </Col>
                </Row>              </TabPane>
            </Tabs>
          </Content>
          <Footer style={{textAlign: 'center' }}>
            © 2020 Created by <a src="https://github.com/mumeraltaf">Umer Altaf</a> &nbsp;&bull;&nbsp; Fork me on <a src="https://github.com/mumeraltaf/dropwizard-metrics-ui">GitHub</a> &nbsp;&bull;&nbsp; <a src="https://opensource.org/licenses/MIT">MIT License</a> &nbsp;&bull;&nbsp; Created using <a src="https://www.dropwizard.io/">Dropwizard</a>, <a src="https://ant.design/">Ant Design</a>, <a src="https://reactjs.org/">React</a> and <a src="https://recharts.org/">Recharts</a>
          </Footer>
        </Layout>
          </>
    );
  }
}

export default App;
