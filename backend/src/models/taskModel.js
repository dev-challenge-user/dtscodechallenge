const { getDatabase, saveDatabase } = require('./database');

const TaskModel = {
  create: (title, description, status, dueDate) => {
    const db = getDatabase();
    if (!db) throw new Error('Database not initialized');
    
    const stmt = db.prepare(`
      INSERT INTO tasks (title, description, status, dueDate)
      VALUES (?, ?, ?, ?)
    `);
    stmt.run([title, description || null, status || 'pending', dueDate || null]);
    stmt.free();
    
    const lastId = db.exec('SELECT last_insert_rowid() as id')[0].values[0][0];
    saveDatabase();
    
    return { id: lastId, title, description, status: status || 'pending', dueDate };
  },

  findById: (id) => {
    const db = getDatabase();
    if (!db) throw new Error('Database not initialized');
    
    const stmt = db.prepare('SELECT * FROM tasks WHERE id = ?');
    stmt.bind([id]);
    
    if (stmt.step()) {
      const row = stmt.getAsObject();
      stmt.free();
      return row;
    }
    stmt.free();
    return null;
  },

  findAll: () => {
    const db = getDatabase();
    if (!db) throw new Error('Database not initialized');
    
    const results = [];
    const stmt = db.prepare('SELECT * FROM tasks ORDER BY createdAt DESC');
    
    while (stmt.step()) {
      results.push(stmt.getAsObject());
    }
    stmt.free();
    return results;
  },

  updateStatus: (id, status) => {
    const db = getDatabase();
    if (!db) throw new Error('Database not initialized');
    
    const stmt = db.prepare(`
      UPDATE tasks 
      SET status = ?, updatedAt = datetime('now') 
      WHERE id = ?
    `);
    stmt.run([status, id]);
    stmt.free();
    
    const changes = db.getRowsModified();
    saveDatabase();
    
    return { changes };
  },

  delete: (id) => {
    const db = getDatabase();
    if (!db) throw new Error('Database not initialized');
    
    const stmt = db.prepare('DELETE FROM tasks WHERE id = ?');
    stmt.run([id]);
    stmt.free();
    
    const changes = db.getRowsModified();
    saveDatabase();
    
    return { changes };
  }
};

module.exports = TaskModel;