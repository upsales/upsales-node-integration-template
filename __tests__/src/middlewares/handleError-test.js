jest.mock('../../../src/helpers/log');

const handleError = require('../../../src/middlewares/handleError');

describe('src/middlewares/handleError.js', () => {
	const getDefaultRes = () => {
		const json = jest.fn();
		return {json, status: jest.fn().mockReturnValue({json})};
	};

	it('Passes error to res with status 500', () => {
		const res = getDefaultRes();
		handleError(new Error('banana error'), {}, res, jest.fn());
		expect(res.status).toHaveBeenCalledWith(500);
		expect(res.json).toHaveBeenCalledWith({error: 'Error'});
	});

	it('Should expose the error if expose flag is true', () => {
		const res = getDefaultRes();
		const err = new Error('This was really really bad');
		err.expose = true;
		err.statusCode = 400;

		handleError(err, {}, res, jest.fn());
		expect(res.status).toHaveBeenCalledWith(400);
		expect(res.json).toHaveBeenCalledWith({error: 'This was really really bad'});
	});
});
