# AI-FINPRO

Project AI Recommender System dengan Frontend Vite + React dan Backend Node.js.

## 🚀 Cara Deploy ke Vercel (Paling Mudah)

1.  **Push ke GitHub**:
    *   Buat repository baru di GitHub dengan nama `AI_FINPRO`.
    *   Ikuti instruksi "Push an existing repository" (Lihat di bawah).

2.  **Koneksikan ke Vercel**:
    *   Buka [Vercel](https://vercel.com).
    *   Klik **Add New** > **Project**.
    *   Pilih repository `AI_FINPRO`.
    *   **PENTING**: Pada bagian **Root Directory**, klik **Edit** dan pilih folder `insight-navigator`.
    *   Vercel akan secara otomatis mendeteksi **Vite**.
    *   Klik **Deploy**.

## 🛠️ Perubahan yang Dilakukan
*   **AI di Frontend**: Model AI sekarang berjalan langsung di browser menggunakan `onnxruntime-web`. Ini membuat aplikasi lebih cepat dan menghindari limit memori Vercel pada Serverless Functions.
*   **Model Location**: File `recommender.onnx` sekarang berada di `insight-navigator/public/`.

## 📦 Perintah Git untuk Upload ke GitHub

Jalankan perintah ini di folder utama (`AI-FINPRO`):

```bash
git init
git add .
git commit -m "Initial commit: Ready for Vercel deployment"
git branch -M main
git remote add origin https://github.com/USERNAME_ANDA/AI_FINPRO.git
git push -u origin main
```
*(Ganti `USERNAME_ANDA` dengan username GitHub Anda)*
