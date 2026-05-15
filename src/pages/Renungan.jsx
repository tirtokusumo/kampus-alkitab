import { useState, useEffect } from 'react';
import { BookOpen, Calendar, Clock, ChevronRight, Heart, Search, Archive, Star } from 'lucide-react';
import { useSearchParams, Link } from 'react-router-dom';
import usePageTitle from '../hooks/usePageTitle';
import './Renungan.css';

export const renunganHarian = [
  {
    id: 1, date: '31 Maret 2026', title: 'Bergantung Penuh pada Tuhan',
    verse: '"Percayalah kepada TUHAN dengan segenap hatimu, dan janganlah bersandar kepada pengertianmu sendiri."',
    ref: 'Amsal 3:5',
    excerpt: 'Dalam setiap keputusan besar maupun kecil, Tuhan mengundang kita untuk mempercayai-Nya sepenuhnya — bukan kecerdasan atau pengalaman kita sendiri.',
    content: `Mempercayai Tuhan terdengar mudah ketika semuanya berjalan lancar. Namun, ketika kita dihadapkan pada persimpangan jalan atau situasi krisis, seberapa siap kita untuk tidak bersandar pada pengertian kita sendiri?\n\nPenulis Amsal tidak menyarankan kita membuang akal sehat. Sebaliknya, ia mengingatkan agar kita menempatkan hikmat Tuhan di atas logika manusiawi kita. Pikiran kita terbatas, diwarnai oleh pengalaman masa lalu dan ketakutan akan masa depan. Sementara itu, pandangan Tuhan meliputi kekekalan.\n\nContoh nyata terjadi ketika Ayub kehilangan segalanya. Jika ia bersandar pada pengertiannya sendiri, mungkin ia akan mengutuki Tuhan. Namun, dengan segala keterbatasannya, ia memilih untuk bergantung pada kedaulatan Tuhan.\n\nHari ini, apa pun yang sedang Anda hadapi, jangan biarkan masalah membatasi iman Anda. Berdoalah dan serahkan kekhawatiran tersebut ke dalam tangan-Nya. Biarkan damai sejahtera-Nya yang memimpin setiap langkah Anda ke depan.`,
    category: 'Kepercayaan', readTime: '4 mnt',
  },
  {
    id: 2, date: '30 Maret 2026', title: 'Kasih yang Tidak Pernah Gagal',
    verse: '"Kasih itu sabar; kasih itu murah hati; ia tidak cemburu."',
    ref: '1 Korintus 13:4',
    excerpt: 'Kasih agape bukanlah perasaan, melainkan pilihan. Paulus mengingatkan kita bahwa kasih sejati tidak ternoda oleh keegoisan.',
    content: `Sering kali kata "kasih" direduksi maknanya menjadi sekadar emosi atau ketertarikan semata. Namun Alkitab mendefinisikan kasih dengan cara yang sangat radikal dan menantang.\n\nPaulus dalam 1 Korintus 13 menjabarkan kasih bukan dengan kata sifat, melainkan dengan kata kerja. Kasih itu menanggung, percaya, mengharapkan, dan sabar. Ini berarti kasih sejati menuntut sebuah tindakan sadar untuk mementingkan kesejahteraan orang lain di atas diri sendiri—bahkan saat orang tersebut sulit untuk dikasihi.\n\nTuhan Yesus telah meneladankan kasih ini secara sempurna melalui pengorbanan-Nya di kayu salib. Ia mengasihi kita saat kita masih berdosa. Apakah hari ini ada seseorang di sekitar Anda yang membutuhkan kesabaran dan kemurahan hati Anda?\n\nMinta Roh Kudus memampukan Anda mengasihi bukan dengan kekuatan sendiri, tetapi dengan aliran kasih Bapa yang ada di dalam hati Anda.`,
    category: 'Kasih', readTime: '5 mnt',
  },
  {
    id: 3, date: '29 Maret 2026', title: 'Kekuatan dalam Kelemahan',
    verse: '"Cukuplah kasih karunia-Ku bagimu, sebab justru dalam kelemahanlah kuasa-Ku menjadi sempurna."',
    ref: '2 Korintus 12:9',
    excerpt: 'Paradoks kekristenan: kita paling kuat justru saat kita mengakui kelemahan. Bukan karena kita hebat, tapi karena Tuhan yang bekerja.',
    content: `Dunia sering mengajarkan kita untuk selalu terlihat kuat, mandiri, dan pantang menyerah. Kita menutupi setiap kelemahan kita agar tidak terlihat rapuh di mata orang lain. Namun, rasul Paulus membawa perspektif yang sepenuhnya berbeda dari kerajaan surga.\n\nKetika memohon agar "duri dalam dagingnya" diangkat, Tuhan justru berkata bahwa kasih karunia-Nya sudah cukup. Kenapa? Karena dalam keterbatasan dan ketidakmampuan kita, kuasa Tuhan memiliki panggung utama untuk bekerja luar biasa.\n\nKelemahan membuat kita tetap rendah hati dan bergantung pada-Nya. Apabila saat ini Anda merasa lelah, tidak mampu, atau menghadapi jalan buntu, ingatlah bahwa Anda berada di posisi yang tepat untuk melihat mukjizat Tuhan bekerja. Biarkan kekuatan-Nya mengambil alih.`,
    category: 'Iman', readTime: '3 mnt',
  },
  {
    id: 4, date: '28 Maret 2026', title: 'Damai Melampaui Akal',
    verse: '"Damai sejahtera Allah, yang melampaui segala akal, akan memelihara hati dan pikiranmu."',
    ref: 'Filipi 4:7',
    excerpt: 'Di tengah kecemasan dan ketidakpastian dunia, ada damai yang hanya Tuhan bisa berikan — bukan absennya masalah, melainkan hadirat-Nya di tengah masalah.',
    content: `Kecemasan adalah salah satu wabah terbesar dalam kehidupan modern. Kita mencemaskan pekerjaan, keluarga, masa depan, dan segala kemungkinan buruk yang bisa terjadi. Namun Allah menawarkan sesuatu yang jauh melampaui pemecahan masalah sementara: Damai Sejahtera-Nya (Shalom).\n\nDamai ini dikatakan "melampaui segala akal". Artinya, damai ini tidak masuk akal bagi logika manusia. Di saat seharusnya kita panik dan hancur, kita justru bisa tidur nyenyak dan tetap bersukacita.\n\nKunci untuk mendapatkan damai ini tertulis di ayat sebelumnya (Fil 4:6): "Nyatakanlah dalam segala hal keinginanmu kepada Allah dalam doa dan permohonan dengan ucapan syukur." Serahkan seluruh kekhawatiran itu pada-Nya, maka damai Allah akan menjadi benteng bagi hati dan pikiran kita dari serangan kecemasan.`,
    category: 'Damai', readTime: '5 mnt',
  },
  {
    id: 5, date: '27 Maret 2026', title: 'Tujuan yang Lebih Besar',
    verse: '"Sebab Aku ini mengetahui rancangan-rancangan apa yang ada pada-Ku mengenai kamu..."',
    ref: 'Yeremia 29:11',
    excerpt: 'Tuhan memiliki rencana yang baik untuk setiap kita — bahkan ketika situasi terasa separah pembuangan ke Babel. Ia melihat gambaran yang lebih besar.',
    content: `Ayat yang sangat terkenal ini (Yeremia 29:11) sering dikutip sebagai janji kenyamanan. Kenyataannya, ayat ini diucapkan Tuhan kepada bangsa Israel saat mereka sedang diangkut menjadi tawanan ke Babel—kondisi terburuk dalam sejarah mereka.\n\nTuhan tidak langsung membebaskan mereka. Ia menyuruh mereka menetap, membangun rumah, dan berdoa bagi kota pembuangan mereka. Namun, di tengah keterpurukan itu, Tuhan mengingatkan bahwa cerita mereka belum berakhir. Rencana-Nya adalah masa depan yang penuh harapan.\n\nSering kali perjalanan kita tidak berjalan sesuai peta yang kita gambar. Kekecewaan, kehilangan, dan kegagalan bisa terjadi. Tetapi ketahuilah, Allah Sang Arsitek Agung sedang merajut segala sesuatu, termasuk hal terburuk sekalipun, menjadi sebuah maha karya besar bagi kehidupan kita.`,
    category: 'Harapan', readTime: '4 mnt',
  },
  {
    id: 6, date: '26 Maret 2026', title: 'Diperkuat oleh Firman',
    verse: '"Sebab firman Allah hidup dan kuat, dan lebih tajam dari pedang bermata dua mana pun."',
    ref: 'Ibrani 4:12',
    excerpt: 'Alkitab bukan sekadar buku tua berisi kisah-kisah kuno. Firman Allah bekerja secara aktif dalam kehidupan manusia, memisahkan yang rohani dari yang duniawi.',
    content: `Di era informasi yang kebanjiran konten digital, membaca Alkitab kadang terasa seperti aktivitas kuno. Namun kebenaran Ibrani 4:12 mengingatkan kita bahwa tulisan ini bukanlah teks mati. Firman Allah "hidup"! Ia memiliki kemampuan untuk membongkar motif terdalam, menyembuhkan hati yang luka, dan memberikan arah di saat bingung.\n\nAlkitab diibaratkan sebagai pedang bermata dua: ia bisa membedah dan memisahkan kebohongan duniawi yang terbalut dalam kompromi. Ia membedakan mana yang berasal dari pikiran kita (jiwa) dan mana yang murni dari bimbingan Allah (roh).\n\nJangan biarkan Firman hanya menjadi koleksi kutipan motivasi Anda. Berilah waktu untuk merenungkannya sungguh-sungguh setiap hari. Saat Anda membaca Firman, pelan-pelan Firman itu akan "membaca" siapa diri Anda, memperbarui akal budi Anda, dan menyelaraskan kehendak Anda dengan kehendak Sorga.`,
    category: 'Firman', readTime: '4 mnt',
  },
];

const ayatHariIni = [
  { ref: 'Yohanes 3:16', text: 'Karena Allah begitu mengasihi dunia ini, sehingga Ia telah mengaruniakan Anak-Nya yang tunggal, supaya setiap orang yang percaya kepada-Nya tidak binasa, melainkan beroleh hidup yang kekal.', tema: 'Kasih Allah', warna: '#3b82f6' },
  { ref: 'Mazmur 23:1', text: 'TUHAN adalah gembalaku, takkan kekurangan aku.', tema: 'Pemeliharaan', warna: '#10b981' },
  { ref: 'Roma 8:28', text: 'Kita tahu sekarang, bahwa Allah turut bekerja dalam segala sesuatu untuk mendatangkan kebaikan bagi mereka yang mengasihi Dia.', tema: 'Providensi', warna: '#f59e0b' },
  { ref: 'Matius 11:28', text: 'Marilah kepada-Ku, semua yang letih lesu dan berbeban berat, Aku akan memberi kelegaan kepadamu.', tema: 'Istirahat', warna: '#8b5cf6' },
  { ref: 'Filipi 4:13', text: 'Segala perkara dapat kutanggung di dalam Dia yang memberi kekuatan kepadaku.', tema: 'Kekuatan', warna: '#ef4444' },
  { ref: 'Yeremia 29:11', text: 'Sebab Aku ini mengetahui rancangan-rancangan apa yang ada pada-Ku mengenai kamu, demikianlah firman TUHAN, yaitu rancangan damai sejahtera dan bukan rancangan kecelakaan, untuk memberikan kepadamu hari depan yang penuh harapan.', tema: 'Harapan', warna: '#ec4899' },
];

const arsipData = [
  { bulan: 'Maret 2026', jumlah: 31, highlight: 'Kasih & Hubungan' },
  { bulan: 'Februari 2026', jumlah: 28, highlight: 'Iman yang Diuji' },
  { bulan: 'Januari 2026', jumlah: 31, highlight: 'Tahun yang Baru' },
  { bulan: 'Desember 2025', jumlah: 31, highlight: 'Natal & Inkarnasi' },
  { bulan: 'November 2025', jumlah: 30, highlight: 'Syukur & Pengakuan' },
  { bulan: 'Oktober 2025', jumlah: 31, highlight: 'Kehidupan dalam Roh' },
  { bulan: 'September 2025', jumlah: 30, highlight: 'Doa yang Mengubah' },
  { bulan: 'Agustus 2025', jumlah: 31, highlight: 'Pelayanan & Karakter' },
];

const tabs = [
  { id: 'harian', label: 'Renungan Harian', icon: <BookOpen size={16} /> },
  { id: 'ayat', label: 'Ayat Hari Ini', icon: <Star size={16} /> },
  { id: 'arsip', label: 'Arsip Renungan', icon: <Archive size={16} /> },
];

const categoryColors = {
  'Kepercayaan': '#3b82f6', 'Kasih': '#ec4899', 'Iman': '#8b5cf6',
  'Damai': '#10b981', 'Harapan': '#f59e0b', 'Firman': '#ef4444',
};

const Renungan = () => {
  const [searchParams] = useSearchParams();
  const urlTab = searchParams.get('tab') || 'harian';
  const [activeTab, setActiveTab] = useState(urlTab);
  const [search, setSearch] = useState('');
  const [today] = useState(renunganHarian[0]);

  useEffect(() => {
    setActiveTab(searchParams.get('tab') || 'harian');
  }, [searchParams]);

  usePageTitle(activeTab === 'ayat' ? 'Ayat Hari Ini' : activeTab === 'arsip' ? 'Arsip Renungan' : 'Renungan Harian');

  const filteredRenungan = renunganHarian.filter(r =>
    r.title.toLowerCase().includes(search.toLowerCase()) ||
    r.excerpt.toLowerCase().includes(search.toLowerCase()) ||
    r.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="renungan-page">
      {/* Hero */}
      <div className="renungan-hero">
        <div className="renungan-hero-inner">
          <div className="renungan-hero-eyebrow"><BookOpen size={14} /> Renungan Alkitabiah</div>
          <h1 className="renungan-hero-title">Firman Tuhan untuk Setiap Hari</h1>
          <p className="renungan-hero-desc">
            Mulai harimu dengan renungan Alkitabiah yang menguatkan iman dan memperbarui pikiran.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="renungan-tabs">
        {tabs.map(t => (
          <button
            key={t.id}
            className={`renungan-tab-btn ${activeTab === t.id ? 'active' : ''}`}
            onClick={() => setActiveTab(t.id)}
          >
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      <div className="renungan-content">

        {/* ── TAB: HARIAN ── */}
        {activeTab === 'harian' && (
          <div>
            {/* Featured today */}
            <div className="renungan-featured">
              <div className="renungan-featured-badge"><Calendar size={13} /> {today.date}</div>
              <div className="renungan-featured-cat" style={{ color: categoryColors[today.category] || '#6366f1' }}>
                {today.category}
              </div>
              <h2 className="renungan-featured-title">{today.title}</h2>
              <blockquote className="renungan-featured-verse">
                <span className="verse-open">"</span>{today.verse.replace(/^"/, '').replace(/"$/, '')}
                <span className="renungan-verse-ref">— {today.ref}</span>
              </blockquote>
              <p className="renungan-featured-excerpt">{today.excerpt}</p>
              <Link to={`/renungan/${today.id}`} className="renungan-read-btn">
                Baca Renungan Lengkap <ChevronRight size={16} />
              </Link>
            </div>

            {/* Search */}
            <div className="renungan-search-bar">
              <Search size={16} />
              <input
                type="text"
                placeholder="Cari renungan..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>

            {/* List */}
            <div className="renungan-list-title">Renungan Sebelumnya</div>
            <div className="renungan-list">
              {filteredRenungan.slice(1).map(r => (
                <div key={r.id} className="renungan-card">
                  <div className="renungan-card-top">
                    <span className="renungan-card-cat" style={{ color: categoryColors[r.category] || '#6366f1' }}>
                      {r.category}
                    </span>
                    <span className="renungan-card-date"><Calendar size={12} /> {r.date}</span>
                  </div>
                  <h3 className="renungan-card-title">{r.title}</h3>
                  <p className="renungan-card-verse">{r.ref}</p>
                  <p className="renungan-card-excerpt">{r.excerpt}</p>
                  <div className="renungan-card-footer">
                    <span className="renungan-card-time"><Clock size={12} /> {r.readTime}</span>
                    <Link to={`/renungan/${r.id}`} className="renungan-card-read">Baca <ChevronRight size={13} /></Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── TAB: AYAT HARI INI ── */}
        {activeTab === 'ayat' && (
          <div>
            <div className="ayat-hero">
              <div className="ayat-today-label"><Star size={14} /> Ayat Pilihan Hari Ini</div>
              <blockquote className="ayat-main-verse">
                "{ayatHariIni[0].text}"
              </blockquote>
              <div className="ayat-main-ref">— {ayatHariIni[0].ref}</div>
              <div className="ayat-main-tema" style={{ background: ayatHariIni[0].warna + '22', color: ayatHariIni[0].warna }}>
                {ayatHariIni[0].tema}
              </div>
            </div>

            <div className="ayat-collection-title">Koleksi Ayat Pilihan</div>
            <div className="ayat-grid">
              {ayatHariIni.map((a, i) => (
                <div key={i} className="ayat-card" style={{ borderLeft: `4px solid ${a.warna}` }}>
                  <div className="ayat-card-tema" style={{ color: a.warna }}>{a.tema}</div>
                  <blockquote className="ayat-card-text">"{a.text}"</blockquote>
                  <div className="ayat-card-ref">— {a.ref}</div>
                  <button className="ayat-card-save"><Heart size={13} /> Simpan</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── TAB: ARSIP ── */}
        {activeTab === 'arsip' && (
          <div>
            <div className="arsip-header">
              <Archive size={20} />
              <div>
                <h2 className="arsip-title">Arsip Renungan</h2>
                <p className="arsip-desc">Telusuri renungan dari bulan-bulan sebelumnya.</p>
              </div>
            </div>
            <div className="arsip-grid">
              {arsipData.map((a, i) => (
                <div key={i} className="arsip-card">
                  <div className="arsip-card-month">{a.bulan}</div>
                  <div className="arsip-card-count">{a.jumlah} renungan</div>
                  <div className="arsip-card-tema">{a.highlight}</div>
                  <button className="arsip-card-btn">Lihat Semua <ChevronRight size={14} /></button>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Renungan;
