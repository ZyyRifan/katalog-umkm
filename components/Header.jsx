import Link from "next/link";
import { toko } from "@/lib/toko";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-garis bg-latar/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3.5">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-utama text-white font-bold text-sm">
            TJ
          </span>
          <span className="text-lg font-black tracking-tight text-utama group-hover:opacity-80 transition">
            {toko.nama}
          </span>
        </Link>
        <div className="flex items-center gap-4 text-sm font-semibold">
          <Link href="/" className="text-teks hover:text-utama transition">
            Katalog
          </Link>
          <a
            href={`https://wa.me/${toko.nomorWhatsApp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-garis bg-permukaan px-3 py-1 text-xs text-teks hover:border-utama hover:text-utama transition"
          >
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Chat WhatsApp
          </a>
        </div>
      </div>
    </header>
  );
}
