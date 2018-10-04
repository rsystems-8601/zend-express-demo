// @flow
import React, { Component} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';


class Updateappointment extends Component {
	static defaultProps: Object;
	
	state = {
		records: []
	};
	
	
	
	componentDidMount() {
		if(this.props.match.params.id){
			axios.get(`http://127.0.0.1:8080/viewappointment?id=`+(this.props.match.params.id))
			.then(res => {
					const records = res.data.result;
					this.setState({ records });			
				})
		}		
	}
 
	render() {

		
		return (<div>
		
		<h3>
  Update Appointment 
</h3>

<div className='appointment_form' >
<h2>Enter Appointment Details</h2>
{ this.state.records.map(record => 
<form key={'row'+record.id}>



<input type="hidden" id="appointment_id"    name="appointment_id" value={record.id} />

<div className="row" >
<div className="label">Full Name </div>
<div className="input_field "><input type="text"   id="full_name" name="full_name" value={record.username} />

</div>
</div> 

<div className="row">
<div className="label">Select Date and Time</div>
<div className="input_field"><input type="text"   id="appointment_time" name="appointment_time" value={record.booking_date} /></div>

</div> 

<div className="row">
<div className="label">Reason of Appointment</div>
<div className="input_field"><textarea rows="9" cols="50" required   id="appointment_reason" name="appointment_reason" value={record.reason}></textarea></div>

</div> 

<div className="row">
<div className="label">&nbsp;</div>
<div className="input_field form_update">
	<button type="submit" >
		Update
	</button>

	<button type="button" >
		Reset
	</button>
</div>
</div> 


</form>
)}
</div> 
		
		
		</div>);
	}
}

Updateappointment.defaultProps = {};
Updateappointment.propTypes = {};

export default Updateappointment;

