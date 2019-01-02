import React, { Component } from 'react';
import { createStore } from 'redux';


class ReduxDemo extends Component {
	
	render(){
		
		// create a reducer :: update state , taking state+ action and return new state
		const reducer = function(state, action){
			if(action.type === "ATTACK"){
				return action.payload
			}
			return state;
		}
		
		
		//create a store 
		const store = createStore (reducer, "peace");
		
		
		
		
		//step subcribe 
		store.subscribe(() => {			
			console.log("Store is now ", store.getState());
		})
		
		//step dispatch
		store.dispatch({type: "ATTACK", payload: "Iron Man"});
		
		
		
		return (
			<div>
			<p>Hi first redux demo</p>
			</div>
		)
	}
}

export default ReduxDemo;