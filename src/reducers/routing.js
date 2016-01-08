import { routeReducer } from 'redux-simple-router'

import {LOGIN_SUCCESS, LOGOUT_SUCCESS} from '../actions'

export default function(state, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      if (!state.path.startsWith('/dash')) {
        return Object.assign({},state,{path: '/dash'})
      } else {
        return state
      }
    case LOGOUT_SUCCESS:
      if (state.path.startsWith('/dash')) {
        return Object.assign({},state,{path: '/'})
      } else {
        return state
      }
    default:
      return routeReducer(state,action)
  }
}
