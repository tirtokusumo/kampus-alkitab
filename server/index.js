require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('./db.js');

const app = express();
app.use(cors());
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || 'kampusalkitabsecret2026';

// ============================================
// AUTHENTICATION MIDDLEWARE
// ============================================
const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).json({ error: 'No token provided' });
  
  jwt.verify(token.split(' ')[1], JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ error: 'Invalid token' });
    req.user = decoded;
    next();
  });
};

// ============================================
// AUTHENTICATION ROUTES
// ============================================
app.post('/api/auth/register', (req, res) => {
  const { name, email, password } = req.body;
  
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    
    const stmt = db.prepare('INSERT INTO users (name, email, password) VALUES (?, ?, ?)');
    const info = stmt.run(name, email, hash);
    res.status(201).json({ id: info.lastInsertRowid, name, email, role: 'user' });
  } catch (err) {
    if (err.message.includes('UNIQUE constraint failed')) {
      return res.status(400).json({ error: 'Email already exists' });
    }
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  const stmt = db.prepare('SELECT * FROM users WHERE email = ?');
  const user = stmt.get(email);
  
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  
  const token = jwt.sign({ id: user.id, email: user.email, role: user.role, name: user.name }, JWT_SECRET, { expiresIn: '7d' });
  res.json({ token, user: { id: user.id, email: user.email, role: user.role, name: user.name } });
});

app.get('/api/auth/me', authMiddleware, (req, res) => {
  const stmt = db.prepare('SELECT id, name, email, role FROM users WHERE id = ?');
  const user = stmt.get(req.user.id);
  res.json({ user });
});

// ============================================
// CMS PAGES ROUTES
// ============================================
// Ambil semua halaman
app.get('/api/cms/pages', (req, res) => {
  const stmt = db.prepare('SELECT * FROM cms_pages ORDER BY created_at DESC');
  const items = stmt.all();
  // Decode JSON blocks back to object
  items.forEach(item => { item.blocks = JSON.parse(item.blocks); });
  res.json(items);
});

// Ambil halaman spesifik
app.get('/api/cms/pages/:id', (req, res) => {
  const stmt = db.prepare('SELECT * FROM cms_pages WHERE id = ?');
  const item = stmt.get(req.params.id);
  if (!item) return res.status(404).json({ error: 'Page not found' });
  item.blocks = JSON.parse(item.blocks);
  res.json(item);
});

// Buat tulisan/halaman baru (Hanya Admin - kita sederhanakan authMiddleware untuk demo)
app.post('/api/cms/pages', authMiddleware, (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ error: 'Forbidden' });
  
  const { id, title, slug, status, blocks } = req.body;
  const pageId = id || 'page-' + Date.now();
  
  try {
    const stmt = db.prepare('INSERT INTO cms_pages (id, title, slug, status, blocks) VALUES (?, ?, ?, ?, ?)');
    stmt.run(pageId, title, slug, status || 'draft', JSON.stringify(blocks || []));
    res.status(201).json({ id: pageId, title, slug, status, blocks: blocks || [] });
  } catch(err) {
    res.status(500).json({ error: err.message });
  }
});

// Update halaman 
app.put('/api/cms/pages/:id', authMiddleware, (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ error: 'Forbidden' });
  
  const { title, slug, status, blocks } = req.body;
  try {
    // Kita gunakan COALESCE supaya kalau tak ada field yg dikirim, data lama bertahan
    let q = 'UPDATE cms_pages SET updated_at = CURRENT_TIMESTAMP';
    const params = [];
    if (title) { q += ', title = ?'; params.push(title); }
    if (slug) { q += ', slug = ?'; params.push(slug); }
    if (status) { q += ', status = ?'; params.push(status); }
    if (blocks) { q += ', blocks = ?'; params.push(JSON.stringify(blocks)); }
    
    q += ' WHERE id = ?';
    params.push(req.params.id);
    
    db.prepare(q).run(...params);
    res.json({ message: 'Page updated successfully' });
  } catch(err) {
    res.status(500).json({ error: err.message });
  }
});

// Hapus halaman
app.delete('/api/cms/pages/:id', authMiddleware, (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ error: 'Forbidden' });
  
  db.prepare('DELETE FROM cms_pages WHERE id = ?').run(req.params.id);
  res.json({ message: 'Page deleted' });
});


// ============================================
// CMS GLOBAL SETTINGS (Payload)
// ============================================
app.get('/api/cms/settings/:id', (req, res) => {
  const stmt = db.prepare('SELECT payload FROM site_settings WHERE id = ?');
  const record = stmt.get(req.params.id);
  if (!record) return res.json({ payload: null });
  res.json({ payload: JSON.parse(record.payload) });
});

app.post('/api/cms/settings/:id', authMiddleware, (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ error: 'Forbidden' });
  
  const { id } = req.params;
  const { payload } = req.body;
  
  const stmt = db.prepare('INSERT INTO site_settings (id, payload) VALUES (?, ?) ON CONFLICT(id) DO UPDATE SET payload = excluded.payload, updated_at = CURRENT_TIMESTAMP');
  stmt.run(id, JSON.stringify(payload));
  res.json({ message: 'Setting saved' });
});

// ============================================
// START SERVER
// ============================================
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log('-------------------------------------------');
  console.log(`✓ KAMPUS ALKITAB BACKEND ALIVE ON PORT ${PORT}`);
  console.log('-------------------------------------------');
});
