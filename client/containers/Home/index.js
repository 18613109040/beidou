import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './index.less';

class Home extends React.Component {
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
      <div className="home" >
        shouye
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(Home);
