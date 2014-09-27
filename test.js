var platform = require('./')
	, http = require('http')
	;

var app = platform()

//load express compatability
app.use(platform.express(app));

app.get('/health-check', function (req, res, next) {
	res.end('OK');
});

http.createServer(app).listen(1337)
