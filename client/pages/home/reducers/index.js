import { combineReducers } from 'redux';
import { roleList, roleModules } from './role';
import { menuTree } from './menu';
import { tableList } from './tableBase';

const rootReducer = combineReducers({
  roleList,
  roleModules,
  menuTree,
  tableList,
});

export default rootReducer;
