import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducers from './reducers'

const logger = store => next => action => {
  console.group(action.type)
  console.info('DISPATCH', action)
  let result = next(action)
  console.log('NEW STATE:', store.getState())
  console.groupEnd(action.type)
  return result
}

export default applyMiddleware(thunk, logger)(createStore)(reducers);

