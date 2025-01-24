// models/rule.js
const { Game } = require('boardgame.io');
const { createGameSession, createRound, getCurrentPlayerTurn } = require('../db');  // Importer les fonctions DB

const MemoryGame = Game({
  setup: async (ctx) => {
    // Initialisation du jeu (récupération des cartes depuis la DB ou autres)
    const players = [];
    const themeId = ctx.played[0].themeId;  // Par exemple
    const difficultyId = ctx.played[0].difficultyId;  // Par exemple
    const sessionId = await createGameSession(themeId, difficultyId, players);  // Créer la session en DB
    return {
      sessionId,
      players,
      turn: 0,
      gameOver: false,
    };
  },

  moves: {
    flipCards: async (G, ctx, cardIndex1, cardIndex2) => {
      // Logique pour retourner les cartes
      const card1 = G.cards[cardIndex1];
      const card2 = G.cards[cardIndex2];
      
      // Si les cartes sont identiques, elles forment une paire
      const matched = card1 === card2;
      const isBombExploded = card1.isBomb || card2.isBomb;  // Vérifier si l'une des cartes est une bombe
      
      // Sauvegarder ce tour dans la base de données
      await createRound(G.sessionId, ctx.playerID, cardIndex1, cardIndex2, matched, isBombExploded, Date.now());

      // Passer au tour suivant (changer le joueur)
      G.turn += 1;

      // Vérifier si le jeu est terminé
      if (G.pairs.length === G.cards.length / 2) {
        G.gameOver = true;
      }

      // Mettre à jour le joueur dont c'est le tour
      const currentPlayer = await getCurrentPlayerTurn(G.sessionId);
      return { currentPlayer };
    },
  },

  endIf: (G) => {
    // Vérifier si le jeu est terminé et qui est le gagnant
    if (G.gameOver) {
      return { winner: G.players[0] };  // Choisir le gagnant
    }
  },
});

module.exports = MemoryGame;
