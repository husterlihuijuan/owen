import React from 'react';
import { Form, DatePicker, Input, Button, Select, Table, Icon, Modal, Row, Col } from 'antd';
import { connect } from 'dva';
import './stay.less';
import moment from 'moment';
import StayDetailComponent from './StayDetailComponent';

const { RangePicker } = DatePicker;
const { Option } = Select;

@Form.create()
@connect(({ stay: { data, pageInfo } }) => ({
  data,
  pageInfo,
}))
class Stay extends React.Component {
  state = {
    pagination: {}, // pageSize每页条数，current当前页数 total总数据量
    params: {
      date: [
        moment()
          .subtract(10, 'days')
          .format('YYYY-MM-DD'),
        moment().format('YYYY-MM-DD'), // 一开始显示的是10天的数据
      ],
      timeUnit: 1,
      dimension: 'site',
    },
    options: [
      { value: 0, text: '小时', disabled: true },
      { value: 1, text: '天', disabled: false },
      { value: 2, text: '周', disabled: false },
      { value: 3, text: '月', disabled: true },
      { value: 4, text: '季度', disabled: true },
    ],
    visible: false,
    detailDate: '',
    detailArea: '',
    detailDeptCode: '',
  };

  componentWillMount() {
    this.checkData(this.state.params);
  }

  checkData = params => {
    this.props
      .dispatch({
        type: 'stay/checkCurrentDate',
        payload: params,
      })
      .then(() => {
        const { curr: current, pageSize } = this.props.pageInfo;
        this.setState({
          pagination: { current, pageSize },
        });
      });
  };

  changeRangeDate = dates => {
    const diff = dates[1].diff(dates[0], 'days');

    if (diff === 0) {
      this.setState(prevState => {
        prevState.options.forEach((val, index) => {
          if (index === 0) {
            val.disabled = false;
          } else {
            val.disabled = true;
          }
        });
        prevState.params.timeUnit = 0;
        return {
          options: prevState.options,
          params: prevState.params,
        };
      });
    } else if (diff > 0 && diff < 8) {
      this.setState(prevState => {
        prevState.options.forEach((val, index) => {
          if (index === 1) {
            val.disabled = false;
          } else {
            val.disabled = true;
          }
        });
        prevState.params.timeUnit = 1;
        return {
          options: prevState.options,
          params: prevState.params,
        };
      });
    } else if (diff > 8 && diff < 31) {
      this.setState(prevState => {
        prevState.options.forEach((val, index) => {
          if (index === 1 || index === 2) {
            val.disabled = false;
          } else {
            val.disabled = true;
          }
        });
        prevState.params.timeUnit = 1;
        return {
          options: prevState.options,
          params: prevState.params,
        };
      });
    } else if (diff > 31) {
      this.setState(prevState => {
        prevState.options.forEach((val, index) => {
          if (index === 1 || index === 2 || index === 3) {
            val.disabled = false;
          } else {
            val.disabled = true;
          }
        });
        prevState.params.timeUnit = 1;
        return {
          options: prevState.options,
          params: prevState.params,
        };
      });
    }
  };

  handleTableChange = pagination => {
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    this.setState(pre => ({
      pagination: pager,
    }));
  };

  handleSubmit = e => {
    e.preventDefault();
    const params = this.props.form.getFieldsValue();
    const rangeTime = this.props.form.getFieldValue('date');
    params.date = [rangeTime[0].format('YYYY-MM-DD'), rangeTime[1].format('YYYY-MM-DD')];
    this.checkData(params);
  };

  stayDetail = record => {
    this.setState({
      visible: true,
      detailDate: record.date,
      detailArea: record.area,
      detailDeptCode: record.deptCode,
    });
    this.props.dispatch({
      type: 'stay/checkStayDetail',
      payload: record,
    });
  };

  // expandedRowRender = record => {
  //   return <StayDetailComponent record={record} />;
  // };
  handleOk = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    const options = this.state.options.map(d => {
      return (
        <Option key={d.value} value={d.value} disabled={d.disabled}>
          {d.text}
        </Option>
      );
    });
    const { getFieldDecorator } = this.props.form;

    const columns = [
      {
        title: '时间',
        dataIndex: 'date',
        key: 'date',
        align: 'center',
      },
      {
        title: '区部',
        dataIndex: 'area',
        key: 'area',
        align: 'center',
      },
      {
        title: '网点',
        dataIndex: 'deptCode',
        key: 'deptCode',
        align: 'center',
      },
      {
        title: '产品类型',
        dataIndex: 'productType',
        key: 'productType',
        align: 'center',
      },
      {
        title: '滞留件量',
        dataIndex: 'retentionNum',
        key: 'retentionNum',
        align: 'center',
        render: (text, record) => <a onClick={() => this.stayDetail(record)}>{text}</a>,
      },
    ];
    return (
      <div className="stay-container">
        <Form layout="inline" onSubmit={this.handleSubmit}>
          <Form.Item label="查询日期">
            {getFieldDecorator('date', {
              initialValue: [moment().subtract(10, 'days'), moment()],
            })(<RangePicker style={{ width: '220px' }} onChange={this.changeRangeDate} />)}
          </Form.Item>

          <Form.Item label="时间粒度">
            {getFieldDecorator('timeUnit', {
              initialValue: this.state.params.timeUnit,
            })(<Select style={{ width: 200 }}>{options}</Select>)}
          </Form.Item>

          <Form.Item label="滞留原因代码">{getFieldDecorator('stayReason')(<Input />)}</Form.Item>

          <Form.Item label="显示网点维度">
            {getFieldDecorator('dimension', {
              initialValue: '0',
            })(
              <Select style={{ width: 200 }}>
                <Option value="0">站点</Option>
                <Option value="1">分部</Option>
              </Select>,
            )}
          </Form.Item>

          <Form.Item label="地区代码">
            {getFieldDecorator('areaCode')(<Input placeholder="区部代码/站点代码" />)}
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              查询
            </Button>
          </Form.Item>
        </Form>
        <div className="table-title">
          <Icon type="appstore" />
          <span>滞留件统计明细</span>
          {/* <Button type="primary" icon="download">
            导出
          </Button> */}
          <Button type="default" className="download">
            导出
          </Button>
        </div>
        <Table
          dataSource={this.props.data}
          columns={columns}
          pagination={this.state.pagination}
          onChange={this.handleTableChange}
          rowKey="key"
        />
        <Modal
          title="详细信息"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleOk}
          className="detail-modal"
          centered
          footer={[
            <Button key="back" onClick={this.handleOk}>
              关闭
            </Button>,
          ]}
        >
          <Row>
            <Col span={8}>
              <span>时间:</span>
              <span>{this.state.detailDate}</span>
            </Col>
            <Col span={8}>
              <span>区部:</span>
              <span>{this.state.detailArea}</span>
            </Col>
            <Col span={8}>
              <span>网点:</span>
              <span>{this.state.detailDeptCode}</span>
            </Col>
          </Row>
          <StayDetailComponent />
        </Modal>
      </div>
    );
  }
}

export default Stay;
