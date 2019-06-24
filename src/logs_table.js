import React from 'react';
import {
  Table
} from 'antd';


const columns = [{
  title: 'Timestamp',
  dataIndex: 'timestamp',
  width: 200,
  defaultSortOrder: 'descend',
  sorter: (a, b) => a.timestamp - b.timestamp,
}, {
  title: 'EventType',
  dataIndex: 'type',
  width: 150,
  filters: [{
    text: 'Events',
    value: 'monitor/events',
  }, {
    text: 'Properties',
    value: 'monitor/properties',
  }, {
    text: 'Functions',
    value: 'monitor/functions ',
  }],
  onFilter: (value, record) => record.type.indexOf(value) === 0,
}, {
  title: 'Message',
  dataIndex: 'message',
}];

class LogTable extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      data: props.data,
      loading: false,
    };
  }
 
  render() {
    return ( <
      Table columns = {
        columns
      }

      rowKey = {
        record => record.timestamp
      }

      dataSource = {
        this.state.data
      }
      pagination = {
        {
          pageSize: 20
        }
      }
      scroll = {
        {
          y: 340
        }
      }
      size="small"
      loading = {
        this.state.loading
      }
      />
    );
  }
}


export default LogTable;