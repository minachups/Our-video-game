const express = require('express');
const { loadPowers } = require('../../db/db-queries');

const router = express.Router();

router.get('/', async (req, res) => {
  const powers = await loadPowers();
  res.json(powers);
});

module.exports = router;
