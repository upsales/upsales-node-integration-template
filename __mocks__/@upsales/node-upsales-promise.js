const ActualUpsales = require.requireActual('@upsales/node-upsales-promise');
const Upsales = jest.genMockFromModule('@upsales/node-upsales-promise');

const actualUpsales = new ActualUpsales({key: 'key'});
const instance = {};

const bindJestFn = (propName, prototype, customfield) => {
	Object.getOwnPropertyNames(prototype).forEach(fnName => {
		if (typeof prototype[fnName] !== 'function') return;
		if (customfield) {
			instance[propName].customfields[fnName] = jest.fn(() => Promise.resolve());
		} else {
			instance[propName][fnName] = jest.fn(() => Promise.resolve());
		}
	});
};

Object.getOwnPropertyNames(actualUpsales).forEach(propName => {
	if (
		actualUpsales[propName] &&
		typeof actualUpsales[propName] === 'object' &&
		Object.getPrototypeOf(actualUpsales[propName])
	) {
		instance[propName] = {};
		bindJestFn(propName, Object.getPrototypeOf(actualUpsales[propName]));

		if (actualUpsales[propName].customfields) {
			instance[propName].customfields = {};
			bindJestFn(propName, Object.getPrototypeOf(actualUpsales[propName].customfields), true);
		}
	}
});

Upsales.mockImplementation(() => instance);
Upsales._instance = instance;

module.exports = Upsales;