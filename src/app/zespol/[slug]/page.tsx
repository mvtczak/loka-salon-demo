import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { formatWorkDays } from "@/lib/format";
import Eyebrow from "@/components/Eyebrow";
import { Calendar, ArrowRight, ArrowLeft, Clock } from "lucide-react";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const stylist = await prisma.stylist.findUnique({ where: { slug } });
  if (!stylist) return {};
  return {
    title: stylist.name,
    description: `${stylist.name} - ${stylist.title} w LOKA. ${stylist.bio}`,
    alternates: { canonical: `/zespol/${stylist.slug}` },
  };
}

export default async function StylistPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const stylist = await prisma.stylist.findUnique({ where: { slug } });
  if (!stylist) notFound();

  return (
    <div>
      <section className="border-b border-line">
        <div className="mx-auto grid max-w-6xl gap-0 px-4 sm:px-6 md:grid-cols-2">
          <div className="relative aspect-[4/5] overflow-hidden border-x border-line bg-cream-dark md:aspect-auto">
            <Image
              src={stylist.image}
              alt={stylist.name}
              fill
              priority
              className="object-cover grayscale-[35%]"
              sizes="(min-width: 768px) 50vw, 100vw"
            />
          </div>
          <div className="flex flex-col justify-center border-x border-line px-4 py-10 sm:px-8 sm:py-14">
            <Link
              href="/zespol"
              className="mb-6 inline-flex w-fit items-center gap-2 text-xs uppercase tracking-[0.15em] text-ink-soft transition hover:text-amber"
            >
              <ArrowLeft size={13} strokeWidth={2} />
              Zespół
            </Link>
            <Eyebrow>{stylist.title}</Eyebrow>
            <h1 className="mt-3 font-serif-display text-3xl leading-[0.95] text-ink sm:text-5xl">{stylist.name}</h1>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-ink-soft sm:text-base">{stylist.bio}</p>

            <div className="mt-7 flex items-start gap-2.5 text-sm text-ink-soft">
              <Clock size={16} strokeWidth={2} className="mt-0.5 shrink-0 text-amber" />
              <span>
                Pracuje: {formatWorkDays(stylist.workDays)}
                <br />
                Godziny: {String(stylist.startHour).padStart(2, "0")}:00 - {String(stylist.endHour).padStart(2, "0")}:00
              </span>
            </div>

            <div className="mt-8">
              <Link
                href={`/rezerwacja?stylist=${stylist.slug}`}
                className="group inline-flex items-center gap-2.5 border border-amber bg-amber px-6 py-3 text-xs uppercase tracking-[0.15em] text-onamber shadow-amber-glow transition hover:bg-transparent hover:text-amber"
              >
                <Calendar size={14} strokeWidth={2} />
                Umów się do {stylist.name.split(" ")[0]}
                <ArrowRight size={14} strokeWidth={2} className="transition group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
