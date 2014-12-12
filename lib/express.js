var platform = require('../')
	, Usey = require('usey')
	, convenience = require('./convenience-methods')
	;

//
module.exports = Express;

function Express (app) {
	var express = Usey();

	express.use(platform.originalUrl());
	express.use(platform.redirect());
	express.use(platform.locals());
	express.use(platform.params());
	express.use(platform.set());
	express.use(platform.header());
	express.use(platform.status());

	convenience(app);

	return express;
}