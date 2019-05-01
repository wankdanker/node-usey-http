var parse = require('url').parse;

module.exports = function () {
    return function (req, res, next) {
        var proto = req.headers['X-Proto'] || req.headers['x-proto'] || (req.secure && 'https') || 'http';
        var url = [proto, '://', req.headers.host, req.url].join('');

        req.parsedUrl = parse(url, true);

        return next();
    }
};
