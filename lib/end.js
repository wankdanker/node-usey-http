//proxy the res.end() method to clean-up usey references
module.exports = function () {
	return function (req, res, next) {
		var end = res.end;
		res.end = function () {
			var args = Array.prototype.slice.call(arguments);

			end.apply(res, args);

			return next('exit');
		};

		return next();
	}
}
