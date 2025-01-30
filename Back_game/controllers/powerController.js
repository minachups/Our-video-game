const db = require('../config/db');

// Récupérer tous les pouvoirs
const getAllPouvoirs = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM Pouvoir');
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Récupérer un pouvoir par ID
const getPouvoirById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query('SELECT * FROM Pouvoir WHERE ID_Pouvoir = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Pouvoir non trouvé' });
    }
    res.status(200).json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Créer un nouveau pouvoir
const createPouvoir = async (req, res) => {
  const { Nom_Pouvoir, Description_Pouvoir, FlushTiles_Pouvoir, TilesToFlush_Pouvoir, Bomb_Pouvoir, BombNumber_Pouvoir } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO Pouvoir (Nom_Pouvoir, Description_Pouvoir, FlushTiles_Pouvoir, TilesToFlush_Pouvoir, Bomb_Pouvoir, BombNumber_Pouvoir) VALUES (?, ?, ?, ?, ?, ?)',
      [Nom_Pouvoir, Description_Pouvoir, FlushTiles_Pouvoir || false, TilesToFlush_Pouvoir || 0, Bomb_Pouvoir || false, BombNumber_Pouvoir || 0]
    );
    res.status(201).json({ message: 'Pouvoir créé', id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Mettre à jour un pouvoir
const updatePouvoir = async (req, res) => {
  const { id } = req.params;
  const { Nom_Pouvoir, Description_Pouvoir, FlushTiles_Pouvoir, TilesToFlush_Pouvoir, Bomb_Pouvoir, BombNumber_Pouvoir } = req.body;
  try {
    await db.query(
      'UPDATE Pouvoir SET Nom_Pouvoir = ?, Description_Pouvoir = ?, FlushTiles_Pouvoir = ?, TilesToFlush_Pouvoir = ?, Bomb_Pouvoir = ?, BombNumber_Pouvoir = ? WHERE ID_Pouvoir = ?',
      [Nom_Pouvoir, Description_Pouvoir, FlushTiles_Pouvoir, TilesToFlush_Pouvoir, Bomb_Pouvoir, BombNumber_Pouvoir, id]
    );
    res.status(200).json({ message: 'Pouvoir mis à jour' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Supprimer un pouvoir
const deletePouvoir = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM Pouvoir WHERE ID_Pouvoir = ?', [id]);
    res.status(200).json({ message: 'Pouvoir supprimé' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllPouvoirs,
  getPouvoirById,
  createPouvoir,
  updatePouvoir,
  deletePouvoir,
};
