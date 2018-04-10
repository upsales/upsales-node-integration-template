exports = module.exports = () => {
	return {
		use: jest.fn(),
		listen: jest.fn()
	};
};

exports.json = jest.fn();

exports.static = jest.fn();

const runners = {};

const routerFn = type => jest.fn((path, cb) => {
	runners[type] = cb;
});

const res = exports._res = {
	redirect: jest.fn(),
	sendStatus: jest.fn(),
	send: jest.fn()
};

const router = {
	use: jest.fn(),
	post: routerFn('post'),
	get: routerFn('get'),
	put: routerFn('put'),
	all: routerFn('post'),
	delete: routerFn('delete'),
	__runner: async (type, data = {}, params = {}) => {
		runners[type]({
			params: params,
			body: data
		}, res, jest.fn());
	}
};
exports.Router = () => router;