const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.join(__dirname, 'web_03mb.db');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Erro ao abrir o banco:', err.message);
    process.exit(1);
  }
});

const initSql = `
CREATE TABLE IF NOT EXISTS products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  price REAL NOT NULL DEFAULT 0,
  description TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
`;

db.serialize(() => {
  db.run(initSql, (err) => {
    if (err) console.error('Erro criando tabela products:', err.message);
  });
});

module.exports = db;
