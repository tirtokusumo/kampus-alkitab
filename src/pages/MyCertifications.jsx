import { useState } from 'react';
import { Award, Download, CheckCircle, Clock, BookOpen, ArrowRight, Star, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './MyCertifications.css';
import usePageTitle from '../hooks/usePageTitle';

const MyCertifications = () => {
  const { user } = useAuth();
  usePageTitle('Sertifikasi');
  const [downloadedIds, setDownloadedIds] = useState(new Set());
  const [sharedIds, setSharedIds] = useState(new Set());

  const handleDownload = (id) => setDownloadedIds(prev => new Set([...prev, id]));
  const handleShare = (id) => setSharedIds(prev => new Set([...prev, id]));


  const earnedCerts = [
    {
      id: 1,
      title: 'Theology 101: Foundations',
      subtitle: 'Issued by Kampus Alkitab',
      date: 'October 15, 2023',
      grade: '95%',
      gradeLabel: 'Distinction',
      instructor: 'Dr. John Piper',
      image: 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?auto=format&fit=crop&q=80&w=600&h=350',
    },
    {
      id: 2,
      title: 'Basic Discipleship & Ministry',
      subtitle: 'Issued by Kampus Alkitab',
      date: 'July 22, 2023',
      grade: '100%',
      gradeLabel: 'With Honors',
      instructor: 'Pdt. Budi Santoso',
      image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=600&h=350',
    },
  ];

  const availableTracks = [
    {
      id: 1,
      title: 'Youth Ministry Leadership',
      description: 'Equip yourself to lead, disciple, and inspire the next generation of faithful believers.',
      modules: 5,
      timeEst: '20 hours',
      progress: 30,
      image: 'https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&q=80&w=120&h=120',
      level: 'Intermediate',
    },
    {
      id: 2,
      title: 'Christian Counseling Methods',
      description: 'Learn evidence-based and biblically-grounded approaches to pastoral and clinical counseling.',
      modules: 8,
      timeEst: '45 hours',
      progress: 0,
      image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=120&h=120',
      level: 'Advanced',
    },
    {
      id: 3,
      title: 'Worship Team Excellence',
      description: 'Develop your musical, spiritual, and leadership skills to lead your congregation in authentic worship.',
      modules: 4,
      timeEst: '15 hours',
      progress: 0,
      image: 'https://images.unsplash.com/photo-1508558936510-0af1e3cccbab?auto=format&fit=crop&q=80&w=120&h=120',
      level: 'Beginner',
    },
  ];

  const levelColor = { Beginner: '#22c55e', Intermediate: '#f59e0b', Advanced: '#ef4444' };

  return (
    <div className="certifications-page">

      {/* Hero Stats Banner */}
      <section className="cert-hero">
        <div className="cert-hero-content">
          <div className="cert-hero-text">
            <h1 className="cert-hero-title">Your Achievements</h1>
            <p className="cert-hero-subtitle">Track your learning journey and showcase your certifications.</p>
          </div>
          <div className="cert-hero-stats">
            <div className="cert-stat">
              <Award size={28} className="cert-stat-icon" />
              <div>
                <div className="cert-stat-number">{earnedCerts.length}</div>
                <div className="cert-stat-label">Certificates Earned</div>
              </div>
            </div>
            <div className="cert-stat">
              <BookOpen size={28} className="cert-stat-icon" />
              <div>
                <div className="cert-stat-number">{availableTracks.length}</div>
                <div className="cert-stat-label">Tracks Available</div>
              </div>
            </div>
            <div className="cert-stat">
              <Star size={28} className="cert-stat-icon" />
              <div>
                <div className="cert-stat-number">97%</div>
                <div className="cert-stat-label">Avg. Grade</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Earned Certificates */}
      <section className="cert-section">
        <div className="cert-section-header">
          <div className="section-badge">
            <Award size={18} />
            Earned
          </div>
          <h2 className="cert-section-title">My Certificates <span className="count-pill">{earnedCerts.length}</span></h2>
          <p className="cert-section-subtitle">Download and share your official Kampus Alkitab certificates.</p>
        </div>

        <div className="earned-grid">
          {earnedCerts.map(cert => (
            <div key={cert.id} className="cert-card">
              {/* Certificate image with overlay */}
              <div className="cert-image-wrap">
                <img src={cert.image} alt={cert.title} className="cert-img" />
                <div className="cert-overlay">
                  <button
                    className="cert-download-btn"
                    onClick={() => handleDownload(cert.id)}
                    style={downloadedIds.has(cert.id) ? { background: '#22c55e' } : {}}
                  >
                    {downloadedIds.has(cert.id)
                      ? <><CheckCircle size={16} /> Terunduh!</>
                      : <><Download size={16} /> Download PDF</>
                    }
                  </button>
                </div>
                <div className="cert-grade-badge">
                  <span>{cert.grade}</span>
                  <span className="grade-label">{cert.gradeLabel}</span>
                </div>
              </div>
              {/* Certificate details */}
              <div className="cert-body">
                <div className="cert-issuer">
                  <img
                    src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=32&h=32"
                    alt="issuer"
                    className="cert-issuer-logo"
                  />
                  <span>{cert.subtitle}</span>
                </div>
                <h3 className="cert-title">{cert.title}</h3>
                <p className="cert-instructor">oleh {cert.instructor}</p>
                <div className="cert-footer">
                  <span className="cert-date">
                    <CheckCircle size={14} /> Issued {cert.date}
                  </span>
                  <button
                    className="cert-share-btn"
                    onClick={() => handleShare(cert.id)}
                    style={sharedIds.has(cert.id) ? { color: '#22c55e', borderColor: '#22c55e' } : {}}
                  >
                    {sharedIds.has(cert.id) ? '✓ Dibagikan!' : 'Bagikan'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Available Certification Tracks */}
      <section className="cert-section">
        <div className="cert-section-header">
          <div className="section-badge tracks">
            <Lock size={18} />
            Tracks
          </div>
          <h2 className="cert-section-title">Certification Tracks</h2>
          <p className="cert-section-subtitle">Complete a track to earn an official certificate of completion.</p>
        </div>

        <div className="tracks-list">
          {availableTracks.map(track => (
            <div key={track.id} className="track-card">
              <div className="track-image-wrap">
                <img src={track.image} alt={track.title} className="track-img" />
              </div>
              <div className="track-body">
                <div className="track-tags">
                  <span className="track-level-tag" style={{ color: levelColor[track.level], borderColor: levelColor[track.level] }}>
                    {track.level}
                  </span>
                  <span className="track-meta-pill"><Award size={12} /> {track.modules} Modules</span>
                  <span className="track-meta-pill"><Clock size={12} /> {track.timeEst}</span>
                </div>
                <h3 className="track-title">{track.title}</h3>
                <p className="track-desc">{track.description}</p>

                {track.progress > 0 && (
                  <div className="track-progress-wrap">
                    <div className="track-progress-bar-bg">
                      <div className="track-progress-bar-fill" style={{ width: `${track.progress}%` }} />
                    </div>
                    <span className="track-progress-text">{track.progress}% complete</span>
                  </div>
                )}
              </div>
              <div className="track-action">
                <button className={`btn ${track.progress > 0 ? 'btn-primary' : 'btn-outline'} track-btn`}>
                  {track.progress > 0 ? 'Continue' : 'Start Track'} <ArrowRight size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default MyCertifications;
