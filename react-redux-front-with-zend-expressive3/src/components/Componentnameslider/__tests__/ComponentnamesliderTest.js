import React from 'react';
import Componentnameslider from '../Componentnameslider';
import { shallow } from 'enzyme';

const wrapper = shallow(<Componentnameslider />);

describe('Componentnameslider', () => {
	it('should exist', () => {
		expect(Componentnameslider).toBeDefined();
	});
	it('renders without issues', () => {
		expect(wrapper.length).toBe(1);
	});
	
	// Test if child component is present
	//it('should render one ChildComponent component', () => {
	//	expect(wrapper.find(ChildComponent).length).toBe(1);
	//});
});

