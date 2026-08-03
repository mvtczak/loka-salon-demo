# LOKA — demo systemu rezerwacji online (portfolio)

W pełni działający system rezerwacji wizyt zbudowany jako projekt portfolio:
Next.js (App Router) + TypeScript + Tailwind CSS + Prisma (SQLite lokalnie /
Postgres produkcyjnie). Katalog usług, zespół stylistów, rezerwacja z
wyborem usługi/stylisty/terminu w czasie rzeczywistym i panel administracyjny
z KPI — dokładnie to, co znajduje się w ofercie "System rezerwacji online"
na dotczak.pl.

## Uruchomienie lokalne

```bash
npm install
cp .env.example .env
npx prisma db push
npx tsx prisma/seed.ts
npm run dev
```

Otwórz http://localhost:3000.

## Rezerwacja

Strona `/rezerwacja` prowadzi przez 4 kroki: usługa → stylista → termin →
dane kontaktowe. Dostępne godziny są liczone w czasie rzeczywistym na
podstawie godzin pracy stylisty i istniejących rezerwacji (bez podwójnych
zapisów na ten sam termin).

## Panel administracyjny

Dostępny pod `/admin/rezerwacje`. Jeśli w `.env` ustawisz `ADMIN_KEY`, panel
będzie wymagał dopisania `?key=TWOJ_KLUCZ` do adresu URL. Pokazuje przychód
i liczbę wizyt (dziś / 7 / 30 dni), wykres 14-dniowy oraz listę wizyt.
Oznaczanie wizyty jako zrealizowanej/anulowanej działa **wyłącznie lokalnie
w przeglądarce** (stan React) — to demo, więc żadna akcja w panelu nie
zapisuje się trwale na serwerze.

## Struktura projektu

```
src/app/                strony (App Router)
  page.tsx               strona główna
  uslugi/                 cennik usług + filtrowanie po kategorii
  zespol/                  zespół stylistów
  rezerwacja/              4-etapowy kreator rezerwacji
  rezerwacja/potwierdzenie/ podsumowanie po rezerwacji
  admin/rezerwacje/        panel administracyjny
  api/availability/        dostępne terminy (GET)
  api/bookings/            tworzenie rezerwacji (POST)
src/components/          Header, Footer, ServiceCard, StylistCard, BookingWizard
src/components/admin/    BookingsManager (symulowane akcje admina)
src/lib/                 Prisma client, obliczanie dostępności, formatowanie
prisma/schema.prisma     modele Service / Stylist / Booking
prisma/seed.ts           14 usług, 5 stylistów, ~280 przykładowych rezerwacji
```

## Deploy (Vercel)

1. Wypchnij projekt na GitHub.
2. Zaimportuj repo w Vercel.
3. Dodaj bazę Postgres (np. integrację Neon) i ustaw `DATABASE_URL`.
4. Uwaga: SQLite (plik lokalny) nie nadaje się do produkcji na Vercel
   (serverless, brak trwałego dysku). Do wdrożenia zamień `datasource` w
   `prisma/schema.prisma` na `postgresql`.

## Zdjęcia

Zdjęcia pochodzą z Unsplash (darmowa licencja) i służą wyłącznie do celów
demonstracyjnych.
