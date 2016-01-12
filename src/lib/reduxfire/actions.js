import {AUTH_START, AUTH_SUCCESS, AUTH_FAIL} from './types'

export function loginAction() {
  return function (dispatch, getState) {    
    dispatch({ type: LOGIN_ATTEMPT });
    const ref = new Firebase(getState().fbUrl)
    ref.authWithOAuthRedirect('google', (error)=>{
      if (error) { dispatch({type:LOGOUT_SUCCESS}) }
    }, {scope:'email'})
  }
}

export function logoutAction() {
  return function (dispatch, getState) {
    const ref = new Firebase(getState().fbUrl)
    ref.unauth();
    dispatch({ type: LOGOUT_SUCCESS });
  }
}

