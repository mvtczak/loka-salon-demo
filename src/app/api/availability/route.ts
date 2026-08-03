import { NextRequest, NextResponse } from "next/server";
import { getAvailableSlots } from "@/lib/slots";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const stylistId = searchParams.get("stylistId");
  const serviceId = searchParams.get("serviceId");
  const date = searchParams.get("date");

  if (!stylistId || !serviceId || !date) {
    return NextResponse.json({ error: "Brak wymaganych parametrów." }, { status: 400 });
  }

  const slots = await getAvailableSlots(stylistId, serviceId, date);
  return NextResponse.json({ slots });
}
