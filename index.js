const express = require('express');

const app = express();

app.get('/', function (req, res) {
    // console.log(req.headers);
    res.send("Hello, Class");
});

app.listen(3000, () => {
    console.log('App is running at localhost:3000');
});

