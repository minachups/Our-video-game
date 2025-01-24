const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');;
require('dotenv').config();


const app = express();
const port = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(bodyParser.json());


// Import routes
const joueurRoutes = require('./routes/joueur');
const partieRoutes = require('./routes/partie');
const pouvoirRoutes = require('./routes/pouvoir');
const cartesRoutes = require('./routes/cartes');
const participeRoutes = require('./routes/participe');
const possèdeRoutes = require('./routes/possède');

// Use routes
app.use('/api/joueurs', joueurRoutes);
app.use('/api/parties', partieRoutes);
app.use('/api/pouvoirs', pouvoirRoutes);
app.use('/api/cartes', cartesRoutes);
app.use('/api/participe', participeRoutes);
app.use('/api/possede', possèdeRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

module.exports = app;
