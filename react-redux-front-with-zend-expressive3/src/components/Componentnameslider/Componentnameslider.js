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
    this.updateRange2 = this.updateRange2.bind(this);
  }
  
  updateRange2(e) {
    this.props.updateRange2(e.target.value);
  }
  
	state = {};
 
  handleChange() {
    console.log('Change');
  }
  
	render() {
		const { range } = this.props;
		const { kamli } = this.props;
		console.log(kamli)
		return (
			<div className="rsslider">
				<div>
					<input id="range" type="range"
					  value={range}
					  min="0"
					  max="20"
					  step="1"
					  onChange={this.updateRange2}
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

