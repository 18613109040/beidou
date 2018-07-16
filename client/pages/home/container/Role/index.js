import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Form, Input, Button } from 'antd';
import request from '../../../../utils/request';
import './index.less';

const FormItem = Form.Item;
class Role extends React.Component {
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
          request('/api/role', {
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
        <div className="role">
          <Form onSubmit={this.handleSubmit} className="login-form">
            <FormItem label="角色名">
              {getFieldDecorator('name', {
                rules: [{ required: true, message: '请填写角色名' }],
              })(
                <Input placeholder="角色名" />
              )}
            </FormItem>
            <FormItem label="描述">
              {getFieldDecorator('des', {
                rules: [{ required: true, message: '请填写描述' }],
              })(
                <Input placeholder="请填写描述" />
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
export default connect(mapStateToProps)(Form.create()(Role));

