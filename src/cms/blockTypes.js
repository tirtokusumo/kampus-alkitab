/**
 * Block Types — CMS Kampus Alkitab
 * Defines available block types and their default data for the Block Editor.
 */

export const BLOCK_TYPES = {
  hero: {
    label: 'Hero Banner',
    icon: '🎯',
    description: 'Banner utama dengan judul besar, deskripsi, dan tombol CTA',
  },
  text: {
    label: 'Teks & Paragraf',
    icon: '📝',
    description: 'Heading dan paragraf teks',
  },
  image_text: {
    label: 'Gambar + Teks',
    icon: '🖼️',
    description: 'Gambar di samping teks (kiri/kanan)',
  },
  cta: {
    label: 'Call to Action',
    icon: '🔗',
    description: 'Banner ajakan (judul, deskripsi, tombol)',
  },
  features_grid: {
    label: 'Fitur Grid',
    icon: '⚡',
    description: 'Grid kartu fitur/keunggulan (ikon + teks)',
  },
  testimonials: {
    label: 'Testimoni',
    icon: '💬',
    description: 'Daftar testimoni pengguna',
  },
  stats: {
    label: 'Statistik',
    icon: '📊',
    description: 'Angka statistik (counter bar)',
  },
  spacer: {
    label: 'Spacer',
    icon: '↕️',
    description: 'Jarak kosong antar blok',
  },
};

/** Generate default data for a new block of the given type */
export function getDefaultBlockData(type) {
  const base = { id: 'block-' + Date.now() + '-' + Math.random().toString(36).slice(2, 6), type };

  switch (type) {
    case 'hero':
      return {
        ...base,
        heading: 'Judul Utama',
        subheading: 'Deskripsi singkat di bawah judul.',
        ctaText: 'Mulai Sekarang',
        ctaLink: '/register',
        secondaryText: 'Pelajari Lebih Lanjut',
        secondaryLink: '#features',
        backgroundImage: '',
        overlay: true,
      };

    case 'text':
      return {
        ...base,
        heading: 'Heading Section',
        body: 'Tulis paragraf konten Anda di sini. Gunakan dua baris kosong untuk membuat paragraf baru.',
        alignment: 'left',
      };

    case 'image_text':
      return {
        ...base,
        heading: 'Judul Section',
        body: 'Deskripsi atau penjelasan detail tentang topik ini.',
        imageUrl: 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?auto=format&fit=crop&q=80&w=600',
        imagePosition: 'left',
        ctaText: '',
        ctaLink: '',
      };

    case 'cta':
      return {
        ...base,
        heading: 'Siap Memulai?',
        body: 'Daftar sekarang dan mulai perjalanan rohanimu.',
        ctaText: 'Daftar Gratis',
        ctaLink: '/register',
        secondaryText: 'Masuk',
        secondaryLink: '/login',
        variant: 'primary',
      };

    case 'features_grid':
      return {
        ...base,
        heading: 'Mengapa Memilih Kami?',
        subheading: '',
        features: [
          { icon: '📖', title: 'Kurikulum Alkitabiah', desc: 'Materi yang dikurasi para teolog berpengalaman.' },
          { icon: '🏆', title: 'Sertifikasi Resmi', desc: 'Sertifikat diakui gereja dan lembaga.' },
          { icon: '🌍', title: 'Belajar Kapan Saja', desc: 'Akses 24/7 dari perangkat apa pun.' },
          { icon: '👥', title: 'Komunitas Iman', desc: 'Bergabung dengan ribuan murid Kristus.' },
        ],
      };

    case 'testimonials':
      return {
        ...base,
        heading: 'Apa Kata Mereka',
        testimonials: [
          { name: 'Nama Lengkap', role: 'Jabatan / Gereja', quote: 'Tuliskan testimoni di sini.', avatar: '' },
        ],
      };

    case 'stats':
      return {
        ...base,
        stats: [
          { number: '1.000+', label: 'Murid Aktif' },
          { number: '50+', label: 'Kelas Tersedia' },
          { number: '20+', label: 'Pengajar' },
          { number: '98%', label: 'Kepuasan' },
        ],
      };

    case 'spacer':
      return { ...base, height: 48 };

    default:
      return base;
  }
}
