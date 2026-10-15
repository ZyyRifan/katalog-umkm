import { notFound } from "next/navigation";
import NavAdmin from "@/components/NavAdmin";
import FormProduk from "@/components/FormProduk";
import { cariProdukContoh } from "@/lib/data-contoh";
import { ubahProduk } from "@/app/admin/actions";
import { createKlienAuth, createKlienPublik } from "@/lib/supabase/server";

export default async function HalamanUbahProduk({ params }) {
  const { id } = await params;
  let produk = null;

  const supabase = (await createKlienAuth()) || createKlienPublik();
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

  if (!produk) {
    produk = cariProdukContoh(id);
  }

  if (!produk) {
    notFound();
  }

  const ubahProdukDenganId = ubahProduk.bind(null, id);

  return (
    <div className="flex flex-col gap-6 py-8">
      <NavAdmin />
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight">Ubah produk</h1>
        <p className="mt-1 text-sm text-teks-lembut">
          Perbarui informasi produk {produk.nama}
        </p>
      </div>
      <FormProduk
        produk={produk}
        labelTombol="Simpan perubahan"
        action={ubahProdukDenganId}
      />
    </div>
  );
}
