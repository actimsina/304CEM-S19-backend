const User = require('../models/users');
function authMy(req, res, next) {
    let authHeader = req.headers.authorization;
    if (!authHeader) {
        let err = new Error('No authentication information');
        res.setHeader('WWW-Authenticate', 'Basic');
        err.status = 401;
        return next(err);
    }
    let authInfo = new Buffer.from(authHeader.split(" ")[1], "base64").toString()
        .split(':');
    // console.log(authInfo);
    // HW for Friday 13 Dec.
    User.findOne({ username: authInfo[0] })
        .then((user) => {
            if (user === null) {
                let err = new Error('Username does not exists!');
                err.status = 401;
                return next(err);
            }
            if (user.password !== authInfo[1]) {
                let err = new Error('Password does not match!');
                err.status = 401;
                return next(err);
            }
            req.user = user;
            next();
        }).catch(next);
}
module.exports = authMy;