import {LOGIN_ATTEMPT, LOGIN_SUCCESS, LOGOUT_SUCCESS} from '../../actions'

const initialState = {
  isAuthed: false,
  isLoggingIn: false,
  uid: null,
  profile: null
}

export default function(state = initialState, action) {
  console.log('auth state change', action);
  switch (action.type) {
    case LOGIN_ATTEMPT:
      return Object.assign({}, initialState, {
        isLoggingIn: true
      })
    case LOGIN_SUCCESS:
      return Object.assign({}, initialState, {
        isAuthed: true,
        uid: action.uid,
        profile: action.profile
      })
    case LOGOUT_SUCCESS:
      return Object.assign({}, state, initialState)
    default:
      return state
  }
}
