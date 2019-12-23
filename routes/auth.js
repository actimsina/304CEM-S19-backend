const User = require('../models/users');
const jwt = require('jsonwebtoken');
module.exports.verifyUser = (req, res, next) => {
    let authHeader = req.headers.authorization;
    if (!authHeader) {
        let err = new Error('No authentication information');
        err.status = 401;
        return next(err);
    }
    let token = authHeader.split(" ")[1];
    let data;
    try {
        data = jwt.verify(token, process.env.SECRET)
    } catch (err) {
        return next(err);
    }
    User.findById(data.userId)
        .then((user) => {
            req.user = user;
            next();
        }).catch(next);
}
module.exports.verifyAdmin = (req, res, next) => {
    if (!req.user) {
        let err = new Error('Unauthorized!');
        err.status = 401;
        return next(err);
    } else if (req.user.admin !== true) {
        let err = new Error('You are not admin!');
        err.status = 403;
        return next(err);
    }
    next();
}