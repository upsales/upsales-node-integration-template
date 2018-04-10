const log = require('../helpers/log');

const printLog = (req, res, time) => {
	const {method, originalUrl, query, correlationId} = req;
	const ip = req.headers['x-real-ip'] || req.connection.remoteAddress;

	let meta = {
		method,
		originalUrl,
		ip,
		correlationId,
		query
	};

	if(time !== undefined){
		meta.finished = true;
		meta.time = time;
		meta.statusCode = res.statusCode;
	}
	
	log.info(`${method} ${originalUrl}`,meta);
};

const monitor = (req, res, next) => {
	const startTime = Date.now();
	printLog(req);

	res.on('finish', () => {
		printLog(req, res, Date.now() - startTime);
	});

	next();
};

module.exports = monitor;
