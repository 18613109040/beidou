
export function getAuthority() {
  return localStorage.getItem('token') || null;
}

export function setAuthority(token) {
  return localStorage.setItem('token', token);
}
