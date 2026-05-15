import { useState, useMemo, useEffect } from 'react';
import {
  MapPin, Clock, Users, Search, Filter, Heart, Music, BookOpen,
  Mic, Video, Coffee, ChevronRight, Building2, Calendar, CheckCircle, X, UserSearch
} from 'lucide-react';
import { Link } from 'react-router-dom';
import usePageTitle from '../hooks/usePageTitle';
import Breadcrumb from '../components/Breadcrumb';
import SEOHead from '../components/SEOHead';
import AnimatedCounter from '../components/AnimatedCounter';
import './MinistryHub.css';

const roleIcons = {
  'Musik & Worship': <Music size={18} />,
  'Pengajar / Guru': <BookOpen size={18} />,
  'Pelayan Ibadah': <Heart size={18} />,
  'Media & Teknologi': <Video size={18} />,
  'Pemimpin Komunitas': <Mic size={18} />,
  'Hospitality': <Coffee size={18} />,
  'Anak & Remaja': <Users size={18} />,
};

const roleColors = {
  'Musik & Worship': '#8b5cf6',
  'Pengajar / Guru': '#3b82f6',
  'Pelayan Ibadah': '#ec4899',
  'Media & Teknologi': '#06b6d4',
  'Pemimpin Komunitas': '#f59e0b',
  'Hospitality': '#10b981',
  'Anak & Remaja': '#ef4444',
};

// ── DATA: VACANCIES (NEEDS) ──
const vacancies = [
  {
    id: 'vac-1',
    church: 'GBI Keluarga Allah',
    city: 'Jakarta Selatan',
    province: 'DKI Jakarta',
    role: 'Musik & Worship',
    title: 'Pemain Keyboard / Piano',
    desc: 'Kami mencari pemain keyboard yang rindu melayani Tuhan melalui musik ibadah. Diutamakan yang berpengalaman minimal 1 tahun dalam tim ibadah gereja.',
    requirements: ['Memainkan keyboard/piano dengan baik', 'Bisa membaca not balok atau chord', 'Berkomitmen hadir latihan mingguan', 'Anggota gereja aktif'],
    commitment: '2× seminggu',
    openSlots: 2,
    postedDays: 3,
    logo: 'https://images.unsplash.com/photo-1508558936510-0af1e3cccbab?auto=format&fit=crop&q=80&w=80&h=80',
    urgent: true,
  },
  {
    id: 'vac-2',
    church: 'GPDI Mawar Sharon',
    city: 'Surabaya',
    province: 'Jawa Timur',
    role: 'Pengajar / Guru',
    title: 'Guru Sekolah Minggu (Kelas Balita)',
    desc: 'Dibutuhkan relawan pengajar Sekolah Minggu untuk kelas Balita (usia 0-4 tahun). Bersedia mengikuti pelatihan yang disediakan gereja.',
    requirements: ['Mencintai anak-anak', 'Sabar dan kreatif', 'Hadir setiap minggu', 'Lulus pemeriksaan background (Safeguarding)'],
    commitment: 'Setiap Minggu',
    openSlots: 3,
    postedDays: 7,
    logo: 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?auto=format&fit=crop&q=80&w=80&h=80',
    urgent: false,
  },
  {
    id: 'vac-3',
    church: 'Gereja Reformed Injili Indonesia (GRII)',
    city: 'Bandung',
    province: 'Jawa Barat',
    role: 'Media & Teknologi',
    title: 'Operator Live Streaming & Sound System',
    desc: 'Mencari relawan yang mampu mengoperasikan peralatan audio-visual untuk ibadah online dan onsite. Pelatihan teknis akan diberikan.',
    requirements: ['Familiar dengan OBS atau software streaming', 'Dasar teknik audio', 'Tepat waktu dan teliti', 'Bersedia weekend'],
    commitment: 'Setiap Minggu (giliran)',
    openSlots: 2,
    postedDays: 5,
    logo: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=80&h=80',
    urgent: false,
  },
  {
    id: 'vac-4',
    church: 'Kingdom City Church',
    city: 'Bali',
    province: 'Bali',
    role: 'Musik & Worship',
    title: 'Vocalist Tim Worship',
    desc: 'Gereja multi-bahasa di Bali mencari vocalist untuk bergabung dalam tim worship. Ibadah diselenggarakan dalam bahasa Indonesia dan Inggris.',
    requirements: ['Kemampuan vokal yang baik', 'Bisa baca chord/lyric layar', 'Bilingual (Indonesia-Inggris) jadi nilai plus', 'Berkomitmen latihan Sabtu'],
    commitment: 'Sabtu + Minggu',
    openSlots: 3,
    postedDays: 6,
    logo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=80&h=80',
    urgent: true,
  },
];

// ── DATA: VOLUNTEERS (TALENTS) ──
const volunteers = [
  {
    id: 'vol-1',
    name: 'Kevin Pratama',
    city: 'Jakarta Barat',
    province: 'DKI Jakarta',
    role: 'Musik & Worship',
    title: 'Keyboardist & Music Director',
    desc: 'Saya melayani sebagai pemain keyboard di gereja lokal selama 5 tahun terakhir. Rindu memberkati gereja-gereja perintisan yang kekurangan pelayan musik.',
    skills: ['Keyboard', 'Piano', 'Music Arranging', 'Ableton Live'],
    commitment: 'Sabtu & Minggu',
    experience: '5 Tahun',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=150&h=150',
    available: true,
  },
  {
    id: 'vol-2',
    name: 'Siska Noviana',
    city: 'Surabaya',
    province: 'Jawa Timur',
    role: 'Anak & Remaja',
    title: 'Pengajar Anak & Storyteller',
    desc: 'Lulusan Psikologi yang sangat mencintai dunia anak. Berpengalaman menulis kurikulum sekolah minggu dan memimpin panggung boneka. Siap melayani gereja yang butuh ide-ide segar.',
    skills: ['Storytelling', 'Psikologi Anak', 'Puppet Show', 'Menyanyi'],
    commitment: 'Fleksibel (Panggilan)',
    experience: '3 Tahun',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150',
    available: true,
  },
  {
    id: 'vol-3',
    name: 'Andi Kusuma',
    city: 'Bandung',
    province: 'Jawa Barat',
    role: 'Media & Teknologi',
    title: 'Audio Engineer & Broadcaster',
    desc: 'Mempunyai latar belakang di radio broadcasting dan sound engineering. Saya ingin mendedikasikan waktu luang saya membantu gereja men-set up sistem live streaming yang baik dengan budget minim.',
    skills: ['Sound Mixing', 'OBS Studio', 'Kamera Video', 'Lighting Dasar'],
    commitment: 'Konsultasi Online / Weekend',
    experience: '7 Tahun',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150&h=150',
    available: true,
  },
  {
    id: 'vol-4',
    name: 'Grace Natalia',
    city: 'Jakarta Selatan',
    province: 'DKI Jakarta',
    role: 'Hospitality',
    title: 'Public Relations / Usher',
    desc: 'Berpengalaman di industri perhotelan dan sangat senang menyambut para jemaat baru. Percaya bahwa pintu masuk gereja adalah cerminan utama kasih Tuhan.',
    skills: ['Public Speaking', 'Event Organizer', 'Problem Solving', 'Bahasa Inggris'],
    commitment: 'Setiap Hari Minggu',
    experience: '2 Tahun',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150&h=150',
    available: true,
  }
];

const allRoles = ['Semua Bidang', ...Object.keys(roleIcons)];

const MinistryHub = () => {
  usePageTitle('MinistryHub — Platform Pelayanan');
  
  const [viewMode, setViewMode] = useState('vacancies'); // 'vacancies' or 'volunteers'
  const [search, setSearch] = useState('');
  const [activeRole, setActiveRole] = useState('Semua Bidang');
  const [activeProvince, setActiveProvince] = useState('Semua Wilayah');
  const [detailId, setDetailId] = useState(null);

  // Derive provinces dynamically based on viewMode
  const allProvinces = useMemo(() => {
    const data = viewMode === 'vacancies' ? vacancies : volunteers;
    return ['Semua Wilayah', ...Array.from(new Set(data.map(item => item.province))).sort()];
  }, [viewMode]);

  // Reset detail when switching modes
  useEffect(() => {
    setDetailId(null);
    setSearch('');
    setActiveProvince('Semua Wilayah');
  }, [viewMode]);

  const filteredItems = useMemo(() => {
    const data = viewMode === 'vacancies' ? vacancies : volunteers;
    return data.filter(item => {
      const targetName = viewMode === 'vacancies' ? item.church : item.name;
      const matchSearch = !search ||
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        targetName.toLowerCase().includes(search.toLowerCase()) ||
        item.city.toLowerCase().includes(search.toLowerCase());
      const matchRole = activeRole === 'Semua Bidang' || item.role === activeRole;
      const matchProvince = activeProvince === 'Semua Wilayah' || item.province === activeProvince;
      return matchSearch && matchRole && matchProvince;
    });
  }, [viewMode, search, activeRole, activeProvince]);

  const detail = useMemo(() => {
    const data = viewMode === 'vacancies' ? vacancies : volunteers;
    return data.find(i => i.id === detailId);
  }, [viewMode, detailId]);

  return (
    <div className="mhub-page">
      <SEOHead title="MinistryHub — Volunteer Pelayanan" description="Platform volunteering gereja di Indonesia. Temukan lowongan gereja atau tawarkan dirimu sebagai volunter." />
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 20px' }}>
        <Breadcrumb items={[{ label: 'Komunitas', to: '/community' }, { label: 'MinistryHub' }]} />
      </div>
      
      {/* ── Hero ── */}
      <div className="mhub-hero">
        <div className="mhub-hero-inner">
          <div className="mhub-hero-badge"><Heart size={14} /> MinistryHub</div>
          <h1 className="mhub-hero-title">Platform Bursa Pelayanan</h1>
          <p className="mhub-hero-desc">
            Temukan panggilan kerinduanmu atau tawarkan keahlian yang Tuhan berikan untuk memberkati lebih banyak wadah.
          </p>
          
          <div className="mhub-tabs">
            <button 
              className={`mhub-tab-btn ${viewMode === 'vacancies' ? 'active' : ''}`}
              onClick={() => setViewMode('vacancies')}
            >
              <Search size={14} style={{ marginRight: 6, display: 'inline-block', verticalAlign: 'middle' }} /> 
              Cari Pelayanan
            </button>
            <button 
              className={`mhub-tab-btn ${viewMode === 'volunteers' ? 'active' : ''}`}
              onClick={() => setViewMode('volunteers')}
            >
              <UserSearch size={14} style={{ marginRight: 6, display: 'inline-block', verticalAlign: 'middle' }} /> 
              Database Volunter
            </button>
          </div>
        </div>
      </div>

      {/* ── Filters ── */}
      <div className="mhub-filters">
        <div className="mhub-filters-inner">
          <div className="mhub-search">
            <Search size={16} />
            <input
              type="text" 
              placeholder={viewMode === 'vacancies' ? 'Cari gereja, posisi, atau kota...' : 'Cari nama volunter, keahlian, kota...'}
              value={search} onChange={e => setSearch(e.target.value)}
            />
            {search && <button onClick={() => setSearch('')}><X size={14} /></button>}
          </div>
          <select value={activeProvince} onChange={e => setActiveProvince(e.target.value)} className="mhub-select">
            {allProvinces.map(p => <option key={p}>{p}</option>)}
          </select>
        </div>
        {/* Role chips */}
        <div className="mhub-role-chips">
          {allRoles.map(r => (
            <button
              key={r}
              className={`mhub-chip ${activeRole === r ? 'active' : ''}`}
              style={activeRole === r ? { background: roleColors[r] || '#1a237e', color: '#fff', borderColor: roleColors[r] || '#1a237e' } : {}}
              onClick={() => setActiveRole(r)}
            >
              {roleIcons[r] && <span className="mhub-chip-icon">{roleIcons[r]}</span>}
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* ── Main layout ── */}
      <div className="mhub-main">
        {/* List Kiri */}
        <div className="mhub-list">
          <div className="mhub-results-info">
            {filteredItems.length} {viewMode === 'vacancies' ? 'posisi' : 'volunter'} ditemukan
            {activeRole !== 'Semua Bidang' && ` dalam "${activeRole}"`}
            {activeProvince !== 'Semua Wilayah' && ` di ${activeProvince}`}
          </div>

          {filteredItems.length === 0 ? (
            <div className="mhub-empty">
              <Heart size={48} color="#cbd5e1" />
              <h3>Tidak ada hasil</h3>
              <p>Coba ubah filter atau kata kunci pencarianmu.</p>
              <button onClick={() => { setSearch(''); setActiveRole('Semua Bidang'); setActiveProvince('Semua Wilayah'); }}>
                Reset Filter
              </button>
            </div>
          ) : (
            filteredItems.map(item => (
              <div
                key={item.id}
                className={`mhub-card ${detailId === item.id ? 'selected' : ''}`}
                onClick={() => setDetailId(item.id === detailId ? null : item.id)}
              >
                <div className="mhub-card-top">
                  {viewMode === 'vacancies' ? (
                    <img src={item.logo} alt={item.church} className="mhub-church-logo" loading="lazy" />
                  ) : (
                    <img src={item.avatar} alt={item.name} className="mhub-volunteer-avatar" loading="lazy" />
                  )}
                  <div className="mhub-card-info">
                    <div className="mhub-card-meta-row">
                      <span className="mhub-role-badge" style={{ background: (roleColors[item.role] || '#6366f1') + '18', color: roleColors[item.role] || '#6366f1' }}>
                        {roleIcons[item.role]} {item.role}
                      </span>
                      {item.urgent && <span className="mhub-urgent-tag">🔥 Segera Dibutuhkan</span>}
                      {item.available && viewMode === 'volunteers' && <span className="mhub-urgent-tag" style={{ color: '#16a34a' }}>🟢 Siap Melayani</span>}
                    </div>
                    <h3 className="mhub-card-title">{item.title}</h3>
                    <div className="mhub-card-church">{viewMode === 'vacancies' ? item.church : item.name}</div>
                    <div className="mhub-card-location"><MapPin size={13} /> {item.city}, {item.province}</div>
                  </div>
                </div>
                <p className="mhub-card-desc">{item.desc}</p>
                <div className="mhub-card-footer">
                  <div className="mhub-card-details">
                    <span><Clock size={13} /> {item.commitment}</span>
                    {viewMode === 'vacancies' ? (
                      <>
                        <span><Users size={13} /> {item.openSlots} slot tersedia</span>
                        <span><Calendar size={13} /> {item.postedDays} hari lalu</span>
                      </>
                    ) : (
                      <span>🌟 Pengalaman: {item.experience}</span>
                    )}
                  </div>
                  <Link to="/login" className="mhub-apply-btn" onClick={e => e.stopPropagation()}>
                    {viewMode === 'vacancies' ? 'Daftar' : 'Kontak'} <ChevronRight size={15} />
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Detail Panel Kanan */}
        <div className={`mhub-detail ${detail ? 'open' : ''}`}>
          {detail && viewMode === 'vacancies' && (
            <>
              <button className="mhub-detail-close" onClick={() => setDetailId(null)}><X size={18} /></button>
              <img src={detail.logo} alt={detail.church} className="mhub-detail-logo" loading="lazy" />
              <div className="mhub-detail-role-badge" style={{ color: roleColors[detail.role] || '#6366f1' }}>
                {roleIcons[detail.role]} {detail.role}
              </div>
              <h2 className="mhub-detail-title">{detail.title}</h2>
              <div className="mhub-detail-church">
                <Building2 size={15} /> {detail.church}
              </div>
              <div className="mhub-detail-location"><MapPin size={14} /> {detail.city}, {detail.province}</div>

              <div className="mhub-detail-stats">
                <div><Clock size={14} /><span>{detail.commitment}</span></div>
                <div><Users size={14} /><span>{detail.openSlots} slot</span></div>
                {detail.urgent && <div className="mhub-detail-urgent">🔥 Mendesak</div>}
              </div>

              <p className="mhub-detail-desc">{detail.desc}</p>

              <h4 className="mhub-detail-req-title">Kriteria yang Dibutuhkan</h4>
              <ul className="mhub-detail-req-list">
                {detail.requirements.map((r, i) => (
                  <li key={i}><CheckCircle size={14} /> {r}</li>
                ))}
              </ul>

              <Link to="/login" className="mhub-detail-apply-btn">
                <Heart size={16} /> Daftar Sebagai Volunteer
              </Link>
            </>
          )}

          {detail && viewMode === 'volunteers' && (
            <>
              <button className="mhub-detail-close" onClick={() => setDetailId(null)}><X size={18} /></button>
              <img src={detail.avatar} alt={detail.name} className="mhub-detail-avatar" loading="lazy" />
              <div className="mhub-detail-role-badge" style={{ color: roleColors[detail.role] || '#6366f1' }}>
                {roleIcons[detail.role]} {detail.role}
              </div>
              <h2 className="mhub-detail-title">{detail.name}</h2>
              <div className="mhub-detail-church">
                <UserSearch size={15} /> {detail.title}
              </div>
              <div className="mhub-detail-location"><MapPin size={14} /> {detail.city}, {detail.province}</div>

              <div className="mhub-detail-stats">
                <div><Clock size={14} /><span>{detail.commitment}</span></div>
                <div><span>🌟 Pengalaman: {detail.experience}</span></div>
                {detail.available && <div className="mhub-detail-urgent" style={{ background: '#dcfce7', color: '#16a34a' }}>🟢 Siap Pelayanan</div>}
              </div>

              <p className="mhub-detail-desc">{detail.desc}</p>

              <h4 className="mhub-detail-req-title">Keahlian (Skills)</h4>
              <div className="mhub-skills-list">
                {detail.skills.map((s, i) => (
                  <span key={i} className="mhub-detail-skill-badge">{s}</span>
                ))}
              </div>

              <div style={{ marginTop: '24px', padding: '16px', background: '#f8fafc', borderRadius: '12px', marginBottom: '16px', border: '1px solid #e2e8f0' }}>
                <p style={{ fontSize: '0.85rem', color: '#475569', margin: '0 0 10px', lineHeight: 1.5 }}>
                  Untuk melindungi privasi, kontak langsung kerahasiaannya dijaga. Silakan hubungi volunter melalui platform kami.
                </p>
                <Link to="/login" className="mhub-detail-apply-btn" style={{ marginBottom: 0 }}>
                  <UserSearch size={16} /> Hubungi Relawan
                </Link>
              </div>
            </>
          )}

          {!detail && (
            <div className="mhub-detail-empty">
              {viewMode === 'vacancies' ? <Building2 size={48} color="#e2e8f0" /> : <Users size={48} color="#e2e8f0" />}
              <p>Pilih {viewMode === 'vacancies' ? 'posisi' : 'profil'} di sebelah kiri untuk melihat detail lengkapnya.</p>
            </div>
          )}
        </div>
      </div>

      {/* CTA Banner Dinamis */}
      <div className="mhub-cta">
        {viewMode === 'vacancies' ? (
          <>
            <Building2 size={32} color="#f59e0b" />
            <div>
              <h3>Pimpin Gereja atau Persekutuanmu?</h3>
              <p>Daftarkan gerejamu dan mulai rekrut relawan pelayanan dari komunitas kami.</p>
            </div>
            <Link to="/register" className="mhub-cta-btn">Daftarkan Gereja Anda</Link>
          </>
        ) : (
          <>
            <Heart size={32} color="#f59e0b" />
            <div>
              <h3>Tawarkan Dirimu Melayani Organisasi Gereja Lainnya!</h3>
              <p>Buat profil talentamu secara gratis, dan biarkan gereja yang membutuhkan kontak dirimu.</p>
            </div>
            <Link to="/register" className="mhub-cta-btn">Buat Profil Volunter</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default MinistryHub;
