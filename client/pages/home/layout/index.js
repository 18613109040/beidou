import React, { Component } from 'react';
import PropTypes from 'prop-types';


class BasicLayout extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired,
  };

  constructor() {
    super();
    this.state = {

    };
  }


  render() {
    const { children } = this.props;
    return (
      <div className="layout">
        <div className="content">
          {children}
        </div>
      </div>
    );
  }
}

export default BasicLayout;
