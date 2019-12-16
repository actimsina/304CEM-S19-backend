const express = require('express');
const bcrypt = require('bcryptjs');
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

            bcrypt.hash(req.body.password, 10, function (err, hash) {
                if (err) {
                    throw new Error('Could not encrypt password!');
                }
                User.create({
                    username: req.body.username,
                    password: hash
                }).then((user) => {
                    res.json({ status: "Signup Success!", userId: user._id });
                }).catch(next);
            });
        });
});

router.post('/login', (req, res, next) => {
    res.send('this is login');
});

module.exports = router;