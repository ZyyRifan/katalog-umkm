"use client";

import { useTransition } from "react";
import { formatRupiah } from "@/lib/format";
import Tombol from "@/components/Tombol";
import { hapusProduk } from "@/app/admin/actions";

export default function TabelProduk({ daftarProduk = [] }) {
  const [isPending, startTransition] = useTransition();

  const handleHapus = (id, nama) => {
    if (confirm(`Yakin ingin menghapus produk "${nama}"?`)) {
      startTransition(async () => {
        try {
          await hapusProduk(id);
        } catch (err) {
          alert(err.message || "Gagal menghapus produk.");
        }
      });
    }
  };

  if (!daftarProduk || daftarProduk.length === 0) {
    return (
      <div className="rounded-2xl border border-garis bg-permukaan p-8 text-center text-sm text-teks-lembut">
        Belum ada produk. Klik tombol &quot;Tambah produk&quot; untuk menambahkan produk pertama.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-garis">
      <table className="w-full min-w-[560px] text-left text-sm">
        <thead className="bg-permukaan text-teks-lembut">
          <tr>
            <th className="px-4 py-3 font-semibold">Produk</th>
            <th className="px-4 py-3 font-semibold">Kategori</th>
            <th className="px-4 py-3 font-semibold">Harga</th>
            <th className="px-4 py-3 font-semibold">
              <span className="sr-only">Aksi</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {daftarProduk.map((produk) => (
            <tr key={produk.id} className="border-t border-garis">
              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <img
                    src={produk.foto_url}
                    alt=""
                    className="h-10 w-10 rounded-md object-cover bg-permukaan"
                  />
                  <span className="font-semibold">{produk.nama}</span>
                </div>
              </td>
              <td className="px-4 py-3 text-teks-lembut">{produk.kategori || "-"}</td>
              <td className="px-4 py-3 font-medium">{formatRupiah(produk.harga)}</td>
              <td className="px-4 py-3">
                <div className="flex justify-end gap-2">
                  <Tombol href={`/admin/produk/${produk.id}/ubah`} varian="garis">
                    Ubah
                  </Tombol>
                  <Tombol
                    type="button"
                    varian="bahaya"
                    disabled={isPending}
                    onClick={() => handleHapus(produk.id, produk.nama)}
                  >
                    Hapus
                  </Tombol>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
