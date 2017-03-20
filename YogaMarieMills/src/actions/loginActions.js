import loginApi from '../API/LoginApi';

export function loginRequesting({ email, password }) {
  return { type: 'LOGIN_REQUESTING', email, password, };
}

export function loginSuccess(loginResponse) {
  return { type: 'LOGIN_SUCCESS', loginResponse };
}

export function loginError(loginResponse) {
  return { type: 'LOGIN_ERROR', loginResponse };
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