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

// rota para deletar um produto pelo id
app.delete('/api/products/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    return res.status(400).json({ error: 'ID inválido' });
  }
  db.run('DELETE FROM products WHERE id = ?', [id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }
    res.json({ success: true });
  });
});

// rota para obter um produto pelo id
app.get('/api/products/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    return res.status(400).json({ error: 'ID inválido' });
  }
  db.get('SELECT * FROM products WHERE id = ?', [id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }
    res.json(row);
  });
});

// rota para atualizar um produto pelo id
app.put('/api/products/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    return res.status(400).json({ error: 'ID inválido' });
  }
  const { name, price, description } = req.body;
  if (!name || typeof name !== 'string') {
    return res.status(400).json({ error: 'Nome é obrigatório' });
  }
  const stmt = db.prepare('UPDATE products SET name = ?, price = ?, description = ? WHERE id = ?');
  stmt.run(name, price || 0, description || '', id, function (err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }
    db.get('SELECT * FROM products WHERE id = ?', [id], (err2, row) => {
      if (err2) return res.status(500).json({ error: err2.message });
      res.json(row);
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
