import { combineReducers } from 'redux';
import { roleList, roleModule } from './role';
import { menuTree } from './menu';
import { tableList } from './tableBase';

const rootReducer = combineReducers({
  roleList,
  roleModule,
  menuTree,
  tableList,
});

export default rootReducer;
