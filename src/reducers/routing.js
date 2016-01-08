import { routeReducer } from 'redux-simple-router'

import {LOGIN_SUCCESS, LOGOUT_SUCCESS} from '../actions'

export default function(state, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      if (state.path == '/') {
        return Object.assign({},state,{path: '/dash'})
      }
    case LOGOUT_SUCCESS:
      if (state.path == '/dash') {
        return Object.assign({},state,{path: '/'})
      }
    default:
      return routeReducer(state,action)
  }
}
