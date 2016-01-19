import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import reducers from './reducers'

import DevTools from 'components/DevTools';

import sagaMiddleware, {runSaga, storeIO} from 'redux-saga'
import sagas from 'sagas'

import remote from 'remote'

const buildStore = compose(
  applyMiddleware(
    thunk,
    remote.auth.middleware,
    remote.data.middleware,
    sagaMiddleware(...sagas)
  ),
  DevTools.instrument()
  )

const store = buildStore(createStore)(reducers)
export default store

const io = storeIO(store)
export const addSaga = (saga) => runSaga(saga,io)