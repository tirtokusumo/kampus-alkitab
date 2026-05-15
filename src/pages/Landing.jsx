import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen, Award, Users, Play, Star, ArrowRight, CheckCircle,
  ChevronRight, Globe, Shield, Zap, Heart, Calendar, ChevronDown,
  Mail, Phone, MapPin, HandHeart, Music, Book, Mic, MessageCircle,
  ShoppingCart, X, Trash2, Menu
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import { useCms } from '../cms/CmsContext';
import CmsBlockInjector from '../cms/CmsBlockInjector';
import AnimatedCounter from '../components/AnimatedCounter';
import { dummyPrayers } from './PrayerWall';
import './Landing.css';

const featuredCourses = [
  { id: 1, title: 'Theology 101: Foundations of Faith', category: 'Theology', level: 'Beginner', rating: 4.8, students: 1240, price: 'Gratis', image: 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?auto=format&fit=crop&q=80&w=600&h=340' },
  { id: 2, title: 'Youth Ministry Leadership', category: 'Ministry', level: 'Intermediate', rating: 4.9, students: 842, price: 'Rp 150.000', image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=600&h=340' },
  { id: 3, title: 'Christian Counseling Methods', category: 'Counseling', level: 'Advanced', rating: 4.7, students: 560, price: 'Rp 200.000', image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=600&h=340' },
  { id: 4, title: 'Worship Team Excellence', category: 'Worship', level: 'Beginner', rating: 4.9, students: 2100, price: 'Gratis', image: 'https://images.unsplash.com/photo-1508558936510-0af1e3cccbab?auto=format&fit=crop&q=80&w=600&h=340' },
];

const testimonials = [
  { name: 'Pdt. Samuel Hartono', role: 'Gembala Sidang, GBI Surabaya', quote: 'Kampus Alkitab mengubah cara jemaat kami belajar firman Tuhan. Kelas theologynya sangat mendalam dan praktis untuk pelayanan.', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=80&h=80' },
  { name: 'Fera Massie', role: 'Pemimpin Pujian, GPDI Jakarta', quote: 'Sertifikasi Worship Team Excellence benar-benar memperlengkapi tim ibadah kami. Latihan yang sistematis dan berbasis Alkitab.', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=80&h=80' },
  { name: 'Yohanes Tanaka', role: 'Konselor Gereja, HKBP Medan', quote: 'Modul Christian Counseling Methods sangat membantu pelayanan konseling saya. Komprehensif dan berbasis Alkitab dengan referensi psikologi modern.', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=80&h=80' },
];

const features = [
  { icon: <BookOpen size={28} />, title: 'Kurikulum Berbasis Alkitab', desc: 'Setiap materi dikurasi oleh teolog dan praktisi pelayanan berpengalaman.' },
  { icon: <Award size={28} />, title: 'Sertifikasi Resmi', desc: 'Dapatkan sertifikat yang diakui gereja dan lembaga pelayanan.' },
  { icon: <Globe size={28} />, title: 'Belajar Kapan Saja', desc: 'Akses seluruh materi 24/7 dari perangkat apa pun — HP, tablet, atau komputer.' },
  { icon: <Users size={28} />, title: 'Komunitas Iman', desc: 'Bergabung dengan ribuan murid Kristus yang saling mendukung pertumbuhan.' },
  { icon: <Shield size={28} />, title: 'Konten Berkualitas', desc: 'Video HD, PDF studi, kuis interaktif, dan sesi live dengan pembicara tamu.' },
  { icon: <Zap size={28} />, title: 'Progress Terpantau', desc: 'Dashboard personal untuk memantau kemajuan belajar dan pencapaianmu.' },
];

const events = [
  {
    id: 1,
    title: 'Konferensi Kepemimpinan Gereja 2026',
    date: '18–19 April 2026',
    location: 'Jakarta Convention Center',
    type: 'Konferensi',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=600&h=340',
    spots: '200 kursi tersisa',
  },
  {
    id: 2,
    title: 'Seminar Teologi & Apologetika',
    date: '3 Mei 2026',
    location: 'Kampus Online (Live Streaming)',
    type: 'Seminar',
    image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&q=80&w=600&h=340',
    spots: 'Gratis · Terbuka Umum',
  },
  {
    id: 3,
    title: 'Workshop Worship Leading',
    date: '24 Mei 2026',
    location: 'Surabaya & Streaming',
    type: 'Workshop',
    image: 'https://images.unsplash.com/photo-1508558936510-0af1e3cccbab?auto=format&fit=crop&q=80&w=600&h=340',
    spots: '50 kursi tersisa',
  },
];

const resources = [
  {
    id: 'eb-1',
    title: 'Dasar-Dasar Iman Kristen',
    type: 'E-Book',
    category: 'E-Book',
    price: 'Gratis',
    numericPrice: 0,
    oldPrice: null,
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=300&h=420',
    badge: 'Terlaris',
    isNew: false,
    isPhysical: false,
  },
  {
    id: 'bk-1',
    title: 'Panduan Studi Alkitab Induktif',
    type: 'Buku Cetak',
    category: 'Buku',
    price: 'Rp 45.000',
    numericPrice: 45000,
    oldPrice: 'Rp 65.000',
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&q=80&w=300&h=420',
    badge: null,
    isNew: true,
    isPhysical: true,
  },
  {
    id: 'eb-3',
    title: 'Kepemimpinan Berbasis Servanthood',
    type: 'E-Book',
    category: 'E-Book',
    price: 'Rp 75.000',
    numericPrice: 75000,
    oldPrice: null,
    image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80&w=300&h=420',
    badge: 'Baru',
    isNew: true,
    isPhysical: false,
  },
  {
    id: 'pc-3',
    title: 'Doa & Kehidupan Rohani Yang Kuat',
    type: 'Audio Book',
    category: 'Podcast',
    price: 'Gratis',
    numericPrice: 0,
    oldPrice: null,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300&h=420',
    badge: null,
    isNew: false,
    isPhysical: false,
  },
];

const navMenus = [
  {
    label: 'Kelas',
    href: '#courses',
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
    href: '/certifications',
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
    href: '#devotional',
    subs: [
      { label: 'Renungan Harian', to: '/renungan' },
      { label: 'Ayat Hari Ini', to: '/renungan?tab=ayat' },
      { label: 'Arsip Renungan', to: '/renungan?tab=arsip' },
    ],
  },
  {
    label: 'Acara',
    href: '#events',
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
    href: '#prayer',
    subs: [
      { label: 'MinistryHub — Volunteer', to: '/ministry-hub' },
      { label: 'Forum Diskusi', to: '/community' },
      { label: 'Kelompok Kecil', to: '/community/small-groups' },
      { label: 'Doa Bersama', to: '/doa' },
    ],
  },
  {
    label: 'Tentang Kami',
    href: '/tentang',
    subs: [
      { label: 'Visi & Misi', to: '/tentang' },
      { label: 'Tim Pengajar', to: '/tentang?section=pengajar' },
      { label: 'Bermitra', to: '/tentang?section=bermitra' },
      { label: 'Doctrinal Transparency', to: '/tentang?section=doktrin' },
    ],
  },
  {
    label: 'Store',
    href: '#resources',
    subs: [
      { label: 'Jelajahi Toko', to: '/toko' },
      { label: 'Buku & E-Book', to: '/toko' },
      { label: 'Merchandise', to: '/toko' },
      { label: 'Kaos & Apparel', to: '/toko' },
    ],
  },
];

const formatRupiah = (num) => {
  if (num === 0) return 'Gratis';
  return 'Rp ' + num.toLocaleString('id-ID');
};

const Landing = () => {
  const { addToCart, removeFromCart, cartItems, cartCount, cartSubtotal, showToast } = useCart();
  const { wishlistCount } = useWishlist();
  const { headerMenus, footerMenus, siteSettings } = useCms();
  const { user, logout } = useAuth();
  const [cartOpen, setCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Use CMS menus or fallback to hardcoded
  const navMenusData = headerMenus && headerMenus.length > 0 ? headerMenus : navMenus;

  const isInCart = (id) => cartItems.some(i => i.id === id);

  return (
    <div className="landing-page">

      {/* ── NAVBAR ── */}
      <nav className="landing-nav">
        <div className="landing-nav-inner">
          <Link to="/" className="landing-nav-brand">
            <img src="/logo-dark.png" alt="Kampus Alkitab" className="landing-nav-logo" />
            <span className="landing-nav-name">Kampus Alkitab</span>
          </Link>
          <button 
            className="landing-mobile-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>

          <div className={`landing-nav-menu-wrapper ${isMobileMenuOpen ? 'open' : ''}`}>
            <div className="landing-nav-links">
              {navMenusData.map((m) => (
                <div key={m.label} className="landing-nav-item">
                  <a href={m.href} className="landing-nav-link">
                    {m.label} <ChevronDown size={13} className="nav-chevron" />
                  </a>
                  {/* Always in DOM, CSS :hover controls visibility — no JS gap issue */}
                  <div className="nav-dropdown">
                    <div className="nav-dropdown-inner">
                      {m.subs.map((s) => (
                        <Link key={s.label} to={s.to} className="nav-dropdown-item" onClick={() => setIsMobileMenuOpen(false)}>
                          {s.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Wishlist Icon */}
            <Link to="/wishlist" className="landing-wishlist-icon" aria-label="Wishlist">
              <Heart size={20} color="#475569" />
              {wishlistCount > 0 && <span className="landing-cart-badge">{wishlistCount}</span>}
            </Link>

            {/* Cart Icon + Dropdown */}
            <div className="landing-cart-wrap" onMouseEnter={() => setCartOpen(true)} onMouseLeave={() => setCartOpen(false)}>
              <Link to="/checkout" className="landing-cart-icon" onClick={() => setIsMobileMenuOpen(false)}>
                <ShoppingCart size={20} />
                {cartCount > 0 && <span className="landing-cart-badge">{cartCount}</span>}
              </Link>
              {cartOpen && (
                <div className="landing-cart-dropdown">
                  <div className="landing-cart-header">
                    <h4>Keranjang ({cartCount})</h4>
                  </div>
                  <div className="landing-cart-body">
                    {cartCount === 0 ? (
                      <p className="empty-cart-msg">Keranjang kosong</p>
                    ) : (
                      cartItems.map((item) => (
                        <div key={item.id} className="landing-cart-item">
                          <img src={item.image} alt={item.title} className="lci-img" />
                          <div className="lci-info">
                            <p className="lci-title">{item.title}</p>
                            <p className="lci-price">{formatRupiah(item.numericPrice)}</p>
                          </div>
                          <button className="lci-remove" onClick={() => removeFromCart(item.id)}>
                            <Trash2 size={14} />
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                  {cartCount > 0 && (
                    <div className="landing-cart-footer">
                      <div className="lcf-total">
                        <span>Total:</span>
                        <strong>{formatRupiah(cartSubtotal)}</strong>
                      </div>
                      <Link to="/checkout" className="lcf-btn" onClick={() => setIsMobileMenuOpen(false)}>Ke Pembayaran</Link>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="landing-nav-actions">
              {user ? (
                <>
                  <Link to="/dukungan" className="landing-btn-give" onClick={() => setIsMobileMenuOpen(false)}>
                    <Heart size={16} /> Dukungan
                  </Link>
                  <Link to="/dashboard" className="landing-btn-primary" onClick={() => setIsMobileMenuOpen(false)}>
                    Dashboard
                  </Link>
                  <button className="landing-btn-outline" onClick={() => { logout(); setIsMobileMenuOpen(false); }}>
                    Keluar
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="landing-btn-outline" onClick={() => setIsMobileMenuOpen(false)}>Masuk</Link>
                  <Link to="/dukungan" className="landing-btn-give" onClick={() => setIsMobileMenuOpen(false)}>
                    <Heart size={16} /> Dukungan
                  </Link>
                  <Link to="/register" className="landing-btn-primary" onClick={() => setIsMobileMenuOpen(false)}>Daftar Gratis</Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      <CmsBlockInjector slugOverride="/" />

      {/* ── HERO ── */}
      <section className="landing-hero">
        <div
          className="landing-hero-bg-img"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=90&w=1600')" }}
        />
        <div className="landing-hero-overlay" />
        <div className="landing-hero-inner">
          <div className="landing-hero-text">
            <div className="landing-hero-badge">
              <Zap size={14} /> Platform LMS Kristen #1 Indonesia
            </div>
            <h1 className="landing-hero-title">
              Bertumbuh dalam Firman,<br />
              <span className="landing-hero-accent">Berdampak dalam Pelayanan</span>
            </h1>
            <p className="landing-hero-desc">
              Kampus Alkitab adalah platform pendidikan rohani digital yang menyediakan ratusan kelas teologi, kepemimpinan, konseling, dan pelayanan gereja — untuk semua usia dan tingkat.
            </p>
            <div className="landing-hero-ctas">
              <Link to="/register" className="hero-btn-primary">
                Mulai Belajar Gratis <ArrowRight size={18} />
              </Link>
              <a href="#courses" className="hero-btn-ghost">
                <Play size={16} /> Lihat Kelas
              </a>
            </div>
            <div className="landing-hero-trust">
              <div className="trust-item"><CheckCircle size={15} /> Tanpa kartu kredit</div>
              <div className="trust-item"><CheckCircle size={15} /> Akses seumur hidup</div>
              <div className="trust-item"><CheckCircle size={15} /> Sertifikasi resmi</div>
            </div>
          </div>
        </div>
        <a href="#devotional" className="landing-hero-scroll">
          <ChevronDown size={32} />
        </a>
      </section>

      {/* ── STATS BAR ── */}
      <section className="landing-stats">
        <div className="landing-stats-inner">
          {[
            { num: '12.000+', lbl: 'Murid Aktif', icon: <Users size={22} /> },
            { num: '150+', lbl: 'Kelas Tersedia', icon: <BookOpen size={22} /> },
            { num: '45+', lbl: 'Pengajar Expert', icon: <Award size={22} /> },
            { num: '98%', lbl: 'Tingkat Kepuasan', icon: <Star size={22} /> },
          ].map((s, i) => (
            <div key={i} className="stat-bar-item">
              <div className="stat-bar-icon">{s.icon}</div>
              <div>
                <div className="stat-bar-num">
                  <AnimatedCounter target={s.num} />
                </div>
                <div className="stat-bar-lbl">{s.lbl}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── RENUNGAN HARIAN ── */}
      <section className="landing-devotional" id="devotional">
        <div className="devotional-inner">
          <div className="devotional-text">
            <div className="section-eyebrow light">Renungan Harian</div>
            <h2 className="devotional-title">Firman Tuhan untuk Hari Ini</h2>
            <div className="devotional-verse">
              <span className="verse-mark">"</span>
              Tetapi carilah dahulu Kerajaan Allah dan kebenarannya, maka semuanya itu akan ditambahkan kepadamu.
              <span className="verse-ref">— Matius 6:33</span>
            </div>
            <p className="devotional-body">
              Seringkali kita menghabiskan energi mengejar hal-hal yang kelihatan penting—karir, pengakuan, stabilitas. Namun Yesus mengundang kita untuk membalik prioritas itu. Ketika kita menjadikan kerajaan-Nya sebagai pusat hidup kita, segala yang kita butuhkan akan disediakan bukan karena kita berhenti peduli, tetapi karena kita mulai mempercayai yang benar.
            </p>
            <div className="devotional-actions">
              <Link to="/renungan" className="hero-btn-primary">
                Baca Renungan Lengkap <ArrowRight size={16} />
              </Link>
              <Link to="/renungan?tab=arsip" className="devotional-archive-link">
                <BookOpen size={15} /> Arsip Renungan
              </Link>
            </div>
          </div>
          <div className="devotional-visual">
            <img
              src="https://images.unsplash.com/photo-1504052434569-70ad5836ab65?auto=format&fit=crop&q=80&w=520&h=420"
              alt="Baca Alkitab"
              className="devotional-img"
            />
            <div className="devotional-img-badge">
              <Calendar size={16} />
              <span>{new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date())}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURED COURSES ── */}
      <section className="landing-section" id="courses">
        <div className="landing-section-inner">
          <div className="section-header">
            <div className="section-eyebrow">Kelas Unggulan</div>
            <h2 className="section-title">Mulai Perjalananmu Hari Ini</h2>
            <p className="section-desc">Dari teologi dasar hingga kepemimpinan gereja lanjutan — ada kelas untuk setiap tahap pelayananmu.</p>
          </div>
          <div className="landing-courses-grid">
            {featuredCourses.map(c => (
              <div key={c.id} className="landing-course-card">
                <div className="lc-thumb">
                  <img src={c.image} alt={c.title} className="lc-img" loading="lazy" />
                  <div className="lc-overlay"><Play size={36} color="white" /></div>
                  {c.price === 'Gratis' && <span className="lc-free-tag">Gratis</span>}
                </div>
                <div className="lc-body">
                  <span className="lc-category">{c.category}</span>
                  <h3 className="lc-title">{c.title}</h3>
                  <div className="lc-meta">
                    <Star size={13} fill="#f59e0b" color="#f59e0b" />
                    <span className="lc-rating">{c.rating}</span>
                    <span className="lc-students">({c.students.toLocaleString()} murid)</span>
                  </div>
                  <div className="lc-footer">
                    <span className="lc-level">{c.level}</span>
                    <span className="lc-price">{c.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="section-cta">
            <Link to="/register" className="landing-btn-primary large">
              Lihat Semua Kelas <ChevronRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── ACARA & KONFERENSI ── */}
      <section className="landing-section events-section" id="events">
        <div className="landing-section-inner">
          <div className="section-header">
            <div className="section-eyebrow">Acara Mendatang</div>
            <h2 className="section-title">Konferensi & Seminar</h2>
            <p className="section-desc">Bergabunglah dalam acara-acara rohani yang memperlengkapi dan menginspirasi pelayan Tuhan.</p>
          </div>
          <div className="events-grid">
            {events.map(ev => (
              <div key={ev.id} className="event-card">
                <div className="event-thumb">
                  <img src={ev.image} alt={ev.title} className="event-img" loading="lazy" />
                  <div className="event-type-badge">{ev.type}</div>
                </div>
                <div className="event-body">
                  <div className="event-date">
                    <Calendar size={15} />
                    <span>{ev.date}</span>
                  </div>
                  <h3 className="event-title">{ev.title}</h3>
                  <div className="event-location">
                    <MapPin size={14} />
                    <span>{ev.location}</span>
                  </div>
                  <div className="event-footer">
                    <span className="event-spots">{ev.spots}</span>
                    <a href="#" className="event-register-btn">Daftar Sekarang →</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="landing-section alt" id="features">
        <div className="landing-section-inner">
          <div className="section-header">
            <div className="section-eyebrow">Mengapa Kampus Alkitab?</div>
            <h2 className="section-title">Platform Terlengkap untuk Pertumbuhan Rohani</h2>
          </div>
          <div className="features-grid">
            {features.map((f, i) => (
              <div key={i} className="feature-card">
                <div className="feature-icon">{f.icon}</div>
                <h3 className="feature-title">{f.title}</h3>
                <p className="feature-desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BUKU & SUMBER DAYA ── */}
      <section className="landing-section resources-section" id="resources">
        <div className="landing-section-inner">
          <div className="section-header">
            <div className="section-eyebrow">Sumber Daya</div>
            <h2 className="section-title">
              Buku &amp; Materi <span className="resources-title-accent">Rohani Unggulan</span>
            </h2>
            <p className="section-desc">Perlengkapi dirimu dengan buku, e-book, dan materi audio yang dikurasi para teolog terbaik.</p>
          </div>
          <div className="resources-grid">
            {resources.map((r, i) => (
              <div key={r.id} className="resource-card">
                <div className="resource-img-wrap">
                  <img src={r.image} alt={r.title} className="resource-img" loading="lazy" />
                  {r.isNew && <span className="resource-new-badge">Baru!</span>}
                  <button className="resource-wishlist" aria-label="Simpan">
                    <Heart size={16} />
                  </button>
                  <div className="resource-type-pill">{r.type}</div>
                </div>
                <div className="resource-body">
                  <h4 className="resource-title">{r.title}</h4>
                  <div className="resource-price-row">
                    <span className="resource-price">{r.price}</span>
                    {r.oldPrice && <span className="resource-old-price">{r.oldPrice}</span>}
                  </div>
                  <button
                    className={`resource-cart-btn ${isInCart(r.id) ? 'in-cart' : ''}`}
                    onClick={() => addToCart(r)}
                    disabled={isInCart(r.id)}
                  >
                    {isInCart(r.id)
                      ? '✓ Di Keranjang'
                      : r.numericPrice === 0 ? 'Unduh Gratis' : 'Tambah ke Keranjang'}
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="section-cta">
            <Link to="/toko" className="landing-btn-primary large">
              Lihat Semua Produk <ChevronRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="landing-section" id="testimonials">
        <div className="landing-section-inner">
          <div className="section-header">
            <div className="section-eyebrow">Testimoni</div>
            <h2 className="section-title">Dipercaya oleh Ribuan Pelayan Tuhan</h2>
          </div>
          <div className="testimonials-grid">
            {testimonials.map((t, i) => (
              <div key={i} className="testimonial-card">
                <div className="testimonial-stars">
                  {[...Array(5)].map((_, si) => (
                    <Star key={si} size={14} fill="#f59e0b" color="#f59e0b" />
                  ))}
                </div>
                <blockquote className="testimonial-quote">"{t.quote}"</blockquote>
                <div className="testimonial-author">
                  <img src={t.avatar} alt={t.name} className="testimonial-avatar" loading="lazy" />
                  <div>
                    <div className="testimonial-name">{t.name}</div>
                    <div className="testimonial-role">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DOA & KOMUNITAS ── */}
      <section className="landing-prayer" id="prayer">
        <div className="landing-prayer-bg" />
        <div className="landing-prayer-overlay" />
        <div className="prayer-inner" style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          
          <div className="prayer-content" style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 40px' }}>
            <div className="section-eyebrow light">Dinding Doa</div>
            <h2 className="prayer-title">Mari Saling Menopang dalam Doa</h2>
            <p className="prayer-desc" style={{ marginBottom: '20px' }}>
              Satu doa bisa mengubah segalanya. Bergabunglah dengan puluhan jemaat lainnya untuk saling mendoakan, karena tidak ada beban yang terlalu berat jika dipikul bersama di dalam Kristus.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', width: '100%', marginBottom: '40px' }}>
            {dummyPrayers.slice(0, 3).map(prayer => (
              <div key={prayer.id} style={{ background: '#fff', borderRadius: '16px', padding: '24px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', textAlign: 'left' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <span style={{ fontWeight: 'bold', color: '#1e293b' }}>{prayer.isAnonymous ? 'Anonim' : prayer.name}</span>
                  <span style={{ fontSize: '12px', background: '#f1f5f9', padding: '4px 8px', borderRadius: '10px', color: '#64748b' }}>{prayer.category}</span>
                </div>
                <p style={{ fontSize: '14px', color: '#475569', lineHeight: '1.6', marginBottom: '16px', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  "{prayer.topic}"
                </p>
                <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '12px', display: 'flex', alignItems: 'center', gap: '6px', color: '#db2777', fontSize: '13px', fontWeight: 'bold' }}>
                  <HandHeart size={16} /> {prayer.supports} Orang mendoakan ini
                </div>
              </div>
            ))}
          </div>

          <Link to="/doa" className="hero-btn-primary" style={{ background: '#f59e0b', color: '#1e293b', border: 'none', padding: '16px 32px', fontSize: '16px', borderRadius: '12px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px', fontWeight: 'bold' }}>
            Masuk Dinding Doa Penuh <ArrowRight size={20} />
          </Link>
          <div style={{ marginTop: '16px', color: '#cbd5e1', fontSize: '14px' }}>
            Atau bagikan pergumulan rahasia Anda melalui jalur khusus Tim Doa.
          </div>
        </div>
      </section>

      {/* ── BERI DUKUNGAN ── */}
      <section className="landing-give" id="give">
        <div className="give-content">
          <div className="give-icon"><HandHeart size={48} color="#f59e0b" /></div>
          <h2 className="give-title">Bersama Kita Berdampak Lebih Jauh</h2>
          <p className="give-desc">
            Setiap dukunganmu memungkinkan kami menyediakan lebih banyak kelas gratis, menjangkau lebih banyak pelayan Tuhan di pelosok Indonesia, dan memperlengkapi gereja-gereja lokal.
          </p>
          <div className="give-amounts">
            {['50000', '100000', '250000'].map((a) => (
              <Link to={`/dukungan?nominal=${a}`} key={a} className="give-amount-btn">
                Rp {parseInt(a).toLocaleString('id-ID')}
              </Link>
            ))}
            <Link to="/dukungan" className="give-amount-btn">Nominal Lain</Link>
          </div>
          <div className="give-actions">
            <Link to="/dukungan" className="give-btn-primary">
              <Heart size={18} /> Beri Dukungan Sekarang
            </Link>
            <a href="#" className="give-btn-ghost">Pelajari Program Misi Kami</a>
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="landing-cta-banner">
        <div className="cta-banner-inner">
          <h2 className="cta-banner-title">Siap Memulai Perjalanan Rohanimu?</h2>
          <p className="cta-banner-desc">Daftar sekarang — gratis. Akses ratusan kelas dan bergabung dengan komunitas iman yang bertumbuh.</p>
          <div className="cta-banner-actions">
            <Link to="/register" className="hero-btn-primary large">
              Daftar Sekarang — Gratis <ArrowRight size={18} />
            </Link>
            <Link to="/login" className="hero-btn-ghost-light">
              Sudah punya akun? Masuk
            </Link>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="landing-footer">
        <div className="landing-footer-inner">
          <div className="footer-brand">
            <div className="footer-brand-row">
              <img src={siteSettings?.logoUrl || '/logo-dark.png'} alt={siteSettings?.siteName || 'Kampus Alkitab'} className="footer-logo" />
              <span className="footer-brand-name">{siteSettings?.siteName || 'Kampus Alkitab'}</span>
            </div>
            <p className="footer-tagline">{siteSettings?.tagline || 'Platform pendidikan rohani digital untuk pelayan Tuhan.'}</p>
            <div className="footer-social">
              {siteSettings?.socialLinks?.email && <a href={`mailto:${siteSettings.socialLinks.email}`} className="footer-social-link" aria-label="Email"><Mail size={18} /></a>}
              {siteSettings?.socialLinks?.whatsapp && <a href={siteSettings.socialLinks.whatsapp} className="footer-social-link" aria-label="WhatsApp" target="_blank" rel="noopener noreferrer"><Phone size={18} /></a>}
              {siteSettings?.socialLinks?.instagram && <a href={siteSettings.socialLinks.instagram} className="footer-social-link" aria-label="Instagram" target="_blank" rel="noopener noreferrer"><MapPin size={18} /></a>}
            </div>
          </div>
          <div className="footer-links-col">
            <div className="footer-col-title">Platform</div>
            <a href="#courses">Kelas</a>
            <a href="#features">Fitur</a>
            <a href="#devotional">Renungan</a>
            <Link to="/login">Masuk</Link>
            <Link to="/register">Daftar</Link>
          </div>
          <div className="footer-links-col">
            <div className="footer-col-title">Kategori</div>
            <a href="#">Teologi</a>
            <a href="#">Pelayanan</a>
            <a href="#">Konseling Kristen</a>
            <a href="#">Praktikal &amp; Musik</a>
            <a href="#">Kepemimpinan</a>
          </div>
          <div className="footer-links-col">
            <div className="footer-col-title">Acara & Misi</div>
            <a href="#events">Konferensi</a>
            <a href="#events">Seminar Online</a>
            <a href="#prayer">Doa Bersama</a>
            <Link to="/dukungan">Beri Dukungan</Link>
          </div>
          <div className="footer-links-col">
            <div className="footer-col-title">Digital Ministry</div>
            <a href="#">Tentang Kami</a>
            <a href="#">Tim Pengajar</a>
            <a href="#">Kontak</a>
            <a href="#">Kebijakan Privasi</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>{siteSettings?.copyright || '© 2026 Kampus Alkitab · Digital Ministry. Hak cipta dilindungi.'}</span>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
