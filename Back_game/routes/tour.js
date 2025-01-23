const express = require('express');
const {
  getAllToursByPartie,
  createTour,
  enregistrerPaire,
  terminerTour,
} = require('../controllers/tourController');

const router = express.Router();

// Obtenir tous les tours pour une partie donnée
router.get('/partie/:id', getAllToursByPartie);

// Créer un nouveau tour
router.post('/', createTour);

// Enregistrer une paire trouvée par un joueur
router.post('/paire', enregistrerPaire);

// Terminer un tour
router.put('/:id/terminer', terminerTour);

module.exports = router;
