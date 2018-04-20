const router = require('express').Router();
const validateOrder = require('../controllers/validateOrder');
const asyncResponse = require('../helpers/asyncResponse');

router.post('/', ({body}, res, next) => asyncResponse(res, next, validateOrder(body)));

module.exports = router;
