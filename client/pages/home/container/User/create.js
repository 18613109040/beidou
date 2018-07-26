import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Form, Input, Button, Modal, Select } from 'antd';
import { getRoleList } from '../../actions/role';

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
        confirmLoading: false,
      };
    }

    componentWillMount() {

    }

    componentDidMount() {
      this.props.dispatch(getRoleList({
        isPaging: false,
      }));
    }

    handleSubmit = (e) => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
        }
      });
    }

    render() {
      const { visible, onCancel, onCreate, form, eidt, roleList } = this.props;
      const { confirmLoading } = this.state;
      const { getFieldDecorator } = form;
      console.dir(roleList);
      const options = roleList.map(d => <Option key={d._id}>{d.name}</Option>);
      return (
        <Modal
          visible={visible}
          title="目录"
          cancelText="取消"
          okText={eidt ? '更新' : '新增'}
          onCancel={onCancel}
          destroyOnClose
          confirmLoading={confirmLoading}
          onOk={onCreate}
        >
          <Form >
            <FormItem label="邮箱">
              {getFieldDecorator('email', {
                rules: [
                  { type: 'email', message: '请填写邮箱地址' },
                  { required: true, message: '请填写邮箱地址' },
                ],
              })(
                <Input placeholder="邮箱地址" />
              )}
            </FormItem>
            <FormItem label="密码">
              {getFieldDecorator('password', {
                rules: [{ required: true, message: '请填写密码' }],
              })(
                <Input placeholder="请填写密码" type="password" />
              )}
            </FormItem>
            <FormItem label="角色">
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
          </Form>
        </Modal>
      );
    }
}

function mapStateToProps(state) {
  return {
    roleList: state.roleList.list,
  };
}
export default connect(mapStateToProps)(Form.create()(UserCreate));

