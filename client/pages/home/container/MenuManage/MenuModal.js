
import React from 'react';
import { Modal, Form, Input, Switch, Select } from 'antd';
import { modules } from '../../common/modules';

const FormItem = Form.Item;
const Option = Select.Option;
const MenuCreateForm = Form.create()(
  class extends React.Component {
    state = {
      data: modules,
      value: undefined,
    }

    handleSearch = (value) => {
      this.setState({
        data: modules.filter(item => item.name.includes(value)),
      });
    }


    componentDidMount() {


    }

    render() {
      const { visible, onCancel, onCreate, form, eidt } = this.props;
      const { getFieldDecorator } = form;
      const options = this.state.data.map(d => <Option key={d.component}>{d.name}</Option>);
      const formItemLayout = {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
      };
      return (
        <Modal
          visible={visible}
          title="目录"
          cancelText="取消"
          okText={eidt ? '更新' : '新增'}
          onCancel={onCancel}
          onOk={onCreate}
          maskClosable={false}
        >
          <Form >
            <FormItem
              label="菜单名（中文）"
              {...formItemLayout}
            >
              {getFieldDecorator('menuNameCh', {
                rules: [{ required: true, message: 'Please input the menuNameCh of collection!' }],
              })(
                <Input placeholder="请输入中文名" />
              )}
            </FormItem>
            <FormItem
              label="菜单名（英文）"
              {...formItemLayout}
            >
              {getFieldDecorator('menuNameEn', {
                rules: [{ required: true, message: 'Please input the menuNameEn of collection!' }],
              })(
                <Input placeholder="请输入英文名" />
              )}
            </FormItem>
            <FormItem
              label="链接地址"
              {...formItemLayout}
            >
              {getFieldDecorator('path')(
                <Input placeholder="请输入链接地址" />
              )}
            </FormItem>
            <FormItem
              label="新窗口打开"
              {...formItemLayout}
            >
              {getFieldDecorator('target', { initialValue: false })(
                <Switch />
              )}
            </FormItem>
            <FormItem
              label="类型"
              {...formItemLayout}
            >
              {getFieldDecorator('type', {
                initialValue: '0',
                rules: [{ required: true, message: '请选择类型' }],
              })(
                <Select style={{ width: 120 }} >
                  <Option value="0" key="0">目录</Option>
                  <Option value="1" key="1">模块</Option>
                </Select>
              )}
            </FormItem>
            {
              form.getFieldValue('type') === '0' ? '' :
                (<FormItem
                  {...formItemLayout}
                  label="模块"
                >
                  {getFieldDecorator('moduleid', {
                    rules: [{ required: true, message: '请选择模块' }],
                  })(
                    <Select
                      showSearch
                      placeholder="请选择模块"
                      defaultActiveFirstOption={false}
                      showArrow={false}
                      filterOption={false}
                      onSearch={this.handleSearch}
                      onChange={this.handleChange}
                      notFoundContent={null}
                    >
                      {options}
                    </Select>
                  )}
                </FormItem>)
            }
            <FormItem
              label="是否隐藏"
              {...formItemLayout}
            >
              {getFieldDecorator('hiden', { initialValue: false })(
                <Switch />
              )}
            </FormItem>
          </Form>
        </Modal>
      );
    }
  }
);

export default MenuCreateForm;
