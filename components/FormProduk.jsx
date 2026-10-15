"use client";

import { useActionState } from "react";
import Input from "@/components/Input";
import Tombol from "@/components/Tombol";

export default function FormProduk({ produk = {}, labelTombol, action }) {
  const [state, formAction, isPending] = useActionState(action, null);

  return (
    <form action={formAction} className="flex max-w-xl flex-col gap-4">
      {state?.error && (
        <div
          role="alert"
          className="rounded-lg border border-bahaya/30 bg-red-50 p-3.5 text-sm text-bahaya"
        >
          {state.error}
        </div>
      )}

      <Input
        label="Nama produk"
        name="nama"
        defaultValue={produk.nama}
        placeholder="Contoh: Kaos Oversize Heavy Cotton"
        required
      />
      <Input
        label="Harga (Rp)"
        name="harga"
        type="number"
        min="0"
        defaultValue={produk.harga}
        placeholder="Contoh: 149000"
        required
      />
      <Input
        label="Kategori"
        name="kategori"
        defaultValue={produk.kategori}
        placeholder="Contoh: Kaos / Outerwear / Celana / Sepatu"
      />
      <Input
        label="Link foto"
        name="foto_url"
        placeholder="https://... atau /produk/nama-file.svg"
        defaultValue={produk.foto_url}
      />
      <Input
        label="Deskripsi"
        name="deskripsi"
        textarea
        defaultValue={produk.deskripsi}
        placeholder="Jelaskan bahan, cutting/fitting, dan keunggulan produk..."
      />
      <div className="flex gap-3 pt-2">
        <Tombol type="submit" disabled={isPending}>
          {isPending ? "Menyimpan..." : labelTombol}
        </Tombol>
        <Tombol href="/admin" varian="garis">
          Batal
        </Tombol>
      </div>
    </form>
  );
}
