import Image from "next/image";
import Link from "next/link";

type Stylist = {
  slug: string;
  name: string;
  title: string;
  bio: string;
  image: string;
};

export default function StylistCard({ stylist, index }: { stylist: Stylist; index?: number }) {
  return (
    <Link
      href={`/zespol/${stylist.slug}`}
      className="group block border border-line bg-surface transition duration-300 hover:border-amber/60 hover:shadow-amber-glow"
    >
      <div className="relative aspect-[3/4] overflow-hidden border-b border-line bg-cream-dark">
        <Image
          src={stylist.image}
          alt={stylist.name}
          fill
          className="object-cover grayscale-[65%] transition duration-500 group-hover:scale-105 group-hover:grayscale-0"
          sizes="240px"
        />
        {typeof index === "number" && (
          <span className="absolute left-0 top-0 bg-ink px-2 py-1 font-serif-display text-xs text-cream">
            {String(index + 1).padStart(2, "0")}
          </span>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-serif-display text-base text-ink">{stylist.name}</h3>
        <span className="text-xs uppercase tracking-wide text-amber">{stylist.title}</span>
        <p className="mt-2 text-sm leading-relaxed text-ink-soft">{stylist.bio}</p>
        <span className="mt-3 inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.15em] text-ink-soft transition group-hover:text-amber">
          Zobacz profil
          <span className="transition group-hover:translate-x-1">→</span>
        </span>
      </div>
    </Link>
  );
}
