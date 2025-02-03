require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
require('./config/db.js')


app.use(cors());


app.use(express.static('public'));
const Routes = require('./routes/gameStart.js');


// Use routes
app.use('/', Routes);



module.exports = app; 