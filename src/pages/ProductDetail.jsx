import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Star, ShoppingCart, Heart, Check, ChevronRight, Truck, Shield,
  Download, RefreshCw, Package, ArrowLeft, Minus, Plus, Share2
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import Breadcrumb from '../components/Breadcrumb';
import SEOHead from '../components/SEOHead';
import './ProductDetail.css';

/* ── Shared product catalog (same as ResourceStore) ── */
const allProducts = [
  { id: 'eb-1', title: 'Dasar-Dasar Iman Kristen', category: 'E-Book', type: 'digital', price: 'Gratis', numericPrice: 0, oldPrice: null, image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=800&h=1120', badge: 'Terlaris', rating: 4.9, sold: 2340, isPhysical: false, desc: 'Panduan lengkap memahami fondasi iman Kristen untuk pemula. Buku digital ini mencakup dasar-dasar teologi, sejarah kekristenan, dan penerapan iman dalam kehidupan sehari-hari.', specs: { format: 'PDF & ePub', pages: '156 halaman', language: 'Bahasa Indonesia', author: 'Tim Kampus Alkitab' } },
  { id: 'eb-2', title: 'Teologi Sistematika Modern', category: 'E-Book', type: 'digital', price: 'Rp 89.000', numericPrice: 89000, oldPrice: 'Rp 120.000', image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80&w=800&h=1120', badge: null, rating: 4.8, sold: 870, isPhysical: false, desc: 'Pembahasan mendalam doktrin Kristen dalam konteks modern. Dilengkapi studi kasus dan diskusi kelompok untuk pemahaman yang lebih kontekstual.', specs: { format: 'PDF & ePub', pages: '312 halaman', language: 'Bahasa Indonesia', author: 'Dr. Andreas Christanto' } },
  { id: 'eb-3', title: 'Kepemimpinan Berbasis Servanthood', category: 'E-Book', type: 'digital', price: 'Rp 75.000', numericPrice: 75000, oldPrice: null, image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&q=80&w=800&h=1120', badge: 'Baru', rating: 4.7, sold: 430, isPhysical: false, desc: 'Prinsip kepemimpinan Kristen untuk pelayanan gereja. Mengkaji model servant-leadership Yesus Kristus secara praktis.', specs: { format: 'PDF', pages: '198 halaman', language: 'Bahasa Indonesia', author: 'Pdt. Samuel Wirawan' } },
  { id: 'bk-1', title: 'Panduan Studi Alkitab Induktif', category: 'Buku', type: 'physical', price: 'Rp 45.000', numericPrice: 45000, oldPrice: 'Rp 65.000', image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=800&h=1120', badge: 'Diskon 30%', rating: 4.9, sold: 1560, isPhysical: true, desc: 'Buku cetak metode studi Alkitab induktif yang sistematis. Ideal untuk pribadi maupun kelompok kecil.', specs: { format: 'Softcover', pages: '224 halaman', weight: '280 gram', size: '15 × 21 cm' } },
  { id: 'bk-2', title: 'Ensiklopedia Alkitab Bergambar', category: 'Buku', type: 'physical', price: 'Rp 185.000', numericPrice: 185000, oldPrice: 'Rp 250.000', image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=800&h=1120', badge: 'Best Seller', rating: 4.9, sold: 3200, isPhysical: true, desc: 'Referensi lengkap dengan ilustrasi penuh warna untuk studi Alkitab. Cocok untuk keluarga dan sekolah minggu.', specs: { format: 'Hardcover', pages: '480 halaman', weight: '850 gram', size: '21 × 28 cm' } },
  { id: 'bk-3', title: 'Doa Harian: 365 Hari Bersama Tuhan', category: 'Buku', type: 'physical', price: 'Rp 65.000', numericPrice: 65000, oldPrice: null, image: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=800&h=1120', badge: 'Baru', rating: 4.8, sold: 780, isPhysical: true, desc: 'Buku panduan doa harian selama setahun penuh. Setiap hari dilengkapi ayat, refleksi, dan doa.', specs: { format: 'Softcover', pages: '400 halaman', weight: '450 gram', size: '14 × 20 cm' } },
  { id: 'ts-1', title: 'Kaos "Faith Over Fear"', category: 'Kaos', type: 'physical', price: 'Rp 120.000', numericPrice: 120000, oldPrice: 'Rp 150.000', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800&h=1120', badge: 'Populer', rating: 4.8, sold: 890, isPhysical: true, desc: 'Kaos premium cotton combed 30s dengan desain inspiratif. Nyaman dipakai sehari-hari.', specs: { material: 'Cotton Combed 30s', sizes: 'S, M, L, XL, XXL', weight: '200 gram', care: 'Cuci mesin, suhu rendah' } },
  { id: 'ts-2', title: 'Kaos "Blessed & Grateful"', category: 'Kaos', type: 'physical', price: 'Rp 120.000', numericPrice: 120000, oldPrice: null, image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=80&w=800&h=1120', badge: 'Baru', rating: 4.7, sold: 340, isPhysical: true, desc: 'Kaos unisex desain minimalis bertema syukur. Cocok untuk aktivitas praise & worship.', specs: { material: 'Cotton Combed 24s', sizes: 'S, M, L, XL', weight: '220 gram', care: 'Cuci mesin, suhu rendah' } },
  { id: 'ts-3', title: 'Kaos "Salt & Light"', category: 'Kaos', type: 'physical', price: 'Rp 135.000', numericPrice: 135000, oldPrice: null, image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&q=80&w=800&h=1120', badge: null, rating: 4.6, sold: 210, isPhysical: true, desc: 'Kaos premium Matius 5:13-14 design. Pernyataan iman yang stylish.', specs: { material: 'Cotton Combed 30s', sizes: 'S, M, L, XL, XXL', weight: '200 gram', care: 'Cuci mesin, suhu rendah' } },
  { id: 'mc-1', title: 'Mug "Grace Upon Grace"', category: 'Merchandise', type: 'physical', price: 'Rp 55.000', numericPrice: 55000, oldPrice: null, image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&q=80&w=800&h=1120', badge: null, rating: 4.6, sold: 620, isPhysical: true, desc: 'Mug keramik 350ml dengan desain kaligrafi ayat. Sempurna untuk menemani saat teduh pagi.', specs: { material: 'Keramik premium', capacity: '350 ml', weight: '320 gram', care: 'Microwave & dishwasher safe' } },
  { id: 'mc-2', title: 'Tote Bag "Walk by Faith"', category: 'Merchandise', type: 'physical', price: 'Rp 45.000', numericPrice: 45000, oldPrice: null, image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=800&h=1120', badge: 'Populer', rating: 4.7, sold: 1100, isPhysical: true, desc: 'Tote bag kanvas premium dengan sablon berkualitas tinggi. Bawa Alkitab dan perlengkapan ibadahmu dengan gaya.', specs: { material: 'Kanvas 12oz', size: '35 × 40 cm', weight: '180 gram', care: 'Cuci tangan' } },
  { id: 'mc-3', title: 'Stiker Pack Rohani (20 pcs)', category: 'Merchandise', type: 'physical', price: 'Rp 25.000', numericPrice: 25000, oldPrice: null, image: 'https://images.unsplash.com/photo-1572375992501-4b0892d50c69?auto=format&fit=crop&q=80&w=800&h=1120', badge: 'Terlaris', rating: 4.9, sold: 4500, isPhysical: true, desc: '20 stiker vinyl waterproof bertema iman Kristen. Cocok untuk laptop, botol minum, dan jurnal.', specs: { material: 'Vinyl waterproof', count: '20 lembar', size: '5–8 cm', durability: 'Tahan air & UV' } },
  { id: 'pc-1', title: 'Seri Apologetika Modern', category: 'Podcast', type: 'digital', price: 'Gratis', numericPrice: 0, oldPrice: null, image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&q=80&w=800&h=1120', badge: 'Gratis', rating: 4.8, sold: 5600, isPhysical: false, desc: '12 episode podcast membahas iman dan sains. Menjawab pertanyaan-pertanyaan sulit tentang iman Kristen.', specs: { format: 'MP3 / Streaming', episodes: '12 episode', duration: '8 jam total', host: 'Dr. William Kurniawan' } },
  { id: 'pc-2', title: 'Podcast: Pemuridan Digital', category: 'Podcast', type: 'digital', price: 'Rp 35.000', numericPrice: 35000, oldPrice: 'Rp 50.000', image: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&q=80&w=800&h=1120', badge: 'Diskon', rating: 4.7, sold: 1200, isPhysical: false, desc: 'Seri premium 8 episode tentang pemuridan era digital. Bagaimana teknologi bisa digunakan untuk Kerajaan Allah.', specs: { format: 'MP3 Download', episodes: '8 episode', duration: '5 jam total', host: 'Pdt. Daniel Manurung' } },
  { id: 'pc-3', title: 'Doa & Kehidupan Rohani', category: 'Podcast', type: 'digital', price: 'Gratis', numericPrice: 0, oldPrice: null, image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800&h=1120', badge: null, rating: 4.9, sold: 980, isPhysical: false, desc: 'Audio renungan dan doa untuk kehidupan sehari-hari. Dengarkan kapan saja untuk memperkuat kehidupan rohanimu.', specs: { format: 'MP3 / Streaming', episodes: '24 episode', duration: '12 jam total', host: 'Ibu Ruth Situmorang' } },
  { id: 'kr-1', title: 'Youth Ministry Leadership', category: 'Kursus', type: 'digital', price: 'Rp 150.000', numericPrice: 150000, oldPrice: 'Rp 250.000', image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=800&h=1120', badge: 'Best Seller', rating: 4.9, sold: 842, isPhysical: false, desc: 'Kursus lengkap memimpin pelayanan kaum muda. Diperlengkapi dengan studi kasus dan praktek lapangan.', specs: { format: 'Video online', modules: '8 modul', duration: '6 jam 15 menit', certificate: 'Ya' } },
  { id: 'kr-2', title: 'Christian Counseling Methods', category: 'Kursus', type: 'digital', price: 'Rp 200.000', numericPrice: 200000, oldPrice: 'Rp 350.000', image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=800&h=1120', badge: 'Advanced', rating: 4.7, sold: 560, isPhysical: false, desc: 'Metode konseling Kristen profesional. Dari teori hingga praktek pendampingan pastoral.', specs: { format: 'Video online', modules: '12 modul', duration: '8 jam', certificate: 'Ya' } },
  { id: 'kr-3', title: 'Worship Team Excellence', category: 'Kursus', type: 'digital', price: 'Gratis', numericPrice: 0, oldPrice: null, image: 'https://images.unsplash.com/photo-1508558936510-0af1e3cccbab?auto=format&fit=crop&q=80&w=800&h=1120', badge: 'Gratis', rating: 4.9, sold: 2100, isPhysical: false, desc: 'Perlengkapi tim ibadah gerejamu dengan keunggulan. Mencakup teknik vokal, instrumen, dan leadership worship.', specs: { format: 'Video online', modules: '6 modul', duration: '5 jam 45 menit', certificate: 'Ya' } },
];

/* ── Mock reviews ── */
const mockReviews = [
  { name: 'Yohanes Siregar', initial: 'YS', rating: 5, date: '1 minggu lalu', text: 'Produk berkualitas sangat baik! Pengiriman cepat dan packaging rapi. Sangat recommended untuk sesama pelayan Tuhan.' },
  { name: 'Maria Tan', initial: 'MT', rating: 5, date: '2 minggu lalu', text: 'Terima kasih Kampus Alkitab! Kualitasnya melampaui ekspektasi saya. Akan beli lagi untuk hadiah teman-teman di gereja.' },
  { name: 'Budi Prasetyo', initial: 'BP', rating: 4, date: '1 bulan lalu', text: 'Bagus secara keseluruhan. Desainnya menarik dan bermakna. Cocok untuk digunakan sehari-hari maupun acara gereja.' },
  { name: 'Sarah Wijaya', initial: 'SW', rating: 5, date: '1 bulan lalu', text: 'Saya membeli beberapa produk sekaligus dan semuanya memuaskan. Pelayanan customer service juga sangat ramah.' },
];

const ProductDetail = () => {
  const { id } = useParams();
  const product = allProducts.find(p => p.id === id);
  const { addToCart, cartItems } = useCart();

  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [wishlisted, setWishlisted] = useState(false);

  if (!product) {
    return (
      <div className="pd-page" style={{ textAlign: 'center', padding: '80px 20px' }}>
        <Package size={56} color="#cbd5e1" />
        <h2 style={{ marginTop: 16, color: '#1e293b' }}>Produk Tidak Ditemukan</h2>
        <p style={{ color: '#64748b' }}>Produk yang Anda cari tidak tersedia.</p>
        <Link to="/toko" style={{ color: '#1a237e', fontWeight: 600, marginTop: 12, display: 'inline-block' }}>← Kembali ke Toko</Link>
      </div>
    );
  }

  const isInCart = cartItems.some(i => i.id === product.id);
  const relatedProducts = allProducts.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  const discount = product.oldPrice ? Math.round((1 - product.numericPrice / parseInt(product.oldPrice.replace(/\D/g, ''))) * 100) : 0;

  const renderStars = (rating, size = 16) => (
    <div className="pd-stars">
      {[1, 2, 3, 4, 5].map(s => (
        <Star key={s} size={size} fill={s <= Math.round(rating) ? '#f59e0b' : 'transparent'} color={s <= Math.round(rating) ? '#f59e0b' : '#cbd5e1'} />
      ))}
    </div>
  );

  return (
    <div className="pd-page">
      <SEOHead
        title={`${product.title} — Toko Kampus Alkitab`}
        description={product.desc}
        image={product.image}
      />

      <div className="pd-breadcrumb-zone">
        <Breadcrumb items={[
          { label: 'Toko', to: '/toko' },
          { label: product.category },
          { label: product.title },
        ]} />
      </div>

      {/* Main content — image + info */}
      <div className="pd-main">
        <div className="pd-gallery">
          <div className="pd-img-wrapper">
            <img src={product.image} alt={product.title} className="pd-main-img" loading="lazy" />
            {product.badge && <span className="pd-badge">{product.badge}</span>}
          </div>
        </div>

        <div className="pd-info">
          <span className="pd-category-tag">{product.category} · {product.isPhysical ? 'Fisik' : 'Digital'}</span>
          <h1 className="pd-title">{product.title}</h1>

          <div className="pd-rating-row">
            {renderStars(product.rating, 18)}
            <span className="pd-rating-num">{product.rating}</span>
            <span className="pd-sold-count">({product.sold.toLocaleString()} terjual)</span>
          </div>

          <div className="pd-price-section">
            <span className="pd-price">{product.price}</span>
            {product.oldPrice && <span className="pd-old-price">{product.oldPrice}</span>}
            {discount > 0 && <span className="pd-discount-tag">-{discount}%</span>}
          </div>

          <p className="pd-desc">{product.desc}</p>

          {/* Quantity + CTA */}
          <div className="pd-actions">
            {product.numericPrice > 0 && (
              <div className="pd-qty">
                <button onClick={() => setQty(q => Math.max(1, q - 1))} aria-label="Kurangi jumlah"><Minus size={16} /></button>
                <span className="pd-qty-num">{qty}</span>
                <button onClick={() => setQty(q => q + 1)} aria-label="Tambah jumlah"><Plus size={16} /></button>
              </div>
            )}

            <button
              className={`pd-add-cart-btn ${isInCart ? 'in-cart' : ''}`}
              onClick={() => addToCart(product)}
              disabled={isInCart}
            >
              {isInCart ? (
                <><Check size={18} /> Di Keranjang</>
              ) : product.numericPrice === 0 ? (
                <><Download size={18} /> Unduh Gratis</>
              ) : (
                <><ShoppingCart size={18} /> Tambah ke Keranjang</>
              )}
            </button>

            <button
              className={`pd-wishlist-btn ${wishlisted ? 'active' : ''}`}
              onClick={() => setWishlisted(v => !v)}
              aria-label={wishlisted ? 'Hapus dari wishlist' : 'Tambah ke wishlist'}
            >
              <Heart size={20} fill={wishlisted ? '#ef4444' : 'none'} color={wishlisted ? '#ef4444' : '#64748b'} />
            </button>

            <button className="pd-share-btn" aria-label="Bagikan produk">
              <Share2 size={20} color="#64748b" />
            </button>
          </div>

          {/* Trust badges */}
          <div className="pd-trust-badges">
            {product.isPhysical ? (
              <>
                <div className="pd-trust-item"><Truck size={16} /> Pengiriman seluruh Indonesia</div>
                <div className="pd-trust-item"><RefreshCw size={16} /> Garansi 7 hari pengembalian</div>
                <div className="pd-trust-item"><Shield size={16} /> Pembayaran aman & terenkripsi</div>
              </>
            ) : (
              <>
                <div className="pd-trust-item"><Download size={16} /> Akses instan setelah pembayaran</div>
                <div className="pd-trust-item"><Shield size={16} /> Pembayaran aman & terenkripsi</div>
                <div className="pd-trust-item"><RefreshCw size={16} /> Akses selamanya</div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Tabs: Description, Specs, Reviews */}
      <div className="pd-tabs-section">
        <div className="pd-tabs-nav">
          {[
            { key: 'description', label: 'Deskripsi' },
            { key: 'specs', label: 'Spesifikasi' },
            { key: 'reviews', label: `Ulasan (${mockReviews.length})` },
          ].map(tab => (
            <button
              key={tab.key}
              className={`pd-tab-btn ${activeTab === tab.key ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'description' && (
          <div className="pd-tab-content">
            <p>{product.desc}</p>
            <p>
              Semua produk di Kampus Alkitab telah dikurasi dengan standar kualitas tinggi oleh tim kami. 
              Kami berkomitmen menyediakan sumber daya terbaik untuk mendukung pertumbuhan rohani dan 
              memperlengkapi pelayanan Anda.
            </p>
            {product.isPhysical && (
              <p>
                <strong>Pengiriman:</strong> Produk fisik akan dikirim dalam 1–3 hari kerja setelah pembayaran 
                dikonfirmasi. Estimasi tiba 3–7 hari kerja tergantung lokasi.
              </p>
            )}
          </div>
        )}

        {activeTab === 'specs' && (
          <div className="pd-tab-content">
            <table className="pd-specs-table">
              <tbody>
                {product.specs && Object.entries(product.specs).map(([key, value]) => (
                  <tr key={key}>
                    <td className="pd-spec-label">{key.charAt(0).toUpperCase() + key.slice(1)}</td>
                    <td className="pd-spec-value">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="pd-tab-content">
            <div className="pd-reviews-summary">
              <span className="pd-reviews-big">{product.rating}</span>
              <div>
                {renderStars(product.rating, 22)}
                <span className="pd-reviews-count">{product.sold.toLocaleString()} terjual · {mockReviews.length} ulasan</span>
              </div>
            </div>
            {mockReviews.map((review, i) => (
              <div key={i} className="pd-review-card">
                <div className="pd-review-header">
                  <div className="pd-review-avatar">{review.initial}</div>
                  <div>
                    <div className="pd-review-name">{review.name}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      {renderStars(review.rating, 12)}
                      <span className="pd-review-date">{review.date}</span>
                    </div>
                  </div>
                </div>
                <p className="pd-review-text">{review.text}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="pd-related">
          <h2 className="pd-related-title">Produk Terkait</h2>
          <div className="pd-related-grid">
            {relatedProducts.map(rp => (
              <Link to={`/toko/${rp.id}`} key={rp.id} className="pd-related-card">
                <img src={rp.image} alt={rp.title} loading="lazy" />
                <div className="pd-related-body">
                  <span className="pd-related-cat">{rp.category}</span>
                  <h4>{rp.title}</h4>
                  <div className="pd-related-meta">
                    <div className="pd-related-rating">
                      <Star size={12} fill="#f59e0b" color="#f59e0b" /> {rp.rating}
                    </div>
                    <span className="pd-related-price">{rp.price}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
