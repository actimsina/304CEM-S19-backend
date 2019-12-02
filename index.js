const express = require('express');
const mongoose = require('mongoose');
const taskRouter = require('./routes/tasks');
const categoryRouter = require('./routes/categories');

mongoose.connect('mongodb://127.0.0.1/demotm', { useNewUrlParser: true, useUnifiedTopology: true })
    .then((db) => {
        console.log("Successfully connected mongodb server");
    });
const app = express();
app.use(express.json());
app.use('/tasks', taskRouter);
app.use('/categories', categoryRouter);

// app.use((err, req, res) => {
//     console.log(err.stack);
//     res.statusCode = err.status;
//     res.json(err.message);
// });

// Custom Error Handling

app.listen(3000, () => {
    console.log('App is running at localhost:3000');
});

