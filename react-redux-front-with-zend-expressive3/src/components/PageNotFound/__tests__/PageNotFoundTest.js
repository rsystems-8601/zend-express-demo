import React from 'react';
import PageNotFound from '../PageNotFound';
import { shallow } from 'enzyme';

const wrapper = shallow(<PageNotFound />);

describe('PageNotFound', () => {
	it('should exist', () => {
		expect(PageNotFound).toBeDefined();
	});
	it('renders without issues', () => {
		expect(wrapper.length).toBe(1);
	});
	
	// Test if child component is present
	//it('should render one ChildComponent component', () => {
	//	expect(wrapper.find(ChildComponent).length).toBe(1);
	//});
});

