// @flow
import React, { Component} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';


import ReactSlider from 'react-slider';

class Componentnameslider extends Component {
	static defaultProps: Object;
	static propTypes: Object;
	constructor(props) {
		super(props);
		this.dharmender= this.dharmender.bind(this);    
		//this.dharmender;
		
	}
  
	dharmender(e) {
		  //console.log( this.props);
		  this.props.jitender(e.target.value);	
		  this.props.kamli(6);
		  
	}  
  
	render() {
		const { range } = this.props;
		const { kamli } = this.props;
		
		return (
			<div className="rsslider">
				<div>
					<input id="range" type="range"
					  value={range}
					  min="1"
					  max="6"
					  step="1"
					  onChange={this.dharmender}
					/>
				<span id="output">{range}</span>
				</div>
			</div>	
			);
	}
}

Componentnameslider.defaultProps = {};
Componentnameslider.propTypes = {};

export default Componentnameslider;

