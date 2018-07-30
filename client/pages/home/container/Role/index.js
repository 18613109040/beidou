import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Card } from 'antd';
import DescriptionList from '../../components/DescriptionList';
import './index.less';

const { Description } = DescriptionList;
class Role extends React.Component {
    static contextTypes = {
      router: PropTypes.object.isRequired,
    };

    constructor(props) {
      super(props);
      this.state = {

      };
    }

    componentWillMount() {

    }

    componentDidMount() {

    }

    render() {
      return (
        <div className="role" >
          <Card bordered={false}>
            <DescriptionList size="large" title="详情" style={{ marginBottom: 32 }}>
              <Description term="角色名" />
              <Description term="描述" />

            </DescriptionList>
          </Card>
        </div>
      );
    }
}

function mapStateToProps(state) {
  return state;
}
export default connect(mapStateToProps)(Role);

