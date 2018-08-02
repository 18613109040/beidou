import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Card, Table, Checkbox } from 'antd';
import DescriptionList from '../../components/DescriptionList';
import { getRoleDetails } from '../../actions/role';
import { authOperation } from '../../../../utils/utils';
import './index.less';

const { Description } = DescriptionList;
class RoleDetail extends React.Component {
    static contextTypes = {
      router: PropTypes.object.isRequired,
    };

    constructor(props) {
      super(props);
      this.state = {
        role: {
          name: '',
          des: '',
          modules: [],
          createUser: {
            email: '',
          },
          updataUser: {
            email: '',
          },
          createdAt: '',
          updatedAt: '',
        },
      };
    }

    componentDidMount() {
      const { id } = this.props.match.params;
      if (id) {
        this.props.dispatch(getRoleDetails(id, (res) => {
          this.setState({
            role: res.data,
          });
        }));
      }
    }

    render() {
      const { role } = this.state;
      const columns = [
        { title: '模块命名', dataIndex: 'name', key: 'name', align: 'center' },
        { title: '模块', dataIndex: 'path', key: 'path', align: 'center' },
        { title: '权限',
          dataIndex: 'auth',
          key: 'auth',
          align: 'center',
          render: (text, record) => (<div>
            <Checkbox value="add" key="add" disabled checked={authOperation(record.auth).add} >新增</Checkbox>
            <Checkbox value="delete" key="delete"disabled checked={authOperation(record.auth).delete} >删除</Checkbox>
            <Checkbox value="updata" key="updata" disabled checked={authOperation(record.auth).updata} >修改</Checkbox>
            <Checkbox value="read" key="read" disabled checked={authOperation(record.auth).read} >查看</Checkbox>
          </div>),
        },
      ];
      return (
        <div className="role" >
          <Card bordered={false} title="角色详情" >
            <DescriptionList size="large" >
              <Description term="角色名" >{role.name}</Description>
              <Description term="描述" >{role.des}</Description>
              <Description term="创建人" >{role.createUser.email}</Description>
              <Description term="最后更新人" >{role.updataUser.email}</Description>
              <Description term="创建时间" >{role.createdAt}</Description>
              <Description term="最后更新时间" >{role.updatedAt}</Description>
            </DescriptionList>
          </Card>
          <Card bordered={false} title="权限列表" style={{ marginTop: '20px' }} >
            <Table
              bordered
              rowKey="id"
              dataSource={role.modules}
              columns={columns}
              pagination={false}
            />
          </Card>
        </div>
      );
    }
}

function mapStateToProps(state) {
  return state;
}
export default connect(mapStateToProps)(RoleDetail);

