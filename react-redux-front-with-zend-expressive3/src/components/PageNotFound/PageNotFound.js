// @flow
import React, { Component} from 'react';
import PropTypes from 'prop-types';

class PageNotFound extends Component {
	static defaultProps: Object;
	
	state = {};
 
	render() {
		return (<div>
		
		<div className="clearboth"> 
		
			<center><strong> Page Not Found  &nbsp; </strong> </center>
		
		</div>
		
		</div>);
	}
}

PageNotFound.defaultProps = {};
PageNotFound.propTypes = {};

export default PageNotFound;

