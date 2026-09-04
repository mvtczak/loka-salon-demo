import Link from "next/link";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { formatPrice, formatDateLong } from "@/lib/format";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Rezerwacja potwierdzona",
  robots: { index: false, follow: false },
};

export default async function ConfirmationPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>;
}) {
  const { id } = await searchParams;
  const booking = id
    ? await prisma.booking.findUnique({ where: { id }, include: { service: true, stylist: true } })
    : null;

  if (!booking) {
    return (
      <div className="mx-auto max-w-md px-4 py-20 text-center sm:px-6">
        <h1 className="font-serif-display text-2xl text-ink">Nie znaleziono rezerwacji</h1>
        <Link href="/rezerwacja" className="mt-4 inline-block text-sm text-amber hover:text-ink">
          Zarezerwuj wizytę →
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md px-4 py-16 text-center sm:px-6 sm:py-24">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-none bg-amber/15">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M5 13l4 4L19 7" stroke="var(--amber-dark)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <h1 className="mt-5 font-serif-display text-2xl text-ink sm:text-3xl">Wizyta zarezerwowana</h1>
      <p className="mt-2 text-sm text-ink-soft">
        Potwierdzenie zostało &bdquo;wysłane&rdquo; na adres {booking.customerEmail} (demo - e-mail nie jest realnie wysyłany).
      </p>

      <div className="mt-8 rounded-none border border-line bg-surface p-5 text-left text-sm">
        <div className="flex justify-between"><span className="text-ink-soft">Usługa</span><span className="text-ink">{booking.service.name}</span></div>
        <div className="mt-2 flex justify-between"><span className="text-ink-soft">Stylista</span><span className="text-ink">{booking.stylist.name}</span></div>
        <div className="mt-2 flex justify-between"><span className="text-ink-soft">Termin</span><span className="text-ink">{formatDateLong(booking.date)}, {booking.startTime}</span></div>
        <div className="mt-2 flex justify-between border-t border-line pt-2"><span className="text-ink-soft">Cena</span><span className="font-medium text-ink">{formatPrice(booking.service.priceCents)}</span></div>
      </div>

      <Link href="/" className="mt-8 inline-block rounded-none bg-ink px-6 py-3 text-sm text-cream transition hover:bg-amber-dark">
        Powrót do strony głównej
      </Link>
    </div>
  );
}
