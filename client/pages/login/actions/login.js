
import request from 'client/utils/request';

// 用户登录
export function userLogin(data, callback = () => {}) {
  request('/api/user/access/login', {
    type: 'json',
    method: 'POST',
    body: data,
    contentType: 'application/json',
  }).then((json) => {
    callback(json);
  });
}
