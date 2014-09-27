var pathToRegexp = require('path-to-regexp');

module.exports = route;

function route (path, method) {
	var keys = [];
	var re = pathToRegexp(path, keys);

	return function (req, res, next) {
		if (method && method !== req.method) {
			return next('use');
		}

		var result = re.exec(req.url);

		if (!result) {
			return next('use');
		}

		req.params = req.params || {};

		result.shift();

		result.forEach(function (val, ix) {
			req.params[keys[ix].name] = val;
		});

		return next();
	};
};
