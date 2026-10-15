import KartuProduk from "@/components/KartuProduk";
import { produkContoh } from "@/lib/data-contoh";
import { toko } from "@/lib/toko";
import { createKlienPublik } from "@/lib/supabase/server";

export default async function HalamanKatalog() {
  let daftarProduk = [];
  let isDbConnected = false;

  const supabase = createKlienPublik();
  if (supabase) {
    const { data, error } = await supabase
      .from("produk")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      daftarProduk = data;
      isDbConnected = true;
    }
  }

  // Jika database belum terhubung, tampilkan koleksi contoh fashion
  if (!isDbConnected) {
    daftarProduk = produkContoh;
  }

  return (
    <>
      <section className="py-10 sm:py-14 border-b border-garis mb-8">
        <span className="inline-block rounded-full bg-permukaan px-3 py-1 text-xs font-semibold tracking-wider uppercase text-teks-lembut mb-3">
          Koleksi Fashion & Streetwear
        </span>
        <h1 className="max-w-2xl text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
          {toko.nama}
        </h1>
        <p className="mt-3 max-w-xl text-lg text-teks-lembut">{toko.tagline}</p>
        <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-teks-lembut">
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            {toko.jamBuka}
          </span>
          <span>•</span>
          <span>Order Cepat via WhatsApp</span>
        </div>
      </section>

      <section aria-labelledby="judul-produk" className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h2 id="judul-produk" className="text-xl font-bold tracking-tight">
            Katalog Produk
          </h2>
          <span className="text-sm text-teks-lembut">
            Menampilkan {daftarProduk.length} produk
          </span>
        </div>

        {daftarProduk.length === 0 ? (
          <div className="rounded-2xl border border-garis bg-permukaan p-12 text-center">
            <p className="text-lg font-semibold text-teks">Belum ada produk.</p>
            <p className="mt-1 text-sm text-teks-lembut">
              Produk katalog akan segera ditambahkan. Silakan cek kembali nanti.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {daftarProduk.map((produk) => (
              <KartuProduk key={produk.id} produk={produk} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
