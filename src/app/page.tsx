import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import ServiceCard from "@/components/ServiceCard";
import StylistCard from "@/components/StylistCard";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const testimonials = [
  { name: "Marta W.", text: "Najlepsze balayage jakie kiedykolwiek miałam. Rezerwacja online zajęła dosłownie minutę.", rating: 5 },
  { name: "Kamil S.", text: "Regularnie strzygę się u Kacpra — zawsze punktualnie i dokładnie tak jak chciałem.", rating: 5 },
  { name: "Aleksandra P.", text: "Upięcie na wesele siostry było przepiękne. Polecam każdemu, kto szuka czegoś wyjątkowego.", rating: 5 },
];

export default async function HomePage() {
  const [popularServices, stylists] = await Promise.all([
    prisma.service.findMany({ where: { popular: true }, take: 4 }),
    prisma.stylist.findMany({ take: 5 }),
  ]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HairSalon",
    name: "LOKA — Studio Fryzjerskie",
    image: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?q=80&w=1200",
    address: {
      "@type": "PostalAddress",
      streetAddress: "ul. Kwiatowa 12",
      addressLocality: "Warszawa",
      addressCountry: "PL",
    },
    telephone: "+48500100200",
    priceRange: "80–500 PLN",
    openingHoursSpecification: [
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"], opens: "09:00", closes: "19:00" },
    ],
    url: "https://loka-salon-demo.vercel.app",
  };

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 sm:py-20 md:grid-cols-2 md:py-28">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-amber-dark">Studio fryzjerskie</span>
            <h1 className="mt-4 font-serif-display text-3xl leading-tight text-ink sm:text-4xl md:text-5xl">
              Rzemiosło, styl i uwaga do szczegółu
            </h1>
            <p className="mt-5 max-w-md text-ink-soft">
              Strzyżenie, koloryzacja, stylizacja i pielęgnacja w sercu miasta. Zarezerwuj wizytę online — wybierz usługę,
              fryzjera i dogodny termin w niecałe dwie minuty.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/rezerwacja" className="rounded-full bg-ink px-6 py-3 text-sm text-cream transition hover:bg-amber-dark">
                Zarezerwuj wizytę
              </Link>
              <Link href="/uslugi" className="rounded-full border border-line px-6 py-3 text-sm text-ink transition hover:border-amber">
                Zobacz cennik
              </Link>
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-cream-dark">
            <Image
              src="https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?q=80&w=1200&auto=format&fit=crop"
              alt="Wnętrze salonu LOKA"
              fill
              priority
              className="object-cover"
              sizes="(min-width: 768px) 50vw, 100vw"
            />
          </div>
        </div>
      </section>

      {/* Popular services */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-amber-dark">Popularne</span>
            <h2 className="mt-2 font-serif-display text-2xl text-ink sm:text-3xl">Najczęściej wybierane usługi</h2>
          </div>
          <Link href="/uslugi" className="text-sm text-amber-dark hover:text-ink">
            Zobacz wszystkie usługi →
          </Link>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-4 sm:mt-10 sm:gap-6 md:grid-cols-4">
          {popularServices.map((s) => (
            <ServiceCard key={s.id} service={s} />
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="border-y border-line bg-cream-dark/50">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20">
          <div className="text-center">
            <span className="text-xs uppercase tracking-[0.3em] text-amber-dark">Zespół</span>
            <h2 className="mt-2 font-serif-display text-2xl text-ink sm:text-3xl">Poznaj naszych stylistów</h2>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-8 sm:mt-14 md:grid-cols-5 md:gap-6">
            {stylists.map((s) => (
              <StylistCard key={s.id} stylist={s} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="opinie" className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20">
        <div className="text-center">
          <span className="text-xs uppercase tracking-[0.3em] text-amber-dark">Opinie</span>
          <h2 className="mt-2 font-serif-display text-2xl text-ink sm:text-3xl">Co mówią nasi klienci</h2>
        </div>
        <div className="mt-10 grid gap-6 sm:mt-14 md:grid-cols-3">
          {testimonials.map((t) => (
            <div key={t.name} className="rounded-2xl border border-line bg-white p-6">
              <div className="text-amber">{"★".repeat(t.rating)}</div>
              <p className="mt-3 text-sm text-ink-soft">&ldquo;{t.text}&rdquo;</p>
              <div className="mt-4 text-sm font-medium text-ink">{t.name}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-ink">
        <div className="mx-auto max-w-4xl px-4 py-14 text-center sm:px-6 sm:py-20">
          <h2 className="font-serif-display text-2xl text-cream sm:text-3xl">Gotowy na zmianę stylu?</h2>
          <p className="mt-3 text-cream/70">Zarezerwuj wizytę online — bez telefonów, bez czekania.</p>
          <Link
            href="/rezerwacja"
            className="mt-7 inline-block rounded-full bg-amber px-7 py-3 text-sm text-white transition hover:bg-amber-dark"
          >
            Zarezerwuj wizytę
          </Link>
        </div>
      </section>
    </div>
  );
}
