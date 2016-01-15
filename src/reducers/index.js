import routing from './routing'
import remote from '../remote'

import { combineReducers } from 'redux'

export default combineReducers({
  auth: remote.auth.reducer,
  data: remote.data.reducer,
  routing,
  navPopout: (state=false,action)=>{
    switch (action.type) {
      case '@@router/UPDATE_PATH': return false
      case 'POPOUT_TOGGLE': return !state
      default: return state
    }
  }
})