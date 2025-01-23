const express = require('express');
const { 
  getAllPouvoirs, 
  getPouvoirById, 
  createPouvoir, 
  updatePouvoir, 
  deletePouvoir 
} = require('../controllers/powerController');

const router = express.Router();

// Routes pour les pouvoirs
router.get('/', getAllPouvoirs);           // Récupérer tous les pouvoirs
router.get('/:id', getPouvoirById);       // Récupérer un pouvoir par ID
router.post('/', createPouvoir);          // Créer un pouvoir
router.put('/:id', updatePouvoir);       // Mettre à jour un pouvoir
router.delete('/:id', deletePouvoir);    // Supprimer un pouvoir

module.exports = router;
