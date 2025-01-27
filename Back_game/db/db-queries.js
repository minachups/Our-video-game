const pool = require('./db-config');

// Charger les cartes depuis SQL
async function loadCards() {
  const connection = await pool.getConnection();
  const [rows] = await connection.execute('SELECT * FROM Carte');
  connection.release();
  return rows.map((row) => ({
    id: row.ID_Carte,
    image: row.Retourné_images,
    backImage: row.Dos_images,
    revealed: false,
    matched: false,
  }));
}

// Charger les pouvoirs depuis SQL
async function loadPowers() {
  const connection = await pool.getConnection();
  const [rows] = await connection.execute('SELECT * FROM Pouvoirs');
  connection.release();
  return rows.map((row) => ({
    id: row.ID_Pouvoir,
    name: row.Nom_Pouvoir,
    description: row.Description_Pouvoir,
  }));
}

module.exports = {
  loadCards,
  loadPowers,
};
