let storage = window.localStorage;
let cachedToken;
let userToken = 'userToken';

export function setTokenSuccess(token) {
  return { type: 'IS_AUTHENTICATED', token };
}

export function getTokenSuccess(token) {
  return { type: 'IS_AUTHENTICATED', token };
}

export function removeTokenSuccess() {
  return { type: 'NOT_AUTHENTICATED' };
}

export function setToken(token) {
  cachedToken = token;
  storage.setItem(userToken, token);
  return setTokenSuccess(cachedToken)
}

export function getToken() {
  if (!cachedToken)
    cachedToken = storage.getItem(userToken);
  return getTokenSuccess(cachedToken)
}

export function removeToken() {
  cachedToken = null;
  storage.removeItem(userToken);
  return removeTokenSuccess()
}
