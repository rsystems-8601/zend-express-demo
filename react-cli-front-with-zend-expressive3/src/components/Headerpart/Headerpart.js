// @flow
import React, { Component} from 'react';
import PropTypes from 'prop-types';
import { Router, Route, Switch, Link, browserHistory, IndexRoute } from 'react-router'

class Headerpart extends Component {
	static defaultProps: Object;
	
	state = {};
 
	render() {
		return (
		
		
		
		
		
		<header className="app-header">
        <nav className="navbar navbar-inverse navbar-fixed-top" role="navigation">
            <div className="container">
                <div className="navbar-header">
                    <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>
                    <a className="navbar-brand" >
                        <img src="/media/zf-logo.png" alt="Zend Expressive" />
                    </a>
                </div>
                <div className="collapse navbar-collapse">
                    <ul className="nav nav-tabs">
					<li >
						<a href="/"> View Appointments </a>
					</li>					
					<li >
						<a href="/bookappointment">Book Appointment</a>
					</li>
				</ul>
				<br/>
				
                </div>
            </div>
        </nav>
    </header>
	
	
	
		
		);
	}
}

Headerpart.defaultProps = {};
Headerpart.propTypes = {};

export default Headerpart;

