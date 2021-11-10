var platform = require('./')
	, http = require('http')
	;

var app = platform();
var app2 = platform();

var obj = {
	test : true
	, string : 'String'
	, number : 123456
	, float : 123456.789
	, boolean : true
};

app.use(platform.queryParser());

app.get('/health-check', function a (req, res, next) {
	res.end('OK');
});

app.get('/json', function b (req, res, next) {
	res.json(obj);
});

app.get('/xlsx', function c (req, res, next) {
	res.xlsx(obj);
});

app.get('/send-buffer', function d (req, res, next) {
	res.send(Buffer.from('hello there buffer'));
});

app.get('/send-json', function e (req, res, next) {
	res.send([{ hello : 'wolrd' }]);
});

app.get('/send-html', function f (req, res, next) {
	res.send('<div style="color:blue">hello!</div>');
});

app.get('/send-file', function g (req, res, next) {
	res.sendFile('./package.json');
});

app.get('/send-file-not-found', function h (req, res, next) {
	res.sendFile('./asdfasdfasdfasdf', function (err) {
		res.status(404).send(err);
	});
});

app.get('/send-file-not-found-no-callback', function i (req, res, next) {
	res.sendFile('./asdfasdfasdfasdf');
});

app.get('/xml', function j (req, res, next) {
	res.xml(obj);
});

app.get('/tablify', function k (req, res, next) {
	res.tablify(obj);
});

app.get('/async', async function l (req, res) {
	//this will automatically call next
	console.log('here1')
});

app.get('/async', async function m (req, res, next) {
	//this will not resolve by itself, next must be called
	console.log('here2');
});

app.all(/\/([^\/]*)\/([0-9]{13}).([a-z]*)/, function (req, res, next) {
	res.json({
		params: req.params
		, query : req.query
	})
});

app.all('/:slug([^\/]*)/:upc([0-9]{12})', function (req, res, next) {
	res.json({
		params: req.params
		, query : req.query
	})
});

app.all('/test-:name', function (req, res, next) {
	res.json({
		params: req.params
		, query : req.query
	})
});

//http://127.0.0.1:1337/customer/address/shipping/1234/update
app.all('/customer/:what/(.*)', (req, res, next) => next());
app.all('/customer/address/:type/(.*)', (req, res, next) => next());
app.all('/customer/address/:type/:action', (req, res, next) => next());
app.all('/customer/address/:type/:address_id(\\d+)/:action', function (req, res, next) {
	res.json({
		params: req.params
		, query : req.query
	}) 
});

app.mount('/test', app2);

app.use(platform._404());

app.listen(1337);

app2.get('/page/:id', function (req, res, next) {
	res.json({
		url : req.url
		, originalUrl : req.originalUrl
		, params : req.params
		, now : Date.now()
	});
});
