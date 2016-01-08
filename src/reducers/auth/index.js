import { combineReducers } from 'redux'

import {LOGIN_ATTEMPT, LOGIN_SUCCESS, LOGOUT_SUCCESS} from '../../actions'

import profile from './profile'

export default combineReducers({
  uid: (state=null, action)=> {
    switch (action.type) {
      case LOGIN_ATTEMPT: return null
      case LOGIN_SUCCESS: return action.uid
      case LOGOUT_SUCCESS: return null
      default: return state
    }
  },
  isLoggingIn: (state=false, action)=> {
    switch (action.type) {
      case LOGIN_ATTEMPT: return true
      case LOGIN_SUCCESS: return false
      default: return state
    }
  },
  isAuthed: (state=false, action)=> {
    switch (action.type) {
      case LOGIN_ATTEMPT: return false
      case LOGIN_SUCCESS: return true
      case LOGOUT_SUCCESS: return false
      default: return state
    }
  },
  profile
})

// export default function(state = initialState, action) {
//   console.log('auth state change', action);
//   switch (action.type) {
//     case LOGIN_ATTEMPT:
//       return Object.assign({}, initialState, {
//         isLoggingIn: true
//       })
//     case LOGIN_SUCCESS:
//       return Object.assign({}, initialState, {
//         isAuthed: true,
//         uid: action.uid,
//         profile: profile(state.profile,action)
//       })
//     case LOGOUT_SUCCESS:
//       return Object.assign({}, state, initialState)
//     default:
//       return state
//   }
// }
