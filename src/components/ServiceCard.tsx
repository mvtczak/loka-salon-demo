import Link from "next/link";
import { formatPrice, formatDuration } from "@/lib/format";

type Service = {
  slug: string;
  name: string;
  description: string;
  category: string;
  durationMin: number;
  priceCents: number;
  popular: boolean;
};

export default function ServiceCard({ service, index }: { service: Service; index?: number }) {
  return (
    <Link
      href={`/rezerwacja?service=${service.slug}`}
      className="group flex items-start gap-3 border-b border-line py-4 transition hover:bg-surface sm:py-5"
    >
      {typeof index === "number" && (
        <span className="mt-0.5 shrink-0 font-serif-display text-xs text-amber/70">
          {String(index + 1).padStart(2, "0")}
        </span>
      )}
      <div className="min-w-0 flex-1">
        <div className="leader-row">
          <span className="font-serif-display text-base text-ink sm:text-lg">
            {service.name}
            {service.popular && <span className="ml-2 align-middle text-[10px] uppercase tracking-wide text-amber">★ popularne</span>}
          </span>
          <span className="leader-fill" />
          <span className="whitespace-nowrap text-base font-medium text-amber transition group-hover:text-ink sm:text-lg">
            {formatPrice(service.priceCents)}
          </span>
        </div>
        <div className="mt-1 flex items-center justify-between text-xs text-ink-soft">
          <span className="line-clamp-1">{service.description}</span>
          <span className="ml-3 shrink-0">{formatDuration(service.durationMin)}</span>
        </div>
      </div>
    </Link>
  );
}
