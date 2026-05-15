import { Link } from 'react-router-dom';
import { Tent, Sun, Activity, MapPin, CheckCircle, Navigation, ArrowRight } from 'lucide-react';
import usePageTitle from '../hooks/usePageTitle';
import Breadcrumb from '../components/Breadcrumb';
import SEOHead from '../components/SEOHead';
import { useCart } from '../context/CartContext';
import './NewLifeCamp.css';

const NewLifeCamp = () => {
  usePageTitle('New Life Camp', 'Kampus Alkitab');
  const { showToast } = useCart();

  return (
    <div className="nlc-page">
      <SEOHead title="New Life Camp" description="Retret tahunan 3 hari di pegunungan. Praise & Worship, sesi pemulihan, dan outbound bersama komunitas orang percaya." />
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 20px' }}>
        <Breadcrumb items={[{ label: 'Acara', to: '/acara' }, { label: 'New Life Camp' }]} />
      </div>
      {/* Hero Section */}
      <section className="nlc-hero">
        <div className="nlc-hero-bg">
          <img src="https://images.unsplash.com/photo-1537225228614-56cc3556d7ed?auto=format&fit=crop&q=80&w=1600" alt="New Life Camp" loading="lazy" />
        </div>
        <div className="nlc-hero-content">
          <div className="nlc-badge">🏕️ 24 - 26 November 2026</div>
          <h1 className="nlc-hero-title">
            New Life Camp: <br />
            <span className="nlc-text-glow">Renew Your Spirit</span>
          </h1>
          <p className="nlc-hero-desc">Tiga hari keluar dari rutinitas, terhubung kembali dengan hadirat Tuhan, alam, dan komunitas orang percaya di pegunungan yang sejuk.</p>
          <div className="nlc-cta-group">
            <button className="nlc-btn primary" onClick={() => showToast('Pendaftaran Camp segera dibuka! Pantau terus halaman ini.', 'info')}>
              Daftar Sekarang
            </button>
            <a href="#details" className="nlc-btn ghost">Cari Tahu Lebih Lanjut</a>
          </div>
        </div>
      </section>

      {/* Details Section */}
      <section id="details" className="nlc-details">
        <div className="nlc-details-inner">
          <div className="nlc-info-grid">
            <div className="nlc-info-item">
              <MapPin size={28} className="nlc-icon" />
              <h3>Lokasi</h3>
              <p>Bukit Doa Immanuel, Puncak, Jawa Barat</p>
            </div>
            <div className="nlc-info-item">
              <Tent size={28} className="nlc-icon" />
              <h3>Akomodasi</h3>
              <p>Glamping & Cabin dengan fasilitas lengkap</p>
            </div>
            <div className="nlc-info-item">
              <Activity size={28} className="nlc-icon" />
              <h3>Aktivitas</h3>
              <p>Praise & Worship, Sesi Pemulihan, Outbound</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Camp */}
      <section className="nlc-about">
        <div className="nlc-about-inner">
          <div className="nlc-about-img">
            <img src="https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?auto=format&fit=crop&q=80&w=800" alt="Camp Activities" loading="lazy" />
          </div>
          <div className="nlc-about-text">
            <h2>Tentang <span className="text-primary">New Life Camp</span></h2>
            <p>New Life Camp adalah retret tahunan yang dirancang untuk memberikan ruang bagi Anda menangkap visi baru dari Tuhan. Di tengah padatnya dunia digital, kita butuh momen untuh berhenti (pause), merenung, dan dipenuhi kembali oleh Roh Kudus.</p>
            <ul className="nlc-benefit-list">
              <li><CheckCircle size={18} className="text-secondary" /> Mengalami perjumpaan pribadi dengan Tuhan</li>
              <li><CheckCircle size={18} className="text-secondary" /> Refreshing fisik dan mental di alam terbuka</li>
              <li><CheckCircle size={18} className="text-secondary" /> Membangun persahabatan sejati sesama jemaat</li>
              <li><CheckCircle size={18} className="text-secondary" /> Sesi Q&A intim dengan gembala & konselor</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Pricing / Register */}
      <section className="nlc-pricing">
        <div className="nlc-pricing-inner">
          <h2>Biaya Pendaftaran</h2>
          <p className="nlc-pricing-sub">Harga sudah termasuk akomodasi 3H 2M, konsumsi, dan kit peserta (kaos, buku jurnal).</p>
          
          <div className="nlc-price-card">
            <div className="nlc-price-header">
              <h3>Early Bird</h3>
              <p>Berlaku s/d 31 Oktober 2026</p>
            </div>
            <div className="nlc-price-amount">
              Rp 850.000 <span>/ org</span>
            </div>
            <button className="nlc-btn primary full" onClick={() => showToast('Pendaftaran Early Bird akan segera tersedia!', 'info')}>
              Daftar Early Bird <ArrowRight size={16} />
            </button>
            <p className="nlc-price-note">*Kuota terbatas untuk 50 pendaftar pertama</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NewLifeCamp;
