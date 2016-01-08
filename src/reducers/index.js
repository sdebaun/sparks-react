import auth from './Auth'
import { routeReducer } from 'redux-simple-router'
import { combineReducers } from 'redux'

export default combineReducers({
  routing: routeReducer,
  auth
})