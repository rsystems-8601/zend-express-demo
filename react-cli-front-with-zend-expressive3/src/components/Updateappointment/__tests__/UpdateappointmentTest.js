import React from 'react';
import Updateappointment from '../Updateappointment';
import { shallow } from 'enzyme';

const wrapper = shallow(<Updateappointment />);

describe('Updateappointment', () => {
	it('should exist', () => {
		expect(Updateappointment).toBeDefined();
	});
	it('renders without issues', () => {
		expect(wrapper.length).toBe(1);
	});
	
	// Test if child component is present
	//it('should render one ChildComponent component', () => {
	//	expect(wrapper.find(ChildComponent).length).toBe(1);
	//});
});

