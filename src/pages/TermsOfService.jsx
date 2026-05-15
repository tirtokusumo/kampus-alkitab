import { FileText, Calendar } from 'lucide-react';
import Breadcrumb from '../components/Breadcrumb';
import SEOHead from '../components/SEOHead';
import './LegalPage.css';

const TermsOfService = () => {
  return (
    <div className="legal-page">
      <SEOHead
        title="Syarat & Ketentuan"
        description="Syarat dan ketentuan penggunaan platform Kampus Alkitab — hak dan kewajiban pengguna."
      />

      <Breadcrumb items={[{ label: 'Syarat & Ketentuan' }]} />

      <div className="legal-header">
        <div className="legal-icon"><FileText size={28} /></div>
        <h1>Syarat & Ketentuan</h1>
        <p>Dengan mengakses dan menggunakan Kampus Alkitab, Anda menyetujui syarat dan ketentuan berikut.</p>
        <div className="legal-updated">
          <Calendar size={14} /> Terakhir diperbarui: 1 April 2026
        </div>
      </div>

      <div className="legal-section">
        <h2>1. Penerimaan Ketentuan</h2>
        <p>
          Dengan mendaftar atau menggunakan layanan Kampus Alkitab, Anda menyatakan bahwa Anda telah membaca,
          memahami, dan menyetujui untuk terikat oleh syarat dan ketentuan ini. Jika Anda tidak menyetujui
          ketentuan ini, harap tidak menggunakan platform kami.
        </p>
      </div>

      <div className="legal-section">
        <h2>2. Kelayakan Pengguna</h2>
        <ul>
          <li>Anda harus berusia minimal 13 tahun untuk mendaftar akun</li>
          <li>Pengguna di bawah 18 tahun harus mendapatkan izin orang tua/wali</li>
          <li>Anda bertanggung jawab untuk menjaga kerahasiaan akun dan kata sandi Anda</li>
          <li>Satu orang hanya diperkenankan memiliki satu akun aktif</li>
        </ul>
      </div>

      <div className="legal-section">
        <h2>3. Layanan yang Disediakan</h2>
        <p>Kampus Alkitab menyediakan:</p>
        <ul>
          <li>Kelas online (gratis dan berbayar) tentang studi Alkitab, teologi, dan pelayanan</li>
          <li>Forum komunitas dan diskusi</li>
          <li>Toko sumber daya (e-book, buku cetak, merchandise, podcast)</li>
          <li>Program sertifikasi pelayan Tuhan</li>
          <li>Acara online (Study Bible Club, seminar, workshop)</li>
          <li>Renungan harian dan studi Alkitab interaktif</li>
        </ul>
      </div>

      <div className="legal-section">
        <h2>4. Pembayaran & Pengembalian Dana</h2>
        <h3>Pembayaran</h3>
        <p>
          Pembelian kelas berbayar dan produk toko diproses melalui gateway pembayaran resmi yang terintegrasi.
          Harga yang tertera sudah termasuk pajak (jika berlaku). Kampus Alkitab berhak mengubah harga
          sewaktu-waktu tanpa pemberitahuan sebelumnya untuk produk yang belum dibeli.
        </p>
        <h3>Pengembalian Dana</h3>
        <ul>
          <li><strong>Produk digital</strong> (e-book, podcast): Tidak ada pengembalian dana setelah diakses/diunduh</li>
          <li><strong>Kelas online</strong>: Pengembalian dana dalam 7 hari setelah pembelian jika belum menyelesaikan lebih dari 30% materi</li>
          <li><strong>Produk fisik</strong>: Pengembalian dalam 7 hari jika produk cacat atau salah kirim (ongkos kirim ditanggung Kampus Alkitab)</li>
        </ul>
      </div>

      <div className="legal-section">
        <h2>5. Hak Kekayaan Intelektual</h2>
        <p>
          Seluruh konten di Kampus Alkitab — termasuk teks, video, gambar, desain, kode sumber, dan materi
          kelas — merupakan hak milik Kampus Alkitab atau pemberi lisensinya dan dilindungi oleh undang-undang
          hak cipta Indonesia dan internasional.
        </p>
        <ul>
          <li>Anda tidak diperkenankan menyalin, mendistribusikan, atau menjual ulang materi kelas tanpa izin tertulis</li>
          <li>Berbagi akun atau kredensial login dengan orang lain dilarang</li>
          <li>Screenshot atau rekaman layar materi kelas tidak diperbolehkan</li>
        </ul>
      </div>

      <div className="legal-section">
        <h2>6. Pedoman Komunitas</h2>
        <p>Dalam berpartisipasi di forum dan komunitas, Anda diharapkan untuk:</p>
        <ul>
          <li>Bersikap hormat dan kasih terhadap sesama anggota</li>
          <li>Tidak menyebarkan konten yang mengandung SARA, ujaran kebencian, atau pornografi</li>
          <li>Tidak melakukan spam, promosi komersial, atau multi-level marketing</li>
          <li>Menghargai perbedaan denominasi dan latar belakang teologis</li>
          <li>Melaporkan konten yang melanggar kepada moderator</li>
        </ul>
        <p>
          Kampus Alkitab berhak menangguhkan atau menghapus akun yang melanggar pedoman komunitas tanpa
          pemberitahuan sebelumnya.
        </p>
      </div>

      <div className="legal-section">
        <h2>7. Batasan Tanggung Jawab</h2>
        <p>
          Kampus Alkitab disediakan "sebagaimana adanya" dan kami tidak menjamin ketersediaan layanan tanpa
          gangguan. Kami tidak bertanggung jawab atas kerugian tidak langsung yang timbul dari penggunaan
          platform, termasuk namun tidak terbatas pada kehilangan data atau gangguan bisnis.
        </p>
      </div>

      <div className="legal-section">
        <h2>8. Perubahan Ketentuan</h2>
        <p>
          Kami berhak mengubah syarat dan ketentuan ini kapan saja. Perubahan akan berlaku efektif setelah
          dipublikasikan di halaman ini. Penggunaan berkelanjutan atas platform setelah perubahan dianggap
          sebagai persetujuan Anda terhadap ketentuan yang diperbarui.
        </p>
      </div>

      <div className="legal-section">
        <h2>9. Hukum yang Berlaku</h2>
        <p>
          Syarat dan ketentuan ini diatur oleh dan ditafsirkan sesuai dengan hukum Republik Indonesia.
          Segala sengketa akan diselesaikan melalui musyawarah mufakat atau, jika tidak tercapai, melalui
          Pengadilan Negeri yang berwenang di Indonesia.
        </p>
      </div>

      <div className="legal-section">
        <h2>10. Hubungi Kami</h2>
        <div className="legal-contact-box">
          <h3>Tim Legal Kampus Alkitab</h3>
          <p>
            Jika Anda memiliki pertanyaan tentang syarat dan ketentuan ini, silakan hubungi kami:
          </p>
          <p>
            📧 Email: <a href="mailto:legal@kampusalkitab.id">legal@kampusalkitab.id</a><br />
            📱 WhatsApp: <a href="https://wa.me/6281234567890">+62 812-3456-7890</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
