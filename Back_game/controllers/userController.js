const db = require('../config/database');

// Récupérer tous les utilisateurs
exports.getAllUsers = async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM users');
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};

// Récupérer un utilisateur par ID
exports.getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await db.execute('SELECT * FROM users WHERE user_id = ?', [id]);
        if (rows.length > 0) {
            res.json(rows[0]);
        } else {
            res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};

// Créer un nouvel utilisateur
exports.createUser = async (req, res) => {
    const { username, email, password_hash } = req.body;
    try {
        const [result] = await db.execute(
            'INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)',
            [username, email, password_hash]
        );
        res.status(201).json({ message: 'Utilisateur créé', userId: result.insertId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};

// Mettre à jour un utilisateur
exports.updateUser = async (req, res) => {
    const { id } = req.params;
    const { username, email, password_hash } = req.body;
    try {
        const [result] = await db.execute(
            'UPDATE users SET username = ?, email = ?, password_hash = ? WHERE user_id = ?',
            [username, email, password_hash, id]
        );
        if (result.affectedRows > 0) {
            res.json({ message: 'Utilisateur mis à jour' });
        } else {
            res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};

// Supprimer un utilisateur
exports.deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await db.execute('DELETE FROM users WHERE user_id = ?', [id]);
        if (result.affectedRows > 0) {
            res.json({ message: 'Utilisateur supprimé' });
        } else {
            res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};
