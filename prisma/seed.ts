import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const services = [
  { name: "Strzyżenie damskie", slug: "strzyzenie-damskie", category: "Strzyżenie", durationMin: 60, priceCents: 12000, description: "Konsultacja, mycie, strzyżenie i modelowanie dopasowane do kształtu twarzy.", image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800", popular: true },
  { name: "Strzyżenie męskie", slug: "strzyzenie-meskie", category: "Strzyżenie", durationMin: 30, priceCents: 6000, description: "Klasyczne lub nowoczesne strzyżenie maszynką i nożyczkami.", image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800", popular: true },
  { name: "Strzyżenie dziecięce", slug: "strzyzenie-dzieciece", category: "Strzyżenie", durationMin: 30, priceCents: 5000, description: "Strzyżenie dla dzieci do 12 lat, w przyjaznej atmosferze.", image: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=800", popular: false },
  { name: "Modelowanie", slug: "modelowanie", category: "Stylizacja", durationMin: 45, priceCents: 9000, description: "Suszenie i modelowanie szczotką lub prostownicą.", image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800", popular: false },
  { name: "Upięcie okolicznościowe", slug: "upiecie-okolicznosciowe", category: "Stylizacja", durationMin: 60, priceCents: 18000, description: "Elegancka fryzura na wesele, studniówkę lub inną okazję.", image: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800", popular: false },
  { name: "Koloryzacja jednolita", slug: "koloryzacja-jednolita", category: "Koloryzacja", durationMin: 120, priceCents: 25000, description: "Farbowanie całości włosów w jednym, wybranym kolorze.", image: "https://images.unsplash.com/photo-1522336572468-97b06e8ef143?w=800", popular: true },
  { name: "Balayage", slug: "balayage", category: "Koloryzacja", durationMin: 180, priceCents: 45000, description: "Rozjaśnienie techniką balayage dla naturalnego efektu słońca.", image: "https://images.unsplash.com/photo-1560869713-7d0a29430803?w=800", popular: true },
  { name: "Refleksy / pasemka", slug: "refleksy-pasemka", category: "Koloryzacja", durationMin: 150, priceCents: 35000, description: "Delikatne rozjaśnienie wybranych pasm włosów.", image: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=800", popular: false },
  { name: "Tonowanie", slug: "tonowanie", category: "Koloryzacja", durationMin: 60, priceCents: 15000, description: "Odświeżenie odcienia i neutralizacja niechcianych tonów.", image: "https://images.unsplash.com/photo-1519735777090-ec97162dc266?w=800", popular: false },
  { name: "Keratynowe prostowanie", slug: "keratynowe-prostowanie", category: "Pielęgnacja", durationMin: 150, priceCents: 40000, description: "Zabieg wygładzający i regenerujący na bazie keratyny.", image: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=800", popular: false },
  { name: "Regeneracja włosów", slug: "regeneracja-wlosow", category: "Pielęgnacja", durationMin: 45, priceCents: 12000, description: "Intensywna kuracja nawilżająca i odbudowująca strukturę włosa.", image: "https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=800", popular: false },
  { name: "Regulacja brody", slug: "regulacja-brody", category: "Broda", durationMin: 20, priceCents: 4000, description: "Precyzyjne formowanie i przycięcie brody.", image: "https://images.unsplash.com/photo-1493256338651-d82f7acb2b38?w=800", popular: false },
  { name: "Golenie brzytwą", slug: "golenie-brzytwa", category: "Broda", durationMin: 30, priceCents: 7000, description: "Tradycyjne golenie na gorący ręcznik i brzytwę.", image: "https://images.unsplash.com/photo-1521490878406-4d0a2c69c4e5?w=800", popular: false },
  { name: "Balayage + strzyżenie", slug: "balayage-strzyzenie", category: "Zestawy", durationMin: 210, priceCents: 48000, description: "Pakiet: balayage, tonowanie i strzyżenie w jednej wizycie.", image: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=800", popular: true },
];

const stylists = [
  { name: "Marta Kowalska", slug: "marta-kowalska", title: "Senior Stylistka", bio: "15 lat doświadczenia, specjalizuje się w strzyżeniach i stylizacjach ślubnych.", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600", startHour: 9, endHour: 19, workDays: "1,2,3,4,5,6" },
  { name: "Julia Nowak", slug: "julia-nowak", title: "Kolorystka", bio: "Ekspertka od balayage i skomplikowanych koloryzacji.", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600", startHour: 9, endHour: 17, workDays: "1,2,3,4,5" },
  { name: "Kacper Wiśniewski", slug: "kacper-wisniewski", title: "Barber", bio: "Specjalista fryzur męskich i stylizacji brody.", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600", startHour: 10, endHour: 20, workDays: "2,3,4,5,6" },
  { name: "Ola Zielińska", slug: "ola-zielinska", title: "Stylistka", bio: "Uwielbia nowoczesne cięcia i modelowanie na każdą okazję.", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600", startHour: 9, endHour: 19, workDays: "1,2,3,4,5,6" },
  { name: "Piotr Kamiński", slug: "piotr-kaminski", title: "Senior Barber", bio: "20 lat za fotelem, mistrz klasycznego golenia brzytwą.", image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=600", startHour: 10, endHour: 18, workDays: "1,2,3,4,5,6" },
];

const firstNames = ["Anna","Katarzyna","Magdalena","Agnieszka","Aleksandra","Natalia","Weronika","Karolina","Marta","Ewa","Jan","Piotr","Tomasz","Krzysztof","Michał","Paweł","Marcin","Łukasz","Adam","Grzegorz"];
const lastNames = ["Kowalski","Nowak","Wiśniewski","Wójcik","Kowalczyk","Kamiński","Lewandowski","Zieliński","Szymański","Woźniak","Dąbrowski","Kozłowski","Jankowski","Mazur","Kwiatkowski"];

function rand<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function slotsForDay(startHour: number, endHour: number): string[] {
  const out: string[] = [];
  for (let h = startHour; h < endHour; h++) {
    out.push(`${String(h).padStart(2, "0")}:00`);
    out.push(`${String(h).padStart(2, "0")}:30`);
  }
  return out;
}

function addMinutes(time: string, minutes: number): string {
  const [h, m] = time.split(":").map(Number);
  const total = h * 60 + m + minutes;
  const nh = Math.floor(total / 60) % 24;
  const nm = total % 60;
  return `${String(nh).padStart(2, "0")}:${String(nm).padStart(2, "0")}`;
}

async function main() {
  console.log("Seeding services...");
  const serviceRecords = [];
  for (const s of services) {
    const rec = await prisma.service.upsert({ where: { slug: s.slug }, update: s, create: s });
    serviceRecords.push(rec);
  }

  console.log("Seeding stylists...");
  const stylistRecords = [];
  for (const st of stylists) {
    const rec = await prisma.stylist.upsert({ where: { slug: st.slug }, update: st, create: st });
    stylistRecords.push(rec);
  }

  const existingBookings = await prisma.booking.count();
  if (existingBookings >= 5) {
    console.log(`Bookings already seeded (${existingBookings}), skipping fake booking generation.`);
    return;
  }

  console.log("Seeding fake bookings...");
  let created = 0;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let dayOffset = -45; dayOffset <= 10; dayOffset++) {
    const date = new Date(today);
    date.setDate(date.getDate() + dayOffset);
    const weekday = date.getDay(); // 0 = Sun

    for (const stylist of stylistRecords) {
      const workDays = stylist.workDays.split(",").map(Number);
      if (!workDays.includes(weekday)) continue;

      const isPast = dayOffset < 0;
      const isToday = dayOffset === 0;
      const numBookings = isPast ? Math.floor(Math.random() * 4) : isToday ? Math.floor(Math.random() * 3) : Math.random() < 0.6 ? Math.floor(Math.random() * 3) : 0;
      if (numBookings === 0) continue;

      const available = slotsForDay(stylist.startHour, stylist.endHour);
      const taken: { start: number; end: number }[] = [];

      let attempts = 0;
      let bookedCount = 0;
      while (bookedCount < numBookings && attempts < 15) {
        attempts++;
        const service = rand(serviceRecords);
        const startTime = rand(available);
        const [sh, sm] = startTime.split(":").map(Number);
        const startMin = sh * 60 + sm;
        const endMin = startMin + service.durationMin;
        if (endMin > stylist.endHour * 60) continue;
        const overlaps = taken.some((t) => startMin < t.end && endMin > t.start);
        if (overlaps) continue;
        taken.push({ start: startMin, end: endMin });

        const endTime = addMinutes(startTime, service.durationMin);
        let status = "confirmed";
        if (isPast) {
          status = Math.random() < 0.08 ? "cancelled" : "completed";
        }

        const first = rand(firstNames);
        const last = rand(lastNames);
        const email = `${first.toLowerCase()}.${last.toLowerCase()}${Math.floor(Math.random() * 100)}@example.com`;
        const phone = `+48 ${Math.floor(500 + Math.random() * 400)} ${Math.floor(100 + Math.random() * 900)} ${Math.floor(100 + Math.random() * 900)}`;

        await prisma.booking.create({
          data: {
            serviceId: service.id,
            stylistId: stylist.id,
            date,
            startTime,
            endTime,
            customerName: `${first} ${last}`,
            customerEmail: email,
            customerPhone: phone,
            status,
          },
        });
        created++;
        bookedCount++;
      }
    }
  }

  console.log(`Created ${created} fake bookings.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
