import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import ServiceCard from "@/components/ServiceCard";
import Eyebrow from "@/components/Eyebrow";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Usługi i cennik",
  description: "Pełny cennik usług fryzjerskich LOKA — strzyżenie, koloryzacja, stylizacja, pielęgnacja i usługi dla brody.",
  alternates: { canonical: "/uslugi" },
};

export default async function ServicesPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const services = await prisma.service.findMany({
    where: category ? { category } : undefined,
    orderBy: { category: "asc" },
  });
  const allCategories = await prisma.service.findMany({
    select: { category: true },
    distinct: ["category"],
  });
  const categories = allCategories.map((c) => c.category);

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14">
      <div className="mb-8 sm:mb-10">
        <Eyebrow>Cennik</Eyebrow>
        <h1 className="mt-2 font-serif-display text-2xl text-ink sm:text-3xl">Usługi</h1>
      </div>

      <div className="flex flex-wrap gap-1 border-b border-line pb-4 text-xs uppercase tracking-[0.15em]">
        <Link
          href="/uslugi"
          className={`px-3 py-2 transition ${
            !category ? "bg-amber text-onamber" : "text-ink-soft hover:text-ink"
          }`}
        >
          Wszystkie
        </Link>
        {categories.map((c) => (
          <Link
            key={c}
            href={`/uslugi?category=${encodeURIComponent(c)}`}
            className={`px-3 py-2 transition ${
              category === c ? "bg-amber text-onamber" : "text-ink-soft hover:text-ink"
            }`}
          >
            {c}
          </Link>
        ))}
      </div>

      <div className="mt-2">
        {services.map((s) => (
          <ServiceCard key={s.id} service={s} />
        ))}
      </div>
    </div>
  );
}
