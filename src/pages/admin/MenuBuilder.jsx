import { useState } from 'react';
import {
  Plus, Trash2, ChevronDown, ChevronRight, GripVertical,
  Check, X, Pencil, Menu, ArrowUp, ArrowDown
} from 'lucide-react';
import { useCms } from '../../cms/CmsContext';
import AdminLayout from './AdminLayout';

const MenuBuilder = () => {
  const { headerMenus, footerMenus, updateHeaderMenus, updateFooterMenus } = useCms();
  const [activeTab, setActiveTab] = useState('header');
  const [expandedMenu, setExpandedMenu] = useState(null);
  const [editingItem, setEditingItem] = useState(null);
  const [editForm, setEditForm] = useState({ label: '', href: '' });
  const [showAddModal, setShowAddModal] = useState(false);
  const [addForm, setAddForm] = useState({ label: '', href: '' });
  const [addSubForm, setAddSubForm] = useState({ label: '', to: '' });
  const [addingSubTo, setAddingSubTo] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  /* ── Header Menu CRUD ── */
  const moveHeaderMenu = (index, dir) => {
    const menus = [...headerMenus];
    const newIdx = index + dir;
    if (newIdx < 0 || newIdx >= menus.length) return;
    [menus[index], menus[newIdx]] = [menus[newIdx], menus[index]];
    updateHeaderMenus(menus);
  };

  const deleteHeaderMenu = (id) => {
    if (!window.confirm('Hapus menu ini?')) return;
    updateHeaderMenus(headerMenus.filter(m => m.id !== id));
    showToast('Menu dihapus');
  };

  const saveHeaderEdit = (menuId) => {
    const menus = headerMenus.map(m =>
      m.id === menuId ? { ...m, label: editForm.label, href: editForm.href } : m
    );
    updateHeaderMenus(menus);
    setEditingItem(null);
    showToast('Menu diupdate');
  };

  const addHeaderMenu = () => {
    if (!addForm.label.trim()) return;
    const newMenu = {
      id: 'menu-' + Date.now(),
      label: addForm.label,
      href: addForm.href || '#',
      subs: [],
    };
    updateHeaderMenus([...headerMenus, newMenu]);
    setShowAddModal(false);
    setAddForm({ label: '', href: '' });
    showToast('Menu baru ditambahkan!');
  };

  const addSubItem = (menuId) => {
    if (!addSubForm.label.trim()) return;
    const menus = headerMenus.map(m => {
      if (m.id !== menuId) return m;
      return { ...m, subs: [...(m.subs || []), { label: addSubForm.label, to: addSubForm.to || '#' }] };
    });
    updateHeaderMenus(menus);
    setAddingSubTo(null);
    setAddSubForm({ label: '', to: '' });
    showToast('Sub-menu ditambahkan');
  };

  const deleteSubItem = (menuId, subIndex) => {
    const menus = headerMenus.map(m => {
      if (m.id !== menuId) return m;
      return { ...m, subs: m.subs.filter((_, i) => i !== subIndex) };
    });
    updateHeaderMenus(menus);
  };

  const updateSubItem = (menuId, subIndex, field, value) => {
    const menus = headerMenus.map(m => {
      if (m.id !== menuId) return m;
      const subs = m.subs.map((s, i) => i === subIndex ? { ...s, [field]: value } : s);
      return { ...m, subs };
    });
    updateHeaderMenus(menus);
  };

  /* ── Footer Menu CRUD ── */
  const updateFooterColTitle = (colId, title) => {
    const cols = footerMenus.map(c => c.id === colId ? { ...c, title } : c);
    updateFooterMenus(cols);
  };

  const addFooterLink = (colId) => {
    const cols = footerMenus.map(c => {
      if (c.id !== colId) return c;
      return { ...c, links: [...c.links, { label: 'Link Baru', to: '#' }] };
    });
    updateFooterMenus(cols);
  };

  const updateFooterLink = (colId, linkIndex, field, value) => {
    const cols = footerMenus.map(c => {
      if (c.id !== colId) return c;
      const links = c.links.map((l, i) => i === linkIndex ? { ...l, [field]: value } : l);
      return { ...c, links };
    });
    updateFooterMenus(cols);
  };

  const deleteFooterLink = (colId, linkIndex) => {
    const cols = footerMenus.map(c => {
      if (c.id !== colId) return c;
      return { ...c, links: c.links.filter((_, i) => i !== linkIndex) };
    });
    updateFooterMenus(cols);
  };

  const addFooterCol = () => {
    const newCol = {
      id: 'fcol-' + Date.now(),
      title: 'Kolom Baru',
      links: [{ label: 'Link Baru', to: '#' }],
    };
    updateFooterMenus([...footerMenus, newCol]);
    showToast('Kolom footer ditambahkan');
  };

  const deleteFooterCol = (colId) => {
    if (!window.confirm('Hapus kolom footer ini?')) return;
    updateFooterMenus(footerMenus.filter(c => c.id !== colId));
    showToast('Kolom footer dihapus');
  };

  return (
    <AdminLayout title="Menu Builder">
      {/* Tabs */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
        <button
          className={`admin-btn ${activeTab === 'header' ? 'admin-btn-primary' : 'admin-btn-secondary'}`}
          onClick={() => setActiveTab('header')}
        >
          <Menu size={16} /> Header Menu
        </button>
        <button
          className={`admin-btn ${activeTab === 'footer' ? 'admin-btn-primary' : 'admin-btn-secondary'}`}
          onClick={() => setActiveTab('footer')}
        >
          <Menu size={16} /> Footer Menu
        </button>
      </div>

      {/* ═══ HEADER MENU ═══ */}
      {activeTab === 'header' && (
        <div className="admin-card">
          <div className="admin-card-header">
            <span className="admin-card-title">🗂️ Header Navigation ({headerMenus.length} menu)</span>
            <button className="admin-btn admin-btn-primary admin-btn-sm" onClick={() => setShowAddModal(true)}>
              <Plus size={14} /> Tambah Menu
            </button>
          </div>

          <div className="admin-menu-list">
            {headerMenus.map((menu, idx) => (
              <div key={menu.id}>
                <div className="admin-menu-item">
                  <GripVertical size={16} className="admin-menu-drag" />

                  {editingItem === menu.id ? (
                    <div className="admin-menu-item-content" style={{ gap: 8 }}>
                      <input
                        className="admin-input"
                        value={editForm.label}
                        onChange={e => setEditForm(p => ({ ...p, label: e.target.value }))}
                        placeholder="Label"
                        style={{ maxWidth: 160, padding: '6px 10px', fontSize: '0.82rem' }}
                      />
                      <input
                        className="admin-input"
                        value={editForm.href}
                        onChange={e => setEditForm(p => ({ ...p, href: e.target.value }))}
                        placeholder="URL / anchor"
                        style={{ maxWidth: 200, padding: '6px 10px', fontSize: '0.82rem' }}
                      />
                    </div>
                  ) : (
                    <div className="admin-menu-item-content">
                      <span className="admin-menu-item-label">{menu.label}</span>
                      <span className="admin-menu-item-url">{menu.href}</span>
                      <span className="admin-menu-item-subs">{menu.subs?.length || 0} sub-menu</span>
                    </div>
                  )}

                  <div className="admin-menu-item-actions">
                    {editingItem === menu.id ? (
                      <>
                        <button className="admin-btn-icon" onClick={() => saveHeaderEdit(menu.id)} title="Simpan">
                          <Check size={14} style={{ color: '#22c55e' }} />
                        </button>
                        <button className="admin-btn-icon" onClick={() => setEditingItem(null)} title="Batal">
                          <X size={14} />
                        </button>
                      </>
                    ) : (
                      <>
                        <button className="admin-btn-icon" onClick={() => moveHeaderMenu(idx, -1)} title="Move up">
                          <ArrowUp size={14} />
                        </button>
                        <button className="admin-btn-icon" onClick={() => moveHeaderMenu(idx, 1)} title="Move down">
                          <ArrowDown size={14} />
                        </button>
                        <button
                          className="admin-btn-icon"
                          onClick={() => setExpandedMenu(expandedMenu === menu.id ? null : menu.id)}
                          title="Sub-menus"
                        >
                          {expandedMenu === menu.id ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                        </button>
                        <button
                          className="admin-btn-icon"
                          onClick={() => { setEditingItem(menu.id); setEditForm({ label: menu.label, href: menu.href }); }}
                          title="Edit"
                        >
                          <Pencil size={14} />
                        </button>
                        <button className="admin-btn-icon danger" onClick={() => deleteHeaderMenu(menu.id)} title="Hapus">
                          <Trash2 size={14} />
                        </button>
                      </>
                    )}
                  </div>
                </div>

                {/* Sub-items */}
                {expandedMenu === menu.id && (
                  <div className="admin-menu-sub-list">
                    {menu.subs?.map((sub, si) => (
                      <div key={si} className="admin-menu-sub-item">
                        <input
                          className="admin-input"
                          value={sub.label}
                          onChange={e => updateSubItem(menu.id, si, 'label', e.target.value)}
                          style={{ flex: 1 }}
                        />
                        <input
                          className="admin-input"
                          value={sub.to}
                          onChange={e => updateSubItem(menu.id, si, 'to', e.target.value)}
                          style={{ flex: 1 }}
                        />
                        <button className="admin-btn-icon danger" onClick={() => deleteSubItem(menu.id, si)}>
                          <Trash2 size={12} />
                        </button>
                      </div>
                    ))}
                    {addingSubTo === menu.id ? (
                      <div className="admin-menu-sub-item" style={{ background: '#f0fdf4', borderColor: '#bbf7d0' }}>
                        <input
                          className="admin-input"
                          placeholder="Label"
                          value={addSubForm.label}
                          onChange={e => setAddSubForm(p => ({ ...p, label: e.target.value }))}
                          style={{ flex: 1 }}
                        />
                        <input
                          className="admin-input"
                          placeholder="/url"
                          value={addSubForm.to}
                          onChange={e => setAddSubForm(p => ({ ...p, to: e.target.value }))}
                          style={{ flex: 1 }}
                        />
                        <button className="admin-btn-icon" onClick={() => addSubItem(menu.id)}>
                          <Check size={12} style={{ color: '#22c55e' }} />
                        </button>
                        <button className="admin-btn-icon" onClick={() => setAddingSubTo(null)}>
                          <X size={12} />
                        </button>
                      </div>
                    ) : (
                      <button
                        className="admin-btn admin-btn-sm admin-btn-success"
                        onClick={() => { setAddingSubTo(menu.id); setAddSubForm({ label: '', to: '' }); }}
                        style={{ marginLeft: 0 }}
                      >
                        <Plus size={12} /> Tambah Sub-menu
                      </button>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ═══ FOOTER MENU ═══ */}
      {activeTab === 'footer' && (
        <div className="admin-card">
          <div className="admin-card-header">
            <span className="admin-card-title">🦶 Footer Navigation ({footerMenus.length} kolom)</span>
            <button className="admin-btn admin-btn-primary admin-btn-sm" onClick={addFooterCol}>
              <Plus size={14} /> Tambah Kolom
            </button>
          </div>

          {footerMenus.map((col) => (
            <div key={col.id} className="admin-footer-col">
              <div className="admin-footer-col-header">
                <input
                  className="admin-input"
                  value={col.title}
                  onChange={e => updateFooterColTitle(col.id, e.target.value)}
                  style={{ maxWidth: 220, fontWeight: 700, padding: '6px 10px' }}
                />
                <button className="admin-btn-icon danger" onClick={() => deleteFooterCol(col.id)}>
                  <Trash2 size={14} />
                </button>
              </div>

              {col.links.map((link, li) => (
                <div key={li} className="admin-menu-sub-item" style={{ marginBottom: 6 }}>
                  <input
                    className="admin-input"
                    value={link.label}
                    onChange={e => updateFooterLink(col.id, li, 'label', e.target.value)}
                    placeholder="Label"
                    style={{ flex: 1 }}
                  />
                  <input
                    className="admin-input"
                    value={link.to}
                    onChange={e => updateFooterLink(col.id, li, 'to', e.target.value)}
                    placeholder="URL"
                    style={{ flex: 1 }}
                  />
                  <button className="admin-btn-icon danger" onClick={() => deleteFooterLink(col.id, li)}>
                    <Trash2 size={12} />
                  </button>
                </div>
              ))}

              <button
                className="admin-btn admin-btn-sm admin-btn-success"
                onClick={() => addFooterLink(col.id)}
                style={{ marginTop: 6 }}
              >
                <Plus size={12} /> Tambah Link
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Add Menu Modal */}
      {showAddModal && (
        <div className="admin-modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="admin-modal" onClick={e => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3 className="admin-modal-title">➕ Tambah Menu Baru</h3>
              <button className="admin-btn-icon" onClick={() => setShowAddModal(false)}><X size={16} /></button>
            </div>
            <div className="admin-modal-body">
              <div className="admin-form-group">
                <label className="admin-form-label">Label Menu</label>
                <input
                  className="admin-input"
                  placeholder="Contoh: Blog"
                  value={addForm.label}
                  onChange={e => setAddForm(p => ({ ...p, label: e.target.value }))}
                />
              </div>
              <div className="admin-form-group">
                <label className="admin-form-label">URL / Anchor</label>
                <input
                  className="admin-input"
                  placeholder="Contoh: /blog atau #section"
                  value={addForm.href}
                  onChange={e => setAddForm(p => ({ ...p, href: e.target.value }))}
                />
              </div>
            </div>
            <div className="admin-modal-footer">
              <button className="admin-btn admin-btn-secondary" onClick={() => setShowAddModal(false)}>Batal</button>
              <button className="admin-btn admin-btn-primary" onClick={addHeaderMenu}>
                <Check size={16} /> Tambah
              </button>
            </div>
          </div>
        </div>
      )}

      {toast && <div className={`admin-toast ${toast.type}`}>{toast.msg}</div>}
    </AdminLayout>
  );
};

export default MenuBuilder;
