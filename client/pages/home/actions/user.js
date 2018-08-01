import request from 'client/utils/request';

export const GET_USER = 'GET_USER';

// 创建用户
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
export function getUserDetails(id, callback = () => {}) {
  request(`/api/user/${id}`, {
    type: 'json',
    method: 'GET',
    data: {},
    contentType: 'application/json',
  }).then((json) => {
    callback(json);
  });
}

// 更新用户信息
export function updataUser(data, callback = () => {}) {
  request(`/api/user/${data.id}`, {
    type: 'json',
    method: 'PUT',
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
