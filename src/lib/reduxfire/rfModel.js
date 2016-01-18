import {REMOTE_WATCH,REMOTE_QUERY,REMOTE_PUSH,REMOTE_SET,REMOTE_UPDATE} from './types'

export default class rfModel {
  constructor(ref, name, extenders) {
    this.name = name
    this.ref = ref.child(name)
    if (extenders.actions) Object.assign(this.actions,extenders.actions)
    if (extenders.select) Object.assign(this.select,extenders.select)
  }

  actions = {
    watch: (key)=>{ return {type:REMOTE_WATCH,collection:this.name,key} },
    push: (vals)=>{ return {type:REMOTE_PUSH,collection:this.name,vals} },
    set: (key,val)=>{ return {type:REMOTE_SET,collection:this.name,key,val} },
    update: (key,vals)=>{ return {type:REMOTE_UPDATE,collection:this.name,key,vals} },
    query: (params={})=>{ return {type:REMOTE_QUERY,collection:this.name,params} }
  }

  select = {
    collection: (state)=>state.data[this.name] || {}
  }

}

