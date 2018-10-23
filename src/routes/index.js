const router = require('express').Router();

router.use('/version', require('./version'));
router.use('/health', require('./health'));

module.exports = router;