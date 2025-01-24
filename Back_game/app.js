// routes/gameSessions.js
const express = require('express');
const router = express.Router();
const { createGameSession, getCurrentPlayerTurn } = require('../db');

// Créer une session de jeu
router.post('/start', async (req, res) => {
  const { themeId, difficultyId, players } = req.body;
  const sessionId = await createGameSession(themeId, difficultyId, players);
  res.json({ sessionId });
});

// Tour de jeu (retourner des cartes)
router.post('/:sessionId/flip', async (req, res) => {
  const { sessionId } = req.params;
  const { playerId, cardIndex1, cardIndex2 } = req.body;

  const currentPlayerTurn = await getCurrentPlayerTurn(sessionId);
  
  if (currentPlayerTurn === playerId) {
    // Appel Boardgame.io pour retourner les cartes
    res.json({ success: true, message: 'Cards flipped successfully' });
  } else {
    res.status(400).json({ success: false, message: 'It\'s not your turn!' });
  }
});

module.exports = router;
