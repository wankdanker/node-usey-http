var platform = require('./')
	, http = require('http')
	;

var app = platform()

app.get('/health-check', function (req, res, next) {
	res.end('OK');
});

app.use(platform._404());

app.listen(1337);
