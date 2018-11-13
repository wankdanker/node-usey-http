var xml = require('object-to-xml');

// Add an xlsx method to the response object
module.exports = function () {
    return function (req, res, next) {
        res.xml = function (data) {
            res.setHeader('Content-Type', 'application/xml');
            res.end(xml(data));
        }

        return next();
    };
};