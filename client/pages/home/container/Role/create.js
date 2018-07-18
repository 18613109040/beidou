import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Form, Input, Button, Card } from 'antd';
import request from '../../../../utils/request';
import StandardTable from '../../components/StandardTable';
import './index.less';

const FormItem = Form.Item;
class RoleCreate extends React.Component {
    static contextTypes = {
      router: PropTypes.object.isRequired,
    };

    constructor(props) {
      super(props);
      this.state = {
        loading: false,
        tableLoading: false,
        selectedRows: [],
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

    handleSelectRows = (rows) => {
      this.setState({
        selectedRows: rows,
      });
    }

    handleStandardTableChange = (pagination, filtersArg, sorter) => {
      console.dir(pagination);
      console.dir(filtersArg);
      console.dir(sorter);
    }

    render() {
      const { getFieldDecorator } = this.props.form;
      const formItemLayout = {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 5 },
          md: { span: 4 },
          lg: { span: 4 },
          xl: { span: 3 },
          xxl: { span: 2 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 12 },
          md: { span: 12 },
          lg: { span: 8 },
          xl: { span: 8 },
          xxl: { span: 8 },
        },
      };
      return (
        <div className="role">
          <Card bordered={false}>
            <Form onSubmit={this.handleSubmit} className="login-form">
              <FormItem
                {...formItemLayout}
                label="角色名"
              >
                {getFieldDecorator('name', {
                  rules: [{ required: true, message: '请填写角色名' }],
                })(
                  <Input placeholder="角色名" />
                )}
              </FormItem>
              <FormItem
                label="描述"
                {...formItemLayout}
              >
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
          </Card>
        </div>
      );
    }
}

function mapStateToProps(state) {
  return state;
}
export default connect(mapStateToProps)(Form.create()(RoleCreate));

