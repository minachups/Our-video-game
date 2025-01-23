const express = require('express');
const { getAllParties, getPartieById, createPartie, updatePartie, deletePartie } = require('../controllers/gameController');

const router = express.Router();

router.get('/', getAllParties);
router.get('/:id', getPartieById);
router.post('/', createPartie);
router.put('/:id', updatePartie);
router.delete('/:id', deletePartie);

module.exports = router;
