module.exports = function () {
	return function (req, res, next) {
		req.params = req.params || {};
		
		return next();
	}
}
