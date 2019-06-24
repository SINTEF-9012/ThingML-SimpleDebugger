
import React from 'react';
import 'antd/dist/antd.css';
import './index.css';
import {
  Layout, Menu, Icon,
} from 'antd';
import LogTable from './logs_table';
import UML from './uml';
import Stats from './stats';
import {
  Route,
  Link
} from 'react-router-dom';
import {
  connect
} from 'mqtt';

const {
  Header, Content, Footer, Sider,
} = Layout;
const SubMenu = Menu.SubMenu;

class SiderDemo extends React.Component {
  state = {
    lastMsg: {'timestamp':0},
    cpt: 0,
    properties: [],
    data:[],
    collapsed: true,
  };

  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  }

  componentDidMount() {
    this.subscribe(this);
  }

  subscribe = (that) => {
    var resultMap=[];
    var startTime= Date.now();

    const client = connect('ws://127.0.0.1:9001');
    var toPush = that.state.data;
    var tmp = {};
    var last_message_handled={};
    last_message_handled.timestamp=0;
    var plop={};
    var cpt=0;
    
    client.on('connect', function () {
      client.subscribe('log/property_changed');
      client.subscribe('log/function_called');
      client.subscribe('log/message_sent');
      client.subscribe('log/message_handled');
      client.subscribe('log/message_lost');
    });

    setInterval(function(){
      that.setState({
        lastMsg: last_message_handled,
        cpt:cpt,
        properties: resultMap,
        data: toPush,
      });
    }, 500);

    client.on('message', function (topic, message) {
      var startTime_utc = new Date();
      tmp = {};
      cpt++;
      var res = message.toString();
      var timestamp = startTime+ performance.now();
      var json_res = JSON.parse(res);
      var as_string = "";
      for (var p in json_res) {
        as_string += p + "=" + JSON.stringify(json_res[p]) + "; ";
      }
      tmp.timestamp = timestamp;
      tmp.type = topic;
      tmp.message = as_string;
      toPush.push(tmp);
      
      if(topic === 'log/message_handled'){
        last_message_handled=json_res;
        last_message_handled.timestamp=startTime_utc.toLocaleTimeString();
        last_message_handled.timestamp_detailed=timestamp;
      }

      if(topic === "log/property_changed"){
        var found=false;
        for(var elem in resultMap){
          if(resultMap[elem].key === json_res.prop_name){
            resultMap[elem].val=json_res.new_value;
            found=true;
          }
        }
        if(!found){
          plop={};
          plop.key=json_res.prop_name;
          plop.val=json_res.new_value;
          plop.thing=json_res.inst;
          resultMap.push(plop);
        }
      }
      if(toPush.length >= 200){
        toPush.shift();
      }
    });
  }


  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1" >
              <Icon type="pie-chart" /><span>Statistics</span>
              <Link to="/stats">Statistics</Link>
            </Menu.Item>
            <SubMenu
              key="sub1"
              title={<span><Icon type="desktop" /><span>View</span></span>}
            >
              <Menu.Item key="3"><Link to="/component">Component</Link></Menu.Item>
              <Menu.Item key="4"><Link to="/class">Class</Link></Menu.Item>
              <Menu.Item key="5"><Link to="/datatypes">Datatypes</Link></Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub2"
              title={<span><Icon type="file" /><span>Advanced</span></span>}
            >
              <Menu.Item key="6">Kibana</Menu.Item>
              <Menu.Item key="8">Logstash</Menu.Item>
            </SubMenu>
            <Menu.Item key="9">
              <Icon type="question-circle" />
              <span>Help</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header theme="dark" style={{  padding: 0 }}>
            <div className="logo" />
          </Header>
          <Content style={{ margin: '0 2px' }}>
          <div id="uml" style={{ padding: 1, background: '#fff', minHeight: 360 }}>
            <Stats data={this.state.data} new={this.state.lastMsg} cpt={this.state.cpt} prop={this.state.properties} />
            <Route path="/component" component={()=><UML type="components"/>}/>
            <Route path="/class" component={()=><UML type="class"/>}/>
            <Route path="/datatypes" component={()=><UML type="datatypes"/>}/>
            <br/></div>
            <div style={{ padding: 1, background: '#fff', minHeight: 360 }}>
              <LogTable data={this.state.data} />
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            ENACT ©2018
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

export default SiderDemo;
          