export const LOGIN_ATTEMPT = 'LOGIN_ATTEMPT'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const PROFILE_LOADED = 'PROFILE_LOADED'

export function login() {
  return function (dispatch, getState) {
    dispatch({ type: LOGIN_ATTEMPT });
    setTimeout( ()=> {
      // get back a uid, look up or generate the profile, then finally...
      dispatch(loginSuccess(1234, {some:'stuff'}));
    }, 1000)
  }
}

export function logout() {
  return function (dispatch) {
    dispatch({ type: LOGOUT_SUCCESS });
  }
}

export function loginSuccess(uid,profile) {
  return {
    type: LOGIN_SUCCESS,
    uid,
    profile
  }
}
