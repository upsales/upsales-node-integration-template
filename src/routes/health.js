const router = require('express').Router();
const asyncResponse = require('../helpers/asyncResponse');
const health = require('../controllers/health');

router.get('/', (req, res, next) => asyncResponse(res, next, health()));

module.exports = router;
