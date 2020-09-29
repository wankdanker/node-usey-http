var tablify = require('tableify');
var path = require('path');
var stylePath = require.resolve('tableify');

var style = require('fs').readFileSync(path.join(path.dirname(stylePath), 'style.css'));

module.exports = function () {
    return function (req, res, next) {
        res.tablify = function (data, opts) {
            var html = [
                '<html><head><style>'
                , style
                , '</style></head><body>'
                , tablify(data)
                , '</body></html>'
            ].join('');

            res.html(html, opts);
        }

        return next();
    };
};