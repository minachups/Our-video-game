const express = require('express');
const app = express.Router();
const pool = require('../config/db.js'); 

async function getPowersFromDB() {
    try {
        const [rows] = await pool.execute('SELECT Nom_Pouvoir, Description_Pouvoir, Image_Pouvoir FROM Pouvoir');
        return rows;
    } catch (error) {
        console.error('Erreur lors de la récupération des pouvoirs :', error);
        throw error;
    }
}

module.exports = { getPowersFromDB };