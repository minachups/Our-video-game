const db = require("../config/db.js"); // Connexion à la base de données

// Récupérer toutes les parties
exports.getAllParties = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM Partie");
    res.json(rows);  // Retourne la liste des parties
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Récupérer une partie par ID
exports.getPartieById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query("SELECT * FROM Partie WHERE ID_score = ?", [id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: "Partie non trouvée" });
    }
    res.json(rows[0]);  // Retourne la partie
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Créer une nouvelle partie
exports.createPartie = async (req, res) => {
  const { ID_Theme } = req.body;  // On suppose que le thème est passé dans le corps de la requête
  try {
    const [result] = await db.query("INSERT INTO Partie (ID_Theme) VALUES (?)", [ID_Theme || null]);
    res.status(201).json({ id: result.insertId });  // Retourne l'ID de la nouvelle partie
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Mettre à jour une partie par ID
exports.updatePartie = async (req, res) => {
  const { id } = req.params;
  const { Terminé_score, Tour_Actuel, Valeur_score } = req.body;

  try {
    const [result] = await db.query(
      "UPDATE Partie SET Terminé_score = ?, Tour_Actuel = ?, Valeur_score = ? WHERE ID_score = ?",
      [Terminé_score, Tour_Actuel, Valeur_score, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Partie non trouvée" });
    }
    res.json({ message: "Partie mise à jour" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Supprimer une partie par ID
exports.deletePartie = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await db.query("DELETE FROM Partie WHERE ID_score = ?", [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Partie non trouvée" });
    }
    res.json({ message: "Partie supprimée" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
