const express = require('express');
const { Server } = require('boardgame.io/server');
const MemoryGame = require('./games/memory-game');
const cardsRoutes = require('./routes/cards');
const powersRoutes = require('./routes/powers');

// Configuration de l'application
const app = express();
app.use(express.json());

// Routes pour gérer les données
app.use('/api/cards', cardsRoutes);
app.use('/api/powers', powersRoutes);

// Boardgame.io : Serveur de jeu
const server = Server({ games: [MemoryGame] });
server.app.use(app);