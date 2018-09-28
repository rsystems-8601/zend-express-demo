import React from 'react';
import admin from '../admin';
import { shallow } from 'enzyme';

const wrapper = shallow(<admin />);

describe('admin', () => {
	it('should exist', () => {
		expect(admin).toBeDefined();
	});
	it('renders without issues', () => {
		expect(wrapper.length).toBe(1);
	});
	
	// Test if child component is present
	//it('should render one ChildComponent component', () => {
	//	expect(wrapper.find(ChildComponent).length).toBe(1);
	//});
});

