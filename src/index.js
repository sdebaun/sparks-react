import 'core-js/fn/object/assign';

import React from 'react'
import ReactDOM from 'react-dom'
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import { Provider } from 'react-redux'
import { Router } from 'react-router'
import { createHistory } from 'history'
import { syncReduxAndRouter } from 'redux-simple-router'

import store from './store'
const history = createHistory()
syncReduxAndRouter(history, store)

import routes from './routes'

ReactDOM.render(
  <Provider {...{store}}>
    <Router {...{history,routes}}/>
  </Provider>,
  document.getElementById('app')
)
