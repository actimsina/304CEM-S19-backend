const User = require('../models/users');
const jwt = require('jsonwebtoken');
function authMy(req, res, next) {
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
module.exports = authMy;