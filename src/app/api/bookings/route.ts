import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAvailableSlots, addMinutesToTime } from "@/lib/slots";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { serviceId, stylistId, date, startTime, customerName, customerEmail, customerPhone, notes } = body;

  if (!serviceId || !stylistId || !date || !startTime || !customerName || !customerEmail || !customerPhone) {
    return NextResponse.json({ error: "Uzupełnij wszystkie wymagane pola." }, { status: 400 });
  }

  const service = await prisma.service.findUnique({ where: { id: serviceId } });
  if (!service) {
    return NextResponse.json({ error: "Nie znaleziono usługi." }, { status: 404 });
  }

  // Re-validate slot is still free server-side to avoid double-booking.
  const available = await getAvailableSlots(stylistId, serviceId, date);
  if (!available.includes(startTime)) {
    return NextResponse.json({ error: "Ten termin nie jest już dostępny. Wybierz inny." }, { status: 409 });
  }

  const endTime = addMinutesToTime(startTime, service.durationMin);

  const booking = await prisma.booking.create({
    data: {
      serviceId,
      stylistId,
      date: new Date(date + "T00:00:00"),
      startTime,
      endTime,
      customerName,
      customerEmail,
      customerPhone,
      notes: notes || null,
      status: "confirmed",
    },
  });

  return NextResponse.json({ id: booking.id });
}
