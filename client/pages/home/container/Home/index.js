import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Form, Icon, Input, Button, Select } from 'antd';
import request from '../../../../utils/request';
import './index.less';

const FormItem = Form.Item;
const Option = Select.Option;
class Home extends React.Component {
    static contextTypes = {
      router: PropTypes.object.isRequired,
    };

    constructor(props) {
      super(props);
      this.state = {
        loading: false,
      };
    }

    componentWillMount() {

    }

    componentDidMount() {

    }

    handleSubmit = (e) => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        if (!err) {
          // this.setState({
          //   loading: true,
          // });
          request('/api/user/access/login', {
            method: 'POST',
            body: values,
          });
          console.log('Received values of form: ', values);
        }
      });
    }

    render() {
      const { getFieldDecorator } = this.props.form;
      return (
        <div className="home">
          <Form onSubmit={this.handleSubmit} className="login-form">
            <FormItem label="邮箱">
              {getFieldDecorator('email', {
                rules: [{ type: 'email', message: '邮箱账号不正确' }, { required: true, message: '请填写邮箱账号' }],
              })(
                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="邮箱" />
              )}
            </FormItem>
            <FormItem label="密码">
              {getFieldDecorator('password', {
                rules: [{ required: true, message: '请输入密码' }],
              })(
                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
              )}
            </FormItem>
            <FormItem label="角色">
              {getFieldDecorator('role', {
                rules: [{ required: true, message: '请选择角色' }],
              })(
                <Select placeholder="请选择角色">
                  <Option value="china">master</Option>
                  <Option value="use">dev</Option>
                </Select>
              )}
            </FormItem>
            <FormItem>
              <Button type="primary" htmlType="submit" className="login-form-button" loading={this.state.loading} size="large">提交</Button>
            </FormItem>
          </Form>
        </div>
      );
    }
}

function mapStateToProps(state) {
  return state;
}
export default connect(mapStateToProps)(Form.create()(Home));

