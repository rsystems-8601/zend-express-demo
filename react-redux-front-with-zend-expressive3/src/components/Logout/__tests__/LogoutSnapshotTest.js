import React from 'react';
import Logout from '../Logout';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const wrapper = shallow(<Logout />);
describe('(Component) Logout', () => {
	it('Should match snapshot', () => {
		expect(toJson(wrapper)).toMatchSnapshot();
	});
});

