import request from 'client/utils/request';

export const TABLE_LIST = 'TABLE_LIST';


// 获取表格数据
export function tableList(url, data, callback = () => {}) {
  return (dispatch) => {
    request(url, {
      type: 'json',
      method: 'GET',
      body: data,
      contentType: 'application/json',
    }).then((json) => {
      callback(json);
      return dispatch({
        type: TABLE_LIST,
        json,
      });
    });
  };
}

// 删除表格数据
export function tableDelete(url, data, callback = () => {}) {
  request(url, {
    type: 'json',
    method: 'DELETE',
    body: data,
    contentType: 'application/json',
  }).then((json) => {
    callback(json);
  });
}
