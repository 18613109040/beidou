import React from 'react';
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import { Switch,Route } from 'react-router-dom'
import {connect} from "react-redux";
import TabBar from './components/TabBar'
import Home from './containers/Home/index'
import Category from './containers/Category/index'
import Cart from './containers/Cart/index'
import User from './containers/User/index'
class App extends React.Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  };
  constructor(props) {
    super(props)
    const {pathname} = this.props.location;
    this.state = {
      hidden: false,
      tabBarData:[{
        title:"首页",
        link:"/home",
        icon:"http://testxws.sibumbg.com/resources/client/images/3BVdfCFikk.png",
        selectedIcon:"http://testxws.sibumbg.com/resources/client/images/35nXHFWYgg.png",
        selected:pathname == "/home"?true:false
      },{
        title:"分类",
        link:"/category",
        icon:"http://testxws.sibumbg.com/resources/client/images/3BVdfCFikk.png",
        selectedIcon:"http://testxws.sibumbg.com/resources/client/images/35nXHFWYgg.png",
        selected:pathname == "/category"?true:false

      },{
        title:"购物车",
        link:"/cart",
        icon:"http://testxws.sibumbg.com/resources/client/images/3BVdfCFikk.png",
        selectedIcon:"http://testxws.sibumbg.com/resources/client/images/35nXHFWYgg.png",
        selected:pathname == "/cart"?true:false
      },{
        title:"我的",
        link:"/user",
        icon:"http://testxws.sibumbg.com/resources/client/images/3BVdfCFikk.png",
        selectedIcon:"http://testxws.sibumbg.com/resources/client/images/35nXHFWYgg.png",
        selected:pathname == "/user"?true:false
      }]
    }
  }

  componentWillMount() {
  }

  componentDidMount() {

  }

  render() {

    const {tabBarData} = this.state;

    return (
      <div className="app">
        <Switch>
          <Route  path="/home" exact component={Home} />
          <Route  path="/category" exact component={Category} />
          <Route  path="/cart" exact component={Cart} />
          <Route  path="/user" exact component={User} />
        </Switch>
        <TabBar tabs={tabBarData}/>
      </div>
    )
  }
}


export default App
