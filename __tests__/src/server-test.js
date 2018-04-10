describe('src/server.js', () => {
	beforeEach(() => {
		jest.resetModules();
		jest.resetAllMocks();
	});

	const wait = ms => new Promise(r => setTimeout(r,ms) );

	it('starts without errors on default port', async () => {
		process.env.PORT = '';
		jest.mock('../../src/app', () => ({listen: jest.fn((p,cb) => cb())}));
		jest.mock('../../src/helpers/log', () => ({info: jest.fn()}));
		const app = require('../../src/app');
		const log = require('../../src/helpers/log');
		
		expect( () => require('../../src/server') ).not.toThrow();

		await wait(100);

		expect(app.listen).toHaveBeenCalledWith(3300, expect.any(Function));
		expect(log.info).toHaveBeenCalledWith('Listening on 3300');
	});

	it('starts without errors on provided port', () => {
		process.env.PORT = '7676';
		jest.mock('../../src/app', () => ({listen: jest.fn((p,cb) => cb())}));
		const app = require('../../src/app');
		
		expect( () => require('../../src/server') ).not.toThrow();

		expect(app.listen).toHaveBeenCalledWith('7676', expect.any(Function));
	});

	it('app throws error', async () => {
		jest.mock('../../src/app', () => ({listen: jest.fn((p,cb) => cb('unknown error'))}));
		jest.mock('../../src/helpers/log', () => ({error: jest.fn()}));
		const log = require('../../src/helpers/log');
		
		require('../../src/server');
		
		await wait(100);

		expect(log.error).toHaveBeenCalledWith('unknown error');
	});
});