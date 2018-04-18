import {combineReducers} from 'redux'
import {home,tabBarData} from './home'
const rootReducer = combineReducers({
  home,
  tabBarData
})

export default rootReducer
