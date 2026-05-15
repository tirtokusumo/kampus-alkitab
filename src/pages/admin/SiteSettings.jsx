import { useState } from 'react';
import { Check, Globe, Mail, Phone, Instagram, Youtube, Facebook, MessageCircle, Image } from 'lucide-react';
import { useCms } from '../../cms/CmsContext';
import AdminLayout from './AdminLayout';

const SiteSettings = () => {
  const { siteSettings, updateSiteSettings } = useCms();
  const [form, setForm] = useState({ ...siteSettings });
  const [socialForm, setSocialForm] = useState({ ...siteSettings.socialLinks });
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleSave = () => {
    updateSiteSettings({
      ...form,
      socialLinks: socialForm,
    });
    showToast('Pengaturan situs berhasil disimpan! ✅');
  };

  return (
    <AdminLayout title="Site Settings">
      {/* Site Identity */}
      <div className="admin-card" style={{ marginBottom: 20 }}>
        <div className="admin-card-header">
          <span className="admin-card-title">🏠 Identitas Situs</span>
        </div>

        <div className="admin-form-row">
          <div className="admin-form-group">
            <label className="admin-form-label">Nama Situs</label>
            <input
              className="admin-input"
              value={form.siteName}
              onChange={e => setForm(p => ({ ...p, siteName: e.target.value }))}
              placeholder="Kampus Alkitab"
            />
          </div>
          <div className="admin-form-group">
            <label className="admin-form-label">Tagline</label>
            <input
              className="admin-input"
              value={form.tagline}
              onChange={e => setForm(p => ({ ...p, tagline: e.target.value }))}
              placeholder="Platform pendidikan rohani digital..."
            />
          </div>
        </div>

        <div className="admin-form-group">
          <label className="admin-form-label">Logo URL</label>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <input
              className="admin-input"
              value={form.logoUrl}
              onChange={e => setForm(p => ({ ...p, logoUrl: e.target.value }))}
              placeholder="/logo-dark.png"
              style={{ flex: 1 }}
            />
            {form.logoUrl && (
              <div style={{
                width: 48, height: 48, borderRadius: 10,
                border: '2px solid #e2e8f0', overflow: 'hidden',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: '#f8fafc', flexShrink: 0,
              }}>
                <img
                  src={form.logoUrl}
                  alt="Logo preview"
                  style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                  onError={e => { e.target.style.display = 'none'; }}
                />
              </div>
            )}
          </div>
          <div className="admin-form-hint">Masukkan path ke file logo atau URL gambar. Contoh: /logo-dark.png</div>
        </div>

        <div className="admin-form-group">
          <label className="admin-form-label">Meta Description (SEO)</label>
          <textarea
            className="admin-textarea"
            value={form.metaDescription}
            onChange={e => setForm(p => ({ ...p, metaDescription: e.target.value }))}
            placeholder="Deskripsi singkat website untuk mesin pencari..."
            rows={3}
          />
          <div className="admin-form-hint">{form.metaDescription?.length || 0}/160 karakter — disarankan 120-160 karakter</div>
        </div>

        <div className="admin-form-group">
          <label className="admin-form-label">Teks Copyright Footer</label>
          <input
            className="admin-input"
            value={form.copyright}
            onChange={e => setForm(p => ({ ...p, copyright: e.target.value }))}
            placeholder="© 2026 Kampus Alkitab..."
          />
        </div>
      </div>

      {/* Social Media Links */}
      <div className="admin-card" style={{ marginBottom: 20 }}>
        <div className="admin-card-header">
          <span className="admin-card-title">🔗 Social Media Links</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[
            { key: 'instagram', label: 'Instagram', icon: '📸', placeholder: 'https://instagram.com/kampusalkitab' },
            { key: 'youtube', label: 'YouTube', icon: '🎬', placeholder: 'https://youtube.com/@kampusalkitab' },
            { key: 'facebook', label: 'Facebook', icon: '👥', placeholder: 'https://facebook.com/kampusalkitab' },
            { key: 'whatsapp', label: 'WhatsApp', icon: '💬', placeholder: 'https://wa.me/6281234567890' },
            { key: 'email', label: 'Email', icon: '📧', placeholder: 'info@kampusalkitab.com' },
          ].map((social) => (
            <div key={social.key} style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '10px 14px', background: '#f8fafc',
              border: '1px solid #e2e8f0', borderRadius: 10,
            }}>
              <span style={{ fontSize: '1.2rem', flexShrink: 0 }}>{social.icon}</span>
              <div style={{ flex: 1 }}>
                <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b', display: 'block', marginBottom: 4 }}>
                  {social.label}
                </label>
                <input
                  className="admin-input"
                  value={socialForm[social.key] || ''}
                  onChange={e => setSocialForm(p => ({ ...p, [social.key]: e.target.value }))}
                  placeholder={social.placeholder}
                  style={{ padding: '7px 10px', fontSize: '0.82rem' }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Preview */}
      <div className="admin-card" style={{ marginBottom: 20 }}>
        <div className="admin-card-header">
          <span className="admin-card-title">👁️ Preview</span>
        </div>
        <div style={{
          background: '#0f172a', borderRadius: 12, padding: 24,
          color: '#e2e8f0', fontFamily: "'Inter', sans-serif",
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
            {form.logoUrl && (
              <img
                src={form.logoUrl}
                alt="Logo"
                style={{ width: 32, height: 32, borderRadius: 6 }}
                onError={e => { e.target.style.display = 'none'; }}
              />
            )}
            <span style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: '1.1rem', color: '#fff' }}>
              {form.siteName || 'Nama Situs'}
            </span>
          </div>
          <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: 16 }}>
            {form.tagline || 'Tagline situs...'}
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {socialForm.instagram && <span style={{ fontSize: '0.75rem', padding: '4px 10px', background: 'rgba(255,255,255,0.1)', borderRadius: 20 }}>📸 Instagram</span>}
            {socialForm.youtube && <span style={{ fontSize: '0.75rem', padding: '4px 10px', background: 'rgba(255,255,255,0.1)', borderRadius: 20 }}>🎬 YouTube</span>}
            {socialForm.facebook && <span style={{ fontSize: '0.75rem', padding: '4px 10px', background: 'rgba(255,255,255,0.1)', borderRadius: 20 }}>👥 Facebook</span>}
            {socialForm.whatsapp && <span style={{ fontSize: '0.75rem', padding: '4px 10px', background: 'rgba(255,255,255,0.1)', borderRadius: 20 }}>💬 WhatsApp</span>}
          </div>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', marginTop: 16, paddingTop: 12 }}>
            <p style={{ fontSize: '0.72rem', color: '#64748b' }}>
              {form.copyright || '© 2026 ...'}
            </p>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button className="admin-btn admin-btn-primary" onClick={handleSave} style={{ padding: '12px 28px' }}>
          <Check size={18} /> Simpan Pengaturan
        </button>
      </div>

      {toast && <div className={`admin-toast ${toast.type}`}>{toast.msg}</div>}
    </AdminLayout>
  );
};

export default SiteSettings;
