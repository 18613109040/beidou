import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Card } from 'antd';
import DescriptionList from '../../components/DescriptionList';
import { getUserDetails } from '../../actions/user';
import './index.less';

const { Description } = DescriptionList;
class UserDetail extends React.Component {
    static contextTypes = {
      router: PropTypes.object.isRequired,
    };

    constructor(props) {
      super(props);
      this.state = {
        user: {
          email: '',
          role: {
            name: '',
          },
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
        getUserDetails(id, (res) => {
          this.setState({
            user: res.data,
          });
        });
      }
    }

    render() {
      const { user } = this.state;
      return (
        <div className="user-detail" >
          <Card bordered={false} title="用户详情" >
            <DescriptionList size="large" >
              <Description term="邮箱" >{user.email}</Description>
              <Description term="角色" >{user.role.name}</Description>
              <Description term="创建人" >{user.createUser.email}</Description>
              <Description term="最后更新人" >{user.updataUser.email}</Description>
              <Description term="创建时间" >{user.createdAt}</Description>
              <Description term="最后更新时间" >{user.updatedAt}</Description>
            </DescriptionList>
          </Card>
        </div>
      );
    }
}


function mapStateToProps(state) {
  return {
  };
}
export default connect(mapStateToProps)(UserDetail);

