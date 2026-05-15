import { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShoppingCart, Trash2, Plus, Minus, ArrowLeft, CreditCard, Building2,
  Smartphone, QrCode, Store, ChevronRight, CheckCircle, Clock,
  Truck, Package, MapPin, Tag, Copy, ShieldCheck, X, AlertCircle
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import usePageTitle from '../hooks/usePageTitle';
import './Checkout.css';

const SHIPPING_OPTIONS = [
  { id: 'jne-reg', name: 'JNE Reguler', est: '3-5 hari kerja', price: 15000 },
  { id: 'jnt', name: 'J&T Express', est: '2-4 hari kerja', price: 18000 },
  { id: 'sicepat', name: 'SiCepat REG', est: '2-3 hari kerja', price: 20000 },
  { id: 'gojek', name: 'GoSend (Jabodetabek)', est: 'Hari ini', price: 25000 },
];

const paymentMethods = [
  {
    group: 'Transfer Bank',
    icon: <Building2 size={20} />,
    methods: [
      { id: 'bca', name: 'BCA Virtual Account', logo: '🏦' },
      { id: 'bni', name: 'BNI Virtual Account', logo: '🏦' },
      { id: 'bri', name: 'BRI Virtual Account', logo: '🏦' },
      { id: 'mandiri', name: 'Mandiri Virtual Account', logo: '🏦' },
    ]
  },
  {
    group: 'E-Wallet',
    icon: <Smartphone size={20} />,
    methods: [
      { id: 'gopay', name: 'GoPay', logo: '💚' },
      { id: 'ovo', name: 'OVO', logo: '💜' },
      { id: 'dana', name: 'DANA', logo: '💙' },
      { id: 'shopeepay', name: 'ShopeePay', logo: '🧡' },
    ]
  },
  {
    group: 'QRIS',
    icon: <QrCode size={20} />,
    methods: [
      { id: 'qris', name: 'QRIS (Semua Bank & E-Wallet)', logo: '📲' },
    ]
  },
  {
    group: 'Kartu Kredit/Debit',
    icon: <CreditCard size={20} />,
    methods: [
      { id: 'cc-visa', name: 'Visa / Mastercard', logo: '💳' },
    ]
  },
  {
    group: 'Gerai Retail',
    icon: <Store size={20} />,
    methods: [
      { id: 'alfamart', name: 'Alfamart', logo: '🏪' },
      { id: 'indomaret', name: 'Indomaret', logo: '🏪' },
    ]
  },
];

const formatRupiah = (num) => {
  if (num === 0) return 'Gratis';
  return 'Rp ' + num.toLocaleString('id-ID');
};

const provinces = [
  'DKI Jakarta', 'Jawa Barat', 'Jawa Tengah', 'Jawa Timur', 'Banten',
  'Bali', 'DI Yogyakarta', 'Sumatera Utara', 'Sumatera Barat', 'Sulawesi Selatan',
  'Kalimantan Timur', 'Kalimantan Selatan', 'Riau', 'Lampung', 'Papua'
];

const Checkout = () => {
  usePageTitle('Checkout', 'Kampus Alkitab');
  const navigate = useNavigate();
  const {
    cartItems, removeFromCart, updateQuantity, clearCart,
    cartSubtotal, cartTax, cartTotal, cartCount
  } = useCart();
  const { user } = useAuth();

  const [step, setStep] = useState(1);
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponDiscount, setCouponDiscount] = useState(0);

  // Shipping info
  const [shipping, setShipping] = useState({
    name: '', phone: '', address: '', city: '', province: '', postalCode: ''
  });
  const [shippingMethod, setShippingMethod] = useState('');
  const [selectedPayment, setSelectedPayment] = useState('');

  // Order confirmation
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState('');

  const hasPhysical = cartItems.some(i => i.isPhysical);
  const shippingCost = hasPhysical
    ? (SHIPPING_OPTIONS.find(s => s.id === shippingMethod)?.price || 0)
    : 0;

  const grandTotal = useMemo(() => {
    return cartTotal + shippingCost - couponDiscount;
  }, [cartTotal, shippingCost, couponDiscount]);

  const { showToast } = useCart();

  const handleCoupon = () => {
    if (!couponCode.trim()) {
      showToast('Masukkan kode kupon', 'error');
      return;
    }
    if (couponCode.toUpperCase() === 'BERKAT10') {
      const disc = Math.round(cartSubtotal * 0.1);
      setCouponDiscount(disc);
      setCouponApplied(true);
      showToast('Kupon berhasil diterapkan!', 'success');
    } else {
      setCouponApplied(false);
      setCouponDiscount(0);
      showToast('Kode kupon tidak valid', 'error');
    }
  };

  const canProceedStep2 = () => {
    if (!hasPhysical) return true;
    return shipping.name && shipping.phone && shipping.address &&
           shipping.city && shipping.province && shipping.postalCode && shippingMethod;
  };
  
  const handleNextStep2 = () => {
    if (!canProceedStep2()) {
      showToast('Mohon lengkapi alamat dan jasa pengiriman', 'error');
      return;
    }
    setStep(3);
  };

  const canProceedStep3 = () => selectedPayment !== '';

  const handlePlaceOrder = () => {
    if (!canProceedStep3()) {
      showToast('Mohon pilih metode pembayaran', 'error');
      return;
    }
    const id = 'KA-' + Date.now().toString(36).toUpperCase() + '-' + Math.random().toString(36).substr(2, 4).toUpperCase();
    setOrderId(id);
    setOrderComplete(true);
    setStep(4);
    showToast('Pemesanan berhasil dibuat!', 'success');
  };

  if (cartCount === 0 && !orderComplete) {
    return (
      <div className="checkout-page">
        <div className="checkout-empty">
          <ShoppingCart size={64} strokeWidth={1.5} />
          <h2>Keranjang Kosong</h2>
          <p>Belum ada item di keranjangmu. Cari sumber daya terbaik untuk pelayananmu!</p>
          <Link to="/toko" className="checkout-btn primary">
            Jelajahi Toko
          </Link>
        </div>
      </div>
    );
  }

  if (!user && !orderComplete) {
    return (
      <div className="checkout-page">
        <div className="checkout-empty">
          <ShieldCheck size={64} strokeWidth={1.5} color="#1a237e" />
          <h2>Login Dibutuhkan</h2>
          <p>Anda harus masuk atau mendaftar untuk menyelesaikan pemesanan dan mengakses kelas ini di dashboard nanti.</p>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', justifyContent: 'center' }}>
            <Link to="/login?redirect=/checkout" className="checkout-btn primary">
              Masuk Sekarang
            </Link>
            <Link to="/register?redirect=/checkout" className="checkout-btn ghost">
              Daftar Gratis
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      {/* Steps Header */}
      {!orderComplete && (
        <div className="checkout-steps-bar">
          <div className="checkout-steps-inner">
            {[
              { num: 1, label: 'Keranjang' },
              { num: 2, label: hasPhysical ? 'Pengiriman' : 'Pembayaran' },
              { num: 3, label: hasPhysical ? 'Pembayaran' : 'Konfirmasi' },
            ].filter((s, i) => hasPhysical || i < 3).map((s) => (
              <div key={s.num} className={`checkout-step ${step >= s.num ? 'active' : ''} ${step === s.num ? 'current' : ''}`}>
                <div className="checkout-step-num">{step > s.num ? <CheckCircle size={18} /> : s.num}</div>
                <span className="checkout-step-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="checkout-layout">
        {/* ── STEP 1: Cart Review ── */}
        {step === 1 && (
          <>
            <div className="checkout-main">
              <div className="checkout-section-header">
                <h2><ShoppingCart size={22} /> Keranjang Belanja</h2>
                <span className="checkout-item-count">{cartCount} item</span>
              </div>

              <div className="checkout-cart-list">
                {cartItems.map(item => (
                  <div key={item.id} className="checkout-cart-item">
                    <img src={item.image} alt={item.title} className="checkout-item-img" />
                    <div className="checkout-item-info">
                      <h4 className="checkout-item-title">{item.title}</h4>
                      <span className="checkout-item-type">
                        {item.isPhysical ? <Package size={13} /> : <Smartphone size={13} />}
                        {item.category} · {item.isPhysical ? 'Produk Fisik' : 'Digital'}
                      </span>
                    </div>
                    <div className="checkout-item-actions">
                      {item.isPhysical ? (
                        <div className="checkout-qty">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1}>
                            <Minus size={14} />
                          </button>
                          <span>{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                            <Plus size={14} />
                          </button>
                        </div>
                      ) : (
                        <span className="checkout-qty-label">1x</span>
                      )}
                    </div>
                    <div className="checkout-item-price">
                      <span className="checkout-price-main">{formatRupiah(item.numericPrice * item.quantity)}</span>
                      {item.oldPrice && <span className="checkout-price-old">{item.oldPrice}</span>}
                    </div>
                    <button className="checkout-item-remove" onClick={() => removeFromCart(item.id)}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>

              <div className="checkout-coupon-row">
                <Tag size={16} />
                <input
                  type="text"
                  placeholder='Kode kupon (coba: BERKAT10)'
                  value={couponCode}
                  onChange={e => setCouponCode(e.target.value)}
                  disabled={couponApplied}
                />
                {couponApplied ? (
                  <button className="checkout-coupon-btn applied" onClick={() => { setCouponApplied(false); setCouponDiscount(0); setCouponCode(''); }}>
                    <X size={14} /> Hapus
                  </button>
                ) : (
                  <button className="checkout-coupon-btn" onClick={handleCoupon}>Terapkan</button>
                )}
              </div>
              {couponApplied && (
                <div className="checkout-coupon-success">
                  <CheckCircle size={14} /> Kupon BERKAT10 berhasil diterapkan! Diskon 10%
                </div>
              )}
            </div>

            {/* Order Summary Sidebar */}
            <div className="checkout-sidebar">
              <div className="checkout-summary">
                <h3>Ringkasan Pesanan</h3>
                <div className="checkout-summary-row">
                  <span>Subtotal ({cartCount} item)</span>
                  <span>{formatRupiah(cartSubtotal)}</span>
                </div>
                <div className="checkout-summary-row">
                  <span>PPN (11%)</span>
                  <span>{formatRupiah(cartTax)}</span>
                </div>
                {couponDiscount > 0 && (
                  <div className="checkout-summary-row discount">
                    <span>Diskon Kupon</span>
                    <span>-{formatRupiah(couponDiscount)}</span>
                  </div>
                )}
                <div className="checkout-summary-divider" />
                <div className="checkout-summary-row total">
                  <span>Total</span>
                  <span>{formatRupiah(cartTotal - couponDiscount)}</span>
                </div>
                <button className="checkout-btn primary full" onClick={() => setStep(hasPhysical ? 2 : 3)}>
                  {hasPhysical ? 'Lanjut ke Pengiriman' : 'Lanjut ke Pembayaran'} <ChevronRight size={16} />
                </button>
                <Link to="/toko" className="checkout-btn ghost full">
                  <ArrowLeft size={16} /> Lanjut Belanja
                </Link>
              </div>

              <div className="checkout-trust">
                <div className="checkout-trust-item"><ShieldCheck size={16} /> Transaksi aman terenkripsi</div>
                <div className="checkout-trust-item"><Clock size={16} /> Garansi 7 hari uang kembali</div>
                <div className="checkout-trust-item"><Truck size={16} /> Pengiriman ke seluruh Indonesia</div>
              </div>
            </div>
          </>
        )}

        {/* ── STEP 2: Shipping ── */}
        {step === 2 && hasPhysical && (
          <>
            <div className="checkout-main">
              <div className="checkout-section-header">
                <h2><Truck size={22} /> Informasi Pengiriman</h2>
              </div>

              <div className="checkout-form-card">
                <h4><MapPin size={16} /> Alamat Pengiriman</h4>
                <div className="checkout-form-grid">
                  <div className="checkout-field">
                    <label>Nama Penerima</label>
                    <input type="text" placeholder="Nama lengkap" value={shipping.name}
                      onChange={e => setShipping(p => ({...p, name: e.target.value}))} />
                  </div>
                  <div className="checkout-field">
                    <label>No. Telepon</label>
                    <input type="tel" placeholder="08xxxxxxxxxx" value={shipping.phone}
                      onChange={e => setShipping(p => ({...p, phone: e.target.value}))} />
                  </div>
                  <div className="checkout-field full">
                    <label>Alamat Lengkap</label>
                    <textarea rows={3} placeholder="Jl. contoh No. 123, RT/RW, Kelurahan, Kecamatan" value={shipping.address}
                      onChange={e => setShipping(p => ({...p, address: e.target.value}))} />
                  </div>
                  <div className="checkout-field">
                    <label>Kota / Kabupaten</label>
                    <input type="text" placeholder="Jakarta Selatan" value={shipping.city}
                      onChange={e => setShipping(p => ({...p, city: e.target.value}))} />
                  </div>
                  <div className="checkout-field">
                    <label>Provinsi</label>
                    <select value={shipping.province} onChange={e => setShipping(p => ({...p, province: e.target.value}))}>
                      <option value="">Pilih provinsi</option>
                      {provinces.map(p => <option key={p} value={p}>{p}</option>)}
                    </select>
                  </div>
                  <div className="checkout-field">
                    <label>Kode Pos</label>
                    <input type="text" placeholder="12345" value={shipping.postalCode}
                      onChange={e => setShipping(p => ({...p, postalCode: e.target.value}))} />
                  </div>
                </div>
              </div>

              <div className="checkout-form-card">
                <h4><Truck size={16} /> Metode Pengiriman</h4>
                <div className="checkout-shipping-options">
                  {SHIPPING_OPTIONS.map(opt => (
                    <label key={opt.id} className={`checkout-shipping-opt ${shippingMethod === opt.id ? 'selected' : ''}`}>
                      <input type="radio" name="shipping" value={opt.id}
                        checked={shippingMethod === opt.id}
                        onChange={() => setShippingMethod(opt.id)} />
                      <div className="checkout-ship-info">
                        <span className="checkout-ship-name">{opt.name}</span>
                        <span className="checkout-ship-est">Estimasi: {opt.est}</span>
                      </div>
                      <span className="checkout-ship-price">{formatRupiah(opt.price)}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="checkout-sidebar">
              <div className="checkout-summary">
                <h3>Ringkasan Pesanan</h3>
                <div className="checkout-summary-row">
                  <span>Subtotal</span><span>{formatRupiah(cartSubtotal)}</span>
                </div>
                <div className="checkout-summary-row">
                  <span>PPN (11%)</span><span>{formatRupiah(cartTax)}</span>
                </div>
                {shippingCost > 0 && (
                  <div className="checkout-summary-row">
                    <span>Ongkos Kirim</span><span>{formatRupiah(shippingCost)}</span>
                  </div>
                )}
                {couponDiscount > 0 && (
                  <div className="checkout-summary-row discount">
                    <span>Diskon</span><span>-{formatRupiah(couponDiscount)}</span>
                  </div>
                )}
                <div className="checkout-summary-divider" />
                <div className="checkout-summary-row total">
                  <span>Total</span><span>{formatRupiah(grandTotal)}</span>
                </div>
                <button className="checkout-btn primary full" onClick={handleNextStep2}>
                  Lanjut ke Pembayaran <ChevronRight size={16} />
                </button>
                <button className="checkout-btn ghost full" onClick={() => setStep(1)}>
                  <ArrowLeft size={16} /> Kembali
                </button>
              </div>
            </div>
          </>
        )}

        {/* ── STEP 3: Payment ── */}
        {step === 3 && (
          <>
            <div className="checkout-main">
              <div className="checkout-section-header">
                <h2><CreditCard size={22} /> Metode Pembayaran</h2>
                <p className="checkout-section-subtitle">Pilih metode pembayaran yang tersedia — diproses via Midtrans</p>
              </div>

              <div className="checkout-payment-groups">
                {paymentMethods.map(group => (
                  <div key={group.group} className="checkout-payment-group">
                    <div className="checkout-payment-group-header">
                      {group.icon}
                      <h4>{group.group}</h4>
                    </div>
                    <div className="checkout-payment-methods">
                      {group.methods.map(m => (
                        <label key={m.id} className={`checkout-payment-opt ${selectedPayment === m.id ? 'selected' : ''}`}>
                          <input type="radio" name="payment" value={m.id}
                            checked={selectedPayment === m.id}
                            onChange={() => setSelectedPayment(m.id)} />
                          <span className="checkout-pay-logo">{m.logo}</span>
                          <span className="checkout-pay-name">{m.name}</span>
                          {selectedPayment === m.id && <CheckCircle size={18} className="checkout-pay-check" />}
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {selectedPayment === 'cc-visa' && (
                <div className="checkout-form-card cc-form">
                  <h4><CreditCard size={16} /> Detail Kartu</h4>
                  <div className="checkout-form-grid">
                    <div className="checkout-field full">
                      <label>Nomor Kartu</label>
                      <input type="text" placeholder="1234 5678 9012 3456" maxLength={19} />
                    </div>
                    <div className="checkout-field">
                      <label>Berlaku Hingga</label>
                      <input type="text" placeholder="MM/YY" maxLength={5} />
                    </div>
                    <div className="checkout-field">
                      <label>CVV</label>
                      <input type="password" placeholder="•••" maxLength={4} />
                    </div>
                    <div className="checkout-field full">
                      <label>Nama di Kartu</label>
                      <input type="text" placeholder="Nama sesuai kartu" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="checkout-sidebar">
              <div className="checkout-summary">
                <h3>Ringkasan Pesanan</h3>
                {cartItems.map(item => (
                  <div key={item.id} className="checkout-summary-item">
                    <img src={item.image} alt="" className="checkout-summary-thumb" />
                    <div>
                      <div className="checkout-summary-item-title">{item.title}</div>
                      <div className="checkout-summary-item-price">{item.quantity}x {formatRupiah(item.numericPrice)}</div>
                    </div>
                  </div>
                ))}
                <div className="checkout-summary-divider" />
                <div className="checkout-summary-row">
                  <span>Subtotal</span><span>{formatRupiah(cartSubtotal)}</span>
                </div>
                <div className="checkout-summary-row">
                  <span>PPN (11%)</span><span>{formatRupiah(cartTax)}</span>
                </div>
                {shippingCost > 0 && (
                  <div className="checkout-summary-row">
                    <span>Ongkos Kirim</span><span>{formatRupiah(shippingCost)}</span>
                  </div>
                )}
                {couponDiscount > 0 && (
                  <div className="checkout-summary-row discount">
                    <span>Diskon</span><span>-{formatRupiah(couponDiscount)}</span>
                  </div>
                )}
                <div className="checkout-summary-divider" />
                <div className="checkout-summary-row total">
                  <span>Total Bayar</span><span>{formatRupiah(grandTotal)}</span>
                </div>
                <button className="checkout-btn primary full" onClick={handlePlaceOrder} disabled={!canProceedStep3()}>
                  Bayar Sekarang <ShieldCheck size={16} />
                </button>
                <button className="checkout-btn ghost full" onClick={() => setStep(hasPhysical ? 2 : 1)}>
                  <ArrowLeft size={16} /> Kembali
                </button>
              </div>
            </div>
          </>
        )}

        {/* ── STEP 4: Confirmation ── */}
        {step === 4 && orderComplete && (
          <div className="checkout-confirmation">
            <div className="checkout-confirm-card">
              <div className="checkout-confirm-icon">
                <CheckCircle size={56} />
              </div>
              <h2>Pesanan Berhasil Dibuat!</h2>
              <p className="checkout-confirm-subtitle">Terima kasih atas pembelianmu. Segera selesaikan pembayaran.</p>

              <div className="checkout-order-id">
                <span>Nomor Pesanan:</span>
                <strong>{orderId}</strong>
                <button className="checkout-copy-btn" onClick={() => navigator.clipboard.writeText(orderId)} title="Salin">
                  <Copy size={14} />
                </button>
              </div>

              {/* Payment Instructions */}
              <div className="checkout-pay-instructions">
                {(selectedPayment.startsWith('bca') || selectedPayment.startsWith('bni') ||
                  selectedPayment.startsWith('bri') || selectedPayment.startsWith('mandiri')) && (
                  <div className="checkout-va-box">
                    <h4>Transfer ke Virtual Account</h4>
                    <div className="checkout-va-number">
                      <span className="checkout-va-bank">{selectedPayment.toUpperCase()}</span>
                      <span className="checkout-va-num">8801{Math.floor(Math.random() * 9000000000 + 1000000000)}</span>
                      <button className="checkout-copy-btn" onClick={() => navigator.clipboard.writeText('8801' + Math.floor(Math.random() * 9000000000 + 1000000000))}>
                        <Copy size={14} />
                      </button>
                    </div>
                    <div className="checkout-va-amount">
                      <span>Jumlah Transfer:</span>
                      <strong>{formatRupiah(grandTotal)}</strong>
                    </div>
                  </div>
                )}

                {selectedPayment === 'qris' && (
                  <div className="checkout-qris-box">
                    <h4>Scan QRIS untuk Membayar</h4>
                    <div className="checkout-qris-placeholder">
                      <QrCode size={120} strokeWidth={1} />
                      <p>Scan dengan aplikasi e-wallet atau mobile banking</p>
                    </div>
                    <div className="checkout-va-amount">
                      <span>Total:</span>
                      <strong>{formatRupiah(grandTotal)}</strong>
                    </div>
                  </div>
                )}

                {(selectedPayment === 'gopay' || selectedPayment === 'ovo' ||
                  selectedPayment === 'dana' || selectedPayment === 'shopeepay') && (
                  <div className="checkout-ewallet-box">
                    <h4>Pembayaran via {selectedPayment.charAt(0).toUpperCase() + selectedPayment.slice(1)}</h4>
                    <p>Anda akan diarahkan ke aplikasi {selectedPayment.toUpperCase()} untuk menyelesaikan pembayaran.</p>
                    <button className="checkout-btn primary">Buka Aplikasi {selectedPayment.toUpperCase()}</button>
                    <div className="checkout-va-amount" style={{ marginTop: '1rem' }}>
                      <span>Total:</span>
                      <strong>{formatRupiah(grandTotal)}</strong>
                    </div>
                  </div>
                )}

                {(selectedPayment === 'alfamart' || selectedPayment === 'indomaret') && (
                  <div className="checkout-retail-box">
                    <h4>Bayar di {selectedPayment === 'alfamart' ? 'Alfamart' : 'Indomaret'}</h4>
                    <div className="checkout-va-number">
                      <span className="checkout-va-bank">Kode Pembayaran</span>
                      <span className="checkout-va-num">{Math.floor(Math.random() * 900000000000 + 100000000000)}</span>
                      <button className="checkout-copy-btn"><Copy size={14} /></button>
                    </div>
                    <p>Tunjukkan kode ini ke kasir {selectedPayment === 'alfamart' ? 'Alfamart' : 'Indomaret'} terdekat.</p>
                    <div className="checkout-va-amount">
                      <span>Total Bayar:</span>
                      <strong>{formatRupiah(grandTotal)}</strong>
                    </div>
                  </div>
                )}

                {selectedPayment === 'cc-visa' && (
                  <div className="checkout-cc-success">
                    <CheckCircle size={24} color="#22c55e" />
                    <p>Pembayaran kartu kredit sedang diproses. Anda akan menerima konfirmasi via email.</p>
                    <div className="checkout-va-amount">
                      <span>Total Dibayar:</span>
                      <strong>{formatRupiah(grandTotal)}</strong>
                    </div>
                  </div>
                )}

                <div className="checkout-timer">
                  <Clock size={16} />
                  <span>Batas waktu pembayaran: <strong>24 jam</strong></span>
                </div>
              </div>

              <div className="checkout-confirm-actions">
                <Link to="/toko" className="checkout-btn primary" onClick={() => clearCart()}>
                  Lanjut Belanja
                </Link>
                <Link to="/" className="checkout-btn ghost">
                  Kembali ke Beranda
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;
