const db = require('../config/db');

// Récupérer tous les tours d'une partie
const getAllToursByPartie = async (req, res) => {
  const { id } = req.params; // ID de la partie
  try {
    const [rows] = await db.query(
      'SELECT * FROM Tour WHERE ID_score = ? ORDER BY Num_Tour',
      [id]
    );
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Créer un nouveau tour
const createTour = async (req, res) => {
  const { ID_score, ID_Joueur, Num_Tour } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO Tour (ID_score, ID_Joueur, Num_Tour) VALUES (?, ?, ?)',
      [ID_score, ID_Joueur, Num_Tour]
    );
    res.status(201).json({ message: 'Tour créé', id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Enregistrer une paire trouvée par un joueur
const enregistrerPaire = async (req, res) => {
  const { ID_Tour, ID_Joueur, Carte1_ID, Carte2_ID, Points } = req.body;
  try {
    // Ajouter les cartes trouvées dans la table Paire
    await db.query(
      'INSERT INTO Paire (ID_Tour, ID_Joueur, Carte1_ID, Carte2_ID) VALUES (?, ?, ?, ?)',
      [ID_Tour, ID_Joueur, Carte1_ID, Carte2_ID]
    );

    // Mettre à jour les points gagnés pour ce tour
    await db.query(
      'UPDATE Tour SET Points_Gagnes = Points_Gagnes + ? WHERE ID_Tour = ?',
      [Points, ID_Tour]
    );

    // Mettre à jour le score du joueur dans la partie
    const [partie] = await db.query(
      'SELECT ID_score FROM Tour WHERE ID_Tour = ?',
      [ID_Tour]
    );

    await db.query(
      'UPDATE Participe SET Score_Joueur = Score_Joueur + ? WHERE ID_Joueur = ? AND ID_score = ?',
      [Points, ID_Joueur, partie[0].ID_score]
    );

    res.status(200).json({ message: 'Paire enregistrée et points mis à jour' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Terminer un tour (optionnel, pour changer l'état du tour)
const terminerTour = async (req, res) => {
  const { id } = req.params; // ID du tour
  try {
    // Marquer le tour comme terminé (si vous voulez ajouter un champ terminé dans le futur)
    res.status(200).json({ message: 'Tour terminé' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllToursByPartie,
  createTour,
  enregistrerPaire,
  terminerTour,
};
