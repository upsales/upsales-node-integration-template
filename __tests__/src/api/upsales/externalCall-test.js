const errorsHelper = require('../../../../src/helpers/errorsHelper');
const logger = require('../../../../src/helpers/log');

const CUSTOMER_ID = '1002';
const AUTHENTICATION_KEY = 'somekey';
const APP_ID = 300;
const DATA = {
	field1: 'data1',
	field2: 'some data 2'
};

const getCallHookOptions = () => {
	return {
		method: 'POST',
		url: `https://integration.upsales.com/api/external/appHook?customerId=${CUSTOMER_ID}&authenticationKey=${AUTHENTICATION_KEY}&appId=${APP_ID}`,
		headers: {
			'Content-Type': 'application/json'
		},
		data: DATA
	};
};

const getCallHookPostResponse = () => {
	return {
		data: 'SOME_RESULT'
	};
};



describe('src/api/upsales/externalCall.js: callHook', () => {
	beforeEach(() => {
		jest.resetModules();
		jest.mock('axios');
  });

	it('callHook should send correct POST request to Upsales to call app hook', async () => {
		const UpsalesApi = require('../../../../src/api/upsales/externalCall');
		const axios = require('axios');
		axios.mockResolvedValue(getCallHookPostResponse());
		const upsalesApi = new UpsalesApi({ integrationId: APP_ID, authenticationKey: AUTHENTICATION_KEY }, { axios,	errorsHelper,	logger });

		const upsalesResponse = await upsalesApi.callHook(CUSTOMER_ID, DATA);

		expect(upsalesResponse).toEqual(getCallHookPostResponse().data);
		expect(axios.mock.calls[0]).toEqual([ getCallHookOptions() ]);
	});

	it('callHook should throw exception in case of axios promise rejection', async () => {
		const UpsalesApi = require('../../../../src/api/upsales/externalCall');
		const axios = require('axios');
		axios.mockRejectedValue('Some error');
		const upsalesApi = new UpsalesApi({ integrationId: APP_ID, authenticationKey: AUTHENTICATION_KEY }, { axios,	errorsHelper,	logger });

		try {
			const upsalesResponse = await upsalesApi.callHook(CUSTOMER_ID, DATA);
			expect(true).toBe(false);
		} catch (err) {
			expect(true).toBe(true);
		}
	});

});
