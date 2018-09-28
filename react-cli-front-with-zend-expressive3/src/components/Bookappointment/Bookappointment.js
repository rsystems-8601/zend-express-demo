// @flow
import React, { Component} from 'react';
import PropTypes from 'prop-types';

class Bookappointment extends Component {
	static defaultProps: Object;
	
	state = {};
 
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
<div className="input_field"><input type='text'    id='full_name' name='full_name' />

</div>
</div> 

<div className='row'>
<div className='label'>Select Date and Time</div>
<div className='input_field'><input type='text'   name="appointment_time" id='appointment_time' value="2018-09-26 03:53" /></div>

</div> 

<div className='row'>
<div className='label'>Reason of Appointment</div>
<div className='input_field'><textarea rows='9' cols='50'    id='appointment_reason' name='appointment_reason' ></textarea></div>

</div> 

<div className='row'>
<div className='label'>&nbsp;</div>
<div className='input_field form_update'>
	 <button type="submit">Submit</button>
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

