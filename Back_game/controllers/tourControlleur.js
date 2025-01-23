const db = require('../config/db.js'); // Connexion à la base de données

// Récupérer tous les tours d'une partie
exports.getAllTours = async (req, res) => {
  const { partieId } = req.params;
  try {
    const [rows] = await db.query('SELECT * FROM Tour WHERE ID_score = ?', [partieId]);
    res.json(rows);  // Retourner tous les tours de la partie
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Récupérer un tour par son ID
exports.getTourById = async (req, res) => {
  const { partieId, tourId } = req.params;
  try {
    const [rows] = await db.query('SELECT * FROM Tour WHERE ID_score = ? AND ID_Tour = ?', [partieId, tourId]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Tour non trouvé' });
    }
    res.json(rows[0]);  // Retourner le tour
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Créer un nouveau tour
exports.createTour = async (req, res) => {
  const { partieId } = req.params;
  const { ID_Joueur, Num_Tour, Points_Gagnes } = req.body;
  try {
    const [result] = await db.query('INSERT INTO Tour (ID_score, ID_Joueur, Num_Tour, Points_Gagnes) VALUES (?, ?, ?, ?)', [partieId, ID_Joueur, Num_Tour, Points_Gagnes]);
    res.status(201).json({ id: result.insertId });  // Retourner l'ID du nouveau tour
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Mettre à jour un tour
exports.updateTour = async (req, res) => {
  const { partieId, tourId } = req.params;
  const { Points_Gagnes } = req.body;
  try {
    const [result] = await db.query('UPDATE Tour SET Points_Gagnes = ? WHERE ID_score = ? AND ID_Tour = ?', [Points_Gagnes, partieId, tourId]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Tour non trouvé' });
    }
    res.json({ message: 'Tour mis à jour' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Supprimer un tour
exports.deleteTour = async (req, res) => {
  const { partieId, tourId } = req.params;
  try {
    const [result] = await db.query('DELETE FROM Tour WHERE ID_score = ? AND ID_Tour = ?', [partieId, tourId]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Tour non trouvé' });
    }
    res.json({ message: 'Tour supprimé' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
