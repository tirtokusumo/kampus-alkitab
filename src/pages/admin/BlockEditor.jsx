import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Plus, Trash2, Save, ArrowLeft, Eye, X,
  Check, Type, Image, Link as LinkIcon, BarChart3, MessageSquare, Layers, GripVertical
} from 'lucide-react';
import { Reorder, useDragControls } from 'framer-motion';
import { useCms } from '../../cms/CmsContext';
import { BLOCK_TYPES, getDefaultBlockData } from '../../cms/blockTypes';
import AdminLayout from './AdminLayout';
import './BlockEditor.css';

const BlockItem = ({ block, index, typeDef, isEditing, setEditingBlock, removeBlock, renderBlockFields }) => {
  const dragControls = useDragControls();

  return (
    <Reorder.Item
      value={block}
      className={`be-block ${isEditing ? 'editing' : ''}`}
      style={{ position: 'relative' }}
      dragListener={false}
      dragControls={dragControls}
    >
      <div className="be-block-header" onClick={() => setEditingBlock(isEditing ? null : block.id)}>
        <div className="be-block-label">
          <div
            className="be-drag-handle"
            onPointerDown={(e) => dragControls.start(e)}
            style={{ cursor: 'grab', marginRight: '8px', color: '#94a3b8', display: 'flex', alignItems: 'center', touchAction: 'none' }}
          >
            <GripVertical size={16} />
          </div>
          <span className="be-block-icon">{typeDef.icon}</span>
          <span className="be-block-type">{typeDef.label}</span>
          {block.heading && <span className="be-block-preview">— {block.heading}</span>}
        </div>
        <div className="be-block-actions">
          <button onClick={e => { e.stopPropagation(); removeBlock(block.id); }} className="danger" aria-label="Hapus blok">
            <Trash2 size={14} />
          </button>
        </div>
      </div>
      {isEditing && (
        <div className="be-block-body">
          {renderBlockFields(block)}
        </div>
      )}
    </Reorder.Item>
  );
};

const BlockEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { pages, updatePageBlocks } = useCms();

  const page = pages.find(p => p.id === id);
  const [blocks, setBlocks] = useState([]);
  const [showAddMenu, setShowAddMenu] = useState(false);
  const [editingBlock, setEditingBlock] = useState(null);
  const [toast, setToast] = useState(null);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    if (page) {
      setBlocks(page.blocks || []);
    }
  }, [page]);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  if (!page) {
    return (
      <AdminLayout title="Block Editor">
        <div className="be-empty">
          <Layers size={48} />
          <h3>Halaman tidak ditemukan</h3>
          <button className="admin-btn admin-btn-primary" onClick={() => navigate('/admin/pages')}>
            <ArrowLeft size={16} /> Kembali ke Pages
          </button>
        </div>
      </AdminLayout>
    );
  }

  const addBlock = (type) => {
    const newBlock = getDefaultBlockData(type);
    setBlocks(prev => [...prev, newBlock]);
    setShowAddMenu(false);
    setEditingBlock(newBlock.id);
    setHasChanges(true);
  };

  const removeBlock = (blockId) => {
    if (window.confirm('Hapus blok ini?')) {
      setBlocks(prev => prev.filter(b => b.id !== blockId));
      if (editingBlock === blockId) setEditingBlock(null);
      setHasChanges(true);
    }
  };

  const handleReorder = (newOrder) => {
    setBlocks(newOrder);
    setHasChanges(true);
  };

  const updateBlock = (blockId, updates) => {
    setBlocks(prev => prev.map(b => b.id === blockId ? { ...b, ...updates } : b));
    setHasChanges(true);
  };

  const handleSave = () => {
    updatePageBlocks(page.id, blocks);
    setHasChanges(false);
    showToast('Konten halaman berhasil disimpan!');
  };

  /* ── Block Field Editors ── */
  const renderBlockFields = (block) => {
    switch (block.type) {
      case 'hero':
        return (
          <div className="be-fields">
            <div className="be-field">
              <label>Heading</label>
              <input value={block.heading || ''} onChange={e => updateBlock(block.id, { heading: e.target.value })} />
            </div>
            <div className="be-field">
              <label>Subheading</label>
              <input value={block.subheading || ''} onChange={e => updateBlock(block.id, { subheading: e.target.value })} />
            </div>
            <div className="be-field-row">
              <div className="be-field">
                <label>Tombol CTA</label>
                <input value={block.ctaText || ''} onChange={e => updateBlock(block.id, { ctaText: e.target.value })} />
              </div>
              <div className="be-field">
                <label>Link CTA</label>
                <input value={block.ctaLink || ''} onChange={e => updateBlock(block.id, { ctaLink: e.target.value })} />
              </div>
            </div>
            <div className="be-field-row">
              <div className="be-field">
                <label>Tombol Sekunder</label>
                <input value={block.secondaryText || ''} onChange={e => updateBlock(block.id, { secondaryText: e.target.value })} />
              </div>
              <div className="be-field">
                <label>Link Sekunder</label>
                <input value={block.secondaryLink || ''} onChange={e => updateBlock(block.id, { secondaryLink: e.target.value })} />
              </div>
            </div>
            <div className="be-field">
              <label>Background Image URL</label>
              <input value={block.backgroundImage || ''} onChange={e => updateBlock(block.id, { backgroundImage: e.target.value })} placeholder="https://..." />
            </div>
          </div>
        );

      case 'text':
        return (
          <div className="be-fields">
            <div className="be-field">
              <label>Heading</label>
              <input value={block.heading || ''} onChange={e => updateBlock(block.id, { heading: e.target.value })} />
            </div>
            <div className="be-field">
              <label>Konten</label>
              <textarea rows={6} value={block.body || ''} onChange={e => updateBlock(block.id, { body: e.target.value })} />
            </div>
            <div className="be-field">
              <label>Alignment</label>
              <select value={block.alignment || 'left'} onChange={e => updateBlock(block.id, { alignment: e.target.value })}>
                <option value="left">Kiri</option>
                <option value="center">Tengah</option>
                <option value="right">Kanan</option>
              </select>
            </div>
          </div>
        );

      case 'image_text':
        return (
          <div className="be-fields">
            <div className="be-field">
              <label>Heading</label>
              <input value={block.heading || ''} onChange={e => updateBlock(block.id, { heading: e.target.value })} />
            </div>
            <div className="be-field">
              <label>Konten</label>
              <textarea rows={4} value={block.body || ''} onChange={e => updateBlock(block.id, { body: e.target.value })} />
            </div>
            <div className="be-field">
              <label>Image URL</label>
              <input value={block.imageUrl || ''} onChange={e => updateBlock(block.id, { imageUrl: e.target.value })} placeholder="https://..." />
            </div>
            <div className="be-field">
              <label>Posisi Gambar</label>
              <select value={block.imagePosition || 'left'} onChange={e => updateBlock(block.id, { imagePosition: e.target.value })}>
                <option value="left">Kiri</option>
                <option value="right">Kanan</option>
              </select>
            </div>
            <div className="be-field-row">
              <div className="be-field">
                <label>Tombol CTA (opsional)</label>
                <input value={block.ctaText || ''} onChange={e => updateBlock(block.id, { ctaText: e.target.value })} />
              </div>
              <div className="be-field">
                <label>Link CTA</label>
                <input value={block.ctaLink || ''} onChange={e => updateBlock(block.id, { ctaLink: e.target.value })} />
              </div>
            </div>
          </div>
        );

      case 'cta':
        return (
          <div className="be-fields">
            <div className="be-field">
              <label>Heading</label>
              <input value={block.heading || ''} onChange={e => updateBlock(block.id, { heading: e.target.value })} />
            </div>
            <div className="be-field">
              <label>Deskripsi</label>
              <textarea rows={3} value={block.body || ''} onChange={e => updateBlock(block.id, { body: e.target.value })} />
            </div>
            <div className="be-field-row">
              <div className="be-field">
                <label>Tombol Utama</label>
                <input value={block.ctaText || ''} onChange={e => updateBlock(block.id, { ctaText: e.target.value })} />
              </div>
              <div className="be-field">
                <label>Link</label>
                <input value={block.ctaLink || ''} onChange={e => updateBlock(block.id, { ctaLink: e.target.value })} />
              </div>
            </div>
            <div className="be-field">
              <label>Variant</label>
              <select value={block.variant || 'primary'} onChange={e => updateBlock(block.id, { variant: e.target.value })}>
                <option value="primary">Primary (Biru)</option>
                <option value="secondary">Secondary (Emas)</option>
                <option value="dark">Dark</option>
              </select>
            </div>
          </div>
        );

      case 'features_grid':
        return (
          <div className="be-fields">
            <div className="be-field">
              <label>Heading</label>
              <input value={block.heading || ''} onChange={e => updateBlock(block.id, { heading: e.target.value })} />
            </div>
            <div className="be-field">
              <label>Subheading</label>
              <input value={block.subheading || ''} onChange={e => updateBlock(block.id, { subheading: e.target.value })} />
            </div>
            <div className="be-features-list">
              <label>Fitur ({(block.features || []).length})</label>
              {(block.features || []).map((feat, fi) => (
                <div key={fi} className="be-feature-item">
                  <div className="be-field-row">
                    <div className="be-field" style={{ flex: '0 0 60px' }}>
                      <input value={feat.icon} onChange={e => {
                        const updated = [...block.features];
                        updated[fi] = { ...updated[fi], icon: e.target.value };
                        updateBlock(block.id, { features: updated });
                      }} placeholder="📖" style={{ textAlign: 'center' }} />
                    </div>
                    <div className="be-field" style={{ flex: 1 }}>
                      <input value={feat.title} onChange={e => {
                        const updated = [...block.features];
                        updated[fi] = { ...updated[fi], title: e.target.value };
                        updateBlock(block.id, { features: updated });
                      }} placeholder="Judul fitur" />
                    </div>
                    <button className="be-remove-item" onClick={() => {
                      const updated = block.features.filter((_, i) => i !== fi);
                      updateBlock(block.id, { features: updated });
                    }}><Trash2 size={14} /></button>
                  </div>
                  <div className="be-field">
                    <input value={feat.desc} onChange={e => {
                      const updated = [...block.features];
                      updated[fi] = { ...updated[fi], desc: e.target.value };
                      updateBlock(block.id, { features: updated });
                    }} placeholder="Deskripsi fitur" />
                  </div>
                </div>
              ))}
              <button className="be-add-item-btn" onClick={() => {
                const updated = [...(block.features || []), { icon: '✨', title: 'Fitur Baru', desc: 'Deskripsi fitur' }];
                updateBlock(block.id, { features: updated });
              }}><Plus size={14} /> Tambah Fitur</button>
            </div>
          </div>
        );

      case 'testimonials':
        return (
          <div className="be-fields">
            <div className="be-field">
              <label>Heading</label>
              <input value={block.heading || ''} onChange={e => updateBlock(block.id, { heading: e.target.value })} />
            </div>
            <div className="be-features-list">
              <label>Testimoni ({(block.testimonials || []).length})</label>
              {(block.testimonials || []).map((t, ti) => (
                <div key={ti} className="be-feature-item">
                  <div className="be-field-row">
                    <div className="be-field"><input value={t.name} onChange={e => {
                      const updated = [...block.testimonials];
                      updated[ti] = { ...updated[ti], name: e.target.value };
                      updateBlock(block.id, { testimonials: updated });
                    }} placeholder="Nama" /></div>
                    <div className="be-field"><input value={t.role} onChange={e => {
                      const updated = [...block.testimonials];
                      updated[ti] = { ...updated[ti], role: e.target.value };
                      updateBlock(block.id, { testimonials: updated });
                    }} placeholder="Jabatan" /></div>
                    <button className="be-remove-item" onClick={() => {
                      const updated = block.testimonials.filter((_, i) => i !== ti);
                      updateBlock(block.id, { testimonials: updated });
                    }}><Trash2 size={14} /></button>
                  </div>
                  <div className="be-field">
                    <textarea rows={2} value={t.quote} onChange={e => {
                      const updated = [...block.testimonials];
                      updated[ti] = { ...updated[ti], quote: e.target.value };
                      updateBlock(block.id, { testimonials: updated });
                    }} placeholder="Quote testimoni..." />
                  </div>
                </div>
              ))}
              <button className="be-add-item-btn" onClick={() => {
                const updated = [...(block.testimonials || []), { name: '', role: '', quote: '', avatar: '' }];
                updateBlock(block.id, { testimonials: updated });
              }}><Plus size={14} /> Tambah Testimoni</button>
            </div>
          </div>
        );

      case 'stats':
        return (
          <div className="be-fields">
            <div className="be-features-list">
              <label>Statistik ({(block.stats || []).length})</label>
              {(block.stats || []).map((s, si) => (
                <div key={si} className="be-field-row">
                  <div className="be-field">
                    <input value={s.number} onChange={e => {
                      const updated = [...block.stats];
                      updated[si] = { ...updated[si], number: e.target.value };
                      updateBlock(block.id, { stats: updated });
                    }} placeholder="1.000+" />
                  </div>
                  <div className="be-field">
                    <input value={s.label} onChange={e => {
                      const updated = [...block.stats];
                      updated[si] = { ...updated[si], label: e.target.value };
                      updateBlock(block.id, { stats: updated });
                    }} placeholder="Label" />
                  </div>
                  <button className="be-remove-item" onClick={() => {
                    const updated = block.stats.filter((_, i) => i !== si);
                    updateBlock(block.id, { stats: updated });
                  }}><Trash2 size={14} /></button>
                </div>
              ))}
              <button className="be-add-item-btn" onClick={() => {
                const updated = [...(block.stats || []), { number: '0', label: 'Label' }];
                updateBlock(block.id, { stats: updated });
              }}><Plus size={14} /> Tambah Stat</button>
            </div>
          </div>
        );

      case 'spacer':
        return (
          <div className="be-fields">
            <div className="be-field">
              <label>Tinggi (px)</label>
              <input type="number" value={block.height || 48} onChange={e => updateBlock(block.id, { height: parseInt(e.target.value) || 0 })} />
            </div>
          </div>
        );

      default:
        return <p style={{ color: '#94a3b8', padding: 16 }}>Tipe blok tidak dikenal.</p>;
    }
  };

  return (
    <AdminLayout title={`Edit: ${page.title}`}>
      {/* Top Bar */}
      <div className="be-topbar">
        <button className="admin-btn admin-btn-secondary" onClick={() => navigate('/admin/pages')}>
          <ArrowLeft size={16} /> Kembali
        </button>
        <div className="be-topbar-info">
          <span className="be-page-slug">{page.slug}</span>
          <span className={`admin-badge ${page.status}`}>{page.status}</span>
        </div>
        <button
          className={`admin-btn admin-btn-primary ${!hasChanges ? 'disabled' : ''}`}
          onClick={handleSave}
          disabled={!hasChanges}
        >
          <Save size={16} /> Simpan {hasChanges && '*'}
        </button>
      </div>

      {/* Block List */}
      <Reorder.Group axis="y" values={blocks} onReorder={handleReorder} className="be-blocks" style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
        {blocks.length === 0 && (
          <div className="be-empty-blocks">
            <Layers size={40} />
            <h3>Belum ada konten</h3>
            <p>Klik "Tambah Blok" untuk mulai menambahkan konten ke halaman ini.</p>
          </div>
        )}

        {blocks.map((block, index) => {
          const typeDef = BLOCK_TYPES[block.type] || { label: block.type, icon: '❓' };
          const isEditing = editingBlock === block.id;

          return (
            <BlockItem
              key={block.id}
              block={block}
              index={index}
              typeDef={typeDef}
              isEditing={isEditing}
              setEditingBlock={setEditingBlock}
              removeBlock={removeBlock}
              renderBlockFields={renderBlockFields}
            />
          );
        })}
      </Reorder.Group>

      {/* Add Block Button */}
      <div className="be-add-section">
        <button className="be-add-btn" onClick={() => setShowAddMenu(!showAddMenu)}>
          {showAddMenu ? <X size={18} /> : <Plus size={18} />}
          {showAddMenu ? 'Tutup' : 'Tambah Blok'}
        </button>

        {showAddMenu && (
          <div className="be-add-menu">
            {Object.entries(BLOCK_TYPES).map(([key, def]) => (
              <button key={key} className="be-add-menu-item" onClick={() => addBlock(key)}>
                <span className="be-add-menu-icon">{def.icon}</span>
                <div>
                  <div className="be-add-menu-label">{def.label}</div>
                  <div className="be-add-menu-desc">{def.description}</div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Toast */}
      {toast && <div className={`admin-toast ${toast.type}`}>{toast.msg}</div>}
    </AdminLayout>
  );
};

export default BlockEditor;
