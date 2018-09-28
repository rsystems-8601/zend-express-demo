// @flow
import React, { Component} from 'react';
import PropTypes from 'prop-types';

class Footerpart extends Component {
	static defaultProps: Object;
	
	state = {};
 
	render() {
		return (
		
		
		<footer className="app-footer">
			<div className="container">
				<hr />
				 <p>
					 &copy; 2005 -  by Rsystems Ltd. All rights reserved.
				 </p>				
			</div>
		</footer>
	
	);
	}
}

Footerpart.defaultProps = {};
Footerpart.propTypes = {};

export default Footerpart;

