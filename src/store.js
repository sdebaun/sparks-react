import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import reducers from './reducers'

import DevTools from 'components/DevTools';

// import sagaMiddleware, {runSaga, storeIO} from 'redux-saga'
// import {runSaga, storeIO} from 'redux-saga'
import {master,sagas} from 'sagas'

import remote from 'remote'

const buildStore = compose(
  applyMiddleware(
    thunk,
    remote.auth.middleware,
    remote.data.middleware,
    master.middleware,
  ),
  DevTools.instrument()
  )

const store = buildStore(createStore)(reducers)
export default store

sagas.forEach( saga=>master.start(saga) )

// const io = storeIO(store)
// export const addSaga = (saga) => runSaga(saga,io)