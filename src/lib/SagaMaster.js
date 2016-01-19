// import { asap } from '../../node_modules/redux-saga/src/utils'
import { asap } from 'redux-saga/lib/utils'
import proc from 'redux-saga/lib/proc'
import emitter from 'redux-saga/lib/emitter'

export default class SagaMaster {
  constructor() {
    this.emitter = emitter()
  }

  middleware = store => {
    this.store = store
    return next => action => {
      const result = next(action) // hit reducers
      this.emitter.emit(action)
      return result;
    }
  }

  start(saga) {
    proc(
      saga(this.store.getState),
      this.emitter.subscribe,
      this.store.dispatch,
      action => asap(() => this.store.dispatch(action)),
      0,
      saga.name
    )
  }

}
