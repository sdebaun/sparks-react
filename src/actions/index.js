import { pushPath } from 'redux-simple-router'

export const LOGIN_ATTEMPT = 'LOGIN_ATTEMPT'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'

export function login() {
  return function (dispatch, getState) {
    dispatch(loginAttempt());
    setTimeout( ()=> {
      dispatch(loginSuccess());
      if (getState().routing.path == '/') {
        dispatch(pushPath('/dash'));
      }
    }, 2000)
  }
}

export function logout() {
  return function (dispatch) {
    dispatch(logoutSuccess());
    dispatch(pushPath('/'));
  }
}

export function logoutSuccess() {
  return { type: LOGOUT_SUCCESS }
}

export function loginAttempt() {
  return { type: LOGIN_ATTEMPT }
}

export function loginSuccess() {
  return { type: LOGIN_SUCCESS }
}
