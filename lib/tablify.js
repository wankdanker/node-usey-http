var tablify = require('tableify');
var style = require('fs').readFileSync('./node_modules/tableify/style.css');

module.exports = function () {
    return function (req, res, next) {
        res.tablify = function (data) {
            var html = [
                '<html><head><style>'
                , style
                , '</style></head><body>'
                , tablify(data)
                , '</body></html>'
            ].join('');

            res.setHeader('Content-Type', 'text/html');
            res.etag(html, { weak : true })            ;
            res.end(html);
        }

        return next();
    };
};