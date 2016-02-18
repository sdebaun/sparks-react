import Immutable from 'seamless-immutable'

import {LOCAL_UPDATE,REMOTE_ACTION,REMOTE_WATCH,REMOTE_QUERY} from './types'

import rfModel from './rfModel'

const initialState = Immutable({})

const localUpdate = (collection,key,data)=>{
  return {type:LOCAL_UPDATE,collection,key,data}
}

function removeNulls(obj){
  for (var k in obj){
    if (!obj[k]) delete obj[k];
    else if (typeof obj[k]=='object') removeNulls(obj[k]);
  }
}

export default class rfData {
  constructor(ref) {
    this.ref = ref
    this.models = {}
    this.cache = {}
  }

  addWatch = (collection,key,dispatch)=> {
    if (this.cache[collection + key]) {
      // console.log('hit watch cache on',collection,key)
      return
    }
    // console.log('new watch on',collection,key)
    this.ref.child(collection).child(key).on('value', (snap)=>dispatch(localUpdate(collection,key,snap.val())))
    this.cache[collection + key] = true
  }

  addQuery = (collection,params,dispatch)=> {
    const cacheKey = collection + ':' + Object.keys(params).map(k=>params[k]).join('|')
    if (this.cache[ cacheKey ]) {
      // console.log('hit query cache on',cacheKey)
      return
    }
    // console.log('new query on',cacheKey)
    let q = this.ref.child(collection)
    if (params.orderByChild) { q = q.orderByChild(params.orderByChild) }
    if (params.equalTo) { q = q.equalTo(params.equalTo) }
    q.on('child_added', (snap)=>dispatch(localUpdate(collection,snap.key(),snap.val())))
    q.on('child_changed', (snap)=>dispatch(localUpdate(collection,snap.key(),snap.val())))
    q.on('child_removed', (snap)=>dispatch(localUpdate(collection,snap.key(),null)))
    this.cache[ cacheKey ] = true
  }

  middleware = ({dispatch, getState}) => next => action => {
    const {collection,op,key,params,payload} = action
    switch (action.type) {
      case REMOTE_WATCH:
        this.addWatch(collection,key,dispatch)
        break
      case REMOTE_QUERY:
        this.addQuery(collection,params,dispatch)
        break
      case REMOTE_ACTION:
        const client = getState().auth.uid
        removeNulls(payload)
        this.ref.child('tasks').push({client, collection, op, payload})
        break
      // case REMOTE_PUSH:
      //   return this.ref.child(collection).push(vals)
      // case REMOTE_SET:
      //   this.ref.child(collection).child(key).set(val)
      //   break
      // case REMOTE_UPDATE:
      //   Object.keys(vals).forEach( k=> !vals[k] && delete vals[k] )
      //   this.ref.child(collection).child(key).update(vals)
      //   break
    }
    return next(action)
  }

  reducer(state=initialState,action) {
    switch (action.type) {
      case (LOCAL_UPDATE):
        console.log('local update', action.key, action.data)
        const val = typeof action.data != 'object' ? action.data : Object.assign({$key:action.key},action.data)
        return state.setIn([action.collection, action.key],val)
      default: return state;
    }
  }

  model(name,extenders={}) {
    this.models[name] = this.models[name] || new rfModel(this.ref, name, extenders)
    return this.models[name]
  }

}

