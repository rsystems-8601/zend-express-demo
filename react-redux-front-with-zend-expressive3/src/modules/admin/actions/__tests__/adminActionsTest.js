import * as actions from '../adminActions';
import { adminActions } from '../../constants/adminConstants';
import { shallow } from 'enzyme';

describe('adminActions', () => {
	it('should create an action to add an error', () => {
		const expectedAction = {
			type: adminActions.ADMIN_ERROR,
		};
		expect(actions.loadadminError()).toEqual(expectedAction)
	})
});

