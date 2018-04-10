require('dotenv').config(); // init environment variables
const log = require('./helpers/log');
const app = require('./app');
const {promisify} = require('util');

app.listen = promisify(app.listen);

const start = async () => {
	const PORT = process.env.PORT || 3300;
	try{
		await app.listen(PORT);
		log.info(`Listening on ${PORT}`);
	}catch(e){
		log.error(e);
	}
};

start();