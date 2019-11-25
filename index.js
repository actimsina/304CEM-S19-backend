const express = require('express');
const app = express();
app.get('/tasks', function (req, res) {
    res.send("Send all tasks");
});
app.post('/tasks', (req, res) => {
    res.send("Create a task");
});
app.put('/tasks', (req, res) => {
    res.send("Not supported");
});
app.delete('/tasks', (req, res) => {
    res.send("Delete all tasks");
});
app.get('/tasks/:id', (req, res) => {
    res.send(`Send a task with ${req.params.id}`);
});
app.post('/tasks/:id', (req, res) => {
    res.send("Not Supported");
});
app.put('/tasks/:id', (req, res) => {
    res.send(`Update a task with id: ${req.params.id}`);
});
app.delete('/tasks/:id', (req, res) => {
    res.send(`Delete a task with id: ${req.params.id}`);
});
app.listen(3000, () => {
    console.log('App is running at localhost:3000');
});

