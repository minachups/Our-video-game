const express = require('express');
const { loadCards } = require('../../db/db-queries');

const router = express.Router();

router.get('/', async (req, res) => {
  const cards = await loadCards();
  res.json(cards);
});

module.exports = router;
