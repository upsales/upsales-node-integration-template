jest.mock('express');
jest.mock('../../../src/controllers/health');

describe('src/routes/health.js', () => {

	describe('GET /health', () => {
		it('Should call health controller', async () => {
			const express = require('express');
			const router = express.Router();
			const controller = require('../../../src/controllers/health');
			const pack = require('../../../package.json');
			controller.mockReturnValueOnce(Promise.resolve(pack.name));

			require('../../../src/routes/health');

			await router.__runner('get');
			expect(controller).toHaveBeenCalledWith();
		});
	});
});