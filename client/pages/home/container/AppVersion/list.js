
import React from 'react';
import { Card } from 'antd';
import PropTypes from 'prop-types';
import BaseTable from '../../components/BaseTable';

import './index.less';

class AppVersionList extends React.Component {
    state = {

    }

    componentDidMount() {

    }


    render() {
      return (
        <div >
          <Card bordered={false}>
            <div className="tableList">
              <BaseTable />
            </div>
          </Card>

        </div>
      );
    }
}

export default AppVersionList;

