const db = require('../config/database'); // Assure-toi que ta connexion à la base est bien configurée

// Récupérer tous les pouvoirs
exports.getAllPowers = async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM Pouvoir');
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};

// Récupérer un pouvoir par ID
exports.getPowerById = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await db.execute('SELECT * FROM Pouvoir WHERE ID_Pouvoir = ?', [id]);
        if (rows.length > 0) {
            res.json(rows[0]);
        } else {
            res.status(404).json({ message: 'Pouvoir non trouvé' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};

// Créer un nouveau pouvoir
exports.createPower = async (req, res) => {
    const { Nom_Pouvoir, Description_Pouvoir, FlushTiles_Pouvoir, TilesToFlush_Pouvoir, Bomb_Pouvoir, BombNumber_Pouvoir, Retourne_Pouvoir, RetourneNumber_Pouvoir, VisibilitéJoueur_Pouvoir, VisibilitéJoueurTour_Pouvoir, CacheAdversaire_Pouvoir, BloqueCartes_Pouvoir, BloqueCarteTour_Pouvoir, TourSupp_Pouvoir, Joker_Pouvoir, LoosePair_Pouvoir, LoosePairNumber_Pouvoir, WinPair_Pouvoir, WinPairNumber_Pouvoir, Ange_Pouvoir, Fireball_Pouvoir, FireballNumber_Pouvoir } = req.body;

    try {
        const [result] = await db.execute(
            `INSERT INTO Pouvoir (Nom_Pouvoir, Description_Pouvoir, FlushTiles_Pouvoir, TilesToFlush_Pouvoir, Bomb_Pouvoir, BombNumber_Pouvoir, Retourne_Pouvoir, RetourneNumber_Pouvoir, VisibilitéJoueur_Pouvoir, VisibilitéJoueurTour_Pouvoir, CacheAdversaire_Pouvoir, BloqueCartes_Pouvoir, BloqueCarteTour_Pouvoir, TourSupp_Pouvoir, Joker_Pouvoir, LoosePair_Pouvoir, LoosePairNumber_Pouvoir, WinPair_Pouvoir, WinPairNumber_Pouvoir, Ange_Pouvoir, Fireball_Pouvoir, FireballNumber_Pouvoir) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [Nom_Pouvoir, Description_Pouvoir, FlushTiles_Pouvoir, TilesToFlush_Pouvoir, Bomb_Pouvoir, BombNumber_Pouvoir, Retourne_Pouvoir, RetourneNumber_Pouvoir, VisibilitéJoueur_Pouvoir, VisibilitéJoueurTour_Pouvoir, CacheAdversaire_Pouvoir, BloqueCartes_Pouvoir, BloqueCarteTour_Pouvoir, TourSupp_Pouvoir, Joker_Pouvoir, LoosePair_Pouvoir, LoosePairNumber_Pouvoir, WinPair_Pouvoir, WinPairNumber_Pouvoir, Ange_Pouvoir, Fireball_Pouvoir, FireballNumber_Pouvoir]
        );
        res.status(201).json({ message: 'Pouvoir créé', powerId: result.insertId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};

// Mettre à jour un pouvoir
exports.updatePower = async (req, res) => {
    const { id } = req.params;
    const { Nom_Pouvoir, Description_Pouvoir, FlushTiles_Pouvoir, TilesToFlush_Pouvoir, Bomb_Pouvoir, BombNumber_Pouvoir, Retourne_Pouvoir, RetourneNumber_Pouvoir, VisibilitéJoueur_Pouvoir, VisibilitéJoueurTour_Pouvoir, CacheAdversaire_Pouvoir, BloqueCartes_Pouvoir, BloqueCarteTour_Pouvoir, TourSupp_Pouvoir, Joker_Pouvoir, LoosePair_Pouvoir, LoosePairNumber_Pouvoir, WinPair_Pouvoir, WinPairNumber_Pouvoir, Ange_Pouvoir, Fireball_Pouvoir, FireballNumber_Pouvoir } = req.body;

    try {
        const [result] = await db.execute(
            `UPDATE Pouvoir SET 
            Nom_Pouvoir = ?, 
            Description_Pouvoir = ?, 
            FlushTiles_Pouvoir = ?, 
            TilesToFlush_Pouvoir = ?, 
            Bomb_Pouvoir = ?, 
            BombNumber_Pouvoir = ?, 
            Retourne_Pouvoir = ?, 
            RetourneNumber_Pouvoir = ?, 
            VisibilitéJoueur_Pouvoir = ?, 
            VisibilitéJoueurTour_Pouvoir = ?, 
            CacheAdversaire_Pouvoir = ?, 
            BloqueCartes_Pouvoir = ?, 
            BloqueCarteTour_Pouvoir = ?, 
            TourSupp_Pouvoir = ?, 
            Joker_Pouvoir = ?, 
            LoosePair_Pouvoir = ?, 
            LoosePairNumber_Pouvoir = ?, 
            WinPair_Pouvoir = ?, 
            WinPairNumber_Pouvoir = ?, 
            Ange_Pouvoir = ?, 
            Fireball_Pouvoir = ?, 
            FireballNumber_Pouvoir = ? 
            WHERE ID_Pouvoir = ?`,
            [Nom_Pouvoir, Description_Pouvoir, FlushTiles_Pouvoir, TilesToFlush_Pouvoir, Bomb_Pouvoir, BombNumber_Pouvoir, Retourne_Pouvoir, RetourneNumber_Pouvoir, VisibilitéJoueur_Pouvoir, VisibilitéJoueurTour_Pouvoir, CacheAdversaire_Pouvoir, BloqueCartes_Pouvoir, BloqueCarteTour_Pouvoir, TourSupp_Pouvoir, Joker_Pouvoir, LoosePair_Pouvoir, LoosePairNumber_Pouvoir, WinPair_Pouvoir, WinPairNumber_Pouvoir, Ange_Pouvoir, Fireball_Pouvoir, FireballNumber_Pouvoir, id]
        );
        if (result.affectedRows > 0) {
            res.json({ message: 'Pouvoir mis à jour' });
        } else {
            res.status(404).json({ message: 'Pouvoir non trouvé' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};

// Supprimer un pouvoir
exports.deletePower = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await db.execute('DELETE FROM Pouvoir WHERE ID_Pouvoir = ?', [id]);
        if (result.affectedRows > 0) {
            res.json({ message: 'Pouvoir supprimé' });
        } else {
            res.status(404).json({ message: 'Pouvoir non trouvé' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};
