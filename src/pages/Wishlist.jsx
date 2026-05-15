import { Link } from 'react-router-dom';
import { Heart, Trash2, BookOpen, Star, Clock, Users, ShoppingCart } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import usePageTitle from '../hooks/usePageTitle';
import EmptyState from '../components/EmptyState';
import './Wishlist.css';

/* ── Same course data as Courses.jsx (shared mock) ── */
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

const levelColors = { Beginner: '#22c55e', Intermediate: '#f59e0b', Advanced: '#ef4444' };

const Wishlist = () => {
  usePageTitle('Wishlist');
  const { wishlist, toggleWishlist, clearWishlist } = useWishlist();

  const wishlistCourses = allCourses.filter(c => wishlist.includes(c.id));

  return (
    <div className="wishlist-page">
      <div className="wishlist-header">
        <div className="wishlist-header-left">
          <Heart size={28} fill="#ef4444" color="#ef4444" />
          <div>
            <h1 className="wishlist-title">Wishlist Saya</h1>
            <p className="wishlist-subtitle">{wishlistCourses.length} kelas tersimpan</p>
          </div>
        </div>
        {wishlistCourses.length > 0 && (
          <button className="wishlist-clear-btn" onClick={clearWishlist}>
            <Trash2 size={16} />
            Hapus Semua
          </button>
        )}
      </div>

      {wishlistCourses.length === 0 ? (
        <EmptyState
          type="wishlist"
          ctaText="Jelajahi Katalog Kelas"
          ctaTo="/courses"
        />
      ) : (
        <div className="wishlist-grid">
          {wishlistCourses.map(course => (
            <div key={course.id} className="wishlist-card">
              <Link to={`/course/${course.id}`} className="wishlist-card-link">
                <div className="wishlist-card-image">
                  <img src={course.image} alt={course.title} loading="lazy" />
                  <span className="wishlist-card-level" style={{ background: levelColors[course.level] }}>
                    {course.level}
                  </span>
                </div>
                <div className="wishlist-card-body">
                  <span className="wishlist-card-category">{course.category}</span>
                  <h3 className="wishlist-card-title">{course.title}</h3>
                  <div className="wishlist-card-meta">
                    <span><Clock size={13} /> {course.duration}</span>
                    <span><Users size={13} /> {course.students}</span>
                    <span><Star size={13} fill="#f59e0b" color="#f59e0b" /> {course.rating}</span>
                  </div>
                  <div className="wishlist-card-price">{course.price}</div>
                </div>
              </Link>
              <button
                className="wishlist-remove-btn"
                onClick={(e) => toggleWishlist(e, course.id)}
                title="Hapus dari wishlist"
              >
                <Heart size={18} fill="#ef4444" color="#ef4444" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
