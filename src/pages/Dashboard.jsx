import { BookOpen, Star, Clock, PlayCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Dashboard.css';
import usePageTitle from '../hooks/usePageTitle';

const Dashboard = () => {
  const { user } = useAuth();
  usePageTitle('Dasbor');
  const userName = user?.name || 'Guest';

  // Mock Data
  const enrolledCourses = [
    { id: 1, title: 'Theology 101: Foundations', instructor: 'Dr. John Piper', progress: 65, rating: 4.8, reviews: 1240, image: 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?auto=format&fit=crop&q=80&w=400&h=250' },
    { id: 2, title: 'Youth Ministry Leadership', instructor: 'Pastor Tim Keller', progress: 12, rating: 4.9, reviews: 342, image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=400&h=250' }
  ];

  const recommendedCourses = [
    { id: 3, title: 'Christian Counseling Methods', instructor: 'Dr. Larry Crabb', rating: 4.7, reviews: 2156, price: 'Rp 150.000', image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=400&h=250' },
    { id: 4, title: 'Worship Team Excellence', instructor: 'Darlene Zschech', rating: 4.9, reviews: 5430, price: 'Gratis', image: 'https://images.unsplash.com/photo-1508558936510-0af1e3cccbab?auto=format&fit=crop&q=80&w=400&h=250' },
    { id: 5, title: 'Biblical Hermeneutics', instructor: 'Dr. Wayne Grudem', rating: 4.8, reviews: 890, price: 'Rp 200.000', image: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&q=80&w=400&h=250' },
    { id: 6, title: 'Church Planting 101', instructor: 'Ed Stetzer', rating: 4.6, reviews: 432, price: 'Rp 100.000', image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=400&h=250' }
  ];

  const renderStars = (rating) => {
    return (
      <div className="course-rating flex items-center">
        <span className="rating-number fw-700">{rating}</span>
        <div className="stars flex">
          {[1, 2, 3, 4, 5].map(star => (
            <Star key={star} size={14} fill={star <= rating ? "var(--color-secondary)" : "transparent"} color={star <= rating ? "var(--color-secondary)" : "var(--color-neutral-border)"} />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="dashboard-page flex flex-col gap-2xl">
      {/* Hero Banner Area */}
      <section className="dashboard-hero">
        <div className="hero-content">
          <h1 className="hero-title">Selamat Belajar, {userName}! 🙏</h1>
          <p className="hero-subtitle">"Usahakanlah supaya engkau layak di hadapan Allah sebagai seorang pekerja yang tidak usah malu, yang berterus terang memberitakan perkataan kebenaran itu." — 2 Timotius 2:15</p>
          <div style={{ marginTop: 'var(--spacing-md)', display: 'flex', gap: 'var(--spacing-sm)', flexWrap: 'wrap' }}>
            <span className="badge-primary">📚 {enrolledCourses.length} Kelas Aktif</span>
            <span className="badge-secondary">✅ 2 Sertifikat</span>
          </div>
        </div>
      </section>

      {/* Enrolled Courses / Jump Back In */}
      <section className="dashboard-section">
        <h2 className="section-title text-h2 mb-md">Lanjutkan Belajar</h2>
        <div className="udemy-course-grid">
          {enrolledCourses.map(course => (
            <Link to={`/course/${course.id}`} key={course.id} className="udemy-course-card">
              <div className="course-thumbnail relative">
                <img src={course.image} alt={course.title} className="w-full h-full object-cover" loading="lazy" />
                <div className="play-overlay absolute inset-0 flex items-center justify-center">
                  <PlayCircle size={48} color="white" />
                </div>
              </div>
              <div className="course-info p-sm">
                <h3 className="course-title fw-700 text-primary-dark">{course.title}</h3>
                <p className="course-instructor text-secondary">{course.instructor}</p>
                <div className="course-progress mt-sm">
                  <div className="progress-bar-container">
                    <div className="progress-bar-fill" style={{ width: `${course.progress}%` }}></div>
                  </div>
                  <div className="progress-text text-secondary fw-500 mt-xs">{course.progress}% selesai</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Recommended Courses Carousel (Mocked as grid for MVP) */}
      <section className="dashboard-section">
        <h2 className="section-title text-h2 mb-md">Rekomendasi Untukmu</h2>
        <div className="udemy-course-grid">
          {recommendedCourses.map(course => (
            <Link to={`/courses/${course.id}`} key={course.id} className="udemy-course-card hover-glow">
              <div className="course-thumbnail">
                <img src={course.image} alt={course.title} className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className="course-info p-sm">
                <h3 className="course-title fw-700 text-primary-dark">{course.title}</h3>
                <p className="course-instructor text-secondary">{course.instructor}</p>
                <div className="course-rating-row mt-xs flex items-center gap-xs">
                  {renderStars(course.rating)}
                  <span className="rating-count text-secondary">({course.reviews})</span>
                </div>
                <div className="course-price mt-sm fw-700 text-primary-dark">{course.price}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
