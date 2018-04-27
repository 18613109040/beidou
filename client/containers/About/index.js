import React from 'react';
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import TabBar from '../../components/TabBar'
import MyJRoll from '../../components/Layout'
import './index.less'

class About extends React.Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props)
    this.state = {}
  }

  componentWillMount() {

  }

  componentDidMount() {


  }

  render() {

    return (
      <div className="">
        <MyJRoll className="testflex" options={{scrollX: true, scrollY: false, widthItem: 200, offset: 10}}>
          <div className="se">
            <img src='http://apod.nasa.gov/apod/image/1502/MarsPlume_jaeschke_480.gif'>
            </img>
          </div>
          <div className="se">
            <img src='http://apod.nasa.gov/apod/image/1502/MarsPlume_jaeschke_480.gif'>
            </img>
          </div>
          <div className="se">
            <img src='http://apod.nasa.gov/apod/image/1502/MarsPlume_jaeschke_480.gif'>
            </img>
          </div>
          <div className="se">
            <img src='http://apod.nasa.gov/apod/image/1502/MarsPlume_jaeschke_480.gif'>
            </img>
          </div>
          <div className="se">
            <img src='http://apod.nasa.gov/apod/image/1502/MarsPlume_jaeschke_480.gif'>
            </img>
          </div>
        </MyJRoll>
        <div><TabBar/></div>
      </div>

    )
  }
}


export default About
