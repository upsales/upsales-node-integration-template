const router = require('express').Router();
const asyncResponse = require('../helpers/asyncResponse');
const status = require('../controllers/status');

router.post('/', (req, res, next) => asyncResponse(res, next, status()));

module.exports = router;