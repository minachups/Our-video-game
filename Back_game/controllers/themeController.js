const db = require('../config/database');

// Récupérer tous les thèmes
exports.getAllThemes = async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM themes');
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};

// Récupérer un thème par ID
exports.getThemeById = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await db.execute('SELECT * FROM themes WHERE theme_id = ?', [id]);
        if (rows.length > 0) {
            res.json(rows[0]);
        } else {
            res.status(404).json({ message: 'Thème non trouvé' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};

// Créer un nouveau thème
exports.createTheme = async (req, res) => {
    const { theme_name, theme_description, theme_card_design, theme_avatar_design } = req.body;
    try {
        const [result] = await db.execute(
            'INSERT INTO themes (theme_name, theme_description, theme_card_design, theme_avatar_design) VALUES (?, ?, ?, ?)',
            [theme_name, theme_description, theme_card_design, theme_avatar_design]
        );
        res.status(201).json({ message: 'Thème créé', themeId: result.insertId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};

// Mettre à jour un thème
exports.updateTheme = async (req, res) => {
    const { id } = req.params;
    const { theme_name, theme_description, theme_card_design, theme_avatar_design } = req.body;
    try {
        const [result] = await db.execute(
            'UPDATE themes SET theme_name = ?, theme_description = ?, theme_card_design = ?, theme_avatar_design = ? WHERE theme_id = ?',
            [theme_name, theme_description, theme_card_design, theme_avatar_design, id]
        );
        if (result.affectedRows > 0) {
            res.json({ message: 'Thème mis à jour' });
        } else {
            res.status(404).json({ message: 'Thème non trouvé' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};

// Supprimer un thème
exports.deleteTheme = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await db.execute('DELETE FROM themes WHERE theme_id = ?', [id]);
        if (result.affectedRows > 0) {
            res.json({ message: 'Thème supprimé' });
        } else {
            res.status(404).json({ message: 'Thème non trouvé' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};
