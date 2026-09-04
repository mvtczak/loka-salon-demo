import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import ServiceCard from "@/components/ServiceCard";
import StylistCard from "@/components/StylistCard";
import Eyebrow from "@/components/Eyebrow";
import { Calendar, ArrowRight, ScissorsIcon, Quote, ChevronDown } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const testimonials = [
  { name: "Marta W.", text: "Najlepsze balayage jakie kiedykolwiek miałam. Rezerwacja online zajęła dosłownie minutę.", rating: 5 },
  { name: "Kamil S.", text: "Regularnie strzygę się u Kacpra — zawsze punktualnie i dokładnie tak jak chciałem.", rating: 5 },
  { name: "Aleksandra P.", text: "Upięcie na wesele siostry było przepiękne. Polecam każdemu, kto szuka czegoś wyjątkowego.", rating: 5 },
];

const marqueeItems = ["Strzyżenie", "Koloryzacja", "Balayage", "Stylizacja", "Pielęgnacja", "Upięcia"];

const gallery = [
  "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1605497788044-5a32c7078486?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1560869713-7d0a29430803?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1519699047748-de8e457a634e?q=80&w=800&auto=format&fit=crop",
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
      <section className="bg-grain relative flex min-h-[86vh] items-end overflow-hidden border-b-2 border-amber sm:min-h-[92vh]">
        <Image
          src="https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?q=80&w=1600&auto=format&fit=crop"
          alt="Wnętrze salonu LOKA"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e0c0a] via-[#0e0c0a]/75 to-[#0e0c0a]/25" />
        <div className="animate-fade-up relative mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6 sm:pb-24">
          <span className="text-xs uppercase tracking-[0.4em] text-amber">Studio fryzjerskie · od 2014</span>
          <h1 className="mt-4 font-serif-display text-4xl leading-[0.95] text-ink sm:text-6xl md:text-7xl">
            Rzemiosło.
            <br />
            Styl. Szczegół.
          </h1>
          <p className="mt-6 max-w-md text-ink-soft">
            Strzyżenie, koloryzacja, stylizacja i pielęgnacja w sercu miasta. Zarezerwuj wizytę online — wybierz usługę,
            fryzjera i dogodny termin w niecałe dwie minuty.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/rezerwacja" className="group inline-flex items-center gap-2.5 border border-amber bg-amber px-6 py-3 text-xs uppercase tracking-[0.15em] text-onamber shadow-amber-glow transition hover:bg-transparent hover:text-amber">
              <Calendar size={14} strokeWidth={2} />
              Zarezerwuj wizytę
              <ArrowRight size={14} strokeWidth={2} className="transition group-hover:translate-x-1" />
            </Link>
            <Link href="/uslugi" className="inline-flex items-center gap-2.5 border border-ink-soft/40 px-6 py-3 text-xs uppercase tracking-[0.15em] text-ink transition hover:border-amber">
              <ScissorsIcon size={14} strokeWidth={2} />
              Zobacz cennik
            </Link>
          </div>
        </div>
        <ChevronDown size={20} className="absolute bottom-6 right-6 hidden animate-bounce text-amber/70 sm:block" />
      </section>

      {/* Marquee strip */}
      <div className="overflow-hidden border-b border-line bg-surface py-3">
        <div className="animate-marquee flex w-max items-center gap-10 whitespace-nowrap">
          {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="flex items-center gap-10 text-xs uppercase tracking-[0.3em] text-ink-soft">
              {item}
              <span className="text-amber">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* Popular services */}
      <section className="mx-auto max-w-4xl px-4 py-14 sm:px-6 sm:py-20">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <Eyebrow>Cennik</Eyebrow>
            <h2 className="mt-2 font-serif-display text-2xl text-ink sm:text-3xl">Najczęściej wybierane usługi</h2>
          </div>
          <Link href="/uslugi" className="text-xs uppercase tracking-[0.15em] text-amber transition hover:text-ink">
            Pełny cennik →
          </Link>
        </div>
        <div className="mt-6 border-t border-line sm:mt-8">
          {popularServices.map((s, i) => (
            <ServiceCard key={s.id} service={s} index={i} />
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="border-y border-line bg-cream-dark/50">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20">
          <div className="text-center">
            <Eyebrow align="center">Zespół</Eyebrow>
            <h2 className="mt-2 font-serif-display text-2xl text-ink sm:text-3xl">Poznaj naszych stylistów</h2>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-8 sm:mt-14 md:grid-cols-5 md:gap-6">
            {stylists.map((s, i) => (
              <StylistCard key={s.id} stylist={s} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20">
        <div className="text-center">
          <Eyebrow align="center">Galeria</Eyebrow>
          <h2 className="mt-2 font-serif-display text-2xl text-ink sm:text-3xl">Nasze realizacje</h2>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-3 sm:mt-14 sm:gap-4 md:grid-cols-4 md:auto-rows-[9rem]">
          {gallery.map((src, i) => (
            <div
              key={i}
              className={`group relative overflow-hidden bg-cream-dark ${
                i === 0 ? "col-span-2 row-span-2 aspect-square md:aspect-auto" : "aspect-square md:aspect-auto"
              }`}
            >
              <Image
                src={src}
                alt="Realizacja LOKA"
                fill
                className="object-cover grayscale-[15%] transition duration-500 group-hover:scale-105 group-hover:grayscale-0"
                sizes="(min-width: 768px) 25vw, 50vw"
              />
              <div className="absolute inset-0 bg-ink/0 transition group-hover:bg-ink/10" />
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section id="opinie" className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20">
        <div className="text-center">
          <Eyebrow align="center">Opinie</Eyebrow>
          <h2 className="mt-2 font-serif-display text-2xl text-ink sm:text-3xl">Co mówią nasi klienci</h2>
        </div>
        <div className="mt-10 grid gap-6 sm:mt-14 md:grid-cols-3">
          {testimonials.map((t) => (
            <div key={t.name} className="group relative border border-line bg-surface p-6 transition duration-300 hover:-translate-y-1 hover:border-amber/60">
              <Quote size={28} className="text-amber/30" fill="currentColor" strokeWidth={0} />
              <div className="mt-2 text-amber">{"★".repeat(t.rating)}</div>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">&ldquo;{t.text}&rdquo;</p>
              <div className="mt-4 text-sm font-medium uppercase tracking-wide text-ink">{t.name}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-grain bg-ink">
        <div className="relative mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 sm:py-24">
          <h2 className="font-serif-display text-2xl text-cream sm:text-3xl">Gotowy na zmianę stylu?</h2>
          <p className="mt-3 text-cream/70">Zarezerwuj wizytę online — bez telefonów, bez czekania.</p>
          <Link
            href="/rezerwacja"
            className="group mt-7 inline-flex items-center gap-2.5 border border-amber bg-amber px-7 py-3 text-xs uppercase tracking-[0.15em] text-onamber shadow-amber-glow transition hover:bg-transparent hover:text-amber"
          >
            <Calendar size={14} strokeWidth={2} />
            Zarezerwuj wizytę
            <ArrowRight size={14} strokeWidth={2} className="transition group-hover:translate-x-1" />
          </Link>
        </div>
      </section>
    </div>
  );
}
