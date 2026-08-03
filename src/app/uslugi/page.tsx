import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import ServiceCard from "@/components/ServiceCard";

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
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
      <div className="mb-8 sm:mb-10">
        <span className="text-xs uppercase tracking-[0.3em] text-amber-dark">Cennik</span>
        <h1 className="mt-2 font-serif-display text-2xl text-ink sm:text-3xl">Usługi</h1>
      </div>

      <div className="flex flex-wrap gap-2">
        <Link
          href="/uslugi"
          className={`rounded-full border px-4 py-1.5 text-sm transition ${
            !category ? "border-ink bg-ink text-white" : "border-line text-ink-soft hover:border-amber"
          }`}
        >
          Wszystkie
        </Link>
        {categories.map((c) => (
          <Link
            key={c}
            href={`/uslugi?category=${encodeURIComponent(c)}`}
            className={`rounded-full border px-4 py-1.5 text-sm transition ${
              category === c ? "border-ink bg-ink text-white" : "border-line text-ink-soft hover:border-amber"
            }`}
          >
            {c}
          </Link>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:mt-10 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
        {services.map((s) => (
          <ServiceCard key={s.id} service={s} />
        ))}
      </div>
    </div>
  );
}
