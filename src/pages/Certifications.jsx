import { Link } from 'react-router-dom';
import { Award, BookOpen, Clock, Users, CheckCircle, ArrowRight, ShieldCheck, Star, Calendar, MonitorPlay, Zap } from 'lucide-react';
import usePageTitle from '../hooks/usePageTitle';
import './Certifications.css';

import { certificationsList } from '../data/certificationsData';

const Certifications = () => {
  usePageTitle('Program Sertifikasi');

  return (
    <div className="pub-cert-page">
      {/* ── HERO TEXT ── */}
      <section className="pub-cert-hero">
        <div className="pub-cert-hero-inner">
          <div className="pub-cert-badge">
            <Award size={16} /> Tersertifikasi Otentik
          </div>
          <h1 className="pub-cert-title">
            Tingkatkan Kapasitas,<br />
            <span className="pub-cert-highlight">Validasi Panggilan Anda</span>
          </h1>
          <p className="pub-cert-subtitle">
            Kampus Alkitab menyediakan 6 program sertifikasi intensif yang didesain khusus untuk memperlengkapi pelayan Tuhan dengan keahlian spesifik dan pemahaman teologi yang solid.
          </p>
          <div className="pub-cert-hero-stats">
            <div className="pub-cert-stat">
              <h3>7,000+</h3>
              <p>Lulusan</p>
            </div>
            <div className="pub-cert-stat">
              <h3>6</h3>
              <p>Program Spesifik</p>
            </div>
            <div className="pub-cert-stat">
              <h3>100%</h3>
              <p>Berbasis Alkitab</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROGRAMS GRID ── */}
      <section className="pub-cert-programs">
        <div className="pub-cert-programs-inner">
          <div className="pub-cert-section-header">
            <h2>Pilih Program Sertifikasi Anda</h2>
            <p>Setiap program disusun oleh praktisi dan teolog berpengalaman untuk menghasilkan pelayan yang teruji.</p>
          </div>

          <div className="pub-cert-grid">
            {certificationsList.map((cert) => (
              <div key={cert.id} className="pub-cert-card">
                {/* Visual Image Header */}
                <div className="pub-cert-img-wrap">
                  <img src={cert.image} alt={cert.title} loading="lazy" />
                  <div className={`pub-cert-img-overlay ${cert.gradientClass}`}></div>
                  <div className="pub-cert-icon-badge">
                    {cert.icon}
                  </div>
                </div>
                
                <div className="pub-cert-card-body">
                  <h3 className="pub-cert-item-title">{cert.title}</h3>
                  <p className="pub-cert-desc">{cert.description}</p>
                  
                  {/* Criteria / Method Badges */}
                  <div className="pub-cert-criteria">
                    <span className="crit-badge"><MonitorPlay size={13} /> {cert.method}</span>
                    <span className="crit-badge"><Calendar size={13} /> {cert.date}</span>
                  </div>

                  <div className="pub-cert-meta">
                    <span title="Total Modul"><BookOpen size={14} /> {cert.modules} Modul</span>
                    <span title="Estimasi Waktu"><Clock size={14} /> {cert.hours} Jam</span>
                    <span title="Alumni"><Users size={14} /> {cert.students.toLocaleString('id-ID')}</span>
                  </div>

                  {/* Learn Points & Benefits */}
                  <div className="pub-cert-details">
                    <div className="pub-cert-box">
                      <h4><Zap size={15} color="#eab308" /> Yang Akan Dipelajari</h4>
                      <ul>
                        {cert.features.map((f, i) => (
                          <li key={i}><CheckCircle size={14} color="#3b82f6" /> <span>{f}</span></li>
                        ))}
                      </ul>
                    </div>
                    <div className="pub-cert-box">
                      <h4><Award size={15} color="#22c55e" /> Keuntungan Lulus</h4>
                      <ul>
                        {cert.benefits.map((b, i) => (
                          <li key={i}><ShieldCheck size={14} color="#22c55e" /> <span>{b}</span></li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  {/* Redirects to detail page */}
                  <div className="pub-cert-action-wrap">
                    <Link to={`/certifications/${cert.slug}`} className="pub-cert-action">
                      Detail Program <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="pub-cert-cta">
        <div className="pub-cert-cta-inner">
          <h2>Siap Menjadi Pelayan yang Teruji?</h2>
          <p>
            Jangan biarkan panggilan Anda hanya sebatas kerinduan abstrak. 
            Miliki fondasi yang kokoh, kapabilitas yang dipercaya, dan buktikan dedikasi Anda.
          </p>
          <Link to="/login" className="pub-cert-cta-btn">
            Buat Akun dan Mulai <ArrowRight size={18} />
          </Link>
        </div>
      </section>

    </div>
  );
};

export default Certifications;
