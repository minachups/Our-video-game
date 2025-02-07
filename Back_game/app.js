require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
require('./config/db.js')


app.use(cors());


app.use('/public', express.static(path.join(__dirname, 'public')));
const gameRoutes = require('./routes/game.js');



// Use routes
app.use('/', gameRoutes);




module.exports = app; 