import request from 'client/utils/request';

export const SET_MEUN = 'SET_MEUN';

export function getModules(data, callback = () => {}) {
  return (dispatch, getState) => {
    request('/api/modules', {
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
