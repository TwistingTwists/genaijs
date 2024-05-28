// helpers.js
const sqlite3 = require('better-sqlite3');

// Database schema
const createTableSql = `
  CREATE TABLE IF NOT EXISTS conversations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    image_path TEXT NOT NULL,
    prompt TEXT NOT NULL,
    response TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`;

// Function to create the database and table
async function createDatabase(dbPath) {
  const db = new sqlite3(dbPath);
  db.exec(createTableSql);
  return db;
}

// Function to store a conversation in the database
async function storeConversation(db, imagePath, prompt, response) {
  const sql = 'INSERT INTO conversations (image_path, prompt, response) VALUES (?, ?, ?)';
  db.prepare(sql).run(imagePath, prompt, response);
}

// Function to retrieve the last 10 conversation records for a given image path
async function getConversationHistory(db, imagePath) {
  const sql = 'SELECT prompt, response FROM conversations WHERE image_path = ? ORDER BY created_at DESC LIMIT 10';
  return db.prepare(sql).all(imagePath);
}

module.exports = {
  createDatabase,
  storeConversation,
  getConversationHistory,
};