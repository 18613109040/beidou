import request from 'client/utils/request';

export const GET_MODULES = 'GET_MODULES';

// 创建菜单
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
