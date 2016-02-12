import {REMOTE_ACTION,REMOTE_WATCH,REMOTE_QUERY,LOCAL_UPDATE} from './types'
import { createSelector } from 'reselect'

export default class rfModel {
  constructor(ref, name, extenders) {
    this.name = name
    this.ref = ref.child(name)
    if (extenders.actions) Object.assign(this.actions,extenders.actions)
    if (extenders.select) Object.assign(this.select,extenders.select)
  }

  actions = {
    remote: (op,payload)=>{ return {type:REMOTE_ACTION,collection:this.name,op,payload} },
    watch: (key)=>{ return {type:REMOTE_WATCH,collection:this.name,key} },
    query: (params={})=>{ return {type:REMOTE_QUERY,collection:this.name,params} }
  }

  // _collection = state => state.data[this.name]

  _collection = state => state.data[this.name] || {}

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
