import Firebase from 'firebase'

import {LOCAL_UPDATE} from './types'

import rfAuth from './rfAuth'
import rfData from './rfData'

// const actions={
//   localUpdate: (collection,key,data)=>{ return {type:LOCAL_UPDATE, collection, key, data} },
//   remoteWatch: (collection,key)=>{return {type:REMOTE_WATCH,collection,key} },
//   remoteQuery: (collection,params)=>{return {type:REMOTE_QUERY,collection,params} }
// }

class Reduxfire {
  constructor(fbUrl) {
    this.fbUrl = fbUrl
    this.ref = new Firebase(fbUrl)
    this.auth = new rfAuth(this.ref);
    this.data = new rfData(this.ref);
  }

  // watch(collection,key) {
  //   return (dispatch)=>{
  //     if (!collection || !key) return
  //     this.ref.child(collection).child(key).on('value', (snap)=>dispatch(actions.localUpdate(collection,key,snap.val())))
  //   }
  // }

  // query(collection,params={}) {
  //   return (dispatch)=>{
  //     if (!collection) return
  //     let q = this.ref.child(collection)
  //     if (params.orderByChild) { q = q.orderByChild(params.orderByChild) }
  //     if (params.equalTo) { q = q.equalTo(params.equalTo) }
  //     q.on('child_added', (snap)=>dispatch(actions.localUpdate(collection,snap.key(),snap.val())))
  //     q.on('child_changed', (snap)=>dispatch(actions.localUpdate(collection,snap.key(),snap.val())))
  //   }
  // }
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
