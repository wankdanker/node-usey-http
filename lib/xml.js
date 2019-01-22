var xml = require('object-to-xml');

// Add an xlsx method to the response object
module.exports = function () {
    return function (req, res, next) {
        res.xml = function (data) {
            var x = xml(data);

            res.setHeader('Content-Type', 'application/xml');
            res.etag(x, { weak : true });
            res.end(x);
        }

        return next();
    };
};