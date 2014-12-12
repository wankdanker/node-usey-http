module.exports = function () {
	return function (req, res, next) {
		res.status = function (statusCode) {
			res.statusCode = statusCode;

			return res;
		};

		return next();
	};
};
