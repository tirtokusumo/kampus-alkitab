import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Award, BookOpen, Clock, Users, CheckCircle, ShieldCheck, MonitorPlay, Calendar, ArrowRight, Star, Zap, MessageSquare } from 'lucide-react';
import { certificationsList } from '../data/certificationsData';
import usePageTitle from '../hooks/usePageTitle';
import './CertificationDetail.css';

const CertificationDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const cert = certificationsList.find(c => c.slug === slug);

  usePageTitle(cert ? cert.title : 'Sertifikasi');

  if (!cert) {
    return (
      <div className="certd-page" style={{ textAlign: 'center', padding: '100px 20px' }}>
        <h2>Program sertifikasi tidak ditemukan</h2>
        <button onClick={() => navigate('/certifications')} style={{ marginTop: 20, padding: '10px 20px', background: '#4f46e5', color: 'white', border: 'none', borderRadius: 8, cursor: 'pointer', fontWeight: 600 }}>
          Kembali ke Daftar Program
        </button>
      </div>
    );
  }

  return (
    <div className="certd-page">
      {/* HERO / POSTER */}
      <div className="certd-hero" style={{ backgroundImage: `url(${cert.posterImage})` }}>
        <div className="certd-hero-overlay"></div>
        <div className="certd-hero-content">
          <Link to="/certifications" className="certd-back">
            <ArrowLeft size={18} /> Semua Program
          </Link>
          <div className="certd-hero-badge" style={{ background: cert.color }}>{cert.gradientClass.replace('grad-', '').toUpperCase()}</div>
          <h1 className="certd-hero-title">{cert.title}</h1>
          <p className="certd-hero-desc">{cert.description}</p>
          <div className="certd-hero-meta">
            <span><BookOpen size={16} /> {cert.modules} Modul</span>
            <span><Clock size={16} /> {cert.hours} Jam</span>
            <span><Users size={16} /> {cert.students.toLocaleString('id-ID')} Alumni</span>
            <span><MonitorPlay size={16} /> {cert.method}</span>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="certd-main">
        <div className="certd-grid">
          {/* LEFT COLUMN */}
          <div className="certd-left">
            {/* About */}
            <section className="certd-section">
              <h2><Award size={20} /> Tentang Program Ini</h2>
              <p className="certd-long-desc">{cert.longDescription}</p>
            </section>

            {/* Features */}
            <section className="certd-section">
              <h2><Zap size={20} /> Yang Akan Anda Pelajari</h2>
              <div className="certd-features-grid">
                {cert.features.map((f, i) => (
                  <div key={i} className="certd-feature-item">
                    <CheckCircle size={18} color={cert.color} />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Benefits */}
            <section className="certd-section">
              <h2><ShieldCheck size={20} /> Keuntungan Setelah Lulus</h2>
              <div className="certd-benefits-list">
                {cert.benefits.map((b, i) => (
                  <div key={i} className="certd-benefit-item">
                    <div className="certd-benefit-num" style={{ background: cert.color + '18', color: cert.color }}>{i + 1}</div>
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Curriculum */}
            {cert.curriculum && cert.curriculum.length > 0 && (
              <section className="certd-section">
                <h2><BookOpen size={20} /> Kurikulum</h2>
                <div className="certd-curriculum">
                  {cert.curriculum.map((mod) => (
                    <div key={mod.module} className="certd-module-row">
                      <div className="certd-module-num" style={{ background: cert.color }}>M{mod.module}</div>
                      <div className="certd-module-title">{mod.title}</div>
                      <div className="certd-module-hours">{mod.hours} jam</div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Testimonials */}
            {cert.testimonials && cert.testimonials.length > 0 && (
              <section className="certd-section">
                <h2><MessageSquare size={20} /> Testimoni Alumni</h2>
                <div className="certd-testimonials">
                  {cert.testimonials.map((t, i) => (
                    <div key={i} className="certd-testimonial-card">
                      <div className="certd-testimonial-quote">"{t.text}"</div>
                      <div className="certd-testimonial-author">
                        <strong>{t.name}</strong>
                        <span>{t.role}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="certd-sidebar">
            <div className="certd-sidebar-card">
              <img src={cert.image} alt={cert.title} className="certd-sidebar-img" />
              
              <div className="certd-sidebar-body">
                <div className="certd-price">{cert.price}</div>
                
                <div className="certd-sidebar-info">
                  <div><Calendar size={16} /> <span>{cert.date}</span></div>
                  <div><MonitorPlay size={16} /> <span>{cert.method}</span></div>
                  <div><BookOpen size={16} /> <span>{cert.modules} Modul ({cert.hours} Jam)</span></div>
                  <div><Users size={16} /> <span>{cert.students.toLocaleString('id-ID')} Alumni</span></div>
                </div>

                <Link to="/login" className="certd-enroll-btn" style={{ background: cert.color }}>
                  Daftar Sekarang <ArrowRight size={16} />
                </Link>

                <p className="certd-sidebar-note">
                  Dengan mendaftar, Anda berkomitmen untuk bertumbuh dalam pelayanan dan memperlengkapi diri demi kemuliaan Tuhan.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificationDetail;
