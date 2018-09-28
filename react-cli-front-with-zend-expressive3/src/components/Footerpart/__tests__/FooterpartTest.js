import React from 'react';
import Footerpart from '../Footerpart';
import { shallow } from 'enzyme';

const wrapper = shallow(<Footerpart />);

describe('Footerpart', () => {
	it('should exist', () => {
		expect(Footerpart).toBeDefined();
	});
	it('renders without issues', () => {
		expect(wrapper.length).toBe(1);
	});
	
	// Test if child component is present
	//it('should render one ChildComponent component', () => {
	//	expect(wrapper.find(ChildComponent).length).toBe(1);
	//});
});

