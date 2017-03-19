export function setClient(token) {
  return { type: 'CLIENT_SET', token };
}

export function unsetClient(token) {
  return { type: 'CLIENT_UNSET' };
}