const { BadRequest } = require('http-errors');
const logger = require('../helpers/log');

module.exports = async ({body}) => {
	try {
		if(!body.data || !body.data.object) {
			throw new BadRequest('Missing order'); // This is bad
		}

		const order = body.data.object;
		logger.info(order);

	} catch (err) {
		throw err;
	}
};