import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";

export async function proxy(request) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const url = process.env.SUPABASE_URL;
  const publishableKey = process.env.SUPABASE_PUBLISHABLE_KEY;
  const isLoginPage = request.nextUrl.pathname === "/admin/login";

  // Jika konfigurasi Supabase belum ada di environment
  if (!url || !publishableKey) {
    if (!isLoginPage) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
    return response;
  }

  const supabase = createServerClient(url, publishableKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value)
        );
        response = NextResponse.next({
          request,
        });
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options)
        );
      },
    },
  });

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    // Jika belum login dan bukan di halaman login
    if (!user && !isLoginPage) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    // Jika sudah login tapi membuka halaman login
    if (user && isLoginPage) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
  } catch {
    if (!isLoginPage) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  return response;
}

export const middleware = proxy;
export default proxy;

export const config = {
  matcher: ["/admin/:path*"],
};

