import React from 'react';
import Table from 'antd/lib/table';
import Card from 'antd/lib/card';
import AbstractWidget from '../AbstractWidget.js';

class Counters extends AbstractWidget {
        
    render() {
        const data = this.getData();
        
        const columns = [
            { title: 'Name', dataIndex: 'name', key: 'name', fixed: 'left' },
            { title: 'Count', dataIndex: 'count', key: 'count', align: 'right' }
        ];
        
        return (
            <Card title="Counters" className="dwm-core">
                <Table dataSource={data} columns={columns} pagination={{ pageSize: 5 }} size="middle"/>
            </Card>
        );
    }
}

export default Counters;
