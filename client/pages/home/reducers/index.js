import { combineReducers } from 'redux';
import { roleList, roleModules } from './role';
import { menuTree } from './menu';
import { tableList } from './tableBase';
import { user } from './user';

const rootReducer = combineReducers({
  roleList,
  roleModules,
  menuTree,
  user,
  tableList,
});

export default rootReducer;
