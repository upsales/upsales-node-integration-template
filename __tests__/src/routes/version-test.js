jest.mock('express');
jest.mock('../../../src/controllers/version');

describe('src/routes/version.js', () => {

	describe('GET /version', () => {
		it('Should call version controller', async () => {
			const express = require('express');
			const router = express.Router();
			const controller = require('../../../src/controllers/version');
			controller.mockReturnValueOnce(Promise.resolve('1.2.3'));

			require('../../../src/routes/version');

			await router.__runner('get');
			expect(controller).toHaveBeenCalledWith();
		});
	});
});