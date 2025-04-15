const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const db = new sqlite3.Database('database.db', (err) => {
  if (err) return console.error(err.message);
  console.log('✅ Kapcsolódva az SQLite adatbázishoz.');
});

db.run(`
  CREATE TABLE IF NOT EXISTS albums (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    band TEXT NOT NULL,
    title TEXT NOT NULL,
    year INTEGER,
    genre TEXT
  )
`);

app.get('/api/albums', (req, res) => {
  db.all('SELECT * FROM albums', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post('/api/albums', (req, res) => {
  const { band, title, year, genre } = req.body;
  db.run(
    'INSERT INTO albums (band, title, year, genre) VALUES (?, ?, ?, ?)',
    [band, title, year, genre],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: this.lastID });
    }
  );
});

app.get('/api/albums/:id', (req, res) => {
  db.get('SELECT * FROM albums WHERE id = ?', [req.params.id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Album nem található' });
    res.json(row);
  });
});

app.put('/api/albums/:id', (req, res) => {
  const { band, title, year, genre } = req.body;
  db.run(
    `UPDATE albums SET band = ?, title = ?, year = ?, genre = ? WHERE id = ?`,
    [band, title, year, genre, req.params.id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      if (this.changes === 0)
        return res.status(404).json({ error: 'Album nem található' });
      res.json({ updated: this.changes });
    }
  );
});

app.delete('/api/albums/:id', (req, res) => {
  db.run('DELETE FROM albums WHERE id = ?', [req.params.id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0)
      return res.status(404).json({ error: 'Album nem található' });
    res.json({ deleted: this.changes });
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Szerver fut a http://localhost:${PORT} címen`);
});
