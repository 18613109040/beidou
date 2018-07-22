import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Tree, Icon, Card, Divider, Button, Modal, Form, Input, Switch, Select } from 'antd';
import { getMenuData } from '../../common/menu';
// import DescriptionList from '../../components/DescriptionList';
import StandardTable from '../../components/StandardTable';
import './index.less';

// const { Description } = DescriptionList;
const TreeNode = Tree.TreeNode;
const FormItem = Form.Item;
const Option = Select.Option;

const MenuCreateForm = Form.create()(
  class extends React.Component {
    state = {
      data: [],
      value: undefined,
    }

    handleSearch = (value) => {
      fetch(value, data => this.setState({ data }));
    }

    handleChange = (value) => {
      this.setState({ value });
    }

    render() {
      const { visible, onCancel, onCreate, form } = this.props;
      const { getFieldDecorator } = form;
      const options = this.state.data.map(d => <Option key={d.value}>{d.text}</Option>);
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
      console.dir(this.props.form.getFieldValue('type'));
      return (
        <Modal
          visible={visible}
          title="Create a new collection"
          okText="Create"
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
              {getFieldDecorator('target')(
                <Switch />
              )}
            </FormItem>
            <FormItem
              label="类型"
              {...formItemLayout}
            >
              {getFieldDecorator('type')(
                <Select defaultValue={{ key: '0' }} style={{ width: 120 }} >
                  <Option value="0" key="0">目录</Option>
                  <Option value="1" key="1">模块</Option>
                </Select>
              )}
            </FormItem>
            {
              this.props.form.getFieldDecorator('type') === '0' ? '' :
                (<FormItem label="模块">
                  {getFieldDecorator('moduleid')(
                    <Select
                      showSearch
                      value={this.state.value}
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


            <FormItem className="collection-create-form_last-form-item">
              {getFieldDecorator('modifier', {
                initialValue: 'public',
              })(
                <Input />
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
        treeData: getMenuData(),
        selectedKey: 'root',
        selectTitle: '根目录',
        tableLoading: false,
        visible: false,
      };
    }

    componentWillMount() {

    }

    componentDidMount() {


    }

    onTreeSelect=(selectedKeys, e) => {
      console.dir(selectedKeys);
      console.dir(e);
    }

    renderTreeNodes=treeData => treeData.map((item) => {
      if (item.children) {
        return (
          <TreeNode title={item.name} key={item.id} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>);
      } else {
        return <TreeNode title={item.name} key={item.id} />;
      }
    })

    handleSubmit = (e) => {
      e.preventDefault();
    }

    handleStandardTableChange=() => {

    }

    handleCreate = () => {

    }

    handleCancel=() => {

    }

    showFrom=() => {
      this.setState({
        visible: true,
      });
    }

    render() {
      const { treeData, selectedKey, selectTitle, tableLoading, visible } = this.state;
      const columns = [
        { title: '菜单名称（中文）', dataIndex: 'menuNameCh', key: 'menuNameCh' },
        { title: '菜单名称（英文）', dataIndex: 'menuNameEn', key: 'menuNameEn' },
        { title: '更新时间', dataIndex: 'upDate', key: 'path' },
        { title: '操作人', dataIndex: 'operatorName', key: 'path' },
        { title: '操作',
          dataIndex: 'operating',
          key: 'operating',
          render: (text, record, index) => (<span>
            <span>编辑</span>
            <Divider type="vertical" />
            <span>删除</span>
          </span>) },
      ];
      const tableData = {

      };
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
                  {this.renderTreeNodes(treeData)}
                </TreeNode>
              </Tree>
            </Card>

          </div>
          <div className="from-content">
            <Card title={selectTitle}>
              <div>
                <Button type="primary" onClick={this.showFrom}>新增</Button>
              </div>
              <StandardTable
                rowKey="id"
                StandardTable={false}
                selectedRows={[]}
                tableAlert={false}
                selections={false}
                loading={tableLoading}
                data={tableData}
                columns={columns}
                onChange={this.handleStandardTableChange}
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
  return state;
}
export default connect(mapStateToProps)(MenuManage);

