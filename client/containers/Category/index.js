import React from 'react';
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import {connect} from "react-redux";
import TabBar from '../../components/TabBar'
import ListView from  '../../components/ListView'
import FilterBar from '../../components/FilterBar'
import {testAjax} from  '../../actions/home'
import objectAssign  from 'object-assign'
class Item extends  React.PureComponent{
  constructor(props){
    super(props)
  }
  render(){
    return (<div>
      测试组件
    </div>)
  }

}
class Category extends React.Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  };
  constructor(props) {
    super(props)
    const {pathname} = this.props.location;
    this.state = {
      params:{
        sortType:"comprehensive",
        supplierId:""
      },
      filterData:[
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
          up: true,
          down: false
        }
      ]
    }
  }
  componentWillMount() {
  }

  componentDidMount() {


  }
  clickBar=(selectIndex)=>{
    console.dir(selectIndex)
    let {filterData,params} = this.state;
    filterData.map((item,index)=>{
      if(selectIndex == index){
        item.selected = true;
        item.up = !item.up;
        item.down = !item.down;
      }else{
        item.selected = false;
      }
    })
    this.setState({
      filterData,
      params:objectAssign({},params,
      {sortType:filterData[selectIndex].up?filterData[selectIndex].upname:filterData[selectIndex].downname})

    })
  }
  render() {
    const {tabBarData} = this.props;
    let {filterData,params} = this.state;
    return (
      <div className="cate-gory">
        <FilterBar
          clickBar={this.clickBar}
          filterData={filterData}
        />
        <ListView
          fiterData={params}
          FetchAction={testAjax}
          component={<Item/>}
          top={1}
          bottom={1}
        />
        <TabBar tabs={tabBarData} />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    tabBarData:state.tabBarData
  }
}

export default connect(mapStateToProps)(Category)
