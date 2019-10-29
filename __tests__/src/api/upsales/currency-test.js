const errorsHelper = require('../../../../src/helpers/errorsHelper');
const logger = require('../../../../src/helpers/log');

const errors = require('../../../../src/api/upsales/errors');


const API_KEY = 'TEST_API_KEY';


const getDefaultAxiosOptions = () => {
	return {
		method: 'GET',
		url: 'https://power.upsales.com/api/v2/currencies',
		headers: {
			'Cookie': `token=${API_KEY}`,
			'Content-Type': 'application/json'
		}
	};
};

const getDefaultCurrencies = () => ({
	data: {
		data: [
			{ iso: 'EUR' },
			{ iso: 'SEK', masterCurrency: true },
			{ iso: 'USD' },
			{ iso: 'JPY' }
		]
	}
});

const getDefaultMasterCurrency = () => {
	return 'SEK';
}


describe('src/api/upsales/currency.js: getCurrencies', () => {
	beforeEach(() => {
		jest.resetModules();
		jest.mock('axios');
  });

	it('getCurrencies should send correct GET request to acquire currencies from Upsales', async () => {
		const UpsalesApi = require('../../../../src/api/upsales/currency');
		const axios = require('axios');
		axios.mockResolvedValue(getDefaultCurrencies());
		const upsalesApi = new UpsalesApi({ apiKey: API_KEY }, { axios,	errorsHelper,	logger });

		const currencies = await upsalesApi.getCurrencies();

		expect(currencies).toEqual(getDefaultCurrencies().data.data);
		expect(axios.mock.calls[0]).toEqual([ getDefaultAxiosOptions() ]);
	});

	it('getCurrencies should throw exception in case of axios promise rejection', async () => {
		const UpsalesApi = require('../../../../src/api/upsales/currency');
		const axios = require('axios');
		axios.mockRejectedValue('Some error');
		const upsalesApi = new UpsalesApi({ apiKey: API_KEY }, { axios,	errorsHelper,	logger });

		try {
			await upsalesApi.getCurrencies();
			expect(true).toBe(false);
		} catch (err) {
			expect(true).toBe(true);
		}
	});

});


describe('src/api/upsales/currency.js: getMasterCurrency', () => {
	beforeEach(() => {
		jest.resetModules();
		jest.mock('axios');
  });

	it('getMasterCurrency should send correct GET request to acquire currencies from Upsales', async () => {
		const UpsalesApi = require('../../../../src/api/upsales/currency');
		const axios = require('axios');
		axios.mockResolvedValue(getDefaultCurrencies());
		const upsalesApi = new UpsalesApi({ apiKey: API_KEY }, { axios,	errorsHelper,	logger });

 		await upsalesApi.getMasterCurrency();

		expect(axios.mock.calls[0]).toEqual([ getDefaultAxiosOptions() ]);
	});

	it('getMasterCurrency should return correct master currency ISO code', async () => {
		const UpsalesApi = require('../../../../src/api/upsales/currency');
		const axios = require('axios');
		axios.mockResolvedValue(getDefaultCurrencies());
		const upsalesApi = new UpsalesApi({ apiKey: API_KEY }, { axios,	errorsHelper,	logger });

		const masterCurrency = await upsalesApi.getMasterCurrency();

		expect(masterCurrency).toEqual(getDefaultMasterCurrency());
	});

	it('getMasterCurrency should throw exception in case of axios promise rejection', async () => {
		const UpsalesApi = require('../../../../src/api/upsales/currency');
		const axios = require('axios');
		axios.mockRejectedValue('Some error');
		const upsalesApi = new UpsalesApi({ apiKey: API_KEY }, { axios,	errorsHelper,	logger });

		try {
			await upsalesApi.getMasterCurrency();
			expect(true).toBe(false);
		} catch (err) {
			expect(true).toBe(true);
		}
	});

});


describe('src/api/upsales/currency.js: findMasterCurrency', () => {
	beforeEach(() => {
		jest.resetModules();
  });

	it('findMasterCurrency should return correct master currency ISO code', async () => {
		const UpsalesApi = require('../../../../src/api/upsales/currency');
		const upsalesApi = new UpsalesApi({ }, { errorsHelper, logger });

		const masterCurrency = await upsalesApi.findMasterCurrency(getDefaultCurrencies().data.data);

		expect(masterCurrency).toEqual(getDefaultMasterCurrency());
	});

	it('findMasterCurrency should catch, wrap and re-throw exceptions', async () => {
		const UpsalesApi = require('../../../../src/api/upsales/currency');
		const upsalesApi = new UpsalesApi({  }, { errorsHelper,	logger });

		try {
			await upsalesApi.findMasterCurrency();
			expect(true).toBe(false);
		} catch (err) {
			expect(err.code).toBe(errors.FIND_MASTER_CURRENCY_ERROR.code);
		}
	});

});
