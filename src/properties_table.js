import React from 'react';
import {
    Table
} from 'antd';


const columns = [{
    title: 'PropertyName',
    dataIndex: 'key',
    width: 150,
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.key - b.key,
}, {
    title: 'Thing',
    dataIndex: 'thing',
    width: 150,
}, {
    title: 'Value',
    dataIndex: 'val',
}];

class PropertiesTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
        };
    }

    render() {
        
        return ( <
            Table columns = {
                columns
            }

            rowKey = {
                record => record.key
            }

            dataSource = {
                this.props.data
            }
            pagination = {
                {
                    pageSize: 4
                }
            }
            
            loading = {
                this.state.loading
              }

            size="small"
            /
            >
        );
    }

}


export default PropertiesTable;