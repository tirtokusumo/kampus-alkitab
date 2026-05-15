import { useState, useEffect } from 'react';
import { Calendar, MapPin, Clock, Users, ChevronRight, Mic, Monitor, Wrench } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import usePageTitle from '../hooks/usePageTitle';
import './Acara.css';

const konferensi = [
  {
    id: 1, title: 'Konferensi Kepemimpinan Gereja 2026',
    date: '18–19 April 2026', location: 'Jakarta Convention Center',
    status: 'Segera', spots: '200 kursi tersisa', price: 'Rp 350.000',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800&h=400',
    desc: 'Konferensi tahunan untuk para pemimpin gereja, pendeta, dan pelayan Tuhan dari seluruh Indonesia.',
    tags: ['Kepemimpinan', 'Strategi', 'Visi Gereja'],
  },
  {
    id: 2, title: 'Summit Pemuda Kristen Indonesia 2026',
    date: '7–8 Juni 2026', location: 'Surabaya Convention Hall',
    status: 'Segera', spots: '500 kursi tersisa', price: 'Rp 200.000',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=800&h=400',
    desc: 'Konferensi nasional untuk generasi muda Kristen yang rindu berdampak di kota-kota Indonesia.',
    tags: ['Pemuda', 'Misi', 'Generasi Z'],
  },
  {
    id: 3, title: 'Konferensi Perempuan Dalam Pelayanan',
    date: '23 Agustus 2026', location: 'Bandung & Live Streaming',
    status: 'Akan Datang', spots: 'Terbuka Umum', price: 'Rp 150.000',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=800&h=400',
    desc: 'Menguatkan dan memperlengkapi perempuan Kristen untuk berperan aktif dalam pelayanan gereja.',
    tags: ['Perempuan', 'Pelayanan', 'Pemberdayaan'],
  },
];

const seminar = [
  {
    id: 1, title: 'Seminar Teologi & Apologetika',
    date: '3 Mei 2026', location: 'Online (Zoom)',
    status: 'Gratis', spots: 'Terbuka Umum', price: 'Gratis',
    image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&q=80&w=800&h=400',
    desc: 'Pelajari cara mempertahankan iman secara intelektual di era post-modern. Dibawakan oleh Dr. Jonathan Limbong.',
    tags: ['Teologi', 'Apologetika', 'Online'],
  },
  {
    id: 2, title: 'Seminar Konseling Keluarga Kristen',
    date: '17 Mei 2026', location: 'Online (Zoom)',
    status: 'Segera', spots: '150 kursi tersisa', price: 'Rp 50.000',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=800&h=400',
    desc: 'Teknik-teknik konseling berbasis Alkitab untuk membantu keluarga Kristen melewati masa-masa sulit.',
    tags: ['Konseling', 'Keluarga', 'Psikologi Kristen'],
  },
  {
    id: 3, title: 'Seminar Pendalaman Kitab Roma',
    date: '31 Mei 2026', location: 'Online (YouTube Live)',
    status: 'Gratis', spots: 'Tidak Terbatas', price: 'Gratis',
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&q=80&w=800&h=400',
    desc: 'Seri 4 sesi untuk menggali kedalaman teologis surat Roma bersama pengajar berpengalaman.',
    tags: ['Studi Alkitab', 'Roma', 'Teologi'],
  },
];

const workshop = [
  {
    id: 1, title: 'Workshop Worship Leading',
    date: '24 Mei 2026', location: 'Surabaya & Streaming',
    status: 'Segera', spots: '50 kursi tersisa', price: 'Rp 250.000',
    image: 'https://images.unsplash.com/photo-1508558936510-0af1e3cccbab?auto=format&fit=crop&q=80&w=800&h=400',
    desc: 'Workshop praktikal selama 2 hari untuk para pemimpin ibadah: kepemimpinan, sound system, dan dinamika tim.',
    tags: ['Ibadah', 'Musik', 'Praktikal'],
  },
  {
    id: 2, title: 'Workshop Media Gereja Digital',
    date: '14 Juni 2026', location: 'Jakarta (Hybrid)',
    status: 'Segera', spots: '80 kursi tersisa', price: 'Rp 300.000',
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=800&h=400',
    desc: 'Pelajari strategi komunikasi digital untuk gereja: media sosial, podcast, desain grafis, dan streaming ibadah.',
    tags: ['Digital', 'Media', 'Komunikasi'],
  },
  {
    id: 3, title: 'Workshop Khotbah yang Berdampak',
    date: '12 Juli 2026', location: 'Medan',
    status: 'Akan Datang', spots: '30 kursi', price: 'Rp 200.000',
    image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&q=80&w=800&h=400',
    desc: 'Intensif 1 hari bersama praktisi homiletik untuk mengembangkan kemampuan berkhotbah yang membangun jemaat.',
    tags: ['Homiletik', 'Khotbah', 'Retorikal'],
  },
];

const tabs = [
  { id: 'konferensi', label: 'Konferensi', icon: <Mic size={16} /> },
  { id: 'seminar', label: 'Seminar Online', icon: <Monitor size={16} /> },
  { id: 'workshop', label: 'Workshop', icon: <Wrench size={16} /> },
];

const statusColors = { 'Segera': '#f59e0b', 'Gratis': '#22c55e', 'Akan Datang': '#6366f1' };

const EventCard = ({ event }) => (
  <div className="acara-event-card">
    <div className="acara-event-thumb">
      <img src={event.image} alt={event.title} loading="lazy" />
      <div className={`acara-status-badge`} style={{ background: statusColors[event.status] || '#6366f1' }}>
        {event.status}
      </div>
    </div>
    <div className="acara-event-body">
      <div className="acara-event-tags">
        {event.tags.map(t => <span key={t} className="acara-tag">{t}</span>)}
      </div>
      <h3 className="acara-event-title">{event.title}</h3>
      <p className="acara-event-desc">{event.desc}</p>
      <div className="acara-event-meta">
        <div className="acara-meta-item"><Calendar size={14} /><span>{event.date}</span></div>
        <div className="acara-meta-item"><MapPin size={14} /><span>{event.location}</span></div>
        <div className="acara-meta-item"><Users size={14} /><span>{event.spots}</span></div>
      </div>
      <div className="acara-event-footer">
        <div className="acara-price" style={{ color: event.price === 'Gratis' ? '#22c55e' : 'var(--color-primary)' }}>
          {event.price}
        </div>
        <button className="acara-register-btn">
          Daftar Sekarang <ChevronRight size={15} />
        </button>
      </div>
    </div>
  </div>
);

const Acara = () => {
  const [searchParams] = useSearchParams();
  const urlTab = searchParams.get('tab') || 'konferensi';
  const [activeTab, setActiveTab] = useState(urlTab);

  useEffect(() => {
    setActiveTab(searchParams.get('tab') || 'konferensi');
  }, [searchParams]);

  const tabLabel = tabs.find(t => t.id === activeTab)?.label || 'Acara';
  usePageTitle(tabLabel);

  const data = activeTab === 'konferensi' ? konferensi : activeTab === 'seminar' ? seminar : workshop;

  return (
    <div className="acara-page">
      {/* Hero */}
      <div className="acara-hero">
        <div className="acara-hero-inner">
          <div className="acara-hero-eyebrow"><Calendar size={14} /> Acara & Kegiatan</div>
          <h1 className="acara-hero-title">Konferensi, Seminar &amp; Workshop</h1>
          <p className="acara-hero-desc">
            Bergabunglah dalam acara-acara rohani yang memperlengkapi dan menginspirasi pelayan Tuhan dari seluruh Indonesia.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="acara-tabs">
        {tabs.map(t => (
          <button
            key={t.id}
            className={`acara-tab-btn ${activeTab === t.id ? 'active' : ''}`}
            onClick={() => setActiveTab(t.id)}
          >
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="acara-content">
        <div className="acara-section-info">
          <div className="acara-section-count">{data.length} acara tersedia</div>
        </div>
        <div className="acara-grid">
          {data.map(event => <EventCard key={event.id} event={event} />)}
        </div>
      </div>
    </div>
  );
};

export default Acara;
