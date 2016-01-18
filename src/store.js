import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import reducers from './reducers'

import DevTools from 'components/DevTools';

// const logger = store => next => action => {
//   console.group(action.type)
//   console.info('DISPATCH', action)
//   let result = next(action)
//   console.log('NEW STATE:', store.getState())
//   console.groupEnd(action.type)
//   return result
// }

import sagaMiddleware from 'redux-saga'
import sagas from 'sagas'

const buildStore = compose(
  applyMiddleware(thunk, sagaMiddleware(...sagas)),
  DevTools.instrument()
  )

export default buildStore(createStore)(reducers);