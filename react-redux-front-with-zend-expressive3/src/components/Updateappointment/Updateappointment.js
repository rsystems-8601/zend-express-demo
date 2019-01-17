// @flow
import React, { Component} from 'react';
//import PropTypes from 'prop-types';
import axios from 'axios';
//import ReactDOM from 'react-dom';
//import { Link  } from 'react-router-dom';



class Updateappointment extends Component {
	static defaultProps: Object;
	
	state = {
		records: [],
		appointment_id:'',
		full_name:'',
		appointment_time:'',
		appointment_reason:'',
		popupUpdate:'',
		updateID:''
	};
	
	confirmUpdate(data){
		//console.log(data);
		
	let body = new FormData();
			body.append('appointment_id', data.appointment_id);
			body.append('full_name', data.full_name);
			body.append('appointment_time', data.appointment_time);
			body.append('appointment_reason', data.appointment_reason);
			
	axios.post(`http://127.0.0.1:8080/updateappointment`, body)
      .then(res => {
			//console.log(res); 
				if(res.data.status){					
					this.props.history.push(`/`)
				}			
			this.setState({
				
				popupUpdate:!res.data.status,
				updateID:0
			});
			this.componentDidMount();
      })
	} 
	
	
	componentDidMount() {
		if(this.props.match.params.id){
			axios.get(`http://127.0.0.1:8080/viewappointment?id=`+(this.props.match.params.id))
			.then(res => {
					const records = res.data.result;
					this.setState({ records });	
					this.state.records.map(record =>						
						{
							this.setState({ appointment_id : record.id ,
							 full_name : record.username ,
							 appointment_time : record.booking_date ,
							 appointment_reason : record.reason });					
						}						  						
					)
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



<form key={'row_'+this.state.appointment_id}>



<input type="hidden" id="appointment_id"    name="appointment_id" value={this.state.appointment_id} />

<div className="row" >
<div className="label">Full Name </div>
<div className="input_field "><input type="text"   id="full_name" name="full_name"  onChange={(e) => {this.setState({ full_name : e.target.value })  }}  value={this.state.full_name} />

</div>
</div> 

<div className="row">
<div className="label">Select Date and Time</div>
<div className="input_field"><input type="text"   id="appointment_time" name="appointment_time" onChange={ e => this.setState({ appointment_time : e.target.value }) }  value={this.state.appointment_time} /></div>

</div> 

<div className="row">
<div className="label">Reason of Appointment</div>
<div className="input_field"><textarea rows="9" cols="50" required   id="appointment_reason" onChange={ e => this.setState({ appointment_reason : e.target.value }) }  name="appointment_reason" value={this.state.appointment_reason}></textarea></div>

</div> 

<div className="row">
<div className="label">&nbsp;</div>
<div className="input_field form_update">
	<button type="button" onClick={()=>this.confirmUpdate(this.state)}>
		Update
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

