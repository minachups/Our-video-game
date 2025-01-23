const pool = require('../config/db.js');  // Assurez-vous de bien référencer votre fichier db.js ou votre gestion de base de données

// Récupérer tous les pouvoirs
const getAllPouvoirs = async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM Pouvoir');
    res.status(200).json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur du serveur' });
  }
};

// Récupérer un pouvoir par ID
const getPouvoirById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.execute('SELECT * FROM Pouvoir WHERE ID_Pouvoir = ?', [id]);
    if (rows.length > 0) {
      res.status(200).json(rows[0]);
    } else {
      res.status(404).json({ message: 'Pouvoir non trouvé' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur du serveur' });
  }
};

// Créer un pouvoir
const createPouvoir = async (req, res) => {
  const {
    Nom_Pouvoir,
    Description_Pouvoir,
    FlushTiles_Pouvoir,
    TilesToFlush_Pouvoir,
    Bomb_Pouvoir,
    BombNumber_Pouvoir,
    Retourne_Pouvoir,
    RetourneNumber_Pouvoir,
    VisibilitéJoueur_Pouvoir,
    VisibilitéJoueurTour_Pouvoir,
    CacheAdversaire_Pouvoir,
    BloqueCartes_Pouvoir,
    BloqueCarteTour_Pouvoir,
    TourSupp_Pouvoir,
    Joker_Pouvoir,
    LoosePair_Pouvoir,
    LoosePairNumber_Pouvoir,
    WinPair_Pouvoir,
    WinPairNumber_Pouvoir,
    Ange_Pouvoir,
    Fireball_Pouvoir,
    FireballNumber_Pouvoir
  } = req.body;

  try {
    const [result] = await pool.execute(
      'INSERT INTO Pouvoir (Nom_Pouvoir, Description_Pouvoir, FlushTiles_Pouvoir, TilesToFlush_Pouvoir, Bomb_Pouvoir, BombNumber_Pouvoir, Retourne_Pouvoir, RetourneNumber_Pouvoir, VisibilitéJoueur_Pouvoir, VisibilitéJoueurTour_Pouvoir, CacheAdversaire_Pouvoir, BloqueCartes_Pouvoir, BloqueCarteTour_Pouvoir, TourSupp_Pouvoir, Joker_Pouvoir, LoosePair_Pouvoir, LoosePairNumber_Pouvoir, WinPair_Pouvoir, WinPairNumber_Pouvoir, Ange_Pouvoir, Fireball_Pouvoir, FireballNumber_Pouvoir) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [
        Nom_Pouvoir,
        Description_Pouvoir,
        FlushTiles_Pouvoir,
        TilesToFlush_Pouvoir,
        Bomb_Pouvoir,
        BombNumber_Pouvoir,
        Retourne_Pouvoir,
        RetourneNumber_Pouvoir,
        VisibilitéJoueur_Pouvoir,
        VisibilitéJoueurTour_Pouvoir,
        CacheAdversaire_Pouvoir,
        BloqueCartes_Pouvoir,
        BloqueCarteTour_Pouvoir,
        TourSupp_Pouvoir,
        Joker_Pouvoir,
        LoosePair_Pouvoir,
        LoosePairNumber_Pouvoir,
        WinPair_Pouvoir,
        WinPairNumber_Pouvoir,
        Ange_Pouvoir,
        Fireball_Pouvoir,
        FireballNumber_Pouvoir
      ]
    );
    res.status(201).json({ message: 'Pouvoir créé', id: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur du serveur' });
  }
};

// Mettre à jour un pouvoir
const updatePouvoir = async (req, res) => {
  const { id } = req.params;
  const {
    Nom_Pouvoir,
    Description_Pouvoir,
    FlushTiles_Pouvoir,
    TilesToFlush_Pouvoir,
    Bomb_Pouvoir,
    BombNumber_Pouvoir,
    Retourne_Pouvoir,
    RetourneNumber_Pouvoir,
    VisibilitéJoueur_Pouvoir,
    VisibilitéJoueurTour_Pouvoir,
    CacheAdversaire_Pouvoir,
    BloqueCartes_Pouvoir,
    BloqueCarteTour_Pouvoir,
    TourSupp_Pouvoir,
    Joker_Pouvoir,
    LoosePair_Pouvoir,
    LoosePairNumber_Pouvoir,
    WinPair_Pouvoir,
    WinPairNumber_Pouvoir,
    Ange_Pouvoir,
    Fireball_Pouvoir,
    FireballNumber_Pouvoir
  } = req.body;

  try {
    const [result] = await pool.execute(
      'UPDATE Pouvoir SET Nom_Pouvoir = ?, Description_Pouvoir = ?, FlushTiles_Pouvoir = ?, TilesToFlush_Pouvoir = ?, Bomb_Pouvoir = ?, BombNumber_Pouvoir = ?, Retourne_Pouvoir = ?, RetourneNumber_Pouvoir = ?, VisibilitéJoueur_Pouvoir = ?, VisibilitéJoueurTour_Pouvoir = ?, CacheAdversaire_Pouvoir = ?, BloqueCartes_Pouvoir = ?, BloqueCarteTour_Pouvoir = ?, TourSupp_Pouvoir = ?, Joker_Pouvoir = ?, LoosePair_Pouvoir = ?, LoosePairNumber_Pouvoir = ?, WinPair_Pouvoir = ?, WinPairNumber_Pouvoir = ?, Ange_Pouvoir = ?, Fireball_Pouvoir = ?, FireballNumber_Pouvoir = ? WHERE ID_Pouvoir = ?',
      [
        Nom_Pouvoir,
        Description_Pouvoir,
        FlushTiles_Pouvoir,
        TilesToFlush_Pouvoir,
        Bomb_Pouvoir,
        BombNumber_Pouvoir,
        Retourne_Pouvoir,
        RetourneNumber_Pouvoir,
        VisibilitéJoueur_Pouvoir,
        VisibilitéJoueurTour_Pouvoir,
        CacheAdversaire_Pouvoir,
        BloqueCartes_Pouvoir,
        BloqueCarteTour_Pouvoir,
        TourSupp_Pouvoir,
        Joker_Pouvoir,
        LoosePair_Pouvoir,
        LoosePairNumber_Pouvoir,
        WinPair_Pouvoir,
        WinPairNumber_Pouvoir,
        Ange_Pouvoir,
        Fireball_Pouvoir,
        FireballNumber_Pouvoir,
        id
      ]
    );
    if (result.affectedRows > 0) {
      res.status(200).json({ message: 'Pouvoir mis à jour' });
    } else {
      res.status(404).json({ message: 'Pouvoir non trouvé' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur du serveur' });
  }
};

// Supprimer un pouvoir
const deletePouvoir = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.execute('DELETE FROM Pouvoir WHERE ID_Pouvoir = ?', [id]);
    if (result.affectedRows > 0) {
      res.status(200).json({ message: 'Pouvoir supprimé' });
    } else {
      res.status(404).json({ message: 'Pouvoir non trouvé' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur du serveur' });
  }
};

module.exports = {
  getAllPouvoirs,
  getPouvoirById,
  createPouvoir,
  updatePouvoir,
  deletePouvoir
};
