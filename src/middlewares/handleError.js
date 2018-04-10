const logger = require('../helpers/log');

module.exports = (err, req, res, next) => {
	logger.error(err);
	res
		.status(err.statusCode || 500)
		.json({error: !err.expose ? 'Error' : err.message});
	next();
};