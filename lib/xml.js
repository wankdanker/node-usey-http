var xml = require('object-to-xml');

// Add an xlsx method to the response object
module.exports = function () {
    return function (req, res, next) {
        res.xml = function (data, opts) {
            opts = opts || {};
            
            var charset = opts.charset || 'utf-8';

            var x = xml(data);

            res.setHeader('Content-Type', 'application/xml; charset=' + charset);
            res.etag(x, { weak : true });
            res.end(x);
        }

        return next();
    };
};