import loginApi from '../API/LoginApi';

let storage = window.localStorage;
let cachedToken;
let userToken = 'userToken';

export function loginSuccess(authToken) {
  cachedToken = authToken;
  storage.setItem(userToken, JSON.stringify(authToken));
  debugger;
  return { type: 'IS_AUTHENTICATED', authToken };
}

export function loginError(error) {
  return { type: 'NOT_AUTHENTICATED', error };
}

export function logOutSuccess() {
  cachedToken = null;
  storage.removeItem(userToken);
  return { type: 'NOT_AUTHENTICATED' };
}

export function loginRequest(login) {
  return function (dispatch, getState) {
    return loginApi.loginRequest(login).then(loginResponse => {
      loginResponse.token ? dispatch(loginSuccess(loginResponse)) :
        dispatch(loginError(loginResponse));
    }).catch(error => {
      throw (error);
    });
  };
}

export function authenticate() {
  return function (dispatch) {
    if (!cachedToken)
      cachedToken = storage.getItem(userToken);
    return new Promise((resolve, reject) => {
      if (cachedToken) {
        dispatch(loginSuccess(cachedToken))
        resolve(cachedToken);
      }
      else {
        dispatch(loginError(''));
        resolve('Access not Authorized');
      }
    });
  };
}

export function getToken() {
  if (!cachedToken)
    cachedToken = storage.getItem(userToken);

  return cachedToken;
}

export function logOut() {
  return function (dispatch, getState) {
    return dispatch(logOutSuccess())
  };
}