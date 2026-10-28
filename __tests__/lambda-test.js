const http = require('http');

// __mocks__/express.js stubs the app, and this test needs one that answers.
jest.unmock('express');

describe('lambda.js', () => {
	const lambda = require('../lambda');

	afterAll(() => lambda.server.close());

	// What the nodejs24.x runtime hands a handler: no succeed, fail or done.
	const context = { awsRequestId: 'test-request' };

	const event = {
		httpMethod: 'GET',
		path: '/version',
		headers: {},
		queryStringParameters: null,
		body: null,
		isBase64Encoded: false,
		requestContext: {}
	};

	it('answers through the returned promise, not context.succeed', async () => {
		const response = await lambda.handler(event, context);

		expect(response.statusCode).toBe(200);
		expect(JSON.parse(response.body)).toBe(require('../package.json').version);
	});

	it('answers a second invocation on the same server', async () => {
		await lambda.handler(event, context);
		const response = await lambda.handler(event, context);

		expect(response.statusCode).toBe(200);
	});

	it('does not pool the socket to the app across invocations', () => {
		expect(http.globalAgent.keepAlive).toBe(false);
	});
});
