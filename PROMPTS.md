# Jurnal Prompt

Catat prompt penting selama membangun aplikasi: apa yang kamu minta, hasilnya, dan perbaikan yang dilakukan. Beri tanda **[SENDIRI]** untuk prompt yang kamu tulis sendiri (bukan dari lembar kerja).

## US-01 Katalog dari database

**Prompt:** [SENDIRI] buatkan menjadi website yang bagus, untuk pejualan barang fashion yang bisa login admin dan order via whatsapp

**Hasil:** Halaman `/` berhasil mengambil daftar produk dari Supabase sisi server dengan koneksi publik menggunakan service key (bypassing RLS dengan aman), serta memiliki fallback ke koleksi fashion contoh jika koneksi database belum diaktifkan. Komponen CatatanBelumAktif telah dihapus.

**Perbaikan:** Menambahkan penanganan fallback yang aman agar website tidak crash saat environment variable database belum diisi di `.env.local`.

## US-02 Detail produk

**Prompt:** [SENDIRI] buatkan menjadi website yang bagus, untuk pejualan barang fashion yang bisa login admin dan order via whatsapp

**Hasil:** Halaman `/produk/[id]` berhasil mengambil data spesifik produk dari Supabase sisi server dengan penanganan `params` Promise sesuai Next.js 16, menampilkan detail lengkap (foto, kategori, harga rupiah, deskripsi), dan menampilkan `notFound()` jika produk tidak ditemukan.

**Perbaikan:** Menggunakan `maybeSingle()` untuk query Supabase dan menyediakan fallback data produk contoh fashion.

## US-03 Pesan via WhatsApp

**Prompt:** [SENDIRI] buatkan menjadi website yang bagus, untuk pejualan barang fashion yang bisa login admin dan order via whatsapp

**Hasil:** Komponen `TombolWhatsApp.jsx` berhasil memformat tautan `https://wa.me/<nomor>?text=<pesan>` ke nomor toko WhatsApp dengan teks otomatis berisi nama produk dan harga rupiah ter-encode `encodeURIComponent`. Berfungsi di perangkat mobile maupun desktop.

**Perbaikan:** Menambahkan ikon WhatsApp SVG dan styling tombol responsif.

## US-04 Login admin

**Prompt:** [SENDIRI] buatkan menjadi website yang bagus, untuk pejualan barang fashion yang bisa login admin dan order via whatsapp

**Hasil:** Halaman `/admin/login` terhubung ke Server Action `masukAdmin` menggunakan Supabase Auth `signInWithPassword`. Login berhasil mengarahkan ke `/admin` dan kegagalan menampilkan pesan error yang jelas. Tombol Keluar di `NavAdmin` terhubung ke Server Action `keluarAdmin`.

**Perbaikan:** Menggunakan `useActionState` React 19 untuk penanganan status form pending dan pesan error yang elegan.

## US-05 Ganti password

**Prompt:** [SENDIRI] buatkan menjadi website yang bagus, untuk pejualan barang fashion yang bisa login admin dan order via whatsapp

**Hasil:** Halaman `/admin/password` memproses penggantian password melalui Server Action `gantiPassword`. Memvalidasi login admin di server, panjang password minimal 8 karakter, dan kesesuaian konfirmasi password.

**Perbaikan:** Menampilkan notifikasi sukses atau error yang ramah pengguna.

## US-06 Proteksi halaman admin

**Prompt:** [SENDIRI] buatkan menjadi website yang bagus, untuk pejualan barang fashion yang bisa login admin dan order via whatsapp

**Hasil:** Dibuat file `proxy.js` di root proyek (fitur baru Next.js 16 pengganti `middleware.js`) untuk memproteksi seluruh rute `/admin/*`. Pengguna tanpa sesi login otomatis dialihkan ke `/admin/login`. Setiap Server Action perubahan data juga memverifikasi sesi login admin.

**Perbaikan:** Menambahkan pengecekan session cookie `@supabase/ssr` di proxy middleware Next.js 16.

## Debugging dan fitur bonus

- **Kustomisasi Toko Fashion:** Memperbarui token warna tema di `app/globals.css` menjadi skema warna fashion/streetwear yang elegan dan modern, identitas toko di `lib/toko.js`, dan katalog fashion di `lib/data-contoh.js`.
- **US-07 & US-08 & US-09 & US-10 (Manajemen Produk Admin):** Menambahkan aksi Server Action untuk Tambah Produk (`/admin/produk/baru`), Ubah Produk (`/admin/produk/[id]/ubah`), dan Hapus Produk dengan dialog konfirmasi di `components/TabelProduk.jsx`. Semua aksi terlindungi verifikasi login admin di server.
