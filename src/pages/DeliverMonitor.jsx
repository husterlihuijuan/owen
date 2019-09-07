import React from 'react';
import { DatePicker, Form, Button, Input, Select, Icon } from 'antd';
import './deliver.less';
import moment from 'moment';
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入柱状图
import 'echarts/lib/chart/line';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';

const { RangePicker } = DatePicker;
const { Option } = Select;
@Form.create()
class DeliverMonitor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rangeDate: [moment().subtract(10, 'days'), moment()],
      xAxisOption: [],
      // option: {},
    };
    this.myEchart = null;
  }

  async componentDidMount() {
    this.myEchart = await echarts.init(document.getElementById('myEchart'));
    this.drawEchart();
  }

  handleSubmit = e => {
    e.preventDefault();
    console.log('submit');
    const { form, dispatch } = this.props;
    // const params = form.getFieldsValue();
    // dispatch({
    //   type: '/check',
    //   payload: params,
    // });
    this.drawEchart();
  };

  getOption = () => {
    const option = {
      legend: {
        data: ['到件量', '出仓量', '派件量'],
      },
      grid: {
        left: '40',
        right: '20',
        // bottom: '40',
      },
      xAxis: {
        data: this.state.xAxisOption,
      },
      yAxis: {
        name: '票/件',
      },
      series: [
        {
          name: '到件量',
          type: 'line',
          data: [1000, 900, 982, 1100, 1020, 1000, 900, 982, 1100, 1020],
          itemStyle: {
            color: '#42a7dd',
          },
        },
        {
          name: '出仓量',
          type: 'line',
          data: [980, 800, 920, 900, 999, 980, 800, 920, 900, 999],
          itemStyle: {
            color: '#f0a243',
          },
        },
        {
          name: '派件量',
          type: 'line',
          data: [900, 720, 800, 890, 780, 900, 720, 800, 890, 780],
          itemStyle: {
            color: '#a6cc48',
          },
        },
      ],
    };
    return option;
  };

  setxAxisOption = () => {
    const beforeDate = this.state.rangeDate[0];
    const afterDate = this.state.rangeDate[1];
    const diffDays = this.state.rangeDate[1].diff(beforeDate, 'days');
    const xAxisOption = [];
    for (let i = 0; i < diffDays; i += 1) {
      xAxisOption.push(beforeDate.add(1, 'days').format('YYYY/MM/DD'));
    }
    this.setState(() => ({
      xAxisOption,
      rangeDate: [beforeDate.add(-diffDays, 'days'), afterDate],
    }));
  };

  changeRangeDate = time => {
    // console.log(time, timeStr);
    this.setState({
      rangeDate: time,
    });
  };

  async drawEchart() {
    await this.setxAxisOption();
    const option = await this.getOption();
    this.myEchart.setOption(option);
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="deliver-container">
        <Form layout="inline" onSubmit={this.handleSubmit}>
          <Form.Item label="查询日期">
            {getFieldDecorator('date', {
              initialValue: this.state.rangeDate,
            })(<RangePicker onChange={this.changeRangeDate} style={{ width: '220px' }} />)}
          </Form.Item>
          <Form.Item label="时间粒度">
            {getFieldDecorator('timeUnit', {
              initialValue: 'day',
            })(
              <Select style={{ width: 200 }}>
                <Option value="hour">小时</Option>
                <Option value="day">天</Option>
                <Option value="week">周</Option>
                <Option value="month">月</Option>
                <Option value="quarter">季度</Option>
              </Select>,
            )}
          </Form.Item>
          <Form.Item label="显示网点维度">
            {getFieldDecorator('dimension', {
              initialValue: 'site',
            })(
              <Select style={{ width: 200 }}>
                <Option value="site">站点</Option>
                <Option value="branch">分部</Option>
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
        <div className="deliver-echart">
          <Icon type="appstore" />
          <span className="title">派仓派件趋势图</span>
          <div style={{ height: '300px' }} id="myEchart"></div>
        </div>
        <div className="deliver-table">
          <Icon type="appstore" />
          <span className="title">派仓派件统计明细</span>
        </div>
      </div>
    );
  }
}

export default DeliverMonitor;
