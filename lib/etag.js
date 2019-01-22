var etag = require('etag');

// Add an etag method to the response object
module.exports = function () {
    return function (req, res, next) {
        res.etag = function (data, options) {
            var tag = etag(data, options);

            res.setHeader('Etag', tag);
            
            if (req.method === 'GET' || req.method === 'HEAD') {
                var ifNoneMatch = (req.headers['if-none-match'] || '').split(/,[ ]*/g);
                var found = false;

                ifNoneMatch.forEach(function (match) {
                    if (match === tag) {
                        found = true;
                    }
                });
                
                if (found) {
                    res.status(304);
                }
            }

            return tag;
        };

        return next();
    };
};