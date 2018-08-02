
export function getAuthority() {
  // return localStorage.getItem('antd-pro-authority') || ['admin', 'user'];
  return localStorage.getItem('token') || null;
}

export function setAuthority(token) {
  return localStorage.setItem('token', token);
}
