"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

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
    <header className="sticky top-0 z-40 border-b border-line bg-cream/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <button
          onClick={() => setMenuOpen((v) => !v)}
          className="flex h-9 w-9 items-center justify-center text-ink md:hidden"
          aria-label="Otwórz menu"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M2.5 5h15M2.5 10h15M2.5 15h15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>

        <Link href="/" className="font-serif-display text-xl tracking-[0.2em] text-ink sm:text-2xl">
          LOKA
        </Link>

        <nav className="hidden items-center gap-7 text-sm tracking-wide text-ink-soft md:flex">
          {navLinks.map((l) => (
            <Link key={l.label} href={l.href} className="whitespace-nowrap transition hover:text-ink">
              {l.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/rezerwacja"
          className="whitespace-nowrap rounded-full bg-ink px-4 py-2 text-sm text-cream transition hover:bg-amber-dark sm:px-5"
        >
          Zarezerwuj wizytę
        </Link>
      </div>

      {menuOpen && (
        <nav className="flex flex-col border-t border-line px-4 py-2 text-sm text-ink-soft md:hidden">
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
        </nav>
      )}
    </header>
  );
}
