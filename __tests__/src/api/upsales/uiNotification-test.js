const errorsHelper = require('../../../../src/helpers/errorsHelper');
const logger = require('../../../../src/helpers/log');

const API_KEY = 'TEST_API_KEY';
const IMPORT_ID = 199;
const ALTERNATE_IMPORT_ID = 210;
const CALLBACK_URL = 'http://some.callback.url/';
const ALTERNATE_CALLBACK_URL = 'http://alternate.callback.url/';
const PROGRESS = 75;
const NOTIFICATION = 'some message';
const ERROR_TEXT = 'error message';

const getDefaultSendProgressOptions = () => {
	return {
		method: 'PUT',
		url: `https://power.upsales.com/api/v2/onboardingimports/${IMPORT_ID}`,
		headers: {
			'Cookie': `token=${API_KEY}`,
			'Content-Type': 'application/json'
		},
		data: {
			id: IMPORT_ID,
			progress: PROGRESS
		}
	};
};

const getAlternateSendProgressOptions = () => {
	return {
		method: 'PUT',
		url: `https://power.upsales.com/api/v2/onboardingimports/${ALTERNATE_IMPORT_ID}`,
		headers: {
			'Cookie': `token=${API_KEY}`,
			'Content-Type': 'application/json'
		},
		data: {
			id: ALTERNATE_IMPORT_ID,
			progress: PROGRESS
		}
	};
};


const getDefaultSendMessageOptions = () => {
	return {
		method: 'POST',
		url: CALLBACK_URL,
		headers: {
			'Cookie': `token=${API_KEY}`,
			'Content-Type': 'application/json'
		},
		data: {
			notify: NOTIFICATION
		}
	}
};

const getAlternateSendMessageOptions = () => {
	return {
		method: 'POST',
		url: ALTERNATE_CALLBACK_URL,
		headers: {
			'Cookie': `token=${API_KEY}`,
			'Content-Type': 'application/json'
		},
		data: {
			notify: NOTIFICATION
		}
	}
};


const getDefaultSendErrorOptions = () => {
	return {
		method: 'POST',
		url: CALLBACK_URL,
		headers: {
			'Cookie': `token=${API_KEY}`,
			'Content-Type': 'application/json'
		},
		data: {
			message: ERROR_TEXT,
			notify: ERROR_TEXT
		}
	}
};

const getAlternateSendErrorOptions = () => {
	return {
		method: 'POST',
		url: ALTERNATE_CALLBACK_URL,
		headers: {
			'Cookie': `token=${API_KEY}`,
			'Content-Type': 'application/json'
		},
		data: {
			message: ERROR_TEXT,
			notify: ERROR_TEXT
		}
	}
};


const getDefaultUpsalesResponse = () => {
	return {
		data: 'SOME_RESULT'
	};
};



describe('src/api/upsales/uiNotification.js: safeSendProgress', () => {
	beforeEach(() => {
		jest.resetModules();
		jest.mock('axios');
  });

	it('safeSendProgress should send correct PUT request to Upsales', async () => {
		const UpsalesApi = require('../../../../src/api/upsales/uiNotification');
		const axios = require('axios');
		axios.mockResolvedValue(getDefaultUpsalesResponse());
		const upsalesApi = new UpsalesApi({ apiKey: API_KEY, importId: IMPORT_ID }, { axios,	errorsHelper,	logger });

		const upsalesResponse = await upsalesApi.safeSendProgress(PROGRESS);

		expect(upsalesResponse).toEqual(getDefaultUpsalesResponse().data);
		expect(axios.mock.calls[0]).toEqual([ getDefaultSendProgressOptions() ]);
	});

	it('safeSendProgress should use alternateImportId if specified', async () => {
		const UpsalesApi = require('../../../../src/api/upsales/uiNotification');
		const axios = require('axios');
		axios.mockResolvedValue(getDefaultUpsalesResponse());
		const upsalesApi = new UpsalesApi({ apiKey: API_KEY, importId: IMPORT_ID }, { axios,	errorsHelper,	logger });

		const upsalesResponse = await upsalesApi.safeSendProgress(PROGRESS, ALTERNATE_IMPORT_ID);

		expect(upsalesResponse).toEqual(getDefaultUpsalesResponse().data);
		expect(axios.mock.calls[0]).toEqual([ getAlternateSendProgressOptions() ]);
	});

	it('safeSendProgress should silently ignore axios promise rejection', async () => {
		const UpsalesApi = require('../../../../src/api/upsales/uiNotification');
		const axios = require('axios');
		axios.mockRejectedValue('Some error');
		const upsalesApi = new UpsalesApi({ apiKey: API_KEY, importId: IMPORT_ID }, { axios,	errorsHelper,	logger });

		try {
			const upsalesResponse = await upsalesApi.safeSendProgress(PROGRESS);
			expect(true).toBe(true);
		} catch (err) {
			expect(true).toBe(false);
		}
	});

});


describe('src/api/upsales/uiNotification.js: safeSendMessage', () => {
	beforeEach(() => {
		jest.resetModules();
		jest.mock('axios');
  });

	it('safeSendMessage should send correct PUT request to Upsales', async () => {
		const UpsalesApi = require('../../../../src/api/upsales/uiNotification');
		const axios = require('axios');
		axios.mockResolvedValue(getDefaultUpsalesResponse());
		const upsalesApi = new UpsalesApi({ apiKey: API_KEY, callbackUrl: CALLBACK_URL }, { axios,	errorsHelper,	logger });

		const upsalesResponse = await upsalesApi.safeSendMessage(NOTIFICATION);

		expect(upsalesResponse).toEqual(getDefaultUpsalesResponse().data);
		expect(axios.mock.calls[0]).toEqual([ getDefaultSendMessageOptions() ]);
	});

	it('safeSendMessage should use alternateImportId if specified', async () => {
		const UpsalesApi = require('../../../../src/api/upsales/uiNotification');
		const axios = require('axios');
		axios.mockResolvedValue(getDefaultUpsalesResponse());
		const upsalesApi = new UpsalesApi({ apiKey: API_KEY, callbackUrl: CALLBACK_URL }, { axios,	errorsHelper,	logger });

		const upsalesResponse = await upsalesApi.safeSendMessage(NOTIFICATION, ALTERNATE_CALLBACK_URL);

		expect(upsalesResponse).toEqual(getDefaultUpsalesResponse().data);
		expect(axios.mock.calls[0]).toEqual([ getAlternateSendMessageOptions() ]);
	});

	it('safeSendMessage should silently ignore axios promise rejection', async () => {
		const UpsalesApi = require('../../../../src/api/upsales/uiNotification');
		const axios = require('axios');
		axios.mockRejectedValue('Some error');
		const upsalesApi = new UpsalesApi({ apiKey: API_KEY, callbackUrl: CALLBACK_URL }, { axios,	errorsHelper,	logger });

		try {
			const upsalesResponse = await upsalesApi.safeSendMessage(NOTIFICATION);
			expect(true).toBe(true);
		} catch (err) {
			expect(true).toBe(false);
		}
	});

});


describe('src/api/upsales/uiNotification.js: safeSendError', () => {
	beforeEach(() => {
		jest.resetModules();
		jest.mock('axios');
  });

	it('safeSendError should send correct PUT request to Upsales', async () => {
		const UpsalesApi = require('../../../../src/api/upsales/uiNotification');
		const axios = require('axios');
		axios.mockResolvedValue(getDefaultUpsalesResponse());
		const upsalesApi = new UpsalesApi({ apiKey: API_KEY, callbackUrl: CALLBACK_URL }, { axios,	errorsHelper,	logger });

		const upsalesResponse = await upsalesApi.safeSendError(ERROR_TEXT);

		expect(upsalesResponse).toEqual(getDefaultUpsalesResponse().data);
		expect(axios.mock.calls[0]).toEqual([ getDefaultSendErrorOptions() ]);
	});

	it('safeSendError should use alternateImportId if specified', async () => {
		const UpsalesApi = require('../../../../src/api/upsales/uiNotification');
		const axios = require('axios');
		axios.mockResolvedValue(getDefaultUpsalesResponse());
		const upsalesApi = new UpsalesApi({ apiKey: API_KEY, callbackUrl: CALLBACK_URL }, { axios,	errorsHelper,	logger });

		const upsalesResponse = await upsalesApi.safeSendError(ERROR_TEXT, ALTERNATE_CALLBACK_URL);

		expect(upsalesResponse).toEqual(getDefaultUpsalesResponse().data);
		expect(axios.mock.calls[0]).toEqual([ getAlternateSendErrorOptions() ]);
	});

	it('safeSendError should silently ignore axios promise rejection', async () => {
		const UpsalesApi = require('../../../../src/api/upsales/uiNotification');
		const axios = require('axios');
		axios.mockRejectedValue('Some error');
		const upsalesApi = new UpsalesApi({ apiKey: API_KEY, callbackUrl: CALLBACK_URL }, { axios,	errorsHelper,	logger });

		try {
			const upsalesResponse = await upsalesApi.safeSendError(ERROR_TEXT);
			expect(true).toBe(true);
		} catch (err) {
			expect(true).toBe(false);
		}
	});

});
