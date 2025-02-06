require('dotenv').config();
const { getConnection } = require('./db/db-config');

async function testDB() {
  try {
    const conn = await getConnection();
    const rows = await conn.query("SELECT 1 as test"); 
    console.log("Résultat de la requête:", rows);
    conn.release(); 
  } catch (err) {
    console.error(err);
  }
}

testDB();
