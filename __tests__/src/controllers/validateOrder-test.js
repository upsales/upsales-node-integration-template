jest.mock('@upsales/node-upsales');

describe('src/controllers/validateOrder.js', () => {

	it('Should throw if missing order', async () => {
		const validateOrder = require('../../../src/controllers/validateOrder');

		await expect(validateOrder()).rejects.toThrow(Error('Missing order'));
	});

	it('Should throw if missing order', async () => {
		const validateOrder = require('../../../src/controllers/validateOrder');

		await expect(validateOrder({data: {}})).rejects.toThrow(Error('Missing order'));
	});

	it('Should throw if order missing client', async () => {
		const validateOrder = require('../../../src/controllers/validateOrder');

		await expect(validateOrder({data: {obj: {probability: 100}}})).rejects.toThrow(Error('Missing client'));
	});

	it('Should throw if order client missing id', async () => {
		const validateOrder = require('../../../src/controllers/validateOrder');

		await expect(validateOrder({data: {obj: {probability: 100, client: {}}}})).rejects.toThrow(Error('Missing client'));
	});

	it('Should throw if upsales request fails', async () => {
		const validateOrder = require('../../../src/controllers/validateOrder');
		const upsales = require('@upsales/node-upsales');
		upsales.prototype.__failNext('upsales error');

		await expect(validateOrder({apiPath: '', data: {obj: {probability: 100, client: {id: 1}}}})).rejects.toThrow(Error('Missing client'));

		expect(upsales).toHaveBeenCalledWith(expect.any(Object));
	});

	it('Should throw if upsales request fails (no data)', async () => {
		const validateOrder = require('../../../src/controllers/validateOrder');
		const upsales = require('@upsales/node-upsales');
		upsales.prototype.__failNext(null);

		await expect(validateOrder({apiPath: '', data: {obj: {probability: 100, client: {id: 1}}}})).rejects.toThrow(Error('Missing client'));

		expect(upsales).toHaveBeenCalledWith(expect.any(Object));
	});

	it('Should throw if upsales request fails', async () => {
		const validateOrder = require('../../../src/controllers/validateOrder');
		const upsales = require('@upsales/node-upsales');
		upsales.prototype.__returnNext({custom: []});

		await expect(validateOrder({apiPath: '', data: {obj: {probability: 100, client: {id: 1}}}})).rejects.toThrow(Error('Missing orgno.'));
	});

	it('Should throw if upsales org no field missing value', async () => {
		const validateOrder = require('../../../src/controllers/validateOrder');
		const upsales = require('@upsales/node-upsales');
		upsales.prototype.__returnNext({custom: [{fieldId: 1}]});

		await expect(validateOrder({apiPath: '', data: {obj: {probability: 100, client: {id: 1}}}})).rejects.toThrow(Error('Missing orgno.'));
	});

	it('Should throw if upsales org no field has empty value', async () => {
		const validateOrder = require('../../../src/controllers/validateOrder');
		const upsales = require('@upsales/node-upsales');
		upsales.prototype.__returnNext({custom: [{fieldId: 1, value: ''}]});

		await expect(validateOrder({apiPath: '', data: {obj: {probability: 100, client: {id: 1}}}})).rejects.toThrow(Error('Missing orgno.'));
	});

	it('Should return ok if client has org no', async () => {
		const validateOrder = require('../../../src/controllers/validateOrder');
		const upsales = require('@upsales/node-upsales');
		upsales.prototype.__returnNext({custom: [{value: '12345678', fieldId: 1}]});

		await expect(validateOrder({apiPath: '', data: {obj: {probability: 100, client: {id: 1}}}})).resolves.toBe('ok');
	});

	it('Should return ok if client has org no (order.client is id)', async () => {
		const validateOrder = require('../../../src/controllers/validateOrder');
		const upsales = require('@upsales/node-upsales');
		upsales.prototype.__returnNext({custom: [{value: '12345678', fieldId: 1}]});

		await expect(validateOrder({apiPath: '', data: {obj: {probability: 100, client: 1}}})).resolves.toBe('ok');
	});

	it('Should return ok if the order is not 100% probability', async() => {
		const validateOrder = require('../../../src/controllers/validateOrder');
		const upsales = require('@upsales/node-upsales');
		upsales.prototype.__returnNext({custom: [{value: '12345678', fieldId: 1}]});

		await expect(validateOrder({apiPath: '', data: {obj: {probability: 50, client: {id: 1}}}})).resolves.toBe('ok');

	});
});