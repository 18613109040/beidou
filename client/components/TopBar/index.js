import React from 'react'

import Swiper from 'react-id-swiper'
import PropTypes from 'prop-types';
import './index.less'

export default class extends React.Component {
  static propTypes = {
    swiperList: PropTypes.array
  };
  static defaultProps = {
    swiperList:[
      {title:'首页'},{title:'专场'},{title:'新品'},{title:'爆款'},{title:'热兑'},{title:"活动"},{title:"测试"}
    ]
  };
  constructor(props) {
    super(props)
    this.state = {
      selectIndex:0,
      swiper:{}
    }
  }
  componentWillMount () {

  }

  componentDidMount () {
    const swiper = this.refs['top-bar-swiper'].swiper;
    this.setState({
      swiper
    })
  }
  active(index){
    this.setState({
      selectIndex:index
    })
    this.state.swiper.slideTo((index-2 >= 0 ? index-2 : 0), 500, false)
  }
  render () {
    let {swiperList} = this.props;
    let {selectIndex} = this.state;
    return (
      <div className="home-topbar-wrapper">
        <div className="top-menu-bar">
          <Swiper slidesPerView={6} ref='top-bar-swiper'>
            {
              swiperList.map((item, index) => (
                <div key={index} className={`${selectIndex === index ? 'active':''}`} onClick={this.active.bind(this,index)}>{item.title}</div>
              ))
            }
          </Swiper>
        </div>
      </div>
    )
  }
}