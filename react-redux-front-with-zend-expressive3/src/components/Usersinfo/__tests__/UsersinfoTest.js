import React from 'react';
import Usersinfo from '../Usersinfo';
import { shallow } from 'enzyme';

const wrapper = shallow(<Usersinfo />);

describe('Usersinfo', () => {
	it('should exist', () => {
		expect(Usersinfo).toBeDefined();
	});
	it('renders without issues', () => {
		expect(wrapper.length).toBe(1);
	});
	
	// Test if child component is present
	//it('should render one ChildComponent component', () => {
	//	expect(wrapper.find(ChildComponent).length).toBe(1);
	//});
});

