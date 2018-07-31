import request from 'client/utils/request';

export const GET_USER = 'GET_USER';
// 获取地址
export function createUser(data, callback = () => {}) {
  request('/api/user', {
    type: 'json',
    method: 'POST',
    body: data,
    contentType: 'application/json',
  }).then((json) => {
    callback(json);
  });
}

// 获取用户信息
export function getUser(data, callback = () => {}) {
  return (dispatch) => {
    request('/api/user/detail', {
      type: 'json',
      method: 'GET',
      body: data,
      contentType: 'application/json',
    }).then((json) => {
      callback(json);
      return dispatch({
        type: GET_USER,
        json,
      });
    });
  };
}
