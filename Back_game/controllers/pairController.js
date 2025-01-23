const db = require('../config/db.js'); // Connexion à la base de données

// Récupérer toutes les paires d'un tour
exports.getAllPaires = async (req, res) => {
  const { tourId } = req.params;
  try {
    const [rows] = await db.query('SELECT * FROM Paire WHERE ID_Tour = ?', [tourId]);
    res.json(rows);  // Retourner toutes les paires d'un tour
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Récupérer une paire par son ID
exports.getPaireById = async (req, res) => {
  const { tourId, paireId } = req.params;
  try {
    const [rows] = await db.query('SELECT * FROM Paire WHERE ID_Tour = ? AND ID_Paire = ?', [tourId, paireId]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Paire non trouvée' });
    }
    res.json(rows[0]);  // Retourner la paire
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Créer une nouvelle paire
exports.createPaire = async (req, res) => {
  const { tourId } = req.params;
  const { ID_Joueur, Carte1_ID, Carte2_ID } = req.body;
  try {
    const [result] = await db.query('INSERT INTO Paire (ID_Tour, ID_Joueur, Carte1_ID, Carte2_ID) VALUES (?, ?, ?, ?)', [tourId, ID_Joueur, Carte1_ID, Carte2_ID]);
    res.status(201).json({ id: result.insertId });  // Retourner l'ID de la nouvelle paire
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Supprimer une paire
exports.deletePaire = async (req, res) => {
  const { tourId, paireId } = req.params;
  try {
    const [result] = await db.query('DELETE FROM Paire WHERE ID_Tour = ? AND ID_Paire = ?', [tourId, paireId]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Paire non trouvée' });
    }
    res.json({ message: 'Paire supprimée' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
