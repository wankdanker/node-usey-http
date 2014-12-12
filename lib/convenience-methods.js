var route = require('./route')
	, methods = require('methods')
	, http = require('http')
	;

module.exports = convenience;

function convenience (app) {
	var server;

	methods.forEach(function (method) {
		var capMethod = method.toUpperCase();
		app[method.replace('-','')] = function (path) {
			var args = Array.prototype.slice.call(arguments);

			args[0] = route(path, capMethod);

			return app.use(args);
		};
	});

	app.all = function (path) {
		var args = Array.prototype.slice.call(arguments);

		args[0] = route(path);

		return app.use(args);
	};

	app.listen = function () {
		server = http.createServer(app);
		return server.listen.apply(server, arguments);
	};

	app.set = app.engine = function () {
		console.error('STUB: app.set ');
		return app;
	};
}
