import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Form, Input, Button, Card, Checkbox, Table } from 'antd';
import { changeRoleModule, createRole, getRoleDetails, updataRole } from '../../actions/role';
import { authOperation } from '../../../../utils/utils';
import FooterToolbar from '../../components/FooterToolbar';
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
      };
    }


    componentDidMount() {
      const { id } = this.props.match.params;
      if (id) {
        this.props.dispatch(getRoleDetails(id, (res) => {
          const { form } = this.props;
          form.setFieldsValue({ name: res.data.name, des: res.data.des });
        }));
      }
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

      this.props.form.validateFields((err, values) => {
        if (!err) {
          this.setState({
            loading: true,
          });
          const { roleModules } = this.props;
          const { id } = this.props.match.params;
          if (id) {
            updataRole(Object.assign(values, { modules: roleModules, id }), (res) => {
              this.setState({
                loading: false,
              });
              if (res.code === 0) {
                this.props.history.goBack();
              }
            });
          } else {
            createRole(Object.assign(values, { modules: roleModules }), (res) => {
              this.setState({
                loading: false,
              });
              if (res.code === 0) {
                this.props.history.goBack();
              }
            });
          }
        }
      });
    }

    onChange=(e, record, index) => {
      const { value, checked } = e.target;
      const obj = {
        add: 1,
        delete: 2,
        updata: 4,
        read: 8,
      };
      const auth = checked ? Number(record.auth) + obj[value] : Number(record.auth) - obj[value];
      this.props.dispatch(changeRoleModule({
        index,
        auth: auth < 0 ? 0 : auth,
      }));
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
      const columns = [
        { title: '模块命名', dataIndex: 'name', key: 'name' },
        { title: '模块', dataIndex: 'path', key: 'path' },
        { title: '权限',
          dataIndex: 'auth',
          key: 'auth',
          render: (text, record, index) => (<div>
            <Checkbox value="add" key="add" checked={authOperation(record.auth).add} onChange={e => this.onChange(e, record, index)}>新增</Checkbox>
            <Checkbox value="delete" key="delete" checked={authOperation(record.auth).delete} onChange={e => this.onChange(e, record, index)}>删除</Checkbox>
            <Checkbox value="updata" key="updata" checked={authOperation(record.auth).updata} onChange={e => this.onChange(e, record, index)}>修改</Checkbox>
            <Checkbox value="read" key="read" checked={authOperation(record.auth).read} onChange={e => this.onChange(e, record, index)}>查看</Checkbox>
          </div>),
        },
      ];
      const { roleModules } = this.props;
      return (
        <div className="role">
          <Card bordered={false}>
            <Form className="login-form">

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

            </Form>
          </Card>
          <Card bordered={false}>
            <Table
              bordered
              rowKey="id"
              dataSource={roleModules}
              columns={columns}
              pagination={false}
              onChange={this.handleTableChange}
            />
          </Card>
          <FooterToolbar >
            <Button type="primary" onClick={this.handleSubmit} loading={this.state.loading}>
            提交
            </Button>
          </FooterToolbar>
        </div>
      );
    }
}

function mapStateToProps(state) {
  return {
    roleModules: state.roleModules,
  };
}
export default connect(mapStateToProps)(Form.create()(RoleCreate));

