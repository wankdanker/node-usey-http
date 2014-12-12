module.exports = function () {
	return function (req, res, next) {
		res.set = function (field, val) {
			if (!val && typeof field == 'object') {
				Object.keys(field).forEach(function (key) {
					res.setHeader([key], field[key]);
				});
			}
			else {
				res.setHeader(field, val);
			}
		};

		res.header = res.set;

		return next();
	}
}
