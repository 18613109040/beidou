// 地址管理
import { GET_MODULES } from '../actions/menu';

export function menuTree(state = [], action) {
  const json = action.json;
  switch (action.type) {
    case GET_MODULES:
      return json.data;
    default:
      return state;
  }
}
