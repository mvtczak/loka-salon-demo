import Link from "next/link";

export default function Footer() {
  return (
    <footer id="kontakt" className="border-t border-line bg-cream-dark">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <span className="font-serif-display text-xl tracking-[0.2em] text-ink">LOKA</span>
            <p className="mt-3 max-w-xs text-sm text-ink-soft">
              Studio fryzjerskie łączące klasyczne rzemiosło z nowoczesnym stylem.
            </p>
          </div>
          <div>
            <h3 className="text-xs uppercase tracking-wide text-ink-soft">Nawigacja</h3>
            <ul className="mt-3 space-y-2 text-sm text-ink-soft">
              <li><Link href="/uslugi" className="hover:text-ink">Usługi</Link></li>
              <li><Link href="/zespol" className="hover:text-ink">Zespół</Link></li>
              <li><Link href="/rezerwacja" className="hover:text-ink">Rezerwacja</Link></li>
              <li><Link href="/admin/rezerwacje" className="hover:text-ink">Panel administracyjny</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xs uppercase tracking-wide text-ink-soft">Kontakt</h3>
            <ul className="mt-3 space-y-2 text-sm text-ink-soft">
              <li>ul. Kwiatowa 12, Warszawa</li>
              <li>+48 500 100 200</li>
              <li>kontakt@loka-studio.pl</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xs uppercase tracking-wide text-ink-soft">Godziny otwarcia</h3>
            <ul className="mt-3 space-y-2 text-sm text-ink-soft">
              <li>Pon–Sob: 9:00–19:00</li>
              <li>Niedziela: nieczynne</li>
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-line pt-6 text-xs text-ink-soft">
          © {new Date().getFullYear()} LOKA. Projekt demonstracyjny portfolio — dane i wizyty mogą być przykładowe.
        </div>
      </div>
    </footer>
  );
}
