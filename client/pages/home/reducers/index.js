import { combineReducers } from 'redux';
import { roleList, roleModule } from './role';
import { menuTree } from './menu';

const rootReducer = combineReducers({
  roleList,
  roleModule,
  menuTree,
});

export default rootReducer;
