var send = require('send');

// Add a sendFile method to the response object 
module.exports = function () {
    return function (req, res, next) {
        //if sendFile already exists, don't override it
        if (res.sendFile) {
            return next();
        }

        res.sendFile = function (path, opts, cb) {
            if (typeof opts === 'function') {
                cb = opts;
                opts = null;
            }

            cb = cb || end;

            send(req, path, opts)
                .on('error', cb)
                .on('end', cb)
                .pipe(res);

            function end (err) {
                if (err) {
                    //TODO: add a way to customize this
                    res.status(404).send('not found');
                }
            }
        };

        return next();
    };
};