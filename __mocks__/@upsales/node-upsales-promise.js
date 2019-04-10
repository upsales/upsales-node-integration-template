const ActualUpsales = require.requireActual('@upsales/node-upsales-promise');
const Upsales = jest.genMockFromModule('@upsales/node-upsales-promise');
const actualUpsales = new ActualUpsales({key: 'key'});

const instance = {};

Object.getOwnPropertyNames(actualUpsales).forEach(propName => {
	if(actualUpsales[propName] === null || typeof actualUpsales[propName] !== 'object' || !Object.getPrototypeOf(actualUpsales[propName])){
		return;
	}

	instance[propName] = {};

	if(propName === 'methods'){
		Object.keys(actualUpsales[propName]).forEach((fnName) => {
			if(typeof actualUpsales[propName][fnName] !== 'function'){
				return;
			}

			instance[propName][fnName] = jest.fn(function() {
				arguments[Object.keys(arguments).length - 1](null);
			});
		});
	}else{
		var prototype = Object.getPrototypeOf(actualUpsales[propName]);
		Object.getOwnPropertyNames(prototype).forEach(fnName => {
			if(typeof prototype[fnName] !== 'function'){
				return;
			}

			instance[propName][fnName] = jest.fn(function() {
				arguments[Object.keys(arguments).length - 1](null);
			});
		});
	}
});

Upsales.mockImplementation(() => {
	return instance;
});

Upsales._instance = instance;

module.exports = Upsales;