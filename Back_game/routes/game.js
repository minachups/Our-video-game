const express = require('express');
const app = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const pool = require('../config/db.js');
const { getPowersFromDB } = require('./power.js'); // Importer la fonction getPowersFromDB

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = 'public/themes/Space/Card';
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

async function getCardImages() {
  try {
    const [rows] = await pool.execute('SELECT DISTINCT URL_Image FROM Cartes');
    return rows.map(row => row.URL_Image);
  } catch (error) {
    console.error('Erreur lors de la récupération des images :', error);
    throw error;
  }
}

let gameState = {
  currentPlayer: 1,
  turnCount: 0,
  scores: { 1: 0, 2: 0 },
  cards: [],
  flippedCards: [],
  playerPowers: { 1: [], 2: [] }
};

async function createDeck(difficulty) {
  let imagePaths = [];

  try {
    // Récupérer les images depuis la base de données
    imagePaths = await getCardImages();

    if (!imagePaths || imagePaths.length === 0) {
      throw new Error("Aucune image trouvée dans la base de données.");
    }

    let numberOfPairs = difficulty === "easy" ? 15 : difficulty === "medium" ? 20 : 27;

    if (imagePaths.length < numberOfPairs) {
      console.log(`Pas assez d'images. Utilisation de toutes les images disponibles.`);
      numberOfPairs = imagePaths.length;  // Utiliser toutes les images disponibles
    }

    const deck = shuffle([...imagePaths.slice(0, numberOfPairs), ...imagePaths.slice(0, numberOfPairs)]);

    // Ajouter l'URL de l'image et l'état retourné à chaque carte
    return deck.map((imageUrl, index) => ({
      id: index,
      imageUrl,
      flipped: false,
      value: imageUrl // Utiliser l'URL de l'image comme valeur pour la comparaison
    }));
  } catch (err) {
    console.error("Erreur lors de la création du deck:", err);
    throw err;
  }
}

app.post('/flip-card', express.json(), async (req, res) => {
  const { index } = req.body;

  if (!gameState.cards.length) return res.status(400).send("La partie n'est pas encore démarrée.");
  if (index < 0 || index >= gameState.cards.length) return res.status(400).send("Index invalide.");

  const card = gameState.cards[index];

  if (card.flipped || gameState.flippedCards.length === 2) {
    return res.status(400).send("Impossible de retourner cette carte.");
  }

  // Retourner la carte
  card.flipped = true;

  gameState.flippedCards.push(index);

  // Si deux cartes sont retournées
  if (gameState.flippedCards.length === 2) {
    const [index1, index2] = gameState.flippedCards;
    const card1 = gameState.cards[index1];
    const card2 = gameState.cards[index2];

    // Si les cartes ne sont pas identiques
    if (card1.value !== card2.value) {
      setTimeout(() => {
        // Remettre les cartes à l'envers après une courte pause
        card1.flipped = false;
        card2.flipped = false;
        gameState.flippedCards = [];
        gameState.currentPlayer = gameState.currentPlayer === 1 ? 2 : 1;
        gameState.turnCount++;
        givePowerIfNeeded();
        res.json(gameState); // Renvoyer l'état du jeu après la mise à jour
      }, 1000);
    } else {
      // Si les cartes sont identiques
      gameState.scores[gameState.currentPlayer]++;
      gameState.flippedCards = [];
      res.json(gameState); // Renvoyer l'état du jeu après la mise à jour
    }
  } else {
    // Si seulement une carte est retournée
    res.json(gameState); // Renvoie l'état du jeu avec la première carte retournée
  }
});

async function givePowerIfNeeded() {
  if (gameState.turnCount % 3 === 0) {
    try {
      const powers = await getPowersFromDB();
      if (powers.length > 0) {
        const power = powers[Math.floor(Math.random() * powers.length)];
        gameState.playerPowers[gameState.currentPlayer].push(power);
        console.log(`Pouvoir attribué au joueur ${gameState.currentPlayer}:`, power);
      }
    } catch (error) {
      console.error('Erreur lors de l\'attribution du pouvoir :', error);
    }
  }
}

// Mélanger un tableau
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Route pour uploader une image de carte
app.post('/upload-card', upload.single('cardImage'), (req, res) => {
  if (!req.file) {
    return res.status(400).send("Aucun fichier envoyé.");
  }

  const imageUrl = `/uploads/cards/${req.file.filename}`;
  res.json({ message: "Upload réussi", imageUrl: imageUrl });
});

app.get('/start/:difficulty', async (req, res) => {
  const { difficulty } = req.params;

  try {
    console.log('Démarrage du jeu avec la difficulté :', difficulty);
    console.log('Exécution de la requête SQL pour récupérer les images');

    // Créer le deck avec les cartes retournées et non retournées
    gameState.cards = await createDeck(difficulty); // On attend le résultat de createDeck

    console.log('Deck créé avec succès, nombre de cartes :', gameState.cards.length);

    gameState.flippedCards = [];
    gameState.scores = { 1: 0, 2: 0 };
    gameState.currentPlayer = 1;

    res.json(gameState);
  } catch (error) {
    console.error('Erreur lors du démarrage du jeu:', error.message);
    console.error(error.stack); // Affiche la pile d'appel pour mieux comprendre l'erreur
    res.status(500).json({ error: error.message });
  }
});

app.post('/use-power', express.json(), (req, res) => {
  const { playerId, powerName } = req.body;

  if (!gameState.playerPowers[playerId] || !gameState.playerPowers[playerId].some(power => power.Nom_Pouvoir === powerName)) {
    return res.status(400).json({ message: "Pouvoir non disponible." });
  }

  if (powerName === "The mixer") {
    gameState.cards = shuffle(gameState.cards);
    gameState.playerPowers[playerId] = gameState.playerPowers[playerId].filter(power => power.Nom_Pouvoir !== powerName);
    return res.json({ message: "Pouvoir utilisé : The mixer", gameState });
  }

  res.status(400).json({ message: "Pouvoir inconnu." });
});

module.exports = app;
