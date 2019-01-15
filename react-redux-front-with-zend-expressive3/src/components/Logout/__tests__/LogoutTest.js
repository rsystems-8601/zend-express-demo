import React from 'react';
import Logout from '../Logout';
import { shallow } from 'enzyme';

const wrapper = shallow(<Logout />);

describe('Logout', () => {
	it('should exist', () => {
		expect(Logout).toBeDefined();
	});
	it('renders without issues', () => {
		expect(wrapper.length).toBe(1);
	});
	
	// Test if child component is present
	//it('should render one ChildComponent component', () => {
	//	expect(wrapper.find(ChildComponent).length).toBe(1);
	//});
});

