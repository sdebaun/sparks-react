import 'core-js/fn/object/assign';

import React from 'react'
import ReactDOM from 'react-dom'
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute } from 'react-router'
import { createHistory } from 'history'
import { syncReduxAndRouter, routeReducer } from 'redux-simple-router'

import Main from './components/Main';
// import DashMain from './components/Dash/Main';
import Dash from './components/Dash';
// DashMain = Dash.Main;

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
        <Route path="dash" component={Dash.Main}>
          <IndexRoute component={Dash.Finding}/>
          <Route path="doing" component={Dash.Doing}/>
        </Route>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
)