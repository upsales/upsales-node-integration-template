const { promisify } = require('util');
const correlation = promisify(require('../../../src/middlewares/correlation'));

describe('src/middlewares/correlation.js', () => {
	const getDefaultReqRes = () => {
		return {
			req: {},
			res: {set: jest.fn()}
		};
	};

	it('It should attach correlationId to request', async () => {
		const { req, res } = getDefaultReqRes();
		await correlation(req, res);
		expect(req.correlationId).toBeDefined();
	});
	
	it('It should attach correlation id to response', async () => {
		const { req, res } = getDefaultReqRes();
		await correlation(req, res);
		expect(res.set).toHaveBeenCalled();
	});

	it('Correlation Ids should be the same', async () => {
		const { req, res } = getDefaultReqRes();
		await correlation(req, res);
		expect(res.set).toHaveBeenCalledWith('x-correlation-id',req.correlationId);
	});
});
