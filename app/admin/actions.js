"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createKlienAuth, getAdminUser } from "@/lib/supabase/server";

export async function masukAdmin(prevState, formData) {
  const email = formData.get("email")?.toString().trim();
  const password = formData.get("password")?.toString();

  if (!email || !password) {
    return { error: "Email dan password wajib diisi." };
  }

  const supabase = await createKlienAuth();
  if (!supabase) {
    return {
      error:
        "Koneksi Supabase belum dikonfigurasi. Pastikan SUPABASE_URL dan SUPABASE_PUBLISHABLE_KEY sudah diisi di .env.local.",
    };
  }

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return {
      error:
        error.message === "Invalid login credentials"
          ? "Email atau password salah."
          : `Gagal masuk: ${error.message}`,
    };
  }

  redirect("/admin");
}

export async function keluarAdmin() {
  const supabase = await createKlienAuth();
  if (supabase) {
    await supabase.auth.signOut();
  }
  redirect("/admin/login");
}

export async function gantiPassword(prevState, formData) {
  const admin = await getAdminUser();
  if (!admin) {
    return { error: "Anda belum login sebagai admin." };
  }

  const passwordBaru = formData.get("password_baru")?.toString();
  const konfirmasiPassword = formData.get("konfirmasi_password")?.toString();

  if (!passwordBaru || !konfirmasiPassword) {
    return { error: "Semua kolom password wajib diisi." };
  }

  if (passwordBaru.length < 8) {
    return { error: "Password baru minimal 8 karakter." };
  }

  if (passwordBaru !== konfirmasiPassword) {
    return { error: "Konfirmasi password tidak cocok dengan password baru." };
  }

  const supabase = await createKlienAuth();
  const { error } = await supabase.auth.updateUser({
    password: passwordBaru,
  });

  if (error) {
    return { error: `Gagal mengganti password: ${error.message}` };
  }

  return { success: "Password berhasil diperbarui!" };
}

export async function tambahProduk(prevState, formData) {
  const admin = await getAdminUser();
  if (!admin) {
    return { error: "Anda belum login sebagai admin." };
  }

  const nama = formData.get("nama")?.toString().trim();
  const harga = parseInt(formData.get("harga"), 10);
  const kategori = formData.get("kategori")?.toString().trim() || null;
  const foto_url = formData.get("foto_url")?.toString().trim() || null;
  const deskripsi = formData.get("deskripsi")?.toString().trim() || null;

  if (!nama || isNaN(harga) || harga < 0) {
    return { error: "Nama produk dan harga valid wajib diisi." };
  }

  const supabase = await createKlienAuth();
  const { error } = await supabase.from("produk").insert([
    {
      nama,
      harga,
      kategori,
      foto_url,
      deskripsi,
    },
  ]);

  if (error) {
    return { error: `Gagal menambah produk: ${error.message}` };
  }

  revalidatePath("/");
  revalidatePath("/admin");
  redirect("/admin");
}

export async function ubahProduk(id, prevState, formData) {
  const admin = await getAdminUser();
  if (!admin) {
    return { error: "Anda belum login sebagai admin." };
  }

  const nama = formData.get("nama")?.toString().trim();
  const harga = parseInt(formData.get("harga"), 10);
  const kategori = formData.get("kategori")?.toString().trim() || null;
  const foto_url = formData.get("foto_url")?.toString().trim() || null;
  const deskripsi = formData.get("deskripsi")?.toString().trim() || null;

  if (!nama || isNaN(harga) || harga < 0) {
    return { error: "Nama produk dan harga valid wajib diisi." };
  }

  const supabase = await createKlienAuth();
  const { error } = await supabase
    .from("produk")
    .update({
      nama,
      harga,
      kategori,
      foto_url,
      deskripsi,
    })
    .eq("id", id);

  if (error) {
    return { error: `Gagal mengubah produk: ${error.message}` };
  }

  revalidatePath("/");
  revalidatePath(`/produk/${id}`);
  revalidatePath("/admin");
  redirect("/admin");
}

export async function hapusProduk(id) {
  const admin = await getAdminUser();
  if (!admin) {
    throw new Error("Anda belum login sebagai admin.");
  }

  const supabase = await createKlienAuth();
  const { error } = await supabase.from("produk").delete().eq("id", id);

  if (error) {
    throw new Error(`Gagal menghapus produk: ${error.message}`);
  }

  revalidatePath("/");
  revalidatePath("/admin");
}

