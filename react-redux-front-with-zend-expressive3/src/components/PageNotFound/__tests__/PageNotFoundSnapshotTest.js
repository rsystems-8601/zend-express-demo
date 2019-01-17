import React from 'react';
import PageNotFound from '../PageNotFound';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const wrapper = shallow(<PageNotFound />);
describe('(Component) PageNotFound', () => {
	it('Should match snapshot', () => {
		expect(toJson(wrapper)).toMatchSnapshot();
	});
});

