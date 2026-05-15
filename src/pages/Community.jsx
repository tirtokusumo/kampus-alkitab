import { useState, useMemo } from 'react';
import { MessageCircle, Heart, Search, X, PlusCircle, PenSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { allDiscussions } from '../data/mockForum';
import './Community.css';
import usePageTitle from '../hooks/usePageTitle';

const CATEGORIES = ['Semua Topik', 'Pertumbuhan Rohani', 'Studi Alkitab', 'Doa Bersama', 'Pelayanan', 'Dukungan & Kepedulian', 'Diskusi Kelas', 'Umum'];
const PAGE_SIZE = 6;

const Community = () => {
  usePageTitle('Komunitas Forum Diskusi');
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('Semua Topik');
  const [searchQuery, setSearchQuery] = useState('');
  const [likedIds, setLikedIds] = useState(new Set());
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [showNewTopicModal, setShowNewTopicModal] = useState(false);
  const [threads, setThreads] = useState(allDiscussions);
  const { user } = useAuth();

  const toggleLike = (id) => {
    if (!user) {
      navigate('/login');
      return;
    }
    setLikedIds(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const filtered = useMemo(() => {
    let result = [...threads];
    if (activeCategory !== 'Semua Topik') {
      result = result.filter(d => d.category === activeCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(d =>
        d.title.toLowerCase().includes(q) ||
        d.category.toLowerCase().includes(q) ||
        d.author.toLowerCase().includes(q)
      );
    }
    return result;
  }, [activeCategory, searchQuery]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  return (
    <div className="editorial-community-page">
      {/* Header */}
      <div className="editorial-header">
        <h1 className="editorial-h1">Forum Diskusi</h1>
        <p className="editorial-subtitle">Bergabunglah dalam percakapan, bagikan kesaksian, dan bertumbuh bersama sesama percaya.</p>
        <div className="editorial-search">
          <Search className="editorial-search-icon" size={18} />
          <input
            type="text"
            placeholder="Cari topik diskusi..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button className="community-search-clear" onClick={() => setSearchQuery('')}>
              <X size={14} />
            </button>
          )}
        </div>
        <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
          <button 
            className="btn btn-primary" 
            style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px', borderRadius: '8px' }}
            onClick={() => {
              if (!user) {
                navigate('/login');
              } else {
                setShowNewTopicModal(true);
              }
            }}
          >
            <PenSquare size={18} /> Mulai Diskusi Baru
          </button>
        </div>
      </div>

      {/* Category Filter Chips */}
      <div className="editorial-categories">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            className={`category-chip ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => { setActiveCategory(cat); setVisibleCount(PAGE_SIZE); }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Discussion Grid */}
      {visible.length > 0 ? (
        <section className="editorial-grid">
          {visible.map(discussion => {
            const liked = likedIds.has(discussion.id);
            return (
              <article key={discussion.id} className="editorial-card" onClick={() => navigate(`/community/thread/${discussion.id}`)} style={{ cursor: 'pointer' }}>
                <div className="card-image-wrapper">
                  <img src={discussion.image} alt={discussion.title} loading="lazy" />
                </div>
                <div className="card-content">
                  <span className="card-category">{discussion.category}</span>
                  <h3 className="card-title" style={{ transition: 'color 0.2s' }}>{discussion.title}</h3>
                  <div className="card-footer">
                    <span className="author">{discussion.author}</span>
                    <div className="stats">
                      <button
                        className={`like-btn ${liked ? 'liked' : ''}`}
                        onClick={(e) => { e.stopPropagation(); toggleLike(discussion.id); }}
                        aria-label={liked ? 'Hapus like' : 'Like'}
                      >
                        <Heart size={14} fill={liked ? 'currentColor' : 'none'} />
                        {discussion.likes + (liked ? 1 : 0)}
                      </button>
                      <span><MessageCircle size={14} /> {discussion.comments}</span>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </section>
      ) : (
        <div className="community-empty">
          <MessageCircle size={48} color="#cbd5e1" />
          <p>Tidak ada diskusi ditemukan untuk "{searchQuery || activeCategory}".</p>
          <button onClick={() => { setSearchQuery(''); setActiveCategory('Semua Topik'); }}>Reset Filter</button>
        </div>
      )}

      {hasMore && (
        <div className="load-more-row">
          <button
            className="btn btn-primary"
            style={{ padding: '12px 40px', borderRadius: '9999px' }}
            onClick={() => setVisibleCount(c => c + PAGE_SIZE)}
          >
            Tampilkan Lebih Banyak ({filtered.length - visibleCount} tersisa)
          </button>
        </div>
      )}

      {/* New Topic Modal (Mock) */}
      {showNewTopicModal && (
        <div className="modal-overlay" onClick={() => setShowNewTopicModal(false)} style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.6)', zIndex:1000, display:'flex', alignItems:'center', justifyContent:'center', padding:'20px' }}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{ background:'#fff', width:'100%', maxWidth:'600px', borderRadius:'16px', padding:'24px' }}>
            <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'20px', alignItems:'center' }}>
              <h2 style={{ margin:0, fontSize:'1.3rem', color:'#0f172a' }}>Buat Diskusi Baru</h2>
              <button onClick={() => setShowNewTopicModal(false)} style={{ background:'none', border:'none', cursor:'pointer', color:'#64748b' }}><X size={24}/></button>
            </div>
            
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              const newDiscussion = {
                id: Date.now(),
                title: formData.get('title'),
                author: 'Anda',
                category: formData.get('category'),
                comments: 0,
                likes: 0,
                image: 'https://images.unsplash.com/photo-1544411047-c45ba52fb2bd?auto=format&fit=crop&q=80&w=600&h=400',
                content: formData.get('content'),
                timestamp: 'Baru saja'
              };
              setThreads([newDiscussion, ...threads]);
              setShowNewTopicModal(false);
            }}>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display:'block', marginBottom:'8px', fontSize:'0.9rem', fontWeight:600 }}>Pilih Kategori</label>
                <select name="category" style={{ padding:'12px', width:'100%', borderRadius:'8px', border:'1px solid #cbd5e1' }}>
                  {CATEGORIES.filter(c => c !== 'Semua Topik').map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display:'block', marginBottom:'8px', fontSize:'0.9rem', fontWeight:600 }}>Judul Diskusi</label>
                <input name="title" required type="text" placeholder="Gambarkan topikmu secara singkat..." style={{ padding:'12px', width:'100%', borderRadius:'8px', border:'1px solid #cbd5e1' }} />
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label style={{ display:'block', marginBottom:'8px', fontSize:'0.9rem', fontWeight:600 }}>Isi Pesan</label>
                <textarea name="content" required rows={6} placeholder="Bagikan pertanyaan, kesaksian, atau pandanganmu..." style={{ padding:'12px', width:'100%', borderRadius:'8px', border:'1px solid #cbd5e1', resize:'vertical' }}></textarea>
              </div>

              <div style={{ display:'flex', gap:'12px', justifyContent:'flex-end' }}>
                <button type="button" onClick={() => setShowNewTopicModal(false)} style={{ padding:'10px 20px', borderRadius:'8px', background:'#f1f5f9', color:'#475569', fontWeight:600, border:'none', cursor:'pointer' }}>Batal</button>
                <button type="submit" style={{ padding:'10px 20px', borderRadius:'8px', background:'#1a237e', color:'#fff', fontWeight:600, border:'none', cursor:'pointer' }}>Posting Diskusi</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Community;
