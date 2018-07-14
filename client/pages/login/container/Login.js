import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Form, Icon, Input, Button } from 'antd';
import './index.less';

const FormItem = Form.Item;

class Login extends React.Component {
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
          this.setState({
            loading: true,
          });
          console.log('Received values of form: ', values);
        }
      });
    }

    render() {
      const { getFieldDecorator } = this.props.form;
      return (
        <div className="login" >
          <div className="login-content">
            <div className="title">
              <h3>iGola CMS</h3>
            </div>
            <Form onSubmit={this.handleSubmit} className="login-form">
              <FormItem>
                {getFieldDecorator('userName', {
                  rules: [{ required: true, message: '请输入邮箱账号' }],
                })(
                  <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="邮箱" />
                )}
              </FormItem>
              <FormItem>
                {getFieldDecorator('password', {
                  rules: [{ required: true, message: '请输入密码' }],
                })(
                  <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
                )}
              </FormItem>
              <FormItem>
                <Button type="primary" htmlType="submit" className="login-form-button" loading={this.state.loading} size="large">登   陆</Button>
              </FormItem>
            </Form>
          </div>
        </div>
      );
    }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(Form.create()(Login));
