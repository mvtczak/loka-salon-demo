"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Calendar, Menu, X } from "lucide-react";

const navLinks = [
  { href: "/uslugi", label: "Usługi" },
  { href: "/zespol", label: "Zespół" },
  { href: "/#opinie", label: "Opinie" },
  { href: "/#kontakt", label: "Kontakt" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => setMenuOpen(false), [pathname]);

  return (
    <header className="sticky top-0 z-40 border-b-2 border-amber bg-cream">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-5 sm:px-6">
        <Link href="/" className="font-serif-display text-2xl tracking-[0.3em] text-ink sm:text-3xl">
          LOKA
        </Link>

        <nav className="hidden items-center gap-8 text-xs uppercase tracking-[0.2em] text-ink-soft md:flex">
          {navLinks.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className="whitespace-nowrap border-b border-transparent pb-1 transition hover:border-amber hover:text-ink"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/rezerwacja"
            className="hidden items-center gap-2 whitespace-nowrap border border-amber bg-amber px-5 py-2.5 text-xs uppercase tracking-[0.15em] text-onamber transition hover:bg-transparent hover:text-amber sm:inline-flex"
          >
            <Calendar size={14} strokeWidth={2} />
            Zarezerwuj wizytę
          </Link>
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center border border-line text-ink md:hidden"
            aria-label="Otwórz menu"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="flex flex-col border-t border-line px-4 py-2 text-xs uppercase tracking-[0.2em] text-ink-soft md:hidden">
          {navLinks.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="border-b border-line/60 py-3 transition hover:text-ink last:border-0"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/rezerwacja"
            onClick={() => setMenuOpen(false)}
            className="my-3 flex items-center justify-center gap-2 border border-amber bg-amber px-5 py-2.5 text-center text-onamber"
          >
            <Calendar size={14} strokeWidth={2} />
            Zarezerwuj wizytę
          </Link>
        </nav>
      )}
    </header>
  );
}
