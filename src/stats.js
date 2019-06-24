import React from 'react';
import { Statistic, Row, Col, Icon, Card } from 'antd';
import PropertyTable from './properties_table';

class Stats extends React.Component {

    render() {
        return (
            <div>
            <Row gutter={16}>
                <Col span={6}>
                <Card><Statistic title="Nb of Messages emitted" value={this.props.cpt} prefix={<Icon type="mail" />} /></Card>
                </Col>
                <Col span={6}>
                <Card><Statistic title="Time entered in current state" value={this.props.new.timestamp} prefix={<Icon type="clock-circle" />} /></Card>
                </Col>
                <Col span={6}>
                <Card><Statistic title="Previous state" value={this.props.last.inst} prefix={<Icon type="logout" />} /></Card>
                </Col>
                <Col span={6}>
                <Card><Statistic title="Current State" value={this.props.new.inst} prefix={<Icon type="login" />} /></Card>
                </Col>
            </Row><br/>
            <Row gutter={16}>
                <Col span={12}>
                <PropertyTable data={this.props.prop}/>
                </Col>
                <Col span={6}>
                <Card><Statistic title="Main State" value="" prefix={<Icon type="exclamation-circle" />} /></Card>
                </Col>
                <Col span={6}>
                <Card><Statistic title="Time spent in Current State" value={Math.floor(this.props.new.timestamp_detailed - Date.now())} prefix={<Icon type="fire" />} /></Card>
                </Col>
            </Row>
            </div>
        );
    }
}

export default Stats;