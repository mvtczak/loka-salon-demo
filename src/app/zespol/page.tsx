import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import StylistCard from "@/components/StylistCard";
import Eyebrow from "@/components/Eyebrow";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Zespół",
  description: "Poznaj zespół stylistów i barberów LOKA - doświadczonych specjalistów strzyżenia, koloryzacji i stylizacji.",
  alternates: { canonical: "/zespol" },
};

export default async function TeamPage() {
  const stylists = await prisma.stylist.findMany();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <div className="mb-10 text-center sm:mb-14">
        <Eyebrow align="center">Zespół</Eyebrow>
        <h1 className="mt-2 font-serif-display text-2xl text-ink sm:text-3xl">Nasi styliści i barberzy</h1>
      </div>
      <div className="grid grid-cols-2 gap-8 sm:gap-10 md:grid-cols-3">
        {stylists.map((s, i) => (
          <StylistCard key={s.id} stylist={s} index={i} />
        ))}
      </div>
    </div>
  );
}
