import { openDb } from './db';

export async function initializeDb() {
    const db = await openDb();
    await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      fullName TEXT,
      email TEXT UNIQUE,
      password TEXT,
      street TEXT,
      neighborhood TEXT,
      number TEXT,
      city TEXT,
      state TEXT,
      postalCode TEXT,
      resetToken TEXT
    )
  `);
}
