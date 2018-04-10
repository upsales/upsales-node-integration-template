const router = require('express').Router();
const asyncResponse = require('../helpers/asyncResponse');
const version = require('../controllers/version');

router.get('/', (req, res, next) => asyncResponse(res, next, version()));

module.exports = router;
