import { Link } from 'react-router-dom';
import {
  FileText, Menu, Palette, Settings, ArrowRight,
  LayoutDashboard, Globe, Eye, Image
} from 'lucide-react';
import { useCms } from '../../cms/CmsContext';
import AdminLayout from './AdminLayout';

const AdminDashboard = () => {
  const { pages, headerMenus, footerMenus, media } = useCms();

  const totalMenuItems = headerMenus.reduce((acc, m) => acc + 1 + (m.subs?.length || 0), 0);
  const totalFooterLinks = footerMenus.reduce((acc, col) => acc + (col.links?.length || 0), 0);

  const stats = [
    { label: 'Halaman', value: pages.length, icon: FileText, color: 'blue' },
    { label: 'Menu Items', value: totalMenuItems, icon: Menu, color: 'purple' },
    { label: 'Footer Links', value: totalFooterLinks, icon: Globe, color: 'teal' },
    { label: 'Media Files', value: media.length, icon: Image, color: 'amber' },
  ];

  const quickActions = [
    { label: 'Kelola Pages', icon: FileText, to: '/admin/pages' },
    { label: 'Kelola Media', icon: Image, to: '/admin/media' },
    { label: 'Edit Menu', icon: Menu, to: '/admin/menus' },
    { label: 'Ubah Warna', icon: Palette, to: '/admin/theme' },
    { label: 'Site Settings', icon: Settings, to: '/admin/settings' },
  ];

  return (
    <AdminLayout title="Dashboard">
      {/* Welcome */}
      <div className="admin-card" style={{ 
        background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a78bfa 100%)', 
        color: '#fff', 
        marginBottom: 24,
        border: 'none' 
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <h2 style={{ fontFamily: 'Outfit', fontSize: '1.5rem', fontWeight: 800, marginBottom: 6, color: '#fff' }}>
              Selamat Datang di CMS! 🎉
            </h2>
            <p style={{ fontSize: '0.92rem', opacity: 0.9, maxWidth: 500 }}>
              Dari sini, Anda dapat mengelola seluruh konten website Kampus Alkitab — halaman, menu, warna tema, dan pengaturan situs.
            </p>
          </div>
          <Link to="/" target="_blank" className="admin-btn" style={{ 
            background: 'rgba(255,255,255,0.2)', 
            color: '#fff', 
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255,255,255,0.3)' 
          }}>
            <Eye size={16} /> Lihat Website
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="admin-stats-grid">
        {stats.map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={i} className="admin-stat-card">
              <div className={`admin-stat-icon ${s.color}`}>
                <Icon size={22} />
              </div>
              <div className="admin-stat-info">
                <h3>{s.value}</h3>
                <p>{s.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="admin-card">
        <div className="admin-card-header">
          <span className="admin-card-title">⚡ Aksi Cepat</span>
        </div>
        <div className="admin-quick-grid">
          {quickActions.map((a, i) => {
            const Icon = a.icon;
            return (
              <Link key={i} to={a.to} className="admin-quick-btn">
                <Icon size={18} />
                {a.label}
                <ArrowRight size={14} style={{ marginLeft: 'auto' }} />
              </Link>
            );
          })}
        </div>
      </div>

      {/* Recent Pages */}
      <div className="admin-card" style={{ marginTop: 20 }}>
        <div className="admin-card-header">
          <span className="admin-card-title">📄 Halaman Terbaru</span>
          <Link to="/admin/pages" className="admin-btn admin-btn-sm admin-btn-secondary">
            Lihat Semua <ArrowRight size={14} />
          </Link>
        </div>
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Judul</th>
                <th>Slug</th>
                <th>Status</th>
                <th>Tanggal</th>
              </tr>
            </thead>
            <tbody>
              {pages.slice(0, 5).map((p) => (
                <tr key={p.id}>
                  <td style={{ fontWeight: 600 }}>{p.title}</td>
                  <td><span className="slug-cell">{p.slug}</span></td>
                  <td><span className={`admin-badge ${p.status}`}>{p.status}</span></td>
                  <td style={{ color: '#94a3b8', fontSize: '0.82rem' }}>{p.createdAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
