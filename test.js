var platform = require('./')
	, http = require('http')
	;

var app = platform()

var obj = {
	test : true
	, string : 'String'
	, number : 123456
	, float : 123456.789
	, boolean : true
}

app.get('/health-check', function (req, res, next) {
	res.end('OK');
});

app.get('/json', function (req, res, next) {
	res.json(obj);
});

app.get('/xlsx', function (req, res, next) {
	res.xlsx(obj);
});

app.get('/xml', function (req, res, next) {
	res.xml(obj);
});

app.get('/tablify', function (req, res, next) {
	res.tablify(obj);
});

app.use(platform._404());

app.listen(1337);
