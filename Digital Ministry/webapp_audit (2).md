# 🔍 Audit Menyeluruh Kampus Alkitab — Production Readiness

Audit ini mencakup **17 halaman** yang telah diperiksa secara visual dan fungsional.

---

## Status Saat Ini: ★★★★☆ (4/5) — MVP Berkualitas Tinggi

Platform ini sudah sangat layak sebagai MVP (Minimum Viable Product) dengan UI premium. Berikut adalah daftar lengkap hal yang perlu **Ditambah**, **Dimodifikasi**, dan **Diperbaiki** untuk mencapai level **Production-Ready**.

---

## 🔴 PRIORITAS 1 — KRITIKAL (Wajib Sebelum Launch)

### 1. Proteksi Rute Member (Keamanan)
**Status**: ❌ Belum Ada
- `/dashboard`, `/course/:id`, `/community`, `/bible`, `/certifications` — **semua bisa diakses tanpa login**
- Siapa pun bisa mengetik URL langsung dan masuk ke area member

> [!CAUTION]
> **Tindakan**: Buat komponen `<ProtectedRoute>` yang mengecek status autentikasi. Pengunjung tanpa login otomatis dialihkan ke `/login`.

---

### 2. Sistem Autentikasi Nyata
**Status**: ❌ Mock (Demo)
- Login menerima **email & password apa saja** — tidak ada validasi server
- Tidak ada token JWT, session management, atau refresh token
- Status login hilang saat refresh halaman

> [!CAUTION]
> **Tindakan**: Integrasikan backend auth (Supabase Auth / Firebase Auth) dengan:
> - Email + password login/register nyata
> - Persistensi sesi (token di localStorage/cookie)
> - Alur "Lupa Password" (saat ini link "Lupa password?" di Login tidak berfungsi)

---

### 3. Backend & Database
**Status**: ❌ Semua Data Statis (Mock)
- 12 kelas, 18 produk toko, acara, renungan — **semua hardcoded** di file JSX
- Tidak ada API endpoint, tidak ada database
- Data wishlist & cart hanya tersimpan di localStorage (hilang jika clear cache)

> [!IMPORTANT]
> **Tindakan**: Migrasi ke Supabase/Firebase:
> - Tabel: `users`, `courses`, `products`, `orders`, `wishlist`, `devotionals`
> - REST API atau Realtime subscriptions

---

### 4. Payment Gateway
**Status**: ❌ Simulasi
- Checkout menampilkan UI pembayaran lengkap (BCA, GoPay, QRIS, dll) tapi **tidak terhubung ke gateway nyata**
- Nomor Virtual Account & QRIS adalah placeholder
- Order ID dibuat secara acak di frontend

> [!CAUTION]
> **Tindakan**: Integrasikan Midtrans / Xendit:
> - Server-side order creation
> - Webhook untuk konfirmasi pembayaran
> - Halaman status pembayaran real-time

---

## 🟡 PRIORITAS 2 — TINGGI (Penting untuk Kualitas Profesional)

### 5. Halaman Wishlist Khusus
**Status**: ⚠️ Parsial
- Ikon wishlist ♡ sudah ada di navbar dengan badge counter
- Tapi **tidak ada halaman `/wishlist`** untuk melihat daftar kelas yang disukai
- Klik ikon wishlist mengarah ke `/courses` (tidak ideal)

> **Tindakan**: Buat halaman `/wishlist` yang menampilkan grid kartu kelas yang sudah di-Like, dengan tombol "Hapus" dan "Daftar Kelas".

---

### 6. Halaman Detail Kelas
**Status**: ❌ Tidak Ada
- Dari Katalog Kelas, klik kartu langsung masuk ke **Course Player** (`/course/:id`)
- Tidak ada halaman detail (deskripsi lengkap, silabus, preview, review, harga) sebelum memutuskan mendaftar
- UX standar (Udemy, Coursera) selalu punya halaman detail terpisah

> **Tindakan**: Buat halaman `/courses/:id` (detail) yang berisi:
> - Deskripsi lengkap, silabus, instructor bio
> - Preview video gratis
> - Tombol "Daftar Kelas" / "Beli"
> - Review dari siswa lain

---

### 7. Halaman Detail Produk (Toko)
**Status**: ❌ Tidak Ada
- Kartu produk di Resource Store langsung "Tambah ke Keranjang" tanpa detail
- Pengguna tidak bisa melihat deskripsi, spesifikasi, atau ulasan produk
- Satu produk (Stiker Pack Rohani) menampilkan **alt text sebagai gambar** — gambar rusak

> **Tindakan**: 
> - Buat halaman `/toko/:id` untuk detail produk
> - Perbaiki gambar yang rusak pada produk "Stiker Pack Rohani"

---

### 8. Profil Pengguna & Pengaturan Akun
**Status**: ❌ Tidak Ada
- Setelah login, tidak ada halaman untuk:
  - Melihat/mengubah profil (nama, foto, bio)
  - Mengubah password
  - Melihat riwayat pesanan/pembayaran
  - Mengelola alamat pengiriman

> **Tindakan**: Buat halaman `/settings` atau `/profile` dengan tab:
> - Profil Saya, Keamanan, Alamat, Riwayat Pesanan

---

### 9. Footer Global
**Status**: ⚠️ Hanya di Landing Page
- Halaman publik (Courses, Store, Renungan, dll) melalui `PublicLayout` **tidak memiliki footer**
- Footer hanya ada di Landing Page
- Tidak ada link media sosial, kebijakan privasi, syarat layanan

> **Tindakan**: 
> - Tambahkan komponen `<Footer />` reusable di `PublicLayout`
> - Tambahkan halaman `/privacy` dan `/terms`

---

### 10. Mobile Menu — Dropdown Submenu
**Status**: ⚠️ Fungsional tapi UX kurang
- Menu hamburger sudah bekerja, tapi dropdown submenu menggunakan `:hover` yang **tidak berfungsi di layar sentuh**
- Pengguna mobile tidak bisa membuka submenu (Kelas → Teologi, dll)

> **Tindakan**: Ubah logika dropdown mobile dari CSS `:hover` ke **JavaScript click/tap toggle** dengan animasi accordion.

---

## 🟢 PRIORITAS 3 — SEDANG (Polish & Enhancement)

### 11. Loading States & Skeleton
**Status**: ❌ Tidak Ada
- Saat berpindah halaman atau memfilter kelas, tidak ada indikator loading
- Memberi kesan aplikasi "diam" atau "macet"

> **Tindakan**: Tambahkan Skeleton Loader / Shimmer untuk:
> - Grid kelas saat filtering
> - Halaman toko saat memuat produk
> - Dashboard saat load data user

---

### 12. Empty States yang Menarik
**Status**: ⚠️ Parsial
- Checkout kosong sudah ada ilustrasi ✓
- Tapi Wishlist kosong, hasil pencarian kosong di Store — hanya teks biasa

> **Tindakan**: Tambahkan ilustrasi SVG/Lottie untuk semua empty state agar lebih personal.

---

### 13. Breadcrumb Navigation
**Status**: ❌ Tidak Ada
- Di halaman dalam (Study Bible Club, New Life Camp, Course Player) tidak ada breadcrumb
- Pengguna kehilangan konteks posisi mereka

> **Tindakan**: Tambahkan breadcrumb: `Beranda > Acara > Study Bible Club`

---

### 14. SEO Meta Tags
**Status**: ⚠️ Hanya `<title>`
- Setiap halaman sudah punya `usePageTitle` ✓
- Tapi **tidak ada meta description, Open Graph tags, atau structured data**
- Halaman tidak akan muncul optimal di Google atau saat di-share ke WhatsApp/sosmed

> **Tindakan**: Implementasi `react-helmet-async` untuk:
> - Meta description per halaman
> - OG tags (title, image, description)
> - Canonical URL

---

### 15. Aksesibilitas (a11y)
**Status**: ⚠️ Kurang
- Beberapa tombol tidak memiliki `aria-label`
- Kontras warna pada beberapa teks abu-abu di atas putih mungkin kurang
- Navigasi keyboard (Tab order) belum diuji secara menyeluruh
- Focus ring tidak terlihat jelas pada tombol interaktif

> **Tindakan**: Audit aksesibilitas dengan Lighthouse dan perbaiki skor.

---

### 16. Error Boundary Global
**Status**: ❌ Tidak Ada
- Jika satu komponen crash (seperti bug `isInCart` tadi), **seluruh halaman putih**
- Tidak ada fallback UI yang ramah

> **Tindakan**: Buat `<ErrorBoundary>` component yang menampilkan pesan error ramah + tombol "Muat Ulang".

---

### 17. Internationalization & Konsistensi Bahasa
**Status**: ⚠️ Campuran
- Sebagian besar UI dalam Bahasa Indonesia ✓
- Tapi beberapa bagian masih dalam Bahasa Inggris:
  - Dashboard: "Jump back in", "Recommended for you", "Search for anything..."
  - Course Player: "Course content", "Overview", "Q&A", "Notes", "Learning tools"
  - Navbar member: "Catalog", "My Learning", "Bible Study", "Community"

> **Tindakan**: Terjemahkan semua label UI ke Bahasa Indonesia secara konsisten.

---

### 18. Optimasi Performa
**Status**: ⚠️ Belum Dioptimasi
- Semua gambar menggunakan URL Unsplash tanpa lazy loading
- Tidak ada code-splitting per route (semua komponen dimuat sekaligus)
- CSS files besar (Landing.css = 38KB, CoursePlayer.css = 35KB)

> **Tindakan**:
> - Tambahkan `loading="lazy"` pada semua `<img>`
> - Implementasi `React.lazy()` + `Suspense` untuk code splitting
> - Pertimbangkan CSS minification

---

### 19. Notifikasi & Lonceng 🔔
**Status**: ⚠️ UI Ada tapi Tidak Fungsional
- Di Dashboard/MainLayout ada ikon lonceng notifikasi
- Tapi **tidak ada sistem notifikasi** (tidak ada dropdown, tidak ada daftar notifikasi)

> **Tindakan**: Buat dropdown notifikasi sederhana: "Kelas baru tersedia", "Pembayaran berhasil", dll.

---

### 20. PWA (Progressive Web App)
**Status**: ❌ Tidak Ada
- Tidak ada `manifest.json`, service worker, atau offline support
- Pengguna tidak bisa "Install" app di HP

> **Tindakan**: Tambahkan PWA support dengan Vite PWA plugin agar bisa dipasang di home screen.

---

## 📊 Ringkasan per Halaman

| # | Halaman | Status | Catatan Kunci |
|---|---------|--------|---------------|
| 1 | Landing `/` | ✅ Baik | Store section & navbar lengkap |
| 2 | Courses `/courses` | ✅ Baik | Butuh halaman detail kelas |
| 3 | Certifications | ✅ Baik | Data statis, butuh backend |
| 4 | Renungan | ✅ Baik | Konten kaya, arsip berfungsi |
| 5 | Acara | ✅ Baik | 3 event dengan CTA |
| 6 | Study Bible Club | ✅ Baik | Landing webinar lengkap |
| 7 | New Life Camp | ✅ Baik | Landing promo dengan CTA |
| 8 | Tentang Kami | ✅ Baik | Doktrinal accordion berfungsi |
| 9 | MinistryHub | ✅ Baik | Volunteer board interaktif |
| 10 | Resource Store | ⚠️ Perlu Fix | 1 gambar produk rusak |
| 11 | Checkout | ✅ Baik | Validasi berfungsi, butuh gateway |
| 12 | Login | ✅ Baik | Butuh auth nyata |
| 13 | Register | ✅ Baik | Butuh auth nyata |
| 14 | Dashboard | ⚠️ Campur bahasa | Bahasa Inggris di beberapa label |
| 15 | Course Player | ✅ Sangat Baik | Udemy-style, lengkap |
| 16 | Community | ✅ Baik | Forum & filter berfungsi |
| 17 | Bible Study | ✅ Baik | Tool catatan & referensi |

---

## 🗺️ Urutan Eksekusi yang Disarankan

| Prioritas | Item | Estimasi |
|-----------|------|----------|
| 🔴 1 | Proteksi Rute Member | 30 menit |
| 🔴 2 | Konsistensi Bahasa (ID) | 45 menit |
| 🔴 3 | Fix gambar rusak di Store | 10 menit |
| 🟡 4 | Mobile submenu (JS toggle) | 40 menit |
| 🟡 5 | Footer global di PublicLayout | 30 menit |
| 🟡 6 | Halaman Wishlist `/wishlist` | 45 menit |
| 🟡 7 | Error Boundary global | 20 menit |
| 🟡 8 | Halaman Detail Kelas | 1 jam |
| 🟢 9 | Loading states / Skeleton | 40 menit |
| 🟢 10 | SEO Meta Tags | 30 menit |
| 🟢 11 | Lazy loading gambar | 20 menit |
| 🟢 12 | Breadcrumb navigation | 30 menit |
| ⬜ 13+ | Backend, Auth, Payment | Multi-sesi |
