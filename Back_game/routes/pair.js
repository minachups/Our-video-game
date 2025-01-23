const express = require('express');
const { getAllPaires, getPaireById, createPaire, deletePaire } = require('../controllers/pairController');

const router = express.Router();

// Récupérer toutes les paires d'un tour
router.get('/:tourId', getAllPaires);

// Récupérer une paire spécifique par ID
router.get('/:tourId/:paireId', getPaireById);

// Créer une nouvelle paire
router.post('/:tourId', createPaire);

// Supprimer une paire
router.delete('/:tourId/:paireId', deletePaire);

module.exports = router;
