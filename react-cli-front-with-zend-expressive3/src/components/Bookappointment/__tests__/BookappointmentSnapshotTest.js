import React from 'react';
import Bookappointment from '../Bookappointment';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const wrapper = shallow(<Bookappointment />);
describe('(Component) Bookappointment', () => {
	it('Should match snapshot', () => {
		expect(toJson(wrapper)).toMatchSnapshot();
	});
});

