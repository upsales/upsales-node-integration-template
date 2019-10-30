const errorsHelper = require('../../../../src/helpers/errorsHelper');
const logger = require('../../../../src/helpers/log');

const getNewDynamicLink = () => ({ data: 'RESULT' });

const getDynamicLinks = () => ({
	data: {
		data: [
			{ id: 1, href: 'aaa' },
			{ id: 2, href: 'EXISTING_LINK' },
			{ id: 3, href: 'ccc' }
		]
	}
});

const getNoDataResponse = () => ({
});

const getDynamicLinkSingleObject = () => ({
	data: {
		data: { id: 2, href: 'EXISTING_LINK' }
	}
});

const API_KEY = 'TEST_API_KEY';
const INTEGRATION_ID = 277;



describe('src/api/upsales/dynamicLink.js: createDynamicLink', () => {
	beforeEach(() => {
		jest.resetModules();
		jest.mock('axios');
  });

	it('createDynamicLink should send POST request to create Dynamic link', async () => {
		const UpsalesApi = require('../../../../src/api/upsales/dynamicLink');
		const axios = require('axios');
		axios.post.mockResolvedValue(getNewDynamicLink());
		const upsalesApi = new UpsalesApi({ apiKey: API_KEY }, { axios,	errorsHelper,	logger });

		const linkObject = {
			href: 'SOME_LINK'
		};

		const createdLink = await upsalesApi.createDynamicLink(linkObject);

		expect(createdLink).toEqual(getNewDynamicLink().data);
		expect(axios.post.mock.calls).toEqual([ [ 'https://power.upsales.com/api/v2/link?token=' + API_KEY, linkObject ] ]);
	});

	it('createDynamicLink should throw exception in case of axios promise rejection', async () => {
		const UpsalesApi = require('../../../../src/api/upsales/dynamicLink');
		const axios = require('axios');
		axios.post.mockRejectedValue('Some error');
		const upsalesApi = new UpsalesApi({ apiKey: API_KEY }, { axios,	errorsHelper,	logger });

		const linkObject = {
			href: 'SOME_LINK'
		};

		try {
			const createdLink = await upsalesApi.createDynamicLink(linkObject);
			expect(true).toBe(false);
		} catch (err) {
			expect(true).toBe(true);
		}
	});

});



describe('src/api/upsales/dynamicLink.js: loadDynamicLinks', () => {
	beforeEach(() => {
		jest.resetModules();
		jest.mock('axios');
  });

	it('loadDynamicLinks should send GET request to acquire Dynamic links list from Upsales', async () => {
		const UpsalesApi = require('../../../../src/api/upsales/dynamicLink');
		const axios = require('axios');
		axios.get.mockResolvedValue(getDynamicLinks());
		const upsalesApi = new UpsalesApi({ apiKey: API_KEY }, { axios,	errorsHelper,	logger });

		const links = await upsalesApi.loadDynamicLinks();

		expect(links).toEqual(getDynamicLinks().data.data);
		expect(axios.get.mock.calls).toEqual([ [ 'https://power.upsales.com/api/v2/link?token=' + API_KEY ] ]);
	});

	it('loadDynamicLinks should throw exception in case of axios promise rejection', async () => {
		const UpsalesApi = require('../../../../src/api/upsales/dynamicLink');
		const axios = require('axios');
		axios.get.mockRejectedValue('Some error');
		const upsalesApi = new UpsalesApi({ apiKey: API_KEY }, { axios,	errorsHelper,	logger });

		try {
			const links = await upsalesApi.loadDynamicLinks();
			expect(true).toBe(false);
		} catch (err) {
			expect(true).toBe(true);
		}
	});

	it('loadDynamicLinks should return empty array if Upsales response contains no `data` field', async () => {
		const UpsalesApi = require('../../../../src/api/upsales/dynamicLink');
		const axios = require('axios');
		axios.get.mockResolvedValue(getNoDataResponse());
		const upsalesApi = new UpsalesApi({ apiKey: API_KEY }, { axios,	errorsHelper,	logger });

		const links = await upsalesApi.loadDynamicLinks();

		expect(links).toEqual([]);
		expect(axios.get.mock.calls).toEqual([ [ 'https://power.upsales.com/api/v2/link?token=' + API_KEY ] ]);
	});

});



describe('src/api/upsales/dynamicLink.js: createDynamicLinkIfNecessary', () => {
	beforeEach(() => {
		jest.resetModules();
		jest.mock('axios');
  });

	it('createDynamicLinkIfNecessary should send POST request to create Dynamic link if no such Dynamic link exists', async () => {
		const UpsalesApi = require('../../../../src/api/upsales/dynamicLink');
		const axios = require('axios');
		axios.post.mockResolvedValue(getNewDynamicLink());
		axios.get.mockResolvedValue(getDynamicLinks());
		const upsalesApi = new UpsalesApi({ apiKey: API_KEY }, { axios,	errorsHelper,	logger });

		const linkObject = {
			href: 'SOME_LINK'
		};

		const createdLink = await upsalesApi.createDynamicLinkIfNecessary(linkObject);

		expect(createdLink).toEqual(getNewDynamicLink().data);
		expect(axios.get.mock.calls).toEqual([ [ 'https://power.upsales.com/api/v2/link?token=' + API_KEY ] ]);
		expect(axios.post.mock.calls).toEqual([ [ 'https://power.upsales.com/api/v2/link?token=' + API_KEY, linkObject ] ]);
	});

	it('createDynamicLinkIfNecessary should not send POST request to create Dynamic link if such Dynamic link already exists', async () => {
		const UpsalesApi = require('../../../../src/api/upsales/dynamicLink');
		const axios = require('axios');
		axios.post.mockResolvedValue(getNewDynamicLink());
		axios.get.mockResolvedValue(getDynamicLinks());
		const upsalesApi = new UpsalesApi({ apiKey: API_KEY }, { axios,	errorsHelper,	logger });

		const linkObject = {
			href: 'EXISTING_LINK'
		};

		const createdLink = await upsalesApi.createDynamicLinkIfNecessary(linkObject);

		expect(createdLink).toBeUndefined();
		expect(axios.get.mock.calls).toEqual([ [ 'https://power.upsales.com/api/v2/link?token=' + API_KEY ] ]);
	});

	it('createDynamicLinkIfNecessary should support single-object lists of Dynamic links', async () => {
		const UpsalesApi = require('../../../../src/api/upsales/dynamicLink');
		const axios = require('axios');
		axios.post.mockResolvedValue(getNewDynamicLink());
		axios.get.mockResolvedValue(getDynamicLinkSingleObject());
		const upsalesApi = new UpsalesApi({ apiKey: API_KEY }, { axios,	errorsHelper,	logger });

		const linkObject = {
			href: 'SOME_LINK'
		};
		const createdLink = await upsalesApi.createDynamicLinkIfNecessary(linkObject);

		const linkObject2 = {
			href: 'EXISTING_LINK'
		};
		const createdLink2 = await upsalesApi.createDynamicLinkIfNecessary(linkObject2);

		expect(createdLink).toEqual(getNewDynamicLink().data);
		expect(createdLink2).toBeUndefined();
		expect(axios.get.mock.calls).toEqual([
			[ 'https://power.upsales.com/api/v2/link?token=' + API_KEY ],
		 	[ 'https://power.upsales.com/api/v2/link?token=' + API_KEY ]
		]);
		expect(axios.post.mock.calls).toEqual([ [ 'https://power.upsales.com/api/v2/link?token=' + API_KEY, linkObject ] ]);
	});

	it('createDynamicLinkIfNecessary should throw exception in case of axios promise rejection when creating Dynamic link', async () => {
		const UpsalesApi = require('../../../../src/api/upsales/dynamicLink');
		const axios = require('axios');
		axios.post.mockRejectedValue('Some error');
		const upsalesApi = new UpsalesApi({ apiKey: API_KEY }, { axios,	errorsHelper,	logger });

		const linkObject = {
			href: 'SOME_LINK'
		};

		try {
			const createdLink = await upsalesApi.createDynamicLinkIfNecessary(linkObject);
			expect(true).toBe(false);
		} catch (err) {
			expect(true).toBe(true);
		}
	});

	it('createDynamicLinkIfNecessary should create Dyamic Link in case of axios rejection when retrieving Dynamic links list', async () => {
		const UpsalesApi = require('../../../../src/api/upsales/dynamicLink');
		const axios = require('axios');
		axios.post.mockResolvedValue(getNewDynamicLink());
		axios.get.mockRejectedValue('Some error');
		const upsalesApi = new UpsalesApi({ apiKey: API_KEY }, { axios,	errorsHelper,	logger });

		const linkObject = {
			href: 'SOME_LINK'
		};

		const createdLink = await upsalesApi.createDynamicLinkIfNecessary(linkObject);
		expect(createdLink).toEqual(getNewDynamicLink().data);
		expect(axios.get.mock.calls).toEqual([ [ 'https://power.upsales.com/api/v2/link?token=' + API_KEY ] ]);
		expect(axios.post.mock.calls).toEqual([ [ 'https://power.upsales.com/api/v2/link?token=' + API_KEY, linkObject ] ]);
	});

});
