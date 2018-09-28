// @flow
import React, { Component} from 'react';
import PropTypes from 'prop-types';

class Updateappointment extends Component {
	static defaultProps: Object;
	
	state = {};
 
	render() {
		return (<div>
		
		<h3>
  Update Appointment 
</h3>

<div className='appointment_form' >
<h2>Enter Appointment Details</h2>

<form >

<input type='hidden' id='appointment_id'    name='appointment_id' />

<div className='row'>
<div className='label'>Full Name</div>
<div className='input_field '><input type='text'   id='full_name' name='full_name'/>

</div>
</div> 

<div className='row'>
<div className='label'>Select Date and Time</div>
<div className='input_field'><input type='text'   id='appointment_time' name='appointment_time' /></div>

</div> 

<div className='row'>
<div className='label'>Reason of Appointment</div>
<div className='input_field'><textarea rows='9' cols='50' required   id='appointment_reason' name='appointment_reason' ></textarea></div>

</div> 

<div className='row'>
<div className='label'>&nbsp;</div>
<div className='input_field form_update'>
	<button type="submit" >
		Update
	</button>

	<button type="button" >
		Reset
	</button>
</div>
</div> 


</form>

</div> 
		
		
		</div>);
	}
}

Updateappointment.defaultProps = {};
Updateappointment.propTypes = {};

export default Updateappointment;

