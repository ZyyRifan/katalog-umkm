import Link from "next/link";
import { notFound } from "next/navigation";
import TombolWhatsApp from "@/components/TombolWhatsApp";
import { cariProdukContoh } from "@/lib/data-contoh";
import { formatRupiah } from "@/lib/format";
import { createKlienPublik } from "@/lib/supabase/server";

export default async function HalamanDetailProduk({ params }) {
  const { id } = await params;
  let produk = null;

  const supabase = createKlienPublik();
  if (supabase) {
    const { data, error } = await supabase
      .from("produk")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (!error && data) {
      produk = data;
    }
  }

  // Jika tidak ditemukan di database atau belum terhubung, cek data contoh
  if (!produk) {
    produk = cariProdukContoh(id);
  }

  if (!produk) {
    notFound();
  }

  return (
    <article className="grid gap-8 py-8 md:grid-cols-2 md:py-12">
      <div className="overflow-hidden rounded-2xl border border-garis bg-permukaan">
        <img
          src={produk.foto_url}
          alt={produk.nama}
          className="aspect-square w-full object-cover"
        />
      </div>
      <div className="flex flex-col gap-4">
        <Link
          href="/"
          className="text-sm font-semibold text-teks-lembut hover:text-utama inline-flex items-center gap-1"
        >
          ← Kembali ke katalog
        </Link>
        <span className="self-start rounded-full bg-permukaan px-3 py-1 text-xs font-semibold text-teks-lembut">
          {produk.kategori || "Fashion"}
        </span>
        <h1 className="text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
          {produk.nama}
        </h1>
        <p className="self-start rounded-md bg-harga-latar px-3.5 py-1.5 text-2xl font-bold text-harga">
          {formatRupiah(produk.harga)}
        </p>
        <div className="border-t border-garis pt-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-teks-lembut mb-2">
            Deskripsi Produk
          </h2>
          <p className="max-w-prose leading-relaxed text-teks-lembut whitespace-pre-line">
            {produk.deskripsi || "Tidak ada deskripsi produk."}
          </p>
        </div>
        <div className="mt-4 pt-4 border-t border-garis flex flex-col gap-3">
          <TombolWhatsApp produk={produk} />
          <p className="text-xs text-teks-lembut text-center sm:text-left">
            ⚡ Pesanan langsung terhubung ke WhatsApp toko. Pengiriman dan pembayaran dikonfirmasi langsung dengan admin.
          </p>
        </div>
      </div>
    </article>
  );
}
