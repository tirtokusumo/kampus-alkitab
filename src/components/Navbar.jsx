import { useState, useRef, useEffect } from 'react';
import { Bell, Search, User, LogOut, BookOpen, Flame, Settings, X, CheckCircle, Gift, Award, MessageSquare, Heart } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link, NavLink } from 'react-router-dom';
import './Navbar.css';

/* ── Mock Notifications ── */
const mockNotifications = [
  { id: 1, icon: <BookOpen size={16} />, iconBg: '#eef2ff', iconColor: '#4338ca', title: 'Kelas baru tersedia!', desc: '"Evangelism & Misi Lintas Budaya" kini bisa diakses.', time: '2 jam lalu', read: false },
  { id: 2, icon: <Award size={16} />, iconBg: '#fef9c3', iconColor: '#ca8a04', title: 'Sertifikat Terbit', desc: 'Sertifikat "Theology 101" siap diunduh di halaman Sertifikasi.', time: '1 hari lalu', read: false },
  { id: 3, icon: <CheckCircle size={16} />, iconBg: '#f0fdf4', iconColor: '#16a34a', title: 'Pembayaran Berhasil', desc: 'Pesanan #ORD-20260413-004 berhasil dikonfirmasi.', time: '2 hari lalu', read: true },
  { id: 4, icon: <Gift size={16} />, iconBg: '#fef2f2', iconColor: '#dc2626', title: 'Promo Spesial 🎉', desc: 'Diskon 30% untuk semua kelas premium sampai akhir bulan ini!', time: '3 hari lalu', read: true },
  { id: 5, icon: <MessageSquare size={16} />, iconBg: '#f0f9ff', iconColor: '#0284c7', title: 'Balasan Forum', desc: 'Budi Santoso membalas diskusi kamu di Forum Komunitas.', time: '5 hari lalu', read: true },
];

const Navbar = () => {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [showNotif, setShowNotif] = useState(false);
  const [notifications, setNotifications] = useState(mockNotifications);
  const notifRef = useRef(null);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setShowNotif(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="navbar-container">
      <div className="navbar container flex justify-between items-center h-full">
        {/* Logo Section */}
        <Link to="/" className="navbar-logo flex items-center gap-xs">
          <Flame size={28} color="var(--color-secondary)" />
          <span className="logo-text">Kampus Alkitab</span>
        </Link>
        
        {/* Categories / Navigation Links */}
        <nav className="navbar-links flex items-center gap-md">
          <NavLink to="/courses" className="nav-link">Katalog</NavLink>
          <NavLink to="/dashboard" className="nav-link">Belajarku</NavLink>
          <NavLink to="/bible" className="nav-link">Studi Alkitab</NavLink>
          <NavLink to="/community" className="nav-link">Komunitas</NavLink>
          <NavLink to="/community/small-groups" className="nav-link">Sel</NavLink>
          <NavLink to="/my-certifications" className="nav-link">Sertifikasi</NavLink>
        </nav>

        {/* Search Bar */}
        <div className="search-bar flex items-center">
          <Search className="search-icon text-secondary" size={18} />
          <input type="text" placeholder="Cari kelas, materi..." />
        </div>

        {/* User Actions */}
        <div className="nav-actions flex items-center gap-md">
          {/* Notification Bell */}
          <div className="notif-wrapper" ref={notifRef}>
            <button
              className="icon-btn relative"
              aria-label="Notifikasi"
              onClick={() => setShowNotif(!showNotif)}
            >
              <Bell size={20} />
              {unreadCount > 0 && <span className="badge-notification">{unreadCount}</span>}
            </button>

            {showNotif && (
              <div className="notif-dropdown">
                <div className="notif-dropdown-header">
                  <span className="notif-dropdown-title">Notifikasi</span>
                  {unreadCount > 0 && (
                    <button className="notif-mark-all" onClick={markAllRead}>Tandai Dibaca</button>
                  )}
                </div>
                <div className="notif-dropdown-list">
                  {notifications.map(n => (
                    <div key={n.id} className={`notif-item ${!n.read ? 'unread' : ''}`}>
                      <div className="notif-item-icon" style={{ background: n.iconBg, color: n.iconColor }}>
                        {n.icon}
                      </div>
                      <div className="notif-item-content">
                        <div className="notif-item-title">{n.title}</div>
                        <div className="notif-item-desc">{n.desc}</div>
                        <div className="notif-item-time">{n.time}</div>
                      </div>
                      {!n.read && <div className="notif-unread-dot" />}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Admin Panel Link */}
          {isAdmin && isAdmin() && (
            <Link to="/admin" className="nav-admin-btn uppercase fw-700" style={{
              display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px',
              background: '#fffbeb', color: '#b45309', border: '1px solid #fde68a',
              borderRadius: 8, fontSize: '0.8rem', textDecoration: 'none', transition: 'all 0.2s'
            }}>
              <Settings size={16} /> Panel CMS
            </Link>
          )}

          {/* Dukungan Button */}
          <Link to="/dukungan" className="icon-btn" title="Dukungan" style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 14px', background: '#fef2f2', color: '#dc2626', border: '1px solid #fecaca', borderRadius: 8, fontSize: '0.8rem', fontWeight: 600, textDecoration: 'none', transition: 'all 0.2s' }}>
            <Heart size={16} /> Dukungan
          </Link>

          {/* User Profile → navigate to settings */}
          <Link to="/settings" className="user-profile flex items-center gap-sm" title={user?.name || 'Guest'}>
            <div className="avatar" style={{ background: 'var(--color-primary)', color: 'white', fontWeight: 700, fontSize: '0.8rem' }}>
              {user?.name ? user.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() : <User size={18} />}
            </div>
            <span className="user-name fw-600 hidden md-flex" style={{ fontSize: '0.9rem', color: 'var(--color-primary-dark)' }}>
              {user?.name || 'Guest'}
            </span>
          </Link>

          <button className="icon-btn text-secondary" onClick={handleLogout} aria-label="Keluar" title="Keluar">
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
