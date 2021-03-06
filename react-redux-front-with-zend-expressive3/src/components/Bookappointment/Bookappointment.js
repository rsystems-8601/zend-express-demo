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
		if(this.state.full_name){
		let body = new FormData();			
				body.append('full_name', this.state.full_name.value);
				body.append('appointment_time', this.state.appointment_time.value);
				body.append('appointment_reason', this.state.appointment_reason.value);
				
				var koko= {
				'full_name': this.state.full_name.value,
				'appointment_time': this.state.appointment_time.value,
				'appointment_reason': this.state.appointment_reason.value}
				
		//axios.post(`http://127.0.0.1:8080/createappointment`, this.state)
		axios.post(`http://localhost:4000/createappointment/api`, koko)
		  .then(res => {
				//console.log(res); 
				if(res.data.status){
					this.setState({				
						popupAdd:!res.data.status,
						createID:0
					});						
					this.props.history.push(`/home`)
				}			
							
		  })
		}
	} 
 
	render() {
		return (
		<div>
		<div className="clearboth"> 
		<h2><strong>Book Appointment </strong></h2>
		</div>
<div className="appointment_form" >


<form >

<div className="row">
<div>Full Name</div>
<div className="input_field"><input className="form-control"  type='text'  ref={(input) => this.state.full_name = input}  id='full_name' name='full_name'   />

</div>
</div> 

<div className='row'>
<div>Select Date and Time</div>
<div className='input_field'><input   type='datetime-local'   name="appointment_time" id='appointment_time' ref={(input) => this.state.appointment_time = input}  /></div>

</div> 

<div className='row'>
<div>Reason of Appointment</div>
<div className='input_field'><textarea className="form-control"   ref={(input) => this.state.appointment_reason = input} rows='9' cols='50' id='appointment_reason' name='appointment_reason'  /></div>

</div> 

<div className='row'>
<div className='label'>&nbsp;</div>
<div className='input_field form_update'>
	 <button type="button" className="btn btn-primary" onClick={()=>this.bookAppointment()}>Submit</button>
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

