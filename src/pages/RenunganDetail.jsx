import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Share2, Heart, Clock, Moon, Sun } from 'lucide-react';
import usePageTitle from '../hooks/usePageTitle';
import { renunganHarian } from './Renungan';
import './RenunganDetail.css';

const RenunganDetail = () => {
  const { id } = useParams();
  const renungan = renunganHarian.find(r => r.id === parseInt(id));
  const [darkMode, setDarkMode] = useState(false);

  usePageTitle(renungan ? `${renungan.title} - Renungan Harian` : 'Renungan Tidak Ditemukan');

  if (!renungan) {
    return (
      <div className="renungan-detail-page not-found">
        <div className="renungan-hero" style={{ height: 'auto', padding: '4rem 2rem' }}>
          <h1>Renungan Tidak Ditemukan</h1>
          <p>Maaf, renungan yang Anda cari tidak tersedia atau mungkin sudah dihapus.</p>
          <Link to="/renungan" className="back-link"><ArrowLeft size={16} /> Kembali ke Koleksi Renungan</Link>
        </div>
      </div>
    );
  }

  // Pisahkan konten berdasarkan enter (\n\n)
  const paragraphs = renungan.content.split('\n\n');

  return (
    <div className={`renungan-detail-page ${darkMode ? 'dark-reading' : ''}`}>
      {/* HEADER / HERO */}
      <div className="rd-header">
        <div className="rd-header-inner">
          <div className="rd-header-top-row">
            <Link to="/renungan" className="rd-back-btn">
              <ArrowLeft size={16} /> Kembali
            </Link>
            <button
              className="rd-dark-toggle"
              onClick={() => setDarkMode(d => !d)}
              aria-label={darkMode ? 'Mode terang' : 'Mode gelap'}
              title={darkMode ? 'Mode terang' : 'Mode gelap'}
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
          
          <div className="rd-meta-top">
            <span className="rd-category">{renungan.category}</span>
            <span className="rd-date"><Calendar size={13} /> {renungan.date}</span>
            <span className="rd-readtime"><Clock size={13} /> {renungan.readTime}</span>
          </div>

          <h1 className="rd-title">{renungan.title}</h1>
        </div>
      </div>

      {/* BERKAS BACAAN */}
      <div className="rd-container">
        <div className="rd-content-wrapper">
          
          <div className="rd-verse-box">
            <blockquote className="rd-verse-text">
               {renungan.verse.startsWith('"') ? renungan.verse : `"${renungan.verse}"`}
            </blockquote>
            <div className="rd-verse-ref">— {renungan.ref}</div>
          </div>

          <article className="rd-article">
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </article>

          <div className="rd-actions">
            <button className="rd-action-btn like-btn">
              <Heart size={18} /> Berkatilah Saya
            </button>
            <button className="rd-action-btn share-btn">
              <Share2 size={18} /> Bagikan
            </button>
          </div>
          
        </div>
        
        {/* SIDEBAR BACAAN LAIN */}
        <aside className="rd-sidebar">
           <h3 className="rd-sidebar-title">Renungan Terkait</h3>
           <div className="rd-sidebar-list">
             {renunganHarian
               .filter(r => r.id !== renungan.id)
               .slice(0, 3)
               .map(r => (
                 <Link to={`/renungan/${r.id}`} key={r.id} className="rd-sidebar-item">
                   <div className="rd-sidebar-item-cat">{r.category}</div>
                   <h4 className="rd-sidebar-item-title">{r.title}</h4>
                   <div className="rd-sidebar-item-date">{r.date}</div>
                 </Link>
             ))}
           </div>
        </aside>
      </div>

    </div>
  );
};

export default RenunganDetail;
