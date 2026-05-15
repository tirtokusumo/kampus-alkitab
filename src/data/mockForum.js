export const allDiscussions = [
  { id: 1, title: 'Bagaimana kamu mempraktikkan doa harian?', author: 'Sarah W.', category: 'Pertumbuhan Rohani', comments: 45, likes: 32, image: 'https://images.unsplash.com/photo-1508558936510-0af1e3cccbab?auto=format&fit=crop&q=80&w=600&h=400', content: 'Halo teman-teman! Saya akhir-akhir ini merasa kesulitan untuk konsisten dalam doa harian. Kadang terlalu sibuk, kadang merasa kosong saat berdoa. Bagaimana cara kalian menjaga rutinitas doa tetap hidup dan bermakna setiap harinya? Apakah ada jam khusus atau metode tertentu yang kalian gunakan?', timestamp: 'Kemarin, 08:30' },
  { id: 2, title: 'Teologi 101: Kelompok Baca Minggu ke-2', author: 'Dr. John Piper', category: 'Diskusi Kelas', comments: 128, likes: 87, image: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&q=80&w=600&h=400', content: 'Silakan post ringkasan teman-teman untuk bacaan minggu ini mengenai Doktrin Allah.', timestamp: '2 Hari lalu, 14:00' },
  { id: 3, title: 'Saling memperhatikan dalam masa duka', author: 'Moderator Komunitas', category: 'Dukungan & Kepedulian', comments: 32, likes: 54, image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=600&h=400', content: 'Banyak anggota jemaat kita yang kehilangan orang terkasih di bulan ini. Mari kita satukan dukungan.', timestamp: '3 Hari lalu, 10:15' },
];

export const mockComments = {
  1: [
    {
      id: 101,
      author: 'David K.',
      text: 'Saya membiasakan diri bangun 30 menit lebih awal sebelum anak-anak bangun. Saat rumah masih sunyi, itu adalah waktu terbaik buat saya untuk mendengarkan suara Tuhan tanpa distraksi.',
      likes: 12,
      timestamp: 'Kemarin, 10:00',
      replies: [
        {
          id: 102,
          author: 'Sarah W.',
          text: 'Masalahnya saya susah bangun pagi 😂. Tapi mungkin saya bisa coba tidur lebih awal.',
          likes: 4,
          timestamp: 'Kemarin, 11:30',
          replies: [
            {
              id: 103,
              author: 'Fera M.',
              text: 'Kamu nggak sendirian Sarah! Aku tipe night owl. Jadi aku luangkan waktu bukan di pagi hari, tapi di malam hari sebelum tidur. Ingat, Tuhan tidak dibatasi oleh jam dinding!',
              likes: 15,
              timestamp: 'Kemarin, 11:45',
              replies: []
            }
          ]
        }
      ]
    },
    {
      id: 104,
      author: 'Pdt. Budi Santoso',
      text: 'Salah satu metode yang bisa dipakai adalah A-C-T-S (Adoration, Confession, Thanksgiving, Supplication). Kadang kita merasa kosong karena langsung melompat pada permintaan (Supplication). Mulailah dengan menyembah Dia.',
      likes: 45,
      timestamp: 'Kemarin, 15:20',
      replies: [
        {
          id: 105,
          author: 'Yohanes T.',
          text: 'Amin pak Pendeta. Metode ini sangat mengubahkan kehidupan doa saya tahun lalu. Awalnya terasa kaku seperti rumus, tapi lama-lama mengalir otomatis.',
          likes: 8,
          timestamp: 'Hari ini, 06:10',
          replies: []
        }
      ]
    }
  ]
};
