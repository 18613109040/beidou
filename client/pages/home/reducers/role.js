// 地址管理
import { GET_ROLE_LIST } from '../actions/role';

const roleInint = {
  count: 0,
  currentPage: 1,
  list: [],
  pageSize: 1,
};
export function roleList(state = roleInint, action) {
  const json = action.json;
  switch (action.type) {
    case GET_ROLE_LIST:
      return json.data;
    default:
      return state;
  }
}

