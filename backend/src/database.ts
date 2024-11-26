import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

// Initialize SQLite database
export const initializeDatabase = async () => {
  const db = await open({
    filename: './alerts.db',
    driver: sqlite3.Database,
  });

  // Create table
  await db.exec(`
    CREATE TABLE IF NOT EXISTS alerts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      age INTEGER NOT NULL,
      fileUrl TEXT
    );
  `);

  return db;
};
