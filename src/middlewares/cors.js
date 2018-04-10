module.exports = (req, res, next) => {
	if(process.env.NODE_ENV !== 'production') {
		res.header('Access-Control-Allow-Origin', '*');
	} else {
		res.header('Access-Control-Allow-Origin', req.headers.origin);
	}

	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	res.header('Access-Control-Allow-Headers','Content-Type, X-Requested-With, Accept');

	if(req.method === 'OPTIONS') {
		return res.sendStatus(200);
	}

	next();
};