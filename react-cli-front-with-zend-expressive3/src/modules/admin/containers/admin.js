// @flow
import React, { Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import adminView from '../components/admin';
import {} from '../actions/adminActions';

export class admin extends Component {
	static defaultProps: Object;
	static propTypes: Object;
	
	state = {};

	render() {
		return (
			<adminView />
		);
	}
}


admin.defaultProps = {};
admin.propTypes = {};

function mapStoreToProps(state, ownProps) {
	return {};
}
function mapDispatchToProps(dispatch) {
	return bindActionCreators({}, dispatch);
}

export default connect(mapStoreToProps, mapDispatchToProps)(admin);

