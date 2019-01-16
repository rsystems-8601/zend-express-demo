// @flow
import React, { Component} from 'react';
//import PropTypes from 'prop-types';
import * as utils from '../../Userservice';

class Logout extends Component {
	static defaultProps: Object;
	
	state = {};
 
	constructor(props) {  
		super(props);
		utils.profile.activeButtonName=utils.Config.Signup;
	}
 
	componentDidMount() {		
		localStorage.setItem('session','');
		
		if(localStorage.getItem('session')===''){
			this.props.history.push(`/Signin`);
		}	
	}
	
	render() {
		return (<div>Logout</div>);
	}
}

//Logout.defaultProps = {};
//Logout.propTypes = {};

export default Logout;

