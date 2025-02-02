const express = require('express');
const cors = require('cors');
//const { pool } = require('../db/db-config'); // Importer la connexion DB
const app = express();
const port = 5000;

/* Endpoint pour récupérer des utilisateurs (exemple)
app.get('/users', async (req, res) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const users = await conn.query("SELECT * FROM users");
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    if (conn) conn.release(); // Libérer la connexion
  }
});*/

app.use(cors()); // Permet à React de communiquer avec le back-end


let gameState = {
  currentPlayer: 1,
  scores: { 1: 0, 2: 0 },
  cards: [],
  flippedCards: []
};

// Créer et mélanger un jeu de cartes
function createDeck() {
  const cardValues = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H','I', 'J', 'K', 'L', 'M', 'N', 'O'];
  const deck = [...cardValues, ...cardValues]; // Doubler les cartes pour avoir des paires
  return shuffle(deck);
}

// Mélanger le tableau de cartes
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

app.get('/start/:difficulty', (req, res) => {
  const { difficulty } = req.params;
  let numberOfPairs = difficulty === "easy" ? 6 : difficulty === "medium" ? 10 : 15;
  
  const cardValues = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').slice(0, numberOfPairs);
  const deck = shuffle([...cardValues, ...cardValues]);

  gameState.cards = deck.map(value => ({ value, flipped: false }));
  res.json(gameState);
});

// Route pour initialiser une nouvelle partie
/*
app.get('/start', (req, res) => {
  gameState.cards = createDeck().map(value => ({ value, flipped: false }));
  gameState.flippedCards = [];
  gameState.scores = { 1: 0, 2: 0 };
  gameState.currentPlayer = 1;
  res.json(gameState);
});
*/

// Route pour retourner une carte
app.post('/flip-card', express.json(), (req, res) => {
  const { index } = req.body;
  const card = gameState.cards[index];
  
  // Si la carte est déjà retournée, on ne fait rien
  if (card.flipped || gameState.flippedCards.length === 2) return res.status(400).send("Can't flip card");

  card.flipped = true;
  gameState.flippedCards.push(card);

  // Vérifier la correspondance entre les cartes retournées
  if (gameState.flippedCards.length === 2) {
    const [card1, card2] = gameState.flippedCards;
    if (card1.value === card2.value) {
      gameState.scores[gameState.currentPlayer]++;
    } else {
      card1.flipped = false;
      card2.flipped = false;
    }

    // Changer de joueur
    gameState.currentPlayer = gameState.currentPlayer === 1 ? 2 : 1;
    gameState.flippedCards = [];
  }

  res.json(gameState);
});

app.listen(port, () => {
  console.log(`Backend is running on http://localhost:${port}`);
});