import { Outlet, Link } from 'react-router-dom';
import { useState } from 'react';
import { Flame, ChevronDown, Menu, X, Heart, User, LogOut, Settings, ShoppingCart, Trash2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCms } from '../cms/CmsContext';
import CmsBlockInjector from '../cms/CmsBlockInjector';
import PageTransition from '../components/PageTransition';
import './PublicLayout.css';

/* Re-export a minimal nav that matches the Landing page navbar style
   so public pages (Courses, Renungan, Acara, TentangKami) look consistent. */
const publicMenus = [
  {
    label: 'Kelas',
    subs: [
      { label: 'Semua Kelas', to: '/courses' },
      { label: 'Teologi', to: '/courses?category=teologi' },
      { label: 'Kepemimpinan', to: '/courses?category=kepemimpinan' },
      { label: 'Konseling', to: '/courses?category=konseling' },
      { label: 'Praktikal', to: '/courses?category=praktikal' },
    ],
  },
  {
    label: 'Sertifikasi',
    subs: [
      { label: 'Semua Program Sertifikasi', to: '/certifications' },
      { label: 'Certified Sunday School Teacher', to: '/certifications/sunday-school' },
      { label: 'Youth & Teen Ministry Coach', to: '/certifications/youth-teen' },
      { label: 'Christian Counselor', to: '/certifications/christian-counselor' },
      { label: 'Pastoral Care Specialist', to: '/certifications/pastoral-care' },
      { label: 'Worship & Creative Ministry', to: '/certifications/worship-creative' },
      { label: 'Theology & Apologetics', to: '/certifications/theology-apologetics' },
    ],
  },
  {
    label: 'Renungan',
    subs: [
      { label: 'Renungan Harian', to: '/renungan' },
      { label: 'Ayat Hari Ini', to: '/renungan?tab=ayat' },
      { label: 'Arsip Renungan', to: '/renungan?tab=arsip' },
    ],
  },
  {
    label: 'Acara',
    subs: [
      { label: 'Konferensi', to: '/acara' },
      { label: 'Study Bible Club', to: '/acara/study-bible-club' },
      { label: 'New Life Camp', to: '/acara/new-life-camp' },
      { label: 'Seminar Online', to: '/acara?tab=seminar' },
      { label: 'Workshop', to: '/acara?tab=workshop' },
    ],
  },
  {
    label: 'Komunitas',
    subs: [
      { label: 'MinistryHub — Volunteer', to: '/ministry-hub' },
      { label: 'Forum Diskusi', to: '/community' },
      { label: 'Kelompok Kecil', to: '/community/small-groups' },
      { label: 'Doa Bersama', to: '/doa' },
    ],
  },
  {
    label: 'Tentang Kami',
    subs: [
      { label: 'Visi & Misi', to: '/tentang' },
      { label: 'Tim Pengajar', to: '/tentang?section=pengajar' },
      { label: 'Bermitra', to: '/tentang?section=bermitra' },
      { label: 'Doctrinal Transparency', to: '/tentang?section=doktrin' },
    ],
  },
  {
    label: 'Store',
    subs: [
      { label: 'Jelajahi Toko', to: '/toko' },
      { label: 'Buku & E-Book', to: '/toko' },
      { label: 'Merchandise', to: '/toko' },
      { label: 'Kaos & Apparel', to: '/toko' },
    ],
  },
];

import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';

const formatRupiah = (num) => {
  if (num === 0) return 'Gratis';
  return 'Rp ' + num.toLocaleString('id-ID');
};

const PublicLayout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);
  const { wishlistCount } = useWishlist();
  const { cartCount, cartItems, cartSubtotal, removeFromCart } = useCart();
  const { user, logout, isAdmin } = useAuth();
  const { headerMenus, siteSettings } = useCms();

  // Use CMS menus with fallback to hardcoded
  const menus = headerMenus && headerMenus.length > 0 ? headerMenus : publicMenus;

  const toggleSubmenu = (label) => {
    setOpenSubmenu(prev => prev === label ? null : label);
  };

  return (
    <div className="public-layout">
      {/* ── Navbar ── */}
      <nav className="pub-nav">
        <div className="pub-nav-inner">
          <Link to="/" className="pub-nav-brand">
            <Flame size={26} color="#f59e0b" />
            <span className="pub-nav-name">Kampus Alkitab</span>
          </Link>

          <button 
            className="pub-mobile-toggle"
            onClick={() => { setIsMobileMenuOpen(!isMobileMenuOpen); setOpenSubmenu(null); }}
          >
            {isMobileMenuOpen ? <X size={26} color="#0f172a" /> : <Menu size={26} color="#0f172a" />}
          </button>

          <div className={`pub-nav-menu-wrapper ${isMobileMenuOpen ? 'open' : ''}`}>
            <div className="pub-nav-links">
              {menus.map((m) => (
                <div key={m.label} className={`pub-nav-item ${openSubmenu === m.label ? 'pub-nav-item--open' : ''}`}>
                  <span className="pub-nav-link" onClick={() => toggleSubmenu(m.label)}>
                    {m.label} <ChevronDown size={13} className="pub-nav-chevron" />
                  </span>
                  <div className="pub-nav-dropdown">
                    <div className="pub-nav-dropdown-inner">
                      {m.subs.map((s) => (
                        <Link key={s.label} to={s.to} className="pub-nav-dropdown-item" onClick={() => { setIsMobileMenuOpen(false); setOpenSubmenu(null); }}>
                          {s.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pub-nav-actions">
              <Link to="/wishlist" className="landing-wishlist-icon" aria-label="Wishlist">
                <Heart size={20} color="#1a237e" />
                {wishlistCount > 0 && <span className="landing-cart-badge">{wishlistCount}</span>}
              </Link>

              {/* Cart Icon + Dropdown */}
              <div className="landing-cart-wrap" style={{ position: 'relative' }} onMouseEnter={() => setCartOpen(true)} onMouseLeave={() => setCartOpen(false)}>
                <Link to="/checkout" className="landing-cart-icon" onClick={() => setIsMobileMenuOpen(false)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(241, 245, 249, 0.8)', color: '#475569', position: 'relative', textDecoration: 'none' }}>
                  <ShoppingCart size={20} color="#1a237e" />
                  {cartCount > 0 && <span className="landing-cart-badge" style={{ position: 'absolute', top: '-2px', right: '-6px', minWidth: '18px', height: '18px', background: '#7c3aed', color: 'white', fontSize: '0.65rem', fontWeight: 800, borderRadius: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid white' }}>{cartCount}</span>}
                </Link>
                {/* Invisible bridge for hover */}
                {cartOpen && <div style={{ position: 'absolute', top: '100%', left: '-40px', right: '-40px', height: '14px' }} />}
                {cartOpen && (
                  <div className="landing-cart-dropdown" style={{ position: 'absolute', top: 'calc(100% + 14px)', right: '-20px', width: '340px', background: 'white', borderRadius: '14px', boxShadow: '0 12px 48px rgba(0,0,0,0.15)', border: '1px solid #e2e8f0', zIndex: 400, overflow: 'hidden' }}>
                    <div className="landing-cart-header">
                      <h4 style={{ margin: 0, fontSize: '0.95rem' }}>Keranjang ({cartCount})</h4>
                    </div>
                    <div className="landing-cart-body" style={{ maxHeight: '300px', overflowY: 'auto', padding: '10px' }}>
                      {cartCount === 0 ? (
                        <p className="empty-cart-msg" style={{ textAlign: 'center', color: '#64748b', fontSize: '0.9rem' }}>Keranjang kosong</p>
                      ) : (
                        cartItems.map((item) => (
                          <div key={item.id} className="landing-cart-item" style={{ display: 'flex', gap: '10px', marginBottom: '10px', alignItems: 'center' }}>
                            <img src={item.image} alt={item.title} className="lci-img" style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} />
                            <div className="lci-info" style={{ flex: 1 }}>
                              <p className="lci-title" style={{ margin: 0, fontSize: '0.85rem', fontWeight: 600, color: '#0f172a', display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{item.title}</p>
                              <p className="lci-price" style={{ margin: 0, fontSize: '0.8rem', color: '#1a237e', fontWeight: 700 }}>{formatRupiah(item.numericPrice)}</p>
                            </div>
                            <button className="lci-remove" onClick={() => removeFromCart(item.id)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '4px' }}>
                              <Trash2 size={14} />
                            </button>
                          </div>
                        ))
                      )}
                    </div>
                    {cartCount > 0 && (
                      <div className="landing-cart-footer" style={{ borderTop: '1px solid #e2e8f0', padding: '10px', background: '#f8fafc' }}>
                        <div className="lcf-total" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '0.9rem' }}>
                          <span>Total:</span>
                          <strong>{formatRupiah(cartSubtotal)}</strong>
                        </div>
                        <Link to="/checkout" className="lcf-btn" onClick={() => setIsMobileMenuOpen(false)} style={{ display: 'block', width: '100%', padding: '8px', background: '#1a237e', color: 'white', textAlign: 'center', borderRadius: '6px', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 600 }}>Ke Pembayaran</Link>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {user ? (
                <>
                  {isAdmin && isAdmin() && (
                    <Link to="/admin" className="pub-btn-outline" onClick={() => setIsMobileMenuOpen(false)} style={{ borderColor: '#fde68a', color: '#b45309', background: '#fffbeb' }}>
                      <Settings size={16} /> Panel CMS
                    </Link>
                  )}
                  <Link to="/dukungan" className="pub-btn-outline" onClick={() => setIsMobileMenuOpen(false)} style={{ borderColor: '#fecaca', color: '#dc2626', background: '#fef2f2' }}>
                    <Heart size={16} /> Dukungan
                  </Link>
                  <Link to="/dashboard" className="pub-btn-primary" onClick={() => setIsMobileMenuOpen(false)}>
                    <User size={16} /> Dashboard
                  </Link>
                  <button className="pub-btn-outline" onClick={() => { logout(); setIsMobileMenuOpen(false); }} aria-label="Keluar">
                    <LogOut size={16} /> Keluar
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="pub-btn-outline" onClick={() => setIsMobileMenuOpen(false)}>Masuk</Link>
                  <Link to="/dukungan" className="pub-btn-outline" onClick={() => setIsMobileMenuOpen(false)} style={{ borderColor: '#fecaca', color: '#dc2626', background: '#fef2f2' }}>
                    <Heart size={16} /> Dukungan
                  </Link>
                  <Link to="/register" className="pub-btn-primary" onClick={() => setIsMobileMenuOpen(false)}>Daftar Gratis</Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* ── Page content ── */}
      <main className="pub-main">
        <PageTransition>
          <CmsBlockInjector />
          <Outlet />
        </PageTransition>
      </main>

      {/* ── Full Footer ── */}
      <footer className="pub-footer">
        <div className="pub-footer-top">
          <div className="pub-footer-col pub-footer-about">
            <Link to="/" className="pub-footer-brand">
              <Flame size={22} color="#f59e0b" />
              <span>{siteSettings?.siteName || 'Kampus Alkitab'}</span>
            </Link>
            <p className="pub-footer-desc">{siteSettings?.tagline || 'Platform pendidikan rohani digital #1 di Indonesia. Bertumbuh dalam Firman, berdampak dalam pelayanan.'}</p>
            <div className="pub-footer-social">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="pub-social-link">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="pub-social-link">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.43z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="pub-social-link">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="pub-social-link">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              </a>
            </div>
          </div>
          <div className="pub-footer-col">
            <h4 className="pub-footer-heading">Belajar</h4>
            <Link to="/courses" className="pub-footer-link">Katalog Kelas</Link>
            <Link to="/certifications" className="pub-footer-link">Sertifikasi</Link>
            <Link to="/renungan" className="pub-footer-link">Renungan</Link>
            <Link to="/toko" className="pub-footer-link">Toko Sumber Daya</Link>
          </div>
          <div className="pub-footer-col">
            <h4 className="pub-footer-heading">Komunitas</h4>
            <Link to="/acara" className="pub-footer-link">Acara</Link>
            <Link to="/ministry-hub" className="pub-footer-link">MinistryHub</Link>
            <Link to="/community" className="pub-footer-link">Forum Diskusi</Link>
            <Link to="/tentang" className="pub-footer-link">Tentang Kami</Link>
          </div>
          <div className="pub-footer-col">
            <h4 className="pub-footer-heading">Bantuan</h4>
            <Link to="/login" className="pub-footer-link">Masuk</Link>
            <Link to="/register" className="pub-footer-link">Daftar</Link>
            <a href="mailto:info@kampusalkitab.com" className="pub-footer-link">Hubungi Kami</a>
            <Link to="/privacy" className="pub-footer-link">Kebijakan Privasi</Link>
            <Link to="/terms" className="pub-footer-link">Syarat & Ketentuan</Link>
          </div>
        </div>
        <div className="pub-footer-bottom">
          <span className="pub-footer-copy">{siteSettings?.copyright || '© 2026 Kampus Alkitab · Digital Ministry. Segala kemuliaan bagi Tuhan.'}</span>
        </div>
      </footer>
    </div>
  );
};

export default PublicLayout;
