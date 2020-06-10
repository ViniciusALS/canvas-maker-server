const express = require('express');
const cors = require('cors');

const app = express();
const port = 3333;

app.use(cors());

app.get('/', (req, res) => res.send('Hello World!'));
app.get('/create-account', ()=>{});
app.post('/create-account', ()=>{});
app.get('/login', ()=>{});

app.listen(port);