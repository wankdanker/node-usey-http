var route = require('./route')
	, methods = require('methods')
	;

module.exports = convenience;

function convenience (app) {
	methods.forEach(function (method) {
		var capMethod = method.toUpperCase();
		app[method.replace('-','')] = function (path) {
			var args = Array.prototype.slice.call(arguments);

			args[0] = route(path, capMethod);

			return app.use(args);
		};
	});
}

