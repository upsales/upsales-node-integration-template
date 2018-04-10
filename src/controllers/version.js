const pack = require('../../package.json');

module.exports = async () => {
	return pack.version;
};