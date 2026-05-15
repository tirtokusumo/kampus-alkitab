import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Star, Clock, Users, BookOpen, PlayCircle, Heart, Share2,
  CheckCircle, ChevronDown, ChevronUp, Play, FileText, Award,
  Globe, Download, Monitor, MessageSquare, BarChart3
} from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import Breadcrumb from '../components/Breadcrumb';
import SEOHead from '../components/SEOHead';
import './CourseDetail.css';

/* ── Same course data (shared mock) ── */
const allCourses = [
  { id: 1, title: 'Theology 101: Foundations', category: 'Teologi & Apologetika', level: 'Beginner', duration: '4j 30m', rating: 4.8, students: 1240, price: 'Gratis', numericPrice: 0, image: 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?auto=format&fit=crop&q=80&w=800&h=450', instructor: 'Dr. John Piper', instructorBio: 'Teolog, penulis, dan mantan gembala Bethlehem Baptist Church selama 33 tahun.' },
  { id: 2, title: 'Youth Ministry Leadership', category: 'Kepemimpinan', level: 'Intermediate', duration: '6j 15m', rating: 4.9, students: 342, price: 'Rp 150.000', numericPrice: 150000, image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=800&h=450', instructor: 'Pastor Tim Keller', instructorBio: 'Pendiri Redeemer Presbyterian Church, penulis dan pemikir Kristen kontemporer.' },
  { id: 3, title: 'Christian Counseling Basics', category: 'Konseling', level: 'Beginner', duration: '8j 00m', rating: 4.7, students: 890, price: 'Rp 200.000', numericPrice: 200000, image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=800&h=450', instructor: 'Dr. Larry Crabb', instructorBio: 'Psikolog Kristen, penulis, dan pendiri NewWay Ministries.' },
  { id: 4, title: 'Worship Leading Fundamentals', category: 'Praktikal', level: 'Beginner', duration: '5j 45m', rating: 4.9, students: 2100, price: 'Gratis', numericPrice: 0, image: 'https://images.unsplash.com/photo-1508558936510-0af1e3cccbab?auto=format&fit=crop&q=80&w=800&h=450', instructor: 'Darlene Zschech', instructorBio: 'Penulis lagu worship legendaris, worship leader Hillsong Church.' },
  { id: 5, title: 'Teaching Sunday School Effectively', category: 'Kepemimpinan', level: 'Intermediate', duration: '3j 30m', rating: 4.6, students: 450, price: 'Rp 100.000', numericPrice: 100000, image: 'https://images.unsplash.com/photo-1512389142860-9c449e58a543?auto=format&fit=crop&q=80&w=800&h=450', instructor: 'Ibu Maria Santoso', instructorBio: 'Praktisi Sekolah Minggu dengan 20+ tahun pengalaman di gereja-gereja Indonesia.' },
  { id: 6, title: 'Advanced Apologetics', category: 'Teologi & Apologetika', level: 'Advanced', duration: '12j 00m', rating: 4.9, students: 680, price: 'Rp 300.000', numericPrice: 300000, image: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&q=80&w=800&h=450', instructor: 'Dr. William Lane Craig', instructorBio: 'Filsuf dan teolog apologetika terkemuka dunia, pendiri Reasonable Faith.' },
  { id: 7, title: 'Church Planting 101', category: 'Kepemimpinan', level: 'Intermediate', duration: '7j 00m', rating: 4.6, students: 320, price: 'Rp 150.000', numericPrice: 150000, image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=800&h=450', instructor: 'Ed Stetzer', instructorBio: 'Missiolog, peneliti gereja, dan executive director Wheaton College.' },
  { id: 8, title: 'Biblical Hermeneutics', category: 'Teologi & Apologetika', level: 'Advanced', duration: '10j 00m', rating: 4.8, students: 510, price: 'Rp 250.000', numericPrice: 250000, image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&q=80&w=800&h=450', instructor: 'Dr. Wayne Grudem', instructorBio: 'Teolog sistematika, penulis Systematic Theology yang dipakai di seluruh dunia.' },
  { id: 9, title: 'Konseling Pernikahan Kristen', category: 'Konseling', level: 'Intermediate', duration: '6j 30m', rating: 4.7, students: 730, price: 'Rp 175.000', numericPrice: 175000, image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=800&h=450', instructor: 'Pdt. Andreas & Sarah', instructorBio: 'Pasangan pelayan konseling pernikahan dengan 15+ tahun pengalaman.' },
  { id: 10, title: 'Dasar Musik & Sound Ibadah', category: 'Praktikal', level: 'Beginner', duration: '4j 00m', rating: 4.8, students: 1580, price: 'Gratis', numericPrice: 0, image: 'https://images.unsplash.com/photo-1508558936510-0af1e3cccbab?auto=format&fit=crop&q=80&w=800&h=450', instructor: 'David Saragih', instructorBio: 'Sound engineer dan musisi gereja berpengalaman 12 tahun.' },
  { id: 11, title: 'Evangelism & Misi Lintas Budaya', category: 'Kepemimpinan', level: 'Advanced', duration: '9j 00m', rating: 4.9, students: 290, price: 'Rp 200.000', numericPrice: 200000, image: 'https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&q=80&w=800&h=450', instructor: 'Dr. Ralph Winter', instructorBio: 'Pelopor gerakan misi modern dan pendiri U.S. Center for World Mission.' },
  { id: 12, title: 'Doa Syafaat & Kehidupan Rohani', category: 'Praktikal', level: 'Beginner', duration: '3j 00m', rating: 4.9, students: 3200, price: 'Gratis', numericPrice: 0, image: 'https://images.unsplash.com/photo-1447069387593-a5de0862481e?auto=format&fit=crop&q=80&w=800&h=450', instructor: 'Ibu Ruth Situmorang', instructorBio: 'Pendoa syafaat dan pembicara retreat rohani nasional.' },
];

/* ── Mock syllabus modules per course ── */
const generateSyllabus = (courseId) => [
  {
    title: 'Modul 1: Pengenalan & Dasar',
    lessonsCount: 4,
    duration: '45 menit',
    open: true,
    lessons: [
      { title: 'Selamat Datang di Kelas Ini', dur: '3:20', type: 'video' },
      { title: 'Tujuan & Sasaran Pembelajaran', dur: '8:15', type: 'video' },
      { title: 'Bahan Bacaan: Pendahuluan', dur: '5 hal', type: 'doc' },
      { title: 'Kuis: Apakah Kamu Siap?', dur: '10 soal', type: 'quiz' },
    ],
  },
  {
    title: 'Modul 2: Fondasi Teologis',
    lessonsCount: 5,
    duration: '1j 15m',
    open: false,
    lessons: [
      { title: 'Kerangka Alkitabiah', dur: '12:40', type: 'video' },
      { title: 'Konteks Sejarah & Budaya', dur: '15:00', type: 'video' },
      { title: 'Studi Kasus dari Kitab Suci', dur: '18:30', type: 'video' },
      { title: 'Diskusi Kelompok', dur: '20 min', type: 'doc' },
      { title: 'Tugas Refleksi Pribadi', dur: '1 hal', type: 'doc' },
    ],
  },
  {
    title: 'Modul 3: Aplikasi Praktis',
    lessonsCount: 4,
    duration: '1j 00m',
    open: false,
    lessons: [
      { title: 'Penerapan dalam Kehidupan Sehari-hari', dur: '14:00', type: 'video' },
      { title: 'Latihan Praktikal', dur: '20:00', type: 'video' },
      { title: 'Proyek Mini', dur: '2 hal', type: 'doc' },
      { title: 'Kuis Akhir Modul', dur: '15 soal', type: 'quiz' },
    ],
  },
  {
    title: 'Modul 4: Penutup & Sertifikasi',
    lessonsCount: 3,
    duration: '30 menit',
    open: false,
    lessons: [
      { title: 'Ringkasan Materi', dur: '10:00', type: 'video' },
      { title: 'Ujian Akhir', dur: '25 soal', type: 'quiz' },
      { title: 'Sertifikat Kelulusan', dur: '', type: 'cert' },
    ],
  },
];

/* ── Mock reviews ── */
const mockReviews = [
  { name: 'Budi Santoso', initial: 'BS', rating: 5, date: '2 minggu lalu', text: 'Kelas ini luar biasa! Materinya sangat mendalam dan relevan. Pengajarnya menyampaikan dengan sangat jelas dan penuh semangat. Saya sangat merekomendasikan kelas ini untuk siapa saja yang ingin bertumbuh dalam iman.' },
  { name: 'Maria Wijaya', initial: 'MW', rating: 5, date: '1 bulan lalu', text: 'Terima kasih untuk kelas yang sangat bermutu. Saya belajar banyak hal baru dan sekarang bisa menerapkannya dalam pelayanan di gereja saya.' },
  { name: 'Daniel Hutapea', initial: 'DH', rating: 4, date: '1 bulan lalu', text: 'Kontennya sangat bagus, meskipun ada beberapa bagian yang bisa lebih detail. Secara keseluruhan pengalaman belajar yang sangat baik.' },
  { name: 'Priskila Tan', initial: 'PT', rating: 5, date: '2 bulan lalu', text: 'Saya sudah mengikuti beberapa kelas online, tapi Kampus Alkitab benar-benar berbeda. Kualitas pengajaran dan materi pendukungnya sangat profesional.' },
];

const levelColors = { Beginner: '#22c55e', Intermediate: '#f59e0b', Advanced: '#ef4444' };

const CourseDetail = () => {
  const { id } = useParams();
  const course = allCourses.find(c => c.id === parseInt(id));
  const { wishlist, toggleWishlist } = useWishlist();

  const [activeTab, setActiveTab] = useState('overview');
  const [openModules, setOpenModules] = useState([0]); // first module open by default

  if (!course) {
    return (
      <div className="course-detail-page" style={{ textAlign: 'center', padding: '80px 20px' }}>
        <BookOpen size={56} color="#cbd5e1" />
        <h2 style={{ marginTop: 16, color: '#1e293b' }}>Kelas Tidak Ditemukan</h2>
        <p style={{ color: '#64748b' }}>Kelas yang Anda cari tidak tersedia.</p>
        <Link to="/courses" style={{ color: '#1a237e', fontWeight: 600, marginTop: 12, display: 'inline-block' }}>← Kembali ke Katalog</Link>
      </div>
    );
  }

  const syllabus = generateSyllabus(course.id);
  const totalLessons = syllabus.reduce((acc, m) => acc + m.lessonsCount, 0);
  const isWished = wishlist.includes(course.id);

  const toggleModule = (idx) => {
    setOpenModules(prev =>
      prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
    );
  };

  const renderStars = (rating, size = 16) => (
    <div className="cd-rating-stars">
      {[1, 2, 3, 4, 5].map(s => (
        <Star key={s} size={size} fill={s <= Math.round(rating) ? '#f59e0b' : 'transparent'} color={s <= Math.round(rating) ? '#f59e0b' : '#cbd5e1'} />
      ))}
    </div>
  );

  const getLessonIcon = (type) => {
    switch (type) {
      case 'video': return <Play size={14} />;
      case 'doc': return <FileText size={14} />;
      case 'quiz': return <BarChart3 size={14} />;
      case 'cert': return <Award size={14} />;
      default: return <Play size={14} />;
    }
  };

  return (
    <div className="course-detail-page">
      <SEOHead
        title={`${course.title} — Kampus Alkitab`}
        description={`Pelajari ${course.title} bersama ${course.instructor}. ${course.category} · ${course.level} · ${course.duration}.`}
        image={course.image}
      />

      {/* Hero: Info + Sticky Card */}
      <div className="cd-hero">
        <div className="cd-hero-info">
          <div className="cd-breadcrumb-zone">
            <Breadcrumb items={[
              { label: 'Kelas', to: '/courses' },
              { label: course.category, to: `/courses?category=${course.category.toLowerCase().split(' ')[0]}` },
              { label: course.title },
            ]} />
          </div>

          <span className="cd-category-tag">
            <BookOpen size={13} /> {course.category}
          </span>

          <h1 className="cd-title">{course.title}</h1>

          <p className="cd-subtitle">
            Pelajari {course.title.toLowerCase()} secara mendalam dan terstruktur bersama pengajar berpengalaman.
            Kelas ini dirancang untuk membantumu bertumbuh dalam pemahaman iman dan memperlengkapi pelayananmu.
          </p>

          <div className="cd-meta-row">
            <span className="cd-meta-item">
              {renderStars(course.rating, 14)}
              <span className="cd-rating-num">{course.rating}</span>
              <span style={{ color: '#94a3b8' }}>({course.students.toLocaleString()} siswa)</span>
            </span>
            <span className="cd-meta-item">
              <Clock size={14} /> {course.duration}
            </span>
            <span className="cd-meta-item" style={{ color: levelColors[course.level], fontWeight: 600 }}>
              {course.level}
            </span>
          </div>

          <div className="cd-instructor-row">
            <div className="cd-instructor-avatar">{course.instructor.charAt(0)}</div>
            <div className="cd-instructor-info">
              <h4>{course.instructor}</h4>
              <span>{course.instructorBio}</span>
            </div>
          </div>
        </div>

        {/* Sticky Purchase/CTA Card */}
        <div className="cd-sticky-card">
          <div className="cd-card-preview">
            <img src={course.image} alt={course.title} loading="lazy" />
            <div className="cd-card-play-overlay">
              <PlayCircle size={56} color="#fff" />
            </div>
          </div>
          <div className="cd-card-body">
            <div className="cd-price-row">
              <span className="cd-price">{course.price}</span>
              {course.numericPrice > 0 && (
                <span className="cd-old-price">Rp {(course.numericPrice * 1.4).toLocaleString('id-ID')}</span>
              )}
              {course.numericPrice > 0 && (
                <span className="cd-discount-tag">Diskon 30%</span>
              )}
            </div>

            <Link to={`/course/${course.id}`} className="cd-cta-btn primary" style={{ textDecoration: 'none' }}>
              {course.numericPrice === 0 ? (
                <><PlayCircle size={18} /> Mulai Belajar Gratis</>
              ) : (
                <><BookOpen size={18} /> Daftar Kelas Sekarang</>
              )}
            </Link>

            <button className="cd-cta-btn outline" onClick={(e) => toggleWishlist(e, course.id)}>
              <Heart size={18} fill={isWished ? '#ef4444' : 'none'} color={isWished ? '#ef4444' : '#334155'} />
              {isWished ? 'Di Wishlist' : 'Simpan ke Wishlist'}
            </button>

            <div className="cd-card-features">
              <div className="cd-card-feature"><CheckCircle size={15} /> {totalLessons} pelajaran ({course.duration})</div>
              <div className="cd-card-feature"><Monitor size={15} /> Akses di semua perangkat</div>
              <div className="cd-card-feature"><Download size={15} /> Materi bisa diunduh</div>
              <div className="cd-card-feature"><Globe size={15} /> Akses seumur hidup</div>
              <div className="cd-card-feature"><Award size={15} /> Sertifikat kelulusan</div>
              <div className="cd-card-feature"><MessageSquare size={15} /> Forum diskusi Q&A</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="cd-tabs-section">
        <div className="cd-tabs-nav">
          {[
            { key: 'overview', label: 'Ikhtisar' },
            { key: 'syllabus', label: `Kurikulum (${totalLessons})` },
            { key: 'reviews', label: `Ulasan (${mockReviews.length})` },
          ].map(tab => (
            <button
              key={tab.key}
              className={`cd-tab-btn ${activeTab === tab.key ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="cd-overview">
            <h3>Apa yang Akan Kamu Pelajari</h3>
            <div className="cd-learn-grid">
              {[
                'Memahami fondasi teologis yang kokoh',
                'Menerapkan prinsip-prinsip dalam pelayanan nyata',
                'Mengembangkan perspektif Alkitabiah yang mendalam',
                'Mampu mengajar dan membagikan materi kepada orang lain',
                'Membangun komunitas belajar yang saling mendukung',
                'Mendapatkan sertifikat resmi Kampus Alkitab',
              ].map((item, i) => (
                <div key={i} className="cd-learn-item">
                  <CheckCircle size={16} /> {item}
                </div>
              ))}
            </div>

            <h3>Deskripsi Kelas</h3>
            <p>
              Kelas <strong>{course.title}</strong> dirancang khusus untuk membantu kamu memahami dan mendalami
              materi {course.category.toLowerCase()} secara komprehensif. Dengan pendekatan yang praktis dan
              berdasarkan Alkitab, kelas ini cocok untuk kamu yang berkomitmen bertumbuh dalam iman dan pelayanan.
            </p>
            <p>
              Dipimpin oleh <strong>{course.instructor}</strong> — {course.instructorBio} — kelas ini
              menggabungkan pengajaran teori, studi kasus, dan latihan praktikal yang bisa langsung kamu
              terapkan dalam konteks gereja dan kehidupan sehari-hari.
            </p>

            <h3>Persyaratan</h3>
            <p>
              • Tidak ada prasyarat khusus — siapa saja boleh mendaftar<br />
              • Komputer/HP dengan koneksi internet<br />
              • Semangat belajar yang tulus dan hati yang terbuka
            </p>

            <h3>Untuk Siapa Kelas Ini?</h3>
            <p>
              • Jemaat yang ingin memahami iman Kristen lebih dalam<br />
              • Pelayan gereja yang ingin memperlengkapi diri<br />
              • Mahasiswa teologi dan calon pendeta<br />
              • Siapa saja yang haus akan pengetahuan rohani
            </p>
          </div>
        )}

        {/* Syllabus Tab */}
        {activeTab === 'syllabus' && (
          <div className="cd-syllabus">
            {syllabus.map((mod, idx) => (
              <div key={idx} className="cd-module">
                <div className="cd-module-header" onClick={() => toggleModule(idx)}>
                  <div className="cd-module-title">
                    <span className="cd-module-badge">M{idx + 1}</span>
                    {mod.title}
                  </div>
                  <div className="cd-module-meta">
                    <span>{mod.lessonsCount} pelajaran</span>
                    <span>·</span>
                    <span>{mod.duration}</span>
                    {openModules.includes(idx) ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </div>
                </div>
                {openModules.includes(idx) && (
                  <div className="cd-module-lessons">
                    {mod.lessons.map((lesson, li) => (
                      <div key={li} className="cd-lesson">
                        {getLessonIcon(lesson.type)}
                        <span>{lesson.title}</span>
                        {lesson.dur && <span className="cd-lesson-duration">{lesson.dur}</span>}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Reviews Tab */}
        {activeTab === 'reviews' && (
          <div className="cd-reviews">
            <div className="cd-review-summary">
              <span className="cd-review-big-num">{course.rating}</span>
              <div className="cd-review-info">
                {renderStars(course.rating, 22)}
                <span className="cd-review-count">{course.students.toLocaleString()} siswa · {mockReviews.length} ulasan</span>
              </div>
            </div>

            {mockReviews.map((review, i) => (
              <div key={i} className="cd-review-card">
                <div className="cd-review-header">
                  <div className="cd-review-avatar">{review.initial}</div>
                  <div>
                    <div className="cd-review-name">{review.name}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      {renderStars(review.rating, 12)}
                      <span className="cd-review-date">{review.date}</span>
                    </div>
                  </div>
                </div>
                <p className="cd-review-text">{review.text}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseDetail;
