import { createClient } from "@supabase/supabase-js";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/**
 * Koneksi server untuk pengunjung (baca katalog dan detail produk).
 * Menggunakan SUPABASE_SECRET_KEY untuk melewati RLS secara aman dari server.
 */
export function createKlienPublik() {
  const url = process.env.SUPABASE_URL;
  const secretKey = process.env.SUPABASE_SECRET_KEY;

  if (!url || !secretKey) {
    return null;
  }

  return createClient(url, secretKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

/**
 * Koneksi sesi admin (login, keluar, ganti password, kelola produk).
 * Menggunakan SUPABASE_PUBLISHABLE_KEY dan cookie sesi via @supabase/ssr.
 */
export async function createKlienAuth() {
  const url = process.env.SUPABASE_URL;
  const publishableKey = process.env.SUPABASE_PUBLISHABLE_KEY;

  if (!url || !publishableKey) {
    return null;
  }

  const cookieStore = await cookies();

  return createServerClient(url, publishableKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch {
          // Abaikan error jika dipanggil dari Server Component murni
        }
      },
    },
  });
}

/**
 * Mengambil data user admin yang sedang login di server.
 */
export async function getAdminUser() {
  const supabase = await createKlienAuth();
  if (!supabase) return null;

  try {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user) return null;
    return user;
  } catch {
    return null;
  }
}

