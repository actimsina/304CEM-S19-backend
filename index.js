const express = require('express');
const mongoose = require('mongoose');
const taskRouter = require('./routes/tasks');
const categoryRouter = require('./routes/categories');
const auth = require('./routes/auth');
const userRouter = require('./routes/users');

mongoose.connect('mongodb://127.0.0.1/demotm', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then((db) => {
        console.log("Successfully connected mongodb server");
    });
const app = express();
app.use(express.json());

app.use('/users', userRouter);
app.use(auth);
app.use('/categories', categoryRouter);
app.use('/tasks', taskRouter);

// app.use((err, req, res) => {
//     console.log(err.stack);
//     res.statusCode = err.status;
//     res.json(err.message);
// });

// Custom Error Handling

app.listen(3000, () => {
    console.log('App is running at localhost:3000');
});

