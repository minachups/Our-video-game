const express = require('express');
const { getAllPouvoirs, getPouvoirById, createPouvoir, updatePouvoir, deletePouvoir } = require('../controllers/pouvoirController');

const router = express.Router();

router.get('/', getAllPouvoirs);
router.get('/:id', getPouvoirById);
router.post('/', createPouvoir);
router.put('/:id', updatePouvoir);
router.delete('/:id', deletePouvoir);

module.exports = router;
