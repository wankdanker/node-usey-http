var xlsx = require('json2xls-xml')();

// Add an xlsx method to the response object
module.exports = function () {
    return function (req, res, next) {
        res.xlsx = function (data) {
            var x = xlsx(data);
            
            res.setHeader('Content-Type', 'application/xls');
            res.etag(x, { weak : true });
            res.end(x);
        }

        return next();
    };
};
