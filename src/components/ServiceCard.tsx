import Link from "next/link";
import Image from "next/image";
import { formatPrice, formatDuration } from "@/lib/format";

type Service = {
  slug: string;
  name: string;
  description: string;
  category: string;
  durationMin: number;
  priceCents: number;
  image: string;
  popular: boolean;
};

export default function ServiceCard({ service }: { service: Service }) {
  return (
    <Link
      href={`/rezerwacja?service=${service.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-surface transition hover:border-amber"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-cream-dark">
        <Image
          src={service.image}
          alt={service.name}
          fill
          className="object-cover transition duration-300 group-hover:scale-105"
          sizes="(min-width: 768px) 25vw, 50vw"
        />
        {service.popular && (
          <span className="absolute left-3 top-3 rounded-full bg-amber px-2.5 py-1 text-[11px] font-medium text-onamber">
            Popularne
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <span className="text-[11px] uppercase tracking-wide text-ink-soft">{service.category}</span>
        <h3 className="mt-1 font-serif-display text-lg text-ink">{service.name}</h3>
        <p className="mt-1.5 line-clamp-2 text-sm text-ink-soft">{service.description}</p>
        <div className="mt-3 flex items-center justify-between border-t border-line pt-3 text-sm">
          <span className="text-ink-soft">{formatDuration(service.durationMin)}</span>
          <span className="font-medium text-ink">{formatPrice(service.priceCents)}</span>
        </div>
      </div>
    </Link>
  );
}
