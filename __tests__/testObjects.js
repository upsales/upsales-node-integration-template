exports.getMockUpsalesClient = (overrides = {}) => {
	return Object.assign({}, {
		id: 1,
		name: 'name',
		custom: []
	}, overrides);
};

exports.getMockUpsalesOrder = (overrides = {}) => {
	return Object.assign({}, {
		id: 1,
		description: 'description',
		date: '2019-01-01',
		closeDate: '2019-01-02',
		notes: 'notes',
		user: {
			id: 1,
			name: 'User Name',
			role: {
				name: 'User role',
				id: 1
			},
			email: 'user@upsales.se'
		},
		client: {
			name: 'Client AB',
			id: 1,
			users: [
				{
					id: 1,
					name: 'Client User Name',
					role: {
						name: 'User role',
						id: 1
					},
					email: 'clientuser@upsales.se'
				}
			]
		},
		contact: {
			name: 'Contact Name',
			id: 1,
			email: 'contactuser@upsales.se'
		},
		currency: 'SEK',
		currencyRate: 1,
		custom: [
			{
				fieldId: 1,
				value: 'value'
			}
		],
		probability: 100,
		stage: {
			name: 'Avslutad - Order',
			id: 1
		},
		orderRow: [{
			id: 1,
			quantity: 10,
			listPrice: 40,
			price: 40,
			discount: 0,
			productId: 1,
			sortId: 1,
			product: {
				name: 'product name',
				id: 1,
				category: null
			}
		}],
		regDate: '2019-01-01T15:04:58.000Z',
		modDate: '2019-01-01T15:04:58.000Z',
		project: {
			name: 'project name',
			id: 1
		},
		clientConnection: null,
		locked: 0,
		value: 400,
		agreement: null
	}, overrides);
};