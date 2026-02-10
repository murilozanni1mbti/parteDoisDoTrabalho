const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Rotas API
app.get('/api/products', (req, res) => {
  db.all('SELECT * FROM products ORDER BY id DESC', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post('/api/products', (req, res) => {
  console.log('POST /api/products body:', req.body);
  const { name, price, description } = req.body;
  if (!name || typeof name !== 'string') {
    return res.status(400).json({ error: 'Nome é obrigatório' });
  }
  const stmt = db.prepare('INSERT INTO products (name, price, description) VALUES (?, ?, ?)');
  stmt.run(name, price || 0, description || '', function (err) {
    if (err) return res.status(500).json({ error: err.message });
    db.get('SELECT * FROM products WHERE id = ?', [this.lastID], (err2, row) => {
      if (err2) return res.status(500).json({ error: err2.message });
      res.status(201).json(row);
    });
  });
  stmt.finalize();
});

// Servir frontend estático (pasta ../frontend)
const frontendPath = path.join(__dirname, '..', 'frontend');
app.use(express.static(frontendPath));

// Rota padrão para a raiz
app.get('/', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
