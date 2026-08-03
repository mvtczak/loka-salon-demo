"use client";

import { useState } from "react";

export type AdminBooking = {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  notes: string | null;
  status: string;
  serviceName: string;
  priceCents: number;
  stylistName: string;
};

function formatPLN(cents: number) {
  return new Intl.NumberFormat("pl-PL", { style: "currency", currency: "PLN" }).format(cents / 100);
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; cls: string }> = {
    confirmed: { label: "Potwierdzona", cls: "bg-amber/15 text-amber-dark" },
    completed: { label: "Zrealizowana", cls: "bg-green-100 text-green-700" },
    cancelled: { label: "Anulowana", cls: "bg-red-100 text-red-600" },
  };
  const s = map[status] ?? { label: status, cls: "bg-cream-dark text-ink-soft" };
  return <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${s.cls}`}>{s.label}</span>;
}

export default function BookingsManager({ initialBookings }: { initialBookings: AdminBooking[] }) {
  const [bookings, setBookings] = useState(initialBookings);
  const [toast, setToast] = useState("");

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(""), 2500);
  }

  function setStatus(id: string, status: string) {
    setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status } : b)));
    showToast("Zmiana widoczna tylko w tej przeglądarce — to demo, nic nie zostało zapisane trwale.");
  }

  return (
    <div className="mt-8">
      <div className="rounded-xl border border-amber/40 bg-amber/10 px-4 py-3 text-xs text-amber-dark sm:text-sm">
        To panel demonstracyjny. Oznaczanie wizyt jako zrealizowane / anulowane działa tylko lokalnie w Twojej
        przeglądarce i nie zmienia żadnych danych na serwerze.
      </div>

      {toast && (
        <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full bg-ink px-5 py-2.5 text-sm text-cream shadow-lg">
          {toast}
        </div>
      )}

      {/* Mobile: expandable card list */}
      <div className="mt-6 rounded-2xl border border-line bg-white sm:hidden">
        {bookings.length === 0 ? (
          <p className="px-4 py-10 text-center text-sm text-ink-soft">Brak wizyt.</p>
        ) : (
          bookings.map((b) => (
            <details key={b.id} className="group border-b border-line px-4 py-3 last:border-0">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 [&::-webkit-details-marker]:hidden">
                <div className="min-w-0">
                  <div className="truncate font-medium text-ink">{b.customerName}</div>
                  <div className="mt-1 flex flex-wrap items-center gap-2">
                    <StatusBadge status={b.status} />
                    <span className="text-xs text-ink-soft">
                      {new Intl.DateTimeFormat("pl-PL", { dateStyle: "short" }).format(new Date(b.date))} · {b.startTime}
                    </span>
                  </div>
                </div>
                <div className="flex shrink-0 flex-col items-end gap-1">
                  <span className="font-medium text-ink">{formatPLN(b.priceCents)}</span>
                  <span className="flex items-center gap-1 text-xs text-amber-dark">
                    Rozwiń
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0 transition group-open:rotate-180">
                      <path d="M2.5 5 7 9.5 11.5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
              </summary>

              <div className="mt-3 space-y-2.5 rounded-xl bg-cream-dark/50 p-3 text-sm">
                <div>
                  <div className="text-xs uppercase tracking-wide text-ink-soft">Usługa</div>
                  <div className="text-ink-soft">{b.serviceName} · {b.stylistName}</div>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wide text-ink-soft">Kontakt</div>
                  <div className="text-ink-soft">{b.customerEmail}</div>
                  <div className="text-ink-soft">{b.customerPhone}</div>
                </div>
                {b.notes && (
                  <div>
                    <div className="text-xs uppercase tracking-wide text-ink-soft">Uwagi</div>
                    <div className="text-ink-soft">{b.notes}</div>
                  </div>
                )}
                {b.status === "confirmed" && (
                  <div className="flex gap-2 pt-1">
                    <button onClick={() => setStatus(b.id, "completed")} className="flex-1 rounded-lg bg-ink px-3 py-2 text-xs text-cream">
                      Oznacz jako zrealizowaną
                    </button>
                    <button onClick={() => setStatus(b.id, "cancelled")} className="flex-1 rounded-lg border border-line px-3 py-2 text-xs text-ink">
                      Anuluj
                    </button>
                  </div>
                )}
              </div>
            </details>
          ))
        )}
      </div>

      {/* Desktop / tablet: full table */}
      <div className="mt-8 hidden overflow-x-auto rounded-2xl border border-line bg-white sm:block">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-line bg-cream-dark text-xs uppercase tracking-wide text-ink-soft">
            <tr>
              <th className="whitespace-nowrap px-4 py-3">Klient</th>
              <th className="whitespace-nowrap px-4 py-3">Usługa</th>
              <th className="whitespace-nowrap px-4 py-3">Stylista</th>
              <th className="whitespace-nowrap px-4 py-3">Termin</th>
              <th className="whitespace-nowrap px-4 py-3">Status</th>
              <th className="whitespace-nowrap px-4 py-3 text-right">Cena</th>
              <th className="whitespace-nowrap px-4 py-3 text-right">Akcje</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b.id} className="border-b border-line last:border-0">
                <td className="whitespace-nowrap px-4 py-3">
                  <div className="text-ink">{b.customerName}</div>
                  <div className="text-xs text-ink-soft">{b.customerEmail}</div>
                </td>
                <td className="px-4 py-3 text-ink-soft">{b.serviceName}</td>
                <td className="whitespace-nowrap px-4 py-3 text-ink-soft">{b.stylistName}</td>
                <td className="whitespace-nowrap px-4 py-3 text-ink-soft">
                  {new Intl.DateTimeFormat("pl-PL", { dateStyle: "medium" }).format(new Date(b.date))} · {b.startTime}
                </td>
                <td className="whitespace-nowrap px-4 py-3">
                  <StatusBadge status={b.status} />
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-right font-medium text-ink">{formatPLN(b.priceCents)}</td>
                <td className="whitespace-nowrap px-4 py-3 text-right">
                  {b.status === "confirmed" && (
                    <div className="flex justify-end gap-2">
                      <button onClick={() => setStatus(b.id, "completed")} className="rounded-lg bg-ink px-3 py-1.5 text-xs text-cream hover:bg-amber-dark">
                        Zrealizowana
                      </button>
                      <button onClick={() => setStatus(b.id, "cancelled")} className="rounded-lg border border-line px-3 py-1.5 text-xs text-ink hover:border-amber">
                        Anuluj
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
            {bookings.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-10 text-center text-ink-soft">
                  Brak wizyt.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-xs text-ink-soft">
        Dane demonstracyjne — klienci i wizyty są wygenerowane losowo do celów prezentacji.
      </p>
    </div>
  );
}
