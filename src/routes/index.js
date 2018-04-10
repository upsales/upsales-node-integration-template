const router = require('express').Router();

router.use('/version', require('./version'));

module.exports = router;