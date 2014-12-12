module.exports = function () {
	return function (req, res, next) {
		req.header = function (header) {
			return req.headers[(header || "").toLowerCase()];
		};

		return next();
	}
}
