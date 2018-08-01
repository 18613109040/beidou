import request from 'client/utils/request';

export const GET_ROLE_LIST = 'GET_ROLE_LIST';

export const GET_ROLE_DETAILS = 'GET_ROLE_DETAILS';

export const CHANGE_ROLE_MODULE = 'CHANGE_ROLE_MODULE';

export const CREATE_ROLE = 'CREATE_ROLE';

// 获取地址
export function getRoleList(data, callback = () => {}) {
  return (dispatch) => {
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
// 更新角色
export function updataRole(data, callback = () => {}) {
  request(`/api/role/${data.id}`, {
    type: 'json',
    method: 'PUT',
    body: data,
    contentType: 'application/json',
  }).then((json) => {
    callback(json);
  });
}

// 获取角色详情
export function getRoleDetails(id, callback = () => {}) {
  return (dispatch) => {
    request(`/api/role/${id}`, {
      type: 'json',
      method: 'GET',
      data: {},
      contentType: 'application/json',
    }).then((json) => {
      callback(json);
      return dispatch({
        type: GET_ROLE_DETAILS,
        json,
      });
    });
  };
}


// 改变角色权限
export function changeRoleModule(json) {
  return {
    type: CHANGE_ROLE_MODULE,
    json,
  };
}
