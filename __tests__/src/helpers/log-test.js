describe('src/helpers/log.js', () => {
	beforeEach(() => {
		jest.resetModules();
	});
	
	it('make simple log of string', () => {
		const log = require('../../../src/helpers/log');
		expect(() => log.info('log test')).not.toThrow();
	});

	it('log an object in prod', () => {
		process.env.NODE_ENV = 'production';
		const log = require('../../../src/helpers/log');
		expect(() => log.info({msg: 'log test'})).not.toThrow();
	});
});