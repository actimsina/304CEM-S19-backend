const express = require('express');
const router = express.Router();
const Category = require('../models/categories');
const auth = require('../routes/auth');

router.route('/')
    .get((req, res, next) => {
        Category.find({})
            .then((categories) => {
                res.json(categories);
            }).catch(next);
    })
    .post(auth.verifyUser, (req, res, next) => {
        Category.create(req.body)
            .then((category) => {
                res.json(category);
            }).catch(next);
    })
    .delete((req, res, next) => {
        Category.deleteMany({})
            .then((reply) => {
                res.json(reply);
            }).catch(next);
    });

router.route('/:id')
    .get((req, res, next) => {
        Category.findOne({ _id: req.params.id })
            .then((category) => {
                res.json(category);
            }).catch(next);
    })
    .put((req, res, next) => {
        Category.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
            .then((category) => {
                res.json(category);
            }).catch(next);
    })
    .delete((req, res, next) => {
        Category.findByIdAndDelete(req.params.id)
            .then((category) => {
                res.json(category);
            }).catch(next);
    });

module.exports = router;