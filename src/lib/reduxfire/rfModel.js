import {REMOTE_WATCH,REMOTE_QUERY,REMOTE_PUSH,REMOTE_SET,REMOTE_UPDATE} from './types'

// const actions={
//   localUpdate: (collection,key,data)=>{ return {type:LOCAL_UPDATE, collection, key, data} },
//   remoteWatch: (collection,key)=>{return {type:REMOTE_WATCH,collection,key} },
//   remoteQuery: (collection,params)=>{return {type:REMOTE_QUERY,collection,params} }
// }

export default class rfModel {
  constructor(ref, name) {
    this.name = name
    this.ref = ref.child(name)
  }

  actions = {
    watch: (key)=>{ return {type:REMOTE_WATCH,collection:this.name,key} },
    push: (vals)=>{ return {type:REMOTE_PUSH,collection:this.name,vals} },
    set: (key,val)=>{ return {type:REMOTE_SET,collection:this.name,key,val} },
    update: (key,vals)=>{ return {type:REMOTE_UPDATE,collection:this.name,key,vals} },
    query: (params)=>{ return {type:REMOTE_QUERY,collection:this.name,params} }
  }

  select = {
    collection: (state)=>state.data[this.name]
  }

  // push(val) {
  //   return ()=>{
  //     return new Promise( (resolve)=>{
  //       resolve(this.ref.push(val).key())
  //     })
  //   }
  // }

  // set(key,val) {
  //   return ()=>{
  //     this.ref.child(key).set(val);
  //   }
  // }
  // update(key,props) {
  //   return ()=>{
  //     this.ref.child(key).update(props);
  //   }
  // }

}

