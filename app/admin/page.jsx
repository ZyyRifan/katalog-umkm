import NavAdmin from "@/components/NavAdmin";
import TabelProduk from "@/components/TabelProduk";
import Tombol from "@/components/Tombol";
import { produkContoh } from "@/lib/data-contoh";
import { createKlienAuth, createKlienPublik } from "@/lib/supabase/server";

export default async function HalamanAdmin() {
  let daftarProduk = [];
  let isDbConnected = false;

  const supabase = (await createKlienAuth()) || createKlienPublik();
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

  if (!isDbConnected) {
    daftarProduk = produkContoh;
  }

  return (
    <div className="flex flex-col gap-6 py-8">
      <NavAdmin />
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight">Kelola Produk</h1>
          <p className="text-sm text-teks-lembut">
            Total {daftarProduk.length} produk terdaftar di katalog toko
          </p>
        </div>
        <Tombol href="/admin/produk/baru">Tambah produk</Tombol>
      </div>
      <TabelProduk daftarProduk={daftarProduk} />
    </div>
  );
}
