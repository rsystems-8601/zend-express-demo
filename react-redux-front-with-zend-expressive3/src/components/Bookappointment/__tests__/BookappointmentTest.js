import React from 'react';
import Bookappointment from '../Bookappointment';
import { shallow } from 'enzyme';

const wrapper = shallow(<Bookappointment />);

describe('Bookappointment', () => {
	it('should exist', () => {
		expect(Bookappointment).toBeDefined();
	});
	it('renders without issues', () => {
		expect(wrapper.length).toBe(1);
	});
	
	// Test if child component is present
	//it('should render one ChildComponent component', () => {
	//	expect(wrapper.find(ChildComponent).length).toBe(1);
	//});
});

