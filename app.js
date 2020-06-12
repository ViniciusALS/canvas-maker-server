const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
const port = 3333;

app.use(cors());

app.use(function (req, res, next) {
    res.status(404).send("Sorry can't find that!")
});

app.get('/', (req, res) => res.send('Hello World!'));
app.get('/create-account', ()=>{});
app.post('/create-account', ()=>{});
app.get('/login', ()=>{});



app.listen(port); 