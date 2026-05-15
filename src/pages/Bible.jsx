import { useState } from 'react';
import { BookOpen, Search, Settings, ChevronLeft, ChevronRight, Bookmark, Layers, MessageSquare } from 'lucide-react';
import './Bible.css';
import usePageTitle from '../hooks/usePageTitle';

const bibleData = {
  Yohanes: {
    maxChapters: 21,
    chapters: {
      1: [
        { num: 1, text: 'Pada mulanya adalah Firman; Firman itu bersama-sama dengan Allah dan Firman itu adalah Allah.' },
        { num: 2, text: 'Ia pada mulanya bersama-sama dengan Allah.' },
        { num: 3, text: 'Segala sesuatu dijadikan melalui Dia dan tanpa Dia tidak ada suatu pun yang telah jadi dari segala yang telah dijadikan.' },
        { num: 4, text: 'Di dalam Dia ada hidup dan hidup itu adalah terang manusia.' },
        { num: 5, text: 'Terang itu bercahaya di dalam kegelapan dan kegelapan itu tidak menguasainya.' },
        { num: 6, text: 'Datanglah seorang utusan Allah, namanya Yohanes.' },
        { num: 7, text: 'Ia datang sebagai saksi untuk bersaksi tentang Terang itu, supaya melalui dia semua orang menjadi percaya.' },
        { num: 8, text: 'Ia bukanlah Terang itu, tetapi ia harus bersaksi tentang Terang itu.' },
      ],
      2: [
        { num: 1, text: 'Pada hari ketiga ada perkawinan di Kana yang di Galilea, dan ibu Yesus ada di situ;' },
        { num: 2, text: 'Yesus dan murid-murid-Nya diundang juga ke perkawinan itu.' },
        { num: 3, text: 'Ketika mereka kekurangan anggur, ibu Yesus berkata kepada-Nya, "Mereka kehabisan anggur."' },
        { num: 4, text: 'Kata Yesus kepadanya, "Mau apakah engkau dari pada-Ku, Ibu? Saat-Ku belum tiba."' },
        { num: 5, text: 'Tetapi ibu Yesus berkata kepada para pelayan, "Apa yang dikatakan-Nya kepadamu, buatlah itu!"' },
      ],
      3: [
        { num: 1, text: 'Adalah seorang Farisi yang bernama Nikodemus, seorang pemimpin agama Yahudi.' },
        { num: 2, text: 'Ia datang pada waktu malam kepada Yesus dan berkata, "Rabi, kami tahu bahwa Engkau datang sebagai guru yang diutus Allah; sebab tidak ada seorang pun yang dapat mengadakan tanda-tanda yang Engkau adakan itu, jika Allah tidak menyertainya."' },
        { num: 3, text: 'Yesus menjawab, kata-Nya, "Aku berkata kepadamu: Sesungguhnya jika seseorang tidak dilahirkan kembali, ia tidak dapat melihat Kerajaan Allah."' },
        { num: 16, text: 'Karena Allah begitu mengasihi dunia ini, sehingga Ia telah mengaruniakan Anak-Nya yang tunggal, supaya setiap orang yang percaya kepada-Nya tidak binasa, melainkan beroleh hidup yang kekal.' },
        { num: 17, text: 'Sebab Allah mengutus Anak-Nya ke dalam dunia bukan untuk menghakimi dunia, melainkan supaya dunia diselamatkan melalui Dia.' },
      ],
    },
  },
  Matius: {
    maxChapters: 28,
    chapters: {
      1: [
        { num: 1, text: 'Inilah silsilah Yesus Kristus, anak Daud, anak Abraham.' },
        { num: 2, text: 'Abraham memperanakkan Ishak, Ishak memperanakkan Yakub, Yakub memperanakkan Yehuda dan saudara-saudaranya,' },
        { num: 18, text: 'Kelahiran Yesus Kristus adalah seperti berikut: Pada waktu Maria, ibu-Nya, bertunangan dengan Yusuf, ternyata ia mengandung dari Roh Kudus, sebelum mereka hidup sebagai suami istri.' },
        { num: 21, text: 'Ia akan melahirkan anak laki-laki dan engkau akan menamakan Dia Yesus, karena Dialah yang akan menyelamatkan umat-Nya dari dosa mereka."' },
      ],
      5: [
        { num: 3, text: '"Berbahagialah orang yang miskin di hadapan Allah, karena merekalah yang empunya Kerajaan Surga.' },
        { num: 4, text: 'Berbahagialah orang yang berdukacita, karena mereka akan dihibur.' },
        { num: 5, text: 'Berbahagialah orang yang lemah lembut, karena mereka akan memiliki bumi.' },
        { num: 6, text: 'Berbahagialah orang yang lapar dan haus akan kebenaran, karena mereka akan dipuaskan.' },
      ],
    },
  },
  Mazmur: {
    maxChapters: 150,
    chapters: {
      23: [
        { num: 1, text: 'TUHAN adalah gembalaku, takkan kekurangan aku.' },
        { num: 2, text: 'Ia membaringkan aku di padang yang berumput hijau, Ia membimbing aku ke air yang tenang;' },
        { num: 3, text: 'Ia menyegarkan jiwaku. Ia menuntun aku di jalan yang benar oleh karena nama-Nya.' },
        { num: 4, text: 'Sekalipun aku berjalan dalam lembah yang kelam, aku tidak takut bahaya, sebab Engkau besertaku; gada-Mu dan tongkat-Mu, itulah yang menghibur aku.' },
        { num: 6, text: 'Kebajikan dan kemurahan belaka akan mengikuti aku seumur hidupku; dan aku akan diam dalam rumah TUHAN sepanjang masa.' },
      ],
      1: [
        { num: 1, text: 'Berbahagialah orang yang tidak berjalan menurut nasihat orang fasik, yang tidak berdiri di jalan orang berdosa, dan yang tidak duduk dalam kumpulan pencemooh,' },
        { num: 2, text: 'tetapi yang kesukaannya ialah Taurat TUHAN, dan yang merenungkan Taurat itu siang dan malam.' },
        { num: 3, text: 'Ia seperti pohon, yang ditanam di tepi aliran air, yang menghasilkan buahnya pada musimnya, dan yang tidak layu daunnya; apa saja yang diperbuatnya berhasil.' },
      ],
    },
  },
};

const bookList = [
  { label: 'Kejadian', key: 'Kejadian', testament: 'Perjanjian Lama' },
  { label: 'Mazmur', key: 'Mazmur', testament: 'Perjanjian Lama' },
  { label: 'Matius', key: 'Matius', testament: 'Perjanjian Baru' },
  { label: 'Yohanes', key: 'Yohanes', testament: 'Perjanjian Baru' },
  { label: 'Roma', key: 'Roma', testament: 'Perjanjian Baru' },
];

const commentaryData = {
  Commentary: (book, ch) => ({
    title: "Matthew Henry's Commentary",
    body: `${book} pasal ${ch} — Bagian ini mencatat salah satu bagian terpenting dalam seluruh Kitab Suci. Penulis dengan jelas mengungkapkan karakter Allah yang penuh kasih dan kebenaran-Nya yang sempurna. Setiap ayat membawa kita lebih dalam untuk memahami rencana keselamatan-Nya bagi umat manusia.`,
  }),
  'Cross-Ref': (book, ch) => ({
    title: 'Referensi Silang',
    body: `Ayat-ayat dalam ${book} ${ch} berkaitan dengan: Roma 8:28-29, Yesaya 53:5-6, Mazmur 23:1-6. Tema utama: Kasih Allah, Keselamatan, dan Kehidupan Kekal dalam Kristus Yesus.`,
  }),
  Interlinear: (book, ch) => ({
    title: `Teks Asli — ${book} ${ch}`,
    body: `Teks Yunani/Ibrani asli untuk ${book} pasal ${ch}. Kata kunci: "logos" (λόγος) = Firman/Perkataan; "agape" (ἀγάπη) = Kasih tanpa syarat; "zoe" (ζωή) = Kehidupan ilahi. Analisis tata bahasa tersedia untuk setiap kata dalam teks asli.`,
  }),
};

const Bible = () => {
  usePageTitle('Studi Alkitab');
  const [book, setBook] = useState('Yohanes');
  const [chapter, setChapter] = useState(1);
  const [showTools, setShowTools] = useState(true);
  const [activeTab, setActiveTab] = useState('Commentary');
  const [bookmarks, setBookmarks] = useState([]);
  const [note, setNote] = useState('');
  const [noteSaved, setNoteSaved] = useState(false);

  const currentBookData = bibleData[book];
  const maxChapters = currentBookData?.maxChapters || 5;
  const verses = currentBookData?.chapters?.[chapter] || [
    { num: 1, text: `(Ayat-ayat ${book} pasal ${chapter} dalam Alkitab lengkap. Ini adalah tampilan demo — koneksi ke API Alkitab dapat ditambahkan.)` },
  ];

  const handlePrevChapter = () => {
    if (chapter > 1) setChapter(c => c - 1);
  };

  const handleNextChapter = () => {
    if (chapter < maxChapters) setChapter(c => c + 1);
  };

  const handleBookChange = (e) => {
    setBook(e.target.value);
    setChapter(1);
  };

  const toggleBookmark = () => {
    const key = `${book} ${chapter}`;
    setBookmarks(prev =>
      prev.includes(key) ? prev.filter(b => b !== key) : [...prev, key]
    );
  };

  const handleSaveNote = () => {
    setNoteSaved(true);
    setTimeout(() => setNoteSaved(false), 2000);
  };

  const isBookmarked = bookmarks.includes(`${book} ${chapter}`);
  const toolContent = commentaryData[activeTab]?.(book, chapter);

  return (
    <div className="bible-page-layout">
      {/* Top Navigation Bar */}
      <div className="bible-header flex items-center justify-between">
        <div className="flex items-center gap-md">
          <div className="bible-selector flex items-center">
            <select value={book} onChange={handleBookChange} className="book-select">
              {['Perjanjian Lama', 'Perjanjian Baru'].map(testament => (
                <optgroup key={testament} label={testament}>
                  {bookList.filter(b => b.testament === testament).map(b => (
                    <option key={b.key} value={b.key}>{b.label}</option>
                  ))}
                </optgroup>
              ))}
            </select>
            <span className="separator"></span>
            <select value={chapter} onChange={e => setChapter(Number(e.target.value))} className="chapter-select">
              {Array.from({ length: maxChapters }, (_, i) => i + 1).map(num => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="bible-actions flex items-center gap-sm">
          <div className="search-box flex items-center">
            <Search size={16} />
            <input type="text" placeholder="Cari ayat atau topik..." />
          </div>
          <button
            className={`icon-btn ${isBookmarked ? 'active' : ''}`}
            onClick={toggleBookmark}
            title={isBookmarked ? 'Hapus Bookmark' : 'Tambah Bookmark'}
            style={{ color: isBookmarked ? 'var(--color-secondary)' : undefined }}
          >
            <Bookmark size={20} fill={isBookmarked ? 'currentColor' : 'none'} />
          </button>
          <button
            className={`icon-btn ${showTools ? 'active' : ''}`}
            onClick={() => setShowTools(!showTools)}
            title="Toggle Study Tools"
          >
            <Layers size={20} />
          </button>
        </div>
      </div>

      {bookmarks.length > 0 && (
        <div className="bible-bookmarks-bar">
          <BookOpen size={13} /> Bookmark:&nbsp;
          {bookmarks.map(bm => (
            <button key={bm} className="bookmark-chip" onClick={() => {
              const [b, c] = bm.split(' ');
              setBook(b); setChapter(Number(c));
            }}>{bm}</button>
          ))}
        </div>
      )}

      <div className={`bible-content-wrapper ${showTools ? 'with-tools' : ''}`}>
        {/* Main Reading Pane */}
        <div className="reading-pane">
          <div className="chapter-header flex items-center justify-between">
            <button className="nav-arrow" onClick={handlePrevChapter} disabled={chapter <= 1}>
              <ChevronLeft size={24} />
            </button>
            <h2>{book} {chapter}</h2>
            <button className="nav-arrow" onClick={handleNextChapter} disabled={chapter >= maxChapters}>
              <ChevronRight size={24} />
            </button>
          </div>

          <div className="verses-container">
            {verses.map(verse => (
              <div key={verse.num} className="verse-row flex">
                <span className="verse-num">{verse.num}</span>
                <p className="verse-text">{verse.text}</p>
              </div>
            ))}
          </div>

          <div className="reading-footer flex items-center justify-between mt-xl">
            <button
              className="btn btn-outline flex items-center gap-xs"
              onClick={handlePrevChapter}
              disabled={chapter <= 1}
            >
              <ChevronLeft size={16} /> {book} {chapter - 1}
            </button>
            <button
              className="btn btn-outline flex items-center gap-xs"
              onClick={handleNextChapter}
              disabled={chapter >= maxChapters}
            >
              {book} {chapter + 1} <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Study Tools Sidebar */}
        {showTools && (
          <div className="study-tools-pane">
            <div className="tools-tabs flex">
              {['Commentary', 'Cross-Ref', 'Interlinear'].map(tab => (
                <button
                  key={tab}
                  className={`tool-tab ${activeTab === tab ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="tool-content">
              <div className="tool-card">
                <h4 className="flex items-center gap-xs">
                  <BookOpen size={16} color="var(--color-primary)" /> {toolContent.title}
                </h4>
                <div className="commentary-text">
                  <p>{toolContent.body}</p>
                </div>
              </div>

              <div className="tool-card mt-md">
                <h4 className="flex items-center gap-xs">
                  <MessageSquare size={16} color="var(--color-accent)" /> Catatan Studi Saya
                </h4>
                <textarea
                  className="notes-area-small"
                  placeholder={`Tambah catatan untuk ${book} ${chapter}...`}
                  value={note}
                  onChange={e => setNote(e.target.value)}
                />
                <div className="flex justify-between mt-sm" style={{ alignItems: 'center' }}>
                  {noteSaved && <span style={{ fontSize: '0.8rem', color: '#22c55e' }}>✓ Tersimpan!</span>}
                  {!noteSaved && <div />}
                  <button className="btn btn-primary btn-sm" onClick={handleSaveNote}>Simpan</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Bible;
