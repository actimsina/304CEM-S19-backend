const express = require('express');
const router = express.Router();
const User = require('../models/users');

router.post('/signup', (req, res, next) => {
    User.findOne({ username: req.body.username })
        .then((user) => {
            if (user != null) {
                let err = new Error('Username already exists!');
                err.status = 401;
                return next(err);
            }
            User.create({
                username: req.body.username,
                password: req.body.password
            }).then((user) => {
                res.json({ status: "Signup Success!", userId: user._id });
            })
        }).catch(next);
});

router.post('/login', (req, res, next) => {
    res.send('this is login');
});

module.exports = router;