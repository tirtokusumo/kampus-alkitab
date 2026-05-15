import { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Play, Pause, Volume2, VolumeX, Maximize, Minimize,
  RotateCcw, RotateCw, Settings, ChevronDown, ChevronUp,
  CheckCircle, Circle, X, ArrowLeft, Star, Users,
  Clock, ThumbsUp, ThumbsDown, Share2, Flag, Search,
  PenLine, Plus, MoreVertical, ChevronLeft, ChevronRight,
  BookOpen, MessageSquare, Bell, Award, Flame, PlayCircle,
  FileText, Download, Globe, Tv, Smartphone, Lock, Check,
  Heart, AlertCircle, Bookmark, BarChart3, Zap, Info
} from 'lucide-react';
import './CoursePlayer.css';
import usePageTitle from '../hooks/usePageTitle';

/* ── Dummy video URL (short, public domain) ── */
const DUMMY_VIDEO = 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';

/* ── Course Data ── */
const courseData = {
  title: 'Theology 101: Foundations of Christian Faith',
  instructor: {
    name: 'Dr. Jonathan Edwards',
    avatar: null,
    title: 'Professor of Systematic Theology',
    rating: 4.8,
    reviews: 12450,
    students: 45230,
    courses: 8,
  },
  rating: 4.8,
  totalRatings: 3241,
  students: 12480,
  lastUpdated: 'Maret 2026',
  language: 'Indonesia',
  totalDuration: '15j 19m',
  totalLectures: 42,
  level: 'Semua Level',
  description: 'Kelas komprehensif tentang dasar-dasar teologi Kristen yang mencakup doktrin Allah, otoritas Alkitab, kristologi, pneumatologi, dan eskatologi. Dirancang untuk mahasiswa teologi, pemimpin gereja, dan setiap orang percaya yang ingin memahami iman Kristen secara mendalam.',
  whatYouWillLearn: [
    'Memahami atribut-atribut Allah yang tidak dapat dikomunikasikan',
    'Menjelaskan doktrin Trinitas dengan dasar Alkitabiah',
    'Menganalisis otoritas dan kanonisasi Kitab Suci',
    'Menerapkan hermeneutika dasar dalam studi Alkitab',
    'Memahami karya penebusan Kristus secara sistematis',
    'Mengembangkan worldview Kristen yang konsisten',
  ],
};

const courseSections = [
  {
    title: 'Section 1: Pendahuluan',
    totalDuration: '17m',
    lectureCount: 2,
    lectures: [
      { id: 'l1', title: 'Welcome to Theology 101', duration: '5:30', type: 'video', completed: true, preview: true },
      { id: 'l2', title: 'Apa itu Teologi Sistematika?', duration: '12:15', type: 'video', completed: true },
      { id: 'q1', title: 'Kuis 1: Pengantar Teologi', type: 'quiz', completed: false, questions: [
        { id: 1, question: 'Teologi Sistematika adalah studi yang menyusun ajaran-ajaran Alkitab secara tematis dan sistematis.', type: 'truefalse', correct: true, explanation: 'Benar. Teologi Sistematika mengorganisir doktrin-doktrin Alkitab ke dalam kategori sistematis seperti Allah, Kristus, Roh Kudus, keselamatan, gereja, dan akhir zaman.' },
        { id: 2, question: 'Manakah yang BUKAN merupakan cabang utama dari Teologi Sistematika?', type: 'multiple', options: ['Theologi Proper (Doktrin Allah)', 'Arkeologi Alkitabiah', 'Kristologi (Doktrin Kristus)', 'Soteriologi (Doktrin Keselamatan)'], correct: 1, explanation: 'Arkeologi Alkitabiah bukan cabang dari Teologi Sistematika. Ini adalah disiplin ilmu tersendiri.' },
        { id: 3, question: 'Teologi hanya relevan bagi pendeta dan akademisi, bukan orang awam.', type: 'truefalse', correct: false, explanation: 'Salah. Setiap orang percaya dipanggil untuk memahami imannya (Roma 12:1-2).' },
      ]},
    ],
  },
  {
    title: 'Section 2: Doktrin tentang Allah',
    totalDuration: '1j 15m',
    lectureCount: 3,
    lectures: [
      { id: 'l3', title: 'Atribut Incommunicable Allah', duration: '18:45', type: 'video', completed: false, active: true },
      { id: 'l4', title: 'Atribut Communicable Allah', duration: '22:10', type: 'video', completed: false },
      { id: 'l5', title: 'Doktrin Trinitas', duration: '35:00', type: 'video', completed: false },
      { id: 'q2', title: 'Kuis 2: Doktrin Allah', type: 'quiz', completed: false, questions: [
        { id: 1, question: 'Atribut incommunicable hanya dimiliki Allah dan tidak dapat dikomunikasikan kepada manusia.', type: 'truefalse', correct: true, explanation: 'Benar! Atribut incommunicable seperti kekekalan dan omnipresence adalah unik milik Allah.' },
        { id: 2, question: 'Doktrin Trinitas mengajarkan bahwa ada tiga Allah yang berbeda.', type: 'truefalse', correct: false, explanation: 'Salah. Trinitas mengajarkan satu Allah dalam tiga Pribadi yang berbagi satu esensi ilahi.' },
        { id: 3, question: 'Manakah yang termasuk atribut COMMUNICABLE Allah?', type: 'multiple', options: ['Kekekalan', 'Kasih', 'Ketidakberubahan', 'Omnipresence'], correct: 1, explanation: 'Kasih adalah atribut communicable karena manusia juga dapat mengasihi, meski terbatas.' },
        { id: 4, question: 'Omnisiensi berarti Allah mengetahui segala sesuatu — masa lalu, kini, dan masa depan.', type: 'truefalse', correct: true, explanation: 'Benar. Omnisiensi (Mahatahu) berarti pengetahuan Allah tidak terbatas (Ibrani 4:13).' },
      ]},
    ],
  },
  {
    title: 'Section 3: Otoritas Kitab Suci',
    totalDuration: '43m',
    lectureCount: 2,
    lectures: [
      { id: 'l6', title: 'Ineransi dan Infalibilitas', duration: '15:20', type: 'video', completed: false },
      { id: 'l7', title: 'Kanonisasi Alkitab', duration: '28:40', type: 'video', completed: false },
      { id: 'q3', title: 'Kuis 3: Kitab Suci', type: 'quiz', completed: false, questions: [
        { id: 1, question: 'Ineransi Alkitab berarti Alkitab bebas dari kesalahan dalam segala hal yang diajarkannya.', type: 'truefalse', correct: true, explanation: 'Benar. Ineransi menyatakan bahwa Alkitab, dalam naskah aslinya, tidak mengandung kesalahan.' },
        { id: 2, question: 'Berapa banyak kitab dalam Perjanjian Baru kanon Protestan?', type: 'multiple', options: ['24 kitab', '27 kitab', '39 kitab', '66 kitab'], correct: 1, explanation: 'Perjanjian Baru terdiri dari 27 kitab. Total kanon Protestan adalah 66 kitab (39 PL + 27 PB).' },
        { id: 3, question: '2 Timotius 3:16 menyatakan semua tulisan yang diilhamkan Allah berguna untuk mengajar dan mendidik.', type: 'truefalse', correct: true, explanation: 'Benar. Kata kunci: theopneustos — ditiupkan Allah.' },
      ]},
    ],
  },
  {
    title: 'Section 4: Kristologi',
    totalDuration: '1j 02m',
    lectureCount: 3,
    lectures: [
      { id: 'l8', title: 'Keilahian Kristus', duration: '25:00', type: 'video', completed: false },
      { id: 'l9', title: 'Kemanusiaan Kristus', duration: '20:15', type: 'video', completed: false },
      { id: 'l10', title: 'Karya Penebusan', duration: '17:30', type: 'video', completed: false },
      { id: 'q4', title: 'Kuis 4: Kristologi', type: 'quiz', completed: false, questions: [
        { id: 1, question: 'Kristus adalah Allah seutuhnya sekaligus manusia seutuhnya — dua natur dalam satu Pribadi.', type: 'truefalse', correct: true, explanation: 'Ini adalah doktrin Inkarnasi yang dirumuskan dalam Konsili Kalsedon (451 M).' },
        { id: 2, question: 'Doktrin apa yang mengajarkan bahwa Kristus menanggung hukuman dosa manusia di kayu salib?', type: 'multiple', options: ['Inkarnasi', 'Penebusan Substitusi', 'Kelahiran Perawan', 'Kenaikan Kristus'], correct: 1, explanation: 'Penebusan Substitusi mengajarkan Kristus mati sebagai pengganti manusia berdosa (Yesaya 53:5-6).' },
      ]},
    ],
  },
  {
    title: 'Section 5: Pneumatologi',
    totalDuration: '55m',
    lectureCount: 2,
    lectures: [
      { id: 'l11', title: 'Pribadi Roh Kudus', duration: '30:00', type: 'video', completed: false },
      { id: 'l12', title: 'Karunia-karunia Roh', duration: '25:00', type: 'video', completed: false },
      { id: 'q5', title: 'Kuis 5: Pneumatologi', type: 'quiz', completed: false, questions: [
        { id: 1, question: 'Roh Kudus adalah Allah sepenuhnya dan Pribadi ketiga dari Trinitas.', type: 'truefalse', correct: true, explanation: 'Benar. Roh Kudus adalah Pribadi ilahi ketiga dalam Trinitas yang memiliki intelek, kemauan, dan perasaan (1 Korintus 2:10-11).' },
        { id: 2, question: 'Manakah yang BUKAN peran utama Roh Kudus menurut Yohanes 16?', type: 'multiple', options: ['Menginsafkan dunia akan dosa', 'Memimpin kepada kebenaran', 'Memberikan berkat materi', 'Memuliakan Kristus'], correct: 2, explanation: 'Memberikan berkat materi bukan peran yang disebutkan Yesus dalam Yohanes 16.' },
      ]},
    ],
  },
  {
    title: 'Section 6: Eskatologi',
    totalDuration: '48m',
    lectureCount: 2,
    lectures: [
      { id: 'l13', title: 'Kedatangan Kristus Kedua Kali', duration: '28:00', type: 'video', completed: false },
      { id: 'l14', title: 'Langit Baru & Bumi Baru', duration: '20:00', type: 'video', completed: false },
      { id: 'q6', title: 'Kuis 6: Eskatologi', type: 'quiz', completed: false, questions: [
        { id: 1, question: 'Eskatologi adalah doktrin yang mempelajari hal-hal akhir zaman, termasuk kedatangan Kristus kedua kali dan kekekalan.', type: 'truefalse', correct: true, explanation: 'Benar. Dari bahasa Yunani eschaton (akhir) + logos (studi).' },
        { id: 2, question: 'Wahyu 21 menggambarkan keadaan akhir orang percaya adalah...', type: 'multiple', options: ['Jiwa yang melayang di awan', 'Langit Baru dan Bumi Baru bersama Allah', 'Kembali ke taman Eden', 'Tidak berwujud dalam cahaya ilahi'], correct: 1, explanation: 'Wahyu 21 menggambarkan Langit Baru dan Bumi Baru — ciptaan yang diperbarui di mana Allah tinggal bersama umat-Nya.' },
      ]},
    ],
  },
];

const reviewsData = [
  { id: 1, name: 'Maria S.', rating: 5, date: '2 minggu yang lalu', text: 'Kelas yang luar biasa! Penjelasan teologis yang mendalam namun mudah dipahami. Dr. Edwards sangat kompeten dan penuh hikmat.', helpful: 42 },
  { id: 2, name: 'Budi H.', rating: 5, date: '1 bulan yang lalu', text: 'Sudah lama mencari kelas teologi dalam Bahasa Indonesia yang berkualitas. Ini jawabannya! Sangat direkomendasikan.', helpful: 38 },
  { id: 3, name: 'Sarah L.', rating: 4, date: '1 bulan yang lalu', text: 'Konten sangat bagus dan comprehensive. Sedikit terlalu akademis di beberapa bagian, tapi overall sangat membantu.', helpful: 21 },
  { id: 4, name: 'Daniel P.', rating: 5, date: '2 bulan yang lalu', text: 'Mengubah cara saya memahami iman Kristen. Setiap sesi penuh wawasan rohani yang berharga.', helpful: 55 },
];

const qaData = [
  { id: 1, user: 'Timotius R.', question: 'Bisakah dijelaskan lebih detail tentang perbedaan antara atribut communicable dan incommunicable?', answers: 3, votes: 12, time: '3 hari yang lalu' },
  { id: 2, user: 'Rachel M.', question: 'Bagaimana kita merespons argumen bahwa doktrin Trinitas tidak Alkitabiah?', answers: 5, votes: 24, time: '1 minggu yang lalu' },
  { id: 3, user: 'Yohanes K.', question: 'Apakah ada rekomendasi buku tambahan untuk memperdalam studi tentang Kristologi?', answers: 2, votes: 8, time: '2 minggu yang lalu' },
];

const CoursePlayer = () => {
  usePageTitle(courseData.title);
  /* ── Video State ── */
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [prevVolume, setPrevVolume] = useState(1);
  const [muted, setMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [buffered, setBuffered] = useState(0);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);

  /* ── Layout State ── */
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedSections, setExpandedSections] = useState({ 0: true, 1: true });
  const [activeLecture, setActiveLecture] = useState('l3');

  /* ── Quiz State ── */
  const [quizMode, setQuizMode] = useState(false);
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizFinished, setQuizFinished] = useState(false);

  /* ── Notes State ── */
  const [noteText, setNoteText] = useState('');
  const [savedNotes, setSavedNotes] = useState([
    { time: 125, text: 'Allah bersifat immutable — tidak berubah dalam esensi-Nya.', id: 1 },
    { time: 340, text: 'Omnipresence berbeda dengan panteisme. Allah hadir di mana-mana tetapi berbeda dari ciptaan.', id: 2 },
  ]);
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [noteFilter, setNoteFilter] = useState('current');

  /* ── Q&A State ── */
  const [qaSearchQuery, setQaSearchQuery] = useState('');
  const [qaQuestion, setQaQuestion] = useState('');

  /* ── Refs ── */
  const videoRef = useRef(null);
  const playerContainerRef = useRef(null);
  const progressRef = useRef(null);
  const volumeRef = useRef(null);
  const controlsTimerRef = useRef(null);
  const navigate = useNavigate();

  /* ── Completed lectures count ── */
  const totalLectures = courseSections.reduce((sum, s) => sum + s.lectures.length, 0);
  const completedLectures = courseSections.reduce((sum, s) => sum + s.lectures.filter(l => l.completed).length, 0);
  const progressPercent = Math.round((completedLectures / totalLectures) * 100);

  /* ── Quiz Helpers ── */
  const handleLectureClick = (item) => {
    if (item.type === 'quiz') {
      setQuizMode(true); setActiveQuiz(item); setCurrentQuestionIdx(0);
      setSelectedAnswer(null); setShowResult(false); setQuizAnswers({}); setQuizFinished(false);
    } else { setQuizMode(false); setActiveQuiz(null); setActiveLecture(item.id); }
  };
  const handleAnswerSelect = (answer) => { if (!showResult) setSelectedAnswer(answer); };
  const handleCheckAnswer = () => {
    if (selectedAnswer === null) return;
    setShowResult(true);
    const q = activeQuiz.questions[currentQuestionIdx];
    setQuizAnswers(prev => ({ ...prev, [q.id]: selectedAnswer }));
  };
  const handleNextQuestion = () => {
    const nextIdx = currentQuestionIdx + 1;
    if (nextIdx >= activeQuiz.questions.length) { setQuizFinished(true); }
    else { setCurrentQuestionIdx(nextIdx); setSelectedAnswer(null); setShowResult(false); }
  };
  const handleSkipQuestion = () => handleNextQuestion();
  const isCorrectAnswer = () => {
    if (!activeQuiz || selectedAnswer === null) return false;
    return selectedAnswer === activeQuiz.questions[currentQuestionIdx].correct;
  };
  const getQuizScore = () => !activeQuiz ? 0 :
    activeQuiz.questions.filter(q => quizAnswers[q.id] === q.correct).length;

  /* ── Video Event Handlers ── */
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      // Update buffered
      if (videoRef.current.buffered.length > 0) {
        setBuffered(videoRef.current.buffered.end(videoRef.current.buffered.length - 1));
      }
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const togglePlay = useCallback(() => {
    if (videoRef.current) {
      if (playing) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setPlaying(!playing);
    }
  }, [playing]);

  const handleSeek = (amount) => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.max(0, Math.min(videoRef.current.currentTime + amount, duration));
    }
  };

  const handleProgressClick = (e) => {
    if (progressRef.current && videoRef.current) {
      const rect = progressRef.current.getBoundingClientRect();
      const percent = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      videoRef.current.currentTime = percent * duration;
      setCurrentTime(percent * duration);
    }
  };

  const handleVolumeClick = (e) => {
    if (volumeRef.current) {
      const rect = volumeRef.current.getBoundingClientRect();
      const percent = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      setVolume(percent);
      setMuted(percent === 0);
      if (videoRef.current) videoRef.current.volume = percent;
    }
  };

  const toggleMute = () => {
    if (muted) {
      setMuted(false);
      setVolume(prevVolume || 1);
      if (videoRef.current) videoRef.current.volume = prevVolume || 1;
    } else {
      setPrevVolume(volume);
      setMuted(true);
      setVolume(0);
      if (videoRef.current) videoRef.current.volume = 0;
    }
  };

  const changePlaybackRate = (rate) => {
    setPlaybackRate(rate);
    if (videoRef.current) videoRef.current.playbackRate = rate;
    setShowSpeedMenu(false);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      playerContainerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  /* ── Auto-hide controls ── */
  const handleMouseMove = () => {
    setShowControls(true);
    clearTimeout(controlsTimerRef.current);
    if (playing) {
      controlsTimerRef.current = setTimeout(() => setShowControls(false), 3000);
    }
  };

  /* ── Keyboard shortcuts ── */
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      switch (e.key) {
        case ' ':
        case 'k':
          e.preventDefault();
          togglePlay();
          break;
        case 'ArrowRight':
          e.preventDefault();
          handleSeek(5);
          break;
        case 'ArrowLeft':
          e.preventDefault();
          handleSeek(-5);
          break;
        case 'ArrowUp':
          e.preventDefault();
          setVolume(v => { const nv = Math.min(1, v + 0.1); if(videoRef.current) videoRef.current.volume = nv; return nv; });
          break;
        case 'ArrowDown':
          e.preventDefault();
          setVolume(v => { const nv = Math.max(0, v - 0.1); if(videoRef.current) videoRef.current.volume = nv; return nv; });
          break;
        case 'f':
          e.preventDefault();
          toggleFullscreen();
          break;
        case 'm':
          e.preventDefault();
          toggleMute();
          break;
        default: break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [togglePlay]);

  useEffect(() => {
    const handleFSChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFSChange);
    return () => document.removeEventListener('fullscreenchange', handleFSChange);
  }, []);

  /* ── Helpers ── */
  const formatTime = (sec) => {
    if (!sec || isNaN(sec)) return '0:00';
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    const s = Math.floor(sec % 60).toString().padStart(2, '0');
    return h > 0 ? `${h}:${m.toString().padStart(2, '0')}:${s}` : `${m}:${s}`;
  };

  const toggleSection = (idx) => {
    setExpandedSections(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const handleSaveNote = () => {
    if (noteText.trim()) {
      setSavedNotes(prev => [...prev, { time: Math.floor(currentTime), text: noteText.trim(), id: Date.now() }]);
      setNoteText('');
    }
  };

  const handleDeleteNote = (id) => {
    setSavedNotes(prev => prev.filter(n => n.id !== id));
  };

  const seekToTime = (time) => {
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          size={14}
          fill={i <= Math.floor(rating) ? '#f69c08' : (i - 0.5 <= rating ? '#f69c08' : 'transparent')}
          color="#f69c08"
        />
      );
    }
    return stars;
  };

  const ratingDistribution = [
    { stars: 5, percent: 72 },
    { stars: 4, percent: 18 },
    { stars: 3, percent: 6 },
    { stars: 2, percent: 3 },
    { stars: 1, percent: 1 },
  ];

  /* ═══════════════════════════════════════
     ██  RENDER
     ═══════════════════════════════════════ */
  return (
    <div className="udemy-cp">
      {/* ── TOP NAVBAR (Udemy-style black bar) ── */}
      <header className="cp-topbar">
        <div className="cp-topbar-left">
          <button className="cp-back-btn" onClick={() => navigate('/courses')} title="Kembali ke kelas">
            <ArrowLeft size={20} />
          </button>
          <div className="cp-topbar-divider" />
          <button className="cp-logo-btn" onClick={() => navigate('/')}>
            <Flame size={22} color="#f59e0b" />
            <span className="cp-logo-text">Kampus Alkitab</span>
          </button>
        </div>
        <div className="cp-topbar-center">
          <h1 className="cp-topbar-title">{courseData.title}</h1>
        </div>
        <div className="cp-topbar-right">
          <div className="cp-progress-indicator">
            <div className="cp-progress-ring">
              <svg viewBox="0 0 36 36" width="32" height="32" style={{transform:'rotate(-90deg)'}}>
                <circle cx="18" cy="18" r="15" fill="none" stroke="#3e4143" strokeWidth="3.5" />
                <circle
                  cx="18" cy="18" r="15"
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeDasharray={`${progressPercent * 0.942} 94.2`}
                />
              </svg>
              <span className="cp-progress-pct">{progressPercent}%</span>
            </div>
            <div className="cp-progress-label">
              <span className="cp-progress-text">Progres</span>
              <span className="cp-progress-subtext">{completedLectures}/{totalLectures} selesai</span>
            </div>
          </div>
          <button className="cp-topbar-icon" title="Bagikan">
            <Share2 size={18} />
          </button>
          <button className="cp-topbar-icon" title="Pengaturan">
            <Settings size={18} />
          </button>
        </div>
      </header>

      {/* ── MAIN BODY (video + sidebar) ── */}
      <div className="cp-body">
        {/* ─── VIDEO + TABS COLUMN ─── */}
        <div className={`cp-main ${!sidebarOpen ? 'cp-main--full' : ''}`}>

          {/* ═══ QUIZ MODE — replaces video player ═══ */}
          {quizMode && activeQuiz ? (
            <div className="cp-quiz-container">
              {quizFinished ? (
                <div className="cp-quiz-finished">
                  <div className="cp-quiz-score-icon">
                    {getQuizScore() === activeQuiz.questions.length ? '🏆' : getQuizScore() >= Math.ceil(activeQuiz.questions.length / 2) ? '🎉' : '📚'}
                  </div>
                  <h2 className="cp-quiz-finished-title">Kuis Selesai!</h2>
                  <div className="cp-quiz-score-ring">
                    <svg viewBox="0 0 120 120" width="120" height="120">
                      <circle cx="60" cy="60" r="50" fill="none" stroke="#3e4143" strokeWidth="8" />
                      <circle cx="60" cy="60" r="50" fill="none" stroke="#f59e0b" strokeWidth="8"
                        strokeLinecap="round"
                        strokeDasharray={`${(getQuizScore() / activeQuiz.questions.length) * 314} 314`}
                        transform="rotate(-90 60 60)" />
                    </svg>
                    <div className="cp-quiz-score-text">
                      <span className="cp-quiz-score-num">{getQuizScore()}/{activeQuiz.questions.length}</span>
                      <span className="cp-quiz-score-label">Benar</span>
                    </div>
                  </div>
                  <p className="cp-quiz-finished-msg">
                    {getQuizScore() === activeQuiz.questions.length
                      ? 'Sempurna! Anda menguasai materi ini dengan sangat baik.'
                      : getQuizScore() >= Math.ceil(activeQuiz.questions.length / 2)
                      ? 'Bagus! Anda memahami sebagian besar materi. Tinjau jawaban yang salah.'
                      : 'Teruslah berlatih! Tinjau kembali materi section ini sebelum melanjutkan.'}
                  </p>
                  <div className="cp-quiz-finished-actions">
                    <button className="cp-quiz-retry-btn" onClick={() => {
                      setCurrentQuestionIdx(0); setSelectedAnswer(null);
                      setShowResult(false); setQuizAnswers({}); setQuizFinished(false);
                    }}>Ulangi Kuis</button>
                    <button className="cp-quiz-continue-btn" onClick={() => { setQuizMode(false); setActiveQuiz(null); }}>
                      Lanjutkan Belajar →
                    </button>
                  </div>
                </div>
              ) : (() => {
                const q = activeQuiz.questions[currentQuestionIdx];
                const correct = isCorrectAnswer();
                return (
                  <>
                    <div className="cp-quiz-header">
                      <FileText size={18} className="cp-quiz-header-icon" />
                      <span className="cp-quiz-header-title">{activeQuiz.title}</span>
                    </div>
                    <div className="cp-quiz-body">
                      <p className="cp-quiz-qnum">Soal {currentQuestionIdx + 1}:</p>
                      <p className="cp-quiz-question">{q.question}</p>

                      {q.type === 'truefalse' && (
                        <div className="cp-quiz-options">
                          {[true, false].map((val) => {
                            const label = val ? 'Benar' : 'Salah';
                            const isSelected = selectedAnswer === val;
                            const isCorrectOpt = showResult && val === q.correct;
                            const isWrongOpt = showResult && isSelected && val !== q.correct;
                            return (
                              <button key={label}
                                className={`cp-quiz-option ${isSelected ? 'cp-quiz-option--selected' : ''} ${isCorrectOpt ? 'cp-quiz-option--correct' : ''} ${isWrongOpt ? 'cp-quiz-option--wrong' : ''}`}
                                onClick={() => handleAnswerSelect(val)} disabled={showResult}>
                                <span className="cp-quiz-radio" />
                                <span>{label}</span>
                                {isCorrectOpt && <Check size={16} className="cp-quiz-opt-icon" />}
                                {isWrongOpt && <X size={16} className="cp-quiz-opt-icon cp-quiz-opt-icon--wrong" />}
                              </button>
                            );
                          })}
                        </div>
                      )}

                      {q.type === 'multiple' && (
                        <div className="cp-quiz-options">
                          {q.options.map((opt, idx) => {
                            const isSelected = selectedAnswer === idx;
                            const isCorrectOpt = showResult && idx === q.correct;
                            const isWrongOpt = showResult && isSelected && idx !== q.correct;
                            return (
                              <button key={idx}
                                className={`cp-quiz-option ${isSelected ? 'cp-quiz-option--selected' : ''} ${isCorrectOpt ? 'cp-quiz-option--correct' : ''} ${isWrongOpt ? 'cp-quiz-option--wrong' : ''}`}
                                onClick={() => handleAnswerSelect(idx)} disabled={showResult}>
                                <span className="cp-quiz-option-letter">{String.fromCharCode(65 + idx)}.</span>
                                <span>{opt}</span>
                                {isCorrectOpt && <Check size={16} className="cp-quiz-opt-icon" />}
                                {isWrongOpt && <X size={16} className="cp-quiz-opt-icon cp-quiz-opt-icon--wrong" />}
                              </button>
                            );
                          })}
                        </div>
                      )}

                      {showResult && (
                        <div className={`cp-quiz-explanation ${correct ? 'cp-quiz-explanation--correct' : 'cp-quiz-explanation--wrong'}`}>
                          <strong>{correct ? '✓ Benar!' : '✗ Kurang tepat.'}</strong>
                          <p>{q.explanation}</p>
                        </div>
                      )}
                    </div>
                    <div className="cp-quiz-footer">
                      <span className="cp-quiz-progress">Soal {currentQuestionIdx + 1} dari {activeQuiz.questions.length}</span>
                      <div className="cp-quiz-footer-actions">
                        {!showResult ? (
                          <>
                            <button className="cp-quiz-skip-btn" onClick={handleSkipQuestion}>Lewati soal</button>
                            <button className={`cp-quiz-check-btn ${selectedAnswer !== null ? 'cp-quiz-check-btn--active' : ''}`}
                              onClick={handleCheckAnswer} disabled={selectedAnswer === null}>Periksa jawaban</button>
                          </>
                        ) : (
                          <button className="cp-quiz-next-btn" onClick={handleNextQuestion}>
                            {currentQuestionIdx + 1 < activeQuiz.questions.length ? 'Soal Berikutnya →' : 'Lihat Hasil'}
                          </button>
                        )}
                      </div>
                    </div>
                  </>
                );
              })()}
            </div>
          ) : (
          <div
            ref={playerContainerRef}
            className={`cp-video-wrapper ${isFullscreen ? 'cp-video-wrapper--fs' : ''}`}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => playing && setShowControls(false)}
          >
            <video
              ref={videoRef}
              className="cp-video"
              src={DUMMY_VIDEO}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onEnded={() => setPlaying(false)}
              onClick={togglePlay}
              playsInline
            />

            {/* Play overlay (when paused) */}
            {!playing && currentTime === 0 && (
              <div className="cp-play-overlay" onClick={togglePlay}>
                <div className="cp-play-overlay-btn">
                  <Play size={44} fill="white" color="white" />
                </div>
              </div>
            )}

            {/* Controls */}
            <div className={`cp-controls ${showControls || !playing ? 'cp-controls--visible' : ''}`}>
              {/* Progress bar */}
              <div className="cp-progress-container">
                <div
                  ref={progressRef}
                  className="cp-progress-bar"
                  onClick={handleProgressClick}
                >
                  <div className="cp-progress-buffered" style={{ width: `${(buffered / duration) * 100}%` }} />
                  <div className="cp-progress-filled" style={{ width: `${(currentTime / duration) * 100}%` }}>
                    <div className="cp-progress-knob" />
                  </div>
                  {/* Note markers */}
                  {savedNotes.map(note => (
                    <div
                      key={note.id}
                      className="cp-progress-marker"
                      style={{ left: `${(note.time / duration) * 100}%` }}
                      title={note.text}
                    />
                  ))}
                </div>
              </div>

              {/* Controls row */}
              <div className="cp-controls-row">
                <div className="cp-controls-left">
                  <button className="cp-ctrl-btn" onClick={togglePlay}>
                    {playing ? <Pause size={22} fill="white" color="white" /> : <Play size={22} fill="white" color="white" />}
                  </button>
                  <button className="cp-ctrl-btn" onClick={() => handleSeek(-5)} title="Mundur 5 detik">
                    <RotateCcw size={18} />
                    <span className="cp-seek-label">5</span>
                  </button>
                  <button className="cp-ctrl-btn" onClick={() => handleSeek(5)} title="Maju 5 detik">
                    <RotateCw size={18} />
                    <span className="cp-seek-label">5</span>
                  </button>

                  {/* Speed control */}
                  <div className="cp-speed-wrapper">
                    <button
                      className="cp-speed-btn"
                      onClick={() => { setShowSpeedMenu(!showSpeedMenu); setShowSettingsMenu(false); }}
                    >
                      {playbackRate}x
                    </button>
                    {showSpeedMenu && (
                      <div className="cp-speed-menu">
                        {[0.5, 0.75, 1, 1.25, 1.5, 1.75, 2].map(r => (
                          <button
                            key={r}
                            className={`cp-speed-opt ${playbackRate === r ? 'cp-speed-opt--active' : ''}`}
                            onClick={() => changePlaybackRate(r)}
                          >
                            {r}x
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Time */}
                  <span className="cp-time">
                    {formatTime(currentTime)} <span className="cp-time-sep">/</span> {formatTime(duration)}
                  </span>
                </div>

                <div className="cp-controls-right">
                  {/* Note button */}
                  <button className="cp-ctrl-btn" onClick={() => { setActiveTab('notes'); setSidebarOpen(false); }} title="Tambah catatan">
                    <PenLine size={17} />
                  </button>

                  {/* Volume */}
                  <div className="cp-volume-wrapper">
                    <button className="cp-ctrl-btn" onClick={toggleMute}>
                      {muted || volume === 0 ? <VolumeX size={20} /> : <Volume2 size={20} />}
                    </button>
                    <div ref={volumeRef} className="cp-volume-slider" onClick={handleVolumeClick}>
                      <div className="cp-volume-track">
                        <div className="cp-volume-fill" style={{ width: `${(muted ? 0 : volume) * 100}%` }} />
                      </div>
                    </div>
                  </div>

                  {/* Fullscreen */}
                  <button className="cp-ctrl-btn" onClick={toggleFullscreen}>
                    {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
                  </button>

                  {/* Toggle sidebar */}
                  <div className="cp-ctrl-divider" />
                  <button
                    className="cp-ctrl-btn cp-sidebar-toggle"
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    title={sidebarOpen ? 'Tutup konten kelas' : 'Buka konten kelas'}
                  >
                    {sidebarOpen ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
                  </button>
                </div>
              </div>
            </div>
          </div>
          )} {/* end quiz ternary */}

          {/* ─── TABS AREA (below video) ─── */}
          <div className="cp-tabs-area">
            <div className="cp-tabs-nav">
              <button className="cp-tab-search-btn">
                <Search size={18} />
              </button>
              {[
                { id: 'overview', label: 'Ringkasan' },
                { id: 'qa', label: 'Tanya Jawab' },
                { id: 'notes', label: 'Catatan' },
                { id: 'announcements', label: 'Pengumuman' },
                { id: 'reviews', label: 'Ulasan' },
                { id: 'learning-tools', label: 'Alat Belajar' },
              ].map(tab => (
                <button
                  key={tab.id}
                  className={`cp-tab-btn ${activeTab === tab.id ? 'cp-tab-btn--active' : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="cp-tab-content">
              {/* ── OVERVIEW TAB ── */}
              {activeTab === 'overview' && (
                <div className="cp-overview">
                  {/* What you'll learn */}
                  <div className="cp-learn-box">
                    <h2 className="cp-section-title">Yang akan Anda pelajari</h2>
                    <div className="cp-learn-grid">
                      {courseData.whatYouWillLearn.map((item, i) => (
                        <div key={i} className="cp-learn-item">
                          <Check size={16} className="cp-learn-check" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Course description */}
                  <div className="cp-desc-section">
                    <h2 className="cp-section-title">Deskripsi</h2>
                    <p className="cp-desc-text">{courseData.description}</p>
                  </div>

                  {/* Course stats */}
                  <div className="cp-stats-bar">
                    <div className="cp-stat">
                      <Clock size={16} />
                      <span>{courseData.totalDuration} total</span>
                    </div>
                    <div className="cp-stat">
                      <PlayCircle size={16} />
                      <span>{courseData.totalLectures} materi</span>
                    </div>
                    <div className="cp-stat">
                      <BarChart3 size={16} />
                      <span>{courseData.level}</span>
                    </div>
                    <div className="cp-stat">
                      <Globe size={16} />
                      <span>{courseData.language}</span>
                    </div>
                    <div className="cp-stat">
                      <Info size={16} />
                      <span>Updated {courseData.lastUpdated}</span>
                    </div>
                  </div>

                  {/* Instructor */}
                  <div className="cp-instructor-section">
                    <h2 className="cp-section-title">Instructor</h2>
                    <div className="cp-instructor-card">
                      <div className="cp-instructor-avatar">
                        <span className="cp-avatar-initials">JE</span>
                      </div>
                      <div className="cp-instructor-info">
                        <h3 className="cp-instructor-name">{courseData.instructor.name}</h3>
                        <p className="cp-instructor-title">{courseData.instructor.title}</p>
                        <div className="cp-instructor-stats">
                          <span><Star size={14} fill="#f69c08" color="#f69c08" /> {courseData.instructor.rating} Rating</span>
                          <span><MessageSquare size={14} /> {courseData.instructor.reviews.toLocaleString()} Reviews</span>
                          <span><Users size={14} /> {courseData.instructor.students.toLocaleString()} Students</span>
                          <span><PlayCircle size={14} /> {courseData.instructor.courses} Courses</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ── Q&A TAB ── */}
              {activeTab === 'qa' && (
                <div className="cp-qa">
                  <div className="cp-qa-header">
                    <div className="cp-qa-filters">
                      <select className="cp-qa-select">
                        <option>Semua lectures</option>
                        <option>Lecture ini</option>
                      </select>
                      <select className="cp-qa-select">
                        <option>Urutkan: Terbaru</option>
                        <option>Votes terbanyak</option>
                        <option>Belum dijawab</option>
                      </select>
                    </div>
                    <div className="cp-qa-search">
                      <Search size={16} />
                      <input
                        type="text"
                        placeholder="Cari pertanyaan..."
                        value={qaSearchQuery}
                        onChange={(e) => setQaSearchQuery(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Ask question */}
                  <div className="cp-qa-ask">
                    <div className="cp-qa-ask-avatar"><span>A</span></div>
                    <div className="cp-qa-ask-input">
                      <input
                        type="text"
                        placeholder="Ajukan pertanyaan baru..."
                        value={qaQuestion}
                        onChange={(e) => setQaQuestion(e.target.value)}
                      />
                      {qaQuestion && (
                        <button className="cp-qa-ask-btn">Kirim</button>
                      )}
                    </div>
                  </div>

                  {/* Questions list */}
                  <div className="cp-qa-list">
                    {qaData.map(q => (
                      <div key={q.id} className="cp-qa-item">
                        <div className="cp-qa-votes">
                          <button className="cp-qa-vote-btn"><ThumbsUp size={14} /></button>
                          <span className="cp-qa-vote-count">{q.votes}</span>
                        </div>
                        <div className="cp-qa-body">
                          <p className="cp-qa-question">{q.question}</p>
                          <div className="cp-qa-meta">
                            <span className="cp-qa-author">{q.user}</span>
                            <span className="cp-qa-dot">·</span>
                            <span className="cp-qa-time">{q.time}</span>
                            <span className="cp-qa-dot">·</span>
                            <span className="cp-qa-answers">{q.answers} jawaban</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ── NOTES TAB ── */}
              {activeTab === 'notes' && (
                <div className="cp-notes">
                  <div className="cp-notes-header">
                    <h2 className="cp-section-title" style={{ margin: 0 }}>Catatan Anda</h2>
                    <div className="cp-notes-filter">
                      <select value={noteFilter} onChange={(e) => setNoteFilter(e.target.value)} className="cp-qa-select">
                        <option value="current">Lecture ini</option>
                        <option value="all">Semua lecture</option>
                      </select>
                    </div>
                  </div>

                  {/* Note editor */}
                  <div className="cp-note-editor">
                    <button className="cp-note-timestamp" onClick={() => seekToTime(currentTime)}>
                      {formatTime(currentTime)}
                    </button>
                    <div className="cp-note-input-wrapper">
                      <textarea
                        className="cp-note-textarea"
                        placeholder="Tulis catatan baru..."
                        value={noteText}
                        onChange={(e) => setNoteText(e.target.value)}
                        rows={3}
                      />
                      {noteText && (
                        <div className="cp-note-actions">
                          <button className="cp-note-cancel" onClick={() => setNoteText('')}>Batal</button>
                          <button className="cp-note-save" onClick={handleSaveNote}>Simpan</button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Saved notes */}
                  <div className="cp-notes-list">
                    {savedNotes.map(note => (
                      <div key={note.id} className="cp-note-item">
                        <button className="cp-note-timestamp cp-note-timestamp--saved" onClick={() => seekToTime(note.time)}>
                          {formatTime(note.time)}
                        </button>
                        <div className="cp-note-content">
                          <p>{note.text}</p>
                          <div className="cp-note-item-actions">
                            <button onClick={() => handleDeleteNote(note.id)} title="Hapus catatan">
                              <X size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                    {savedNotes.length === 0 && (
                      <div className="cp-notes-empty">
                        <PenLine size={32} />
                        <p>Belum ada catatan. Mulai catat poin penting!</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* ── ANNOUNCEMENTS TAB ── */}
              {activeTab === 'announcements' && (
                <div className="cp-announcements">
                  <div className="cp-announcement-item">
                    <div className="cp-announcement-avatar"><span>JE</span></div>
                    <div className="cp-announcement-body">
                      <div className="cp-announcement-header">
                        <strong>Dr. Jonathan Edwards</strong>
                        <span className="cp-announcement-date">3 hari yang lalu</span>
                      </div>
                      <p className="cp-announcement-text">
                        Shalom! Saya baru saja menambahkan materi bonus tentang "Sejarah Pengakuan Iman Nicea" di Section 2. 
                        Semoga bisa memperkaya pemahaman Anda tentang doktrin Trinitas. Tuhan memberkati!
                      </p>
                      <div className="cp-announcement-actions">
                        <button><ThumbsUp size={14} /> <span>24</span></button>
                        <button><MessageSquare size={14} /> <span>5 komentar</span></button>
                      </div>
                    </div>
                  </div>
                  <div className="cp-announcement-item">
                    <div className="cp-announcement-avatar"><span>JE</span></div>
                    <div className="cp-announcement-body">
                      <div className="cp-announcement-header">
                        <strong>Dr. Jonathan Edwards</strong>
                        <span className="cp-announcement-date">2 minggu yang lalu</span>
                      </div>
                      <p className="cp-announcement-text">
                        Update: Section 5 tentang Pneumatologi telah diperbaharui dengan studi kasus kontemporer. 
                        Jangan lupa untuk mengerjakan kuis di akhir setiap section!
                      </p>
                      <div className="cp-announcement-actions">
                        <button><ThumbsUp size={14} /> <span>18</span></button>
                        <button><MessageSquare size={14} /> <span>3 komentar</span></button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ── REVIEWS TAB ── */}
              {activeTab === 'reviews' && (
                <div className="cp-reviews">
                  {/* Rating summary */}
                  <div className="cp-reviews-summary">
                    <div className="cp-reviews-big-number">
                      <span className="cp-big-rating">{courseData.rating}</span>
                      <div className="cp-big-stars">{renderStars(courseData.rating)}</div>
                      <span className="cp-rating-label">Rating Kelas</span>
                    </div>
                    <div className="cp-rating-bars">
                      {ratingDistribution.map(r => (
                        <div key={r.stars} className="cp-rating-bar-row">
                          <div className="cp-rating-bar-track">
                            <div className="cp-rating-bar-fill" style={{ width: `${r.percent}%` }} />
                          </div>
                          <div className="cp-rating-bar-stars">
                            {renderStars(r.stars)}
                          </div>
                          <span className="cp-rating-bar-pct">{r.percent}%</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Review items */}
                  <div className="cp-reviews-list">
                    {reviewsData.map(review => (
                      <div key={review.id} className="cp-review-item">
                        <div className="cp-review-avatar"><span>{review.name[0]}</span></div>
                        <div className="cp-review-body">
                          <div className="cp-review-header">
                            <strong>{review.name}</strong>
                            <div className="cp-review-stars">{renderStars(review.rating)}</div>
                            <span className="cp-review-date">{review.date}</span>
                          </div>
                          <p className="cp-review-text">{review.text}</p>
                          <div className="cp-review-footer">
                            <button className="cp-review-helpful">
                              <ThumbsUp size={14} />
                              <span>Helpful ({review.helpful})</span>
                            </button>
                            <button className="cp-review-report">
                              <Flag size={14} />
                              <span>Report</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ── LEARNING TOOLS TAB ── */}
              {activeTab === 'learning-tools' && (
                <div className="cp-learning-tools">
                  <h2 className="cp-section-title">Learning reminders</h2>
                  <p className="cp-lt-desc">
                    Belajar sedikit setiap hari akan terakumulasi. Riset menunjukkan bahwa siswa yang menjadikan belajar sebagai kebiasaan lebih mungkin mencapai tujuan mereka. Atur waktu belajar dan dapatkan pengingat.
                  </p>

                  <div className="cp-reminder-card">
                    <div className="cp-reminder-icon">
                      <Clock size={24} />
                    </div>
                    <div className="cp-reminder-info">
                      <strong>12:00 PM</strong>
                      <span>Setiap Selasa & Kamis</span>
                    </div>
                    <button className="cp-reminder-more"><MoreVertical size={18} /></button>
                  </div>

                  <div className="cp-reminder-card">
                    <div className="cp-reminder-icon">
                      <Bell size={24} />
                    </div>
                    <div className="cp-reminder-info">
                      <strong>Push notification</strong>
                      <span>Aktif</span>
                    </div>
                    <div className="cp-toggle-switch">
                      <input type="checkbox" defaultChecked id="notif-toggle" />
                      <label htmlFor="notif-toggle"></label>
                    </div>
                  </div>

                  <button className="cp-add-reminder-btn">
                    <Plus size={18} /> Tambah reminder
                  </button>

                  <div className="cp-lt-shortcuts">
                    <h3 className="cp-section-subtitle">Keyboard Shortcuts</h3>
                    <div className="cp-shortcut-grid">
                      <div className="cp-shortcut"><kbd>Space</kbd>/<kbd>K</kbd> <span>Play/Pause</span></div>
                      <div className="cp-shortcut"><kbd>←</kbd>/<kbd>→</kbd> <span>Mundur/Maju 5 detik</span></div>
                      <div className="cp-shortcut"><kbd>↑</kbd>/<kbd>↓</kbd> <span>Volume</span></div>
                      <div className="cp-shortcut"><kbd>F</kbd> <span>Fullscreen</span></div>
                      <div className="cp-shortcut"><kbd>M</kbd> <span>Mute</span></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ─── SIDEBAR (Course Content) ─── */}
        {sidebarOpen && (
          <aside className="cp-sidebar">
            <div className="cp-sidebar-header">
              <h2>Course content</h2>
              <button className="cp-sidebar-close" onClick={() => setSidebarOpen(false)}>
                <X size={18} />
              </button>
            </div>

            {/* Progress bar in sidebar */}
            <div className="cp-sidebar-progress">
              <div className="cp-sidebar-progress-bar">
                <div className="cp-sidebar-progress-fill" style={{ width: `${progressPercent}%` }} />
              </div>
              <span className="cp-sidebar-progress-text">{completedLectures}/{totalLectures} lectures selesai</span>
            </div>

            {/* Accordion */}
            <div className="cp-accordion">
              {courseSections.map((section, sIdx) => (
                <div key={sIdx} className="cp-accordion-section">
                  <button
                    className="cp-accordion-header"
                    onClick={() => toggleSection(sIdx)}
                  >
                    <div className="cp-accordion-header-left">
                      {expandedSections[sIdx] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      <div>
                        <strong className="cp-accordion-title">{section.title}</strong>
                        <span className="cp-accordion-meta">
                          {section.lectures.filter(l => l.completed).length}/{section.lectureCount} | {section.totalDuration}
                        </span>
                      </div>
                    </div>
                  </button>
                  {expandedSections[sIdx] && (
                    <div className="cp-accordion-body">
                      {section.lectures.map((item) => (
                        <button
                          key={item.id}
                          className={`cp-lecture-item ${
                            item.type === 'quiz'
                              ? (activeQuiz?.id === item.id ? 'cp-lecture-item--active cp-lecture-item--quiz' : 'cp-lecture-item--quiz')
                              : (activeLecture === item.id ? 'cp-lecture-item--active' : '')
                          }`}
                          onClick={() => handleLectureClick(item)}
                        >
                          <div className="cp-lecture-check">
                            {item.completed ? (
                              <CheckCircle size={16} className="cp-check-done" />
                            ) : item.type === 'quiz' ? (
                              <FileText size={15} className="cp-quiz-sidebar-icon" />
                            ) : (
                              <input type="checkbox" className="cp-lecture-checkbox" checked={false} readOnly
                                onClick={(e) => e.stopPropagation()} />
                            )}
                          </div>
                          <div className="cp-lecture-info">
                            <span className="cp-lecture-title">{item.title}</span>
                            <div className="cp-lecture-meta">
                              {item.type === 'quiz' ? (
                                <><FileText size={12} /><span>{item.questions.length} soal</span></>
                              ) : (
                                <><PlayCircle size={12} /><span>{item.duration}</span></>
                              )}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </aside>
        )}
      </div>
    </div>
  );
};

export default CoursePlayer;
