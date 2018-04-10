const uuidv4 = require('uuid/v4');

const correlation = (req, res, next) => {
	const correlationId = uuidv4();
	req.correlationId = correlationId;
	res.set('x-correlation-id', correlationId);
	next();
};

module.exports = correlation;