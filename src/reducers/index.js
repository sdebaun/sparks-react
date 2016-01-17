import { combineReducers } from 'redux'
import {reducer as formReducer} from 'redux-form'

import routing from './routing'
import remote from '../remote'

export default combineReducers({
  auth: remote.auth.reducer,
  data: remote.data.reducer,
  form: formReducer,
  routing,
  navPopout: (state=false,action)=>{
    switch (action.type) {
      case '@@router/UPDATE_PATH': return false
      case 'POPOUT_TOGGLE': return !state
      default: return state
    }
  }
})