const sendAndCloseReducer=(state={},action) =>{
switch(action.type){
    case 'SET_TICKET_STATES':    
    return {
        ...state,
        ticketStates : action.ticketStates
    }

    case 'SET_SELECTED_STATE':
    return {
    	...state,
    	selectedState : action.selectedState
    }
    case 'SET_CLOSURE_COMMENT':
    return {
    	...state,
    	closureComment : action.closureComment
    }
	default:
		return state;
  }
}
export default sendAndCloseReducer