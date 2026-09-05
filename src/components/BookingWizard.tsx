"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { formatPrice, formatDuration } from "@/lib/format";

type Service = {
  id: string;
  slug: string;
  name: string;
  category: string;
  durationMin: number;
  priceCents: number;
};

type Stylist = {
  id: string;
  name: string;
  title: string;
  workDays: string;
};

const STEPS = ["Usługa", "Stylista", "Termin", "Dane"];

function nextDays(count: number): Date[] {
  const out: Date[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  for (let i = 0; i < count; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() + i);
    out.push(d);
  }
  return out;
}

function toDateStr(d: Date): string {
  return d.toISOString().slice(0, 10);
}

export default function BookingWizard({
  services,
  stylists,
  preselectedServiceSlug,
}: {
  services: Service[];
  stylists: Stylist[];
  preselectedServiceSlug?: string;
}) {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [serviceId, setServiceId] = useState<string>(
    services.find((s) => s.slug === preselectedServiceSlug)?.id ?? ""
  );
  const [stylistId, setStylistId] = useState<string>("");
  const [dateStr, setDateStr] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [slots, setSlots] = useState<string[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", notes: "" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (preselectedServiceSlug) setStep(1);
  }, [preselectedServiceSlug]);

  const selectedService = services.find((s) => s.id === serviceId);
  const selectedStylist = stylists.find((s) => s.id === stylistId);

  const days = useMemo(() => nextDays(14), []);
  const availableDays = useMemo(() => {
    if (!selectedStylist) return days;
    const workDays = selectedStylist.workDays.split(",").map(Number);
    return days.filter((d) => workDays.includes(d.getDay()));
  }, [days, selectedStylist]);

  useEffect(() => {
    if (!stylistId || !serviceId || !dateStr) {
      setSlots([]);
      return;
    }
    setLoadingSlots(true);
    setTime("");
    fetch(`/api/availability?stylistId=${stylistId}&serviceId=${serviceId}&date=${dateStr}`)
      .then((r) => r.json())
      .then((data) => setSlots(data.slots ?? []))
      .catch(() => setSlots([]))
      .finally(() => setLoadingSlots(false));
  }, [stylistId, serviceId, dateStr]);

  const grouped = useMemo(() => {
    const map = new Map<string, Service[]>();
    for (const s of services) {
      if (!map.has(s.category)) map.set(s.category, []);
      map.get(s.category)!.push(s);
    }
    return Array.from(map.entries());
  }, [services]);

  async function submit() {
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceId,
          stylistId,
          date: dateStr,
          startTime: time,
          customerName: form.name,
          customerEmail: form.email,
          customerPhone: form.phone,
          notes: form.notes,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Coś poszło nie tak.");
        setSubmitting(false);
        return;
      }
      router.push(`/rezerwacja/potwierdzenie?id=${data.id}`);
    } catch {
      setError("Nie udało się połączyć z serwerem. Spróbuj ponownie.");
      setSubmitting(false);
    }
  }

  return (
    <div>
      {/* Progress */}
      <div className="mb-8 flex items-center justify-between">
        {STEPS.map((label, i) => (
          <div key={label} className="flex flex-1 items-center">
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-none text-xs font-medium transition ${
                  i <= step ? "bg-ink text-cream" : "bg-cream-dark text-ink-soft"
                }`}
              >
                {i + 1}
              </div>
              <span className={`hidden text-xs sm:block ${i <= step ? "text-ink" : "text-ink-soft"}`}>{label}</span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={`mx-2 h-px flex-1 ${i < step ? "bg-ink" : "bg-line"}`} />
            )}
          </div>
        ))}
      </div>

      {/* Step 0: Service */}
      {step === 0 && (
        <div className="space-y-6">
          {grouped.map(([category, items]) => (
            <div key={category}>
              <h3 className="mb-2 text-xs uppercase tracking-wide text-ink-soft">{category}</h3>
              <div className="grid gap-2 sm:grid-cols-2">
                {items.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setServiceId(s.id)}
                    className={`flex items-center justify-between rounded-none border px-4 py-3 text-left text-sm transition ${
                      serviceId === s.id ? "border-ink bg-ink text-cream" : "border-line bg-surface text-ink hover:border-amber"
                    }`}
                  >
                    <span>
                      <span className="block font-medium">{s.name}</span>
                      <span className={`block text-xs ${serviceId === s.id ? "text-cream/70" : "text-ink-soft"}`}>
                        {formatDuration(s.durationMin)}
                      </span>
                    </span>
                    <span className="font-medium">{formatPrice(s.priceCents)}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
          <button
            disabled={!serviceId}
            onClick={() => setStep(1)}
            className="w-full rounded-none bg-ink px-6 py-3 text-sm text-cream transition hover:bg-amber-dark disabled:cursor-not-allowed disabled:opacity-40"
          >
            Dalej
          </button>
        </div>
      )}

      {/* Step 1: Stylist */}
      {step === 1 && (
        <div className="space-y-4">
          <div className="grid gap-2 sm:grid-cols-2">
            {stylists.map((s) => (
              <button
                key={s.id}
                onClick={() => setStylistId(s.id)}
                className={`rounded-none border px-4 py-3 text-left text-sm transition ${
                  stylistId === s.id ? "border-ink bg-ink text-cream" : "border-line bg-surface text-ink hover:border-amber"
                }`}
              >
                <span className="block font-medium">{s.name}</span>
                <span className={`block text-xs ${stylistId === s.id ? "text-cream/70" : "text-ink-soft"}`}>{s.title}</span>
              </button>
            ))}
          </div>
          <div className="flex gap-3">
            <button onClick={() => setStep(0)} className="rounded-none border border-line px-6 py-3 text-sm text-ink transition hover:border-amber">
              Wstecz
            </button>
            <button
              disabled={!stylistId}
              onClick={() => setStep(2)}
              className="flex-1 rounded-none bg-ink px-6 py-3 text-sm text-cream transition hover:bg-amber-dark disabled:cursor-not-allowed disabled:opacity-40"
            >
              Dalej
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Date + time */}
      {step === 2 && (
        <div className="space-y-6">
          <div>
            <h3 className="mb-2 text-xs uppercase tracking-wide text-ink-soft">Wybierz dzień</h3>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {availableDays.map((d) => {
                const ds = toDateStr(d);
                const active = dateStr === ds;
                return (
                  <button
                    key={ds}
                    onClick={() => setDateStr(ds)}
                    className={`flex shrink-0 flex-col items-center rounded-none border px-3.5 py-2.5 text-xs transition ${
                      active ? "border-ink bg-ink text-cream" : "border-line bg-surface text-ink hover:border-amber"
                    }`}
                  >
                    <span className="uppercase">{d.toLocaleDateString("pl-PL", { weekday: "short" })}</span>
                    <span className="mt-0.5 text-sm font-medium">{d.getDate()}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {dateStr && (
            <div>
              <h3 className="mb-2 text-xs uppercase tracking-wide text-ink-soft">Wybierz godzinę</h3>
              {loadingSlots ? (
                <p className="text-sm text-ink-soft">Sprawdzanie dostępności…</p>
              ) : slots.length === 0 ? (
                <p className="text-sm text-ink-soft">Brak wolnych terminów tego dnia. Wybierz inny dzień.</p>
              ) : (
                <div className="grid grid-cols-4 gap-2 sm:grid-cols-6">
                  {slots.map((t) => (
                    <button
                      key={t}
                      onClick={() => setTime(t)}
                      className={`rounded-none border px-2 py-2 text-sm transition ${
                        time === t ? "border-ink bg-ink text-cream" : "border-line bg-surface text-ink hover:border-amber"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          <div className="flex gap-3">
            <button onClick={() => setStep(1)} className="rounded-none border border-line px-6 py-3 text-sm text-ink transition hover:border-amber">
              Wstecz
            </button>
            <button
              disabled={!time}
              onClick={() => setStep(3)}
              className="flex-1 rounded-none bg-ink px-6 py-3 text-sm text-cream transition hover:bg-amber-dark disabled:cursor-not-allowed disabled:opacity-40"
            >
              Dalej
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Contact details */}
      {step === 3 && (
        <div className="space-y-5">
          <div className="rounded-none border border-line bg-surface p-4 text-sm">
            <div className="flex justify-between"><span className="text-ink-soft">Usługa</span><span className="text-ink">{selectedService?.name}</span></div>
            <div className="mt-1.5 flex justify-between"><span className="text-ink-soft">Stylista</span><span className="text-ink">{selectedStylist?.name}</span></div>
            <div className="mt-1.5 flex justify-between"><span className="text-ink-soft">Termin</span><span className="text-ink">{dateStr} · {time}</span></div>
            <div className="mt-1.5 flex justify-between border-t border-line pt-1.5"><span className="text-ink-soft">Cena</span><span className="font-medium text-ink">{selectedService && formatPrice(selectedService.priceCents)}</span></div>
          </div>

          <div className="rounded-none border border-amber/40 bg-amber/10 px-4 py-3 text-xs text-amber sm:text-sm">
            To projekt demonstracyjny portfolio - nie podawaj tu prawdziwych danych osobowych. Wpisz dowolne
            przykładowe imię, e-mail i numer telefonu.
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="text-sm text-ink-soft">
              Imię i nazwisko
              <input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="mt-1 w-full rounded-none border border-line bg-surface px-3 py-2.5 text-ink outline-none focus:border-amber"
              />
            </label>
            <label className="text-sm text-ink-soft">
              Telefon
              <input
                required
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="mt-1 w-full rounded-none border border-line bg-surface px-3 py-2.5 text-ink outline-none focus:border-amber"
              />
            </label>
          </div>
          <label className="block text-sm text-ink-soft">
            E-mail
            <input
              required
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="mt-1 w-full rounded-none border border-line bg-surface px-3 py-2.5 text-ink outline-none focus:border-amber"
            />
          </label>
          <label className="block text-sm text-ink-soft">
            Uwagi (opcjonalnie)
            <textarea
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              rows={2}
              className="mt-1 w-full rounded-none border border-line bg-surface px-3 py-2.5 text-ink outline-none focus:border-amber"
            />
          </label>

          {error && <p className="text-sm text-red-400">{error}</p>}

          <div className="flex gap-3">
            <button onClick={() => setStep(2)} className="rounded-none border border-line px-6 py-3 text-sm text-ink transition hover:border-amber">
              Wstecz
            </button>
            <button
              disabled={!form.name || !form.email || !form.phone || submitting}
              onClick={submit}
              className="flex-1 rounded-none bg-ink px-6 py-3 text-sm text-cream transition hover:bg-amber-dark disabled:cursor-not-allowed disabled:opacity-40"
            >
              {submitting ? "Rezerwowanie…" : "Potwierdź rezerwację"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
