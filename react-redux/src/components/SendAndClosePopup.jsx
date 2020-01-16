import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import {Input} from 'react-materialize'
import {setSelectedState, setClosureComment} from '../actions/sendAndCloseAction'
import {sendAndCloseTicket} from '../middlewares/SendAndCloseMiddleware'

function closePopUp(){  
  var client = window.AmeyoClient.init();
  client.instance.close("self");
}

class SendAndClosePopup extends Component {
  render() {           
    var ticketStatesData = [];
    var ticketStates = this.props.ticketStates === undefined ? '' : this.props.ticketStates
    Object.keys(ticketStates).forEach((key, index) => {          
        ticketStatesData.push(
          <option key = {key} value={ticketStates[key]}>{ticketStates[key]}</option>                                  
        )  
      })    

    return (
      <div>
      <div className="row">
      <div className="col s12 m12">
        <div className="no-padding">
          <Input s={12} m={12} l={12} type='select' label="Close State" onChange = {(e) =>{this.props.setTicketState(e.target.value)}}>                               
                {ticketStatesData}
            </Input>
          </div>
      </div>
    </div>
      <div className="row">
        <div className="col s12 m12">
          <div className="input-field">
            <textarea id="closureComment" className="materialize-textarea" onChange = {(e) =>{this.props.setClosureComment(e.target.value)}}></textarea>
            <label>Closure Comment *</label>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col s12 m12 right-align btn-group">
          <button id="cancel" onClick={closePopUp} type="button" className="btn btn-cancel">Cancel</button>
          <button id= "done" disabled={!this.props.closureComment || !this.props.ticketStates} onClick={(e)=>{this.props.sendAndClose()}} type="button" className="btn btn-done">Done</button>
        </div>
      </div>      
      </div>
    )  
  }
}

const mapStateToProps=(state) => ({
  ticketStates : state.sendAndCloseReducer === undefined ? '' : state.sendAndCloseReducer.ticketStates,
  closureComment : state.sendAndCloseReducer === undefined ? '' : state.sendAndCloseReducer.closureComment
})

const mapToDispatchProps=(dispatch) =>({
    setTicketState:(ticketState)=>{      
      dispatch(setSelectedState(ticketState))
    },
    setClosureComment:(comment) => {
      dispatch(setClosureComment(comment))
    },
    sendAndClose:()=>{
      dispatch(sendAndCloseTicket())
    }
})
export default connect(mapStateToProps,mapToDispatchProps)(SendAndClosePopup)