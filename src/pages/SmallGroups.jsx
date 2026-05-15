import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Search, MapPin, Users, Calendar, PlusCircle, X } from 'lucide-react';
import { mockSmallGroups } from '../data/mockSmallGroups';
import usePageTitle from '../hooks/usePageTitle';
import './SmallGroups.css';

const CATEGORIES = ['Semua', 'Pria', 'Wanita', 'Pemuda/Profesional Muda', 'Remaja', 'Campuran'];

const SmallGroups = () => {
  usePageTitle('Kelompok Kecil');
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [groups, setGroups] = useState(mockSmallGroups);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('Semua');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const filteredGroups = useMemo(() => {
    let result = groups;
    if (activeCategory !== 'Semua') {
      result = result.filter(g => g.category === activeCategory);
    }
    if (searchQuery) {
      const lower = searchQuery.toLowerCase();
      result = result.filter(g => 
        g.name.toLowerCase().includes(lower) || 
        g.leader.toLowerCase().includes(lower) ||
        g.location.toLowerCase().includes(lower)
      );
    }
    return result;
  }, [groups, searchQuery, activeCategory]);

  const handleCreateGroup = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newGroup = {
      id: Date.now(),
      name: formData.get('name'),
      leader: user ? user.name : 'Anda',
      category: formData.get('category'),
      description: formData.get('description'),
      criteria: formData.get('criteria'),
      requirements: formData.get('requirements'),
      location: formData.get('location'),
      schedule: formData.get('schedule'),
      activities: formData.get('activities').split('\n').filter(a => a.trim()),
      members: [{ id: Date.now() + 1, name: user ? user.name : 'Anda' }],
      capacity: 12,
      image: 'https://images.unsplash.com/photo-1511649475669-e288648b2339?auto=format&fit=crop&q=80&w=600&h=400'
    };
    
    setGroups([...groups, newGroup]);
    setShowCreateModal(false);
  };

  const handleOpenCreateForm = () => {
    if (!user) {
      navigate('/login');
    } else {
      setShowCreateModal(true);
    }
  };

  return (
    <div className="sg-page-container">
      {/* HEADER SECTION */}
      <div className="sg-header-wrapper">
        <div className="sg-header-content">
          <h1>Kelompok Kecil (Small Groups)</h1>
          <p>
            Temukan keluarga rohanimu. Bertumbuhlah bersama komunitas saudara seiman yang saling mendoakan, 
            menumbuhkan karakter, dan memperdalam pengenalan akan Firman Tuhan.
          </p>
          <div className="sg-search-bar">
            <Search className="sg-search-icon" size={20} />
            <input 
              type="text" 
              placeholder="Cari berdasarkan nama, pemimpin, atau lokasi..." 
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="sg-main-content">
        {/* ACTIONS & FILTERS ROW */}
        <div className="sg-actions-row">
          <div className="sg-categories">
            {CATEGORIES.map(cat => (
              <button 
                key={cat} 
                className={`sg-category-btn ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
          
          <button className="sg-create-btn" onClick={handleOpenCreateForm}>
            <PlusCircle size={18} /> Bentuk Kelompok Baru
          </button>
        </div>

        {/* GRID OF GROUPS */}
        <div className="sg-grid">
          {filteredGroups.length === 0 ? (
            <div className="sg-empty-state">
              <Users size={48} color="#cbd5e1" />
              <h3>Belum ada kelompok</h3>
              <p>Tidak ada kelompok kecil yang cocok dengan pencarianmu.</p>
            </div>
          ) : (
            filteredGroups.map(group => {
              const isFull = group.members.length >= group.capacity;
              const fillPercentage = (group.members.length / group.capacity) * 100;
              
              return (
                <div key={group.id} className="sg-card" onClick={() => navigate(`/community/small-groups/${group.id}`)}>
                  <div className="sg-card-image">
                    <img src={group.image} alt={group.name} loading="lazy" />
                    <span className="sg-card-badge">{group.category}</span>
                  </div>
                  
                  <div className="sg-card-body">
                    <h2 className="sg-card-title">{group.name}</h2>
                    <p className="sg-card-leader">Dipimpin oleh: <strong>{group.leader}</strong></p>
                    
                    <div className="sg-card-info-list">
                      <div className="sg-info-item">
                        <MapPin size={16} /> <span>{group.location}</span>
                      </div>
                      <div className="sg-info-item">
                        <Calendar size={16} /> <span>{group.schedule}</span>
                      </div>
                    </div>
                    
                    <div className="sg-capacity-section">
                      <div className="sg-capacity-header">
                        <span className="sg-capacity-label"><Users size={14} /> Kapasitas Kursi</span>
                        <span className="sg-capacity-count">{group.members.length} / {group.capacity} org</span>
                      </div>
                      <div className="sg-progress-bar-bg">
                        <div 
                          className={`sg-progress-bar-fill ${isFull ? 'full' : ''}`} 
                          style={{ width: `${Math.min(fillPercentage, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* CREATE MODAL */}
      {showCreateModal && (
        <div className="modal-overlay" onClick={() => setShowCreateModal(false)}>
          <div className="modal-content sg-modal-wide" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Membentuk Kelompok Baru</h2>
              <button className="modal-close-btn" onClick={() => setShowCreateModal(false)}>
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleCreateGroup} className="sg-create-form">
              <div className="sg-form-grid">
                <div className="sg-form-group">
                  <label>Nama Kelompok</label>
                  <input name="name" type="text" required placeholder="Contoh: Pemuda Sion" />
                </div>
                
                <div className="sg-form-group">
                  <label>Kategori</label>
                  <select name="category" required>
                    {CATEGORIES.filter(c => c !== 'Semua').map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                <div className="sg-form-group full-width">
                  <label>Deskripsi Kelompok</label>
                  <textarea name="description" rows={3} required placeholder="Jelaskan tujuan dan fokus utama kelompok ini..."></textarea>
                </div>

                <div className="sg-form-group">
                  <label>Kriteria</label>
                  <input name="criteria" type="text" required placeholder="Contoh: Pria Dewasa/Ibu Muda" />
                </div>

                <div className="sg-form-group">
                  <label>Lokasi / Titik Kumpul</label>
                  <input name="location" type="text" required placeholder="Contoh: Google Meet / Rumah Bpk X" />
                </div>

                <div className="sg-form-group">
                  <label>Jadwal Rutin</label>
                  <input name="schedule" type="text" required placeholder="Contoh: Setiap Jumat Pukul 19:00" />
                </div>

                <div className="sg-form-group">
                  <label>Syarat Bergabung</label>
                  <input name="requirements" type="text" required placeholder="Contoh: Harus izin orang tua / Disiplin waktu" />
                </div>

                <div className="sg-form-group full-width">
                  <label>Kegiatan/Aktivitas Utama (Satu aktivitas per baris)</label>
                  <textarea name="activities" rows={3} placeholder="Membaca Firman&#10;Games&#10;Doa Syafaat"></textarea>
                </div>
              </div>

              <div className="sg-form-actions">
                <button type="button" className="sg-btn-cancel" onClick={() => setShowCreateModal(false)}>Batal</button>
                <button type="submit" className="sg-btn-submit">Bentuk Kelompok</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SmallGroups;
