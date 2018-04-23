import React from 'react';
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import {connect} from "react-redux";
import {Main} from "./Main.js";
class Activity extends React.Component {
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
    new Main('myCanvas');

  }

  render() {

    return(
      <div className="home">
        <canvas id="myCanvas" width={750} height={1334} ></canvas>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {

  }
}

export default connect(mapStateToProps)(Activity)
