import React from 'react';
import Usersinfo from '../Usersinfo';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const wrapper = shallow(<Usersinfo />);
describe('(Component) Usersinfo', () => {
	it('Should match snapshot', () => {
		expect(toJson(wrapper)).toMatchSnapshot();
	});
});

