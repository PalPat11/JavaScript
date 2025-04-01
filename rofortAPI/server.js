const express = require("express");
const sqlite3 = require("sqlite3").verbose();

const app = express();
const port = 3000;

// Connect to SQLite database
const db = new sqlite3.Database("./database.db", sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log("Connected to SQLite database.");
    }
});

// Middleware to parse JSON
app.use(express.json());

// Create a table if not exists
db.run(`CREATE TABLE IF NOT EXISTS wizards (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    wand_name TEXT UNIQUE NOT NULL,
    house_name TEXT UNIQUE NOT NULL
)`);



// Route to add a new user
app.post("/wizard", (req, res) => {
    const {id, name, wand_name, house_name } = req.body;
    db.run("INSERT INTO wizards (name, wand_name, house_name) VALUES (?, ?, ?)", [name, wand_name, house_name], function (err) {
        if (err) {
            res.status(400).json({ error: err.message });
        } else {
            res.json({ id: this.lastID, name, wand_name, house_name });
        }
    });
});

// Route to get all users
app.get("/wizard", (req, res) => {
    db.all("SELECT * FROM wizards", [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(rows);
        }
    });
});

app.get("/wizard/:id", (req, res)=>{
    const id = req.params.id;
    db.get("SELECT * FROM wizards WHERE id = ?", [id], (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else if (row) {
            res.json(row);
        } else {
            res.status(404).json({ error: "Wizard not found" });
        }
    });
    
})


app.put("/wizard/:id", async (req, res) => {
    const id = req.params.id;
    const { name, wand_name, house_name } = req.body;
    db.run("UPDATE wizards SET name = ?, wand_name = ?, house_name = ? WHERE id = ?", [name, wand_name, house_name, id], function (err) {
        if (err) {
            res.status(400).json({ error: err.message });
        } else {
            res.json({ name, wand_name, house_name });
        }
    });
});

app.delete("/wizard/:id", (req, res) => {
    const id = req.params.id;
    db.run("DELETE FROM wizards WHERE id = ?", [id], function (err) {
        if (err) {
            res.status(400).json({ error: err.message });
        } else {
            res.json({ message: "Wizard deleted successfully" });
        }
    });
});



// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
