describe('src/controllers/status.js', () => {
	it('Resolves with status ok', async () => {
		const controller = require('../../../src/controllers/status');
		await expect(controller()).resolves.toEqual('ok');
	});
});
