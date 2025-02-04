const express = require('express');
const app = express.Router();
const multer = require('multer');
const path = require('path');



app.get('/get-powers/:playerId', (req, res) => {
    const { playerId } = req.params;
    if (!gameState.playerPowers[playerId]) {
        return res.status(404).json({ message: "Joueur introuvable ou aucun pouvoir." });
    }
    res.json({ powers: gameState.playerPowers[playerId] });
});



module.exports = app;