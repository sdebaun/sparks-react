import 'core-js/fn/object/assign';

import React from 'react'
import ReactDOM from 'react-dom'
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import { Provider } from 'react-redux'
import { Router, Route, IndexRoute } from 'react-router'
import { createHistory } from 'history'
import { syncReduxAndRouter } from 'redux-simple-router'

import Main from './containers/Main';
import Dash from './containers/Dash';
import Landing from './containers/Landing';

import { listenToAuth } from './actions'

import store from './store'
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

setTimeout( ()=>{
  store.dispatch(listenToAuth());
})