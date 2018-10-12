import React from 'react';
import Headerpart from '../Headerpart';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const wrapper = shallow(<Headerpart />);
describe('(Component) Headerpart', () => {
	it('Should match snapshot', () => {
		expect(toJson(wrapper)).toMatchSnapshot();
	});
});

