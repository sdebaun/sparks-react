export const LOGIN_ATTEMPT = 'LOGIN_ATTEMPT'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'

export function login() {
  return function (dispatch) {
    new Promise( (resolve,reject)=>{
      dispatch(loginAttempt());
      setTimeout( ()=> {
        dispatch(loginSuccess());
      }, 3000)
    })
  }
}

export function logout() {
  return { type: LOGOUT_SUCCESS }
}

export function loginAttempt() {
  return { type: LOGIN_ATTEMPT }
}

export function loginSuccess() {
  return { type: LOGIN_SUCCESS }
}
