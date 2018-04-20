const { BadRequest } = require('http-errors');
const Upsales = require('@upsales/node-upsales');

const getClient = (id, apiKey, apiServer) => new Promise((resolve, reject) => {
	const upsales = new Upsales({
		key: apiKey,
		server: apiServer.replace('/api/','')
	});
	upsales.client.get(id, (err, res) => {
		if(err) {
			return reject(err);
		}
		if(!res.data) {
			return reject('Not found');
		}
		resolve(res.data);
	});
});

const findOrgField = client => {
	let field = null;
	for (var i = 0; i < client.custom.length; i++) {
		if(client.custom[i].fieldId === 1 && client.custom[i].value && client.custom[i].value.length) {
			field = client.custom[i];
		}
	}

	return field;
};

module.exports = async (req = {}) => {
	if(!req.data || !req.data.obj) {
		throw new BadRequest('Missing order'); // This is bad
	}

	const order = req.data.obj;

	if(order.probability !== 100){
		return 'ok';
	}

	const clientId = !isNaN(order.client) ? order.client : (order.client || {}).id;
	if(!clientId) {
		throw new BadRequest('Missing client');
	}

	let client;
	try {
		client = await getClient(clientId, req.apiKey, req.apiPath);
	} catch(e) {
		throw new BadRequest('Missing client');
	}

	// Find org no. field (fieldId = 1)
	const orgNoField = findOrgField(client);

	if(!orgNoField) {
		throw new BadRequest('Missing orgno.');
	}

	return 'ok';
};