import React from 'react';
import Footerpart from '../Footerpart';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const wrapper = shallow(<Footerpart />);
describe('(Component) Footerpart', () => {
	it('Should match snapshot', () => {
		expect(toJson(wrapper)).toMatchSnapshot();
	});
});

