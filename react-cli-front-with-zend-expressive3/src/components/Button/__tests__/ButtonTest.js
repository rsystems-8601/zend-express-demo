import React from 'react';
import Button from '../Button';
import { shallow } from 'enzyme';

const wrapper = shallow(<Button />);

describe('Button', () => {
	it('should exist', () => {
		expect(Button).toBeDefined();
	});
	it('renders without issues', () => {
		expect(wrapper.length).toBe(1);
	});
	
	// Test if child component is present
	//it('should render one ChildComponent component', () => {
	//	expect(wrapper.find(ChildComponent).length).toBe(1);
	//});
});

