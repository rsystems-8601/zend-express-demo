import React from 'react';
import Updateappointment from '../Updateappointment';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const wrapper = shallow(<Updateappointment />);
describe('(Component) Updateappointment', () => {
	it('Should match snapshot', () => {
		expect(toJson(wrapper)).toMatchSnapshot();
	});
});

