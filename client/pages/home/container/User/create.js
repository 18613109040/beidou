import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Form, Input, Button, Card, Select } from 'antd';
import { getRoleList } from '../../actions/role';
import { createUser, getUserDetails, updataUser } from '../../actions/user';
import './index.less';

const FormItem = Form.Item;
const Option = Select.Option;
class UserCreate extends React.Component {
    static contextTypes = {
      router: PropTypes.object.isRequired,
    };

    constructor(props) {
      super(props);
      this.state = {
        loading: false,
      };
    }


    componentDidMount() {
      const { id } = this.props.match.params;
      if (id) {
        getUserDetails(id, (res) => {
          const { form } = this.props;
          form.setFieldsValue({ email: res.data.email, role: res.data.role });
        });
      }

      this.props.dispatch(getRoleList({
        isPaging: false,
      }));
    }

    handleSubmit = (e) => {
      e.preventDefault();
      this.setState({
        loading: true,
      });
      const { id } = this.props.match.params;
      this.props.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
        }
        if (id) {
          updataUser(Object.assign(values, { id }), (res) => {
            this.setState({
              loading: false,
            });
            if (res.code === 0) {
              this.props.history.goBack();
            }
          });
        } else {
          createUser(values, (res) => {
            this.setState({
              loading: false,
            });
            if (res.code === 0) {
              this.props.history.goBack();
            }
          });
        }
      });
    }

    render() {
      const { form, roleList } = this.props;
      const { getFieldDecorator } = form;
      const options = roleList.map(d => <Option key={d._id}>{d.name}</Option>);
      const formItemLayout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 },
      };
      const { id } = this.props.match.params;
      return (
        <div>
          <Card bordered={false}>
            <Form onSubmit={this.handleSubmit}>
              <FormItem label="邮箱" {...formItemLayout}>
                {getFieldDecorator('email', {
                  rules: [
                    { type: 'email', message: '请填写邮箱地址' },
                    { required: true, message: '请填写邮箱地址' },
                  ],
                })(
                  <Input placeholder="邮箱地址" />
                )}
              </FormItem>
              {
                id ? '' : <FormItem label="密码" {...formItemLayout}>
                  {getFieldDecorator('password', {
                    rules: [{ required: true, message: '请填写密码' }],
                  })(
                    <Input placeholder="请填写密码" type="password" />
                  )}
                </FormItem>
              }
              <FormItem label="角色" {...formItemLayout}>
                {getFieldDecorator('role', {
                  rules: [{ required: true, message: '请选择角色' }],
                })(
                  <Select
                    style={{ width: 200 }}
                  >
                    {options}
                  </Select>
                )}
              </FormItem>
              <FormItem wrapperCol={{ span: 12, offset: 6 }}>
                <Button icon="rollback" style={{ marginRight: '40px' }}>返回</Button>
                <Button type="primary" htmlType="submit" loading={this.state.loading}>
                    提交
                </Button>
              </FormItem>
            </Form>
          </Card>
        </div>
      );
    }
}

function mapStateToProps(state) {
  return {
    roleList: state.roleList.list,
  };
}
export default connect(mapStateToProps)(Form.create()(UserCreate));

