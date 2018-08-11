import request from 'client/utils/request';
// 获取开屏广告详情
export function getAppLaunchAdDetails(id) {
  return request(`/api/app-launch-ad/${id}`, {
    type: 'json',
    method: 'GET',
    data: {},
    contentType: 'application/json',
  });
}

// 新增开屏广告
export function createAppLaunchAd(data) {
  return request('/api/app-launch-ad', {
    type: 'json',
    method: 'POST',
    body: data,
    contentType: 'application/json',
  });
}

// 更新开屏广告
export function updataAppVsersion(data) {
  return request(`/api/app-launch-ad/${data.id}`, {
    type: 'json',
    method: 'PUT',
    body: data,
    contentType: 'application/json',
  });
}

