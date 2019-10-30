const errorsHelper = require('../../../../src/helpers/errorsHelper');
const logger = require('../../../../src/helpers/log');



const getDefaultCustomFieldsMetadata = () => ([
	{ id: 1, alias: 'ALIAS_1' },
	{ id: 12, alias: 'ALIAS_2' },
	{ id: 5, alias: 'ALIAS_10' },
	{ id: 6, alias: 'ALIAS_3' },
	{ id: 1001, alias: 'ALIAS_5' },
	{ id: 6, alias: 'ALIAS_3' },
	{ id: 1005, alias: 'AlIaS_6' }
]);

const getVariousCaseCustomFieldsMetadata = () => ([
	{ id: 1, alias: 'ALIAS_1' },
	{ id: 12, alias: 'ALIAS_2' },
	{ id: 5, alias: 'ALIAS_10' },
	{ id: 6, alias: 'ALIAS_3' },
	{ id: 1001, alias: 'ALIAS_5' },
	{ id: 6, alias: 'ALIAS_3' },
	{ id: 1005, alias: 'AlIaS_6' }
]);

const getAlteredCustomFieldsMetadata = () => ([
	{ id: 11, alias: 'ALIAS_1' },
	{ id: 112, alias: 'ALIAS_2' },
	{ id: 15, alias: 'ALIAS_10' },
	{ id: 16, alias: 'ALIAS_3' },
	{ id: 11001, alias: 'ALIAS_5' },
	{ id: 16, alias: 'ALIAS_3' },
	{ id: 11005, alias: 'AlIaS_6' },
	{ id: 1100, alias: 'ALIAS_7' }
]);

const getCustomFieldsMetadataWithAbsentAliases = () => ([
	{ id: 1, alias: 'ALIAS_1' },
	{ id: 12 },
	{ id: 5, alias: 'ALIAS_10' },
	{ id: 6 },
	{ id: 1001, alias: 'ALIAS_5' },
	{ id: 6, alias: 'ALIAS_3' },
	{ id: 1005, alias: 'AlIaS_6' }
]);

const getCustomFieldsMetadataWithNotStringAliases = () => ([
	{ id: 1, alias: 'ALIAS_1' },
	{ id: 12, alias: 5 },
	{ id: 5, alias: 'ALIAS_10' },
	{ id: 6, alias: ['some', 'array'] },
	{ id: 1001, alias: 'ALIAS_5' },
	{ id: 6, alias: 'ALIAS_3' },
	{ id: 1005, alias: 'AlIaS_6' }
]);

const getDefaultCustomFieldsData = () => ([
	{ fieldId: 1, value: 20 },
	{ fieldId: 12, value: 30 },
	{ fieldId: 5, value: 15 },
	{ fieldId: 6, value: 17 },
	{ fieldId: 1001, value: 3 },
	{ fieldId: 6, value: 8 },
	{ fieldId: 1005, value: 35 }
]);

const getDefaultObject = () => {
	return Object.assign({}, {
		id: 1002,
		custom: [
			{ fieldId: 2, value: 'AAA' },
			{ fieldId: 5, value: 100 }
		]
	});
};

const getObjectWithEmptyCustomFieldsArray = () => {
	return Object.assign({}, {
		id: 1002,
		custom: []
	});
};

const getObjectWithUndefinedCustomFieldsArray = () => {
	return Object.assign({}, {
		id: 1002,
	});
};

const getDefaultFieldsMap = () => ({
	1: { id: 1, alias: 'ALIAS_1' },
	'ALIAS_1': { id: 1, alias: 'ALIAS_1' },
	12: { id: 12, alias: 'ALIAS_2' },
	'ALIAS_2': { id: 12, alias: 'ALIAS_2' },
	5: { id: 5, alias: 'ALIAS_10' },
	'ALIAS_10': { id: 5, alias: 'ALIAS_10' },
	6: { id: 6, alias: 'ALIAS_3' },
	'ALIAS_3': { id: 6, alias: 'ALIAS_3' },
	1001: { id: 1001, alias: 'ALIAS_5' },
	'ALIAS_5': { id: 1001, alias: 'ALIAS_5' },
	1005: { id: 1005, alias: 'ALIAS_6' },
	'ALIAS_6': { id: 1005, alias: 'ALIAS_6' }
});

const getVariousCaseFieldsMap = () => ({
	1: { id: 1, alias: 'ALIAS_1' },
	'ALIAS_1': { id: 1, alias: 'ALIAS_1' },
	12: { id: 12, alias: 'ALIAS_2' },
	'ALIAS_2': { id: 12, alias: 'ALIAS_2' },
	5: { id: 5, alias: 'ALIAS_10' },
	'ALIAS_10': { id: 5, alias: 'ALIAS_10' },
	6: { id: 6, alias: 'ALIAS_3' },
	'ALIAS_3': { id: 6, alias: 'ALIAS_3' },
	1001: { id: 1001, alias: 'ALIAS_5' },
	'ALIAS_5': { id: 1001, alias: 'ALIAS_5' },
	1005: { id: 1005, alias: 'ALIAS_6' },
	'ALIAS_6': { id: 1005, alias: 'ALIAS_6' }
});

const getAlteredCustomFieldsMap = () => ({
	11: { id: 11, alias: 'ALIAS_1' },
	'ALIAS_1': { id: 11, alias: 'ALIAS_1' },
	112: { id: 112, alias: 'ALIAS_2' },
	'ALIAS_2': { id: 112, alias: 'ALIAS_2' },
	15: { id: 15, alias: 'ALIAS_10' },
	'ALIAS_10': { id: 15, alias: 'ALIAS_10' },
	16: { id: 16, alias: 'ALIAS_3' },
	'ALIAS_3': { id: 16, alias: 'ALIAS_3' },
	11001: { id: 11001, alias: 'ALIAS_5' },
	'ALIAS_5': { id: 11001, alias: 'ALIAS_5' },
	11005: { id: 11005, alias: 'ALIAS_6' },
	'ALIAS_6': { id: 11005, alias: 'ALIAS_6' },
	1100: { id: 1100, alias: 'ALIAS_7' },
	'ALIAS_7': { id: 1100, alias: 'ALIAS_7' }
});

const getDefaultUpsales = (metadataProvider = getDefaultCustomFieldsMetadata) => ({
	order: {
		customfields: {
			create: jest.fn((data) => {
				data.id = 1;
				return data;
			}),
			list: jest.fn().mockResolvedValue(metadataProvider())
		}
	},
	account: {
		customfields: {
			create: jest.fn((data) => {
				data.id = 1;
				return data;
			}),
			list: jest.fn().mockResolvedValue(metadataProvider())
		}
	}
});

const getTwoStagedUpsales = (metadataProvider1 = getDefaultCustomFieldsMetadata, metadataProvider2 = getDefaultCustomFieldsMetadata) => ({
	order: {
		customfields: {
			create: jest.fn((data) => {
				data.id = 1;
				return data;
			}),
			list: jest.fn().mockResolvedValueOnce(metadataProvider1()).mockResolvedValue(metadataProvider2())
		}
	}
});



describe('src/helpers/customFields.js: findFieldByAlias', () => {
	beforeEach(() => {
		jest.resetModules();
	});

	it('findFieldByAlias should find and return field by alias', () => {
		const CustomFields = require('../../../../src/api/upsales/customFields');
		const customFields = new CustomFields({}, { errorsHelper, logger });
		const foundField = customFields.metadata.findFieldByAlias(getDefaultCustomFieldsMetadata(), 'ALIAS_10');
		expect(foundField).toEqual(getDefaultCustomFieldsMetadata()[2]);
	});

	it('findFieldByAlias should ignore case of alias parameter', () => {
		const CustomFields = require('../../../../src/api/upsales/customFields');
		const customFields = new CustomFields({}, { errorsHelper, logger });
		const foundField = customFields.metadata.findFieldByAlias(getDefaultCustomFieldsMetadata(), 'AlIaS_10');
		expect(foundField).toEqual(getDefaultCustomFieldsMetadata()[2]);
	});

	it('findFieldByAlias should ignore case of alias in fields', () => {
		const CustomFields = require('../../../../src/api/upsales/customFields');
		const customFields = new CustomFields({}, { errorsHelper, logger });
		const foundField = customFields.metadata.findFieldByAlias(getDefaultCustomFieldsMetadata(), 'ALIAS_6');
		expect(foundField).toEqual(getDefaultCustomFieldsMetadata()[6]);
	});

	it('findFieldByAlias should return first occurance if multiple fields with the same alias are found', () => {
		const CustomFields = require('../../../../src/api/upsales/customFields');
		const customFields = new CustomFields({}, { errorsHelper, logger });
		const foundField = customFields.metadata.findFieldByAlias(getDefaultCustomFieldsMetadata(), 'ALIAS_3');
		expect(foundField).toEqual(getDefaultCustomFieldsMetadata()[3]);
	});

	it('findFieldByAlias should return undefined if field is not found', () => {
		const CustomFields = require('../../../../src/api/upsales/customFields');
		const customFields = new CustomFields({}, { errorsHelper, logger });
		const foundField = customFields.metadata.findFieldByAlias(getDefaultCustomFieldsMetadata(), 'ALIAS_NOT_IN_THE_FIELDS');
		expect(foundField).toBeUndefined();
	});

	it('findFieldByAlias should return undefined if alias parameter is not specified', () => {
		const CustomFields = require('../../../../src/api/upsales/customFields');
		const customFields = new CustomFields({}, { errorsHelper, logger });
		const foundField = customFields.metadata.findFieldByAlias(getDefaultCustomFieldsMetadata());
		expect(foundField).toBeUndefined();
	});

	it('findFieldByAlias should return undefined if alias parameter is not string', () => {
		const CustomFields = require('../../../../src/api/upsales/customFields');
		const customFields = new CustomFields({}, { errorsHelper, logger });
		const foundField = customFields.metadata.findFieldByAlias(getDefaultCustomFieldsMetadata(), 5);
		expect(foundField).toBeUndefined();
	});

	it('findFieldByAlias should return undefined if fields parameter is not specified', () => {
		const CustomFields = require('../../../../src/api/upsales/customFields');
		const customFields = new CustomFields({}, { errorsHelper, logger });
		const foundField = customFields.metadata.findFieldByAlias(null, 'ALIAS_5');
		expect(foundField).toBeUndefined();
	});

	it('findFieldByAlias should return undefined if fields parameter is not array', () => {
		const CustomFields = require('../../../../src/api/upsales/customFields');
		const customFields = new CustomFields({}, { errorsHelper, logger });
		const foundField = customFields.metadata.findFieldByAlias('Some value', 'ALIAS_5');
		expect(foundField).toBeUndefined();
	});

	it('findFieldByAlias should ignore fields with absent aliases', () => {
		const CustomFields = require('../../../../src/api/upsales/customFields');
		const customFields = new CustomFields({}, { errorsHelper, logger });
		const foundField = customFields.metadata.findFieldByAlias(getCustomFieldsMetadataWithAbsentAliases(), 'ALIAS_5');
		expect(foundField).toEqual(getCustomFieldsMetadataWithAbsentAliases()[4]);
	});

	it('findFieldByAlias should ignore fields with not string aliases', () => {
		const CustomFields = require('../../../../src/api/upsales/customFields');
		const customFields = new CustomFields({}, { errorsHelper, logger });
		const foundField = customFields.metadata.findFieldByAlias(getCustomFieldsMetadataWithNotStringAliases(), 'ALIAS_5');
		expect(foundField).toEqual(getCustomFieldsMetadataWithNotStringAliases()[4]);
	});

});



describe('src/helpers/customFields.js: getValueById', () => {
	beforeEach(() => {
		jest.resetModules();
	});

	it('getValueById should find field by ID', () => {
		const CustomFields = require('../../../../src/api/upsales/customFields');
		const upsales = getDefaultUpsales();
		const customFields = new CustomFields({}, { errorsHelper, logger });
		const foundField = customFields.getValueById(getDefaultCustomFieldsData(), 5);
		expect(foundField).toEqual(getDefaultCustomFieldsData()[2].value);
	});

	it('getValueById should return first occurance if multiple fields with the same ID are found', () => {
		const CustomFields = require('../../../../src/api/upsales/customFields');
		const customFields = new CustomFields({}, { errorsHelper, logger });
		const foundField = customFields.getValueById(getDefaultCustomFieldsData(), 6);
		expect(foundField).toEqual(getDefaultCustomFieldsData()[3].value);
	});

	it('getValueById should return undefined if ID parameter is not specified', () => {
		const CustomFields = require('../../../../src/api/upsales/customFields');
		const customFields = new CustomFields({}, { errorsHelper, logger });
		const foundField = customFields.getValueById(getDefaultCustomFieldsData());
		expect(foundField).toBeUndefined();
	});

	it('getValueById should return undefined if fields parameter is not specified', () => {
		const CustomFields = require('../../../../src/api/upsales/customFields');
		const customFields = new CustomFields({}, { errorsHelper, logger });
		const foundField = customFields.getValueById(null, 5);
		expect(foundField).toBeUndefined();
	});

});



describe('src/helpers/customFields.js: getValueByAlias', () => {
	beforeEach(() => {
		jest.resetModules();
	});

	it('getValueByAlias should find field value by alias', async () => {
		const CustomFields = require('../../../../src/api/upsales/customFields');
		const upsales = getDefaultUpsales();
		const customFields = new CustomFields({}, { upsales, errorsHelper, logger });

		const foundValue = await customFields.getValueByAlias(getDefaultCustomFieldsData(), 'order', 'ALIAS_10');
		expect(foundValue).toEqual(getDefaultCustomFieldsData()[2].value);
	});

	it('getValueByAlias should return first occurance if multiple fields with the same alias are found', async () => {
		const CustomFields = require('../../../../src/api/upsales/customFields');
		const upsales = getDefaultUpsales();
		const customFields = new CustomFields({}, { upsales, errorsHelper, logger });

		const foundValue = await customFields.getValueByAlias(getDefaultCustomFieldsData(), 'order', 'ALIAS_3');
		expect(foundValue).toEqual(getDefaultCustomFieldsData()[3].value);
	});

	it('getValueByAlias should return undefined if alias parameter is not specified', async () => {
		const CustomFields = require('../../../../src/api/upsales/customFields');
		const upsales = getDefaultUpsales();
		const customFields = new CustomFields({}, { upsales, errorsHelper, logger });

		const foundValue = await customFields.getValueByAlias(getDefaultCustomFieldsData(), 'order');
		expect(foundValue).toBeUndefined();
	});

	it('getValueByAlias should return undefined if fields parameter is not specified', async () => {
		const CustomFields = require('../../../../src/api/upsales/customFields');
		const upsales = getDefaultUpsales();
		const customFields = new CustomFields({}, { upsales, errorsHelper, logger });

		const foundValue = await customFields.getValueByAlias(null, 'order', 5);
		expect(foundValue).toBeUndefined();
	});

	it('getValueByAlias should return undefined if entityType parameter is not specified', async () => {
		const CustomFields = require('../../../../src/api/upsales/customFields');
		const upsales = getDefaultUpsales();
		const customFields = new CustomFields({}, { upsales, errorsHelper, logger });

		const foundValue = await customFields.getValueByAlias(getDefaultCustomFieldsData(), undefined, 'ALIAS_10');
		expect(foundValue).toBeUndefined();
	});

	it('getValueByAlias should return undefined if upsales object is not specified', async () => {
		const CustomFields = require('../../../../src/api/upsales/customFields');
		const customFields = new CustomFields({}, { errorsHelper, logger });

		const foundValue = await customFields.getValueByAlias(getDefaultCustomFieldsData(), 'order', 'ALIAS_10');
		expect(foundValue).toBeUndefined();
	});

});



describe('src/helpers/customFields.js: setValueById', () => {
	beforeEach(() => {
		jest.resetModules();
	});

	it('setValueById should add new field to an existing custom fields list', () => {
		const CustomFields = require('../../../../src/api/upsales/customFields');
		const customFields = new CustomFields({}, { errorsHelper, logger });
		const alteredObject = customFields.setValueById(getDefaultObject(), 3, 'Test value');
		expect(alteredObject).toEqual({
			id: 1002,
			custom: [
				{ fieldId: 2, value: 'AAA' },
				{ fieldId: 5, value: 100 },
				{ fieldId: 3, value: 'Test value' }
			]
		});
	});

	it('setValueById should alter existing field', () => {
		const CustomFields = require('../../../../src/api/upsales/customFields');
		const customFields = new CustomFields({}, { errorsHelper, logger });
		const alteredObject = customFields.setValueById(getDefaultObject(), 5, 'Test value');
		expect(alteredObject).toEqual({
			id: 1002,
			custom: [
				{ fieldId: 2, value: 'AAA' },
				{ fieldId: 5, value: 'Test value' }
			]
		});
	});

	it('setValueById should add new field even when custom fields array is empty', () => {
		const CustomFields = require('../../../../src/api/upsales/customFields');
		const customFields = new CustomFields({}, { errorsHelper, logger });
		const alteredObject = customFields.setValueById(getObjectWithEmptyCustomFieldsArray(), 3, 'Test value');
		expect(alteredObject).toEqual({
			id: 1002,
			custom: [
				{ fieldId: 3, value: 'Test value' }
			]
		});
	});

	it('setValueById should add new field even when custom fields list is absent', () => {
		const CustomFields = require('../../../../src/api/upsales/customFields');
		const customFields = new CustomFields({}, { errorsHelper, logger });
		const alteredObject = customFields.setValueById(getObjectWithUndefinedCustomFieldsArray(), 3, 'Test value');
		expect(alteredObject).toEqual({
			id: 1002,
			custom: [
				{ fieldId: 3, value: 'Test value' }
			]
		});
	});

});



describe('src/helpers/customFields.js: setValueByAlias', () => {
	beforeEach(() => {
		jest.resetModules();
	});

	it('setValueByAlias should add new field to an existing custom fields list', async () => {
		const CustomFields = require('../../../../src/api/upsales/customFields');
    const upsales = getDefaultUpsales();
		const customFields = new CustomFields({}, { upsales, errorsHelper, logger });

		const alteredObject = await customFields.setValueByAlias(getDefaultObject(), 'order', 'ALIAS_3', 'Test value');
		expect(alteredObject).toEqual({
			id: 1002,
			custom: [
				{ fieldId: 2, value: 'AAA' },
				{ fieldId: 5, value: 100 },
				{ fieldId: 6, value: 'Test value' }
			]
		});
	});

	it('setValueByAlias should alter existing field', async () => {
		const CustomFields = require('../../../../src/api/upsales/customFields');
    const upsales = getDefaultUpsales();
		const customFields = new CustomFields({}, { upsales, errorsHelper, logger });

		const alteredObject = await customFields.setValueByAlias(getDefaultObject(), 'order', 'ALIAS_10', 'Test value');
		expect(alteredObject).toEqual({
			id: 1002,
			custom: [
				{ fieldId: 2, value: 'AAA' },
				{ fieldId: 5, value: 'Test value' }
			]
		});
	});

	it('setValueByAlias should add new field even when custom fields array is empty', async () => {
		const CustomFields = require('../../../../src/api/upsales/customFields');
    const upsales = getDefaultUpsales();
		const customFields = new CustomFields({}, { upsales, errorsHelper, logger });

		const alteredObject = await customFields.setValueByAlias(getObjectWithEmptyCustomFieldsArray(), 'order', 'ALIAS_3', 'Test value');
		expect(alteredObject).toEqual({
			id: 1002,
			custom: [
				{ fieldId: 6, value: 'Test value' }
			]
		});
	});

	it('setValueByAlias should add new field even when custom fields list is absent', async () => {
		const CustomFields = require('../../../../src/api/upsales/customFields');
    const upsales = getDefaultUpsales();
		const customFields = new CustomFields({}, { upsales, errorsHelper, logger });

		const alteredObject = await customFields.setValueByAlias(getObjectWithUndefinedCustomFieldsArray(), 'order', 'ALIAS_3', 'Test value');
		expect(alteredObject).toEqual({
			id: 1002,
			custom: [
				{ fieldId: 6, value: 'Test value' }
			]
		});
	});

});



describe('src/helpers/customFields.js: loadEntityFieldByAlias', () => {
	beforeEach(() => {
		jest.resetModules();
	});

	it('loadEntityFieldByAlias should load custom field by its alias', async () => {
		const CustomFields = require('../../../../src/api/upsales/customFields');
		const upsales = getDefaultUpsales();
		const customFields = new CustomFields({}, { upsales, errorsHelper, logger });

		const foundField = await customFields.metadata.loadEntityFieldByAlias('order', 'ALIAS_10', false);
		expect(foundField).toEqual(getDefaultCustomFieldsMetadata()[2]);
	});

	it('loadEntityFieldByAlias should ignore case of alias parameter', async () => {
		const CustomFields = require('../../../../src/api/upsales/customFields');
		const upsales = getDefaultUpsales();
		const customFields = new CustomFields({}, { upsales, errorsHelper, logger });

		const foundField = await customFields.metadata.loadEntityFieldByAlias('order', 'AlIaS_10', false);
		expect(foundField).toEqual(getDefaultCustomFieldsMetadata()[2]);
	});

	it('loadEntityFieldByAlias should ignore case of alias in fields', async () => {
		const CustomFields = require('../../../../src/api/upsales/customFields');
		const upsales = getDefaultUpsales();
		const customFields = new CustomFields({}, { upsales, errorsHelper, logger });

		const foundField = await customFields.metadata.loadEntityFieldByAlias('order', 'ALIAS_6', false);
		expect(foundField).toEqual(getDefaultCustomFieldsMetadata()[6]);
	});

	it('loadEntityFieldByAlias should ignore fields with absent aliases', async () => {
		const CustomFields = require('../../../../src/api/upsales/customFields');
		const upsales = getDefaultUpsales(getCustomFieldsMetadataWithAbsentAliases);
		const customFields = new CustomFields({}, { upsales, errorsHelper, logger });

		const foundField = await customFields.metadata.loadEntityFieldByAlias('order', 'ALIAS_5', false);
		expect(foundField).toEqual(getDefaultCustomFieldsMetadata()[4]);
	});

	it('loadEntityFieldByAlias should ignore fields with not string aliases', async () => {
		const CustomFields = require('../../../../src/api/upsales/customFields');
		const upsales = getDefaultUpsales(getCustomFieldsMetadataWithNotStringAliases);
		const customFields = new CustomFields({}, { upsales, errorsHelper, logger });

		const foundField = await customFields.metadata.loadEntityFieldByAlias('order', 'ALIAS_5', false);
		expect(foundField).toEqual(getDefaultCustomFieldsMetadata()[4]);
	});

	it('loadEntityFieldByAlias should return undefined if field not found', async () => {
		const CustomFields = require('../../../../src/api/upsales/customFields');
		const upsales = getDefaultUpsales();
		const customFields = new CustomFields({}, { upsales, errorsHelper, logger });

		const foundField = await customFields.metadata.loadEntityFieldByAlias('order', 'MISSING_FIELD', false);
		expect(foundField).toBeUndefined();
	});

	it('loadEntityFieldByAlias should return undefined if upsales object is not passed', async () => {
		const CustomFields = require('../../../../src/api/upsales/customFields');
		const customFields = new CustomFields({}, { errorsHelper, logger });

		const foundField = await customFields.metadata.loadEntityFieldByAlias('order', 'ALIAS_5', false);
		expect(foundField).toBeUndefined();
	});

	it('loadEntityFieldByAlias should return undefined if alias parameter is not specified', async () => {
		const CustomFields = require('../../../../src/api/upsales/customFields');
		const customFields = new CustomFields({}, { errorsHelper, logger });

		const foundField = await customFields.metadata.loadEntityFieldByAlias('order');
		expect(foundField).toBeUndefined();
	});

	it('loadEntityFieldByAlias should return undefined if alias parameter is not string', async () => {
		const CustomFields = require('../../../../src/api/upsales/customFields');
		const customFields = new CustomFields({}, { errorsHelper, logger });

		const foundField = await customFields.metadata.loadEntityFieldByAlias('order', 5, false);
		expect(foundField).toBeUndefined();
	});

	it('loadEntityFieldByAlias should use cached value when acquiring same field', async () => {
		const CustomFields = require('../../../../src/api/upsales/customFields');
		const upsales = getTwoStagedUpsales(undefined, getAlteredCustomFieldsMetadata);
		const customFields = new CustomFields({}, { upsales, errorsHelper, logger });

		const firstField = await customFields.metadata.loadEntityFieldByAlias('order', 'ALIAS_5', true);
		const secondField = await customFields.metadata.loadEntityFieldByAlias('order', 'ALIAS_5', true);
		expect(secondField).toEqual(getDefaultCustomFieldsMetadata()[4]);
	});

	it('loadEntityFieldByAlias should use cached list when acquiring another field', async () => {
		const CustomFields = require('../../../../src/api/upsales/customFields');
		const upsales = getTwoStagedUpsales(undefined, getAlteredCustomFieldsMetadata);
		const customFields = new CustomFields({}, { upsales, errorsHelper, logger });

		const firstField = await customFields.metadata.loadEntityFieldByAlias('order', 'ALIAS_5', true);
		const secondField = await customFields.metadata.loadEntityFieldByAlias('order', 'ALIAS_10', true);
		expect(secondField).toEqual(getDefaultCustomFieldsMetadata()[2]);
	});

	it('loadEntityFieldByAlias should not access Upsales object second time when acquiring same field using cache', async () => {
		const CustomFields = require('../../../../src/api/upsales/customFields');
		const upsales = getDefaultUpsales();
		const customFields = new CustomFields({}, { upsales, errorsHelper, logger });

		const firstField = await customFields.metadata.loadEntityFieldByAlias('order', 'ALIAS_5', true);
		const firstCalls = upsales.order.customfields.list.mock.calls.length;
		const secondField = await customFields.metadata.loadEntityFieldByAlias('order', 'ALIAS_5', true);
		const secondCalls = upsales.order.customfields.list.mock.calls.length;
		expect(secondCalls).toEqual(firstCalls);
		expect(secondField).toEqual(getDefaultCustomFieldsMetadata()[4]);
	});

	it('loadEntityFieldByAlias should not access Upsales object second time when using cache', async () => {
		const CustomFields = require('../../../../src/api/upsales/customFields');
		const upsales = getDefaultUpsales();
		const customFields = new CustomFields({}, { upsales, errorsHelper, logger });

		const firstField = await customFields.metadata.loadEntityFieldByAlias('order', 'ALIAS_5', true);
		const firstCalls = upsales.order.customfields.list.mock.calls.length;
		const secondField = await customFields.metadata.loadEntityFieldByAlias('order', 'ALIAS_10', true);
		const secondCalls = upsales.order.customfields.list.mock.calls.length;
		expect(secondCalls).toEqual(firstCalls);
		expect(secondField).toEqual(getDefaultCustomFieldsMetadata()[2]);
	});

	it('loadEntityFieldByAlias should find new field that is absent in cache', async () => {
		const CustomFields = require('../../../../src/api/upsales/customFields');
		const upsales = getTwoStagedUpsales(undefined, getAlteredCustomFieldsMetadata);
		const customFields = new CustomFields({}, { upsales, errorsHelper, logger });

		const firstField = await customFields.metadata.loadEntityFieldByAlias('order', 'ALIAS_5', true);
		const secondField = await customFields.metadata.loadEntityFieldByAlias('order', 'ALIAS_7', true);
		expect(secondField).toEqual(getAlteredCustomFieldsMetadata()[7]);
	});

	it('loadEntityFieldByAlias should find field in cache that is absent in Upsales', async () => {
		const CustomFields = require('../../../../src/api/upsales/customFields');
		const upsales = getTwoStagedUpsales(getAlteredCustomFieldsMetadata);
		const customFields = new CustomFields({}, { upsales, errorsHelper, logger });

		const firstField = await customFields.metadata.loadEntityFieldByAlias('order', 'ALIAS_5', true);
		const secondField = await customFields.metadata.loadEntityFieldByAlias('order', 'ALIAS_7', true);
		expect(secondField).toEqual(getAlteredCustomFieldsMetadata()[7]);
	});

	it('loadEntityFieldByAlias should not use cached value if caching is switched off', async () => {
		const CustomFields = require('../../../../src/api/upsales/customFields');
		const upsales = getTwoStagedUpsales(undefined, getAlteredCustomFieldsMetadata);
		const customFields = new CustomFields({}, { upsales, errorsHelper, logger });

		const firstField = await customFields.metadata.loadEntityFieldByAlias('order', 'ALIAS_5', true);
		const secondField = await customFields.metadata.loadEntityFieldByAlias('order', 'ALIAS_5', false);
		expect(secondField).toEqual(getAlteredCustomFieldsMetadata()[4]);
	});

	it('loadEntityFieldByAlias should not cache values if caching is switched off', async () => {
		const CustomFields = require('../../../../src/api/upsales/customFields');
		const upsales = getTwoStagedUpsales(undefined, getAlteredCustomFieldsMetadata);
		const customFields = new CustomFields({}, { upsales, errorsHelper, logger });

		const firstField = await customFields.metadata.loadEntityFieldByAlias('order', 'ALIAS_5', false);
		const secondField = await customFields.metadata.loadEntityFieldByAlias('order', 'ALIAS_5', true);
		expect(secondField).toEqual(getAlteredCustomFieldsMetadata()[4]);
	});

});



describe('src/helpers/customFields.js: loadEntityFields', () => {
	beforeEach(() => {
		jest.resetModules();
	});

	it('loadEntityFields should return all custom fields', async () => {
		const CustomFields = require('../../../../src/api/upsales/customFields');
		const upsales = getDefaultUpsales();
		const customFields = new CustomFields({}, { upsales, errorsHelper, logger });

		const fieldsMap = await customFields.metadata.loadEntityFields('order', true);
		expect(fieldsMap).toEqual(getDefaultCustomFieldsMetadata());
	});

	it('loadEntityFields should return all custom fields with upper-case aliases', async () => {
		const CustomFields = require('../../../../src/api/upsales/customFields');
		const upsales = getDefaultUpsales(getVariousCaseCustomFieldsMetadata);
		const customFields = new CustomFields({}, { upsales, errorsHelper, logger });

		const fieldsMap = await customFields.metadata.loadEntityFields('order', true);
		expect(fieldsMap).toEqual(getVariousCaseCustomFieldsMetadata());
	});

	it('loadEntityFields should return empty Object when no entityType is passed', async () => {
		const CustomFields = require('../../../../src/api/upsales/customFields');
		const upsales = getDefaultUpsales();
		const customFields = new CustomFields({}, { upsales, errorsHelper, logger });

		const fieldsMap = await customFields.metadata.loadEntityFields();
		expect(fieldsMap).toEqual({});
	});

	it('loadEntityFields should return empty Object when no Upsales object is passed', async () => {
		const CustomFields = require('../../../../src/api/upsales/customFields');
		const customFields = new CustomFields({}, { errorsHelper, logger });

		const fieldsMap = await customFields.metadata.loadEntityFields('order', true);
		expect(fieldsMap).toEqual({});
	});

	it('loadEntityFields should use cache', async () => {
		const CustomFields = require('../../../../src/api/upsales/customFields');
		const upsales = getTwoStagedUpsales(undefined, getAlteredCustomFieldsMetadata);
		const customFields = new CustomFields({}, { upsales, errorsHelper, logger });

		const fieldsMapFirst = await customFields.metadata.loadEntityFields('order', true);
		const fieldsMapSecond = await customFields.metadata.loadEntityFields('order', true);
		expect(fieldsMapSecond).toEqual(getDefaultCustomFieldsMetadata());
	});

	it('loadEntityFields should not access Upsales object second time when using cache', async () => {
		const CustomFields = require('../../../../src/api/upsales/customFields');
		const upsales = getDefaultUpsales();
		const customFields = new CustomFields({}, { upsales, errorsHelper, logger });

		const fieldsMapFirst = await customFields.metadata.loadEntityFields('order', true);
		const firstCalls = upsales.order.customfields.list.mock.calls.length;
		const fieldsMapSecond = await customFields.metadata.loadEntityFields('order', true);
		const secondCalls = upsales.order.customfields.list.mock.calls.length;
		expect(secondCalls).toEqual(firstCalls);
		expect(fieldsMapSecond).toEqual(getDefaultCustomFieldsMetadata());
	});

	it('loadEntityFields should not use cache if caching is switched off', async () => {
		const CustomFields = require('../../../../src/api/upsales/customFields');
		const upsales = getTwoStagedUpsales(undefined, getAlteredCustomFieldsMetadata);
		const customFields = new CustomFields({}, { upsales, errorsHelper, logger });

		const fieldsMapFirst = await customFields.metadata.loadEntityFields('order', true);
		const fieldsMapSecond = await customFields.metadata.loadEntityFields('order', false);
		expect(fieldsMapSecond).toEqual(getAlteredCustomFieldsMetadata());
	});

	it('loadEntityFields should not cache data if caching is switched off', async () => {
		const CustomFields = require('../../../../src/api/upsales/customFields');
		const upsales = getTwoStagedUpsales(undefined, getAlteredCustomFieldsMetadata);
		const customFields = new CustomFields({}, { upsales, errorsHelper, logger });

		const fieldsMapFirst = await customFields.metadata.loadEntityFields('order', false);
		const fieldsMapSecond = await customFields.metadata.loadEntityFields('order', true);
		expect(fieldsMapSecond).toEqual(getAlteredCustomFieldsMetadata());
	});

});


const getDefaultFieldsList = () => {
	return [
		{
			entityType: 'order',
			fieldDescription: {
				alias: 'ALIAS_3',
				name: 'field 3'
			},
			comment: 'Order field #3'
		},
		{
			entityType: 'order',
			fieldDescription: {
				alias: 'ALIAS_5',
				name: 'field 5'
			},
			comment: 'Order field #5'
		},
		{
			entityType: 'account',
			fieldDescription: {
				alias: 'ALIAS_10',
				name: 'field 10'
			},
			comment: 'Account field #10'
		}
	];
};

const getDefaultFieldsResult = () => {
	return [
		{	isNew: false, field: { id: 6, alias: 'ALIAS_3' }	},
		{	isNew: false, field: { id: 1001, alias: 'ALIAS_5' }	},
		{	isNew: false, field: { id: 5, alias: 'ALIAS_10' }	}
	];
};

const getMissingFieldsList = () => {
	return [
		{
			entityType: 'order',
			fieldDescription: {
				alias: 'ALIAS_3',
				name: 'field 3'
			},
			comment: 'Order field #3'
		},
		{
			entityType: 'order',
			fieldDescription: {
				alias: 'ALIAS_5',
				name: 'field 5'
			},
			comment: 'Order field #5'
		},
		{
			entityType: 'account',
			fieldDescription: {
				alias: 'ALIAS_15',
				name: 'field 15'
			},
			comment: 'Order field #15'
		},
		{
			entityType: 'account',
			fieldDescription: {
				alias: 'ALIAS_10',
				name: 'field 10'
			},
			comment: 'Account field #10'
		},
		{
			entityType: 'order',
			fieldDescription: {
				alias: 'ALIAS_17',
				name: 'field 17'
			},
			comment: 'Order field #17'
		}
	];
};

const getMissingFieldsResult = () => {
	return [
		{"field": {"alias": "ALIAS_3", "id": 6}, "isNew": false},
		{"field": {"alias": "ALIAS_5", "id": 1001}, "isNew": false},
		{"field": {"alias": "ALIAS_15", "id": 1, "name": "field 15"}, "isNew": true},
		{"field": {"alias": "ALIAS_10", "id": 5}, "isNew": false},
		{"field": {"alias": "ALIAS_17", "id": 1, "name": "field 17"}, "isNew": true}
	];
};

const getMissingFieldsOrderCreation = () => {
	return [[{"alias":"ALIAS_17","name":"field 17","id":1}]];
};

const getMissingFieldsAccountCreationCalls = () => {
	return [[{"alias":"ALIAS_15","name":"field 15","id":1}]];
};

const getCaseInsensitiveAliasFieldsList = () => {
	return [
		{
			entityType: 'order',
			fieldDescription: {
				alias: 'ALIAS_3',
				name: 'field 3'
			},
			comment: 'Order field #3'
		},
		{
			entityType: 'order',
			fieldDescription: {
				alias: 'ALIAS_5',
				name: 'field 5'
			},
			comment: 'Order field #5'
		},
		{
			entityType: 'account',
			fieldDescription: {
				alias: 'ALIAS_6',
				name: 'field 6'
			},
			comment: 'Account field #6'
		}
	];
};

const getCaseInsensitiveAliasFieldsResult = () => {
	return [
		{	isNew: false, field: { id: 6, alias: 'ALIAS_3' }	},
		{	isNew: false, field: { id: 1001, alias: 'ALIAS_5' }	},
		{	isNew: false, field: { id: 1005, alias: 'AlIaS_6' }	}
	];
};

const getKeepCaseOfAliasOnCreationFieldsList = () => {
	return [
		{
			entityType: 'order',
			fieldDescription: {
				alias: 'ALIAS_3',
				name: 'field 3'
			},
			comment: 'Order field #3'
		},
		{
			entityType: 'order',
			fieldDescription: {
				alias: 'ALIAS_5',
				name: 'field 5'
			},
			comment: 'Order field #5'
		},
		{
			entityType: 'account',
			fieldDescription: {
				alias: 'AlIaS_15',
				name: 'field 15'
			},
			comment: 'Order field #15'
		},
		{
			entityType: 'account',
			fieldDescription: {
				alias: 'ALIAS_10',
				name: 'field 10'
			},
			comment: 'Account field #10'
		},
		{
			entityType: 'order',
			fieldDescription: {
				alias: 'AlIaS_17',
				name: 'field 17'
			},
			comment: 'Order field #17'
		}
	];
};

const getKeepCaseOfAliasOnCreationFieldsResult = () => {
	return [
		{"field": {"alias": "ALIAS_3", "id": 6}, "isNew": false},
		{"field": {"alias": "ALIAS_5", "id": 1001}, "isNew": false},
		{"field": {"alias": "AlIaS_15", "id": 1, "name": "field 15"}, "isNew": true},
		{"field": {"alias": "ALIAS_10", "id": 5}, "isNew": false},
		{"field": {"alias": "AlIaS_17", "id": 1, "name": "field 17"}, "isNew": true}
	];
};

const getKeepCaseOfAliasOnCreationFieldsOrderCreation = () => {
	return [[{"alias":"AlIaS_17","name":"field 17","id":1}]];
};

const getKeepCaseOfAliasOnCreationFieldsAccountCreationCalls = () => {
	return [[{"alias":"AlIaS_15","name":"field 15","id":1}]];
};

const getIgnoreAbsentFieldDescriptionFieldsList = () => {
	return [
		{
			entityType: 'order',
			comment: 'Order field #3'
		},
		{
			entityType: 'order',
			fieldDescription: {
				alias: 'ALIAS_5',
				name: 'field 5'
			},
			comment: 'Order field #5'
		},
		{
			entityType: 'account',
			comment: 'Order field #15'
		},
		{
			entityType: 'account',
			fieldDescription: {
				alias: 'ALIAS_10',
				name: 'field 10'
			},
			comment: 'Account field #10'
		},
		{
			entityType: 'order',
			fieldDescription: {
				alias: 'ALIAS_17',
				name: 'field 17'
			},
			comment: 'Order field #17'
		}
	];
};

const getIgnoreAbsentFieldDescriptionFieldsResult = () => {
	return [
		{"field": {"alias": "ALIAS_5", "id": 1001}, "isNew": false},
		{"field": {"alias": "ALIAS_10", "id": 5}, "isNew": false},
		{"field": {"alias": "ALIAS_17", "id": 1, "name": "field 17"}, "isNew": true}
	];
};

const getIgnoreAbsentFieldDescriptionFieldsOrderCreation = () => {
	return [[{"alias":"ALIAS_17","name":"field 17","id":1}]];
};

const getIgnoreAbsentFieldDescriptionFieldsAccountCreationCalls = () => {
	return [];
};

const getIgnoreAbsentEntityTypeFieldsList = () => {
	return [
		{
			fieldDescription: {
				alias: 'ALIAS_3',
				name: 'field 3'
			},
			comment: 'Order field #3'
		},
		{
			entityType: 'order',
			fieldDescription: {
				alias: 'ALIAS_5',
				name: 'field 5'
			},
			comment: 'Order field #5'
		},
		{
			entityType: 'account',
			fieldDescription: {
				alias: 'ALIAS_15',
				name: 'field 15'
			},
			comment: 'Order field #15'
		},
		{
			entityType: 'account',
			fieldDescription: {
				alias: 'ALIAS_10',
				name: 'field 10'
			},
			comment: 'Account field #10'
		},
		{
			fieldDescription: {
				alias: 'ALIAS_17',
				name: 'field 17'
			},
			comment: 'Order field #17'
		}
	];
};

const getIgnoreAbsentEntityTypeFieldsResult = () => {
	return [
		{"field": {"alias": "ALIAS_5", "id": 1001}, "isNew": false},
		{"field": {"alias": "ALIAS_15", "id": 1, "name": "field 15"}, "isNew": true},
		{"field": {"alias": "ALIAS_10", "id": 5}, "isNew": false},
	];
};

const getIgnoreAbsentEntityTypeFieldsOrderCreation = () => {
	return [];
};

const getIgnoreAbsentEntityTypeFieldsAccountCreationCalls = () => {
	return [[{"alias":"ALIAS_15","name":"field 15","id":1}]];
};


describe('src/helpers/customFields.js: ensureFieldsExist', () => {
	beforeEach(() => {
		jest.resetModules();
	});

	it('ensureFieldsExist should find several existing fields for different entities', async () => {
		const CustomFields = require('../../../../src/api/upsales/customFields');
		const upsales = getDefaultUpsales();
		const customFields = new CustomFields({}, { upsales, errorsHelper, logger });

		const result = await customFields.metadata.ensureFieldsExist(getDefaultFieldsList(), true);
		expect(result).toEqual(getDefaultFieldsResult());
	});

	it('ensureFieldsExist should not create new field if existing is found (several fields for different entities)', async () => {
		const CustomFields = require('../../../../src/api/upsales/customFields');
		const upsales = getDefaultUpsales();
		const customFields = new CustomFields({}, { upsales, errorsHelper, logger });

		const result = await customFields.metadata.ensureFieldsExist(getDefaultFieldsList(), true);
		expect(upsales.order.customfields.create.mock.calls.length).toEqual(0);
		expect(upsales.account.customfields.create.mock.calls.length).toEqual(0);
	});

	it('ensureFieldsExist should create several missing fields for different entities', async () => {
		const CustomFields = require('../../../../src/api/upsales/customFields');
		const upsales = getDefaultUpsales();
		const customFields = new CustomFields({}, { upsales, errorsHelper, logger });

		const result = await customFields.metadata.ensureFieldsExist(getMissingFieldsList(), true);
		expect(result).toEqual(getMissingFieldsResult());
		expect(upsales.order.customfields.create.mock.calls).toEqual(getMissingFieldsOrderCreation());
		expect(upsales.account.customfields.create.mock.calls).toEqual(getMissingFieldsAccountCreationCalls());
	});

	it('ensureFieldsExist should find several existing fields (alias case insensitive) for different entities', async () => {
		const CustomFields = require('../../../../src/api/upsales/customFields');
		const upsales = getDefaultUpsales();
		const customFields = new CustomFields({}, { upsales, errorsHelper, logger });

		const result = await customFields.metadata.ensureFieldsExist(getCaseInsensitiveAliasFieldsList(), true);
		expect(result).toEqual(getCaseInsensitiveAliasFieldsResult());
		expect(upsales.order.customfields.create.mock.calls.length).toEqual(0);
		expect(upsales.account.customfields.create.mock.calls.length).toEqual(0);
	});

	it('ensureFieldsExist should keep alias case when creating fields', async () => {
		const CustomFields = require('../../../../src/api/upsales/customFields');
		const upsales = getDefaultUpsales();
		const customFields = new CustomFields({}, { upsales, errorsHelper, logger });

		const result = await customFields.metadata.ensureFieldsExist(getKeepCaseOfAliasOnCreationFieldsList(), true);
		expect(result).toEqual(getKeepCaseOfAliasOnCreationFieldsResult());
		expect(upsales.order.customfields.create.mock.calls).toEqual(getKeepCaseOfAliasOnCreationFieldsOrderCreation());
		expect(upsales.account.customfields.create.mock.calls).toEqual(getKeepCaseOfAliasOnCreationFieldsAccountCreationCalls());
	});

	it('ensureFieldsExist should safely ignore absent field desсription', async () => {
		const CustomFields = require('../../../../src/api/upsales/customFields');
		const upsales = getDefaultUpsales();
		const customFields = new CustomFields({}, { upsales, errorsHelper, logger });

		const result = await customFields.metadata.ensureFieldsExist(getIgnoreAbsentFieldDescriptionFieldsList(), true);
		expect(result).toEqual(getIgnoreAbsentFieldDescriptionFieldsResult());
		expect(upsales.order.customfields.create.mock.calls).toEqual(getIgnoreAbsentFieldDescriptionFieldsOrderCreation());
		expect(upsales.account.customfields.create.mock.calls).toEqual(getIgnoreAbsentFieldDescriptionFieldsAccountCreationCalls());
	});

	it('ensureFieldsExist should safely ignore absent entity type', async () => {
		const CustomFields = require('../../../../src/api/upsales/customFields');
		const upsales = getDefaultUpsales();
		const customFields = new CustomFields({}, { upsales, errorsHelper, logger });

		const result = await customFields.metadata.ensureFieldsExist(getIgnoreAbsentEntityTypeFieldsList(), true);
		expect(result).toEqual(getIgnoreAbsentEntityTypeFieldsResult());
		expect(upsales.order.customfields.create.mock.calls).toEqual(getIgnoreAbsentEntityTypeFieldsOrderCreation());
		expect(upsales.account.customfields.create.mock.calls).toEqual(getIgnoreAbsentEntityTypeFieldsAccountCreationCalls());
	});

	it('ensureFieldsExist should safely ignore absent Upsales object', async () => {
		const CustomFields = require('../../../../src/api/upsales/customFields');
		const customFields = new CustomFields({}, { errorsHelper, logger });

		const result = await customFields.metadata.ensureFieldsExist(getMissingFieldsList(), true);
		expect(result).toEqual([]);
	});

	it('ensureFieldsExist should support passing and returning one object instead of custom fields list', async () => {
		const CustomFields = require('../../../../src/api/upsales/customFields');
		const upsales = getDefaultUpsales();
		const customFields = new CustomFields({}, { upsales, errorsHelper, logger });

		const result = await customFields.metadata.ensureFieldsExist(getDefaultFieldsList()[0], true);
		expect(result).toEqual(getDefaultFieldsResult()[0]);
	});
/*

	it('ensureFieldsExist should use cache if caching is switched on', async () => {
	});

	it('ensureFieldsExist should not use cached value if caching is switched off', async () => {
	});

	it('ensureFieldsExist should not cache data if caching is switched off', async () => {
	});
*/

/*
	it('ensureFieldsExist should use cache', async () => {
		const CustomFields = require('../../../../src/api/upsales/customFields');
		const upsales = getTwoStagedUpsales(getAlteredCustomFieldsMetadata);
		const customFields = new CustomFields({}, { upsales, errorsHelper, logger });

		const fieldDescription = {
			alias: 'ALIAS_7',
			name: 'new field'
		};
		const firstField = await customFields.metadata.ensureFieldsExist([{entityType: 'order', fieldDescription}], true);
		const secondField = await customFields.metadata.ensureFieldsExist([{entityType: 'order', fieldDescription}], true);
		expect(secondField).toEqual({
			field: {
				id: 1100,
				alias: 'ALIAS_7'
			},
			isNew: false
		});
	});

	it('ensureFieldsExist should not use cached value if caching is switched off', async () => {
		const CustomFields = require('../../../../src/api/upsales/customFields');
		const upsales = getTwoStagedUpsales(getAlteredCustomFieldsMetadata);
		const customFields = new CustomFields({}, { upsales, errorsHelper, logger });

		const fieldDescription = {
			alias: 'ALIAS_7',
			name: 'new field'
		};
		const firstField = await customFields.metadata.ensureFieldsExist([{entityType: 'order', fieldDescription}], true);
		const secondField = await customFields.metadata.ensureFieldsExist([{entityType: 'order', fieldDescription}], false);
		const secondCalls = upsales.order.customfields.create.mock.calls.length;
		expect(secondCalls).toBe(1);
		expect(secondField).toEqual({
			field: {
				id: 1,
				alias: 'ALIAS_7',
				name: 'new field'
			},
			isNew: true
		});
	});

	it('ensureFieldsExist should not cache data if caching is switched off', async () => {
		const CustomFields = require('../../../../src/api/upsales/customFields');
		const upsales = getTwoStagedUpsales(getAlteredCustomFieldsMetadata);
		const customFields = new CustomFields({}, { upsales, errorsHelper, logger });

		const fieldDescription = {
			alias: 'ALIAS_7',
			name: 'new field'
		};
		const firstField = await customFields.metadata.ensureFieldsExist([{entityType: 'order', fieldDescription}], false);
		const secondField = await customFields.metadata.ensureFieldsExist([{entityType: 'order', fieldDescription}], true);
		const secondCalls = upsales.order.customfields.create.mock.calls.length;
		expect(secondCalls).toBe(1);
		expect(secondField).toEqual({
			field: {
				id: 1,
				alias: 'ALIAS_7',
				name: 'new field'
			},
			isNew: true
		});
	});
*/
});


describe('src/helpers/customFields.js: clearCache', () => {
	beforeEach(() => {
		jest.resetModules();
	});

	
});
