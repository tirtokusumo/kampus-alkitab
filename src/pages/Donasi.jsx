import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Heart, ShieldCheck, CheckCircle, Smartphone, Building2, QrCode, ArrowRight, BookOpen, Globe } from 'lucide-react';
import usePageTitle from '../hooks/usePageTitle';
import './Donasi.css';

const presetAmounts = [50000, 100000, 250000, 500000, 1000000, 5000000];

const paymentMethodsSekali = [
  { id: 'qris', name: 'QRIS (Semua e-Wallet & m-Banking)', img: 'https://upload.wikimedia.org/wikipedia/commons/a/a2/Logo_QRIS.svg' },
  { id: 'gopay', name: 'GoPay', img: 'https://upload.wikimedia.org/wikipedia/commons/8/86/Gopay_logo.svg' },
  { id: 'shopeepay', name: 'ShopeePay', img: 'https://upload.wikimedia.org/wikipedia/commons/f/fe/Shopee.svg' },
  { id: 'bca', name: 'BCA Virtual Account', img: 'https://upload.wikimedia.org/wikipedia/commons/5/5c/Bank_Central_Asia.svg' },
  { id: 'mandiri', name: 'Mandiri Virtual Account', img: 'https://upload.wikimedia.org/wikipedia/commons/a/ad/Bank_Mandiri_logo_2016.svg' },
  { id: 'bri', name: 'BRI Virtual Account', img: 'https://upload.wikimedia.org/wikipedia/commons/2/2e/BRI_2020.svg' },
];

const paymentMethodsRutin = [
  { id: 'cc-visa', name: 'Kartu Kredit (Visa/Mastercard)', img: 'https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg' },
  { id: 'gopay', name: 'GoPay (Tokenization)', img: 'https://upload.wikimedia.org/wikipedia/commons/8/86/Gopay_logo.svg' },
  { id: 'shopeepay', name: 'ShopeePay (Auto-Debit)', img: 'https://upload.wikimedia.org/wikipedia/commons/f/fe/Shopee.svg' },
];

const formatRupiah = (num) => {
  return num.toLocaleString('id-ID');
};

const Donasi = () => {
  usePageTitle('Dukungan Pelayanan', 'Kampus Alkitab');
  const [searchParams] = useSearchParams();
  
  const [type, setType] = useState(() => {
    return localStorage.getItem('donasiType') || 'sekali';
  });
  const [amount, setAmount] = useState('');
  const [payment, setPayment] = useState(() => {
    if (localStorage.getItem('donasiType') === 'rutin') return 'cc-visa';
    return 'qris';
  });
  const [showModal, setShowModal] = useState(false);

  // Jika URL punya '?nominal=100000'
  useEffect(() => {
    const nominal = searchParams.get('nominal');
    if (nominal && !isNaN(nominal)) {
      setAmount(nominal);
    } else {
      setAmount('');
    }
  }, [searchParams]);

  const handleAmountChange = (e) => {
    // Hanya perbolehkan angka
    const val = e.target.value.replace(/\D/g, '');
    setAmount(val);
  };

  const handlePresetClick = (val) => {
    setAmount(val.toString());
  };

  const numericAmount = parseInt(amount || 0, 10);
  const isValid = numericAmount >= 10000; // Minimal donasi Rp 10.000

  const handleTypeChange = (newType) => {
    setType(newType);
    localStorage.setItem('donasiType', newType);
    // Reset payment selection to the first valid item of the new list
    if (newType === 'sekali') setPayment('qris');
    else setPayment('cc-visa');
  };

  const handleSumbit = (e) => {
    e.preventDefault();
    if (isValid) {
      setShowModal(true);
    }
  };

  const currentPaymentMethods = type === 'sekali' ? paymentMethodsSekali : paymentMethodsRutin;

  return (
    <div className="donasi-page">
      {/* ── BAGIAN VISION (KIRI) ── */}
      <div className="donasi-vision">
        <div className="donasi-badge">
          <Heart size={16} fill="currentColor" /> Yayasan Kampus Alkitab Berbagi
        </div>
        <h1 className="donasi-title">
          Bersama Kita <span>Berdampak Lebih Jauh</span>
        </h1>
        <p className="donasi-desc">
          Setiap taburan Anda merupakan "bahan bakar" bagi kami untuk terus menyediakan kurikulum teologi berkualitas tinggi secara gratis dan terjangkau bagi para pelayan Tuhan di pelosok Indonesia.
        </p>

        <div className="donasi-features">
          <div className="donasi-feature-item">
            <div className="feature-icon-wrap"><BookOpen size={24} /></div>
            <div>
              <h4>Beasiswa Hamba Tuhan</h4>
              <p>Membantu biaya pelatihan hamba Tuhan yang melayani di daerah terpencil agar tetap teredukasi.</p>
            </div>
          </div>
          <div className="donasi-feature-item">
            <div className="feature-icon-wrap"><Globe size={24} /></div>
            <div>
              <h4>Produksi Konten Pelayanan</h4>
              <p>Mendukung riset teologi, produksi video edukasi, dan pemeliharaan server platform ini.</p>
            </div>
          </div>
        </div>

        <div className="donasi-trust">
          <ShieldCheck size={32} color="#10b981" />
          <p>Donasi disalurkan secara transparan dan dimonitor oleh Yayasan Resmi. Laporan bulanan akan dikirimkan kepada donatur rutin.</p>
        </div>
      </div>

      {/* ── BAGIAN FORM (KANAN) ── */}
      <div className="donasi-form-area">
        <form onSubmit={handleSumbit}>
          
          <div className="donasi-type-selector">
            <button 
              type="button" 
              className={`donasi-type-btn ${type === 'sekali' ? 'active' : ''}`}
              onClick={() => handleTypeChange('sekali')}
            >
              Sekali Beri
            </button>
            <button 
              type="button" 
              className={`donasi-type-btn ${type === 'rutin' ? 'active' : ''}`}
              onClick={() => handleTypeChange('rutin')}
            >
              Bulanan (Rutin)
            </button>
          </div>

          {type === 'rutin' && (
            <div className="donasi-recurring-info" style={{ 
              background: '#e0e7ff', color: '#3730a3', padding: '12px 16px', 
              borderRadius: '8px', fontSize: '0.9rem', marginBottom: '1.5rem',
              display: 'flex', gap: '0.5rem', alignItems: 'flex-start'
            }}>
              💡 <span><strong>Auto-Debit Aktif:</strong> Nomimal akan dipotong secara otomatis setiap bulannya dari metode pembayaran yang Anda pilih. Anda bisa berhenti kapan saja melalui Dashboard.</span>
            </div>
          )}

          <label className="donasi-section-label">Pilih Nominal Dukungan</label>
          <div className="donasi-presets">
            {presetAmounts.map((preset) => (
              <button
                key={preset}
                type="button"
                className={`donasi-preset-btn ${numericAmount === preset ? 'active' : ''}`}
                onClick={() => handlePresetClick(preset)}
              >
                Rp {formatRupiah(preset)}
              </button>
            ))}
          </div>

          <div className="donasi-custom-input">
            <span className="donasi-custom-prefix">Rp</span>
            <input 
              type="text" 
              value={formatRupiah(amount === '' ? '' : parseInt(amount, 10))}
              onChange={handleAmountChange}
              placeholder="Nominal lainnya"
            />
          </div>

          <label className="donasi-section-label">Metode Pembayaran</label>
          <div className="donasi-payment-methods">
            {currentPaymentMethods.map(m => (
              <label key={m.id} className={`donasi-pay-opt ${payment === m.id ? 'selected' : ''}`}>
                <input 
                  type="radio" 
                  name="payment" 
                  value={m.id}
                  checked={payment === m.id}
                  onChange={() => setPayment(m.id)} 
                />
                <span className="donasi-pay-logo"><img src={m.img} alt={m.name} style={{ width: '50px', height: '24px', objectFit: 'contain' }} /></span>
                <span className="donasi-pay-name">{m.name}</span>
                {payment === m.id && <CheckCircle size={18} className="donasi-pay-check" />}
              </label>
            ))}
          </div>

          <button type="submit" className="donasi-submit-btn" disabled={!isValid}>
            Beri Dukungan Rp {formatRupiah(numericAmount)} <ArrowRight size={18} />
          </button>
        </form>
      </div>

      {/* ── MODAL KONFIRMASI PEMBAYARAN ── */}
      {showModal && (
        <div className="donasi-modal-overlay">
          <div className="donasi-modal-card">
            <div className="donasi-modal-icon">
              <Heart size={40} fill="currentColor" />
            </div>
            <h2 className="donasi-modal-title">Terima Kasih, Orang Baik!</h2>
            <p className="donasi-modal-desc">
              Satu langkah lagi untuk menyelesaikan dukungan {type === 'rutin' ? 'bulanan' : ''} Anda. Silakan selesaikan pembayaran.
            </p>

            <div className="donasi-modal-amount-box">
              <span className="donasi-modal-amount-label">Nominal Dukungan</span>
              <span className="donasi-modal-amount-value">Rp {formatRupiah(numericAmount)}</span>
            </div>

            {payment === 'qris' && (
              <div className="donasi-qris-placeholder">
                <QrCode size={120} strokeWidth={1} color="#0f172a" />
                <p>Scan menggunakan e-Wallet atau m-Banking Anda</p>
              </div>
            )}

            {(payment === 'cc-visa' || payment === 'gopay' || payment === 'shopeepay') && type === 'rutin' && (
              <div className="donasi-qris-placeholder">
                <h3 style={{ margin: '0 0 0.5rem', color: '#1e293b' }}>
                  {payment === 'cc-visa' ? 'Kartu Kredit' : (payment === 'gopay' ? 'GoPay' : 'ShopeePay')} Tersambung
                </h3>
                <p>Otomatis dipotong setiap bulan secara aman.</p>
              </div>
            )}

            {(payment === 'bca' || payment === 'mandiri' || payment === 'bri') && (
              <div className="donasi-qris-placeholder">
                <h3 style={{ margin: '0 0 0.5rem', color: '#1e293b' }}>
                  {payment.toUpperCase()} VA: 8801{Math.floor(Math.random() * 9000000000)}
                </h3>
                <p>Transfer tepat sesuai nominal hingga 3 digit terakhir.</p>
              </div>
            )}

            {(payment === 'gopay' || payment === 'shopeepay') && type === 'sekali' && (
              <div className="donasi-qris-placeholder">
                <h3 style={{ margin: '0 0 0.5rem', color: '#1e293b' }}>
                  Buka Aplikasi {payment === 'gopay' ? 'Gojek' : 'Shopee'}
                </h3>
                <p>Anda akan diarahkan ke aplikasi untuk menyelesaikan pembayaran.</p>
              </div>
            )}

            <div className="donasi-modal-actions">
              <Link to="/dashboard" className="donasi-modal-btn primary">Selesai Berdonasi</Link>
              <button 
                className="donasi-modal-btn ghost"
                onClick={() => setShowModal(false)}
              >
                Kembali
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Donasi;
