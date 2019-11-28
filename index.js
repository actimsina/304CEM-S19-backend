const express = require('express');
const mongoose = require('mongoose');
const Task = require('./models/tasks');

mongoose.connect('mongodb://127.0.0.1/demotm', { useNewUrlParser: true, useUnifiedTopology: true })
    .then((db) => {
        console.log("Successfully connected mongodb server");
    });
const app = express();
app.use(express.json());

app.get('/tasks', function (req, res) {
    Task.find()
        .then((tasks) => {
            res.json(tasks);
        });
});
app.post('/tasks', (req, res) => {
    Task.create(req.body)
        .then((task) => {
            res.json(task);
        });
});
app.put('/tasks', (req, res) => {
    res.send("Not supported");
});
app.delete('/tasks', (req, res) => {
    Task.deleteMany({})
        .then((status) => {
            res.json(status);
        });
});
app.get('/tasks/:id', (req, res) => {
    // res.send(`Send a task with ${req.params.id}`);
    Task.findById(req.params.id)
        .then((task) => {
            res.json(task);
        });
});
app.post('/tasks/:id', (req, res) => {
    res.send("Not Supported");
});
app.put('/tasks/:id', (req, res) => {
    // res.send(`Update a task with id: ${req.params.id}`);
    Task.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        .then((task) => {
            res.json(task);
        });
});
app.delete('/tasks/:id', (req, res) => {
    // res.send(`Delete a task with id: ${req.params.id}`);
    Task.findByIdAndDelete(req.params.id)
        .then((task) => {
            res.json(task);
        })
});
app.listen(3000, () => {
    console.log('App is running at localhost:3000');
});

