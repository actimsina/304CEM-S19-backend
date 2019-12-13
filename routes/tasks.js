const express = require('express');
const Task = require('../models/tasks');
const router = express.Router();

router.route('/')
    .get((req, res, next) => {
        Task.find({ author: req.user._id })
            .then((tasks) => {
                res.json(tasks);
            }).catch((err) => next(err));
    })
    .post((req, res, next) => {
        req.body.author = req.user._id;
        Task.create(req.body)
            .then((task) => {
                res.json(task);
            }).catch(next);
    })
    .delete((req, res, next) => {
        Task.deleteMany({ author: req.user._id })
            .then((status) => {
                res.json(status);
            }).catch(next);
    });

router.route('/:id')
    .get((req, res, next) => {
        Task.findById(req.params.id)
            .populate('category', 'name')
            .then((task) => {
                res.json(task);
            }).catch(next);
    })
    .put((req, res, next) => {
        Task.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
            .then((task) => {
                res.json(task);
            }).catch(next);
    })
    .delete((req, res, next) => {
        Task.findByIdAndDelete(req.params.id)
            .then((task) => {
                res.json(task);
            }).catch(next);
    });
// HW for this thursday
router.route('/:id/notes')
    .get((req, res, next) => {
        Task.findById(req.params.id)
            .then((task) => {
                res.json(task.notes);
            }).catch(next);
    })
    .post((req, res, next) => {
        Task.findById(req.params.id)
            .then((task) => {
                task.notes.push(req.body);
                task.save()
                    .then((task) => {
                        res.json(task);
                    })
            }).catch(next);
    })
    .delete((req, res, next) => {
        Task.findById(req.params.id)
            .then((task) => {
                task.notes = [];
                task.save()
                    .then((task) => {
                        res.json(task);
                    })
            }).catch(next);
    });

router.route('/:id/notes/:noteId')
    .get((req, res, next) => {
        Task.findById(req.params.id)
            .then((task) => {
                let note = task.notes.id(req.params.noteId);
                res.json(note);
            }).catch(next);
    })
    .put((req, res, next) => {
        Task.findById(req.params.id)
            .then((task) => {
                let note = task.notes.id(req.params.noteId);
                note.desc = req.body.desc;
                task.save()
                    .then((task) => {
                        res.json(task.notes);
                    })
            }).catch(next);
    })
    // HW for tomorrow
    .delete((req, res, next) => {
        Task.findById(req.params.id)
            .then((task) => {
                task.notes.pull(req.params.noteId);
                task.save()
                    .then((task) => {
                        res.json(task);
                    })
            }).catch(next);
    });

module.exports = router;