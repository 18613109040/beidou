import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Form, Input, Button, Card, Checkbox, Select } from 'antd';
import { getAppVsersionList } from '../../actions/appVersion';
import UploadImage from '../../components/UploadImage';
import './index.less';

const Option = Select.Option;
const FormItem = Form.Item;
class AppLaunchAdCreate extends React.Component {
    static contextTypes = {
      router: PropTypes.object.isRequired,
    };

    constructor(props) {
      super(props);
      this.state = {
        appVersion: [],
      };
    }


    componentDidMount() {
      const { id } = this.props.match.params;
      getAppVsersionList({
        pageSize: 10,
        currentPage: 1,
        isPaging: false,
      }).then((res) => {
        this.setState({
          appVersion: res.data.list,
        });
      });
    }

    handleSubmit = (e) => {
      e.preventDefault();
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
      const { appVersion } = this.state;
      const options = appVersion.map(d => <Option key={d._id}>{d.appVersion}</Option>);
      return (
        <div className="role">
          <Card bordered={false}>
            <Form className="login-form">

              <FormItem
                {...formItemLayout}
                label="语言"
              >
                {getFieldDecorator('lang', {
                  initialValue: 'ZH',
                  rules: [{ required: true, message: '请选择语言' }],
                })(
                  <Select style={{ width: 240 }}>
                    <Option value="ZH">中文</Option>
                    <Option value="EN">英文</Option>
                  </Select>
                )}
              </FormItem>
              <FormItem
                label="app版本号"
                {...formItemLayout}
              >
                {getFieldDecorator('appVersion', {
                  rules: [{ required: true, message: '请选择App版本号' }],
                })(
                  <Select
                    style={{ width: 200 }}
                  >
                    {options}
                  </Select>
                )}
              </FormItem>
              <FormItem
                label="跳转类型"
                {...formItemLayout}
              >
                {getFieldDecorator('jumpType', {
                  rules: [{ required: true, message: '跳转类型' }],
                })(
                  <Select style={{ width: 200 }} >
                    <Option value={0}>关闭</Option>
                    <Option value={1}>网页链接</Option>
                    <Option value={2}>APP内部跳转</Option>
                  </Select>
                )}
              </FormItem>
              <FormItem
                label="分享封面"
                {...formItemLayout}
              >
                {getFieldDecorator('shareCover', {
                  rules: [{ required: true, message: '分享封面' }],
                })(
                  <UploadImage />
                )}
              </FormItem>

            </Form>
          </Card>

        </div>
      );
    }
}

function mapStateToProps(state) {
  return {
    roleModules: state.roleModules,
  };
}
export default connect(mapStateToProps)(Form.create()(AppLaunchAdCreate));

