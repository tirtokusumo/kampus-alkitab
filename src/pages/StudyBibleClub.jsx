import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar, Clock, Monitor, Users, ChevronRight, Video, FileText,
  CheckCircle, PlayCircle, MessageCircle, Heart, Share2, Bell,
  ArrowRight, Mic, BookOpen, Tv, ThumbsUp, Eye, Filter
} from 'lucide-react';
import usePageTitle from '../hooks/usePageTitle';
import Breadcrumb from '../components/Breadcrumb';
import SEOHead from '../components/SEOHead';
import { useCart } from '../context/CartContext';
import './StudyBibleClub.css';

/* ─── MOCK DATA ─── */

const currentLive = {
  title: 'Memahami Kitab Wahyu Secara Kontekstual',
  speaker: 'Pdt. Andreas Raharjo',
  date: 'Jumat, 11 April 2026',
  time: '19:00 – 20:30 WIB',
  viewers: 342,
  thumbnail: 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?auto=format&fit=crop&q=80&w=900',
  isLive: true,
  description: 'Malam ini kita akan menggali lebih dalam mengenai konteks historis dan sastrawi Kitab Wahyu. Bersama Pdt. Andreas Raharjo, kita akan membahas bagaimana memahami simbol-simbol apokaliptis dengan benar tanpa jatuh ke dalam spekulasi yang tidak alkitabiah.',
};

const upcomingSessions = [
  {
    id: 1,
    title: 'Kedatangan Yesus yang Kedua Kali (Parousia)',
    speaker: 'Pdk. Yosua Christian',
    date: 'Jumat, 18 April 2026',
    time: '19:00 – 20:30 WIB',
    topic: 'Eskatologi Praktis',
    registered: 187,
  },
  {
    id: 2,
    title: 'Langit Baru dan Bumi Baru: Harapan Kekal',
    speaker: 'Ev. Maria Gunawan',
    date: 'Jumat, 25 April 2026',
    time: '19:00 – 20:30 WIB',
    topic: 'Eskatologi Praktis',
    registered: 124,
  },
  {
    id: 3,
    title: 'Hidup di "Already but Not Yet"',
    speaker: 'Pdt. Andreas Raharjo',
    date: 'Jumat, 2 Mei 2026',
    time: '19:00 – 20:30 WIB',
    topic: 'Eskatologi Praktis',
    registered: 95,
  },
];

const pastEpisodes = [
  {
    id: 101, title: 'Mengapa Kita Perlu Belajar Akhir Zaman?',
    speaker: 'Pdt. Andreas Raharjo', date: '4 April 2026',
    duration: '1 jam 22 mnt', views: 1840, likes: 312,
    thumbnail: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=500',
    series: 'Eskatologi Praktis',
  },
  {
    id: 102, title: 'Doa yang Mengubah: Pelajaran dari Daniel',
    speaker: 'Pdk. Yosua Christian', date: '28 Maret 2026',
    duration: '1 jam 18 mnt', views: 2150, likes: 398,
    thumbnail: 'https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&q=80&w=500',
    series: 'Doa yang Mengubah',
  },
  {
    id: 103, title: 'Kuasa Doa Syafaat dalam Perjanjian Baru',
    speaker: 'Ev. Maria Gunawan', date: '21 Maret 2026',
    duration: '1 jam 10 mnt', views: 1650, likes: 287,
    thumbnail: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80&w=500',
    series: 'Doa yang Mengubah',
  },
  {
    id: 104, title: 'Ketika Tuhan Terasa Diam: Menunggu dalam Iman',
    speaker: 'Pdt. Andreas Raharjo', date: '14 Maret 2026',
    duration: '1 jam 25 mnt', views: 2480, likes: 421,
    thumbnail: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=500',
    series: 'Doa yang Mengubah',
  },
  {
    id: 105, title: 'Integritas Pemimpin Menurut Kitab Titus',
    speaker: 'Pdk. Yosua Christian', date: '7 Maret 2026',
    duration: '1 jam 15 mnt', views: 1920, likes: 345,
    thumbnail: 'https://images.unsplash.com/photo-1544928147-79a2dbc1f389?auto=format&fit=crop&q=80&w=500',
    series: 'Kepemimpinan Alkitabiah',
  },
  {
    id: 106, title: 'Gembala Sejati vs Gembala Upahan',
    speaker: 'Ev. Maria Gunawan', date: '28 Februari 2026',
    duration: '1 jam 20 mnt', views: 2100, likes: 367,
    thumbnail: 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?auto=format&fit=crop&q=80&w=500',
    series: 'Kepemimpinan Alkitabiah',
  },
];

const seriesFilter = ['Semua', 'Eskatologi Praktis', 'Doa yang Mengubah', 'Kepemimpinan Alkitabiah'];

const liveChat = [
  { id: 1, name: 'Sarah M.', msg: 'Puji Tuhan! Senang bisa bergabung malam ini 🙏', time: '19:02' },
  { id: 2, name: 'Budi K.', msg: 'Apakah Wahyu ditulis untuk jemaat abad pertama saja?', time: '19:05' },
  { id: 3, name: 'Melisa R.', msg: 'Amin! Firman ini sangat menguatkan', time: '19:08' },
  { id: 4, name: 'David T.', msg: 'Bagaimana dengan pandangan Preteris vs Futuris?', time: '19:12' },
  { id: 5, name: 'Grace L.', msg: 'Terima kasih Pak Pendeta untuk penjelasannya yang sangat jelas 🔥', time: '19:15' },
  { id: 6, name: 'Jonathan P.', msg: 'Mohon doa untuk keluarga saya, Tuhan Yesus memberkati', time: '19:18' },
];

/* ─── COMPONENT ─── */

const StudyBibleClub = () => {
  usePageTitle('Study Bible Club');
  const [activeSeries, setActiveSeries] = useState('Semua');
  const [chatMsg, setChatMsg] = useState('');
  const { showToast } = useCart();

  const filtered = activeSeries === 'Semua'
    ? pastEpisodes
    : pastEpisodes.filter(e => e.series === activeSeries);

  return (
    <div className="sbc-page">
      <SEOHead title="Study Bible Club" description="Komunitas studi Alkitab interaktif setiap Jumat malam. Live streaming, diskusi, dan arsip episode lengkap." />
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 20px' }}>
        <Breadcrumb items={[{ label: 'Acara', to: '/acara' }, { label: 'Study Bible Club' }]} />
      </div>

      {/* ═══════════ HERO — LIVE / FEATURED ═══════════ */}
      <section className="sbc-hero-v2">
        <div className="sbc-hero-v2-inner">

          {/* LEFT: Video Player Area */}
          <div className="sbc-player-area">
            <div className="sbc-player-wrap">
              <img
                src={currentLive.thumbnail}
                alt={currentLive.title}
                className="sbc-player-thumb"
              />
              <div className="sbc-player-overlay">
                <button className="sbc-play-big" aria-label="Play">
                  <PlayCircle size={72} strokeWidth={1.2} />
                </button>
              </div>
              {currentLive.isLive && (
                <div className="sbc-live-tag">
                  <span className="sbc-pulse"></span> LIVE
                </div>
              )}
              <div className="sbc-viewer-count">
                <Eye size={14} /> {currentLive.viewers.toLocaleString()} menonton
              </div>
            </div>

            {/* Video Info Below */}
            <div className="sbc-player-info">
              <h1 className="sbc-player-title">{currentLive.title}</h1>
              <div className="sbc-player-meta">
                <span><Mic size={14} /> {currentLive.speaker}</span>
                <span><Calendar size={14} /> {currentLive.date}</span>
                <span><Clock size={14} /> {currentLive.time}</span>
              </div>
              <p className="sbc-player-desc">{currentLive.description}</p>
              <div className="sbc-player-actions">
                <button className="sbc-action-pill like">
                  <Heart size={16} /> Berisi Berkat
                </button>
                <button className="sbc-action-pill share">
                  <Share2 size={16} /> Bagikan
                </button>
                <button className="sbc-action-pill notify">
                  <Bell size={16} /> Ingatkan Saya
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT: Live Chat */}
          <div className="sbc-chat-panel">
            <div className="sbc-chat-header">
              <MessageCircle size={18} />
              <span>Live Chat</span>
              <div className="sbc-chat-live-dot"></div>
            </div>
            <div className="sbc-chat-messages">
              {liveChat.map(c => (
                <div key={c.id} className="sbc-chat-bubble">
                  <div className="sbc-chat-meta">
                    <strong>{c.name}</strong>
                    <span className="sbc-chat-time">{c.time}</span>
                  </div>
                  <p>{c.msg}</p>
                </div>
              ))}
            </div>
            <div className="sbc-chat-input-wrap">
              <input
                type="text"
                className="sbc-chat-input"
                placeholder="Tulis pesan..."
                value={chatMsg}
                onChange={e => setChatMsg(e.target.value)}
              />
              <button className="sbc-chat-send" onClick={() => setChatMsg('')}>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* ═══════════ FEATURES ═══════════ */}
      <section className="sbc-features-v2">
        <div className="sbc-features-v2-inner">
          <div className="sbc-feat-card">
            <div className="sbc-feat-icon-wrap blue"><Tv size={28} /></div>
            <h3>Live Streaming Interaktif</h3>
            <p>Terlibat langsung dengan Q&A real-time dan diskusi bersama pengajar setiap minggunya.</p>
          </div>
          <div className="sbc-feat-card">
            <div className="sbc-feat-icon-wrap green"><FileText size={28} /></div>
            <h3>Modul & Catatan</h3>
            <p>Setiap sesi dilengkapi modul PDF dan catatan ringkasan yang bisa diunduh peserta.</p>
          </div>
          <div className="sbc-feat-card">
            <div className="sbc-feat-icon-wrap purple"><Video size={28} /></div>
            <h3>Rekaman Episode</h3>
            <p>Ketinggalan sesi live? Tonton ulang kapan saja dari arsip rekaman lengkap.</p>
          </div>
          <div className="sbc-feat-card">
            <div className="sbc-feat-icon-wrap orange"><Users size={28} /></div>
            <h3>Komunitas Bertumbuh</h3>
            <p>Bersekutu dengan ratusan rekan seiman dari seluruh penjuru Indonesia.</p>
          </div>
        </div>
      </section>

      {/* ═══════════ UPCOMING SESSIONS ═══════════ */}
      <section className="sbc-upcoming">
        <div className="sbc-upcoming-inner">
          <div className="sbc-section-head">
            <div>
              <h2>Sesi Mendatang</h2>
              <p>Daftar sekarang untuk mendapatkan notifikasi dan modul pembahasan.</p>
            </div>
            <div className="sbc-series-badge">
              <BookOpen size={16} /> Seri: Eskatologi Praktis
            </div>
          </div>

          <div className="sbc-upcoming-grid">
            {upcomingSessions.map(s => (
              <div key={s.id} className="sbc-upcoming-card">
                <div className="sbc-upcoming-date-strip">
                  <Calendar size={15} />
                  <span>{s.date}</span>
                </div>
                <h3>{s.title}</h3>
                <div className="sbc-upcoming-speaker"><Mic size={14} /> {s.speaker}</div>
                <div className="sbc-upcoming-time"><Clock size={14} /> {s.time}</div>
                <div className="sbc-upcoming-bottom">
                  <span className="sbc-upcoming-reg">
                    <Users size={14} /> {s.registered} terdaftar
                  </span>
                  <button className="sbc-btn-daftar">
                    <CheckCircle size={15} /> Daftar Gratis
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ PAST EPISODES ═══════════ */}
      <section className="sbc-past">
        <div className="sbc-past-inner">
          <div className="sbc-section-head">
            <div>
              <h2>Rekaman Episode Sebelumnya</h2>
              <p>Tonton ulang sesi-sesi yang sudah berlalu kapan saja.</p>
            </div>
          </div>

          {/* Series Filter */}
          <div className="sbc-filter-bar">
            <Filter size={16} />
            {seriesFilter.map(s => (
              <button
                key={s}
                className={`sbc-filter-chip ${activeSeries === s ? 'active' : ''}`}
                onClick={() => setActiveSeries(s)}
              >
                {s}
              </button>
            ))}
          </div>

          <div className="sbc-past-grid">
            {filtered.map(ep => (
              <div key={ep.id} className="sbc-episode-card">
                <div className="sbc-ep-thumb-wrap">
                  <img src={ep.thumbnail} alt={ep.title} loading="lazy" />
                  <div className="sbc-ep-play-overlay">
                    <PlayCircle size={44} strokeWidth={1.5} />
                  </div>
                  <span className="sbc-ep-duration">{ep.duration}</span>
                </div>
                <div className="sbc-ep-body">
                  <span className="sbc-ep-series">{ep.series}</span>
                  <h4 className="sbc-ep-title">{ep.title}</h4>
                  <div className="sbc-ep-meta">
                    <span><Mic size={13} /> {ep.speaker}</span>
                    <span><Calendar size={13} /> {ep.date}</span>
                  </div>
                  <div className="sbc-ep-stats">
                    <span><Eye size={13} /> {ep.views.toLocaleString()}</span>
                    <span><ThumbsUp size={13} /> {ep.likes}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ CTA ═══════════ */}
      <section className="sbc-cta-banner">
        <div className="sbc-cta-inner">
          <h2>Jangan Lewatkan Sesi Berikutnya!</h2>
          <p>Bergabunglah dengan ratusan peserta dari seluruh Indonesia setiap Jumat malam. Gratis, interaktif, dan penuh berkat.</p>
          <div className="sbc-cta-actions">
            <Link to="/login" className="sbc-cta-primary">
              Daftar Gratis Sekarang <ArrowRight size={18} />
            </Link>
            <button className="sbc-cta-secondary" onClick={() => showToast('Pengingat email akan segera diaktifkan!', 'info')}>
              <Bell size={18} /> Aktifkan Pengingat
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};

export default StudyBibleClub;
