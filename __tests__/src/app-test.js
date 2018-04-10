jest.mock('express');

describe('src/app.js', () => {
	it('App starts', () => {
		expect(require.bind(null, '../../src/app')).not.toThrow();
	});

	it('App has jsonparser', () => {
		const app = require('../../src/app');
		const express = require('express');
		expect(app.use).toHaveBeenCalledWith(express.json());
	});
});
