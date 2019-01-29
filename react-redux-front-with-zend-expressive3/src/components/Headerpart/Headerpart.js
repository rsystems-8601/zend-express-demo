// @flow
import React, { Component} from 'react';
//import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
//import { Router, Route   } from 'react-router';
import * as utils from '../../Userservice';

	
class Headerpart extends Component {
	static defaultProps: Object;
	
	state = {appointment_id:'',logoutbutton:''};
 
	logoutBefore() {		
		return this.sessionBefore();		
	}	
	
	sessionBefore() {
		if(localStorage.getItem('session')!==''){
			var user = JSON.parse(localStorage.getItem('session'));
			if(user){
				if(user.id){
					this.setState({ appointment_id : user.id });
					this.state.logoutbutton = 'Logout';
					utils.profile.activeButtonName=utils.Config.Logout;					
				}else{
					this.state.logoutbutton = 'Signup';	
					utils.profile.activeButtonName=utils.Config.Signup;
				}	
			}
			else{
					this.state.logoutbutton = 'Signup';	
					utils.profile.activeButtonName=utils.Config.Signup;
				}
		}else{
				localStorage.setItem('session','');
				this.state.logoutbutton = 'Signup';
				this.state.appointment_id = '';
				utils.profile.activeButtonName=utils.Config.Signup;							
		}
		return true;
	}
	
	componentWillMount() {				
		this.sessionBefore();		
	}
	
	constructor(props) {
        super(props); 		
		this.logoutBefore = this.logoutBefore.bind(this);
    }
	
	render() {
		return (
		
		<div className="header">
			<div className="header-wrapper">
				<Link to="/Todaysfitness"><img src="/media/logo.png" alt="Pacifica" /></Link>
				<div className="header-links">				
					<Link to={"/"+this.state.logoutbutton} onClick={this.logoutBefore} className="button" id="buttonLogout">
						{utils.profile.activeButtonName}
					</Link>
					<Link to="/home" > View Therapist </Link>
					<Link to="/bookappointment" > Book Therapist</Link>
					<Link to="/RegisterAppointment" > Register Therapist</Link>					
					<Link to={"/Todaysfitness/"+this.state.appointment_id} className="green"> Todays Health</Link>				
					<div className="menu">Menu
					  <div className="submenu" >			
							<Link to="/home"> View Therapist </Link>
							<Link to="/bookappointment"> Book Therapist</Link>
							<Link to="/RegisterAppointment"> Register Therapist</Link>
							<Link to="/Todaysfitness"> Todays Health</Link>				
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

