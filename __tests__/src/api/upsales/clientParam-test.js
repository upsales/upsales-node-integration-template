const errorsHelper = require('../../../../src/helpers/errorsHelper');
const logger = require('../../../../src/helpers/log');

const API_KEY = 'TEST_API_KEY';
const PARAM_ID = 100;
const PARAM_VALUE = 'SOME VALUE';

const getClientParamOptions = () => {
	return {
		method: 'PUT',
		url: `https://power.upsales.com/api/v2/master/clientParam/${PARAM_ID}`,
		headers: {
			'Cookie': `token=${API_KEY}`,
			'Content-Type': 'application/json'
		},
		data: PARAM_VALUE
	};
};

const getClientParameterPutResponse = () => {
	return {
		data: 'SOME_RESULT'
	};
};



describe('src/api/upsales/clientParam.js: set', () => {
	beforeEach(() => {
		jest.resetModules();
		jest.mock('axios');
  });

	it('set should send correct PUT request to Upsales to change parameter value', async () => {
		const UpsalesApi = require('../../../../src/api/upsales/clientParam');
		const axios = require('axios');
		axios.mockResolvedValue(getClientParameterPutResponse());
		const upsalesApi = new UpsalesApi({ apiKey: API_KEY }, { axios,	errorsHelper,	logger });

		const upsalesResponse = await upsalesApi.set(PARAM_ID, PARAM_VALUE);

		expect(upsalesResponse).toEqual(getClientParameterPutResponse().data);
		expect(axios.mock.calls[0]).toEqual([ getClientParamOptions() ]);
	});

	it('set should throw exception in case of axios promise rejection', async () => {
		const UpsalesApi = require('../../../../src/api/upsales/clientParam');
		const axios = require('axios');
		axios.mockRejectedValue('Some error');
		const upsalesApi = new UpsalesApi({ apiKey: API_KEY }, { axios,	errorsHelper,	logger });

		try {
			const upsalesResponse = await upsalesApi.set(PARAM_ID, PARAM_VALUE);
			expect(true).toBe(false);
		} catch (err) {
			expect(true).toBe(true);
		}
	});

});
