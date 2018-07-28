import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Tree, Card, Divider, Button, Table, Popconfirm } from 'antd';
import { createModules, getModules, destroyModule, updateModules } from '../../actions/menu';
import MenuCreateForm from './MenuModal';
import DescriptionList from '../../components/DescriptionList';
import './index.less';

const TreeNode = Tree.TreeNode;
const { Description } = DescriptionList;
class MenuManage extends React.Component {
    static contextTypes = {
      router: PropTypes.object.isRequired,
    };

    constructor(props) {
      super(props);
      this.state = {
        selectedKey: 'root',
        visible: false,
        eidtData: {},
        dataSource: null,
        eidt: false,
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
          dataSource: selectedNodes[0].props.dataRef.children || [],
          currentSelect: selectedNodes[0].props.dataRef || {},
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
        return <TreeNode title={item.menuNameCh} key={item._id} dataRef={item} />;
      }
    })


    handleStandardTableChange=() => {

    }

    handleCreate = () => {
      const { form } = this.formRef.props;
      const { eidt, eidtData } = this.state;
      form.validateFields((err, values) => {
        if (err) {
          return;
        }
        if (eidt) {
          updateModules(Object.assign(eidtData, values), () => {
            form.resetFields();
            this.props.dispatch(getModules());
            this.setState({ visible: false, eidt: false });
          });
        } else {
          createModules(Object.assign(values, { parentId: this.state.selectedKey }), () => {
            form.resetFields();
            this.props.dispatch(getModules());
            this.setState({ visible: false, eidt: false });
          });
        }
      });
    }

    handleCancel=() => {
      const { form } = this.formRef.props;
      form.resetFields();
      this.setState({
        visible: false,
        eidt: false,
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
      const { form } = this.formRef.props;
      this.setState({
        visible: true,
        eidt: true,
        eidtData: data,
      });
      form.setFieldsValue(data);
      form.setFieldsValue(data);
    }

    deleteMenu = (id) => {
      destroyModule(id, () => {
        this.props.dispatch(getModules());
      });
    }

    render() {
      const { selectedKey, visible, dataSource, currentSelect, eidt, eidtData } = this.state;
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
            <Popconfirm title="确定删除?" okText="确定" cancelText="取消" onConfirm={() => this.deleteMenu(record._id)}>
              <a >删除</a>
            </Popconfirm>
          </span>) },
      ];
      return (
        <div className="menu-manage" >
          <div className="tree">
            <Card style={{ width: 250 }}>
              {
                menuTree.length > 0 ? (<Tree
                  showIcon
                  defaultSelectedKeys={[selectedKey]}
                  onSelect={this.onTreeSelect}
                >
                  <TreeNode
                    title="根目录"
                    key="root"
                    dataRef={{ children: menuTree,
                      type: '0',
                      _id: 'root' }}
                  >
                    {this.renderTreeNodes(menuTree)}
                  </TreeNode>
                </Tree>) : 'loading tree'
              }
            </Card>

          </div>
          <div className="from-content">
            {
              currentSelect.type === '0' ?
                (
                  <Card title={(<div>
                    <Button type="primary" onClick={this.showFrom}>新增</Button>
                  </div>)}
                  >
                    <Table
                      rowKey="_id"
                      dataSource={dataSource || menuTree}
                      columns={columns}
                      bordered
                      pagination={false}
                      childrenColumnName="childrens"
                    />
                  </Card>) :
                (<Card bordered={false}>
                  <DescriptionList size="large" title="模块信息" style={{ marginBottom: 32 }}>
                    <Description term="菜单名（中文）">{currentSelect.menuNameCh}</Description>
                    <Description term="菜单名（英文）">{currentSelect.menuNameEn}</Description>
                    <Description term="链接地址">{currentSelect.linkurl}</Description>
                    <Description term="新窗口打开">{currentSelect.target ? '是' : '否'}</Description>

                    <Description term="类型">{currentSelect.type === '1' ? '模块' : '目录'}</Description>
                    <Description term="模块名称">{currentSelect.moduleid.label}</Description>
                    <Description term="是否隐藏">{currentSelect.hiden ? '是' : '否'}</Description>
                  </DescriptionList>
                </Card>
                )
            }

          </div>
          <MenuCreateForm
            wrappedComponentRef={this.saveFormRef}
            visible={visible}
            onCancel={this.handleCancel}
            onCreate={this.handleCreate}
            eidt={eidt}
            eidtData={eidtData}
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

