var module = process.env.MW === 'express' ? 'express' : '../'
console.log(module);
var Module = require(module)
var server = Module();

if (module === '../') {
	server.use(Module.queryParser());
	server.use(Module.bodyParser.json());
	server.use(Module.bodyParser.urlencoded({ extended: false }));
}

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

