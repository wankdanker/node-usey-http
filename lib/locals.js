module.exports = function () {
	return function (req, res, next) {
		res.locals = res.locals || {};
		
		return next();
	}
}
