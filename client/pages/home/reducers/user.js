// 地址管理
import { GET_USER } from '../actions/user';
import { formatter } from '../../../utils/utils';
import { getMenuData } from '../common/menu';


const inintUser = {
  avatar: '',
  email: '',
  modules: formatter(getMenuData()) || [],
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
      return Object.assign({}, {
        avatar: json.data.avatar,
        email: json.data.email,
        modules: [...localMenu],
      });
    default:
      return Object.assign({}, state);
  }
}
