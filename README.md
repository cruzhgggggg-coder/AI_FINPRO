# Insight Navigator & AI Recommender System

Platform berbasis Machine Learning dan web interaktif untuk menganalisis data kompetensi siswa serta memberikan rekomendasi strategi peningkatan pembelajaran secara presisi.

## Fitur Utama

* **Model Machine Learning (ONNX Runtime):** Inferensi rekomendasi strategi pembelajaran secara cepat dan aman di sisi backend maupun frontend.
* **Visualisasi Radar Interactive:** Menampilkan peta analisis kompetensi secara visual untuk mempermudah evaluasi aspek kelebihan dan kekurangan siswa.
* **Backend API (Node.js & TypeScript):** Service RESTful handal yang melayani pemrosesan data dan integrasi model machine learning.
* **Frontend Modern (React & Vite):** Antarmuka pengguna responsif dengan pustaka komponen UI modern dan Tailwind CSS.
* **Model Training Pipeline (Jupyter Notebook):** Eksperimen, pelatihan, dan konversi model machine learning ke format ONNX yang terdistribusi.

## Arsitektur Proyek

Proyek ini terbagi menjadi dua komponen utama:

1. `api/`: Service backend berbasis Node.js dan TypeScript yang mengeksekusi inferensi model ONNX `recommender.onnx`.
2. `insight-navigator/`: Aplikasi frontend SPA berbasis React, Vite, TypeScript, dan Tailwind CSS.

## Ringkasan Teknologi

* **Frontend:** React, TypeScript, Vite, Tailwind CSS, Lucide React, Shadcn UI
* **Backend:** Node.js, Express / TypeScript, ONNX Runtime (`onnxruntime-node`)
* **Machine Learning:** Python, Scikit-learn, ONNX

## Panduan Instalasi dan Pengoperasian

### Prasyarat

* Node.js (versi 18 atau lebih baru)
* Bun atau npm / yarn

### 1. Menjalankan Backend API

```bash
cd api
npm install
npm run dev
```

Backend akan berjalan pada port default dan siap menerima request inferensi.

### 2. Menjalankan Frontend Web Application

```bash
cd insight-navigator
bun install
bun run dev
```

Buka peramban web dan akses URL lokal yang tampil pada terminal (biasanya `http://localhost:5173`).

## Struktur Direktori Proyek

```
.
├── api/                        # Service Backend API (TypeScript/Node.js)
│   ├── app.ts                  # Entry point server Express
│   ├── recommender.onnx        # File model ONNX untuk inferensi
│   └── package.json
├── insight-navigator/          # Web Client Dashboard (React/Vite)
│   ├── src/
│   │   ├── components/         # Komponen UI dan Visualisasi Radar
│   │   ├── pages/              # Halaman Aplikasi
│   │   └── App.tsx
│   ├── public/                 # Static assets & model copy
│   └── package.json
└── recommended_system.ipynb    # Notebook pelatihan dan ekspor model ML
