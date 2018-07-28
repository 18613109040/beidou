// 地址管理
import { GET_MODULES } from '../actions/menu';
import store from 'store';

export function menuTree(state = [], action) {
  const json = action.json;
  switch (action.type) {
    case GET_MODULES:
      store.set('menu', json.data);
      return json.data;
    default:
      return state;
  }
}
