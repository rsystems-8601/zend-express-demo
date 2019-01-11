import React from 'react';
import Todaysfitness from '../Todaysfitness';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const wrapper = shallow(<Todaysfitness />);
describe('(Component) Todaysfitness', () => {
	it('Should match snapshot', () => {
		expect(toJson(wrapper)).toMatchSnapshot();
	});
});

