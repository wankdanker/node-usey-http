var Usey = require('usey')
	, middleware = require('./lib/middleware.js')
	, methods = require('methods')
	, http = require('http')
	;

module.exports = Server 

//Export all of our curated middleware
Object.keys(middleware).forEach(function (key) {
	Object.defineProperty(Server, key, {
		get: function () { 
			return require(middleware[key])
		} 
	});
});

//Export the http method functions for routing
methods.forEach(function (method) {
	var capMethod = method.toUpperCase();

	Server[method.replace('-','')] = function (path) {
		return Server.route(path, capMethod);
	};
});

function Server (options) {
	var app = Usey();

	app.use(module.exports.express(app));

	return app;
}

