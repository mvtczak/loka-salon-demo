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

export function formatRelativeDay(dateStr: string): string {
  const date = new Date(dateStr + "T00:00:00");
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const diffDays = Math.round((date.getTime() - today.getTime()) / 86400000);
  if (diffDays === 0) return "Dziś";
  if (diffDays === 1) return "Jutro";
  return new Intl.DateTimeFormat("pl-PL", { weekday: "long", day: "numeric", month: "long" }).format(date);
}

const WEEKDAY_NAMES = ["Niedziela", "Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota"];

export function formatWorkDays(workDays: string): string {
  const days = workDays.split(",").map(Number).sort((a, b) => (a === 0 ? 7 : a) - (b === 0 ? 7 : b));
  return days.map((d) => WEEKDAY_NAMES[d]).join(", ");
}
