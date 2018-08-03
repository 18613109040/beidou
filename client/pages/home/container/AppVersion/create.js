import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button, Card } from 'antd';
import { createAppVersion, updataAppVsersion, getAppVersionDetails } from '../../actions/appVersion';
import './index.less';

const FormItem = Form.Item;
class AppVersionCreate extends React.Component {
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
        getAppVersionDetails(id).then((res) => {
          const { form } = this.props;
          form.setFieldsValue({ appVersion: res.data.appVersion });
        });
      }
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
          updataAppVsersion(Object.assign(values, { id })).then((res) => {
            this.setState({
              loading: false,
            });
            if (res.code === 0) {
              this.props.history.goBack();
            }
          });
        } else {
          createAppVersion(values).then((res) => {
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
            <Form onSubmit={this.handleSubmit}>

              <FormItem
                {...formItemLayout}
                label="App版本号"
              >
                {getFieldDecorator('appVersion', {
                  rules: [
                    { required: true, message: '请填写版本号' },
                    { pattern: /^\d+\.\d+\.\d+$/, message: '请填写正确的版本号' },
                  ],
                })(
                  <Input placeholder="请填写版本号 例如(1.0.0)" />

                )}
              </FormItem>
              <FormItem wrapperCol={{ span: 12, offset: 6 }}>
                <Button icon="rollback" style={{ marginRight: '40px' }} onClick={() => { this.props.history.goBack(); }} >返回</Button>
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


export default Form.create()(AppVersionCreate);

