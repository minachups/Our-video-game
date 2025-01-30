const db = require('../config/db');

// Récupérer toutes les parties
const getAllParties = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM Partie');
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Récupérer une partie par ID
const getPartieById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query('SELECT * FROM Partie WHERE ID_score = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Partie non trouvée' });
    }
    res.status(200).json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Créer une nouvelle partie
const createPartie = async (req, res) => {
  const { Valeur_score, date_Début_score, date_Fin_score, Terminé_score } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO Partie (Valeur_score, date_Début_score, date_Fin_score, Terminé_score) VALUES (?, ?, ?, ?)',
      [Valeur_score || 0, date_Début_score || new Date(), date_Fin_score || null, Terminé_score || false]
    );
    res.status(201).json({ message: 'Partie créée', id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Mettre à jour une partie
const updatePartie = async (req, res) => {
  const { id } = req.params;
  const { Valeur_score, date_Début_score, date_Fin_score, Terminé_score } = req.body;
  try {
    await db.query(
      'UPDATE Partie SET Valeur_score = ?, date_Début_score = ?, date_Fin_score = ?, Terminé_score = ? WHERE ID_score = ?',
      [Valeur_score, date_Début_score, date_Fin_score, Terminé_score, id]
    );
    res.status(200).json({ message: 'Partie mise à jour' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Supprimer une partie
const deletePartie = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM Partie WHERE ID_score = ?', [id]);
    res.status(200).json({ message: 'Partie supprimée' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllParties,
  getPartieById,
  createPartie,
  updatePartie,
  deletePartie,
};
