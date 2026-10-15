// DATA CONTOH: hanya untuk tampilan awal sebelum terhubung ke database.
// Nama kolom sama persis dengan tabel "produk" di docs/schema.sql.
// Setelah US-01 selesai, halaman tidak lagi memakai file ini.

export const produkContoh = [
  {
    id: 1,
    nama: "Kaos Oversize Heavy Cotton - Hitam",
    harga: 139000,
    deskripsi:
      "Bahan cotton combed 24s heavy weight, potongan boxy fit modern yang nyaman dipakai seharian. Cocok untuk hangout maupun gaya streetwear casual.",
    foto_url: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80",
    kategori: "Kaos",
  },
  {
    id: 2,
    nama: "Jaket Denim Vintage Washed",
    harga: 349000,
    deskripsi:
      "Denim non-stretch 14oz dengan efek washed autentik. Jahitan rantai kuat dan kancing logam premium, memberikan kesan timeless retro.",
    foto_url: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=800&q=80",
    kategori: "Outerwear",
  },
  {
    id: 3,
    nama: "Kemeja Flanel Kotak Casual",
    harga: 219000,
    deskripsi:
      "Kemeja bahan flanel katun lembut bertekstur tebal dan nyaman. Motif kotak-kotak netral cocok dijadikan outer atau kemeja santai.",
    foto_url: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80",
    kategori: "Kemeja",
  },
  {
    id: 4,
    nama: "Celana Cargo Loose Fit - Olive Green",
    harga: 279000,
    deskripsi:
      "Celana panjang model cargo dengan 6 saku fungsional. Material twill katun tahan lama, potongan relax fit untuk mobilitas tinggi.",
    foto_url: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=800&q=80",
    kategori: "Celana",
  },
  {
    id: 5,
    nama: "Hoodie Pullover Fleece - Dark Grey",
    harga: 299000,
    deskripsi:
      "Hoodie tebal dengan lapisan fleece hangat dan lembut di dalam. Dilengkapi saku kanguru dan tali serut adjustable.",
    foto_url: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80",
    kategori: "Outerwear",
  },
  {
    id: 6,
    nama: "Sneakers Kanvas Klasik Low-Top",
    harga: 389000,
    deskripsi:
      "Sepatu sneakers kanvas dengan sol karet vulkanisir anti-slip. Insole empuk dan breathable untuk kenyamanan jalan kaki maksimal.",
    foto_url: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=800&q=80",
    kategori: "Sepatu",
  },
];

export function cariProdukContoh(id) {
  return produkContoh.find((produk) => String(produk.id) === String(id));
}
