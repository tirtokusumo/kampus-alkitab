const Database = require('better-sqlite3');
const path = require('path');
const bcrypt = require('bcryptjs');

// Menghubungkan ke file SQLite di dalam folder server (kampus_alkitab.db)
const dbPath = path.resolve(__dirname, 'kampus_alkitab.db');
const db = new Database(dbPath, { verbose: console.log });

// Menginisialisasi Tabel Database
const initDatabase = () => {
  // Tabel Users (Role: user / admin)
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      role TEXT DEFAULT 'user',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Tabel CMS Pages
  db.exec(`
    CREATE TABLE IF NOT EXISTS cms_pages (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      status TEXT DEFAULT 'draft',
      blocks TEXT DEFAULT '[]',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Tabel Web Settings
  db.exec(`
    CREATE TABLE IF NOT EXISTS site_settings (
      id TEXT PRIMARY KEY,
      payload TEXT NOT NULL,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  console.log('Database tables successfully initialized.');

  // Buat default superadmin jika belum ada
  const stmt = db.prepare('SELECT id FROM users WHERE email = ?');
  const adminExists = stmt.get('admin@kampusalkitab.com');

  if (!adminExists) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync('admin123', salt);
    
    db.prepare('INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)').run(
      'Super Admin',
      'admin@kampusalkitab.com',
      hash,
      'admin'
    );
    console.log('Default superadmin created: admin@kampusalkitab.com (admin123)');
  }
};

initDatabase();

module.exports = db;
