import Link from "next/link";
import { Info } from "lucide-react";

export default function AdminBanner() {
  return (
    <div className="flex items-center justify-center gap-2 border-b border-line bg-surface px-4 py-2.5 text-center text-[11px] uppercase tracking-[0.15em] text-ink-soft sm:text-xs">
      <Info size={13} className="shrink-0 text-amber" />
      To projekt demonstracyjny portfolio ·{" "}
      <Link href="/admin/rezerwacje" className="text-amber underline underline-offset-4 hover:text-ink">
        Sprawdź panel administracyjny →
      </Link>
    </div>
  );
}
