import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import reducers from './reducers'

import DevTools from 'components/DevTools';

import sagaMiddleware from 'redux-saga'
import sagas from 'sagas'
import {sagas as AdminProjectSagas} from './routes/Admin/Projects'

import remote from 'remote'

const buildStore = compose(
  applyMiddleware(
    thunk,
    remote.auth.middleware,
    remote.data.middleware,
    sagaMiddleware(...sagas, ...AdminProjectSagas)
  ),
  DevTools.instrument()
  )

export default buildStore(createStore)(reducers);