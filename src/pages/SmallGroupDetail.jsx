import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ArrowLeft, MapPin, Calendar, Users, Info, ShieldCheck, CheckCircle } from 'lucide-react';
import { mockSmallGroups } from '../data/mockSmallGroups';
import usePageTitle from '../hooks/usePageTitle';
import SEOHead from '../components/SEOHead';
import './SmallGroups.css';

const SmallGroupDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const groupId = parseInt(id, 10);
  
  // Note: For a real app, this would be fetched from API and state-managed centrally.
  // Here we use local state seeded by mock data.
  const [group, setGroup] = useState(null);
  const [hasJoined, setHasJoined] = useState(false);

  useEffect(() => {
    const found = mockSmallGroups.find(g => g.id === groupId);
    if (found) {
      setGroup(found);
      if (user) {
        setHasJoined(found.members.some(m => m.name === user.name));
      }
    }
  }, [groupId, user]);

  usePageTitle(group?.name || 'Detail Kelompok');

  if (!group) {
    return (
      <div className="sg-page-container" style={{ textAlign: 'center', padding: '100px 20px' }}>
        <h2>Kelompok tidak ditemukan</h2>
        <button onClick={() => navigate('/community/small-groups')} className="sg-create-btn" style={{ marginTop: '20px' }}>
          Kembali ke Daftar Kelompok
        </button>
      </div>
    );
  }

  const isFull = group.members.length >= group.capacity;
  const fillPercentage = (group.members.length / group.capacity) * 100;

  const handleJoin = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    if (isFull || hasJoined) return;

    // Simulate joining
    const newMember = { id: Date.now(), name: user.name };
    setGroup(prev => ({
      ...prev,
      members: [...prev.members, newMember]
    }));
    setHasJoined(true);
  };

  return (
    <div className="sg-detail-page">
      <SEOHead title={group.name} />
      
      {/* Banner */}
      <div className="sg-detail-hero" style={{ backgroundImage: `url(${group.image})` }}>
        <div className="sg-detail-hero-overlay"></div>
        <div className="sg-detail-hero-content">
          <Link to="/community/small-groups" className="sg-back-link">
            <ArrowLeft size={18} /> Kembali ke Direktori
          </Link>
          <span className="sg-detail-badge">{group.category}</span>
          <h1 className="sg-detail-title">{group.name}</h1>
          <p className="sg-detail-leader">Dipimpin oleh: <strong>{group.leader}</strong></p>
        </div>
      </div>

      {/* Main Content */}
      <div className="sg-detail-main">
        <div className="sg-detail-grid">
          {/* Left Column: Details */}
          <div className="sg-detail-left">
            <section className="sg-section">
              <h2><Info size={20} /> Tentang Kelompok Ini</h2>
              <p className="sg-description">{group.description}</p>
            </section>

            <section className="sg-section">
              <h2><ShieldCheck size={20} /> Syarat & Kriteria</h2>
              <ul className="sg-list">
                <li><strong>Kriteria:</strong> {group.criteria}</li>
                <li><strong>Syarat Gabung:</strong> {group.requirements}</li>
              </ul>
            </section>

            <section className="sg-section">
              <h2><CheckCircle size={20} /> Kegiatan Rutin</h2>
              <ul className="sg-activities-list">
                {group.activities.map((act, i) => (
                  <li key={i}>{act}</li>
                ))}
              </ul>
            </section>
          </div>

          {/* Right Column: Floating Sidebar */}
          <div className="sg-detail-sidebar">
            <div className="sg-sidebar-card">
              <h3>Informasi Pertemuan</h3>
              
              <div className="sg-sidebar-info">
                <div className="info-icon"><MapPin size={20} /></div>
                <div>
                  <span className="info-label">Lokasi</span>
                  <span className="info-value">{group.location}</span>
                </div>
              </div>

              <div className="sg-sidebar-info">
                <div className="info-icon"><Calendar size={20} /></div>
                <div>
                  <span className="info-label">Jadwal</span>
                  <span className="info-value">{group.schedule}</span>
                </div>
              </div>

              <div className="sg-sidebar-divider"></div>

              <h3>Kapasitas Jemaat</h3>
              <div className="sg-capacity-section" style={{ marginTop: '12px' }}>
                <div className="sg-capacity-header">
                  <span className="sg-capacity-label"><Users size={14} /> Terisi</span>
                  <span className="sg-capacity-count" style={{ fontWeight: 'bold' }}>{group.members.length} / {group.capacity}</span>
                </div>
                <div className="sg-progress-bar-bg" style={{ height: '8px' }}>
                  <div 
                    className={`sg-progress-bar-fill ${isFull ? 'full' : ''}`} 
                    style={{ width: `${Math.min(fillPercentage, 100)}%` }}
                  ></div>
                </div>
              </div>

              {hasJoined ? (
                <button className="sg-join-btn joined" disabled>
                  <CheckCircle size={18} /> Anda Sudah Bergabung
                </button>
              ) : isFull ? (
                <button className="sg-join-btn full" disabled>
                  Kapasitas Penuh
                </button>
              ) : (
                <button className="sg-join-btn" onClick={handleJoin}>
                  Ikut Bergabung
                </button>
              )}
              
              <p className="sg-join-note">
                Bergabung dengan kelompok kecil adalah komitmen untuk bertumbuh bersama.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmallGroupDetail;
