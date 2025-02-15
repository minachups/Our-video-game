const mysql = require('mysql2');

const db = mysql.createConnection({
    host: process.env.HOST,
    user: 'root',
    password: process.env.PASSWORD,
    database: process.env.DATABASE_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

db.connect((err) => {
  if (err) {
    console.error("Erreur de connexion à la base de données :", err);
    return;
  }
  console.log("Connexion  à la base de données établie avec succès.");
});
// Promisify the pool query method for easier async/await usage
const promisedb = db.promise();

module.exports = promisedb;
