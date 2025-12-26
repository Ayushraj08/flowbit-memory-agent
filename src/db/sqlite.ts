const Database = require("better-sqlite3");

export const db = new Database("memory.db");

export function initDB() {
  db.prepare(`
    CREATE TABLE IF NOT EXISTS vendor_memory (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      vendor TEXT,
      pattern TEXT,
      targetField TEXT,
      confidence REAL,
      usageCount INTEGER,
      lastUsedAt TEXT
    )
  `).run();

  db.prepare(`
    CREATE TABLE IF NOT EXISTS correction_memory (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      vendor TEXT,
      condition TEXT,
      action TEXT,
      confidence REAL,
      reinforcedCount INTEGER
    )
  `).run();

  db.prepare(`
    CREATE TABLE IF NOT EXISTS resolution_memory (
      memoryId INTEGER,
      approvedCount INTEGER,
      rejectedCount INTEGER
    )
  `).run();

  console.log("✅ SQLite initialized with memory tables");
}
