var pathToRegexp = require('path-to-regexp').pathToRegexp;

module.exports = route;

function route (path, method) {
	var keys = [];
	var re = pathToRegexp(path, keys);

	return function (req, res, next) {
		if (method && method !== req.method) {
			return next('use');
		}
		
		var result = re.exec(req.url.split('?')[0]);

		if (!result) {
			return next('use');
		}

		req.params = req.params || {};

		result.shift();

		result.forEach(function (val, ix) {
			req.params[keys[ix].name] = (typeof val === 'string')
				? safeDecodeURIComponent(val)
				: val
				;
		});

		return next();
	};
};

/**
 * Wrap decodeURIComponent in a try catch. 
 * If it throws, just return the undecoded value
 *
 * @param {*} val
 * @returns
 */
function safeDecodeURIComponent(val) {
	var result;

	try {
		result = decodeURIComponent(val);
	}
	catch (e) {
		result = val
	}

	return result;
}