import React from 'react';
import Headerpart from '../Headerpart';
import { shallow } from 'enzyme';

const wrapper = shallow(<Headerpart />);

describe('Headerpart', () => {
	it('should exist', () => {
		expect(Headerpart).toBeDefined();
	});
	it('renders without issues', () => {
		expect(wrapper.length).toBe(1);
	});
	
	// Test if child component is present
	//it('should render one ChildComponent component', () => {
	//	expect(wrapper.find(ChildComponent).length).toBe(1);
	//});
});

