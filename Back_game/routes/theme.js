const express = require('express');
const { getAllThemes, getThemeById, createTheme, updateTheme, deleteTheme } = require('../controllers/themeController');
const router = express.Router();

// Routes pour les thèmes
router.get('/', getAllThemes);
router.get('/:id', getThemeById);
router.post('/', createTheme);
router.put('/:id', updateTheme);
router.delete('/:id', deleteTheme);

module.exports = router;
