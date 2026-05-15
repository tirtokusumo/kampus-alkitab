import { useState } from 'react';
import {
  Plus, Trash2, X, Check, Image, Link as LinkIcon, Copy, Search, ExternalLink, Grid, List
} from 'lucide-react';
import { useCms } from '../../cms/CmsContext';
import AdminLayout from './AdminLayout';
import './MediaManager.css';

const MediaManager = () => {
  const { media, addMedia, deleteMedia } = useCms();
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: '', url: '', type: 'image' });
  const [search, setSearch] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [toast, setToast] = useState(null);
  const [copiedId, setCopiedId] = useState(null);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleAdd = () => {
    if (!form.name.trim() || !form.url.trim()) {
      showToast('Nama dan URL harus diisi', 'error');
      return;
    }
    addMedia(form);
    setShowModal(false);
    setForm({ name: '', url: '', type: 'image' });
    showToast('Media berhasil ditambahkan!');
  };

  const handleDelete = (item) => {
    if (window.confirm(`Hapus "${item.name}"?`)) {
      deleteMedia(item.id);
      showToast('Media dihapus', 'info');
    }
  };

  const copyUrl = (item) => {
    navigator.clipboard.writeText(item.url).then(() => {
      setCopiedId(item.id);
      showToast('URL disalin ke clipboard!');
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  const filtered = media.filter(m =>
    m.name.toLowerCase().includes(search.toLowerCase())
  );

  const isImage = (url) => {
    return /\.(jpg|jpeg|png|gif|webp|svg|avif)(\?|$)/i.test(url);
  };

  return (
    <AdminLayout title="Media Manager">
      {/* Header */}
      <div className="mm-header">
        <div className="mm-header-left">
          <div className="mm-search">
            <Search size={16} />
            <input
              placeholder="Cari media..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div className="mm-view-toggle">
            <button className={viewMode === 'grid' ? 'active' : ''} onClick={() => setViewMode('grid')} aria-label="Grid view">
              <Grid size={16} />
            </button>
            <button className={viewMode === 'list' ? 'active' : ''} onClick={() => setViewMode('list')} aria-label="List view">
              <List size={16} />
            </button>
          </div>
        </div>
        <button className="admin-btn admin-btn-primary" onClick={() => setShowModal(true)}>
          <Plus size={16} /> Tambah Media
        </button>
      </div>

      <p style={{ color: '#64748b', fontSize: '0.85rem', marginBottom: 20 }}>
        Total: <strong>{media.length}</strong> media · Ditampilkan: <strong>{filtered.length}</strong>
      </p>

      {/* Grid / List */}
      {filtered.length === 0 ? (
        <div className="mm-empty">
          <Image size={48} />
          <h3>Belum ada media</h3>
          <p>Klik "Tambah Media" untuk menambahkan URL gambar atau file.</p>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="mm-grid">
          {filtered.map(item => (
            <div key={item.id} className="mm-card">
              <div className="mm-card-preview">
                {isImage(item.url) ? (
                  <img src={item.url} alt={item.name} className="mm-card-img" />
                ) : (
                  <div className="mm-card-file">
                    <LinkIcon size={32} />
                    <span>{item.type}</span>
                  </div>
                )}
              </div>
              <div className="mm-card-body">
                <div className="mm-card-name">{item.name}</div>
                <div className="mm-card-actions">
                  <button onClick={() => copyUrl(item)} title="Salin URL" className={copiedId === item.id ? 'copied' : ''}>
                    {copiedId === item.id ? <Check size={14} /> : <Copy size={14} />}
                  </button>
                  <a href={item.url} target="_blank" rel="noopener noreferrer" title="Buka URL">
                    <ExternalLink size={14} />
                  </a>
                  <button onClick={() => handleDelete(item)} className="danger" title="Hapus">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="admin-card" style={{ padding: 0 }}>
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Preview</th>
                  <th>Nama</th>
                  <th>Tipe</th>
                  <th>URL</th>
                  <th style={{ textAlign: 'right' }}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(item => (
                  <tr key={item.id}>
                    <td>
                      {isImage(item.url) ? (
                        <img src={item.url} alt={item.name} style={{ width: 48, height: 48, objectFit: 'cover', borderRadius: 6 }} />
                      ) : (
                        <div style={{ width: 48, height: 48, background: '#f1f5f9', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <LinkIcon size={18} color="#94a3b8" />
                        </div>
                      )}
                    </td>
                    <td style={{ fontWeight: 600 }}>{item.name}</td>
                    <td><span className="admin-badge">{item.type}</span></td>
                    <td><span className="slug-cell" style={{ maxWidth: 200, display: 'inline-block', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.url}</span></td>
                    <td>
                      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 6 }}>
                        <button className="admin-btn-icon" onClick={() => copyUrl(item)} title="Salin URL">
                          {copiedId === item.id ? <Check size={14} /> : <Copy size={14} />}
                        </button>
                        <button className="admin-btn-icon danger" onClick={() => handleDelete(item)} title="Hapus">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add Modal */}
      {showModal && (
        <div className="admin-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="admin-modal" onClick={e => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3 className="admin-modal-title">➕ Tambah Media</h3>
              <button className="admin-btn-icon" onClick={() => setShowModal(false)}><X size={16} /></button>
            </div>
            <div className="admin-modal-body">
              <div className="admin-form-group">
                <label className="admin-form-label">Nama</label>
                <input
                  className="admin-input"
                  placeholder="Contoh: Hero Background"
                  value={form.name}
                  onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>
              <div className="admin-form-group">
                <label className="admin-form-label">URL</label>
                <input
                  className="admin-input"
                  placeholder="https://images.unsplash.com/..."
                  value={form.url}
                  onChange={e => setForm(prev => ({ ...prev, url: e.target.value }))}
                />
                <div className="admin-form-hint">Paste URL gambar dari Unsplash, Cloudinary, atau sumber lain</div>
              </div>
              <div className="admin-form-group">
                <label className="admin-form-label">Tipe</label>
                <select
                  className="admin-select"
                  value={form.type}
                  onChange={e => setForm(prev => ({ ...prev, type: e.target.value }))}
                >
                  <option value="image">Image</option>
                  <option value="video">Video</option>
                  <option value="document">Document</option>
                  <option value="audio">Audio</option>
                </select>
              </div>
              {form.url && isImage(form.url) && (
                <div className="mm-preview-box">
                  <label className="admin-form-label">Preview</label>
                  <img src={form.url} alt="Preview" className="mm-preview-img" />
                </div>
              )}
            </div>
            <div className="admin-modal-footer">
              <button className="admin-btn admin-btn-secondary" onClick={() => setShowModal(false)}>Batal</button>
              <button className="admin-btn admin-btn-primary" onClick={handleAdd}>
                <Check size={16} /> Simpan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && <div className={`admin-toast ${toast.type}`}>{toast.msg}</div>}
    </AdminLayout>
  );
};

export default MediaManager;
