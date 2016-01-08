import Firebase from 'firebase'

export const LOGIN_ATTEMPT = 'LOGIN_ATTEMPT'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const PROFILE_LOADED = 'PROFILE_LOADED'

export function listenToAuth() {
  return function (dispatch, getState) {
    const ref = new Firebase(getState().fbUrl)
    ref.onAuth( (authData)=>{
      if (authData) {
        // get back a uid, look up or generate the profile, then finally...
        dispatch(loginSuccess(authData.uid, authData));
      } else {
        dispatch({ type: LOGOUT_SUCCESS });
      }
    })
  }
}

export function login() {
  return function (dispatch, getState) {    
    dispatch({ type: LOGIN_ATTEMPT });
    const ref = new Firebase(getState().fbUrl)
    ref.authWithOAuthRedirect('google', (error)=>{
      if (error) { dispatch({type:LOGOUT_SUCCESS}) }
    })
  }
}

export function logout() {
  return function (dispatch, getState) {
    const ref = new Firebase(getState().fbUrl)
    ref.unauth();
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
