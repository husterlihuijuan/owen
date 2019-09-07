import React, { Component } from 'react';
import { connect } from 'dva';
import { Form, Input, Button, Row, Col, Icon } from 'antd';
import styles from './style.less';

@Form.create()
@connect(({ login, loading }) => ({
  userLogin: login,
  submitting: loading.effects['login/login'],
}))
class Login extends Component {
  handleSubmit = e => {
    const { dispatch, form } = this.props;
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        dispatch({
          type: 'login/login',
          payload: values,
        });
      }
    });
  };

  render() {
    const { userLogin, form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <div className={styles.main}>
        <div className="form-container">
          <Form onSubmit={this.handleSubmit} colon={false}>
            <Form.Item
              label={
                <span style={{ color: 'gray' }}>
                  <Icon type="user" />
                  &nbsp;工号
                </span>
              }
            >
              {getFieldDecorator('account', {
                rules: [{ required: true, message: '请输入工号' }],
              })(<Input />)}
            </Form.Item>
            <Form.Item
              label={
                <span style={{ color: 'gray' }}>
                  <Icon type="lock" />
                  &nbsp;密码
                </span>
              }
            >
              {getFieldDecorator('password', {
                rules: [{ required: true, message: '请输入密码' }],
              })(<Input />)}
            </Form.Item>
            <Form.Item
              label={
                <span style={{ color: 'gray' }}>
                  <Icon type="safety-certificate" />
                  &nbsp; 验证码
                </span>
              }
            >
              <Row gutter={8}>
                <Col span={16}>
                  {getFieldDecorator('verifyCode', {
                    rules: [{ required: true, message: '请输入验证码' }],
                  })(<Input placeholder="请输入验证码" />)}
                </Col>
                <Col span={8}>
                  {/* <Button block>获取验证码</Button> */}
                  <img
                    src="/user/getVerify"
                    alt="更换验证码"
                    height="36"
                    width="170"
                    onclick="this.src='/user/getVerify?d='+Math.random();"
                  />
                </Col>
              </Row>
            </Form.Item>
            <Form.Item className="form-button">
              <Button type="primary" htmlType="submit" block>
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}

export default Login;
