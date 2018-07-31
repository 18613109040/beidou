// 地址管理
import { GET_USER } from '../actions/user';
import { isUrl } from '../../../utils/tools';
import { getMenuData } from '../common/menu';

function formatter(data, parentPath = '/', json) {
  return data.map((item) => {
    let { path } = item;
    if (!isUrl(path)) {
      path = parentPath + item.path;
    }
    const result = {
      ...item,
      path,
      auth: 15,
    };
    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.path}/`, json);
    } else if (json) {
      const auth = json.find(it => it.id === item.id).auth;
      result.auth = auth;
    }
    return result;
  });
}
const inintUser = {
  avatar: '',
  email: '',
  modules: formatter(getMenuData()),
};
export function user(state = inintUser, action) {
  const json = action.json;
  switch (action.type) {
    case GET_USER:
      let localMenu = getMenuData();
      if (json.data.role.name === 'Administrator') {
        localMenu = formatter(localMenu);
      } else {
        localMenu = formatter(localMenu, '/', json.data.role.modules);
      }
      return {
        avatar: json.data.avatar,
        email: json.data.email,
        modules: localMenu,
      };
    default:
      return state;
  }
}
