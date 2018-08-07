import request from 'client/utils/request';
// 获取APP版本详情
export function getAppVersionDetails(id) {
  return request(`/api/app-version/${id}`, {
    type: 'json',
    method: 'GET',
    data: {},
    contentType: 'application/json',
  });
}

// 新增APP版本
export function createAppVersion(data) {
  return request('/api/app-version', {
    type: 'json',
    method: 'POST',
    body: data,
    contentType: 'application/json',
  });
}

// 更新APP版本
export function updataAppVsersion(data) {
  return request(`/api/app-version/${data.id}`, {
    type: 'json',
    method: 'PUT',
    body: data,
    contentType: 'application/json',
  });
}

// 获取APP所有版本号
export function getAppVsersionList(data) {
  return request('/api/app-version', {
    type: 'json',
    method: 'GET',
    body: data,
    contentType: 'application/json',
  });
}

// 获取app

export function findByAppVersion(data) {
  return request('/api/app-version/findByAppVersion', {
    type: 'json',
    method: 'GET',
    body: data,
    contentType: 'application/json',
  });
}
