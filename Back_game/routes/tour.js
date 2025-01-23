const express = require('express');
const { getAllTours, getTourById, createTour, updateTour, deleteTour } = require('../controllers/tourControlleur.js');

const router = express.Router();

// Récupérer tous les tours
router.get('/:partieId', getAllTours);

// Récupérer un tour spécifique par ID
router.get('/:partieId/:tourId', getTourById);

// Créer un nouveau tour
router.post('/:partieId', createTour);

// Mettre à jour un tour
router.put('/:partieId/:tourId', updateTour);

// Supprimer un tour
router.delete('/:partieId/:tourId', deleteTour);

module.exports = router;
