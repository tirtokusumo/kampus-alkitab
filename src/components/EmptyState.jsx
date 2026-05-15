import { Link } from 'react-router-dom';
import './EmptyState.css';

/**
 * Reusable EmptyState component with inline SVG illustrations.
 *
 * @param {string} type - 'search' | 'wishlist' | 'cart' | 'general'
 * @param {string} title - Custom title
 * @param {string} description - Custom description
 * @param {string} ctaText - Button text
 * @param {string} ctaTo - Link destination
 */

const illustrations = {
  search: (
    <svg viewBox="0 0 180 140" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Magnifying glass */}
      <circle cx="80" cy="60" r="35" stroke="#c7d2fe" strokeWidth="4" fill="#eef2ff"/>
      <line x1="106" y1="86" x2="130" y2="110" stroke="#94a3b8" strokeWidth="6" strokeLinecap="round"/>
      {/* No results - X inside */}
      <line x1="68" y1="48" x2="92" y2="72" stroke="#cbd5e1" strokeWidth="3" strokeLinecap="round"/>
      <line x1="92" y1="48" x2="68" y2="72" stroke="#cbd5e1" strokeWidth="3" strokeLinecap="round"/>
      {/* Decorative dots */}
      <circle cx="145" cy="30" r="4" fill="#fde68a"/>
      <circle cx="35" cy="100" r="3" fill="#c7d2fe"/>
      <circle cx="155" cy="80" r="2.5" fill="#c7d2fe"/>
    </svg>
  ),
  wishlist: (
    <svg viewBox="0 0 180 140" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Heart outline */}
      <path d="M90 110 C50 80 20 55 20 40 C20 22 35 10 55 10 C70 10 82 20 90 32 C98 20 110 10 125 10 C145 10 160 22 160 40 C160 55 130 80 90 110Z"
        fill="#fff1f2" stroke="#fda4af" strokeWidth="3"/>
      {/* Small sparkles */}
      <circle cx="45" cy="120" r="3" fill="#fde68a"/>
      <circle cx="150" cy="25" r="3.5" fill="#c7d2fe"/>
      <line x1="140" y1="100" x2="148" y2="92" stroke="#fde68a" strokeWidth="2" strokeLinecap="round"/>
      <line x1="148" y1="100" x2="140" y2="92" stroke="#fde68a" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  cart: (
    <svg viewBox="0 0 180 140" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Cart body */}
      <path d="M40 40 L50 40 L70 95 L140 95 L155 50 L60 50" stroke="#c7d2fe" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      {/* Wheels */}
      <circle cx="80" cy="110" r="8" fill="#eef2ff" stroke="#c7d2fe" strokeWidth="3"/>
      <circle cx="130" cy="110" r="8" fill="#eef2ff" stroke="#c7d2fe" strokeWidth="3"/>
      {/* Empty indicator — dashed line inside */}
      <line x1="75" y1="72" x2="135" y2="72" stroke="#e2e8f0" strokeWidth="2" strokeDasharray="6 4" strokeLinecap="round"/>
      {/* Decorative */}
      <circle cx="155" cy="30" r="4" fill="#fde68a"/>
      <circle cx="30" cy="65" r="3" fill="#c7d2fe"/>
    </svg>
  ),
  general: (
    <svg viewBox="0 0 180 140" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Open book */}
      <path d="M30 100 L90 115 L150 100 L150 30 L90 45 L30 30 Z" fill="#eef2ff" stroke="#c7d2fe" strokeWidth="2.5"/>
      <path d="M90 45 L90 115" stroke="#c7d2fe" strokeWidth="1.5" strokeDasharray="4 3"/>
      {/* Cross */}
      <line x1="90" y1="5" x2="90" y2="30" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round"/>
      <line x1="78" y1="15" x2="102" y2="15" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round"/>
      {/* Decorative */}
      <circle cx="160" cy="50" r="4" fill="#fde68a"/>
      <circle cx="20" cy="75" r="3" fill="#c7d2fe"/>
    </svg>
  ),
};

const defaultContent = {
  search: {
    title: 'Tidak Ada Hasil',
    desc: 'Coba ubah kata kunci atau filter pencarianmu untuk menemukan yang kamu cari.',
    ctaText: 'Reset Filter',
  },
  wishlist: {
    title: 'Wishlist Masih Kosong',
    desc: 'Temukan kelas yang menarik dan tekan ikon ♡ untuk menyimpannya di sini.',
    ctaText: 'Jelajahi Kelas',
    ctaTo: '/courses',
  },
  cart: {
    title: 'Keranjang Kosong',
    desc: 'Belum ada produk di keranjangmu. Jelajahi toko untuk menemukan sumber daya rohani.',
    ctaText: 'Jelajahi Toko',
    ctaTo: '/toko',
  },
  general: {
    title: 'Belum Ada Data',
    desc: 'Konten akan segera tersedia. Silakan cek kembali nanti.',
    ctaText: null,
  },
};

const EmptyState = ({
  type = 'general',
  title,
  description,
  ctaText,
  ctaTo,
  onCtaClick,
}) => {
  const defaults = defaultContent[type] || defaultContent.general;
  const finalTitle = title || defaults.title;
  const finalDesc = description || defaults.desc;
  const finalCtaText = ctaText !== undefined ? ctaText : defaults.ctaText;
  const finalCtaTo = ctaTo || defaults.ctaTo;
  const illustration = illustrations[type] || illustrations.general;

  return (
    <div className="empty-state">
      <div className="empty-state-illustration">
        {illustration}
      </div>
      <h3 className="empty-state-title">{finalTitle}</h3>
      <p className="empty-state-desc">{finalDesc}</p>
      {finalCtaText && (
        finalCtaTo && !onCtaClick ? (
          <Link to={finalCtaTo} className="empty-state-cta">
            {finalCtaText}
          </Link>
        ) : (
          <button className="empty-state-cta" onClick={onCtaClick}>
            {finalCtaText}
          </button>
        )
      )}
    </div>
  );
};

export default EmptyState;
