import request from 'client/utils/request';

export const GET_ROLE_LIST = 'GET_ROLE_LIST';

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
