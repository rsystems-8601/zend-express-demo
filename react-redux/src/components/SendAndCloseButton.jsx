import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import {simpleAlert} from '../middlewares/SendAndCloseMiddleware'

class SendAndCloseButton extends Component {
  render() {           
    return (
      <div>
         <button type="button" onClick={()=>{this.props.updateName()}} className="btn btn-sendandclose btn-primary">Send &amp; Close</button>
      </div>    
    )  
  }
}

const mapStateToProps=(state) => ({    
  
})

const mapToDispatchProps=(dispatch) =>({
    updateName :()=>dispatch(simpleAlert())
})
export default connect(mapStateToProps,mapToDispatchProps)(SendAndCloseButton)