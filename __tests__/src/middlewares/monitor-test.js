jest.mock('../../../src/helpers/log');
const {promisify} = require('util');

const getRequest = (mockData) => {
	const defaultRequest = {
		method: 'GET', 
		originalUrl: '/test', 
		ip: '127.0.0.1', 
		query: {}, 
		correlationId: 'a',
		headers: {},
		connection: {
			remoteAddress: '127.0.0.1'
		}
	};
	return Object.assign({}, defaultRequest, mockData);
};

describe('src/middlewares/monitor.js', () => {
	it('Should log incoming requests', async () => {
		const monitor = promisify(require('../../../src/middlewares/monitor'));
		const log = require('../../../src/helpers/log');
		const res = {
			on: jest.fn()
		};

		await monitor(getRequest(), res);
		expect(log.info).toHaveBeenCalled();
	});

	it('Should log when request is finished', async () => {
		const monitor = promisify(require('../../../src/middlewares/monitor'));
		const log = require('../../../src/helpers/log');
		log.info.mockReset();
		const res = {
			on: jest.fn((type, cb) => {
				return cb();
			})
		};

		await monitor(getRequest(), res);
		expect(log.info).toHaveBeenCalledTimes(2);
	});
});