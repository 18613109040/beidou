import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Tree, Icon, Card, Divider, Button, Modal, Form, Input, Switch, Select, Table } from 'antd';
import { modules } from '../../common/modules';
// import DescriptionList from '../../components/DescriptionList';
import StandardTable from '../../components/StandardTable';
import { createModules, getModules } from '../../actions/menu';

import './index.less';

// const { Description } = DescriptionList;
const TreeNode = Tree.TreeNode;
const FormItem = Form.Item;
const Option = Select.Option;

const MenuCreateForm = Form.create()(
  class extends React.Component {
    state = {
      data: modules,
      value: undefined,
      fileType: '0',
    }

    handleSearch = (value) => {
      // fetch(value, data => this.setState({ data }));
      console.dir(value);
      console.dir(modules.filter(item => item.name.includes(value)));
      this.setState({
        data: modules.filter(item => item.name.includes(value)),
      });
    }

    handleSelectChange=(value) => {
      this.setState({
        fileType: value,
      });
    }

    render() {
      const { visible, onCancel, onCreate, form } = this.props;
      const { getFieldDecorator } = form;
      const { fileType } = this.state;
      const options = this.state.data.map(d => <Option key={d.name}>{d.name}</Option>);
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
          okText="新增"
          onCancel={onCancel}
          onOk={onCreate}
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
              {getFieldDecorator('linkurl')(
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
                <Select style={{ width: 120 }} onChange={this.handleSelectChange}>
                  <Option value="0" key="0">目录</Option>
                  <Option value="1" key="1">模块</Option>
                </Select>
              )}
            </FormItem>
            {
              fileType === '0' ? '' :
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

class MenuManage extends React.Component {
    static contextTypes = {
      router: PropTypes.object.isRequired,
    };

    constructor(props) {
      super(props);
      this.state = {
        selectedKey: 'root',
        selectTitle: '根目录',
        tableLoading: false,
        visible: false,
        dataSource: null,
        currentSelect: {
          type: '0',
          _id: 'root',
        },
      };
    }

    componentWillMount() {

    }

    componentDidMount() {
      this.props.dispatch(getModules());
    }

    onTreeSelect=(selectedKeys, { selectedNodes }) => {
      if (selectedKeys.length) {
        this.setState({
          selectedKey: selectedKeys[0],
          dataSource: selectedNodes[0].props.dataRef.children,
          currentSelect: selectedNodes[0].props.dataRef,
        });
      }
    }

    renderTreeNodes=modulesTree => modulesTree.map((item) => {
      if (item.children) {
        return (
          <TreeNode title={item.menuNameCh} key={item._id} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>);
      } else {
        return <TreeNode title={item.menuNameCh} key={item._id} />;
      }
    })


    handleStandardTableChange=() => {

    }

    handleCreate = () => {
      const form = this.formRef.props.form;
      form.validateFields((err, values) => {
        console.dir(err);
        if (err) {
          return;
        }
        createModules(Object.assign(values, { parentId: this.state.selectedKey }), (res) => {
          form.resetFields();
          this.props.dispatch(getModules());
          this.setState({ visible: false });
        });
      });
    }

    handleCancel=() => {
      const form = this.formRef.props.form;
      form.resetFields();
      this.setState({
        visible: false,
      });
    }

    showFrom=() => {
      this.setState({
        visible: true,
      });
    }

    saveFormRef = (formRef) => {
      this.formRef = formRef;
    }

    eidtMenu = (data) => {
      const form = this.formRef.props.form;
      this.setState({
        visible: true,
      });
      form.setFieldsValue(data);
    }

    render() {
      const { selectedKey, selectTitle, tableLoading, visible, dataSource } = this.state;
      const { menuTree } = this.props;
      const columns = [
        { title: '菜单名称（中文）', dataIndex: 'menuNameCh', key: 'menuNameCh' },
        { title: '菜单名称（英文）', dataIndex: 'menuNameEn', key: 'menuNameEn' },
        { title: '类型', dataIndex: 'type', key: 'type', render: text => (<span>{text === '0' ? '目录' : '模块'}</span>) },
        { title: '创建人', dataIndex: 'founder', key: 'founder' },
        { title: '最后修改人', dataIndex: 'modifier', key: 'modifier' },
        { title: '操作',
          dataIndex: 'operating',
          key: 'operating',
          render: (text, record, index) => (<span>
            <a onClick={() => this.eidtMenu(record)}>编辑</a>
            <Divider type="vertical" />
            <a>删除</a>
          </span>) },
      ];
      return (
        <div className="menu-manage" >
          <div className="tree">
            <Card style={{ width: 250 }}>
              <Tree
                showIcon
                defaultSelectedKeys={[selectedKey]}
                onSelect={this.onTreeSelect}
              >
                <TreeNode title="根目录" key="root">
                  {this.renderTreeNodes(menuTree)}
                </TreeNode>
              </Tree>
            </Card>

          </div>
          <div className="from-content">
            <Card title={selectTitle}>
              <div>
                <Button type="primary" onClick={this.showFrom}>新增</Button>
              </div>
              <Table
                rowKey="_id"
                dataSource={dataSource || menuTree}
                columns={columns}
                bordered
                pagination={false}
                childrenColumnName="childrens"
              />
            </Card>
          </div>
          <MenuCreateForm
            wrappedComponentRef={this.saveFormRef}
            visible={visible}

            onCancel={this.handleCancel}
            onCreate={this.handleCreate}
          />
        </div>
      );
    }
}


function mapStateToProps(state) {
  return {
    menuTree: state.menuTree,
  };
}
export default connect(mapStateToProps)(MenuManage);

