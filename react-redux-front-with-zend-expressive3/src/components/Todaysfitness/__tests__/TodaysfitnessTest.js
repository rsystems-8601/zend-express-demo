import React from 'react';
import Todaysfitness from '../Todaysfitness';
import { shallow } from 'enzyme';

const wrapper = shallow(<Todaysfitness />);

describe('Todaysfitness', () => {
	it('should exist', () => {
		expect(Todaysfitness).toBeDefined();
	});
	it('renders without issues', () => {
		expect(wrapper.length).toBe(1);
	});
	
	// Test if child component is present
	//it('should render one ChildComponent component', () => {
	//	expect(wrapper.find(ChildComponent).length).toBe(1);
	//});
});

