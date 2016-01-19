import Immutable from 'seamless-immutable'

import {LOCAL_UPDATE,REMOTE_WATCH,REMOTE_QUERY,REMOTE_PUSH,REMOTE_SET,REMOTE_UPDATE} from './types'

import rfModel from './rfModel'

const initialState = Immutable({})

const localUpdate = (collection,key,data)=>{
  return {type:LOCAL_UPDATE,collection,key,data}
}

export default class rfData {
  constructor(ref) {
    this.ref = ref
    this.models = {}
  }

  middleware = ({dispatch}) => next => action => {
    const {collection,key,params,val,vals} = action
    switch (action.type) {
      case REMOTE_WATCH:
        this.ref.child(collection).child(key).on('value', (snap)=>dispatch(localUpdate(collection,key,snap.val())))
        break
      case REMOTE_QUERY:
        let q = this.ref.child(collection)
        if (params.orderByChild) { q = q.orderByChild(params.orderByChild) }
        if (params.equalTo) { q = q.equalTo(params.equalTo) }
        q.on('child_added', (snap)=>dispatch(localUpdate(collection,snap.key(),snap.val())))
        q.on('child_changed', (snap)=>dispatch(localUpdate(collection,snap.key(),snap.val())))
        break
      case REMOTE_PUSH:
        return this.ref.child(collection).push(vals)
      case REMOTE_SET:
        this.ref.child(collection).child(key).set(val)
        break
      case REMOTE_UPDATE:
        this.ref.child(collection).child(key).update(vals)
        break
    }
    return next(action)
  }

  reducer(state=initialState,action) {
    switch (action.type) {
      case (LOCAL_UPDATE):
        const val = typeof action.data != 'object' ? action.data : Object.assign({$key:action.key},action.data)
        return state.merge({ [action.collection]: { [action.key]: val } }, {deep:true});
      default: return state;
    }
  }

  model(name,extenders={}) {
    this.models[name] = this.models[name] || new rfModel(this.ref, name, extenders)
    return this.models[name]
  }

}

