import React from 'react';
import { Table } from 'antd';
import { connect } from 'dva';

@connect(({ stay: { stayDetail } }) => ({
  stayDetail,
}))
class StayDetailComponent extends React.Component {
  render() {
    const columns = [
      {
        title: '收派员',
        dataIndex: 'name',
        key: 'name',
        align: 'center',
        fixed: 'left',
      },
      { title: '电话', dataIndex: 'telephone', key: 'telephone', align: 'center' },
      { title: '运单号', dataIndex: 'orderNum', key: 'orderNum', align: 'center' },
      { title: '产品类型', dataIndex: 'proType', key: 'proType', align: 'center' },
      { title: '客户类型', dataIndex: 'cusType', key: 'cusType', align: 'center' },
      { title: '滞留次数', dataIndex: 'stayTimes', key: 'stayTimes', align: 'center' },
      {
        title: '最新滞留时间',
        dataIndex: 'latestStayTime',
        key: 'latestStayTime',
        align: 'center',
      },
      {
        title: '滞留原因代码',
        dataIndex: 'stayReason',
        key: 'stayReason',
        align: 'center',
      },
      {
        title: '催派次数',
        dataIndex: 'remindTimes',
        key: 'remindTimes',
        align: 'center',
      },
      {
        title: '最新催派时间',
        dataIndex: 'latestRemindTime',
        key: 'latestRemindTime',
        align: 'center',
      },
    ];
    return <Table columns={columns} dataSource={this.props.stayDetail} scroll={{ x: 800 }} />;
  }
}

export default StayDetailComponent;
