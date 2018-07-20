import request from 'client/utils/request';

export const GET_ROLE_LIST = 'GET_ROLE_LIST';

export const GET_ROLE_MODULE = 'GET_ROLE_MODULE';
export const CHANGE_ROLE_MODULE = 'CHANGE_ROLE_MODULE';

export const CREATE_ROLE = 'CREATE_ROLE';

// 获取地址
export function getRoleList(data, callback = () => {}) {
  return (dispatch, getState) => {
    request('/api/role', {
      type: 'json',
      method: 'GET',
      body: data,
      contentType: 'application/json',
    }).then((json) => {
      callback(json);
      return dispatch({
        type: GET_ROLE_LIST,
        json,
      });
    });
  };
}

// 创建角色
export function createRole(data, callback = () => {}) {
  request('/api/role', {
    type: 'json',
    method: 'POST',
    body: data,
    contentType: 'application/json',
  }).then((json) => {
    callback(json);
  });
}

// 获取角色列表
export function getRoleModule(json) {
  return {
    type: GET_ROLE_MODULE,
    json,
  };
}

// 改变角色权限
export function changeRoleModule(json) {
  return {
    type: CHANGE_ROLE_MODULE,
    json,
  };
}
