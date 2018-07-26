import request from 'client/utils/request';
// 获取地址
export function createUser(data, callback = () => { }) {
    request('/api/user', {
        type: 'json',
        method: 'POST',
        body: data,
        contentType: 'application/json',
    }).then((json) => {
        callback(json);
    });
}