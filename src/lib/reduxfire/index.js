import Firebase from 'firebase'

import buildMiddleware from './buildMiddleware'
import {LOCAL_UPDATE} from './types'

import rfAuth from './rfAuth'

class Reduxfire {
  constructor(fbUrl) {
    this.fbUrl = fbUrl
    this.ref = new Firebase(fbUrl)
    this.middleware = buildMiddleware(fbUrl)
    this.auth = new rfAuth(this.ref);
    this.data = new rfData(this.ref);
  }

  // get(type,key) {

  // }
}

class rfData {
  constructor(ref) {
    this.ref = ref
    this.models = {}
  }

  reducer(state=null,action) {
    switch (action.type) {
      case (LOCAL_UPDATE):
        const c = { [action.model]: { [action.key]: action.data } }
        return Object.assign({},state,c);
      default: return state;
    }
  }

  model(name) {
    this.models[name] = this.models[name] || new rfModel(this.ref, name)
    return this.models[name]
  }

}

class rfModel {
  constructor(ref, name) {
    this.name = name
    this.ref = ref.child(name)
    this.actions = {
      watch: (...args)=>this.watch(...args)
    }
  }

  push(val) { return this.ref.push(val); }

  set(key,val) { this.ref.child(key).set(val); }

  watch(key,cb) {
    return (dispatch)=>{
      this.ref.child(key).on('value', (snap)=>{
        dispatch({type:LOCAL_UPDATE, data:snap.val(), model:this.name, key})
        if (cb) cb(snap)
      })
    }
  }

}

export default Reduxfire