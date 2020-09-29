// Add a html method to the response object
module.exports = function () {
    return function (req, res, next) {
        res.html = function (data, opts) {
            opts = opts || {};
            
            var charset = opts.charset || 'utf-8';

            res.setHeader('Content-Type', 'text/html; charset=' + charset);
            res.etag(data, { weak : true });
            res.end(data);
        }

        return next();
    };
};