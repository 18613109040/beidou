import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Form, Input, Button, Card, Checkbox, Select, Radio, InputNumber, DatePicker } from 'antd';
import { getAppVsersionList } from '../../actions/appVersion';
import UploadImage from '../../components/UploadImage';
import moment from 'moment';
import './index.less';

const Option = Select.Option;
const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;
class AppLaunchAdCreate extends React.Component {
    static contextTypes = {
      router: PropTypes.object.isRequired,
    };

    constructor(props) {
      super(props);
      this.state = {
        appVersion: [],
        jumpType: 0, // 标识跳转类型 0关闭 1网页链接 2APP内部跳转
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

    onChange=(value) => {
      this.setState({
        jumpType: value,
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
      const { appVersion, jumpType } = this.state;
      const options = appVersion.map(d => <Option key={d._id}>{d.appVersion}</Option>);
      return (
        <div className="role">
          <Card bordered={false}>
            <Form className="login-form" onSubmit={this.handleSubmit}>

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
                  initialValue: 0,
                  rules: [{ required: true, message: '跳转类型' }],
                })(
                  <Select style={{ width: 200 }} onChange={this.onChange} >
                    <Option value={0}>关闭</Option>
                    <Option value={1}>网页链接</Option>
                    <Option value={2}>APP内部跳转</Option>
                  </Select>
                )}
              </FormItem>
              {
                jumpType === 1 ? <FormItem
                  label="跳转链接"
                  {...formItemLayout}
                >
                  {getFieldDecorator('link', {
                    rules: [{ type: 'url', required: true, message: '跳转链接' }],
                  })(
                    <Input />
                  )}
                </FormItem> : ''
              }
              {
               jumpType === 2 ? <FormItem
                 label="内部跳转"
                 {...formItemLayout}
               >
                 {getFieldDecorator('internalJump', {
                   initialValue: 0,
                   rules: [{ required: true, message: '跳转类型' }],
                 })(
                   <Select style={{ width: 200 }} >
                     <Option value={0}>订单列表</Option>
                     <Option value={1}>会员中心</Option>
                   </Select>
                 )}
               </FormItem> : ''
              }

              <FormItem
                label="类型"
                {...formItemLayout}
              >
                {getFieldDecorator('shareCover', {
                  initialValue: 0,
                  rules: [{ required: true, message: '分享封面' }],
                })(
                  <Radio.Group buttonStyle="solid">
                    <Radio.Button value={0}>图片</Radio.Button>
                    <Radio.Button value={1}>视频</Radio.Button>
                  </Radio.Group>
                )}
              </FormItem>
              <FormItem
                label="开机图片"
                {...formItemLayout}
              >
                {getFieldDecorator('photo', {
                  rules: [{ required: true, message: '分享封面' }],
                })(
                  <UploadImage />
                )}
              </FormItem>
              <FormItem
                label="开屏名称"
                {...formItemLayout}
              >
                {getFieldDecorator('name', {
                  rules: [{ required: true, message: '开屏名称' }],
                })(
                  <Input />
                )}
              </FormItem>
              <FormItem
                label="展示时间(秒)"
                {...formItemLayout}
              >
                {getFieldDecorator('duration', {
                  initialValue: 0,
                  rules: [{ required: true, message: '展示时间' }],
                })(
                  <InputNumber
                    min={1}
                    max={60}
                    formatter={value => `${value} S`}
                  />
                )}
              </FormItem>
              <FormItem
                label="时间"
                {...formItemLayout}
              >
                {getFieldDecorator('time', {
                  initialValue: 0,
                  rules: [{ required: true, message: '时间' }],
                })(
                  <RangePicker
                    showTime
                    format="YYYY/MM/DD HH:mm:ss"
                  />
                )}
              </FormItem>
              <FormItem
                label="状态"
                {...formItemLayout}
              >
                {getFieldDecorator('status', {
                  initialValue: 0,
                  rules: [{ required: true, message: '状态' }],
                })(
                  <Select style={{ width: 200 }} >
                    <Option value={0}>显示</Option>
                    <Option value={1}>不显示</Option>
                  </Select>
                )}
              </FormItem>
              <FormItem style={{ textAlign: 'center', marginTop: '46px' }}>
                <Button type="primary" htmlType="submit" loading={this.state.loading} >提交</Button>
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

