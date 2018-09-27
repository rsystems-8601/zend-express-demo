import React from 'react';
import Button from '../Button';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const wrapper = shallow(<Button />);
describe('(Component) Button', () => {
	it('Should match snapshot', () => {
		expect(toJson(wrapper)).toMatchSnapshot();
	});
});

