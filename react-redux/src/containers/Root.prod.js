import React, { PropTypes } from 'react'
import { Provider } from 'react-redux'
import { Router, Route,IndexRoute } from 'react-router'
import App from './App';
import SendAndCloseButton from '../components/SendAndCloseButton';
import SendAndClosePopup from '../components/SendAndClosePopup'

const defaultRoute =  window.getDefaultRoute();
const Root = ({ store, history }) => (
<Provider store={store}>
  <Router  history={history}>
    <Route path={defaultRoute} component={App}>
    <IndexRoute component={SendAndCloseButton} />
    <Route path="/openModal" component={SendAndCloseButton} />
    <Route path="/sendAndClosePopUp" component={SendAndClosePopup} />    
    </Route>
   </Router>
 </Provider>
 )
Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
}
export default Root