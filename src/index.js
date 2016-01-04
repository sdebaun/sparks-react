import 'core-js/fn/object/assign';

import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute } from 'react-router'
import { createHistory } from 'history'
import { syncReduxAndRouter, routeReducer } from 'redux-simple-router'

import Main from './components/Main';
import Dash from './components/Dash';

// import reducers from '<project-path>/reducers'

// const reducer = combineReducers(Object.assign({}, reducers, {
//   routing: routeReducer
// }))
const reducer = combineReducers(Object.assign({}, {
  routing: routeReducer
}))
const store = createStore(reducer)
const history = createHistory()

syncReduxAndRouter(history, store)

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/">
        <IndexRoute component={Main}/>
        <Route path="dash" component={Dash}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
)