import { reducer as formReducer } from 'redux-form'
import sendAndCloseReducer from './SendAndCloseReducer'
import {routerReducer } from 'react-router-redux'
import {combineReducers} from 'redux'

export const rootReducer = combineReducers({
 form: formReducer,     // <---- Mounted at 'form'
 routing: routerReducer, 
 sendAndCloseReducer
 });
export default rootReducer


