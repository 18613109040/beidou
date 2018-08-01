// 地址管理
import { GET_ROLE_LIST, CHANGE_ROLE_MODULE, GET_ROLE_DETAILS } from '../actions/role';
import { getRouters } from '../common/menu';

export function roleModules(state = getRouters(), action) {
  const json = action.json;
  switch (action.type) {
    case GET_ROLE_DETAILS:
      state.map((item) => {
        const data = json.data.modules.find(it => it.id === item.id);
        if (data) {
          return Object.assign(item, { auth: data.auth });
        } else {
          return Object.assign(item, { auth: 0 });
        }
      });
      return [...state];
    case CHANGE_ROLE_MODULE:
      state[json.index].auth = json.auth;
      return [...state];
    default:
      return [...state];
  }
}
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
function getPermission(data, roleModule) {
  data.map((item) => {
    if (item.children) {
      getPermission(item.children, roleModule);
    } else {
      roleModule.push(item);
    }
    return item;
  });
  return roleModule;
}

