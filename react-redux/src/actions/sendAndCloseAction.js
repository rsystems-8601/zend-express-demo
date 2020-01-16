export const setTicketStates=(ticketStates)=>{
	return{
    	type:'SET_TICKET_STATES',
        ticketStates        
	}
}

export const setSelectedState = (selectedState) => {
	return {
		type : 'SET_SELECTED_STATE',
		selectedState
	}
}

export const setClosureComment = (closureComment) => {
	return {
		type : 'SET_CLOSURE_COMMENT',
		closureComment
	}
}