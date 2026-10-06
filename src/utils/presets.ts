export interface Preset {
  title: string;
  category: string;
  subject: string;
  icon?: string;
  content: string;
}

export const PRESETS: Preset[] = [
  // 1. IPA (Biologi)
  {
    title: 'IPA (Biologi) - Fotosintesis & Sel Tumbuhan',
    category: 'IPA (Sains)',
    subject: 'IPA',
    icon: '🌿',
    content: `FOTOSINTESIS Proses pembuatan makanan pada tumbuhan hijau dengan bantuan cahaya matahari
KLOROFIL Zat hijau daun yang menyerap energi cahaya matahari
MITOKONDRIA Organel sel yang berfungsi sebagai pusat penghasil energi
OKSIGEN Gas hasil fotosintesis yang dibutuhkan makhluk hidup untuk bernapas
STOMATA Pori-pori atau mulut daun tempat pertukaran gas
OSMOSIS Perpindahan molekul air menembus membran semipermeabel
GENETIKA Cabang ilmu biologi yang mempelajari pewarisan sifat makhluk hidup
HERBIVORA Kelompok hewan yang makanan utamanya berasal dari tumbuhan
EKOSISTEM Interaksi timbal balik antara makhluk hidup dengan lingkungannya
KROMOSOM Benang pembawa materi genetik di dalam inti sel`,
  },

  // 2. IPA (Fisika & Kimia)
  {
    title: 'IPA (Fisika & Kimia) - Energi & Wujud Zat',
    category: 'IPA (Sains)',
    subject: 'IPA',
    icon: '⚡',
    content: `GRAVITASI Gaya tarik bumi yang membuat benda jatuh ke bawah
KINETIK Energi yang dimiliki oleh suatu benda karena geraknya
POTENSIAL Energi yang tersimpan pada benda karena posisi atau ketinggiannya
KONDUKSI Perpindahan panas melalui zat padat tanpa disertai perpindahan partikel
FREKUENSI Banyaknya getaran atau gelombang yang terjadi dalam satu detik
SENYAWA Zat tunggal yang terbentuk dari gabungan dua unsur atau lebih
LAKMUS Kertas indikator untuk menguji sifat asam dan basa
ELEKTRON Partikel atom bermuatan listrik negatif yang mengelilingi inti
DENSITAS Kerapatan massa suatu zat per satuan volume
ASAM Senyawa kimia yang memiliki rasa masam dan pH di bawah tujuh`,
  },

  // 3. Matematika (MTK)
  {
    title: 'Matematika - Geometri, Aritmatika & Statistika',
    category: 'Matematika',
    subject: 'Matematika',
    icon: '📐',
    content: `HIPOTENUSA Sisi terpanjang pada segitiga siku-siku di depan sudut siku-siku
DIAMETER Garis lurus yang menghubungkan dua titik pada lingkaran melewati pusat
SEGITIGA Bangun datar yang memiliki tiga sisi dan tiga sudut
PRIMA Bilangan asli lebih dari satu yang hanya memiliki dua faktor pembagi
MEDIAN Nilai tengah dari sekumpulan data yang telah diurutkan
MODUS Nilai atau data yang paling sering muncul dalam statistika
PARALEL Dua garis sejajar pada satu bidang datar yang tidak pernah berpotongan
DIAGONAL Garis lurus yang menghubungkan dua sudut yang tidak bersebelahan
SUDUT Daerah yang dibentuk oleh dua garis yang berpotongan di satu titik
KELILING Jumlah panjang seluruh sisi yang membatasi suatu bangun datar`,
  },

  // 4. Bahasa Indonesia
  {
    title: 'Bahasa Indonesia - Majas, Kosakata & Sastra',
    category: 'Bahasa Indonesia',
    subject: 'Bahasa Indonesia',
    icon: '📖',
    content: `HIPERBOLA Majas perbandingan yang menyatakan sesuatu secara berlebihan
PERSONIFIKASI Majas yang mengumpamakan benda mati seolah-olah memiliki sifat manusia
METAFORA Majas yang menggunakan perbandingan langsung tanpa kata pembanding
ANTONIM Kata yang memiliki makna berlawanan atau bertolak belakang
SINONIM Kata yang memiliki bentuk berbeda namun memiliki makna yang sama
ARGUMENTASI Teks yang berisi alasan atau bukti untuk meyakinkan pembaca
PARAGRAF Kumpulan kalimat yang padu dan mengandung satu gagasan utama
KONJUNGSI Kata hubung antarklausa antarkalimat atau antarparagraf
PROSA Karya sastra yang berbentuk tulisan bebas tidak terikat bait dan rima
DIKSI Pilihan kata yang tepat dan selaras untuk mengungkapkan gagasan`,
  },

  // 5. Bahasa Inggris (English)
  {
    title: 'Bahasa Inggris - Vocabulary, School & Nature',
    category: 'Bahasa Inggris',
    subject: 'Bahasa Inggris',
    icon: '🇬🇧',
    content: `SUNSHINE Cahaya hangat dan terang yang dipancarkan oleh matahari
ADVENTURE Pengalaman menarik dan menantang yang penuh petualangan
LIBRARY Ruangan atau gedung tempat menyimpan koleksi buku untuk dibaca
JOURNEY Perjalanan panjang dari satu tempat ke tempat lain
VICTORY Kemenangan atau keberhasilan dalam suatu perlombaan atau perjuangan
COURAGE Keberanian untuk menghadapi rasa takut atau kesulitan
WISDOM Kebijaksanaan dan kemampuan membuat keputusan yang bijak
DICTIONARY Buku acuan yang memuat daftar kata beserta artinya
TEACHER Sosok pengajar yang mendidik dan membimbing siswa di sekolah
BEAUTIFUL Indah dan menawan dipandang mata`,
  },

  // 6. IPS (Geografi & Ekonomi)
  {
    title: 'IPS - Kenampakan Alam & Kegiatan Ekonomi',
    category: 'IPS',
    subject: 'IPS',
    icon: '🌍',
    content: `KHATULISTIWA Garis khayal yang membagi bumi menjadi belahan utara dan selatan
ATMOSFER Lapisan udara yang menyelimuti planet bumi
DELTA Endapan lumpur di muara sungai yang bercabang-cabang
SAMUDRA Lautan yang sangat luas dan membentang di permukaan bumi
INFLASI Kenaikan harga barang dan jasa secara umum dan terus-menerus
DISTRIBUSI Kegiatan menyalurkan barang dari produsen ke konsumen
KONSUMEN Pihak yang menggunakan atau mengonsumsi barang dan jasa
EKSPOR Kegiatan menjual barang atau komoditas ke luar negeri
BARTER Sistem perdagangan dengan cara saling menukar barang tanpa uang
MONOPOLI Penguasaan pasar oleh satu penjual atau satu kekuatan tunggal`,
  },

  // 7. Sejarah Indonesia
  {
    title: 'Sejarah Indonesia - Tokoh & Perjuangan Bangsa',
    category: 'Sejarah',
    subject: 'Sejarah',
    icon: '🏛️',
    content: `PROKLAMASI Pernyataan resmi kemerdekaan bangsa Indonesia tanggal 17 Agustus 1945
PANCASILA Dasar falsafah dan ideologi negara Republik Indonesia
DIPONEGORO Pahlawan nasional pemimpin perang Jawa melawan penjajah Belanda
KARTINI Pahlawan wanita pelopor kebangkitan emansipasi perempuan Indonesia
GERILYA Taktik perang sembunyi-sembunyi dan berpindah-pindah tempat
SUDIRMAN Panglima besar jenderal pertama Tentara Nasional Indonesia
RENVILLE Perjanjian perundingan antara Indonesia dan Belanda di atas kapal perang
BOROBUDUR Candi Buddha megah peninggalan wangsa Syailendra di Magelang
MAJAPAHIT Kerajaan maritim nusantara dengan sumpah Palapa Mahapatih Gajah Mada
MERDEKA Bebas dari segala bentuk penjajahan dan penindasan asing`,
  },

  // 8. Pendidikan Agama Islam (PAI)
  {
    title: 'PAI & Budi Pekerti - Akhlak & Ibadah',
    category: 'PAI',
    subject: 'Pendidikan Agama Islam',
    icon: '🕌',
    content: `TAWADHU Sikap rendah hati dan tidak menyombongkan diri
ZAKAT Kewajiban mengeluarkan sebagian harta tertentu untuk fakir miskin
AMANAH Sikap dapat dipercaya dalam mengemban tugas atau titipan
SIDDIQ Sifat nabi yang selalu berkata jujur dan benar
TAWAKAL Berserah diri kepada Allah setelah berusaha sekuat tenaga
ISTIQAMAH Sikap konsisten teguh pendirian dalam menjalankan kebaikan
SYUKUR Mengakui dan berterima kasih atas seluruh nikmat yang diberikan Allah
SHALAT Ibadah wajib lima waktu yang merupakan tiang agama Islam
SILATURAHMI Menjalin dan mempererat tali persaudaraan antar sesama
TAUBAT Menyesali dosa dan berjanji tidak akan mengulanginya lagi`,
  },

  // 9. Pendidikan Pancasila / PPKn
  {
    title: 'Pendidikan Pancasila (PPKn) - Norma & Konstitusi',
    category: 'PPKn',
    subject: 'Pendidikan Pancasila / PPKn',
    icon: '🇮🇩',
    content: `MUSYAWARAH Pembahasan bersama untuk mencapai mufakat dalam menyelesaikan masalah
TOLERANSI Sikap saling menghargai dan menghormati perbedaan suku agama dan ras
INTEGRITAS Keselarasan antara hati ucapan dan perbuatan yang jujur dan benar
KEDAULATAN Kekuasaan tertinggi yang berada di tangan rakyat
DEMOKRASI Pemerintahan dari rakyat oleh rakyat dan untuk rakyat
KEADILAN Perlakuan yang seimbang dan tidak memihak sesuai dengan hak masing-masing
KONSTITUSI Hukum dasar tertulis yang menjadi pedoman utama penyelenggaraan negara
PERSATUAN Ikatan kebersamaan bangsa Indonesia yang bersemboyan Bhinneka Tunggal Ika
GOTONGROYONG Kerja sama tolong-menolong secara sukarela demi kepentingan bersama
NORMA Aturan atau kaidah yang mengikat warga kelompok dalam masyarakat`,
  },

  // 10. Informatika & TIK
  {
    title: 'Informatika & Komputer - Teknologi & Algoritma',
    category: 'Informatika',
    subject: 'Informatika / TIK',
    icon: '💻',
    content: `INTERNET Jaringan komputer global yang menghubungkan seluruh dunia
ALGORITMA Urutan langkah-langkah logis dan terstruktur untuk menyelesaikan masalah
BROWSER Aplikasi perangkat lunak untuk menjelajahi situs di internet
DATABASE Tempat penyimpanan kumpulan data yang terorganisir di sistem komputer
SERVER Komputer induk berdaya tinggi yang melayani permintaan komputer klien
FIREWALL Sistem keamanan penjaga dan penyaring lalu lintas data di jaringan
HARDWARE Seluruh komponen fisik dari perangkat sistem komputer
SOFTWARE Kumpulan program instruksi yang dijalankan oleh komputer
PIXEL Satuan titik terkecil penyusun citra digital pada layar monitor
MODEM Perangkat untuk mengubah sinyal digital menjadi sinyal analog dan sebaliknya`,
  },

  // 11. Seni Budaya & Keterampilan (SBK)
  {
    title: 'Seni Budaya - Musik, Tari & Seni Rupa',
    category: 'Seni Budaya',
    subject: 'Seni Budaya',
    icon: '🎨',
    content: `ANGKLUNG Alat musik tradisional bambu dari Jawa Barat yang digoyangkan
GAMELAN Ansambel musik tradisional khas Jawa dan Bali yang didominasi instrumen logam
BATIK Kain bergambar tradisional khas Indonesia dengan malam dan canting
SKETSA Gambar rancangan kasar awal sebelum membuat karya lukisan utuh
PATUNG Karya seni rupa tiga dimensi tiruan bentuk manusia hewan atau objek lain
RELIEF Seni pahat timbul pada dinding candi atau monumen bersejarah
KANVAS Kain bertulang serat kasar tempat pelukis membubuhkan cat
AKORD Kombinasi beberapa nada yang dibunyikan serentak secara harmonis
KOREOGRAFI Seni merancang pola dan gerakan dalam pementasan tarian
DIATONIK Tangga nada yang memiliki tujuh nada pokok dalam satu oktaf`,
  },

  // 12. PJOK (Penjasorkes)
  {
    title: 'PJOK - Olahraga, Kebugaran & Atletik',
    category: 'PJOK',
    subject: 'PJOK / Penjas',
    icon: '⚽',
    content: `SMASH Pukulan keras menukik ke bawah pada permainan bola voli atau bulutangkis
DRIBBLE Gerakan menggiring bola dengan memantul atau mendorong sambil bergerak
SPRINT Lari cepat dengan kecepatan maksimal menempuh jarak pendek
ENDURANCE Daya tahan jantung dan paru-paru untuk melakukan aktivitas fisik lama
AGILITAS Kemampuan bergerak mengubah arah tubuh secara cepat dan lincah
MARATON Lari jarak jauh sejauh empat puluh dua kilometer lebih
SENAM Latihan fisik yang melibatkan kelenturan keseimbangan dan kekuatan tubuh
STAMINA Tingkat kebugaran dan kekuatan fisik untuk bertahan dalam aktivitas berat
PENALTI Tendangan hukuman langsung dari titik khusus di depan gawang
KIPER Pemain bertahan paling belakang yang bertugas menjaga gawang dari kebobolan`,
  },
];
