
import React from 'react';
import { List, Avatar, Button, Card } from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import BaseTable from '../../components/BaseTable';

import './index.less';

class RoleList extends React.Component {
    state = {

    }

    componentDidMount() {

    }


    render() {
      return (
        <div className="role-list">
          <Card bordered={false}>
            <div className="tableList">
              <BaseTable />
            </div>
          </Card>

        </div>
      );
    }
}
function mapStateToProps(state) {
  return {
    roleList: state.roleList,
  };
}
export default connect(mapStateToProps)(RoleList);

