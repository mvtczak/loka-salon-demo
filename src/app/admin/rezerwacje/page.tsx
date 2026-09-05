import { prisma } from "@/lib/prisma";
import BookingsManager, { type AdminBooking } from "@/components/admin/BookingsManager";
import { Clock, CalendarDays, TrendingUp, CalendarCheck } from "lucide-react";

export const dynamic = "force-dynamic";

function sumRevenue(bookings: { priceCents: number; status: string }[]) {
  return bookings.filter((b) => b.status !== "cancelled").reduce((sum, b) => sum + b.priceCents, 0);
}

function countActive(bookings: { status: string }[]) {
  return bookings.filter((b) => b.status !== "cancelled").length;
}

function pctChange(current: number, previous: number): string | null {
  if (previous === 0) return null;
  const change = ((current - previous) / previous) * 100;
  const sign = change >= 0 ? "+" : "";
  return `${sign}${change.toFixed(0)}%`;
}

export default async function AdminBookingsPage({
  searchParams,
}: {
  searchParams: Promise<{ key?: string }>;
}) {
  const { key } = await searchParams;
  const adminKey = process.env.ADMIN_KEY;

  if (adminKey && key !== adminKey) {
    return (
      <div className="mx-auto max-w-md px-4 py-16 sm:px-6 sm:py-24">
        <h1 className="font-serif-display text-2xl text-ink">Panel administracyjny</h1>
        <p className="mt-2 text-sm text-ink-soft">
          Dostęp chroniony. Dodaj <code className="rounded bg-cream-dark px-1">?key=TWOJ_KLUCZ</code> do adresu URL
          (ustawiony w zmiennej środowiskowej <code className="rounded bg-cream-dark px-1">ADMIN_KEY</code>).
        </p>
      </div>
    );
  }

  const rawBookings = await prisma.booking.findMany({
    orderBy: { date: "desc" },
    include: { service: true, stylist: true },
  });

  const bookings: AdminBooking[] = rawBookings.map((b) => ({
    id: b.id,
    date: b.date.toISOString(),
    startTime: b.startTime,
    endTime: b.endTime,
    customerName: b.customerName,
    customerEmail: b.customerEmail,
    customerPhone: b.customerPhone,
    notes: b.notes,
    status: b.status,
    serviceName: b.service.name,
    priceCents: b.service.priceCents,
    stylistName: b.stylist.name,
  }));

  const now = Date.now();
  const DAY = 24 * 60 * 60 * 1000;

  const within = (days: number, from = 0) =>
    bookings.filter((b) => {
      const age = now - new Date(b.date).getTime();
      return age <= days * DAY && age > from * DAY;
    });

  const today = within(1);
  const prevDay = within(2, 1);
  const last7 = within(7);
  const prev7 = within(14, 7);
  const last30 = within(30);
  const prev30 = within(60, 30);

  const kpis = [
    { label: "Dziś", icon: Clock, revenue: sumRevenue(today), count: countActive(today), change: pctChange(sumRevenue(today), sumRevenue(prevDay)) },
    { label: "Ostatnie 7 dni", icon: CalendarDays, revenue: sumRevenue(last7), count: countActive(last7), change: pctChange(sumRevenue(last7), sumRevenue(prev7)) },
    { label: "Ostatnie 30 dni", icon: TrendingUp, revenue: sumRevenue(last30), count: countActive(last30), change: pctChange(sumRevenue(last30), sumRevenue(prev30)) },
  ];

  const totalRevenue = sumRevenue(bookings);
  const upcomingCount = bookings.filter((b) => new Date(b.date).getTime() >= now - DAY && b.status !== "cancelled").length;

  const days = Array.from({ length: 14 }).map((_, i) => {
    const dayIndex = 13 - i;
    const dayStart = now - (dayIndex + 1) * DAY;
    const dayEnd = now - dayIndex * DAY;
    const dayBookings = bookings.filter((b) => {
      const t = new Date(b.date).getTime();
      return t >= dayStart && t < dayEnd && b.status !== "cancelled";
    });
    return {
      label: new Date(dayEnd).toLocaleDateString("pl-PL", { day: "2-digit", month: "2-digit" }),
      revenue: sumRevenue(dayBookings),
    };
  });
  const maxDayRevenue = Math.max(1, ...days.map((d) => d.revenue));

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-serif-display text-2xl text-ink sm:text-3xl">Panel administracyjny</h1>
          <p className="mt-1 flex items-center gap-1.5 text-sm text-ink-soft">
            <CalendarCheck size={14} className="text-amber" />
            {upcomingCount} nadchodzących wizyt
          </p>
        </div>
        <div className="text-left sm:text-right">
          <div className="text-xs uppercase tracking-wide text-ink-soft">Przychód łącznie</div>
          <div className="font-serif-display text-xl text-ink sm:text-2xl">
            {new Intl.NumberFormat("pl-PL", { style: "currency", currency: "PLN" }).format(totalRevenue / 100)}
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-3 sm:mt-8 sm:grid-cols-3 sm:gap-4">
        {kpis.map((k) => (
          <div key={k.label} className="rounded-none border border-line bg-surface p-4 sm:p-5">
            <div className="flex items-center gap-1.5 text-xs uppercase tracking-wide text-ink-soft">
              <k.icon size={13} className="text-amber" />
              {k.label}
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="font-serif-display text-xl text-ink sm:text-2xl">
                {new Intl.NumberFormat("pl-PL", { style: "currency", currency: "PLN" }).format(k.revenue / 100)}
              </span>
              {k.change && (
                <span className={`text-xs font-medium ${k.change.startsWith("-") ? "text-red-400" : "text-emerald-400"}`}>
                  {k.change}
                </span>
              )}
            </div>
            <div className="mt-1 text-sm text-ink-soft">{k.count} wizyt</div>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-none border border-line bg-surface p-4 sm:mt-8 sm:p-6">
        <h2 className="text-sm font-medium text-ink">Przychód dzienny - ostatnie 14 dni</h2>
        <div className="mt-5 overflow-x-auto">
          <div className="flex min-w-[480px] items-end gap-1.5 sm:min-w-0 sm:gap-2" style={{ height: 120 }}>
            {days.map((d) => (
              <div key={d.label} className="flex flex-1 flex-col items-center gap-1.5">
                <div
                  className="w-full rounded-none bg-amber/70 transition hover:bg-amber"
                  style={{ height: `${Math.max(4, (d.revenue / maxDayRevenue) * 100)}px` }}
                  title={`${d.label}: ${new Intl.NumberFormat("pl-PL", { style: "currency", currency: "PLN" }).format(d.revenue / 100)}`}
                />
                <span className="text-[10px] text-ink-soft sm:text-xs">{d.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <BookingsManager initialBookings={bookings} />
    </div>
  );
}
