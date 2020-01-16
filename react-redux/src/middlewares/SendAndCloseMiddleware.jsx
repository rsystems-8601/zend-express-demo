import {setTicketStates} from '../actions/sendAndCloseAction'


export function simpleAlert(){	
	return (dispatch,getState) => {		
		alert("i am working");
	}
}