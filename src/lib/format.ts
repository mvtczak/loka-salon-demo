export function formatPrice(cents: number): string {
  return new Intl.NumberFormat("pl-PL", {
    style: "currency",
    currency: "PLN",
  }).format(cents / 100);
}

export function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes} min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m === 0 ? `${h} godz.` : `${h} godz. ${m} min`;
}

export function formatDateShort(d: Date): string {
  return new Intl.DateTimeFormat("pl-PL", { day: "2-digit", month: "2-digit", year: "numeric" }).format(d);
}

export function formatDateLong(d: Date): string {
  return new Intl.DateTimeFormat("pl-PL", { weekday: "long", day: "2-digit", month: "long" }).format(d);
}
