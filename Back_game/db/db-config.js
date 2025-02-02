const mariadb = require('mariadb');
require('dotenv').config();

// Créer un pool de connexions
const pool = mariadb.createPool({
  host: process.env.HOST,  
  user: 'root',    
  password: process.env.PASSWORD, 
  database: process.env.DATABASE_NAME, 
  waitForConnections: true,
  connectionLimit: 5,
  acquireTimeout: 20000, // Augmente le délai avant timeout
  connectTimeout: 20000,// Augmente le délai pour établir la connexion
  queueLimit: 0
});

// Fonction pour obtenir une connexion
async function getConnection() {
  try {
    const conn = await pool.getConnection();
    console.log("✅ Connexion réussie à MariaDB !");
    return conn;
  } catch (err) {
    console.error("❌ Erreur de connexion à MariaDB:", err);
    throw err;
  }
}

module.exports = { pool, getConnection };