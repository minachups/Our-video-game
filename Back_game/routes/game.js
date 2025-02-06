const express = require('express');
const app = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');


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


function createDeck(difficulty) {
  const imageFolder = 'public/themes/Space/Card'; 
  let imagePaths = [];

  try {
    imagePaths = fs.readdirSync(imageFolder)
      .filter(file => /\.(png|jpg|jpeg)$/i.test(file)) 
      .map(file => `/themes/Space/Card/${file}`); 
  } catch (err) {
    console.error("Erreur lors de la lecture des images:", err);
  }

  let numberOfPairs = difficulty === "easy" ? 12 : difficulty === "medium" ? 18 : 24;

  if (imagePaths.length < numberOfPairs) {
    throw new Error("Pas assez d'images. Télécharge au moins " + numberOfPairs + " images uniques.");
  }

  const deck = shuffle([...imagePaths.slice(0, numberOfPairs), ...imagePaths.slice(0, numberOfPairs)]);
  return deck;
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

app.get('/start/:difficulty', (req, res) => {
  const { difficulty } = req.params;

  try {
    // Créer le deck avec les cartes retournées et non retournées
    gameState.cards = createDeck(difficulty).map(value => ({
      value,
      flipped: false,  // Ajoutez un état de retourné
      returned: false  // Ajoutez la colonne retourné_cartes
    }));

    // Ajout des informations de la carte (incluant le lien vers l'image SVG pour la carte retournée)
    gameState.cards.forEach((card, index) => {
      if (!card.flipped) {
        card.imageUrl = 'themes/Space/Card/Back_planet.svg';
      } else {
        // Ajoutez l'image correspondante si la carte est retournée
        card.imageUrl = card.value;
      }
    });

    gameState.flippedCards = [];
    gameState.scores = { 1: 0, 2: 0 };
    gameState.currentPlayer = 1;

    res.json(gameState);
  } catch (error) {
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

  card.flipped = true;
  gameState.flippedCards.push(index);

  if (gameState.flippedCards.length === 2) {
    const [index1, index2] = gameState.flippedCards;
    const card1 = gameState.cards[index1];
    const card2 = gameState.cards[index2];

    if (card1.value === card2.value) {
      gameState.scores[gameState.currentPlayer]++;
      gameState.flippedCards = [];
    } else {
      setTimeout(() => {
        gameState.cards[index1].flipped = false;
        gameState.cards[index2].flipped = false;
        gameState.flippedCards = [];
        gameState.currentPlayer = gameState.currentPlayer === 1 ? 2 : 1;
        givePowerIfNeeded();  // Ajout ici !
      }, 1000);
    }
  }

  res.json(gameState);
});


module.exports = app;
