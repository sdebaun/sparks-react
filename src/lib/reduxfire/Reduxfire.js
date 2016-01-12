import Firebase from 'firebase'

import buildMiddleware from './buildMiddleware'
import {LOCAL_UPDATE} from './types'

import rfAuth from './rfAuth'

const actions={
  localUpdate: (collection,key,data)=>{ return {type:LOCAL_UPDATE, collection, key, data} }
}

class Reduxfire {
  constructor(fbUrl) {
    this.fbUrl = fbUrl
    this.ref = new Firebase(fbUrl)
    this.middleware = buildMiddleware(fbUrl)
    this.auth = new rfAuth(this.ref);
    this.data = new rfData(this.ref);
  }

  watch(collection,key) {
    return (dispatch)=>{
      if (!collection || !key) return
      this.ref.child(collection).child(key).on('value', (snap)=>dispatch(actions.localUpdate(collection,key,snap.val())))
    }
  }

}

class rfData {
  constructor(ref) {
    this.ref = ref
    this.models = {}
  }

  reducer(state={},action) {
    switch (action.type) {
      case (LOCAL_UPDATE):
        const c = { [action.collection]: { [action.key]: action.data } }
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
    this.selectors = {
      loaded: (state,key)=>state.data[this.name] && (key in state.data[this.name]),
      single: (state,key)=>state.data[this.name] && state.data[this.name][key],
    }
  }

  push(val) {
    return ()=>{
      return new Promise( (resolve)=>{
        resolve(this.ref.child(this.name).push(val).key())
      })
    }
  }

  set(key,val) {
    return ()=>{
      this.ref.child(key).set(val);
    }
  }


  // watch(key,cb) {
  //   return (dispatch)=>{
  //     this.ref.child(key).on('value', (snap)=>{
  //       dispatch({type:LOCAL_UPDATE, data:snap.val(), model:this.name, key})
  //       if (cb) cb(snap)
  //     })
  //   }
  // }

}

export default Reduxfire