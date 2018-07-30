// 地址管理
import { GET_ROLE_LIST, GET_ROLE_MODULE, CHANGE_ROLE_MODULE } from '../actions/role';
import modules from '../common/modules';

export function roleModules(state = modules, action) {
  const json = action.json;
  switch (action.type) {
    case GET_ROLE_MODULE:
      return json;
    case CHANGE_ROLE_MODULE:
      state[json.index].auth = json.auth;
      return [...state];
    default:
      return state;
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
      roleModule.push({ name: item.name, path: item.path.split('/').pop(), operating: item.operating, id: item.id });
    }
    return item;
  });
  return roleModule;
}


// export function roleModule(state = [], action) {
//   const json = action.json;
//   switch (action.type) {
//     case GET_ROLE_MODULE:
//       state = [];
//       json.map((item) => {
//         if (item.children) {
//           getPermission(item.children, state);
//         }
//         return item;
//       });
//       return state;
//     case CHANGE_ROLE_MODULE:
//       state[json.index].operating = json.checkedList;
//       return [...state];
//     default:
//       return state;
//   }
// }

