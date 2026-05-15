# Audit Menyeluruh Kampus Alkitab Web App

Jika platform **Kampus Alkitab** ini bersiap untuk *go-live* (dijadikan *production-ready web application*), UI/UX yang kita bangun sudah berada di fase *high-fidelity* (sangat baik untuk prototipe/demo). Namun, di balik layar dan secara fungsionalitas menyeluruh, masih ada celah kompetensi sistem yang harus ditutup.

Berikut adalah daftar detail hal-hal yang **perlu ditambah, dimodifikasi, dan diperbaiki** untuk mencapai kesempurnaan setara platform global (seperti Udemy / Ruangguru):

---

## 1. Arsitektur Data & Backend (Kelemahan Terbesar Saat Ini)
Saat ini, seluruh informasi kursus, testimonial, jadwal acara, dan produk toko menggunakan **Mock Data (Data Palsu/Statis)** yang diketik manual di dalam file React.
- **Dibutuhkan**: Pembuatan *Backend Server* (Node.js/Go/Python) dan Database (PostgreSQL/MongoDB) atau BaaS (Supabase/Firebase).
- **Integrasi API**: Mengganti semua data statis dengan API Calls (`fetch` atau `axios`).
- **Loading State**: Menambahkan indikator *loading* (Skeleton Loaders) ketika data sedang diambil dari server untuk transisi yang mulus.

## 2. Manajemen State (Kondisi Aplikasi)
- **Wishlist & Progress Belajar Meleset**: Ikon *wishlist* yang baru kita buat di `Courses.jsx` hanya tersimpan di dalam halaman itu. Jika pengguna me-refresh halaman atau pindah ke beranda, daftarnya hilang.
- **Perbaikan**: Mengimplementasikan `WishlistContext` tersendiri dan menyimpannya di `localStorage` (untuk tamu) serta Database (untuk member).
- **Memory Progress**: `CoursePlayer` harus bisa mengingat detik ke-berapa pengguna mematikan video (melacak retensi).

## 3. Sistem Pembayaran Nyata (Payment Gateway)
- **Modifikasi Checkout**: Alur Checkout kita saat ini sangat rapi secara visual, tetapi tidak dapat memproses uang nyata.
- **Dibutuhkan**: Integrasi langsung dengan *Payment Gateway* lokal seperti **Midtrans**, **Xendit**, atau **Xfers**. Ini penting untuk mengeluarkan Virtual Account, QRIS (harus di-generate *real-time*), dan Kartu Kredit secara aman.

## 4. Keamanan & Autentikasi Pengguna
- **Pembatasan Rute Transparan**: Halaman Member (`Dashboard`, `Community`, `Player`) dibiarkan terbuka saat ini.
- **Skema Autentikasi**: Dibutuhkan logika `<ProtectedRoute>` menggunakan JWT (*JSON Web Tokens*) untuk memastikan pengguna yang tidak berkepentingan tidak mengakses video berbayar atau ruang privasi.
- **Halaman Profil / Pengaturan**: Belum ada halaman agar pengguna bisa mengganti kata sandi, memperbarui foto profil, atau melihat **Riwayat Transaksi** toko mereka.

## 5. Performa & SEO (Search Engine Optimization)
- **Kelemahan SPA (*Single Page Application*)**: Karena dibangun dengan React biasa (Vite), *crawler* mesin pencari Google melihat halaman ini kosong. Ini buruk jika kita ingin muncul di halaman 1 pencarian "Sertifikasi Theologi Indonesia".
- **Modifikasi**: Jika perlu, migrasi framework ke **Next.js** untuk SSR (*Server-Side Rendering*) atau menambahkan `react-helmet` untuk mengisi tag meta (*title, description, open-graph image* untuk WhatsApp share preview).
- **Optimasi Gambar**: Saat ini memuat gambar beresolusi tinggi langsung dari *Unsplash*. Di web asli, gunakan CDN (seperti Cloudinary) atau otomatis di-compress ke format *WebP/AVIF* dengan `loading="lazy"` agar website tidak berat.

## 6. Kekurangan UI/UX Spesifik (Halaman ke Halaman)
1. **Fungsi Kolom Pencarian**: Bar pencarian di navigasi utama masih sekadar pajangan. Perlu logika pencarian global yang dapat mencari kelas, buku, dan renungan secara bersamaan (misal menggunakan *Algolia Search*).
2. **Mobile Navigasi (Hamburger Menu)**: Navigasi utama kita memiliki 7 link penuh. Di layar HP, itu akan berantakan. Dibutuhkan desain *Drawer/Off-canvas* khusus menu seluler.
3. **Filter Kelas (Courses.jsx)**: Parameter URL/Filter hanya beroperasi secara visual, belum tentu kompatibel dengan pembagian sistem penomoran halaman (Pagination / Infinite Scroll) yang dibutuhkan bila kelak ada 50+ kelas.
4. **Community & Forum**: Layar komunikasi dan tanya jawab di `CoursePlayer` dan `Community` masih pasif. Dibutuhkan implementasi Websockets (misal: Socket.io) untuk live-chat dan notifikasi *real-time* tanpa perlu me-refresh laman.

## 7. Validasi & Penanganan Eror (Error Handling)
- Formulir "Kirim Permintaan Doa" di Landing Page dan "Informasi Pengiriman" di Checkout akan menerima asal input (meskipun salah format email).
- **Perbaikan**: Menggunakan validasi ketat dan aman (*Zod / Yup*) yang terintegrasi dengan modul pop-up peringatan (*Toast Notifications*) merah jika gagal, alih-alih peringatan *alert()* *browser* bawaan.

---

### Tinjauan Kesimpulan
Secara tampilan, ** Kampus Alkitab adalah UI Web 9.5/10**. Sangat mutakhir, estetis, interaktif, dan modern setara startup edutech topologi tinggi. Namun, sebagai "mesin", ini baru berupa "Korsase Casing Mobil Sport" yang komponen kelistrikan dan mesin di bawah kapnya (Backend, Gateway, Storage, Server) perlu benar-benar dipasang agar mobilnya bisa melesat di aspal nyata!
