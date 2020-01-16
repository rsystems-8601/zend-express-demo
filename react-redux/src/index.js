import {render} from 'react-dom'
import React from 'react'
import { hashHistory} from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import Root from './containers/Root'
import configureStore from './store/configureStore'
import {getTicketStates} from './middlewares/SendAndCloseMiddleware'
import 'babel-polyfill';

const store = configureStore()
const history = syncHistoryWithStore(hashHistory, store)
render(
  <Root store={store} history={history} />,
  document.getElementById('root')
)

//store.dispatch(getTicketStates())




