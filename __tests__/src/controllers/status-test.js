describe('src/controllers/version.js', () => {
	it('Resolves with current version', async () => {
		const controller = require('../../../src/controllers/status');
		await expect(controller()).resolves.toEqual('ok');
	});
});
