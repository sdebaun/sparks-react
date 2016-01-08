import auth from './auth'
import routing from './routing'

import { combineReducers } from 'redux'

export default combineReducers({
  auth,
  routing
})