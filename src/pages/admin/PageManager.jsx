import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Pencil, Trash2, X, Check, FileText, ExternalLink, Layers } from 'lucide-react';
import { useCms } from '../../cms/CmsContext';
import AdminLayout from './AdminLayout';

const PageManager = () => {
  const { pages, addPage, updatePage, deletePage } = useCms();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [editingPage, setEditingPage] = useState(null);
  const [form, setForm] = useState({ title: '', slug: '', status: 'draft' });
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const openCreate = () => {
    setEditingPage(null);
    setForm({ title: '', slug: '', status: 'draft' });
    setShowModal(true);
  };

  const openEdit = (page) => {
    setEditingPage(page);
    setForm({ title: page.title, slug: page.slug, status: page.status });
    setShowModal(true);
  };

  const handleSave = () => {
    if (!form.title.trim() || !form.slug.trim()) {
      showToast('Judul dan Slug harus diisi', 'error');
      return;
    }
    if (editingPage) {
      updatePage(editingPage.id, form);
      showToast('Halaman berhasil diupdate!');
    } else {
      addPage(form);
      showToast('Halaman baru ditambahkan!');
    }
    setShowModal(false);
  };

  const handleDelete = (page) => {
    if (window.confirm(`Hapus halaman "${page.title}"?`)) {
      deletePage(page.id);
      showToast('Halaman dihapus', 'info');
    }
  };

  const autoSlug = (title) => {
    return '/' + title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  return (
    <AdminLayout title="Page Manager">
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
        <p style={{ color: '#64748b', fontSize: '0.9rem' }}>
          Kelola semua halaman website. Total: <strong>{pages.length}</strong> halaman.
        </p>
        <button className="admin-btn admin-btn-primary" onClick={openCreate}>
          <Plus size={16} /> Tambah Halaman
        </button>
      </div>

      {/* Table */}
      <div className="admin-card" style={{ padding: 0 }}>
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Judul</th>
                <th>Slug / URL</th>
                <th>Status</th>
                <th>Dibuat</th>
                <th style={{ textAlign: 'right' }}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {pages.length === 0 ? (
                <tr>
                  <td colSpan={5}>
                    <div className="admin-empty">
                      <FileText size={40} />
                      <p>Belum ada halaman. Klik "Tambah Halaman" untuk memulai.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                pages.map((p) => (
                  <tr key={p.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <FileText size={16} style={{ color: '#94a3b8' }} />
                        <span style={{ fontWeight: 600 }}>{p.title}</span>
                      </div>
                    </td>
                    <td>
                      <span className="slug-cell">{p.slug}</span>
                    </td>
                    <td>
                      <span className={`admin-badge ${p.status}`}>{p.status}</span>
                    </td>
                    <td style={{ color: '#94a3b8', fontSize: '0.82rem' }}>{p.createdAt}</td>
                    <td>
                      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 6 }}>
                        <a
                          href={p.slug}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="admin-btn-icon"
                          title="Lihat halaman"
                        >
                          <ExternalLink size={14} />
                        </a>
                        <button
                          className="admin-btn-icon"
                          onClick={() => navigate(`/admin/pages/${p.id}/edit`)}
                          title="Edit Konten"
                          style={{ color: '#1a237e' }}
                        >
                          <Layers size={14} />
                        </button>
                        <button
                          className="admin-btn-icon"
                          onClick={() => openEdit(p)}
                          title="Edit"
                        >
                          <Pencil size={14} />
                        </button>
                        <button
                          className="admin-btn-icon danger"
                          onClick={() => handleDelete(p)}
                          title="Hapus"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="admin-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="admin-modal" onClick={e => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3 className="admin-modal-title">
                {editingPage ? '✏️ Edit Halaman' : '➕ Halaman Baru'}
              </h3>
              <button className="admin-btn-icon" onClick={() => setShowModal(false)}>
                <X size={16} />
              </button>
            </div>
            <div className="admin-modal-body">
              <div className="admin-form-group">
                <label className="admin-form-label">Judul Halaman</label>
                <input
                  className="admin-input"
                  placeholder="Contoh: Tentang Kami"
                  value={form.title}
                  onChange={(e) => {
                    const title = e.target.value;
                    setForm(prev => ({
                      ...prev,
                      title,
                      slug: !editingPage ? autoSlug(title) : prev.slug,
                    }));
                  }}
                />
              </div>
              <div className="admin-form-group">
                <label className="admin-form-label">Slug (URL)</label>
                <input
                  className="admin-input"
                  placeholder="/contoh-halaman"
                  value={form.slug}
                  onChange={(e) => setForm(prev => ({ ...prev, slug: e.target.value }))}
                />
                <div className="admin-form-hint">URL halaman, contoh: /tentang-kami</div>
              </div>
              <div className="admin-form-group">
                <label className="admin-form-label">Status</label>
                <select
                  className="admin-select"
                  value={form.status}
                  onChange={(e) => setForm(prev => ({ ...prev, status: e.target.value }))}
                >
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                </select>
              </div>
            </div>
            <div className="admin-modal-footer">
              <button className="admin-btn admin-btn-secondary" onClick={() => setShowModal(false)}>
                Batal
              </button>
              <button className="admin-btn admin-btn-primary" onClick={handleSave}>
                <Check size={16} /> {editingPage ? 'Simpan' : 'Buat Halaman'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className={`admin-toast ${toast.type}`}>
          {toast.msg}
        </div>
      )}
    </AdminLayout>
  );
};

export default PageManager;
