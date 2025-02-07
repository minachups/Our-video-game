const express = require('express');
const app = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const pool = require('../config/db.js'); 





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

function givePowerIfNeeded() {
  gameState.turnCount++;  // Incrémenter le compteur de tours

  if (gameState.turnCount % 3 === 0) {  // Tous les 3 tours
      const currentPlayer = gameState.currentPlayer;
      
      // Liste des pouvoirs possibles (avec leurs images stockées dans le backend)
      const availablePowers = [
          { name: "Shuffle", image: "/themes/Pouvoir/Shuffle.svg" },
          { name: "Extra Turn", image: "/themes/Pouvoir/ExtraTurn.svg" },
          { name: "See One Card", image: "/themes/Pouvoir/SeeOneCard.svg" }
      ];

      // Sélection aléatoire d'un pouvoir
      const randomPower = availablePowers[Math.floor(Math.random() * availablePowers.length)];

      // Ajouter le pouvoir au joueur actuel
      gameState.playerPowers[currentPlayer].push(randomPower);
  }
}


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

app.post('/flip-card', express.json(), (req, res) => {
  const { index } = req.body;

  console.log(`Requête reçue pour retourner la carte à l'index: ${index}`);  // Log pour vérifier l'index reçu

  if (!gameState.cards.length) {
    console.log("Le jeu n'est pas encore démarré.");
    return res.status(400).send("La partie n'est pas encore démarrée.");
  }

  if (index < 0 || index >= gameState.cards.length) {
    console.log(`Index invalide: ${index}. Le jeu contient ${gameState.cards.length} cartes.`);
    return res.status(400).send("Index invalide.");
  }

  const card = gameState.cards[index];
  console.log(`Carte à l'index ${index}: ${JSON.stringify(card)}`);  // Log de la carte avant modification

  if (card.flipped || gameState.flippedCards.length === 2) {
    console.log(`Impossible de retourner la carte: carte déjà retournée ou trop de cartes retournées. Carte: ${JSON.stringify(card)}`);
    return res.status(400).send("Impossible de retourner cette carte.");
  }

  // Retourner la carte
  card.flipped = true;  // Changer l'état de la carte
  gameState.flippedCards.push(index);  // Ajouter l'index des cartes retournées

  console.log(`Carte retournée: ${JSON.stringify(card)}`);  // Log de la carte après modification

  if (gameState.flippedCards.length === 2) {
    const [index1, index2] = gameState.flippedCards;
    const card1 = gameState.cards[index1];
    const card2 = gameState.cards[index2];

    console.log(`Cartes retournées: ${JSON.stringify(card1)} et ${JSON.stringify(card2)}`);

    // Vérifier si les cartes forment une paire
    if (card1.value === card2.value) {
      console.log("Les cartes forment une paire !");
      gameState.scores[gameState.currentPlayer]++;
      gameState.flippedCards = [];
    } else {
      console.log("Les cartes ne forment pas une paire.");
      setTimeout(() => {
        // Si ce n'est pas une paire, retourner les cartes après un délai
        gameState.cards[index1].flipped = false;
        gameState.cards[index2].flipped = false;
        gameState.flippedCards = [];
        gameState.currentPlayer = gameState.currentPlayer === 1 ? 2 : 1;
        givePowerIfNeeded();  // Ajouter un pouvoir si nécessaire
      }, 1000); // Délai de 1 seconde pour retourner les cartes
    }
  }

  console.log("État du jeu après le retournement:", JSON.stringify(gameState));  // Log complet de l'état du jeu après la mise à jour

  // Retourner l'état du jeu
  res.json(gameState);
});





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








// Route pour retourner une carte
app.post('/flip-card', express.json(), (req, res) => {
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


module.exports = app;
