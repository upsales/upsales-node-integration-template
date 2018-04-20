jest.mock('express');
jest.mock('../../../src/controllers/validateOrder');

describe('src/routes/version.js', () => {

	describe('POST /', () => {
		it('Should call validateOrder controller', async () => {
			const express = require('express');
			const router = express.Router();
			const validateOrder = require('../../../src/controllers/validateOrder');
			validateOrder.mockReturnValueOnce(Promise.resolve());

			require('../../../src/routes/validateOrder');

			await router.__runner('post');
			expect(validateOrder).toHaveBeenCalledWith({});
		});
	});
});