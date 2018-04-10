const asyncResponse = require('../../../src/helpers/asyncResponse');

describe('src/helpers/asyncResponse.js', () => {
	const getDefaultReqRes = () => ({
		res: {json: jest.fn()},
		next: jest.fn()
	});

	it('It should pass data when resolved', async () => {
		const { res, next } = getDefaultReqRes();
		await asyncResponse(res, next, function() {
			return Promise.resolve('banana');
		}());
		expect(res.json).toHaveBeenCalledWith('banana');
	});

	it('It should pass error when rejected', async () => {
		const { res, next } = getDefaultReqRes();
		await asyncResponse(res, next, function() {
			return Promise.reject(new Error('error banana'));
		}());
		expect(next).toHaveBeenCalledWith(expect.any(Error));
	});
});
