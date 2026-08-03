import Image from "next/image";

type Stylist = {
  name: string;
  title: string;
  bio: string;
  image: string;
};

export default function StylistCard({ stylist }: { stylist: Stylist }) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="relative h-40 w-40 overflow-hidden rounded-full bg-cream-dark sm:h-48 sm:w-48">
        <Image src={stylist.image} alt={stylist.name} fill className="object-cover" sizes="200px" />
      </div>
      <h3 className="mt-4 font-serif-display text-lg text-ink">{stylist.name}</h3>
      <span className="text-xs uppercase tracking-wide text-amber-dark">{stylist.title}</span>
      <p className="mt-2 max-w-[220px] text-sm text-ink-soft">{stylist.bio}</p>
    </div>
  );
}
