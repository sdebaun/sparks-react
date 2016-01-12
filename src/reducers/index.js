import auth from './auth'
import routing from './routing'
import remote from '../remote'

import { combineReducers } from 'redux'

export default combineReducers({
  auth: remote.auth.reducer,
  // data: remote.data.reducer,
  routing,
})