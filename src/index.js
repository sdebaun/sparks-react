import 'core-js/fn/object/assign';

import React from 'react'
import ReactDOM from 'react-dom'
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute } from 'react-router'
import { createHistory } from 'history'
import { syncReduxAndRouter, routeReducer } from 'redux-simple-router'

import Main from './containers/Main';
// import DashMain from './components/Dash/Main';
import Dash from './containers/Dash';
import Landing from './containers/Landing';
// DashMain = Dash.Main;

import reducers from './reducers'

// const reducer = combineReducers(Object.assign({}, reducers, {
//   routing: routeReducer
// }))
const reducer = combineReducers(Object.assign(reducers, {
  routing: routeReducer
}))
const createMWStore = applyMiddleware(thunk)(createStore);
const store = createMWStore(reducer);
// const store = applyMiddleware(thunk)(createStore)(reducer);

const history = createHistory()

syncReduxAndRouter(history, store)

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={Main}>
        <IndexRoute component={Landing}/>
        <Route path="dash" component={Dash.Main}>
          <IndexRoute component={Dash.Finding}/>
          <Route path="doing" component={Dash.Doing}/>
        </Route>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
)