import { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  ShoppingCart, Search, SlidersHorizontal, BookOpen, Headphones,
  Shirt, Gift, GraduationCap, Smartphone, Star, Heart, Filter,
  ChevronRight, ArrowUpDown, X, Check, ShoppingBag
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import usePageTitle from '../hooks/usePageTitle';
import './ResourceStore.css';

/* ── Product Catalog ── */
const allProducts = [
  // E-Books
  {
    id: 'eb-1', title: 'Dasar-Dasar Iman Kristen', category: 'E-Book', type: 'digital',
    price: 'Gratis', numericPrice: 0, oldPrice: null,
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=400&h=560',
    badge: 'Terlaris', isNew: false, rating: 4.9, sold: 2340, isPhysical: false,
    desc: 'Panduan lengkap memahami fondasi iman Kristen untuk pemula.',
  },
  {
    id: 'eb-2', title: 'Teologi Sistematika Modern', category: 'E-Book', type: 'digital',
    price: 'Rp 89.000', numericPrice: 89000, oldPrice: 'Rp 120.000',
    image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80&w=400&h=560',
    badge: null, isNew: true, rating: 4.8, sold: 870, isPhysical: false,
    desc: 'Pembahasan mendalam doktrin Kristen dalam konteks modern.',
  },
  {
    id: 'eb-3', title: 'Kepemimpinan Berbasis Servanthood', category: 'E-Book', type: 'digital',
    price: 'Rp 75.000', numericPrice: 75000, oldPrice: null,
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&q=80&w=400&h=560',
    badge: 'Baru', isNew: true, rating: 4.7, sold: 430, isPhysical: false,
    desc: 'Prinsip kepemimpinan Kristen untuk pelayanan gereja.',
  },
  // Buku Cetak
  {
    id: 'bk-1', title: 'Panduan Studi Alkitab Induktif', category: 'Buku', type: 'physical',
    price: 'Rp 45.000', numericPrice: 45000, oldPrice: 'Rp 65.000',
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=400&h=560',
    badge: 'Diskon 30%', isNew: false, rating: 4.9, sold: 1560, isPhysical: true,
    desc: 'Buku cetak metode studi Alkitab induktif yang sistematis.',
  },
  {
    id: 'bk-2', title: 'Ensiklopedia Alkitab Bergambar', category: 'Buku', type: 'physical',
    price: 'Rp 185.000', numericPrice: 185000, oldPrice: 'Rp 250.000',
    image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=400&h=560',
    badge: 'Best Seller', isNew: false, rating: 4.9, sold: 3200, isPhysical: true,
    desc: 'Referensi lengkap dengan ilustrasi penuh warna untuk studi Alkitab.',
  },
  {
    id: 'bk-3', title: 'Doa Harian: 365 Hari Bersama Tuhan', category: 'Buku', type: 'physical',
    price: 'Rp 65.000', numericPrice: 65000, oldPrice: null,
    image: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=400&h=560',
    badge: 'Baru', isNew: true, rating: 4.8, sold: 780, isPhysical: true,
    desc: 'Buku panduan doa harian selama setahun penuh.',
  },
  // Kaos / T-Shirt
  {
    id: 'ts-1', title: 'Kaos "Faith Over Fear"', category: 'Kaos', type: 'physical',
    price: 'Rp 120.000', numericPrice: 120000, oldPrice: 'Rp 150.000',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=400&h=560',
    badge: 'Populer', isNew: false, rating: 4.8, sold: 890, isPhysical: true,
    desc: 'Kaos premium cotton combed 30s dengan desain inspiratif.',
  },
  {
    id: 'ts-2', title: 'Kaos "Blessed & Grateful"', category: 'Kaos', type: 'physical',
    price: 'Rp 120.000', numericPrice: 120000, oldPrice: null,
    image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=80&w=400&h=560',
    badge: 'Baru', isNew: true, rating: 4.7, sold: 340, isPhysical: true,
    desc: 'Kaos unisex desain minimalis bertema syukur.',
  },
  {
    id: 'ts-3', title: 'Kaos "Salt & Light"', category: 'Kaos', type: 'physical',
    price: 'Rp 135.000', numericPrice: 135000, oldPrice: null,
    image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&q=80&w=400&h=560',
    badge: null, isNew: true, rating: 4.6, sold: 210, isPhysical: true,
    desc: 'Kaos premium Matius 5:13-14 design.',
  },
  // Merchandise
  {
    id: 'mc-1', title: 'Mug "Grace Upon Grace"', category: 'Merchandise', type: 'physical',
    price: 'Rp 55.000', numericPrice: 55000, oldPrice: null,
    image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&q=80&w=400&h=560',
    badge: null, isNew: false, rating: 4.6, sold: 620, isPhysical: true,
    desc: 'Mug keramik 350ml dengan desain kaligrafi ayat.',
  },
  {
    id: 'mc-2', title: 'Tote Bag "Walk by Faith"', category: 'Merchandise', type: 'physical',
    price: 'Rp 45.000', numericPrice: 45000, oldPrice: null,
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=400&h=560',
    badge: 'Populer', isNew: false, rating: 4.7, sold: 1100, isPhysical: true,
    desc: 'Tote bag kanvas premium dengan sablon berkualitas tinggi.',
  },
  {
    id: 'mc-3', title: 'Stiker Pack Rohani (20 pcs)', category: 'Merchandise', type: 'physical',
    price: 'Rp 25.000', numericPrice: 25000, oldPrice: null,
    image: 'https://images.unsplash.com/photo-1572375992501-4b0892d50c69?auto=format&fit=crop&q=80&w=400&h=560',
    badge: 'Terlaris', isNew: false, rating: 4.9, sold: 4500, isPhysical: true,
    desc: '20 stiker vinyl waterproof bertema iman Kristen.',
  },
  // Podcast
  {
    id: 'pc-1', title: 'Seri Apologetika Modern', category: 'Podcast', type: 'digital',
    price: 'Gratis', numericPrice: 0, oldPrice: null,
    image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&q=80&w=400&h=560',
    badge: 'Gratis', isNew: false, rating: 4.8, sold: 5600, isPhysical: false,
    desc: '12 episode podcast membahas iman dan sains.',
  },
  {
    id: 'pc-2', title: 'Podcast: Pemuridan Digital', category: 'Podcast', type: 'digital',
    price: 'Rp 35.000', numericPrice: 35000, oldPrice: 'Rp 50.000',
    image: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&q=80&w=400&h=560',
    badge: 'Diskon', isNew: false, rating: 4.7, sold: 1200, isPhysical: false,
    desc: 'Seri premium 8 episode tentang pemuridan era digital.',
  },
  {
    id: 'pc-3', title: 'Doa & Kehidupan Rohani', category: 'Podcast', type: 'digital',
    price: 'Gratis', numericPrice: 0, oldPrice: null,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400&h=560',
    badge: null, isNew: true, rating: 4.9, sold: 980, isPhysical: false,
    desc: 'Audio renungan dan doa untuk kehidupan sehari-hari.',
  },
  // Kursus
  {
    id: 'kr-1', title: 'Youth Ministry Leadership', category: 'Kursus', type: 'digital',
    price: 'Rp 150.000', numericPrice: 150000, oldPrice: 'Rp 250.000',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=400&h=560',
    badge: 'Best Seller', isNew: false, rating: 4.9, sold: 842, isPhysical: false,
    desc: 'Kursus lengkap memimpin pelayanan kaum muda.',
  },
  {
    id: 'kr-2', title: 'Christian Counseling Methods', category: 'Kursus', type: 'digital',
    price: 'Rp 200.000', numericPrice: 200000, oldPrice: 'Rp 350.000',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=400&h=560',
    badge: 'Advanced', isNew: false, rating: 4.7, sold: 560, isPhysical: false,
    desc: 'Metode konseling Kristen profesional.',
  },
  {
    id: 'kr-3', title: 'Worship Team Excellence', category: 'Kursus', type: 'digital',
    price: 'Gratis', numericPrice: 0, oldPrice: null,
    image: 'https://images.unsplash.com/photo-1508558936510-0af1e3cccbab?auto=format&fit=crop&q=80&w=400&h=560',
    badge: 'Gratis', isNew: false, rating: 4.9, sold: 2100, isPhysical: false,
    desc: 'Perlengkapi tim ibadah gerejamu dengan keunggulan.',
  },
];

const categories = [
  { key: 'Semua', icon: <ShoppingBag size={16} />, label: 'Semua Produk' },
  { key: 'E-Book', icon: <Smartphone size={16} />, label: 'E-Book' },
  { key: 'Buku', icon: <BookOpen size={16} />, label: 'Buku Cetak' },
  { key: 'Kaos', icon: <Shirt size={16} />, label: 'Kaos' },
  { key: 'Merchandise', icon: <Gift size={16} />, label: 'Merchandise' },
  { key: 'Podcast', icon: <Headphones size={16} />, label: 'Podcast' },
  { key: 'Kelas', icon: <GraduationCap size={16} />, label: 'Kelas' },
];

const sortOptions = [
  { key: 'popular', label: 'Terpopuler' },
  { key: 'newest', label: 'Terbaru' },
  { key: 'price-low', label: 'Harga: Rendah → Tinggi' },
  { key: 'price-high', label: 'Harga: Tinggi → Rendah' },
  { key: 'rating', label: 'Rating Tertinggi' },
];

const formatRupiah = (num) => {
  if (num === 0) return 'Gratis';
  return 'Rp ' + num.toLocaleString('id-ID');
};

const ResourceStore = () => {
  usePageTitle('Toko Sumber Daya', 'Kampus Alkitab');
  const { addToCart, cartItems } = useCart();

  const [searchParams, setSearchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popular');
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const ITEMS_PER_PAGE = 9;
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [wishlist, setWishlist] = useState([]);

  const toggleWishlist = (id) => {
    setWishlist(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const filteredProducts = useMemo(() => {
    let list = [...allProducts];

    // Category filter
    if (activeCategory !== 'Semua') {
      list = list.filter(p => p.category === activeCategory);
    }

    // Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.desc.toLowerCase().includes(q)
      );
    }

    // Sort
    switch (sortBy) {
      case 'popular': list.sort((a, b) => b.sold - a.sold); break;
      case 'newest': list.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)); break;
      case 'price-low': list.sort((a, b) => a.numericPrice - b.numericPrice); break;
      case 'price-high': list.sort((a, b) => b.numericPrice - a.numericPrice); break;
      case 'rating': list.sort((a, b) => b.rating - a.rating); break;
    }

    return list;
  }, [activeCategory, searchQuery, sortBy]);

  const isInCart = (id) => cartItems.some(i => i.id === id);

  const handleAddToCart = (product) => {
    if (product.numericPrice === 0) {
      // Free items — simulate "download"
      addToCart(product);
      return;
    }
    addToCart(product);
  };

  return (
    <div className="store-page">
      {/* Hero Banner */}
      <section className="store-hero">
        <div className="store-hero-bg" />
        <div className="store-hero-overlay" />
        <div className="store-hero-content">
          <div className="store-hero-badge">
            <ShoppingBag size={14} /> Toko Kampus Alkitab
          </div>
          <h1 className="store-hero-title">
            Sumber Daya untuk <span className="store-accent">Pertumbuhan Rohani</span>
          </h1>
          <p className="store-hero-desc">
            E-Book, buku cetak, kaos, merchandise, podcast premium, dan kelas — semua untuk memperlengkapi pelayananmu.
          </p>
        </div>
      </section>

      {/* Toolbar */}
      <section className="store-toolbar">
        <div className="store-toolbar-inner">
          {/* Categories */}
          <div className="store-categories">
            {categories.map(cat => (
              <button
                key={cat.key}
                className={`store-cat-btn ${activeCategory === cat.key ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat.key)}
              >
                {cat.icon} {cat.label}
              </button>
            ))}
          </div>

          {/* Search + Sort */}
          <div className="store-controls">
            <div className="store-search">
              <Search size={18} className="store-search-icon" />
              <input
                type="text"
                placeholder="Cari produk..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button className="store-search-clear" onClick={() => setSearchQuery('')}>
                  <X size={14} />
                </button>
              )}
            </div>

            <div className="store-sort-wrap">
              <button className="store-sort-btn" onClick={() => setShowSortMenu(!showSortMenu)}>
                <ArrowUpDown size={15} />
                {sortOptions.find(s => s.key === sortBy)?.label}
              </button>
              {showSortMenu && (
                <div className="store-sort-menu">
                  {sortOptions.map(opt => (
                    <button
                      key={opt.key}
                      className={`store-sort-option ${sortBy === opt.key ? 'active' : ''}`}
                      onClick={() => { setSortBy(opt.key); setShowSortMenu(false); }}
                    >
                      {opt.label}
                      {sortBy === opt.key && <Check size={14} />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Results Count */}
      <section className="store-results-bar">
        <div className="store-results-inner">
          <span className="store-results-count">
            Menampilkan <strong>{Math.min(ITEMS_PER_PAGE, filteredProducts.length - (currentPage - 1) * ITEMS_PER_PAGE)}</strong> dari <strong>{filteredProducts.length}</strong> produk
            {activeCategory !== 'Semua' && <> dalam <strong>{activeCategory}</strong></>}
          </span>
        </div>
      </section>

      {/* Product Grid */}
      <section className="store-grid-section">
        <div className="store-grid-inner">
          {filteredProducts.length === 0 ? (
            <div className="store-empty">
              <Search size={48} />
              <h3>Tidak ada produk ditemukan</h3>
              <p>Coba ubah kata kunci atau kategori pencarian.</p>
            </div>
          ) : (
            <>
            <div className="store-grid">
              {filteredProducts.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE).map(product => (
                <Link to={`/toko/${product.id}`} key={product.id} className="store-card" style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div className="store-card-img-wrap">
                    <img src={product.image} alt={product.title} className="store-card-img" loading="lazy" />
                    {product.badge && (
                      <span className={`store-card-badge ${product.numericPrice === 0 ? 'free' : ''}`}>
                        {product.badge}
                      </span>
                    )}
                    <button
                      className={`store-card-wishlist ${wishlist.includes(product.id) ? 'active' : ''}`}
                      onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleWishlist(product.id); }}
                      aria-label="Wishlist"
                    >
                      <Heart size={16} fill={wishlist.includes(product.id) ? '#ef4444' : 'none'} />
                    </button>
                    <div className="store-card-type-pill">{product.category}</div>
                  </div>
                  <div className="store-card-body">
                    <h3 className="store-card-title">{product.title}</h3>
                    <p className="store-card-desc">{product.desc}</p>
                    <div className="store-card-meta">
                      <div className="store-card-rating">
                        <Star size={13} fill="#f59e0b" color="#f59e0b" />
                        <span>{product.rating}</span>
                      </div>
                      <span className="store-card-sold">{product.sold.toLocaleString()} terjual</span>
                    </div>
                    <div className="store-card-price-row">
                      <span className="store-card-price">{product.price}</span>
                      {product.oldPrice && <span className="store-card-old-price">{product.oldPrice}</span>}
                    </div>
                    <button
                      className={`store-card-cart-btn ${isInCart(product.id) ? 'in-cart' : ''}`}
                      onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleAddToCart(product); }}
                      disabled={isInCart(product.id)}
                    >
                      {isInCart(product.id) ? (
                        <><Check size={16} /> Di Keranjang</>
                      ) : product.numericPrice === 0 ? (
                        <><ShoppingCart size={16} /> Unduh Gratis</>
                      ) : (
                        <><ShoppingCart size={16} /> Tambah ke Keranjang</>
                      )}
                    </button>
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            {filteredProducts.length > ITEMS_PER_PAGE && (
              <div className="store-pagination">
                {Array.from({ length: Math.ceil(filteredProducts.length / ITEMS_PER_PAGE) }).map((_, i) => (
                  <button
                    key={i}
                    className={`store-page-btn ${currentPage === i + 1 ? 'active' : ''}`}
                    onClick={() => { setSearchParams(prev => { prev.set('page', String(i + 1)); return prev; }); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            )}
            </>
          )}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="store-bottom-cta">
        <div className="store-bottom-inner">
          <h2>Butuh bantuan memilih?</h2>
          <p>Tim kami siap membantu menemukan sumber daya yang tepat untuk pelayananmu.</p>
          <div className="store-bottom-actions">
            <Link to="/checkout" className="store-cta-btn primary">
              <ShoppingCart size={18} /> Lihat Keranjang
            </Link>
            <a href="mailto:support@kampusalkitab.id" className="store-cta-btn ghost">
              Hubungi Kami
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ResourceStore;
