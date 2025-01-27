const { INVALID_MOVE } = require('boardgame.io/core');
const { loadCards, loadPowers } = require('../../db/db-queries');

const MemoryGame = {
  name: 'memory-game',

  // Initialiser le jeu
  setup: async (ctx) => {
    const cards = await loadCards(); // Charger les cartes
    const powers = await loadPowers(); // Charger les pouvoirs

    // Initialiser chaque joueur avec son propre deck de pouvoirs et un score
    const players = {};
    for (let i = 0; i < ctx.numPlayers; i++) {
      players[i] = {
        score: 0,
        powers: [], // Deck de pouvoirs du joueur
      };
    }

    return {
      deck: shuffle(cards), // Mélanger les cartes
      powers: shuffle(powers), // Mélanger les pouvoirs disponibles
      players, // État des joueurs
      turnCount: 0,
    };
  },

  moves: {
    // Retourner une carte
    flipCard(G, ctx, cardId) {
      const card = G.deck.find((c) => c.id === cardId);

      if (!card || card.revealed || card.matched) {
        return INVALID_MOVE; // Mouvement invalide si la carte est déjà révélée ou appariée
      }

      card.revealed = true;

      const revealedCards = G.deck.filter((c) => c.revealed && !c.matched);
      if (revealedCards.length === 2) {
        const [card1, card2] = revealedCards;

        if (card1.id === card2.id) {
          // Les cartes forment une paire
          card1.matched = true;
          card2.matched = true;

          // Augmenter le score du joueur actuel
          G.players[ctx.currentPlayer].score++;
        } else {
          // Pas une paire : retourner les cartes
          card1.revealed = false;
          card2.revealed = false;
        }
      }

      return G;
    },

    // Jouer un pouvoir
    usePower(G, ctx, powerId) {
      const player = G.players[ctx.currentPlayer];
      const power = player.powers.find((p) => p.id === powerId);

      if (!power) {
        return INVALID_MOVE; // Mouvement invalide si le joueur n'a pas ce pouvoir
      }

      // Exemple d'effet : révéler une carte aléatoire non appariée
      if (power.name === 'Reveal Random') {
        const hiddenCard = G.deck.find((c) => !c.revealed && !c.matched);
        if (hiddenCard) {
          hiddenCard.revealed = true;
        }
      }

      // Retirer le pouvoir du joueur après utilisation
      player.powers = player.powers.filter((p) => p.id !== powerId);

      return G;
    },
  },

  turn: {
    onEnd(G, ctx) {
      G.turnCount++;

      // Tous les 3 tours, donner un nouveau pouvoir au joueur actuel
      if (G.turnCount % 3 === 0) {
        const player = G.players[ctx.currentPlayer];
        const newPower = G.powers.pop();

        if (newPower) {
          player.powers.push(newPower); // Ajouter un pouvoir au joueur
        }
      }
    },
  },

  endIf: (G, ctx) => {
    // Finir le jeu si toutes les cartes sont appariées
    if (G.deck.every((c) => c.matched)) {
      const scores = Object.keys(G.players).map((playerId) => ({
        playerId,
        score: G.players[playerId].score,
      }));

      // Déterminer le(s) gagnant(s)
      const maxScore = Math.max(...scores.map((s) => s.score));
      const winners = scores.filter((s) => s.score === maxScore);

      return { winners };
    }
  },
};

// Fonction utilitaire pour mélanger les cartes
function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

module.exports = MemoryGame;
