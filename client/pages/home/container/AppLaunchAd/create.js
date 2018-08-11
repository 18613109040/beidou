import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Form, Input, Button, Card, Checkbox, Select, Radio, InputNumber, DatePicker } from 'antd';
import { getAppVsersionList } from '../../actions/app/appVersion';
import { createAppLaunchAd, getAppLaunchAdDetails, updataAppVsersion } from '../../actions/app/appLaunchAd';
import UploadImage from '../../components/UploadImage';
import UploadVideo from '../../components/UploadVideo';
import './index.less';

const moment = require('moment');

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
        loading: false,
        jumpType: 0, // 标识跳转类型 0关闭 1网页链接 2APP内部跳转
        fileType: 0, // 标识上传类型 0 图片 1视频
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
      if (id) {
        getAppLaunchAdDetails(id).then((res) => {
          const { form } = this.props;
          const { lang, appVersion, dismountedDate, duration, fileType, internalJump, isable, jumpType, link, name, photo, status, video } = res.data;
          this.setState({
            jumpType,
            fileType,
          });
          const fromData = { lang, appVersion, dismountedDate, duration, fileType, internalJump, isable, jumpType, link, name, photo, status, video };
          const time = [moment(res.data.addedDate), moment(res.data.dismountedDate)];
          form.setFieldsValue(Object.assign({}, fromData, { time }));
        });
      }
    }

    handleSubmit = (e) => {
      e.preventDefault();
      const { id } = this.props.match.params;

      this.props.form.validateFields((err, values) => {
        if (!err) {
          const { time } = values;
          const addedDate = time[0];
          const dismountedDate = time[1];
          if (id) {
            updataAppVsersion(Object.assign({}, values, { addedDate, dismountedDate, id })).then((res) => {
              this.setState({
                loading: true,
              });
              if (res.code === 0) {
                this.props.history.goBack();
              }
            });
          } else {
            createAppLaunchAd(Object.assign({}, values, { addedDate, dismountedDate })).then((res) => {
              this.setState({
                loading: true,
              });
              if (res.code === 0) {
                this.props.history.goBack();
              }
            });
          }
        }
      });
    }

    onChange=(value) => {
      this.setState({
        jumpType: value,
      });
    }

    fileTypeChange = (e) => {
      const { value } = e.target;
      this.setState({
        fileType: value,
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
      const btnItemLayout = {
        wrapperCol: {
          xs: {
            span: 24,
            offset: 0,
          },
          sm: {
            span: 12,
            offset: 5,
          },
          md: {
            span: 12,
            offset: 4,
          },
          lg: {
            span: 8,
            offset: 4,
          },
          xl: {
            span: 8,
            offset: 3,
          },
          xxl: {
            span: 8,
            offset: 2,
          },
        },
      };
      const { appVersion, jumpType, fileType } = this.state;
      const options = appVersion.map(d => <Option key={d.appVersion}>{d.appVersion}</Option>);
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
                  <Select style={{ width: 200 }}>
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
                {getFieldDecorator('fileType', {
                  initialValue: 0,
                  rules: [{ required: true, message: '' }],
                })(
                  <Radio.Group buttonStyle="solid" onChange={this.fileTypeChange}>
                    <Radio.Button value={0}>图片</Radio.Button>
                    <Radio.Button value={1}>视频</Radio.Button>
                  </Radio.Group>
                )}
              </FormItem>
              {
                fileType === 0 ? <FormItem
                  label="开机图片"
                  {...formItemLayout}
                >
                  {getFieldDecorator('photo', {
                    rules: [{ required: true, message: '开机图片' }],
                  })(
                    <UploadImage
                      dirPath="app-launch-ad"

                    />
                  )}
                </FormItem> : <FormItem
                  label="开机视频"
                  {...formItemLayout}
                >
                  {getFieldDecorator('video', {
                    rules: [{ required: true, message: '开机视频' }],
                  })(
                    <UploadVideo
                      dirPath="app-launch-ad"
                    />
                  )}
                </FormItem>
              }

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
                    min={0}
                    max={60}
                    // formatter={value => `${value} S`}
                  />
                )}
              </FormItem>
              <FormItem
                label="时间"
                {...formItemLayout}
              >
                {getFieldDecorator('time', {

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
              <FormItem
                {...btnItemLayout}
              >
                <Button type="primary" htmlType="submit" loading={this.state.loading} >提交</Button>
                <Button icon="rollback" style={{ marginLeft: '40px' }} onClick={() => { this.props.history.goBack(); }} >返回</Button>
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

