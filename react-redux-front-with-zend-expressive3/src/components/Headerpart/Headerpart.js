// @flow
import React, { Component} from 'react';
//import PropTypes from 'prop-types';
//import { Router, Route,    IndexRoute } from 'react-router'

class Headerpart extends Component {
	static defaultProps: Object;
	
	state = {appointment_id:''};
 
	componentDidMount() {		
		if(localStorage.getItem('session')!==''){
			const user = JSON.parse(localStorage.getItem('session'));		
			this.setState({ appointment_id : user.id })
		}
	}
	
	render() {
		return (
		
		<div className="header">
			<div className="header-wrapper">
				<a href="/"><img src="/media/logo.png" alt="Pacifica" /></a>
				<div className="header-links">
					<a href="/Signup" className="button">Sign Up</a>
					
					<a href="/home"> View Appointments </a>
					<a href="/bookappointment"> Book Appointment</a>
					<a href="/RegisterAppointment"> Register Appointment</a>
					
					<a href={"Todaysfitness/"+this.state.appointment_id} className="green"> Todays Health</a>
				
					<div className="menu">Menu
					  <div className="submenu" >			
							<a href="/home"> View Appointments </a>
							<a href="/bookappointment"> Book Appointment</a>
							<a href="/RegisterAppointment"> Register Appointment</a>				
							<a href="/Todaysfitness"> Todays Health</a>				
					  </div>
					</div>
				</div>
			</div>
		</div>
		
		);
	}
}

Headerpart.defaultProps = {};
Headerpart.propTypes = {};

export default Headerpart;

