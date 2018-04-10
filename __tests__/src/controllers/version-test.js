describe('src/controllers/version.js', () => {
	it('Resolves with current version', async () => {
		const pack = require('../../../package.json');
		const controller = require('../../../src/controllers/version');
		await expect(controller()).resolves.toEqual(pack.version);
	});
});
