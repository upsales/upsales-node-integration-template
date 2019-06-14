const router = require('express').Router();
const orderTrigger = require('../controllers/orderTrigger');
const logger = require('../helpers/log');

const isApiUser = req => req.body && req.body.user && req.body.user.name === '';

router.post('/orderinsert/:id', async (req, res) => {

	if(isApiUser(req)){
		logger.info('Not scheduling message from API-user');
		logger.info(req.body.user);
		return res.sendStatus(200);
	}

	try {
		await orderTrigger(req);
		return res.sendStatus(200);
	} catch(err) {
		logger.error('Error', err);
		return res.sendStatus(500);
	}
});

router.post('/orderupdate/:id', async (req, res) => {

	if(isApiUser(req)){
		logger.info('Not scheduling message from API-user');
		logger.info(req.body.user);
		return res.sendStatus(200);
	}

	try {
		await orderTrigger(req);
		return res.sendStatus(200);
	} catch(err) {
		logger.error('Error', err);
		return res.sendStatus(500);
	}
});

module.exports = router;