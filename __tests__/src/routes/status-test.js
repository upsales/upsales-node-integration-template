jest.mock('express');
jest.mock('../../../src/controllers/status');

describe('src/routes/status.js', () => {

	describe('POST /status', () => {
		it('Should call status controller', async () => {
			const express = require('express');
			const router = express.Router();
			const controller = require('../../../src/controllers/status');
			controller.mockReturnValueOnce(Promise.resolve('ok'));

			require('../../../src/routes/status');

			await router.__runner('post');
			expect(controller).toHaveBeenCalledWith();
		});
	});
});