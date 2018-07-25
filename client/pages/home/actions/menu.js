import request from 'client/utils/request';

export const GET_MODULES = 'GET_MODULES';
// 获取菜单
export function getModules(data, callback = () => {}) {
  return (dispatch) => {
    request('/api/menu', {
      type: 'json',
      method: 'GET',
      body: data,
      contentType: 'application/json',
    }).then((json) => {
      callback(json);
      return dispatch({
        type: GET_MODULES,
        json,
      });
    });
  };
}

// 创建菜单
export function createModules(data, callback = () => {}) {
  request('/api/menu', {
    type: 'json',
    method: 'POST',
    body: data,
    contentType: 'application/json',
  }).then((json) => {
    callback(json);
  });
}

// 更新菜单
export function updateModules(data, callback = () => {}) {
  request(`/api/menu/${data._id}`, {
    type: 'json',
    method: 'PUT',
    body: data,
    contentType: 'application/json',
  }).then((json) => {
    callback(json);
  });
}

// 通过ID删除菜单
export function destroyModule(id, callback = () => {}) {
  request(`/api/menu/${id}`, {
    type: 'json',
    method: 'DELETE',
    contentType: 'application/json',
  }).then((json) => {
    callback(json);
  });
}
