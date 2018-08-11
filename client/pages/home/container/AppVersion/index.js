import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'antd';
import DescriptionList from '../../components/DescriptionList';
import { getAppVersionDetails } from '../../actions/app/appVersion';
import './index.less';

const { Description } = DescriptionList;
class AppVersionDetail extends React.Component {
    static contextTypes = {
      router: PropTypes.object.isRequired,
    };

    constructor(props) {
      super(props);
      this.state = {
        app: {
          appVersion: '',
          createUser: '',
          updataUser: '',
          createdAt: '',
          updatedAt: '',
        },
      };
    }

    componentDidMount() {
      const { id } = this.props.match.params;
      if (id) {
        getAppVersionDetails(id).then((res) => {
          this.setState({
            app: res.data,
          });
        });
      }
    }

    render() {
      const { app } = this.state;
      return (
        <div className="user-detail" >
          <Card bordered={false} title="APP版本详情" >
            <DescriptionList size="large" >
              <Description term="App版本号" >{app.appVersion}</Description>
              <Description term="创建人" >{app.createUser.email}</Description>
              <Description term="最后更新人" >{app.updataUser.email}</Description>
              <Description term="创建时间" >{app.createdAt}</Description>
              <Description term="最后更新时间" >{app.updatedAt}</Description>
            </DescriptionList>
          </Card>
        </div>
      );
    }
}


export default AppVersionDetail;

