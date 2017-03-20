let storage = window.localStorage;
let cachedToken;
let userToken = 'userToken';

export function setTokenSuccess(cachedToken) {
  return { type: 'IS_AUTHENTICATED', cachedToken };
}

export function getTokenSuccess(cachedToken) {
  return { type: 'IS_AUTHENTICATED', cachedToken };
}

export function removeTokenSuccess() {
  return { type: 'NOT_AUTHENTICATED' };
}

export function setToken(token) {
  return function (dispatch, getState) {
    cachedToken = token;
    storage.setItem(userToken, token);
    dispatch(setTokenSuccess(cachedToken)).then(() => {
    }).catch(error => {
      throw (error);
    });
  };
}

export function getToken(blog) {
  return function (dispatch, getState) {
    if (!cachedToken)
      cachedToken = storage.getItem(userToken);
    dispatch(getTokenSuccess(cachedToken)).then(() => {
    }).catch(error => {
      throw (error);
    });
  };
}

export function removeToken(blog) {
  return function (dispatch, getState) {
    cachedToken = null;
    storage.removeItem(userToken);
    dispatch(removeTokenSuccess()).then(() => {
    }).catch(error => {
      throw (error);
    });
  };
}
