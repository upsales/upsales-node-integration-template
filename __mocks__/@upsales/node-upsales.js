let failNext = false;
let nextError = false;
let returnNext = null;

const Upsales = jest.fn(function() {
	this.client = {
		get: jest.fn((id, cb) => {
			let err = null;
			if(failNext) {
				err = nextError;
			}
			cb(err, {data: returnNext});
			returnNext = null;
			failNext = false;
			nextError = null;
		})
	};
});

Upsales.prototype.__failNext = err => {
	failNext = true;
	nextError = err;
};

Upsales.prototype.__returnNext = data => {
	returnNext = data;
};

module.exports = Upsales;