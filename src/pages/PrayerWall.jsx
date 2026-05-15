import { useState, useMemo } from 'react';
import { Heart, HandHeart, Lock, Globe, Clock, CheckCircle, Trash2, Edit2, AlertCircle } from 'lucide-react';
import usePageTitle from '../hooks/usePageTitle';
import SEOHead from '../components/SEOHead';
import Breadcrumb from '../components/Breadcrumb';
import './PrayerWall.css';

const CATEGORIES = [
  'Kesehatan & Kesembuhan',
  'Keluarga & Relasi',
  'Keuangan & Pekerjaan',
  'Studi & Masa Depan',
  'Pergumulan Pribadi',
  'Lainnya'
];

export const dummyPrayers = [
  {
    id: 1,
    name: 'Anonim',
    isAnonymous: true,
    category: 'Keluarga & Relasi',
    topic: 'Mohon dukungan doa untuk pemulihan komunikasi dengan orang tua saya. Akhir-akhir ini sering terjadi kesalahpahaman. Biarlah kasih Kristus memulihkan keluarga kami.',
    time: '2 jam lalu',
    supports: 14,
    supportedByMe: false
  },
  {
    id: 2,
    name: 'Samuel Liem',
    isAnonymous: false,
    category: 'Kesehatan & Kesembuhan',
    topic: 'Tolong doakan istri saya yang sedang dirawat di ICU karena komplikasi pasca operasi. Kami percaya selalu ada mukjizat dalam nama Yesus.',
    time: '5 jam lalu',
    supports: 89,
    supportedByMe: true
  },
  {
    id: 3,
    name: 'Maria Gracia',
    isAnonymous: false,
    category: 'Keuangan & Pekerjaan',
    topic: 'Berdoa agar wawancara kerja saya hari Senin besok dilancarkan. Sudah 6 bulan saya mencari pekerjaan. Kiranya Tuhan buka jalan.',
    time: '1 hari lalu',
    supports: 32,
    supportedByMe: false
  },
  {
    id: 4,
    name: 'Anonim',
    isAnonymous: true,
    category: 'Pergumulan Pribadi',
    topic: 'Sangat bergumul dengan rasa sepi dan kecemasan akhir-akhir ini. Mohon doakan agar damai sejahtera Allah memenuhi hati saya dan saya bisa merasakan hadirat-Nya lewat komunitas ini.',
    time: '2 hari lalu',
    supports: 54,
    supportedByMe: false
  }
];

const PrayerWall = () => {
  usePageTitle('Dinding Doa — Komunitas', 'Kampus Alkitab');
  
  const [prayers, setPrayers] = useState(dummyPrayers);
  const [activeFilter, setActiveFilter] = useState('Semua Doa');
  
  // Form State
  const [form, setForm] = useState({
    name: '',
    topic: '',
    category: 'Kesehatan & Kesembuhan',
    isAnonymous: false,
    privacy: 'public' // 'public' | 'private'
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formError, setFormError] = useState('');

  const filteredPrayers = useMemo(() => {
    if (activeFilter === 'Semua Doa') return prayers;
    return prayers.filter(p => p.category === activeFilter);
  }, [prayers, activeFilter]);

  const handleSupport = (id) => {
    setPrayers(prev => prev.map(p => {
      if (p.id === id) {
        return {
          ...p,
          supports: p.supportedByMe ? p.supports - 1 : p.supports + 1,
          supportedByMe: !p.supportedByMe
        };
      }
      return p;
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError('');

    if (form.topic.trim().length < 15) {
      setFormError('Topik doa terlalu singkat. Kosakata minimal 15 huruf agar dapat dipahami.');
      return;
    }

    if (editId) {
      setPrayers(prev => prev.map(p => {
        if (p.id === editId) {
          return {
            ...p,
            name: form.name.trim() || 'Hamba Tuhan',
            isAnonymous: form.isAnonymous,
            category: form.category,
            topic: form.topic
          };
        }
        return p;
      }));
      setEditId(null);
    } else {
      if (form.privacy === 'public') {
        const newPrayer = {
          id: Date.now(),
          name: form.name.trim() || 'Hamba Tuhan',
          isAnonymous: form.isAnonymous,
          category: form.category,
          topic: form.topic,
          time: 'Baru saja',
          supports: 0,
          supportedByMe: false,
          isMine: true
        };
        setPrayers([newPrayer, ...prayers]);
      }
    }

    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setForm({ name: '', topic: '', category: 'Kesehatan & Kesembuhan', isAnonymous: false, privacy: 'public' });
    }, 3000);
  };

  const handleEdit = (prayer) => {
    setForm({
      name: prayer.name === 'Anonim' || prayer.name === 'Hamba Tuhan' ? '' : prayer.name,
      topic: prayer.topic,
      category: prayer.category,
      isAnonymous: prayer.isAnonymous,
      privacy: 'public'
    });
    setEditId(prayer.id);
    setFormError('');
    setIsSubmitted(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id) => {
    if (window.confirm('Yakin ingin menghapus permohonan doa ini?')) {
      setPrayers(prev => prev.filter(p => p.id !== id));
      if (editId === id) {
        setEditId(null);
        setForm({ name: '', topic: '', category: 'Kesehatan & Kesembuhan', isAnonymous: false, privacy: 'public' });
      }
    }
  };

  return (
    <div className="prayer-page">
      <SEOHead title="Dinding Doa" description="Saling menguatkan dalam kasih. Bagikan pergumulanmu dan berdoalah bagi komunitas." />
      
      <div className="prayer-container">
        <Breadcrumb items={[{ label: 'Komunitas', to: '/community' }, { label: 'Dinding Doa' }]} />
        
        <div className="prayer-header">
          <div className="prayer-badge"><HandHeart size={16} /> Komunitas Berdoa</div>
          <h1>Dinding Doa & Syafaat</h1>
          <p>
            "Bertolong-tolonganlah menanggung bebanmu! Demikianlah kamu memenuhi hukum Kristus." (Galatia 6:2). 
            Mari saling membagikan beban dan saling meneguhkan satu sama lain di dalam kekuatan doa.
          </p>
        </div>

        <div className="prayer-layout">
          {/* ── Form Kiri ── */}
          <div className="prayer-side-form">
            <div className="prayer-form-header">
              <h3>{editId ? 'Perbarui Doamu' : 'Bagikan Pergumulanmu'}</h3>
              <p>Tim pendoa dan komunitas siap mendukungmu.</p>
            </div>

            {isSubmitted ? (
              <div className="prayer-alert">
                <CheckCircle size={32} style={{ marginBottom: 10 }} />
                <h4>Doa Telah Dicatat</h4>
                <p>Permohonan doamu telah diterima. Terimakasih telah membagikan bebanmu bersama komunitas.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                {formError && (
                  <div style={{ background: '#fef2f2', color: '#b91c1c', padding: '12px', borderRadius: '8px', marginBottom: '16px', display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.85rem' }}>
                    <AlertCircle size={16} style={{ flexShrink: 0, marginTop: '2px' }}/>
                    {formError}
                  </div>
                )}
                
                {!editId && (
                  <div className="prayer-field">
                  <label>Hak Akses Privasi</label>
                  <div className="prayer-privacy-options">
                    <label className={`prayer-privacy-opt ${form.privacy === 'public' ? 'selected' : ''}`}>
                      <Globe size={24} />
                      <input 
                        type="radio" 
                        name="privacy" 
                        checked={form.privacy === 'public'}
                        onChange={() => setForm({ ...form, privacy: 'public' })}
                      />
                      <span>Buka ke Publik</span>
                    </label>
                    <label className={`prayer-privacy-opt ${form.privacy === 'private' ? 'selected' : ''}`}>
                      <Lock size={24} />
                      <input 
                        type="radio" 
                        name="privacy"
                        checked={form.privacy === 'private'}
                        onChange={() => setForm({ ...form, privacy: 'private' })}
                      />
                      <span>Rahasia Tim Doa</span>
                    </label>
                  </div>
                </div>
                )}

                <div className="prayer-field">
                  <label>Nama Anda</label>
                  <input 
                    type="text" 
                    placeholder="Nama Lengkap" 
                    value={form.name} 
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    disabled={form.isAnonymous}
                  />
                  <label className="prayer-checkbox">
                    <input 
                      type="checkbox" 
                      checked={form.isAnonymous}
                      onChange={e => setForm({ ...form, isAnonymous: e.target.checked })}
                    />
                    Samarkan Nama Saya (Anonim)
                  </label>
                </div>

                <div className="prayer-field">
                  <label>Kategori</label>
                  <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                <div className="prayer-field">
                  <label>Topik Doa</label>
                  <textarea 
                    rows={5} 
                    placeholder="Ceritakan dengan jelas apa pergumulan Anda..."
                    value={form.topic}
                    onChange={e => setForm({ ...form, topic: e.target.value })}
                    required
                  />
                </div>

                <button type="submit" className="prayer-submit-btn">
                  <PrayingHandsIcon size={18} /> {editId ? 'Simpan Perubahan' : 'Kirim Permohonan Doa'}
                </button>
              </form>
            )}
          </div>

          {/* ── Wall Kanan ── */}
          <div className="prayer-wall-area">
            <div className="prayer-wall-filters">
              <button 
                className={`prayer-filter-btn ${activeFilter === 'Semua Doa' ? 'active' : ''}`}
                onClick={() => setActiveFilter('Semua Doa')}
              >
                Semua Doa
              </button>
              {CATEGORIES.map(c => (
                <button 
                  key={c}
                  className={`prayer-filter-btn ${activeFilter === c ? 'active' : ''}`}
                  onClick={() => setActiveFilter(c)}
                >
                  {c}
                </button>
              ))}
            </div>

            {filteredPrayers.length === 0 ? (
              <div className="prayer-empty">
                <p>Belum ada permohonan doa publik untuk kategori ini.</p>
              </div>
            ) : (
              filteredPrayers.map(prayer => (
                <div key={prayer.id} className="prayer-card">
                  <div className="prayer-card-header">
                    <div className="prayer-author">
                      <div className="prayer-avatar">
                        <UserIcon isAnonymous={prayer.isAnonymous} />
                      </div>
                      <div className="prayer-meta">
                        <span className="prayer-name">{prayer.isAnonymous ? 'Anonim' : prayer.name}</span>
                        <span className="prayer-time"><Clock size={12} /> {prayer.time}</span>
                      </div>
                    </div>
                    <span className="prayer-category-tag">{prayer.category}</span>
                  </div>
                  
                  <div className="prayer-body">
                    {prayer.topic}
                  </div>

                  <div className="prayer-actions" style={{ justifyContent: 'space-between' }}>
                    <button 
                      className={`prayer-support-btn ${prayer.supportedByMe ? 'supported' : ''}`}
                      onClick={() => handleSupport(prayer.id)}
                    >
                      <HandHeart size={16} /> 
                      {prayer.supportedByMe ? 'Anda mendukung ini' : 'Dukung Doa'} 
                      {prayer.supports > 0 && ` (${prayer.supports})`}
                    </button>
                    {prayer.isMine && (
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button onClick={() => handleEdit(prayer)} style={{ background: '#f1f5f9', border: 'none', borderRadius: '8px', padding: '8px', cursor: 'pointer', color: '#64748b' }} title="Edit"><Edit2 size={16}/></button>
                        <button onClick={() => handleDelete(prayer.id)} style={{ background: '#fef2f2', border: 'none', borderRadius: '8px', padding: '8px', cursor: 'pointer', color: '#ef4444' }} title="Hapus"><Trash2 size={16}/></button>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const UserIcon = ({ isAnonymous }) => {
  if (isAnonymous) {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="8" r="5"/>
        <path d="M4 22c0-4 4-7 8-7s8 3 8 7"/>
      </svg>
    );
  }
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
      <circle cx="12" cy="7" r="4"></circle>
    </svg>
  );
};

const PrayingHandsIcon = ({ size = 20, color = "currentColor", className = "" }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 256 256" 
    fill={color} 
    className={className}
  >
    <path d="M235.32,180l-36.24-36.25L162.62,23.46A21.76,21.76,0,0,0,128,12.93,21.76,21.76,0,0,0,93.38,23.46L56.92,143.76,20.68,180a16,16,0,0,0,0,22.62l32.69,32.69a16,16,0,0,0,22.63,0L124.28,187a40.68,40.68,0,0,0,3.72-4.29,40.68,40.68,0,0,0,3.72,4.29L180,235.32a16,16,0,0,0,22.63,0l32.69-32.69A16,16,0,0,0,235.32,180ZM64.68,224,32,191.32l12.69-12.69,32.69,32.69ZM120,158.75a23.85,23.85,0,0,1-7,17L88.68,200,56,167.32l13.65-13.66a8,8,0,0,0,2-3.34l37-122.22A5.78,5.78,0,0,1,120,29.78Zm23,17a23.85,23.85,0,0,1-7-17v-129a5.78,5.78,0,0,1,11.31-1.68l37,122.22a8,8,0,0,0,2,3.34l14.49,14.49-33.4,32ZM191.32,224l-12.56-12.57,33.39-32L224,191.32Z"/>
  </svg>
);

export default PrayerWall;
