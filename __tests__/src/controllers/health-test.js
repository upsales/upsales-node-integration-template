describe('src/controllers/health.js', () => {
	it('Resolves with package name', async () => {
		const controller = require('../../../src/controllers/health');
		const pack = require('../../../package.json');
		await expect(controller()).resolves.toEqual(pack.name);
	});
});
