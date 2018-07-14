import React from 'react';
import PropTypes from 'prop-types';


class Layout extends React.Component {
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

export default Layout;
