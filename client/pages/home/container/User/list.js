
import React from 'react';
import { Card } from 'antd';
import PropTypes from 'prop-types';
import BaseTable from '../../components/BaseTable';

import './index.less';

class UserList extends React.Component {
    state = {

    }

    componentDidMount() {

    }

    render() {
      const customColumns = [
        {
          title: '邮箱',
          dataIndex: 'email',
          key: 'email',
        }, {
          title: '角色',
          dataIndex: 'roleName',
          key: 'roleName',
          render: (text, record) => (<span>{record.role ? record.role.name : ''}</span>),
        },
      ];
      return (
        <div className="role-list">
          <Card bordered={false}>
            <div className="tableList">
              <BaseTable
                customColumns={customColumns}
              />
            </div>
          </Card>

        </div>
      );
    }
}

export default UserList;

