// @flow
import React, { Component} from 'react';
import PropTypes from 'prop-types';

class Logout extends Component {
	static defaultProps: Object;
	
	state = {};
 
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

Logout.defaultProps = {};
Logout.propTypes = {};

export default Logout;

