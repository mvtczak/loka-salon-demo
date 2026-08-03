import Image from "next/image";

type Stylist = {
  name: string;
  title: string;
  bio: string;
  image: string;
};

export default function StylistCard({ stylist, index }: { stylist: Stylist; index?: number }) {
  return (
    <div className="border border-line bg-surface">
      <div className="relative aspect-[3/4] overflow-hidden border-b border-line bg-cream-dark">
        <Image src={stylist.image} alt={stylist.name} fill className="object-cover grayscale-[20%]" sizes="240px" />
        {typeof index === "number" && (
          <span className="absolute left-0 top-0 bg-ink px-2 py-1 font-serif-display text-xs text-cream">
            {String(index + 1).padStart(2, "0")}
          </span>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-serif-display text-base text-ink">{stylist.name}</h3>
        <span className="text-xs uppercase tracking-wide text-amber">{stylist.title}</span>
        <p className="mt-2 text-sm text-ink-soft">{stylist.bio}</p>
      </div>
    </div>
  );
}
