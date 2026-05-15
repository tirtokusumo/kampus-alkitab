import { Link } from 'react-router-dom';
import { Home, BookOpen } from 'lucide-react';
import usePageTitle from '../hooks/usePageTitle';
import SEOHead from '../components/SEOHead';
import './NotFound.css';

const NotFound = () => {
  usePageTitle('Halaman Tidak Ditemukan');

  return (
    <div className="notfound-page">
      <SEOHead title="404 — Halaman Tidak Ditemukan" description="Halaman yang Anda cari tidak dapat ditemukan." />
      <div className="notfound-content">

        {/* Inline SVG Illustration — Open Bible with question mark */}
        <div className="notfound-illustration">
          <svg viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Book base */}
            <path d="M30 120 L100 135 L170 120 L170 40 L100 55 L30 40 Z" fill="#eef2ff" stroke="#c7d2fe" strokeWidth="2"/>
            <path d="M100 55 L100 135" stroke="#c7d2fe" strokeWidth="1.5" strokeDasharray="4 3"/>
            {/* Left page lines */}
            <line x1="50" y1="60" x2="90" y2="67" stroke="#cbd5e1" strokeWidth="1.5" strokeLinecap="round"/>
            <line x1="50" y1="72" x2="85" y2="78" stroke="#cbd5e1" strokeWidth="1.5" strokeLinecap="round"/>
            <line x1="50" y1="84" x2="90" y2="89" stroke="#cbd5e1" strokeWidth="1.5" strokeLinecap="round"/>
            <line x1="50" y1="96" x2="75" y2="100" stroke="#cbd5e1" strokeWidth="1.5" strokeLinecap="round"/>
            {/* Right page lines */}
            <line x1="110" y1="67" x2="150" y2="60" stroke="#cbd5e1" strokeWidth="1.5" strokeLinecap="round"/>
            <line x1="110" y1="78" x2="150" y2="72" stroke="#cbd5e1" strokeWidth="1.5" strokeLinecap="round"/>
            <line x1="110" y1="89" x2="150" y2="84" stroke="#cbd5e1" strokeWidth="1.5" strokeLinecap="round"/>
            {/* Cross on top */}
            <line x1="100" y1="10" x2="100" y2="40" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round"/>
            <line x1="87" y1="22" x2="113" y2="22" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round"/>
            {/* Question mark */}
            <text x="140" y="35" fill="#7c3aed" fontSize="32" fontWeight="800" fontFamily="Outfit, sans-serif" opacity="0.6">?</text>
          </svg>
        </div>

        <div className="notfound-code">404</div>
        <h1 className="notfound-title">Halaman Tidak Ditemukan</h1>

        <div className="notfound-verse">
          "Aku adalah jalan dan kebenaran dan hidup. Tidak ada seorang pun yang datang kepada Bapa, kalau tidak melalui Aku."
          <span className="notfound-verse-ref">— Yohanes 14:6</span>
        </div>

        <p className="notfound-desc">
          Meskipun halaman ini tidak ditemukan, jalan menuju tujuanmu tetap terbuka. Mari kembali dan lanjutkan perjalanan rohanimu!
        </p>

        <div className="notfound-actions">
          <Link to="/" className="notfound-btn-primary">
            <Home size={18} />
            Kembali ke Beranda
          </Link>
          <Link to="/courses" className="notfound-btn-outline">
            <BookOpen size={18} />
            Jelajahi Kelas
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
