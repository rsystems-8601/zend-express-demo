// @flow
import React, { Component} from 'react';
//import PropTypes from 'prop-types';
import axios from 'axios';
//import ReactDOM from 'react-dom';
//import { Link  } from 'react-router-dom';

class Bookappointment extends Component {
	static defaultProps: Object;
	
	state = {
		records: [],		
		full_name:'',
		appointment_time:'',
		appointment_reason:'',
		popupAdd:'',
		createID:'',
	};
	
	componentWillUnmount(){
		this.setState({ full_name : '' });
		this.setState({ appointment_time : '' });
		this.setState({ appointment_reason : '' });
	}
	
	bookAppointment(){
		if(this.state.full_name.value){
		let body = new FormData();			
				body.append('full_name', this.state.full_name.value);
				body.append('appointment_time', this.state.appointment_time.value);
				body.append('appointment_reason', this.state.appointment_reason.value);
				
		axios.post(`http://127.0.0.1:8080/createappointment`, body)
		  .then(res => {
				console.log(res); 
				if(res.data.status){
					this.setState({				
						popupAdd:!res.data.status,
						createID:0
					});						
					this.props.history.push(`/`)
				}			
							
		  })
		}
	} 
 
	render() {
		return (
		<div>
		<h3>
  Book Appointment 
</h3>

<div className="appointment_form" >
<h2>Enter Appointment Details</h2>

<form >

<div className="row">
<div className="label">Full Name</div>
<div className="input_field"><input type='text'  ref={(input) => this.state.full_name = input}  id='full_name' name='full_name'   />

</div>
</div> 

<div className='row'>
<div className='label'>Select Date and Time</div>
<div className='input_field'><input type='text'   name="appointment_time" id='appointment_time' ref={(input) => this.state.appointment_time = input}  /></div>

</div> 

<div className='row'>
<div className='label'>Reason of Appointment</div>
<div className='input_field'><textarea  ref={(input) => this.state.appointment_reason = input} rows='9' cols='50' id='appointment_reason' name='appointment_reason'  /></div>

</div> 

<div className='row'>
<div className='label'>&nbsp;</div>
<div className='input_field form_update'>
	 <button type="button" onClick={()=>this.bookAppointment()}>Submit</button>
</div>
</div> 


</form>

</div> 
</div>		
		);
	}
}

Bookappointment.defaultProps = {};
Bookappointment.propTypes = {};

export default Bookappointment;

