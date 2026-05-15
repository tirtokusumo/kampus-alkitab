import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard, FileText, Menu as MenuIcon, Palette,
  Settings, LogOut, ChevronLeft, Menu, X, Image
} from 'lucide-react';
import './admin.css';

const sidebarItems = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/admin' },
  { label: 'Pages', icon: FileText, path: '/admin/pages' },
  { label: 'Media', icon: Image, path: '/admin/media' },
  { label: 'Menu Builder', icon: MenuIcon, path: '/admin/menus' },
  { label: 'Theme & Warna', icon: Palette, path: '/admin/theme' },
  { label: 'Site Settings', icon: Settings, path: '/admin/settings' },
];

const AdminLayout = ({ children, title }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const initials = user?.name
    ? user.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
    : 'AD';

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <Link to="/" className="admin-sidebar-brand">
          <img src="/logo-dark.png" alt="Logo" />
          <div className="admin-sidebar-brand-text">
            <span className="admin-sidebar-brand-name">Kampus Alkitab</span>
            <span className="admin-sidebar-brand-tag">Content Manager</span>
          </div>
        </Link>

        <nav className="admin-sidebar-nav">
          <div className="admin-sidebar-section">Menu Utama</div>
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`admin-nav-link ${isActive ? 'active' : ''}`}
                onClick={() => setSidebarOpen(false)}
              >
                <Icon size={18} className="admin-nav-icon" />
                {item.label}
              </Link>
            );
          })}

          <div className="admin-sidebar-section">Lainnya</div>
          <Link to="/" className="admin-nav-link" onClick={() => setSidebarOpen(false)}>
            <ChevronLeft size={18} className="admin-nav-icon" />
            Back to Website
          </Link>
          <button className="admin-nav-link" onClick={handleLogout}>
            <LogOut size={18} className="admin-nav-icon" />
            Logout
          </button>
        </nav>

        <div className="admin-sidebar-footer">
          <div className="admin-sidebar-user">
            <div className="admin-sidebar-avatar">{initials}</div>
            <div className="admin-sidebar-user-info">
              <span className="admin-sidebar-user-name">{user?.name || 'Admin'}</span>
              <span className="admin-sidebar-user-role">Super Admin</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile toggle */}
      <button className="admin-mobile-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
        {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      {/* Main Content */}
      <main className="admin-main">
        <div className="admin-topbar">
          <h1 className="admin-topbar-title">{title || 'Dashboard'}</h1>
          <div className="admin-topbar-actions">
            <Link to="/" className="admin-btn-back">
              <ChevronLeft size={16} /> Lihat Website
            </Link>
          </div>
        </div>
        <div className="admin-content">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
