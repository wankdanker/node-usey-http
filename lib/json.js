// Add a json method to the response object
module.exports = function () {
    return function (req, res, next) {
        res.json = function (data) {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(data));
        }

        return next();
    };
};