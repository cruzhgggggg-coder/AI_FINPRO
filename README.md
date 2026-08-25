# TierLog

TierLog adalah platform e-logbook berbasis kecerdasan buatan yang dirancang untuk mempermudah proses bimbingan skripsi[cite: 1]. Sistem ini mengubah rekaman audio diskusi bimbingan menjadi daftar revisi terstruktur yang diprioritaskan dan dihubungkan langsung dengan versi dokumen tugas akhir[cite: 1].

Berdasarkan hasil evaluasi, penggunaan TierLog berhasil memangkas rata-rata waktu siklus revisi dari 6.8 hari menjadi 1.2 hari, serta meningkatkan pemahaman mahasiswa terhadap arahan dosen pembimbing hingga 90%[cite: 1].

---

## Fitur Utama

- Pemrosesan Transkrip Otomatis
  Mengubah rekaman audio bimbingan menjadi teks transkrip lengkap dengan penanda waktu menggunakan model Speech-to-Text Whisper[cite: 1].

- Klasifikasi Revisi Terstruktur
  Mengelompokkan poin masukan ke dalam Higher-Order Concerns untuk revisi substansial seperti metodologi dan struktur, serta Lower-Order Concerns untuk perbaikan minor seperti tata bahasa dan format[cite: 1].

- Pelacakan Versi Dokumen
  Menghubungkan potongan transkrip audio dan catatan revisi secara langsung ke versi paragraf dan dokumen yang sesuai[cite: 1].

- Portal Validasi Dosen
  Menyediakan antarmuka khusus bagi dosen pembimbing untuk meninjau, mengedit, menyetujui, atau menolak hasil klasifikasi AI sebelum diakses oleh mahasiswa[cite: 1].

---

## Arsitektur dan Teknologi

Aplikasi ini menggunakan arsitektur terpisah untuk menjaga kinerja dan skalabilitas sistem[cite: 1]:

- Antarmuka Utama: Laravel[cite: 1]
- Layanan Layar Belakang: Go dengan framework Gin dan GORM[cite: 1]
- Basis Data: MySQL[cite: 1]
- Mesin AI: Whisper Speech-to-Text dan Large Language Model untuk klasifikasi masukan[cite: 1]

---

## Petunjuk Penggunaan

Persyaratan Sistem
- PHP versi 8.2 atau yang lebih baru
- Go versi 1.20 atau yang lebih baru
- MySQL versi 8.0 atau yang lebih baru
- Node.js dan NPM

Langkah Instalasi

1. Unduh repositori ini
   git clone https://github.com/cruzhgggggg-coder/AI_FINPRO.git
   cd AI_FINPRO

2. Konfigurasi Layanan Go
   cd backend
   go mod download
   go run main.go

3. Konfigurasi Aplikasi Laravel
   cd ../frontend
   composer install
   npm install
   npm run dev
   cp .env.example .env
   php artisan key:generate
   php artisan migrate
   php artisan serve

---

## Ringkasan Evaluasi

- Rata-rata Waktu Revisi: Berkurang dari 6.8 hari menjadi 1.2 hari[cite: 1]
- Frekuensi Pengajuan Ulang: Turun dari 3.1 kali menjadi 0.7 kali[cite: 1]
- Kesalahpahaman Masukan: Turun dari 80% menjadi 15%[cite: 1]
- Tingkat Pemahaman Mahasiswa: Meningkat dari 20% menjadi 90%[cite: 1]

---

## Tim Pengembang

- Bryan Alexander: Pengembang Utama Mesin AI dan E-Logbook[cite: 1]
- Zaky Manggala Putra Santoso: Pengembang Arsitektur Laravel dan Go[cite: 1]
- Godwin Clief Fernando Mclay: Integrasi dan Implementasi Sistem[cite: 1]
- Achmad Syukur Nur Ramadhan Asad: Pengembang Layanan Backend[cite: 1]
- Gusti Pangestu: Dosen Pembimbing Penelitian[cite: 1]

---

## Lisensi dan Data

- Dataset penelitian dapat diakses publik melalui Kaggle pada tautan TierLog Dataset[cite: 1].
- Proyek ini dirilis di bawah Lisensi MIT.
