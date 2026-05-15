import { useState, useEffect, useMemo } from 'react';
import { BookOpen, Search, Clock, Star, PlayCircle, Users, X, Heart } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import './Courses.css';
import usePageTitle from '../hooks/usePageTitle';
import { useWishlist } from '../context/WishlistContext';
import EmptyState from '../components/EmptyState';

const allCourses = [
  { id: 1, title: 'Theology 101: Foundations', category: 'Teologi & Apologetika', level: 'Beginner', duration: '4j 30m', rating: 4.8, students: 1240, price: 'Gratis', image: 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?auto=format&fit=crop&q=80&w=600&h=340' },
  { id: 2, title: 'Youth Ministry Leadership', category: 'Kepemimpinan', level: 'Intermediate', duration: '6j 15m', rating: 4.9, students: 342, price: 'Rp 150.000', image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=600&h=340' },
  { id: 3, title: 'Christian Counseling Basics', category: 'Konseling', level: 'Beginner', duration: '8j 00m', rating: 4.7, students: 890, price: 'Rp 200.000', image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=600&h=340' },
  { id: 4, title: 'Worship Leading Fundamentals', category: 'Praktikal', level: 'Beginner', duration: '5j 45m', rating: 4.9, students: 2100, price: 'Gratis', image: 'https://images.unsplash.com/photo-1508558936510-0af1e3cccbab?auto=format&fit=crop&q=80&w=600&h=340' },
  { id: 5, title: 'Teaching Sunday School Effectively', category: 'Kepemimpinan', level: 'Intermediate', duration: '3j 30m', rating: 4.6, students: 450, price: 'Rp 100.000', image: 'https://images.unsplash.com/photo-1512389142860-9c449e58a543?auto=format&fit=crop&q=80&w=600&h=340' },
  { id: 6, title: 'Advanced Apologetics', category: 'Teologi & Apologetika', level: 'Advanced', duration: '12j 00m', rating: 4.9, students: 680, price: 'Rp 300.000', image: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&q=80&w=600&h=340' },
  { id: 7, title: 'Church Planting 101', category: 'Kepemimpinan', level: 'Intermediate', duration: '7j 00m', rating: 4.6, students: 320, price: 'Rp 150.000', image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=600&h=340' },
  { id: 8, title: 'Biblical Hermeneutics', category: 'Teologi & Apologetika', level: 'Advanced', duration: '10j 00m', rating: 4.8, students: 510, price: 'Rp 250.000', image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&q=80&w=600&h=340' },
  { id: 9, title: 'Konseling Pernikahan Kristen', category: 'Konseling', level: 'Intermediate', duration: '6j 30m', rating: 4.7, students: 730, price: 'Rp 175.000', image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=600&h=340' },
  { id: 10, title: 'Dasar Musik & Sound Ibadah', category: 'Praktikal', level: 'Beginner', duration: '4j 00m', rating: 4.8, students: 1580, price: 'Gratis', image: 'https://images.unsplash.com/photo-1508558936510-0af1e3cccbab?auto=format&fit=crop&q=80&w=600&h=340' },
  { id: 11, title: 'Evangelism & Misi Lintas Budaya', category: 'Kepemimpinan', level: 'Advanced', duration: '9j 00m', rating: 4.9, students: 290, price: 'Rp 200.000', image: 'https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&q=80&w=600&h=340' },
  { id: 12, title: 'Doa Syafaat & Kehidupan Rohani', category: 'Praktikal', level: 'Beginner', duration: '3j 00m', rating: 4.9, students: 3200, price: 'Gratis', image: 'https://images.unsplash.com/photo-1447069387593-a5de0862481e?auto=format&fit=crop&q=80&w=600&h=340' },
];

/* Map URL param → displayed category name */
const categoryMap = {
  teologi: 'Teologi & Apologetika',
  kepemimpinan: 'Kepemimpinan',
  konseling: 'Konseling',
  praktikal: 'Praktikal',
};

const categories = ['Semua', 'Teologi & Apologetika', 'Kepemimpinan', 'Konseling', 'Praktikal'];
const levelColors = { Beginner: '#22c55e', Intermediate: '#f59e0b', Advanced: '#ef4444' };

const Courses = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlCategory = searchParams.get('category');
  const initialCategory = urlCategory ? (categoryMap[urlCategory] || 'Semua') : 'Semua';

  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [sortBy, setSortBy] = useState('popular');
  const { wishlist, toggleWishlist } = useWishlist();
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const ITEMS_PER_PAGE = 6;

  // Sync category when URL param changes (e.g. browser back/forward)
  useEffect(() => {
    setActiveCategory(urlCategory ? (categoryMap[urlCategory] || 'Semua') : 'Semua');
  }, [urlCategory]);

  const pageTitle = activeCategory !== 'Semua' ? `Kelas ${activeCategory}` : 'Katalog Kelas';
  usePageTitle(pageTitle);

  const filtered = useMemo(() => {
    let result = [...allCourses];
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(c => c.title.toLowerCase().includes(q) || c.category.toLowerCase().includes(q));
    }
    if (activeCategory !== 'Semua') result = result.filter(c => c.category === activeCategory);
    if (sortBy === 'popular') result.sort((a, b) => b.students - a.students);
    else if (sortBy === 'rating') result.sort((a, b) => b.rating - a.rating);
    else if (sortBy === 'newest') result.sort((a, b) => b.id - a.id);
    return result;
  }, [searchQuery, activeCategory, sortBy]);

  return (
    <div className="courses-page">
      {/* Page Header */}
      <div className="courses-header">
        <div>
          <h1 className="courses-title">{pageTitle}</h1>
          <p className="courses-subtitle">
            {activeCategory !== 'Semua'
              ? `Kelas-kelas pilihan dalam kategori ${activeCategory}.`
              : 'Perkaya iman, perlengkap pelayananmu.'}
          </p>
        </div>
        <div className="courses-header-stat">
          <BookOpen size={20} color="var(--color-primary)" />
          <span><strong>{allCourses.length}</strong> kelas tersedia</span>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="filters-bar">
        <div className="search-input">
          <Search size={16} color="var(--color-text-secondary)" />
          <input
            type="text"
            placeholder="Cari kelas..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button className="search-clear-btn" onClick={() => setSearchQuery('')} aria-label="Hapus pencarian">
              <X size={14} />
            </button>
          )}
        </div>
        <div className="filter-right">
          <select className="sort-select" value={sortBy} onChange={e => setSortBy(e.target.value)}>
            <option value="popular">Terpopuler</option>
            <option value="rating">Rating Tertinggi</option>
            <option value="newest">Terbaru</option>
          </select>
        </div>
      </div>

      {/* Category Chips */}
      <div className="course-category-chips">
        {categories.map(cat => (
          <button
            key={cat}
            className={`category-chip-btn ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Results info */}
      <div className="courses-results-info">
        {searchQuery || activeCategory !== 'Semua'
          ? `Menampilkan ${filtered.length} kelas${activeCategory !== 'Semua' ? ` dalam "${activeCategory}"` : ''}${searchQuery ? ` untuk "${searchQuery}"` : ''}`
          : `${filtered.length} kelas tersedia`
        }
      </div>

      {/* Course Grid */}
      {filtered.length > 0 ? (
        <>
        <div className="courses-grid">
          {filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE).map((course) => (
            <Link to={`/courses/${course.id}`} key={course.id} className="course-card">
              <div className="course-thumb">
                <img src={course.image} alt={course.title} className="course-thumb-img" loading="lazy" />
                <div className="course-thumb-overlay"><PlayCircle size={44} color="white" /></div>
                <button 
                  className={`course-card-wishlist ${wishlist.includes(course.id) ? 'active' : ''}`}
                  onClick={(e) => toggleWishlist(e, course.id)}
                  aria-label="Wishlist"
                >
                  <Heart size={16} fill={wishlist.includes(course.id) ? '#ef4444' : 'none'} color={wishlist.includes(course.id) ? '#ef4444' : 'white'} />
                </button>
                <span className="course-level-tag" style={{ borderColor: levelColors[course.level], color: levelColors[course.level] }}>
                  {course.level}
                </span>
                {course.price === 'Gratis' && <span className="course-free-tag">Gratis</span>}
              </div>
              <div className="course-body">
                <span className="course-category-label">{course.category}</span>
                <h3 className="course-name">{course.title}</h3>
                <div className="course-meta">
                  <span className="course-meta-item"><Clock size={13} /> {course.duration}</span>
                  <span className="course-meta-item"><Users size={13} /> {course.students.toLocaleString()}</span>
                </div>
                <div className="course-footer">
                  <div className="course-rating">
                    <Star size={14} fill="var(--color-secondary)" color="var(--color-secondary)" />
                    <span className="rating-num">{course.rating}</span>
                  </div>
                  <span className="course-price">{course.price}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Pagination */}
        {filtered.length > ITEMS_PER_PAGE && (
          <div className="courses-pagination">
            {Array.from({ length: Math.ceil(filtered.length / ITEMS_PER_PAGE) }).map((_, i) => (
              <button
                key={i}
                className={`courses-page-btn ${currentPage === i + 1 ? 'active' : ''}`}
                onClick={() => { setSearchParams(prev => { prev.set('page', String(i + 1)); return prev; }); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
        </>
      ) : (
        <EmptyState
          type="search"
          title="Kelas tidak ditemukan"
          description="Coba ubah kata kunci atau kategori pencarianmu untuk menemukan yang kamu cari."
          ctaText="Reset Filter"
          onCtaClick={() => { setSearchQuery(''); setActiveCategory('Semua'); }}
        />
      )}
    </div>
  );
};

export default Courses;
