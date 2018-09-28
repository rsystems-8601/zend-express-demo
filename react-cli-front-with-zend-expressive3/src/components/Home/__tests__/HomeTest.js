import React from 'react';
import Home from '../Home';
import { shallow } from 'enzyme';

const wrapper = shallow(<Home />);

describe('Home', () => {
	it('should exist', () => {
		expect(Home).toBeDefined();
	});
	it('renders without issues', () => {
		expect(wrapper.length).toBe(1);
	});
	
	// Test if child component is present
	//it('should render one ChildComponent component', () => {
	//	expect(wrapper.find(ChildComponent).length).toBe(1);
	//});
});

