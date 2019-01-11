import React from 'react';
import Signin from '../Signin';
import { shallow } from 'enzyme';

const wrapper = shallow(<Signin />);

describe('Signin', () => {
	it('should exist', () => {
		expect(Signin).toBeDefined();
	});
	it('renders without issues', () => {
		expect(wrapper.length).toBe(1);
	});
	
	// Test if child component is present
	//it('should render one ChildComponent component', () => {
	//	expect(wrapper.find(ChildComponent).length).toBe(1);
	//});
});

