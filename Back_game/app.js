const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");

dotenv.config();

const app = express();


app.use(bodyParser.json());


const partieRoutes = require("./routes/game.js");
const tourRoutes = require("./routes/tour.js");
const paireRoutes = require("./routes/pair.js");
const pouvoirRoutes = require("./routes/power.js");


app.use("/api/power", pouvoirRoutes);  
app.use("/api/game", partieRoutes);
app.use("/api/tour", tourRoutes);  
app.use("/api/pair", paireRoutes); 

// Exporter l'application
module.exports = app;
