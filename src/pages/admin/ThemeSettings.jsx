import { useState } from 'react';
import { RotateCcw, Check, Palette, Eye } from 'lucide-react';
import { useCms } from '../../cms/CmsContext';
import AdminLayout from './AdminLayout';

const colorFields = [
  { key: 'colorPrimary', label: 'Primary', desc: 'Warna utama (heading, button, link)' },
  { key: 'colorPrimaryLight', label: 'Primary Light', desc: 'Variasi terang dari primary' },
  { key: 'colorPrimaryDark', label: 'Primary Dark', desc: 'Variasi gelap dari primary' },
  { key: 'colorSecondary', label: 'Secondary (Gold)', desc: 'Warna aksen emas / badge' },
  { key: 'colorSecondaryLight', label: 'Secondary Light', desc: 'Variasi terang secondary' },
  { key: 'colorSecondaryDark', label: 'Secondary Dark', desc: 'Variasi gelap secondary' },
  { key: 'colorAccent', label: 'Accent (Teal)', desc: 'Warna aksen / highlight' },
  { key: 'colorAccentLight', label: 'Accent Light', desc: 'Variasi terang accent' },
  { key: 'colorAccentDark', label: 'Accent Dark', desc: 'Variasi gelap accent' },
];

const ThemeSettings = () => {
  const { theme, updateTheme, resetTheme } = useCms();
  const [localTheme, setLocalTheme] = useState({ ...theme });
  const [toast, setToast] = useState(null);
  const [hasChanges, setHasChanges] = useState(false);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleColorChange = (key, value) => {
    setLocalTheme(prev => ({ ...prev, [key]: value }));
    setHasChanges(true);
    // Live preview: apply immediately
    updateTheme({ [key]: value });
  };

  const handleSave = () => {
    updateTheme(localTheme);
    setHasChanges(false);
    showToast('Tema berhasil disimpan! 🎨');
  };

  const handleReset = () => {
    if (!window.confirm('Reset tema ke default? Semua perubahan warna akan hilang.')) return;
    resetTheme();
    setLocalTheme({
      colorPrimary: '#1A237E',
      colorPrimaryLight: '#283593',
      colorPrimaryDark: '#121858',
      colorSecondary: '#FFD700',
      colorSecondaryLight: '#FFE033',
      colorSecondaryDark: '#B39700',
      colorAccent: '#008080',
      colorAccentLight: '#009999',
      colorAccentDark: '#006666',
    });
    setHasChanges(false);
    showToast('Tema direset ke default', 'info');
  };

  return (
    <AdminLayout title="Theme & Warna">
      {/* Info */}
      <div className="admin-card" style={{ marginBottom: 20, background: '#fefce8', borderColor: '#fde68a' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Palette size={22} style={{ color: '#b45309' }} />
          <div>
            <p style={{ fontWeight: 600, color: '#92400e', fontSize: '0.92rem' }}>
              Live Preview Aktif
            </p>
            <p style={{ fontSize: '0.82rem', color: '#a16207' }}>
              Perubahan warna langsung diterapkan secara real-time ke seluruh website. Klik "Simpan" untuk menyimpan perubahan secara permanen.
            </p>
          </div>
        </div>
      </div>

      {/* Preview Bar */}
      <div className="admin-card" style={{ marginBottom: 20 }}>
        <div className="admin-card-header">
          <span className="admin-card-title"><Eye size={16} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 6 }} />Preview Palet</span>
        </div>
        <div style={{ display: 'flex', gap: 4, borderRadius: 12, overflow: 'hidden', height: 56 }}>
          {colorFields.map((cf) => (
            <div
              key={cf.key}
              style={{
                flex: 1,
                background: localTheme[cf.key],
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'center',
                paddingBottom: 4,
              }}
              title={`${cf.label}: ${localTheme[cf.key]}`}
            >
              <span style={{
                fontSize: '0.55rem',
                color: '#fff',
                textShadow: '0 1px 3px rgba(0,0,0,0.5)',
                fontWeight: 600,
              }}>
                {cf.label.split(' ')[0]}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Color Pickers */}
      <div className="admin-card">
        <div className="admin-card-header">
          <span className="admin-card-title">🎨 Color Palette</span>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="admin-btn admin-btn-sm admin-btn-danger" onClick={handleReset}>
              <RotateCcw size={14} /> Reset Default
            </button>
            <button className="admin-btn admin-btn-sm admin-btn-primary" onClick={handleSave}>
              <Check size={14} /> Simpan Tema
            </button>
          </div>
        </div>

        <div className="admin-color-grid">
          {colorFields.map((cf) => (
            <div key={cf.key} className="admin-color-item">
              <div className="admin-color-swatch" style={{ background: localTheme[cf.key] }}>
                <input
                  type="color"
                  value={localTheme[cf.key]}
                  onChange={e => handleColorChange(cf.key, e.target.value)}
                />
              </div>
              <div className="admin-color-info">
                <div className="admin-color-name">{cf.label}</div>
                <div className="admin-color-value">{localTheme[cf.key]}</div>
                <div style={{ fontSize: '0.7rem', color: '#94a3b8', marginTop: 2 }}>{cf.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Preset Themes */}
      <div className="admin-card" style={{ marginTop: 20 }}>
        <div className="admin-card-header">
          <span className="admin-card-title">✨ Preset Tema</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
          {[
            {
              name: 'Kingdom Blue (Default)',
              colors: { colorPrimary: '#1A237E', colorPrimaryLight: '#283593', colorPrimaryDark: '#121858', colorSecondary: '#FFD700', colorSecondaryLight: '#FFE033', colorSecondaryDark: '#B39700', colorAccent: '#008080', colorAccentLight: '#009999', colorAccentDark: '#006666' },
            },
            {
              name: 'Forest Green',
              colors: { colorPrimary: '#1b5e20', colorPrimaryLight: '#2e7d32', colorPrimaryDark: '#0d3311', colorSecondary: '#ff9800', colorSecondaryLight: '#ffb74d', colorSecondaryDark: '#e65100', colorAccent: '#00695c', colorAccentLight: '#00897b', colorAccentDark: '#004d40' },
            },
            {
              name: 'Royal Purple',
              colors: { colorPrimary: '#4a148c', colorPrimaryLight: '#6a1b9a', colorPrimaryDark: '#2c0d52', colorSecondary: '#ffab00', colorSecondaryLight: '#ffc107', colorSecondaryDark: '#ff8f00', colorAccent: '#0097a7', colorAccentLight: '#00bcd4', colorAccentDark: '#006064' },
            },
            {
              name: 'Warm Burgundy',
              colors: { colorPrimary: '#880e4f', colorPrimaryLight: '#ad1457', colorPrimaryDark: '#560027', colorSecondary: '#ffd54f', colorSecondaryLight: '#ffecb3', colorSecondaryDark: '#f9a825', colorAccent: '#2e7d32', colorAccentLight: '#43a047', colorAccentDark: '#1b5e20' },
            },
          ].map((preset) => (
            <button
              key={preset.name}
              className="admin-quick-btn"
              onClick={() => {
                setLocalTheme(preset.colors);
                updateTheme(preset.colors);
                showToast(`Tema "${preset.name}" diterapkan!`);
              }}
              style={{ flexDirection: 'column', alignItems: 'flex-start', gap: 8 }}
            >
              <div style={{ display: 'flex', gap: 3, width: '100%' }}>
                {[preset.colors.colorPrimary, preset.colors.colorSecondary, preset.colors.colorAccent].map((c, i) => (
                  <div key={i} style={{ flex: 1, height: 20, borderRadius: 4, background: c }} />
                ))}
              </div>
              <span style={{ fontSize: '0.78rem' }}>{preset.name}</span>
            </button>
          ))}
        </div>
      </div>

      {toast && <div className={`admin-toast ${toast.type}`}>{toast.msg}</div>}
    </AdminLayout>
  );
};

export default ThemeSettings;
