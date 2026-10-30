const initSqlJs = require('sql.js');

let db = null;

const initializeDatabase = async () => {
  const SQL = await initSqlJs();
  
  // Try to load existing database from file
  try {
    const fs = require('fs');
    const dbPath = process.env.DB_PATH || './tasks.db';
    if (fs.existsSync(dbPath)) {
      const fileBuffer = fs.readFileSync(dbPath);
      db = new SQL.Database(fileBuffer);
    } else {
      db = new SQL.Database();
    }
  } catch (err) {
    db = new SQL.Database();
  }

  // Create tasks table
  db.run(`
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      status TEXT NOT NULL DEFAULT 'pending',
      dueDate TEXT,
      createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
      updatedAt TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Save to file
  saveDatabase();
  
  return db;
};

const saveDatabase = () => {
  if (!db) return;
  try {
    const fs = require('fs');
    const dbPath = process.env.DB_PATH || './tasks.db';
    const data = db.export();
    const buffer = Buffer.from(data);
    fs.writeFileSync(dbPath, buffer);
  } catch (err) {
    console.error('Error saving database:', err);
  }
};

const getDatabase = () => db;

module.exports = {
  initializeDatabase,
  getDatabase,
  saveDatabase
};