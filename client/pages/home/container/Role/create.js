import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Form, Input, Button, Card, Checkbox } from 'antd';
import { getMenuData } from '../../common/menu';
import StandardTable from '../../components/StandardTable';
import { getRoleModule, changeRoleModule, createRole } from '../../actions/role';
import './index.less';

const CheckboxGroup = Checkbox.Group;

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
        indeterminate: true,
        checkAllRead: false,
        checkAllWrite: false,
      };
    }

    componentWillMount() {
      this.props.dispatch(getRoleModule(getMenuData()));
    }

    componentDidMount() {

    }

    // 更新权限列表
    roleListSet(data) {
      const { roleModule } = this.props;
      data.map((item) => {
        if (item.children) {
          this.roleListSet(item.children);
        } else {
          item.operating = roleModule.find(it => it.id === item.id).operating;
        }
        return item;
      });
    }

    handleSubmit = (e) => {
      e.preventDefault();

      const modules = getMenuData();
      modules.map((item) => {
        this.roleListSet(item.children);
        return item;
      });
      this.props.form.validateFields((err, values) => {
        if (!err) {
          this.setState({
            loading: true,
          });
          createRole(Object.assign(values, { modules }), (res) => {
            this.setState({
              loading: false,
            });
            console.dir(res);
            if (res.code === 0) {
              this.props.history.goBack();
            }
          });
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

    onChange=(checkedList, index) => {
      this.props.dispatch(changeRoleModule({
        checkedList,
        index,
      }));
    }

    render() {
      const { getFieldDecorator } = this.props.form;
      const { tableData } = this.props;
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
      const options = [
        { label: '读', value: 'read' },
        { label: '写', value: 'write' },
      ];
      const { selectedRows, tableLoading } = this.state;
      const columns = [
        { title: '模块命名', dataIndex: 'name', key: 'name' },
        { title: '模块', dataIndex: 'path', key: 'path' },
        { title: '权限', dataIndex: 'operating', key: 'operating', render: (text, record, index) => <CheckboxGroup options={options} value={record.operating} onChange={e => this.onChange(e, index)} /> },
      ];
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
              <FormItem
                label="权限模块"
                {...formItemLayout}
              />
              <StandardTable
                rowKey="id"
                StandardTable={false}
                selectedRows={selectedRows}
                tableAlert={false}
                selections={false}
                loading={tableLoading}
                data={tableData}
                columns={columns}
                onSelectRow={this.handleSelectRows}
                onChange={this.handleStandardTableChange}
              />
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
  return {
    tableData: {
      list: state.roleModule,
    },
    roleModule: state.roleModule,
  };
}
export default connect(mapStateToProps)(Form.create()(RoleCreate));

