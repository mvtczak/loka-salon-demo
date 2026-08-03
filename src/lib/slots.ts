import { prisma } from "@/lib/prisma";

function slotsForDay(startHour: number, endHour: number): string[] {
  const out: string[] = [];
  for (let h = startHour; h < endHour; h++) {
    out.push(`${String(h).padStart(2, "0")}:00`);
    out.push(`${String(h).padStart(2, "0")}:30`);
  }
  return out;
}

function toMinutes(time: string): number {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

export async function getAvailableSlots(stylistId: string, serviceId: string, dateStr: string): Promise<string[]> {
  const stylist = await prisma.stylist.findUnique({ where: { id: stylistId } });
  const service = await prisma.service.findUnique({ where: { id: serviceId } });
  if (!stylist || !service) return [];

  const date = new Date(dateStr + "T00:00:00");
  const weekday = date.getDay();
  const workDays = stylist.workDays.split(",").map(Number);
  if (!workDays.includes(weekday)) return [];

  const dayStart = new Date(dateStr + "T00:00:00");
  const dayEnd = new Date(dateStr + "T23:59:59");

  const existing = await prisma.booking.findMany({
    where: {
      stylistId,
      date: { gte: dayStart, lte: dayEnd },
      status: { not: "cancelled" },
    },
  });

  const taken = existing.map((b) => ({ start: toMinutes(b.startTime), end: toMinutes(b.endTime) }));

  const candidates = slotsForDay(stylist.startHour, stylist.endHour);
  const now = new Date();
  const isToday = dayStart.toDateString() === now.toDateString();
  const nowMinutes = now.getHours() * 60 + now.getMinutes() + 30; // 30 min buffer

  return candidates.filter((time) => {
    const start = toMinutes(time);
    const end = start + service.durationMin;
    if (end > stylist.endHour * 60) return false;
    if (isToday && start < nowMinutes) return false;
    return !taken.some((t) => start < t.end && end > t.start);
  });
}

export function addMinutesToTime(time: string, minutes: number): string {
  const [h, m] = time.split(":").map(Number);
  const total = h * 60 + m + minutes;
  const nh = Math.floor(total / 60) % 24;
  const nm = total % 60;
  return `${String(nh).padStart(2, "0")}:${String(nm).padStart(2, "0")}`;
}
