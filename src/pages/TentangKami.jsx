import { useState, useEffect } from 'react';
import {
  Target, Users, Handshake, Heart, Award, BookOpen, Star,
  ChevronRight, Mail, Shield, ChevronDown,
  Cross, Flame, Cloud, User2, Anchor, Church, MessageCircle, Sunrise
} from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import usePageTitle from '../hooks/usePageTitle';
import './TentangKami.css';

/* ── Doctrinal data ── */
const doctrines = [
  {
    id: 'pembukaan',
    icon: <BookOpen size={20} />,
    color: '#1a237e',
    label: 'Pembukaan — Dasar Iman',
    intro: 'Kami percaya dan mengaku bahwa Alkitab, yang terdiri dari Perjanjian Lama dan Baru, adalah Firman Allah yang diilhamkan, merupakan kesaksian yang benar dan otoritas tertinggi yang mengajarkan mengenai iman, kehidupan, dan doktrin. Kebenarannya oleh kesaksian Roh Kudus di dalam hati orang percaya dan Keseragaman Wahyu yang Menyatakan Kristus.',
    references: '2 Timotius 3:16-17; 2 Petrus 1:20-21; Yohanes 10:35; 16:13',
    points: [],
  },
  {
    id: 'theology-proper',
    icon: <Cloud size={20} />,
    color: '#1565c0',
    label: '1. Theology Proper — Doktrin Tentang Allah',
    intro: null,
    points: [
      {
        num: '1.1',
        text: 'Kami percaya akan Allah yang esa, kekal, tak terbatas, dan tak berubah dalam keberadaan dan karakter-Nya. Dalam hakikat-Nya yang sejati, Yang adalah Roh yang tak terlihat, namun berdaulat menyatakan diri-Nya (teofani) sesuai dengan kehendak-Nya.',
        refs: 'Ulangan 6:4; Yesaya 40:28; Yohanes 4:24; Yehezkiel 1:26-28',
      },
      {
        num: '1.2',
        text: 'Allah yang esa kekal hadir dalam tiga Pribadi yang setara dan sehakikat: Bapa, Anak (Firman), dan Roh Kudus. Inilah misteri Tritunggal Mahakudus.',
        refs: 'Matius 28:19; 2 Korintus 13:13; Yohanes 1:1-2, 14',
      },
    ],
  },
  {
    id: 'kristologi',
    icon: <Cross size={20} />,
    color: '#6a1b9a',
    label: '2. Kristologi — Doktrin Tentang Kristus',
    intro: null,
    points: [
      {
        num: '2.1',
        text: 'Kami percaya pada Yesus Kristus, Putera Tunggal Bapa, yang adalah Allah sejati dan manusia sejati. Ia dikandung dari Roh Kudus dan dilahirkan oleh Perawan Maria. Kedua natur, ilahi dan insani, bersatu dalam satu Pribadi-Nya secara sempurna, tanpa tercampur, tanpa berubah, tanpa terbagi, dan tanpa terpisah.',
        refs: 'Yohanes 1:1, 14; Kolose 2:9; Yesaya 7:14; Lukas 1:35',
      },
      {
        num: '2.2',
        text: 'Kami percaya bahwa Yesus Kristus hidup tanpa dosa, mati disalib sebagai korban penebus yang sempurna dan pengganti bagi orang berdosa, bangkit secara fisik dalam tubuh kebangkitan-Nya yang nyata pada hari ketiga, dan naik ke surga secara jasmani.',
        refs: 'Ibrani 4:15; 1 Petrus 2:24; Lukas 24:39; 1 Korintus 15:3-4; Kisah Para Rasul 1:9',
      },
      {
        num: '2.3',
        text: 'Kami percaya bahwa Yesus Kristus sekarang berada di sebelah kanan Bapa sebagai Pengantara dan Imam Besar Agung, dan akan kembali secara fisik, dalam Pribadi-Nya sendiri, dan dapat disaksikan oleh semua orang dalam kemuliaan.',
        refs: 'Roma 8:34; Ibrani 7:25; Kisah Para Rasul 1:11; Wahyu 1:7',
      },
    ],
  },
  {
    id: 'pneumatologi',
    icon: <Flame size={20} />,
    color: '#d84315',
    label: '3. Pneumatologi — Doktrin Tentang Roh Kudus',
    intro: null,
    points: [
      {
        num: '3.1',
        text: 'Kami percaya pada keilahian, kepribadian, dan karya Roh Kudus. Ia adalah Pribadi ilahi yang menyelidiki, menginsafkan, melahirbarukan, membaptis dalam Roh, mendiami, memeteraikan, memenuhi, memimpin, dan memampukan orang percaya untuk hidup berbuah serta memperlengkapi jemaat dengan karunia-karunia rohani untuk pelayanan.',
        refs: 'Kisah Para Rasul 5:3-4; Yohanes 16:7-14; Titus 3:5; 1 Korintus 12:13; Efesus 1:13-14; Kisah Para Rasul 2:4; 1 Korintus 12:4-11',
      },
    ],
  },
  {
    id: 'antropologi',
    icon: <User2 size={20} />,
    color: '#2e7d32',
    label: '4. Antropologi & Hamartiologi — Manusia & Dosa',
    intro: null,
    points: [
      {
        num: '4.1',
        text: 'Kami percaya bahwa manusia diciptakan menurut gambar dan rupa Allah secara sempurna, laki-laki dan perempuan, untuk memuliakan Dia dan berelasi dengan-Nya.',
        refs: 'Kejadian 1:26-27',
      },
      {
        num: '4.2',
        text: 'Kami percaya bahwa melalui pelanggaran Adam, dosa masuk ke dalam dunia, dan maut sampai kepada semua orang. Akibatnya, semua manusia terlahir dalam natur yang berdosa, terpisah dari Allah, dan sama sekali tidak mampu menyelamatkan dirinya sendiri.',
        refs: 'Roma 5:12; Roma 3:10-12, 23; Efesus 2:1-3',
      },
    ],
  },
  {
    id: 'soteriologi',
    icon: <Anchor size={20} />,
    color: '#00695c',
    label: '5. Soteriologi — Doktrin Keselamatan',
    intro: null,
    points: [
      {
        num: '5.1',
        text: 'Kami percaya bahwa keselamatan hanya oleh kasih karunia (anugerah) Allah, diterima hanya melalui iman, dan hanya di dalam Kristus Yesus. Keselamatan bukan hasil perbuatan atau jasa manusia.',
        refs: 'Efesus 2:8-9; Yohanes 14:6; Kisah Para Rasul 4:12',
      },
      {
        num: '5.2',
        text: 'Kami percaya bahwa iman yang menyelamatkan akan menghasilkan pertobatan yang sejati—berbalik dari dosa kepada Allah dalam penyerahan diri.',
        refs: 'Kisah Para Rasul 3:19; 2 Korintus 7:10',
      },
      {
        num: '5.3',
        text: 'Kami percaya dalam pembenaran (dinyatakan benar di hadapan Allah), pengudusan (proses menjadi serupa dengan Kristus), dan pemuliaan (penggenapan keselamatan saat bertemu Kristus).',
        refs: 'Roma 5:1; 1 Tesalonika 4:3; Roma 8:29-30',
      },
      {
        num: '5.4',
        text: 'Kami percaya bahwa keselamatan oleh anugerah memberikan keyakinan yang teguh dan sekaligus panggilan untuk bertanggung jawab dalam memelihara iman, bertumbuh dalam kekudusan, dan setia hingga kesudahannya, dalam ketergantungan penuh pada kasih karunia Allah yang memampukan.',
        refs: 'Filipi 2:12-13; Ibrani 3:14; 1 Korintus 15:1-2; Kolose 1:22-23',
      },
    ],
  },
  {
    id: 'eklesiologi',
    icon: <Church size={20} />,
    color: '#4527a0',
    label: '6. Eklesiologi — Doktrin Gereja',
    intro: null,
    points: [
      {
        num: '6.1',
        text: 'Kami percaya bahwa Gereja adalah tubuh dan mempelai Kristus, yang terdiri dari semua orang yang telah dilahirbarukan oleh Roh Kudus, di mana Kristus adalah Kepala.',
        refs: '1 Korintus 12:12-13; Efesus 1:22-23; 5:25-27',
      },
      {
        num: '6.2',
        text: 'Kami percaya bahwa Gereja dipanggil untuk melaksanakan Amanat Agung yang diberikan oleh Yesus Kristus, yaitu pergi ke seluruh dunia, bersaksi tentang karya keselamatan di dalam Dia, memberitakan Injil, dan memuridkan semua bangsa.',
        refs: 'Matius 28:19-20; Markus 16:15; Kisah Para Rasul 1:8',
      },
      {
        num: '6.3',
        text: 'Kami percaya akan dua ordinansi (perintah suci) yang ditetapkan Kristus: Baptisan (bagi orang percaya, sebagai simbol identifikasi dengan kematian dan kebangkitan Kristus) dan Perjamuan Tuhan.',
        refs: 'Matius 28:19; Roma 6:3-4; 1 Korintus 11:23-26',
      },
      {
        num: '6.4',
        text: 'Kami percaya bahwa Baptisan Air adalah perintah langsung dari Tuhan Yesus yang harus dilakukan oleh setiap orang yang telah bertobat dan percaya kepada-Nya. Dilaksanakan dengan cara diselamkan ke dalam air ke dalam nama Bapa, Anak, dan Roh Kudus, sebagai simbol publik yang menyatakan bahwa orang percaya: (a) Telah disatukan dengan Kristus dalam kematian, penguburan, dan kebangkitan-Nya; (b) Telah dilahirkan kembali menjadi ciptaan baru; (c) Telah dicuci dari dosa-dosanya. Baptisan bukanlah yang menyelamatkan, tetapi merupakan tanggapan iman dan ketaatan dari orang yang sudah diselamatkan.',
        refs: 'Matius 28:19; Kisah Para Rasul 2:38, 41; 8:12, 36-38; Roma 6:3-4; Kolose 2:12; 1 Petrus 3:21',
      },
      {
        num: '6.5',
        text: 'Kami percaya bahwa Perjamuan Kudus adalah perintah yang ditetapkan oleh Tuhan Yesus untuk dirayakan hingga Ia datang kembali. Roti dan anggur adalah simbol tubuh dan darah Kristus. Dengan mengambil bagian, kita mengenang kematian-Nya, menyatakan persekutuan dengan Kristus, dan mengumumkan pengharapan akan kedatangan-Nya kembali.',
        refs: '1 Korintus 11:23-29; Lukas 22:19-20; Matius 26:26-28; 1 Korintus 10:16-17',
      },
    ],
  },
  {
    id: 'doa',
    icon: <MessageCircle size={20} />,
    color: '#0277bd',
    label: '7. Doa — Komunikasi dalam Relasi Perjanjian',
    intro: null,
    points: [
      {
        num: '7.1',
        text: 'Kami percaya bahwa doa adalah hak istimewa dan napas hidup orang percaya, yang dimungkinkan oleh karya pendamaian Yesus Kristus. Melalui Dia, kita memiliki jalan masuk kepada Bapa dengan penuh keberanian. Doa bukan sekadar ritual, tetapi komunikasi pribadi yang hidup dengan Allah yang berdaulat dan pengasih.',
        refs: 'Ibrani 4:14-16; Efesus 2:18; Roma 8:15-16',
      },
      {
        num: '7.2',
        text: 'Kami percaya bahwa doa diajukan kepada Bapa, sebagaimana diajarkan dan diteladankan oleh Yesus Kristus dalam Doa Bapa Kami. Doa kita dinaikkan dalam nama Yesus, serta dalam kuasa dan penyertaan Roh Kudus, yang membantu kita berdoa sesuai kehendak Allah.',
        refs: 'Matius 6:9; Yohanes 15:16; 16:23-24; Roma 8:26-27; Yudas 1:20',
      },
      {
        num: '7.3',
        text: 'Kami percaya bahwa doa yang alkitabiah mencakup penyembahan, pengakuan dosa, ucapan syukur, dan permohonan untuk segala kebutuhan jasmani dan rohani kita, serta untuk kemajuan Kerajaan Allah di seluruh dunia. Allah mendengar dan menjawab menurut hikmat, kasih, dan waktu-Nya yang sempurna.',
        refs: 'Filipi 4:6-7; 1 Yohanes 1:9; Matius 6:10-13; 1 Yohanes 5:14-15',
      },
    ],
  },
  {
    id: 'eskatologi',
    icon: <Sunrise size={20} />,
    color: '#e65100',
    label: '8. Eskatologi — Doktrin Akhir Zaman',
    intro: null,
    points: [
      {
        num: '8.1',
        text: 'Kami percaya akan pengangkatan (rapture) gereja, di mana semua orang percaya akan diubahkan dan bertemu dengan Tuhan di awan-awan.',
        refs: '1 Tesalonika 4:16-17; 1 Korintus 15:51-52',
      },
      {
        num: '8.2',
        text: 'Kami percaya akan kedatangan Yesus Kristus yang kedua kali secara fisik untuk mendirikan Kerajaan Seribu Tahun di bumi.',
        refs: 'Wahyu 19:11-16; 20:1-6',
      },
      {
        num: '8.3',
        text: 'Kami percaya akan kebangkitan semua orang mati dan penghakiman terakhir. Umat tebusan akan memasuki langit dan bumi baru untuk tinggal selamanya dalam hadirat Allah.',
        refs: 'Wahyu 20:11-15; 21:1-4',
      },
    ],
  },
];

const misiPilar = [
  {
    num: '1', color: '#1565c0', icon: '📖',
    title: 'Misi Pemuridan',
    sub: 'Berdasarkan Eklesiologi & Soteriologi',
    tagline: '"Memuridkan setiap orang percaya untuk bertumbuh dalam Kristus dan setia hingga akhir."',
    aktivitas: 'Pengajaran doktrin yang sehat, kelompok-kelompok kecil (cell), pembinaan kehidupan rohani, dan peneguhan keyakinan keselamatan oleh anugerah.',
    tujuan: 'Setiap jemaat memahami imannya, hidup dalam kekudusan, dan bertanggung jawab memelihara panggilannya (Poin 5.4).',
  },
  {
    num: '2', color: '#6a1b9a', icon: '📢',
    title: 'Misi Penginjilan & Pengajaran',
    sub: 'Berdasarkan Pembukaan & Eklesiologi',
    tagline: '"Bersaksi tentang Kristus dan mengajarkan seluruh kebenaran Firman Tuhan dengan setia."',
    aktivitas: 'Khotbah ekspositoris, seminar Alkitab, Sekolah Minggu berkualitas, dan literatur Kristen alkitabiah.',
    tujuan: 'Menjadi gereja yang berdiri teguh di atas otoritas Alkitab dan melaksanakan Amanat Agung (Poin Pembukaan & 6.2).',
  },
  {
    num: '3', color: '#00695c', icon: '🙏',
    title: 'Misi Persekutuan & Ibadah',
    sub: 'Berdasarkan Doa & Ordinansi',
    tagline: '"Membangun persekutuan yang alkitabiah dan menyelenggarakan ibadah yang memuliakan Allah."',
    aktivitas: 'Ibadah yang khidmat dan penuh sukacita, pelaksanaan Baptisan dan Perjamuan Kudus secara tertib, kehidupan doa.',
    tujuan: 'Menjadi tubuh Kristus yang sehat yang menyatakan persekutuan dengan Allah dan sesama (Poin 7 & 6.3-6.5).',
  },
  {
    num: '4', color: '#d84315', icon: '❤️',
    title: 'Misi Pelayanan & Kasih',
    sub: 'Berdasarkan Karunia Roh & Kristologi',
    tagline: '"Melayani masyarakat dengan kasih Kristus dan memperlengkapi orang percaya dengan karunia Roh."',
    aktivitas: 'Pelayanan diakonia (sosial), konseling, pelatihan karunia rohani, dan kelompok pendukung (support group).',
    tujuan: 'Setiap anggota melayani sesuai karunia yang diterimanya, mencerminkan kasih dan pelayanan Yesus Kristus (Poin 3.1).',
  },
  {
    num: '5', color: '#e65100', icon: '✨',
    title: 'Misi Pengharapan Eskatologis',
    sub: 'Berdasarkan Eskatologi',
    tagline: '"Hidup dan melayani dengan penuh pengharapan akan kedatangan Kristus yang mulia."',
    aktivitas: 'Pengajaran tentang akhir zaman yang meneguhkan iman, hidup yang sadar akan pertanggungjawaban, dan mengarahkan pandangan pada langit dan bumi baru.',
    tujuan: 'Menghasilkan umat yang setia, giat melayani, dan bersukacita menantikan penggenapan janji Allah (Poin 8).',
  },
];

const nilaiDasar = [
  { icon: '📖', title: 'Alkitabiah', desc: 'Semua pengajaran, keputusan, dan praktik berpusat pada kebenaran Firman Tuhan.', color: '#1565c0' },
  { icon: '✝️', title: 'Tritunggal', desc: 'Seluruh kehidupan dan ibadah berpusat pada Allah Bapa, Anak, dan Roh Kudus.', color: '#6a1b9a' },
  { icon: '🙌', title: 'Anugerah', desc: 'Hidup dalam kesadaran bahwa segala sesuatu adalah kasih karunia, bebas dari legalisme dan dipenuhi syukur.', color: '#00695c' },
  { icon: '💞', title: 'Komunitas', desc: 'Menjadi keluarga Allah yang saling mengasihi, mendukung, dan menopang.', color: '#d84315' },
  { icon: '🌍', title: 'Misi', desc: 'Setiap orang percaya adalah agen Kerajaan Allah untuk menjangkau dunia.', color: '#e65100' },
];

/* ── Instructor & partner data ── */
const pengajar = [
  { name: 'Dr. Jonathan Limbong, M.Th.', role: 'Teologi Sistematika & Apologetika', desc: 'Doktor Teologi dari Seminari Theologia Internasional. Dosen tamu di 5 universitas Kristen di Indonesia dengan 20+ tahun pengalaman mengajar.', courses: 3, rating: 4.9, students: 4200, image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200', expertise: ['Teologi Sistematika', 'Apologetika', 'Hermeneutika'] },
  { name: 'Pdt. Maria Runtu, M.Div.', role: 'Kepemimpinan & Pastoral', desc: 'Master of Divinity dari Singapore Bible College. Gembala Sidang aktif dengan rekam jejak memimpin gereja bertumbuh dari 50 menjadi 800 jemaat.', courses: 4, rating: 4.8, students: 3100, image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200&h=200', expertise: ['Kepemimpinan Gereja', 'Pastoral', 'Pertumbuhan Gereja'] },
  { name: 'David Tanaka, S.Psi., M.Th.', role: 'Konseling Kristen', desc: 'Psikolog klinis yang juga teolog. Memadukan psikologi modern dengan prinsip-prinsip Alkitab dalam pendekatan konseling yang holistik dan transformatif.', courses: 2, rating: 4.7, students: 1800, image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200&h=200', expertise: ['Konseling Kristen', 'Psikologi Pastoral', 'Wellness'] },
  { name: 'Fera Massie, B.Mus.', role: 'Ibadah & Musik Gereja', desc: 'Musisi profesional dan pemimpin ibadah dengan pengalaman memimpin ribuan jemaat. Pernah tampil di konferensi internasional di Asia dan Australia.', courses: 3, rating: 4.9, students: 5600, image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=200&h=200', expertise: ['Worship Leading', 'Musik Gereja', 'Sound System'] },
  { name: 'Rev. Samuel Hartono, M.Th.', role: 'Misi & Evangelis', desc: 'Misiolog dengan pengalaman pelayanan lintas budaya di 8 negara. Spesialis dalam evangelisme kontekstual dan penanaman gereja.', courses: 2, rating: 4.8, students: 1200, image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200&h=200', expertise: ['Misiology', 'Evangelisme', 'Church Planting'] },
  { name: 'Dr. Grace Walandouw, Ph.D.', role: 'Perjanjian Lama & Bahasa Ibrani', desc: 'Doktor dalam Studi Perjanjian Lama dari Universitas Leiden. Penulis 3 buku teologi dan ahli bahasa Ibrani dan Aram Alkitabiah.', courses: 2, rating: 4.9, students: 980, image: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&q=80&w=200&h=200', expertise: ['Perjanjian Lama', 'Bahasa Ibrani', 'Eksegesis'] },
];

const mitra = [
  { name: 'Gereja Bethel Indonesia (GBI)', type: 'Gereja Induk', logo: '🏛️', desc: 'Bermitra dalam pengembangan kurikulum dan sertifikasi pendeta.' },
  { name: 'Seminari Theologia Injili Indonesia', type: 'Lembaga Akademik', logo: '📚', desc: 'Kemitraan akademik untuk pengakuan kredit studi teologi.' },
  { name: 'PERKI (Persekutuan Kristen Indonesia)', type: 'Organisasi', logo: '🤝', desc: 'Distribusi konten kepada ratusan gereja anggota PERKI.' },
  { name: 'Gideon International Indonesia', type: 'Lembaga Misi', logo: '✝️', desc: 'Kolaborasi dalam program literasi Alkitab dan misi.' },
  { name: 'Yayasan Pendidikan Kristiani', type: 'Yayasan', logo: '🎓', desc: 'Pengembangan beasiswa bagi hamba Tuhan dari daerah terpencil.' },
  { name: 'Christian Media Network', type: 'Media', logo: '📡', desc: 'Distribusi konten via radio, TV, dan platform streaming Kristen.' },
];

const sections = [
  { id: 'visi-misi', label: 'Visi & Misi', icon: <Target size={16} /> },
  { id: 'doktrin', label: 'Doctrinal Transparency', icon: <Shield size={16} /> },
  { id: 'pengajar', label: 'Tim Pengajar', icon: <Users size={16} /> },
  { id: 'bermitra', label: 'Bermitra', icon: <Handshake size={16} /> },
];

/* ── Doctrine accordion item ── */
const DoctrineItem = ({ doc }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={`dt-item ${open ? 'open' : ''}`}>
      <button className="dt-item-header" onClick={() => setOpen(!open)}>
        <span className="dt-item-icon" style={{ background: doc.color + '18', color: doc.color }}>{doc.icon}</span>
        <span className="dt-item-label">{doc.label}</span>
        <ChevronDown size={18} className="dt-chevron" />
      </button>
      {open && (
        <div className="dt-item-body">
          {doc.intro && (
            <div className="dt-intro">
              <p>{doc.intro}</p>
              {doc.references && (
                <div className="dt-refs"><span>📖</span> {doc.references}</div>
              )}
            </div>
          )}
          {doc.points.map(pt => (
            <div key={pt.num} className="dt-point">
              <div className="dt-point-num" style={{ color: doc.color }}>{pt.num}</div>
              <div className="dt-point-content">
                <p>{pt.text}</p>
                <div className="dt-refs"><span>📖</span> {pt.refs}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const TentangKami = () => {
  const [searchParams] = useSearchParams();
  const urlSection = searchParams.get('section') || 'visi-misi';
  const [activeSection, setActiveSection] = useState(urlSection);

  useEffect(() => {
    setActiveSection(searchParams.get('section') || 'visi-misi');
  }, [searchParams]);

  const sectionLabel = sections.find(s => s.id === activeSection)?.label || 'Tentang Kami';
  usePageTitle(sectionLabel);

  return (
    <div className="tentang-page">
      {/* Hero */}
      <div className="tentang-hero">
        <div className="tentang-hero-inner">
          <div className="tentang-hero-eyebrow"><Heart size={14} /> Tentang Kami</div>
          <h1 className="tentang-hero-title">Mengubah Dunia Melalui Pendidikan Firman</h1>
          <p className="tentang-hero-desc">
            Kampus Alkitab adalah platform edukasi rohani digital terdepan di Indonesia, didirikan untuk memperlengkapi setiap orang percaya dalam pelayanan dan pertumbuhan iman.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="tentang-tabs">
        {sections.map(s => (
          <button
            key={s.id}
            className={`tentang-tab-btn ${activeSection === s.id ? 'active' : ''}`}
            onClick={() => setActiveSection(s.id)}
          >
            {s.icon} {s.label}
          </button>
        ))}
      </div>

      <div className="tentang-content">

        {/* ── Visi & Misi ── */}
        {activeSection === 'visi-misi' && (
          <div>
            <div className="tentang-stats-row">
              {[
                { num: '785+', label: 'Murid Aktif', icon: <Users size={24} color="#3b82f6" /> },
                { num: '150+', label: 'Kelas Tersedia', icon: <BookOpen size={24} color="#f59e0b" /> },
                { num: '45+', label: 'Pengajar Expert', icon: <Award size={24} color="#8b5cf6" /> },
                { num: '98%', label: 'Tingkat Kepuasan', icon: <Star size={24} color="#22c55e" fill="#22c55e" /> },
              ].map((s, i) => (
                <div key={i} className="tentang-stat-card">
                  {s.icon}
                  <div className="tentang-stat-num">{s.num}</div>
                  <div className="tentang-stat-label">{s.label}</div>
                </div>
              ))}
            </div>

            <div className="tentang-block">
              <div className="tentang-block-icon"><Target size={28} color="var(--color-primary)" /></div>
              <div>
                <h2 className="tentang-block-title">Visi</h2>
                <p className="tentang-block-text">
                  Menjadi platform pendidikan rohani digital terdepan yang memperlengkapi setiap orang percaya di Indonesia — dari Sabang sampai Merauke — untuk bertumbuh dalam iman, hikmat Alkitabiah, dan efektivitas pelayanan.
                </p>
              </div>
            </div>

            <div className="tentang-block">
              <div className="tentang-block-icon"><Heart size={28} color="#ec4899" /></div>
              <div>
                <h2 className="tentang-block-title">Misi</h2>
                <ul className="tentang-mission-list">
                  {[
                    'Menyediakan konten pendidikan teologis berkualitas tinggi yang mudah diakses oleh semua kalangan.',
                    'Membangun komunitas iman yang saling mendukung pertumbuhan rohani dan pelayanan.',
                    'Memperlengkapi hamba Tuhan dengan alat dan sumber daya praktis untuk pelayanan gereja.',
                    'Mendukung misi penginjilan melalui pendidikan kontekstual di seluruh kepulauan Indonesia.',
                    'Menghubungkan gereja lokal dengan jaringan pengajar dan teolog terbaik di Indonesia dan Asia.',
                  ].map((m, i) => (
                    <li key={i}><ChevronRight size={16} color="var(--color-primary)" />{m}</li>
                  ))}
                </ul>
              </div>
            </div>

            <h2 className="tentang-values-title">Nilai-Nilai Kami</h2>
            <div className="tentang-values-grid">
              {[
                { title: 'Kebenaran Firman', desc: 'Seluruh konten kami berdasarkan Alkitab sebagai sumber kebenaran tertinggi.', color: '#3b82f6' },
                { title: 'Keunggulan Akademik', desc: 'Kami berkomitmen pada standar pengajaran teologi yang ketat dan relevan.', color: '#f59e0b' },
                { title: 'Aksesibilitas', desc: 'Pendidikan berkualitas harus dapat diakses oleh semua orang, di mana pun mereka berada.', color: '#22c55e' },
                { title: 'Komunitas Iman', desc: 'Pertumbuhan rohani terjadi dalam konteks komunitas yang saling mendukung.', color: '#8b5cf6' },
                { title: 'Pelayanan', desc: 'Kami ada untuk melayani gereja dan tubuh Kristus, bukan untuk mencari keuntungan semata.', color: '#ec4899' },
                { title: 'Inovasi', desc: 'Menggunakan teknologi terkini untuk menghadirkan pengalaman belajar yang efektif.', color: '#ef4444' },
              ].map((v, i) => (
                <div key={i} className="tentang-value-card" style={{ borderTop: `4px solid ${v.color}` }}>
                  <h3 className="tentang-value-title" style={{ color: v.color }}>{v.title}</h3>
                  <p className="tentang-value-desc">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Doctrinal Transparency ── */}
        {activeSection === 'doktrin' && (
          <div>
            {/* Header intro */}
            <div className="dt-hero">
              <div className="dt-hero-icon"><Shield size={32} color="#1a237e" /></div>
              <div>
                <h2 className="dt-hero-title">Doctrinal Transparency</h2>
                <p className="dt-hero-desc">
                  Kami berkomitmen pada keterbukaan penuh mengenai apa yang kami percayai dan ajarkan. 
                  Setiap konten di Kampus Alkitab berlandaskan pada pengakuan iman ini — kami undang Anda untuk membaca, memeriksa, dan memverifikasi dengan Alkitab.
                </p>
                <div className="dt-hero-verse">
                  "Tetapi ujilah segala sesuatu dan peganglah yang baik." — 1 Tesalonika 5:21
                </div>
              </div>
            </div>

            {/* Doctrine accordion */}
            <div className="dt-accordion">
              {doctrines.map(doc => <DoctrineItem key={doc.id} doc={doc} />)}
            </div>

            {/* Penutup */}
            <div className="dt-penutup">
              <div className="dt-penutup-icon"><Cross size={32} color="#fbbf24" /></div>
              <h3>Penutup</h3>
              <p>
                Kami berdiri teguh di atas kebenaran ini, bertekad untuk hidup bagi kemuliaan Allah, 
                dengan pengharapan yang penuh sukacita akan kedatangan Tuhan Yesus Kristus. Amin.
              </p>
            </div>

            {/* Visi Gereja */}
            <div className="dt-section-divider">
              <span>VISI</span>
            </div>
            <div className="dt-visi-block">
              <div className="dt-visi-quote">
                "Menjadi Umat Allah yang Memuliakan-Nya, Bertumbuh dalam Iman, dan Membawa Terang Injil ke Seluruh Penjuru Dunia."
              </div>
              <div className="dt-visi-pillars">
                {[
                  { icon: '✨', title: 'Memuliakan-Nya', desc: 'Menjadikan kemuliaan Allah Tritunggal sebagai tujuan akhir segala yang kita lakukan.', ref: '1 Korintus 10:31' },
                  { icon: '🌱', title: 'Bertumbuh dalam Iman', desc: 'Menjadi komunitas yang semakin serupa dengan Kristus melalui pengajaran alkitabiah dan disiplin rohani.', ref: 'Efesus 4:15-16' },
                  { icon: '💡', title: 'Membawa Terang Injil', desc: 'Menjadi saluran kasih dan kebenaran Allah yang aktif memberitakan kabar keselamatan kepada setiap orang.', ref: 'Matius 5:14-16' },
                ].map((v, i) => (
                  <div key={i} className="dt-visi-pillar">
                    <div className="dt-visi-pillar-num">{v.icon}</div>
                    <h4>{v.title}</h4>
                    <p>{v.desc}</p>
                    <small>📖 {v.ref}</small>
                  </div>
                ))}
              </div>
            </div>

            {/* Misi 5 Pilar */}
            <div className="dt-section-divider"><span>MISI — LIMA PILAR</span></div>
            <div className="dt-misi-grid">
              {misiPilar.map(p => (
                <div key={p.num} className="dt-misi-card" style={{ borderLeft: `4px solid ${p.color}` }}>
                  <div className="dt-misi-card-header">
                    <span className="dt-misi-num" style={{ background: p.color + '18', color: p.color }}>{p.icon} Pilar {p.num}</span>
                    <h4 style={{ color: p.color }}>{p.title}</h4>
                    <small className="dt-misi-sub">{p.sub}</small>
                  </div>
                  <div className="dt-misi-tagline">{p.tagline}</div>
                  <div className="dt-misi-detail">
                    <strong>Aktivitas:</strong> {p.aktivitas}
                  </div>
                  <div className="dt-misi-detail">
                    <strong>Tujuan:</strong> {p.tujuan}
                  </div>
                </div>
              ))}
            </div>

            {/* Nilai-nilai Dasar */}
            <div className="dt-section-divider"><span>NILAI-NILAI DASAR</span></div>
            <div className="dt-nilai-grid">
              {nilaiDasar.map((n, i) => (
                <div key={i} className="dt-nilai-card" style={{ borderTop: `4px solid ${n.color}` }}>
                  <div className="dt-nilai-icon">{n.icon}</div>
                  <h4 style={{ color: n.color }}>{n.title}</h4>
                  <p>{n.desc}</p>
                </div>
              ))}
            </div>

            {/* Closing verse */}
            <div className="dt-closing-verse">
              "Karena dari Dia, dan oleh Dia, dan kepada Dia adalah segala sesuatu. Bagi Dialah kemuliaan sampai selama-lamanya! Amin."
              <cite>— Roma 11:36</cite>
            </div>
          </div>
        )}

        {/* ── Tim Pengajar ── */}
        {activeSection === 'pengajar' && (
          <div>
            <div className="pengajar-intro">
              <h2 className="pengajar-intro-title">Tim Pengajar Kami</h2>
              <p className="pengajar-intro-desc">Para pengajar kami adalah teolog, pendeta, dan praktisi pelayanan terbaik dari berbagai lembaga dan tradisi gereja di Indonesia dan internasional.</p>
            </div>
            <div className="pengajar-grid">
              {pengajar.map((p, i) => (
                <div key={i} className="pengajar-card">
                  <img src={p.image} alt={p.name} className="pengajar-avatar" />
                  <div className="pengajar-info">
                    <h3 className="pengajar-name">{p.name}</h3>
                    <div className="pengajar-role">{p.role}</div>
                    <div className="pengajar-expertise">{p.expertise.map(e => <span key={e} className="pengajar-tag">{e}</span>)}</div>
                    <p className="pengajar-desc">{p.desc}</p>
                    <div className="pengajar-stats">
                      <div><strong>{p.courses}</strong> <span>kelas</span></div>
                      <div><Star size={13} fill="#f59e0b" color="#f59e0b" /> <strong>{p.rating}</strong></div>
                      <div><strong>{p.students.toLocaleString()}</strong> <span>murid</span></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Bermitra ── */}
        {activeSection === 'bermitra' && (
          <div>
            <div className="mitra-hero-section">
              <h2 className="mitra-title">Bermitra Bersama Kami</h2>
              <p className="mitra-desc">Kami terbuka untuk bermitra dengan gereja, lembaga pendidikan, organisasi pelayanan, dan perusahaan yang memiliki visi serupa dalam membangun tubuh Kristus di Indonesia.</p>
              <div className="mitra-cta-row">
                <button className="mitra-contact-btn"><Mail size={16} /> Hubungi Tim Kemitraan</button>
              </div>
            </div>
            <h3 className="mitra-partners-title">Mitra Strategis Kami</h3>
            <div className="mitra-grid">
              {mitra.map((m, i) => (
                <div key={i} className="mitra-card">
                  <div className="mitra-logo">{m.logo}</div>
                  <div>
                    <div className="mitra-type">{m.type}</div>
                    <div className="mitra-name">{m.name}</div>
                    <p className="mitra-card-desc">{m.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <h3 className="mitra-types-title">Jenis Kemitraan</h3>
            <div className="mitra-types-grid">
              {[
                { title: 'Mitra Gereja', desc: 'Gereja yang ingin mengakses konten premium untuk jemaat mereka dengan harga khusus lembaga.', icon: '🏛️' },
                { title: 'Mitra Akademik', desc: 'Seminari dan sekolah teologi yang ingin mengintegrasikan platform kami ke dalam kurikulum.', icon: '📚' },
                { title: 'Mitra Korporat', desc: 'Perusahaan yang ingin mendukung program beasiswa dan pengembangan SDM pelayanan.', icon: '🏢' },
                { title: 'Mitra Konten', desc: 'Pengajar dan teolog yang ingin berbagi pengetahuan dan menjangkau lebih banyak murid.', icon: '✍️' },
              ].map((t, i) => (
                <div key={i} className="mitra-type-card">
                  <div className="mitra-type-icon">{t.icon}</div>
                  <h4 className="mitra-type-title">{t.title}</h4>
                  <p className="mitra-type-desc">{t.desc}</p>
                  <button className="mitra-type-btn">Pelajari Lebih Lanjut <ChevronRight size={14} /></button>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default TentangKami;
