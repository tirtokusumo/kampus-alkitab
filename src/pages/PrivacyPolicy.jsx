import { Shield, Calendar } from 'lucide-react';
import Breadcrumb from '../components/Breadcrumb';
import SEOHead from '../components/SEOHead';
import './LegalPage.css';

const PrivacyPolicy = () => {
  return (
    <div className="legal-page">
      <SEOHead
        title="Kebijakan Privasi"
        description="Kebijakan privasi Kampus Alkitab — bagaimana kami mengumpulkan, menggunakan, dan melindungi data pribadi Anda."
      />

      <Breadcrumb items={[{ label: 'Kebijakan Privasi' }]} />

      <div className="legal-header">
        <div className="legal-icon"><Shield size={28} /></div>
        <h1>Kebijakan Privasi</h1>
        <p>Privasi Anda adalah prioritas kami. Dokumen ini menjelaskan bagaimana Kampus Alkitab mengumpulkan, menggunakan, dan melindungi informasi pribadi Anda.</p>
        <div className="legal-updated">
          <Calendar size={14} /> Terakhir diperbarui: 1 April 2026
        </div>
      </div>

      <div className="legal-section">
        <h2>1. Informasi yang Kami Kumpulkan</h2>
        <p>Kami mengumpulkan informasi yang Anda berikan secara langsung saat:</p>
        <ul>
          <li>Mendaftar akun di Kampus Alkitab (nama, email, nomor telepon)</li>
          <li>Mengisi profil pengguna (foto, bio, nama gereja, kota)</li>
          <li>Melakukan pembelian di Toko Sumber Daya (alamat pengiriman, informasi pembayaran)</li>
          <li>Berpartisipasi dalam forum komunitas dan diskusi</li>
          <li>Menghubungi tim dukungan kami</li>
        </ul>
        <h3>Informasi Otomatis</h3>
        <p>Kami juga mengumpulkan informasi secara otomatis, termasuk alamat IP, tipe perangkat, browser, halaman yang dikunjungi, dan durasi kunjungan untuk meningkatkan pengalaman pengguna.</p>
      </div>

      <div className="legal-section">
        <h2>2. Penggunaan Informasi</h2>
        <p>Informasi yang kami kumpulkan digunakan untuk:</p>
        <ul>
          <li>Menyediakan dan mengelola akun Anda di platform Kampus Alkitab</li>
          <li>Memproses transaksi dan pengiriman produk</li>
          <li>Mengirimkan notifikasi terkait kelas, acara, dan pembaruan platform</li>
          <li>Meningkatkan kualitas konten dan fitur platform</li>
          <li>Menerbitkan sertifikat kelulusan kelas</li>
          <li>Menjaga keamanan platform dan mencegah penyalahgunaan</li>
        </ul>
      </div>

      <div className="legal-section">
        <h2>3. Penyimpanan & Keamanan Data</h2>
        <p>
          Data Anda disimpan pada server terenkripsi yang dikelola oleh penyedia layanan cloud bersertifikasi.
          Kami menerapkan langkah-langkah keamanan industri standar termasuk enkripsi SSL/TLS, hashing kata sandi,
          dan kontrol akses ketat untuk melindungi informasi pribadi Anda.
        </p>
        <p>
          Kami menyimpan data pribadi Anda selama akun Anda aktif atau selama diperlukan untuk menyediakan
          layanan. Anda dapat meminta penghapusan akun kapan saja.
        </p>
      </div>

      <div className="legal-section">
        <h2>4. Cookie & Teknologi Pelacakan</h2>
        <p>
          Kampus Alkitab menggunakan cookie dan teknologi serupa untuk menyimpan preferensi login,
          mengingat pengaturan bahasa, dan menganalisis penggunaan platform. Anda dapat mengatur browser
          untuk menolak cookie, namun beberapa fitur mungkin tidak berfungsi optimal.
        </p>
      </div>

      <div className="legal-section">
        <h2>5. Berbagi Informasi dengan Pihak Ketiga</h2>
        <p>Kami <strong>tidak menjual</strong> data pribadi Anda kepada pihak ketiga. Informasi hanya dibagikan kepada:</p>
        <ul>
          <li><strong>Penyedia layanan pembayaran</strong> (Midtrans/Xendit) untuk memproses transaksi</li>
          <li><strong>Layanan pengiriman</strong> untuk mendistribusikan produk fisik</li>
          <li><strong>Penyedia cloud hosting</strong> untuk penyimpanan data yang aman</li>
          <li><strong>Otoritas hukum</strong> jika diwajibkan oleh peraturan yang berlaku</li>
        </ul>
      </div>

      <div className="legal-section">
        <h2>6. Hak Pengguna</h2>
        <p>Anda memiliki hak untuk:</p>
        <ul>
          <li>Mengakses dan memperbarui data pribadi Anda melalui halaman Pengaturan</li>
          <li>Meminta salinan data pribadi yang kami simpan</li>
          <li>Meminta penghapusan akun dan data terkait</li>
          <li>Membatalkan langganan email/notifikasi kapan saja</li>
        </ul>
      </div>

      <div className="legal-section">
        <h2>7. Perubahan Kebijakan</h2>
        <p>
          Kami dapat memperbarui kebijakan privasi ini dari waktu ke waktu. Perubahan signifikan akan
          diberitahukan melalui email atau notifikasi platform. Tanggal pembaruan terakhir tercantum di
          bagian atas halaman ini.
        </p>
      </div>

      <div className="legal-section">
        <h2>8. Hubungi Kami</h2>
        <div className="legal-contact-box">
          <h3>Tim Privasi Kampus Alkitab</h3>
          <p>
            Jika Anda memiliki pertanyaan tentang kebijakan privasi atau ingin menggunakan hak Anda
            terkait data pribadi, silakan hubungi kami:
          </p>
          <p>
            📧 Email: <a href="mailto:privacy@kampusalkitab.id">privacy@kampusalkitab.id</a><br />
            📱 WhatsApp: <a href="https://wa.me/6281234567890">+62 812-3456-7890</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
