import React from 'react';
import Signup from '../Signup';
import { shallow } from 'enzyme';

const wrapper = shallow(<Signup />);

describe('Signup', () => {
	it('should exist', () => {
		expect(Signup).toBeDefined();
	});
	it('renders without issues', () => {
		expect(wrapper.length).toBe(1);
	});
	
	// Test if child component is present
	//it('should render one ChildComponent component', () => {
	//	expect(wrapper.find(ChildComponent).length).toBe(1);
	//});
});

