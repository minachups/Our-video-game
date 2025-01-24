const express = require('express');
const { getAllPowers, getPowerById, createPower, updatePower, deletePower } = require('../controllers/powerController');
const router = express.Router();

// Routes pour les pouvoirs
router.get('/', getAllPowers);
router.get('/:id', getPowerById);
router.post('/', createPower);
router.put('/:id', updatePower);
router.delete('/:id', deletePower);

module.exports = router;
