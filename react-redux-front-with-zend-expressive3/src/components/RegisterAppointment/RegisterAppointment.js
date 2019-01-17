import React, { Component } from 'react';
//import { createStore } from 'redux';
//import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Values } from "redux-form-website-template";
import store from "./store";
import showResults from "./showResults";
import SimpleForm from "./SimpleForm";

class RegisterAppointment extends Component {
	
	render(){
		
		// //step--1 create a reducer 
		// const reducer = function(state, action){
			// if(action.type === "ATTACK"){
				// return action.payload
			// }
			// return state;
		// }
				
		// //step--2 create a store 
		// const store = createStore (reducer, "peace");			
		
		// //step--3 subcribe 
		// store.subscribe(() => {			
			// console.log("Store is now ", store.getState());
		// })
		
		
		// //step--4 dispatch
		// store.dispatch({type: "ATTACK", payload: "Iron Man"});
		
		
		
		return (
			<div>			
			  <Provider store={store}>
				<div style={{ padding: 15 }}>				  
				  <h2><strong>Register Appointment </strong></h2>
				  <div className="clearboth"> 
				  <SimpleForm onSubmit={showResults} />
				  <Values form="simple" />
				  </div>
				</div>
			  </Provider>
			</div>
		)
	}
}

export default RegisterAppointment;