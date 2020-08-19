var send = require('send');

// Add a send method to the response object 
module.exports = function () {
    return function (req, res, next) {
        //if send already exists, don't override it
        if (res.send) {
            return next();
        }

        res.send = function (path, opts) {
           send(req, path, opts).pipe(res);
        };

        return next();
    };
};