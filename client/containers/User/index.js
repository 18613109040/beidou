import React from 'react';
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import {connect} from "react-redux";
import TabBar from '../../components/TabBar'
class User extends React.Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  };
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  componentWillMount() {
  }

  componentDidMount() {

  }

  render() {
    const {tabBarData} = this.props;
    return (
      <div className="home">
        我的
        <TabBar tabs={tabBarData}/>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    tabBarData:state.tabBarData
  }
}

export default connect(mapStateToProps)(User)
