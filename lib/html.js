// Add a html method to the response object
module.exports = function () {
    return function (req, res, next) {
        res.html = function (data) {
            res.setHeader('Content-Type', 'text/html');
            res.etag(data, { weak : true });
            res.end(data);
        }

        return next();
    };
};