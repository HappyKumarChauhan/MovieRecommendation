const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./movies.db', (err) => {
    if (err) console.error("Error opening database", err);
});

db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS recommendations (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_input TEXT,
            recommended_movies TEXT,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);
});

module.exports = db;