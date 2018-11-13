var xlsx = require('json2xls-xml')();

// Add an xlsx method to the response object
module.exports = function () {
    return function (req, res, next) {
        res.xlsx = function (data) {
            res.setHeader('Content-Type', 'application/xls');
            res.end(xlsx(data));
        }

        return next();
    };
};