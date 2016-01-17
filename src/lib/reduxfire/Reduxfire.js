import Firebase from 'firebase'
import Immutable from 'seamless-immutable'

import {LOCAL_UPDATE} from './types'

import rfAuth from './rfAuth'

const actions={
  localUpdate: (collection,key,data)=>{ return {type:LOCAL_UPDATE, collection, key, data} }
}

class Reduxfire {
  constructor(fbUrl) {
    this.fbUrl = fbUrl
    this.ref = new Firebase(fbUrl)
    this.auth = new rfAuth(this.ref);
    this.data = new rfData(this.ref);
  }

  watch(collection,key) {
    return (dispatch)=>{
      if (!collection || !key) return
      this.ref.child(collection).child(key).on('value', (snap)=>dispatch(actions.localUpdate(collection,key,snap.val())))
    }
  }

  query(collection,params={}) {
    return (dispatch)=>{
      if (!collection) return
      let q = this.ref.child(collection)
      if (params.orderByChild) { q = q.orderByChild(params.orderByChild) }
      if (params.equalTo) { q = q.equalTo(params.equalTo) }
      q.on('child_added', (snap)=>dispatch(actions.localUpdate(collection,snap.key(),snap.val())))
    }
  }
}

const initialState = Immutable({})

class rfData {
  constructor(ref) {
    this.ref = ref
    this.models = {}
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

class rfModel {
  constructor(ref, name) {
    this.name = name
    this.ref = ref.child(name)
    this.actions = {
      watch: (...args)=>this.watch(...args)
    }
    this.selectors = {
      loaded: (state,key)=>state.data[this.name] && (key in state.data[this.name]),
      single: (state,key)=>state.data[this.name] && state.data[this.name][key]
    }
  }

  push(val) {
    return ()=>{
      return new Promise( (resolve)=>{
        resolve(this.ref.push(val).key())
      })
    }
  }

  set(key,val) {
    return ()=>{
      this.ref.child(key).set(val);
    }
  }

}

export default Reduxfire

// function OAuthToProfile(authData) {
//   const provider = authData.provider,
//     d = authData[provider];

//   switch (provider) {
//     case 'google':
//       return {
//         uid: authData.uid,
//         fullName: d.displayName,
//         email: d.email,
//         profileImageURL: d.profileImageURL
//       }
//     case 'facebook':
//       return {
//         uid: authData.uid,
//         fullName: 'FB Full name',
//         email: 'FB email',
//         profileImageURL: 'FB image url'
//       }
//     default:
//       throw 'Can only handle google or facebook oauth.'
//   }
// }
