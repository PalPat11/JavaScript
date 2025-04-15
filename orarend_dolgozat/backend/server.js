
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const sqlite3 = require("sqlite3");
const path = require("path");

// Express app
const app = express();
const PORT = 3000;

// CORS engedélyezés
app.use(cors());
app.use(bodyParser.json());

// SQLite adatbázis inicializálása
const db = new sqlite3.Database(path.resolve(__dirname, 'schedule.db'), (err) => {
  if (err) {
    console.error('Hiba történt az adatbázis megnyitásakor:', err.message);
  } else {
    console.log('SQLite adatbázis kapcsolódva.');
  }
});

// Az adatbázis táblájának létrehozása (ha még nem létezik)
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS schedule (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    day TEXT,
    hour INTEGER,
    subject TEXT
  )`);
});

// Lekérés
app.get("/api/schedule", (req, res) => {
  const query = `SELECT * FROM schedule ORDER BY day, hour`;

  db.all(query, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    const schedule = {};

    rows.forEach(row => {
      if (!schedule[row.day]) schedule[row.day] = [];
      schedule[row.day].push({ id: row.id, hour: row.hour, subject: row.subject });
    });

    res.json(schedule);
  });
});

// Új óra hozzáadása
app.post("/api/schedule", (req, res) => {
  const { day, hour, subject } = req.body;

  const query = `INSERT INTO schedule (day, hour, subject) VALUES (?, ?, ?)`;
  db.run(query, [day, hour, subject], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ message: "Óra hozzáadva", id: this.lastID });
  });
});

// Óra törlése
app.delete("/api/schedule/:id", (req, res) => {
  const { id } = req.params;

  const query = `DELETE FROM schedule WHERE id = ?`;
  db.run(query, [id], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ message: "Nincs ilyen óra" });
    }
    res.json({ message: "Óra törölve" });
  });
});




// Indítja a szervert
app.listen(PORT, () => {
  console.log(`Szerver fut: http://localhost:${PORT}`);
});
