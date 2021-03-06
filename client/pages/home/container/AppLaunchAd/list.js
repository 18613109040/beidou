
import React from 'react';
import { Card } from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import BaseTable from '../../components/BaseTable';

import './index.less';

class AppLaunchAdList extends React.Component {
    state = {

    }

    componentDidMount() {

    }

    create = () => {
      this.props.history.push('/system/manage/role/create');
    }

    render() {
      return (
        <div className="app-launch-ad">
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
  return state;
}
export default connect(mapStateToProps)(AppLaunchAdList);

