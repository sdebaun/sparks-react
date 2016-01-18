import Immutable from 'seamless-immutable'

import {LOCAL_UPDATE,REMOTE_WATCH,REMOTE_QUERY,REMOTE_PUSH,REMOTE_SET,REMOTE_UPDATE} from './types'

import rfModel from './rfModel'

const initialState = Immutable({})

export default class rfData {
  constructor(ref) {
    this.ref = ref
    this.models = {}
  }

  middleware = ({dispatch,getState}) => next => action => {
    switch (action.type) {
      case REMOTE_WATCH:
        break
      case REMOTE_QUERY:
        break
      case REMOTE_PUSH:
        break
      case REMOTE_SET:
        break
      case REMOTE_UPDATE:
        break
      default:
        return next(action)
    }
  }

  reducer(state=initialState,action) {
    switch (action.type) {
      case (LOCAL_UPDATE):
        return state.merge({ [action.collection]: { [action.key]: action.data } }, {deep:true});
      default: return state;
    }
  }

  model(name) {
    this.models[name] = this.models[name] || new rfModel(this.ref, name)
    return this.models[name]
  }

}

