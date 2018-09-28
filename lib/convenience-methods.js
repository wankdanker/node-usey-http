var route = require('./route')
	, methods = require('methods')
	, http = require('http')
	, https = require('https')
	;

module.exports = convenience;

function convenience (app) {
	var servers = [];

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

	app.listen = function (opt) {
		var server;

		if (opt && opt.key && opt.cert && opt.port) {
			server = https.createServer(opt, app);
			app.events.emit('server', server);
			servers.push(server);

			return server.listen(opt.port);
		}
		//else
		
		server = http.createServer(app);

		app.events.emit('server', server);

		servers.push(server);

		return server.listen.apply(server, arguments);
	};

	app.close = function () {
		var args = arguments;

		servers.forEach(function (server) {
			return server.close.apply(server, args);
		});
	};

	app.set = app.engine = function () {
		console.error('STUB: app.set ');
		return app;
	};
}
