import React from 'react';
import Componentnameslider from '../Componentnameslider';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const wrapper = shallow(<Componentnameslider />);
describe('(Component) Componentnameslider', () => {
	it('Should match snapshot', () => {
		expect(toJson(wrapper)).toMatchSnapshot();
	});
});

