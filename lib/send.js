var send = require('send');

// Add a send method to the response object 
module.exports = function () {
    return function (req, res, next) {
        //if send already exists, don't override it
        if (res.send) {
            return next();
        }

        res.send = function (val) {
            //if it's a string, send it as html
            if (typeof val === 'string') {
                return res.html(val);
            }
            //if it's a buffer 
            else if (Buffer.isBuffer(val)) {
                res.set('Content-Type', 'application/octet-stream');
                return res.end(val);
            }
            //otherwise treat everything as json
            else {
                return res.json(val);
            }
        };

        return next();
    };
};