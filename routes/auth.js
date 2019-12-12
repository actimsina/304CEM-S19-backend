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
    console.log(authInfo);

    if (authInfo[0] === 'admin' && authInfo[1] === 'admin') {
        next();
    } else {
        let err = new Error('No authentication information');
        res.setHeader('WWW-Authenticate', 'Basic');
        err.status = 401;
        return next(err);
    }
}
module.exports = authMy;