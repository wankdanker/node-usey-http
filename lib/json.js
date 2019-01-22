// Add a json method to the response object
module.exports = function () {
    return function (req, res, next) {
        res.json = function (data) {
            var json = JSON.stringify(data);

            res.setHeader('Content-Type', 'application/json');
            res.etag(json, { weak : true });
            res.end(json);
        }

        return next();
    };
};