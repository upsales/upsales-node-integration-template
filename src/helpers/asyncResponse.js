module.exports = (res, next, promise) => {
	return promise
		.then(data => {
			res.json(data);
		})
		.catch(e => next(e));
};