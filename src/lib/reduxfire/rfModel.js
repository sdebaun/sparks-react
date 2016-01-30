import {REMOTE_WATCH,REMOTE_QUERY,REMOTE_PUSH,REMOTE_SET,REMOTE_UPDATE,LOCAL_UPDATE} from './types'
import { createSelector } from 'reselect'

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

  _collection = state => state.data[this.name]

  // _collection = state => state.data[this.name] || {}

  _rows = createSelector(
    this._collection,
    (col)=>col && Object.keys(col).map(k=>col[k])
    // (col)=>col && Object.keys(col).map(k=>Object.assign({$key:k,key:k},col[k])) // in transition from $key=>key
  )
  _by = childKey => createSelector(
    this.select.rows,
    (state,props)=>props[childKey],
    (rows,keyVal)=>rows && rows.filter(r=>r[childKey]==keyVal)
  )
  _matching = propKey => createSelector(
    this.select.collection,
    (state,props)=>props[propKey],
    (col,key)=>col && col[key]
  )

  select = {
    collection: this._collection,
    rows: this._rows,
    by: this._by,
    matching: this._matching
  }

  taker = key => action =>
    (action.type==LOCAL_UPDATE) &&
    (action.collection==this.name) &&
    (action.key==key)

  takeAny = action =>
    (action.type==LOCAL_UPDATE) &&
    (action.collection==this.name)

}
