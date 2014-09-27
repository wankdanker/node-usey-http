module.exports = function (options) {
	options = options || {};

	options.message = options.message || 'Not found';

	return function (req, res, next) {
		res.writeHead(404);
		res.end(options.message);
	}
}
