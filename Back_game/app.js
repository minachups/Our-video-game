require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
require('./config/db.js')


app.use(cors());


app.use(express.static('public'));
const gameRoutes = require('./routes/game.js');
const powerRoutes = require('./routes/power.js');


// Use routes
app.use('/', gameRoutes);
app.use('/', powerRoutes);



module.exports = app; 