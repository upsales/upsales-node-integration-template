const cors = require('../../../src/middlewares/cors');

describe('src/middlewares/cors.js', () => {
	const getDefaultRes = () => {
		return {header: jest.fn(), sendStatus: jest.fn()};
	};

	beforeEach(() => {
		jest.resetModules();
		jest.resetAllMocks();
	});

	it('Add all headers', async () => {
		process.env.NODE_ENV = 'development';
		const res = getDefaultRes();
		const next = jest.fn();
		cors({}, res, next);
		expect(res.header).toHaveBeenCalledWith('Access-Control-Allow-Origin', '*');
		expect(res.header).toHaveBeenCalledWith('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
		expect(res.header).toHaveBeenCalledWith('Access-Control-Allow-Headers','Content-Type, X-Requested-With, Accept');
		expect(next).toHaveBeenCalled();
	});


	it('Add real origin as Access-Control-Allow-Origin in PROD', async () => {
		process.env.NODE_ENV = 'production';
		const res = getDefaultRes();
		const next = jest.fn();
		cors({headers: {origin: 'http://localhost/mycoolapp'}}, res, next);
		expect(res.header).toHaveBeenCalledWith('Access-Control-Allow-Origin', 'http://localhost/mycoolapp');
		expect(next).toHaveBeenCalled();
	});


	it('Let OPTIONS requests pass', async () => {
		const res = getDefaultRes();
		const next = jest.fn();
		cors({headers: {origin: 'http://localhost/mycoolapp'}, method: 'OPTIONS'}, res, next);
		expect(res.sendStatus).toHaveBeenCalled();
	});
});
