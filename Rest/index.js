const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();


app.use(bodyParser.urlencoded({ extended: false }))

const urlencodeParser = bodyParser.urlencoded({extended: false});

app.set('view engine', 'ejs');
app.use('/public', express.static('public'));

const filejs = fs.readFileSync('./file.json', 'utf8');
const jsObject = JSON.parse(file);

app.post('/add', urlencodeParser)

