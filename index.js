const express = require('express');
const mongoose = require('mongoose');
const taskRouter = require('./routes/tasks');
const categoryRouter = require('./routes/categories');
const auth = require('./routes/auth');
const userRouter = require('./routes/users');
const dotenv = require('dotenv').config();
const uploadRouter = require('./routes/upload');

mongoose.connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then((db) => {
        console.log("Successfully connected mongodb server");
    });
const app = express();
app.use(express.json());

app.use('/users', userRouter);

app.use(auth.verifyUser);
app.use('/upload', uploadRouter);
app.use('/categories', categoryRouter);
app.use('/tasks', taskRouter);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.statusCode = 500;
    res.json({ status: err.message });
})

app.listen(process.env.PORT, () => {
    console.log(`App is running at localhost:${process.env.PORT}`);
});

