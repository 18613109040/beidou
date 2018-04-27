import {storage} from '../utils/tools'
export function home(state={}, action) {
    let json = action.json;
    switch (action.type) {
        case 'ADD':
            // const {imadvertlist,imcampaginList,imcategorylist} = json;
            // let {data} = imadvertlist;
            // data.map(item=>{
            //     if(storage.get(item.imageUrl)){
            //         item.imageUrl = storage.get(item.imageUrl)
            //     }
            // })
            return json
        default:
            return state
    }
}

//设置TabBar 数据
const initTabBarData=[{
  title:"首页",
  link:"/vb/home",
  icon:require("../assets/images/home.png"),
  selectedIcon:require("../assets/images/home-fill.png")
},{
  title:"分类",
  link:"/vb/category",
  icon:require("../assets/images/class.png"),
  selectedIcon:require("../assets/images/class-fill.png")

},{
  title:"购物车",
  link:"/vb/cart",
  icon:require("../assets/images/cart.png"),
  selectedIcon:require("../assets/images/cart-fill.png")
},{
  title:"我的",
  link:"/vb/user",
  icon:require("../assets/images/my.png"),
  selectedIcon:require("../assets/images/my-fill.png")
}]
export  function tabBarData(state=initTabBarData,action) {
  return state;
}