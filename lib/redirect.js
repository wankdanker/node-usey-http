module.exports = function (options) {
	return function (req, res, next) {
		res.redirect = redirect;

		return next();

		function redirect (url) {
			res.writeHead(303, {
				Location : url
			});

			res.end();

			res = null;
		}
	}
}
