import { useState } from 'react';
import {
  Settings as SettingsIcon, User, Shield, ShoppingBag, Camera,
  Save, Eye, EyeOff, CheckCircle, Clock, Package
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import SEOHead from '../components/SEOHead';
import usePageTitle from '../hooks/usePageTitle';
import './Settings.css';

/* ── Mock order history ── */
const mockOrders = [
  { id: 'ORD-20260401-001', title: 'Panduan Studi Alkitab Induktif', price: 'Rp 45.000', date: '1 Apr 2026', status: 'success', statusLabel: 'Selesai' },
  { id: 'ORD-20260328-002', title: 'Kaos "Faith Over Fear"', price: 'Rp 120.000', date: '28 Mar 2026', status: 'success', statusLabel: 'Dikirim' },
  { id: 'ORD-20260325-003', title: 'Teologi Sistematika Modern (E-Book)', price: 'Rp 89.000', date: '25 Mar 2026', status: 'success', statusLabel: 'Selesai' },
  { id: 'ORD-20260413-004', title: 'Mug "Grace Upon Grace"', price: 'Rp 55.000', date: '13 Apr 2026', status: 'pending', statusLabel: 'Dikemas' },
];

const Settings = () => {
  usePageTitle('Pengaturan Akun');
  const { user } = useAuth();
  const { showToast } = useCart();

  const [activeTab, setActiveTab] = useState('profile');
  const [profile, setProfile] = useState({
    name: user?.name || 'John Doe',
    email: user?.email || 'john@gereja.com',
    phone: '+62 812-3456-7890',
    bio: 'Hamba Tuhan yang sedang bertumbuh dalam iman dan pelayanan.',
    church: 'GBI Bandung',
    city: 'Bandung',
  });

  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: '',
  });
  const [showCurrentPw, setShowCurrentPw] = useState(false);
  const [showNewPw, setShowNewPw] = useState(false);

  const handleProfileSave = () => {
    showToast('Profil berhasil disimpan!', 'success');
  };

  const handlePasswordSave = () => {
    if (passwords.new.length < 6) {
      showToast('Password baru minimal 6 karakter!', 'error');
      return;
    }
    if (passwords.new !== passwords.confirm) {
      showToast('Konfirmasi password tidak cocok!', 'error');
      return;
    }
    showToast('Password berhasil diubah!', 'success');
    setPasswords({ current: '', new: '', confirm: '' });
  };

  const tabs = [
    { key: 'profile', label: 'Profil Saya', icon: <User size={16} /> },
    { key: 'security', label: 'Keamanan', icon: <Shield size={16} /> },
    { key: 'orders', label: 'Riwayat Pesanan', icon: <ShoppingBag size={16} /> },
  ];

  return (
    <div className="settings-page">
      <SEOHead title="Pengaturan Akun" description="Kelola profil, keamanan, dan riwayat pesanan akun Kampus Alkitab kamu." />

      {/* Header */}
      <div className="settings-header">
        <div className="settings-header-icon"><SettingsIcon size={24} /></div>
        <div>
          <h1>Pengaturan Akun</h1>
          <p>Kelola profil, keamanan, dan riwayat pesanan</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="settings-tabs">
        {tabs.map(t => (
          <button
            key={t.key}
            className={`settings-tab ${activeTab === t.key ? 'active' : ''}`}
            onClick={() => setActiveTab(t.key)}
          >
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      {/* ── Profile Tab ── */}
      {activeTab === 'profile' && (
        <>
          <div className="settings-card">
            <div className="settings-card-title"><User size={18} /> Foto & Informasi</div>

            <div className="settings-avatar-section">
              <div className="settings-avatar">
                {profile.name.charAt(0).toUpperCase()}
              </div>
              <div className="settings-avatar-info">
                <h3>{profile.name}</h3>
                <p>{user?.level || 'Level 2: Disciple'}</p>
                <button className="settings-avatar-btn"><Camera size={13} /> Ubah Foto</button>
              </div>
            </div>

            <div className="settings-form">
              <div className="settings-field-row">
                <div className="settings-field">
                  <label className="settings-label">Nama Lengkap</label>
                  <input
                    className="settings-input"
                    value={profile.name}
                    onChange={e => setProfile(p => ({ ...p, name: e.target.value }))}
                  />
                </div>
                <div className="settings-field">
                  <label className="settings-label">Email</label>
                  <input className="settings-input" value={profile.email} disabled />
                </div>
              </div>

              <div className="settings-field-row">
                <div className="settings-field">
                  <label className="settings-label">Nomor Telepon</label>
                  <input
                    className="settings-input"
                    value={profile.phone}
                    onChange={e => setProfile(p => ({ ...p, phone: e.target.value }))}
                  />
                </div>
                <div className="settings-field">
                  <label className="settings-label">Gereja</label>
                  <input
                    className="settings-input"
                    value={profile.church}
                    onChange={e => setProfile(p => ({ ...p, church: e.target.value }))}
                  />
                </div>
              </div>

              <div className="settings-field-row">
                <div className="settings-field">
                  <label className="settings-label">Kota</label>
                  <input
                    className="settings-input"
                    value={profile.city}
                    onChange={e => setProfile(p => ({ ...p, city: e.target.value }))}
                  />
                </div>
                <div className="settings-field" />
              </div>

              <div className="settings-field">
                <label className="settings-label">Bio Singkat</label>
                <textarea
                  className="settings-textarea"
                  value={profile.bio}
                  onChange={e => setProfile(p => ({ ...p, bio: e.target.value }))}
                  rows={3}
                />
              </div>

              <button className="settings-save-btn" onClick={handleProfileSave}>
                <Save size={16} /> Simpan Perubahan
              </button>
            </div>
          </div>
        </>
      )}

      {/* ── Security Tab ── */}
      {activeTab === 'security' && (
        <div className="settings-card">
          <div className="settings-card-title"><Shield size={18} /> Ubah Password</div>
          <div className="settings-form">
            <div className="settings-field">
              <label className="settings-label">Password Saat Ini</label>
              <div style={{ position: 'relative' }}>
                <input
                  className="settings-input"
                  type={showCurrentPw ? 'text' : 'password'}
                  value={passwords.current}
                  onChange={e => setPasswords(p => ({ ...p, current: e.target.value }))}
                  placeholder="Masukkan password saat ini"
                  style={{ paddingRight: 42 }}
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPw(!showCurrentPw)}
                  style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', padding: 0 }}
                >
                  {showCurrentPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="settings-field">
              <label className="settings-label">Password Baru</label>
              <div style={{ position: 'relative' }}>
                <input
                  className="settings-input"
                  type={showNewPw ? 'text' : 'password'}
                  value={passwords.new}
                  onChange={e => setPasswords(p => ({ ...p, new: e.target.value }))}
                  placeholder="Minimal 6 karakter"
                  style={{ paddingRight: 42 }}
                />
                <button
                  type="button"
                  onClick={() => setShowNewPw(!showNewPw)}
                  style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', padding: 0 }}
                >
                  {showNewPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              <span className="settings-pw-hint">Gunakan kombinasi huruf, angka, dan simbol</span>
            </div>

            <div className="settings-field">
              <label className="settings-label">Konfirmasi Password Baru</label>
              <input
                className="settings-input"
                type="password"
                value={passwords.confirm}
                onChange={e => setPasswords(p => ({ ...p, confirm: e.target.value }))}
                placeholder="Ulangi password baru"
              />
            </div>

            <button className="settings-save-btn" onClick={handlePasswordSave}>
              <Shield size={16} /> Ubah Password
            </button>
          </div>
        </div>
      )}

      {/* ── Orders Tab ── */}
      {activeTab === 'orders' && (
        <div className="settings-card">
          <div className="settings-card-title"><ShoppingBag size={18} /> Riwayat Pesanan</div>

          {mockOrders.length === 0 ? (
            <div className="settings-empty-orders">
              <Package size={48} />
              <h3>Belum Ada Pesanan</h3>
              <p>Pesanan kamu akan muncul di sini setelah melakukan pembelian.</p>
            </div>
          ) : (
            <div className="settings-orders">
              {mockOrders.map(order => (
                <div key={order.id} className="settings-order-card">
                  <div className={`settings-order-icon ${order.status}`}>
                    {order.status === 'success' ? <CheckCircle size={20} /> : <Clock size={20} />}
                  </div>
                  <div className="settings-order-info">
                    <div className="settings-order-title">{order.title}</div>
                    <div className="settings-order-meta">
                      <span>{order.id}</span>
                      <span>{order.date}</span>
                      <span>{order.price}</span>
                    </div>
                  </div>
                  <span className={`settings-order-status ${order.status}`}>
                    {order.statusLabel}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Settings;
