import { combineReducers } from 'redux';
import { roleList, roleModule } from './role';

const rootReducer = combineReducers({
  roleList,
  roleModule,
});

export default rootReducer;
