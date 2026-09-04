import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import BookingWizard from "@/components/BookingWizard";
import Eyebrow from "@/components/Eyebrow";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Rezerwacja wizyty",
  description: "Zarezerwuj wizytę w LOKA online - wybierz usługę, stylistę i dogodny termin.",
  alternates: { canonical: "/rezerwacja" },
};

export default async function BookingPage({
  searchParams,
}: {
  searchParams: Promise<{ service?: string }>;
}) {
  const { service } = await searchParams;
  const [services, stylists] = await Promise.all([
    prisma.service.findMany({ orderBy: { category: "asc" } }),
    prisma.stylist.findMany(),
  ]);

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <div className="mb-8 text-center sm:mb-10">
        <Eyebrow align="center">Rezerwacja</Eyebrow>
        <h1 className="mt-2 font-serif-display text-2xl text-ink sm:text-3xl">Umów wizytę</h1>
      </div>
      <BookingWizard services={services} stylists={stylists} preselectedServiceSlug={service} />
    </div>
  );
}
