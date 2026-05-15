/**
 * CMS Data Layer — Kampus Alkitab
 * Stores all CMS data in localStorage with sensible defaults.
 */

const CMS_STORAGE_KEY = 'kampus_alkitab_cms';

/* ═══════════════════════════════════════════
   DEFAULT DATA
   ═══════════════════════════════════════════ */

const defaultSiteSettings = {
  siteName: 'Kampus Alkitab',
  tagline: 'Platform pendidikan rohani digital untuk pelayan Tuhan.',
  logoUrl: '/logo-dark.png',
  copyright: '© 2026 Kampus Alkitab · Digital Ministry. Segala kemuliaan bagi Tuhan.',
  metaDescription: 'Kampus Alkitab — Platform LMS Kristen #1 Indonesia. Kelas teologi, kepemimpinan, konseling, dan pelayanan gereja.',
  socialLinks: {
    instagram: 'https://instagram.com',
    youtube: 'https://youtube.com',
    facebook: 'https://facebook.com',
    whatsapp: 'https://wa.me/6281234567890',
    email: 'info@kampusalkitab.com',
  },
};

const defaultTheme = {
  colorPrimary: '#1A237E',
  colorPrimaryLight: '#283593',
  colorPrimaryDark: '#121858',
  colorSecondary: '#FFD700',
  colorSecondaryLight: '#FFE033',
  colorSecondaryDark: '#B39700',
  colorAccent: '#008080',
  colorAccentLight: '#009999',
  colorAccentDark: '#006666',
};

const defaultHeaderMenus = [
  {
    id: 'menu-1',
    label: 'Kelas',
    href: '#courses',
    subs: [
      { label: 'Semua Kelas', to: '/courses' },
      { label: 'Teologi', to: '/courses?category=teologi' },
      { label: 'Kepemimpinan', to: '/courses?category=kepemimpinan' },
      { label: 'Konseling', to: '/courses?category=konseling' },
      { label: 'Praktikal', to: '/courses?category=praktikal' },
    ],
  },
  {
    id: 'menu-2',
    label: 'Sertifikasi',
    href: '/certifications',
    subs: [
      { label: 'Semua Program Sertifikasi', to: '/certifications' },
      { label: 'Certified Sunday School Teacher', to: '/certifications/sunday-school' },
      { label: 'Youth & Teen Ministry Coach', to: '/certifications/youth-teen' },
      { label: 'Christian Counselor', to: '/certifications/christian-counselor' },
      { label: 'Pastoral Care Specialist', to: '/certifications/pastoral-care' },
      { label: 'Worship & Creative Ministry', to: '/certifications/worship-creative' },
      { label: 'Theology & Apologetics', to: '/certifications/theology-apologetics' },
    ],
  },
  {
    id: 'menu-3',
    label: 'Renungan',
    href: '#devotional',
    subs: [
      { label: 'Renungan Harian', to: '/renungan' },
      { label: 'Ayat Hari Ini', to: '/renungan?tab=ayat' },
      { label: 'Arsip Renungan', to: '/renungan?tab=arsip' },
    ],
  },
  {
    id: 'menu-4',
    label: 'Acara',
    href: '#events',
    subs: [
      { label: 'Konferensi', to: '/acara' },
      { label: 'Study Bible Club', to: '/acara/study-bible-club' },
      { label: 'New Life Camp', to: '/acara/new-life-camp' },
      { label: 'Seminar Online', to: '/acara?tab=seminar' },
      { label: 'Workshop', to: '/acara?tab=workshop' },
    ],
  },
  {
    id: 'menu-5',
    label: 'Komunitas',
    href: '#prayer',
    subs: [
      { label: 'MinistryHub — Volunteer', to: '/ministry-hub' },
      { label: 'Forum Diskusi', to: '/community' },
      { label: 'Kelompok Kecil', to: '/community/small-groups' },
      { label: 'Doa Bersama', to: '/doa' },
    ],
  },
  {
    id: 'menu-6',
    label: 'Tentang Kami',
    href: '/tentang',
    subs: [
      { label: 'Visi & Misi', to: '/tentang' },
      { label: 'Tim Pengajar', to: '/tentang?section=pengajar' },
      { label: 'Bermitra', to: '/tentang?section=bermitra' },
      { label: 'Doctrinal Transparency', to: '/tentang?section=doktrin' },
    ],
  },
  {
    id: 'menu-7',
    label: 'Store',
    href: '#resources',
    subs: [
      { label: 'Jelajahi Toko', to: '/toko' },
      { label: 'Buku & E-Book', to: '/toko' },
      { label: 'Merchandise', to: '/toko' },
      { label: 'Kaos & Apparel', to: '/toko' },
    ],
  },
];

const defaultFooterMenus = [
  {
    id: 'fcol-1',
    title: 'Belajar',
    links: [
      { label: 'Katalog Kelas', to: '/courses' },
      { label: 'Sertifikasi', to: '/certifications' },
      { label: 'Renungan', to: '/renungan' },
      { label: 'Toko Sumber Daya', to: '/toko' },
    ],
  },
  {
    id: 'fcol-2',
    title: 'Komunitas',
    links: [
      { label: 'Acara', to: '/acara' },
      { label: 'MinistryHub', to: '/ministry-hub' },
      { label: 'Forum Diskusi', to: '/community' },
      { label: 'Tentang Kami', to: '/tentang' },
    ],
  },
  {
    id: 'fcol-3',
    title: 'Bantuan',
    links: [
      { label: 'Masuk', to: '/login' },
      { label: 'Daftar', to: '/register' },
      { label: 'Hubungi Kami', to: 'mailto:info@kampusalkitab.com' },
      { label: 'Kebijakan Privasi', to: '#' },
    ],
  },
];

const defaultPages = [
  { id: 'page-landing', title: 'Landing Page', slug: '/', status: 'published', createdAt: '2026-01-01', blocks: [] },
  { id: 'page-courses', title: 'Kelas', slug: '/courses', status: 'published', createdAt: '2026-01-01', blocks: [] },
  { id: 'page-tentang', title: 'Tentang Kami', slug: '/tentang', status: 'published', createdAt: '2026-01-01', blocks: [] },
  { id: 'page-renungan', title: 'Renungan', slug: '/renungan', status: 'published', createdAt: '2026-01-01', blocks: [] },
  { id: 'page-acara', title: 'Acara', slug: '/acara', status: 'published', createdAt: '2026-01-01', blocks: [] },
  { id: 'page-toko', title: 'Resource Store', slug: '/toko', status: 'published', createdAt: '2026-01-01', blocks: [] },
  { id: 'page-community', title: 'Komunitas', slug: '/community', status: 'published', createdAt: '2026-01-01', blocks: [] },
  { id: 'page-ministry', title: 'MinistryHub', slug: '/ministry-hub', status: 'published', createdAt: '2026-01-01', blocks: [] },
  { id: 'page-certifications', title: 'Sertifikasi', slug: '/certifications', status: 'published', createdAt: '2026-01-01', blocks: [] },
];

const defaultCmsData = {
  siteSettings: defaultSiteSettings,
  theme: defaultTheme,
  headerMenus: defaultHeaderMenus,
  footerMenus: defaultFooterMenus,
  pages: defaultPages,
  media: [],
};

/* ═══════════════════════════════════════════
   CRUD HELPERS
   ═══════════════════════════════════════════ */

/** Load CMS data from localStorage, merge with defaults */
export function getCmsData() {
  try {
    const raw = localStorage.getItem(CMS_STORAGE_KEY);
    if (!raw) return { ...defaultCmsData };
    const parsed = JSON.parse(raw);
    // Merge with defaults so new fields are always present
    return {
      siteSettings: { ...defaultSiteSettings, ...parsed.siteSettings },
      theme: { ...defaultTheme, ...parsed.theme },
      headerMenus: parsed.headerMenus || defaultHeaderMenus,
      footerMenus: parsed.footerMenus || defaultFooterMenus,
      pages: parsed.pages || defaultPages,
      media: parsed.media || [],
    };
  } catch {
    return { ...defaultCmsData };
  }
}

/** Save entire CMS data to localStorage */
export function saveCmsData(data) {
  try {
    localStorage.setItem(CMS_STORAGE_KEY, JSON.stringify(data));
    return true;
  } catch (e) {
    console.error('CMS save failed:', e);
    return false;
  }
}

/** Get default data (for reset) */
export function getDefaultCmsData() {
  return { ...defaultCmsData };
}

/** Get default theme */
export function getDefaultTheme() {
  return { ...defaultTheme };
}

/* ── Site Settings ── */
export function updateSiteSettings(data, updates) {
  const next = { ...data, siteSettings: { ...data.siteSettings, ...updates } };
  saveCmsData(next);
  return next;
}

/* ── Theme ── */
export function updateTheme(data, themeUpdates) {
  const next = { ...data, theme: { ...data.theme, ...themeUpdates } };
  saveCmsData(next);
  return next;
}

/* ── Header Menus ── */
export function updateHeaderMenus(data, menus) {
  const next = { ...data, headerMenus: menus };
  saveCmsData(next);
  return next;
}

/* ── Footer Menus ── */
export function updateFooterMenus(data, menus) {
  const next = { ...data, footerMenus: menus };
  saveCmsData(next);
  return next;
}

/* ── Pages CRUD ── */
export function addPage(data, page) {
  const newPage = {
    id: 'page-' + Date.now(),
    title: page.title || 'New Page',
    slug: page.slug || '/new-page',
    status: page.status || 'draft',
    createdAt: new Date().toISOString().split('T')[0],
  };
  const next = { ...data, pages: [...data.pages, newPage] };
  saveCmsData(next);
  return next;
}

export function updatePage(data, pageId, updates) {
  const next = {
    ...data,
    pages: data.pages.map(p => p.id === pageId ? { ...p, ...updates } : p),
  };
  saveCmsData(next);
  return next;
}

export function deletePage(data, pageId) {
  const next = { ...data, pages: data.pages.filter(p => p.id !== pageId) };
  saveCmsData(next);
  return next;
}

/** Update blocks for a specific page */
export function updatePageBlocks(data, pageId, blocks) {
  const next = {
    ...data,
    pages: data.pages.map(p =>
      p.id === pageId ? { ...p, blocks: blocks } : p
    ),
  };
  saveCmsData(next);
  return next;
}

/* ── Media ── */
export function addMedia(data, mediaItem) {
  const item = {
    id: 'media-' + Date.now(),
    name: mediaItem.name,
    url: mediaItem.url,
    type: mediaItem.type || 'image',
    addedAt: new Date().toISOString(),
  };
  const next = { ...data, media: [...data.media, item] };
  saveCmsData(next);
  return next;
}

export function deleteMedia(data, mediaId) {
  const next = { ...data, media: data.media.filter(m => m.id !== mediaId) };
  saveCmsData(next);
  return next;
}

/** Apply theme CSS variables to document */
export function applyThemeToDOM(theme) {
  const root = document.documentElement;
  if (!theme) return;
  const mapping = {
    colorPrimary: '--color-primary',
    colorPrimaryLight: '--color-primary-light',
    colorPrimaryDark: '--color-primary-dark',
    colorSecondary: '--color-secondary',
    colorSecondaryLight: '--color-secondary-light',
    colorSecondaryDark: '--color-secondary-dark',
    colorAccent: '--color-accent',
    colorAccentLight: '--color-accent-light',
    colorAccentDark: '--color-accent-dark',
  };
  Object.entries(mapping).forEach(([key, cssVar]) => {
    if (theme[key]) {
      root.style.setProperty(cssVar, theme[key]);
    }
  });
}
