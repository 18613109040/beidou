import React from 'react';
import PropTypes from 'prop-types'
import './index.less'
class FilterBar extends React.Component {
  static propTypes = {
    clickBar: PropTypes.func,
    filterData: PropTypes.array
  };
  static defaultProps = {
    filterData: [
      {
        name: "综合",
        selected: true,
        downname: "comprehensive",
        upname: "comprehensive",
        up: true,
        down: false
      }, {
        name: "销量优先",
        selected: false,
        downname: "cost",
        upname: "cost",
        up: false,
        down: false
      }, {
        name: "价格",
        selected: false,
        downname: "descPrice",
        upname: "ascPrice",
        up: false,
        down: false
      }
    ]
  };

  constructor(props) {
    super(props)
    this.state = {

    }
  }
  filterBarClick(index){
    if (this.props.clickBar instanceof Function) {
      this.props.clickBar(index)
    }
  }

  render() {
    let {filterData} = this.props;
    return (
      <div className="filter-bar">
        {
          filterData.map((item, index) =>
            <div className="meun" key={index} onClick={this.filterBarClick.bind(this,index)} >
              <div className={item.selected ? 'select' : ''}>{item.name}</div>
              {
                item.downname == item.upname ? "" : <div>
                  <div className={item.up&&item.selected ? 'iconfont icon-top box select' : 'iconfont icon-top box'}></div>
                  <div className={item.down&&item.selected  ? 'iconfont icon-down box select' : 'iconfont icon-down box'}></div>
                </div>
              }
            </div>
          )
        }
      </div>
    )

  }
}

export default FilterBar