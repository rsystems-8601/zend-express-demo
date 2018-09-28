// @flow
import adminReducer, { initialState } from '../adminReducer';
import { adminActions } from '../../constants/adminConstants';

describe('adminReducer', () => {
	it('return initial state', () => {
		expect(adminReducer(undefined, { type: 'unknown' })).toEqual(initialState);
	});
	it('set error to true if error dispatched', () => {
		expect(adminReducer(undefined, { type: adminActions.ADMIN_ERROR }).error === true).toBeTruthy();
	});
	it('set loading to false if error dispatched', () => {
		expect(adminReducer(undefined, { type: adminActions.ADMIN_ERROR }).isFetching === false).toBeTruthy();
	});
	it('set loading to true if request dispatched', () => {
		expect(adminReducer(undefined, {
				type: adminActions.ADMIN_REQUEST,
			}).isFetching === true).toBeTruthy();
	});
	it('set loaded to true if loadMore dispatched', () => {
		expect(adminReducer(undefined, { 
			type: adminActions.ADMIN_SUCCESS_LOADMORE,
			payload: initialState.admin,
		}).loaded === true).toBeTruthy();
	});
	it('set loaded to true if success dispatched', () => {
		expect(adminReducer(undefined, { 
			type: adminActions.ADMIN_SUCCESS,
			payload: initialState.admin,
		 }).loaded === true).toBeTruthy();
	});
	it('results should match payload if success dispatched with payload', () => {
		let payload = {
			...initialState,
			admin: {
				...initialState.admin,
				data: [
					{
						test: 'test'
					}
				]
			}
		};
		expect(adminReducer(initialState, {
			type: adminActions.ADMIN_SUCCESS,
			payload: payload.admin
		}).admin).toEqual(payload.admin);
	});
});
