var platform = require('../')
	, Usey = require('usey')
	, convenience = require('./convenience-methods')
	;

//
module.exports = Express;

function Express (app) {
	var express = Usey();

	convenience(app);

	express.use(platform.redirect());

	return express;
}
