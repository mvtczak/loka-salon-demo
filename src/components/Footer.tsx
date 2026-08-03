import Link from "next/link";
import { Camera, Users, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer id="kontakt" className="border-t-2 border-amber bg-cream">
      <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 sm:py-24">
        <span className="font-serif-display text-3xl tracking-[0.3em] text-ink sm:text-4xl">LOKA</span>
        <p className="mx-auto mt-4 max-w-sm text-sm text-ink-soft">
          Studio fryzjerskie łączące klasyczne rzemiosło z nowoczesnym stylem.
        </p>

        <div className="mt-6 flex items-center justify-center gap-3">
          <a href="#" aria-label="Instagram" className="flex h-9 w-9 items-center justify-center border border-line text-ink-soft transition hover:border-amber hover:text-amber">
            <Camera size={16} />
          </a>
          <a href="#" aria-label="Facebook" className="flex h-9 w-9 items-center justify-center border border-line text-ink-soft transition hover:border-amber hover:text-amber">
            <Users size={16} />
          </a>
          <a
            href="https://www.google.com/maps"
            target="_blank"
            rel="noreferrer"
            aria-label="Mapa"
            className="flex h-9 w-9 items-center justify-center border border-line text-ink-soft transition hover:border-amber hover:text-amber"
          >
            <MapPin size={16} />
          </a>
        </div>

        <div className="mx-auto mt-10 h-px w-16 bg-amber" />

        <div className="mt-10 grid grid-cols-1 gap-6 text-sm text-ink-soft sm:grid-cols-3">
          <div>
            <div className="text-[11px] uppercase tracking-[0.2em] text-amber">Adres</div>
            <div className="mt-2">ul. Kwiatowa 12, Warszawa</div>
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-[0.2em] text-amber">Kontakt</div>
            <div className="mt-2">+48 500 100 200</div>
            <div>kontakt@loka-studio.pl</div>
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-[0.2em] text-amber">Godziny</div>
            <div className="mt-2">Pon–Sob: 9:00–19:00</div>
            <div>Niedziela: nieczynne</div>
          </div>
        </div>

        <nav className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs uppercase tracking-[0.15em] text-ink-soft">
          <Link href="/uslugi" className="hover:text-amber">Usługi</Link>
          <Link href="/zespol" className="hover:text-amber">Zespół</Link>
          <Link href="/rezerwacja" className="hover:text-amber">Rezerwacja</Link>
          <Link href="/admin/rezerwacje" className="hover:text-amber">Panel administracyjny</Link>
        </nav>

        <p className="mt-10 text-[11px] text-ink-soft/70">
          © {new Date().getFullYear()} LOKA. Projekt demonstracyjny portfolio — dane i wizyty mogą być przykładowe.
        </p>
      </div>
    </footer>
  );
}
