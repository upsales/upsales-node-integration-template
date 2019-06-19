describe('helpers/entityHasChanged', () => {
	it('Should return false if there is no newEntity', () => {
		const entityHasChanged = require('../../../src/helpers/entityHasChanged');
		expect(entityHasChanged({oldEntity: {id: 1}})).toBe(false);
	});

	it('Should return true if there is no oldEntity', () => {
		const entityHasChanged = require('../../../src/helpers/entityHasChanged');
		expect(entityHasChanged({newEntity: {id: 1}})).toBe(true);
	});

	it('Should return true if newEntity has changed props', () => {
		const entityHasChanged = require('../../../src/helpers/entityHasChanged');
		expect(entityHasChanged({newEntity: {id: 1, name: 'Hejoch hå'}, oldEntity: {id: 1, name: 'Update'}})).toBe(true);
	});

	it('Should not crash if a key is undefined', () => {
		const entityHasChanged = require('../../../src/helpers/entityHasChanged');
		expect(entityHasChanged({newEntity: {id: 1, name: undefined}, oldEntity: {id: 1, name: 'Update', lol: undefined}})).toBe(true);
	});

	it('Should not update if key is number and oldEntity has id field', () => {
		const entityHasChanged = require('../../../src/helpers/entityHasChanged');
		expect(entityHasChanged({newEntity: {id: 1, user: 1}, oldEntity: {id: 1, user: {id: 1}}})).toBe(false);
	});

	it('Should not update if key is number and newEntity has id field', () => {
		const entityHasChanged = require('../../../src/helpers/entityHasChanged');
		expect(entityHasChanged({newEntity: {id: 1, user: {id: 1}}, oldEntity: {id: 1, user: 1}})).toBe(false);
	});

	it('Should compare nested fields that are not ID fields', () => {
		const entityHasChanged = require('../../../src/helpers/entityHasChanged');
		expect(entityHasChanged({newEntity: {id: 1, field: {value: 1}}, oldEntity: {id: 1, field: {value: 2}}})).toBe(true);
	});

	it('Should assume that 1 and true are the same', () => {
		const entityHasChanged = require('../../../src/helpers/entityHasChanged');
		expect(entityHasChanged({newEntity: {id: 1, field: true}, oldEntity: {id: 1, field: 1}})).toBe(false);
	});

	it('Should assume that 0 and false are the same', () => {
		const entityHasChanged = require('../../../src/helpers/entityHasChanged');
		expect(entityHasChanged({newEntity: {id: 1, field: false}, oldEntity: {id: 1, field: 0}})).toBe(false);
	});

	it('Should assume that 0 and false are the same (flipped)', () => {
		const entityHasChanged = require('../../../src/helpers/entityHasChanged');
		expect(entityHasChanged({newEntity: {id: 1, field: 0}, oldEntity: {id: 1, field: false}})).toBe(false);
	});

	it('Should assume that 0 and true are the different', () => {
		const entityHasChanged = require('../../../src/helpers/entityHasChanged');
		expect(entityHasChanged({newEntity: {id: 1, field: true}, oldEntity: {id: 1, field: 0}})).toBe(true);
	});
});