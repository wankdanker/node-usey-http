var tablify = require('tableify');
var style = require('fs').readFileSync('./node_modules/tableify/style.css');

module.exports = function () {
    return function (req, res, next) {
        res.tablify = function (data) {
            res.setHeader('Content-Type', 'text/html');
            res.write('<html><head><style>');
            res.write(style);
            res.write('</style></head><body>');
            res.write(tablify(data)) ;
            res.write('</body></html>');
            res.end();
        }

        return next();
    };
};