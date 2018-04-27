/***
 * 用于侧滑商品列表
 */
import React from 'react'
import PropTypes from 'prop-types';
import Swiper from 'react-id-swiper'
import {Link} from 'react-router-dom'
import  {warningFunc} from '../../utils/tools'
import './index.less'
//高阶函数
function withSubscription(WrappedComponent, selectData) {
  return <WrappedComponent  {...selectData} />;
}

class SliderBar extends React.PureComponent {
  /**
   *
   * @type {{component: *, sliderData: *, params: *}}
   * @component 组件
   * @sliderData 渲染数据
   * @params 参数
   */
  static propTypes = {
    component: PropTypes.element,
    sliderData: PropTypes.array,
    params: PropTypes.object
  };
  static defaultProps = {
    sliderData: [],
    component: {},
    params: {
      slidesPerView: 'auto',
      spaceBetween: 20 //间距 （px）

    }
  };
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const {sliderData, component, params} = this.props;
    //if (warningFunc(this.props.component)) {
      return (
        <div className="slider-bar">
          <Swiper ref='top-bar-swiper' {...params} >
            <div className="pre-col"></div>
            {
              sliderData.map((item, index) => (
                <div key={index}>{
                  withSubscription(component, item)
                }
                </div>
                )
              )
            }
            <div>查看更多</div>
          </Swiper>
        </div>
      )
    //}

  }
}

export default SliderBar