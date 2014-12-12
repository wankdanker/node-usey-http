module.exports = function () {
	return function (req, res, next) {
		req.originalUrl = req.url;

		return next();
	};
}
