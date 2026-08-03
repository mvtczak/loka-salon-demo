import Link from "next/link";

export default function AdminBanner() {
  return (
    <div className="bg-ink px-4 py-2.5 text-center text-xs text-cream sm:text-sm">
      To projekt demonstracyjny portfolio.{" "}
      <Link href="/admin/rezerwacje" className="underline underline-offset-2 hover:text-amber">
        Sprawdź panel administracyjny →
      </Link>
    </div>
  );
}
