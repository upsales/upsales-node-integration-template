const errorsHelper = require('../../../../src/helpers/errorsHelper');
const logger = require('../../../../src/helpers/log');

const getAppConfig = () => ({
	configJson: JSON.stringify({
		configField1: 'value1',
		configField2: 'value2',
		configField3: 'value3'
	})
});

const getSavedAppConfig = () => ({
	configJson: JSON.stringify({
		configField1: 'value1',
		configField2: 'value2',
		configField3: 'value3'
	})
});

const getAppConfigChanges = () => ([
	{ name: 'configField2', value: 'newval2' },
	{ name: 'configField4', value: 100 },
	{ name: 'configField5', value: [ 10, 20, 30 ] }
]);

const getNoneAppConfigChanges = () => ([
	{ name: 'configField3', value: 'value3' },
	{ name: 'configField2', value: 'value2' }
]);

const getUpdatedAppConfig = () => ({
	configJson: JSON.stringify({
		configField1: 'value1',
		configField2: 'newval2',
		configField3: 'value3',
		configField4: 100,
		configField5: [ 10, 20, 30 ]
	})
});

const getAppConfigResponse = () => ({
	data: {
		data: getAppConfig()
	}
});

const getSavedAppConfigResponse = () => ({
	data: getSavedAppConfig()
});

const getUpdatedAppConfigResponse = () => ({
	data: getUpdatedAppConfig()
});

const API_KEY = 'TEST_API_KEY';
const INTEGRATION_ID = 277;


describe('src/api/upsales/appConfig.js: load', () => {
	beforeEach(() => {
		jest.resetModules();
		jest.mock('axios');
  });


	it('load should send GET request to acquire App config from Upsales', async () => {
		const UpsalesApi = require('../../../../src/api/upsales/appConfig');
		const axios = require('axios');
		axios.get.mockResolvedValue(getAppConfigResponse());
		const upsalesApi = new UpsalesApi({ apiKey: API_KEY, integrationId: INTEGRATION_ID }, { axios,	errorsHelper,	logger });

		const appConfig = await upsalesApi.load();

		expect(appConfig).toEqual(getAppConfig());
		expect(axios.get.mock.calls).toEqual([ [ 'https://power.upsales.com/api/v2/standardIntegrationSettings/' + INTEGRATION_ID + '?token=' + API_KEY ] ]);
	});


	it('load should throw LOAD_UPSALES_APP_CONFIG_ERROR exception in case of axios promise rejection', async () => {
		const UpsalesApi = require('../../../../src/api/upsales/appConfig');
		const axios = require('axios');
		axios.get.mockRejectedValue('Some error');
		const upsalesApi = new UpsalesApi({ apiKey: API_KEY, integrationId: INTEGRATION_ID }, { axios,	errorsHelper,	logger });

		try {
			await upsalesApi.load();
			expect(true).toBe(false);
		} catch (err) {
			expect(err.code).toBe('LOAD_UPSALES_APP_CONFIG_ERROR')
		}
	});

});



describe('src/api/upsales/appConfig.js: save', () => {
	beforeEach(() => {
		jest.resetModules();
		jest.mock('axios');
  });


	it('save should send PUT request to save App config to Upsales', async () => {
		const UpsalesApi = require('../../../../src/api/upsales/appConfig');
		const axios = require('axios');
		axios.put.mockResolvedValue(getSavedAppConfigResponse());
		const upsalesApi = new UpsalesApi({ apiKey: API_KEY, integrationId: INTEGRATION_ID }, { axios,	errorsHelper,	logger });

		const updatedAppConfig = await upsalesApi.save(getAppConfig());

		expect(updatedAppConfig).toEqual(getSavedAppConfig());
		expect(axios.put.mock.calls).toEqual([ [ 'https://power.upsales.com/api/v2/standardIntegrationSettings/' + INTEGRATION_ID + '?token=' + API_KEY, getAppConfig() ] ]);
	});


	it('save should throw SAVE_UPSALES_APP_CONFIG_ERROR exception in case of axios promise rejection', async () => {
		const UpsalesApi = require('../../../../src/api/upsales/appConfig');
		const axios = require('axios');
		axios.put.mockRejectedValue('Some error');
		const upsalesApi = new UpsalesApi({ apiKey: API_KEY, integrationId: INTEGRATION_ID }, { axios,	errorsHelper,	logger });

		try {
			const updatedAppConfig = await upsalesApi.save(getAppConfig());
			expect(true).toBe(false);
		} catch (err) {
			expect(err.code).toBe('SAVE_UPSALES_APP_CONFIG_ERROR')
		}
	});

});

describe('src/api/upsales/appConfig.js: updateFields', () => {
	beforeEach(() => {
		jest.resetModules();
		jest.mock('axios');
  });


	it('updateFields should send GET request to acquire App config from Upsales', async () => {
		const UpsalesApi = require('../../../../src/api/upsales/appConfig');
		const axios = require('axios');
		axios.get.mockResolvedValue(getAppConfigResponse());
		axios.put.mockResolvedValue(getUpdatedAppConfigResponse());
		const upsalesApi = new UpsalesApi({ apiKey: API_KEY, integrationId: INTEGRATION_ID }, { axios,	errorsHelper,	logger });

		await upsalesApi.updateFields(getAppConfigChanges());

		expect(axios.get.mock.calls).toEqual([ [ 'https://power.upsales.com/api/v2/standardIntegrationSettings/' + INTEGRATION_ID + '?token=' + API_KEY ] ]);
	});


	it('updateFields should change only specified fields in App config', async () => {
		const UpsalesApi = require('../../../../src/api/upsales/appConfig');
		const axios = require('axios');
		axios.get.mockResolvedValue(getAppConfigResponse());
		axios.put.mockResolvedValue(getUpdatedAppConfigResponse());
		const upsalesApi = new UpsalesApi({ apiKey: API_KEY, integrationId: INTEGRATION_ID }, { axios,	errorsHelper,	logger });

		await upsalesApi.updateFields(getAppConfigChanges());

		expect(axios.put.mock.calls).toEqual([ [ 'https://power.upsales.com/api/v2/standardIntegrationSettings/' + INTEGRATION_ID + '?token=' + API_KEY, getUpdatedAppConfig() ] ]);
	});


	it('updateFields should return true if app config had to be changed', async () => {
		const UpsalesApi = require('../../../../src/api/upsales/appConfig');
		const axios = require('axios');
		axios.get.mockResolvedValue(getAppConfigResponse());
		axios.put.mockResolvedValue(getUpdatedAppConfigResponse());
		const upsalesApi = new UpsalesApi({ apiKey: API_KEY, integrationId: INTEGRATION_ID }, { axios,	errorsHelper,	logger });

		const hasChanged = await upsalesApi.updateFields(getAppConfigChanges());

		expect(hasChanged).toEqual(true);
	});


	it('updateFields should return false if app config had not to be changed', async () => {
		const UpsalesApi = require('../../../../src/api/upsales/appConfig');
		const axios = require('axios');
		axios.get.mockResolvedValue(getAppConfigResponse());
		axios.put.mockResolvedValue(getUpdatedAppConfigResponse());
		const upsalesApi = new UpsalesApi({ apiKey: API_KEY, integrationId: INTEGRATION_ID }, { axios,	errorsHelper,	logger });

		const hasChanged = await upsalesApi.updateFields(getNoneAppConfigChanges());

		expect(hasChanged).toEqual(false);
	});


	it('updateFields should not save app config it had not to be changed', async () => {
		const UpsalesApi = require('../../../../src/api/upsales/appConfig');
		const axios = require('axios');
		axios.get.mockResolvedValue(getAppConfigResponse());
		const upsalesApi = new UpsalesApi({ apiKey: API_KEY, integrationId: INTEGRATION_ID }, { axios,	errorsHelper,	logger });

		const hasChanged = await upsalesApi.updateFields(getNoneAppConfigChanges());

		expect(axios.put.mock.calls.length).toEqual(0);
	});


	it('updateFields should throw UPDATE_UPSALES_APP_CONFIG_ERROR exception in case of axios promise rejection', async () => {
		const UpsalesApi = require('../../../../src/api/upsales/appConfig');
		const axios = require('axios');
		const upsalesApi = new UpsalesApi({ apiKey: API_KEY, integrationId: INTEGRATION_ID }, { axios,	errorsHelper,	logger });

		axios.get.mockResolvedValue(getAppConfigResponse());
		axios.put.mockRejectedValue('Some error');
		try {
			await upsalesApi.updateFields(getAppConfigChanges());
			expect(true).toBe(false);
		} catch (err) {
			expect(err.code).toBe('UPDATE_UPSALES_APP_CONFIG_ERROR')
		}

		axios.get.mockResolvedValue('Some error');
		axios.put.mockResolvedValue(getUpdatedAppConfigResponse());
		try {
			await upsalesApi.updateFields(getAppConfigChanges());
			expect(true).toBe(false);
		} catch (err) {
			expect(err.code).toBe('UPDATE_UPSALES_APP_CONFIG_ERROR')
		}

	});

});
