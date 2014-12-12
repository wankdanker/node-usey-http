var module = process.env.MW === 'express' ? 'express' : '../'
console.log(module);
var server = require(module)()

server.use(function (req, res, next) {
	res.write('a');
	return next();
});

server.use(function (req, res, next) {
	res.write('b');
	return next();
});

server.get("/", function (req, res, next) {
	res.write('c');
	return next();
});

server.use(function (req, res, next) {
	res.write('d');
	return next();
});

server.get("/", function (req, res, next) {
	res.write('e');
	return next();
});

server.use(function (req, res, next) {
	res.end();
});

server.listen(3333);

